-- Schema untuk Website Latansa (jalankan di Supabase SQL Editor)
-- Idempoten: aman dijalankan berulang kali.
-- Desain: RLS AKTIF. Publik (publishable key / anon) mendapat TIDAK ADA
-- akses langsung; seluruh CRUD lewat server API yang memakai secret key
-- (service_role, bypass RLS). Ini konfigurasi paling ketat: permukaan
-- serangan publik = nol, dan semua hak akses CRUD ada di sisi server.

-- Pesan dari form kontak
CREATE TABLE IF NOT EXISTS contact_messages (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  nama TEXT NOT NULL,
  email TEXT NOT NULL,
  whatsapp TEXT,
  kebutuhan TEXT,
  pesan TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Email newsletter
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  email TEXT PRIMARY KEY,
  unsubscribed BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Admin panel /webmin accounts (password = scrypt hash, dibuat oleh aplikasi)
CREATE TABLE IF NOT EXISTS admin_users (
  username TEXT PRIMARY KEY,
  password_hash TEXT NOT NULL,
  disabled BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ------------------------------------------------------------------
-- Row Level Security: AKTIF
-- ------------------------------------------------------------------
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Hapus policy lama (dari schema versi awal) jika ada
DROP POLICY IF EXISTS "Allow authenticated insert/update" ON newsletter_subscribers;
DROP POLICY IF EXISTS "anon can insert contact" ON contact_messages;
DROP POLICY IF EXISTS "anon can insert newsletter" ON newsletter_subscribers;
DROP POLICY IF EXISTS "anon can update newsletter" ON newsletter_subscribers;

-- ------------------------------------------------------------------
-- Tidak ada policy TO anon/authenticated: publishable key mendapat
-- nol akses (default-deny). service_role (SUPABASE_SECRET_KEY) bypass
-- RLS secara native dan memiliki grant penuh, sehingga seluruh
-- Create/Read/Update/Delete berjalan lewat server API.
-- ------------------------------------------------------------------
REVOKE ALL ON contact_messages FROM anon, authenticated;
REVOKE ALL ON newsletter_subscribers FROM anon, authenticated;
REVOKE ALL ON admin_users FROM anon, authenticated;
