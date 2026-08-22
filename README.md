# Website Latansa

Website company profile **dwibahasa** (Indonesia default + English) untuk **Latansa** — jasa pembuatan software (aplikasi enterprise, aplikasi pendidikan, mobile app, dan website profesional) yang berbasis di Jalan Raya Bandung, Kecamatan Diwek, Kabupaten Jombang, Jawa Timur 61471.

Dibangun dengan [Next.js](https://nextjs.org) (App Router) dan [Tailwind CSS v4](https://tailwindcss.com), terinspirasi struktur template [Landio](https://bootstrapmade.com/landio-bootstrap-landing-page-template/) namun dikembangkan sebagai situs multi-halaman, bukan landing page.

## Fitur

- Multi-halaman: Beranda, Tentang Kami, Produk (+ 4 halaman detail), Kontak
- **Dua bahasa**: `/id` (default) & `/en` — pengalih bahasa di navbar
- Tema **terang & gelap** (class-based via `next-themes`, mengikuti preferensi sistem)
- Responsif dengan pendekatan **mobile-first**
- Formulir kontak mengirim email ke meone@outlook.co.id:
  - Otomatis via SMTP bila `.env.local` diisi (lihat `.env.example`)
  - Fallback aman: membuka aplikasi email pengguna (mailto) jika SMTP belum disetel
- Logo kustom "L yang Bertumbuh" (inisial L + panah pertumbuhan + titik inovasi)
- Animasi reveal saat scroll yang tetap aman tanpa JavaScript (`prefers-reduced-motion` dihormati)
- SEO dasar (metadata per halaman per bahasa, OpenGraph, hreflang)

## Menjalankan Proyek

```bash
npm install   # sekali saja
npm run dev   # server development di http://localhost:3000 → redirect ke /id
```

Build produksi:

```bash
npm run build
npm run start
```

### Mengaktifkan Pengiriman Email Langsung

Salin `.env.example` menjadi `.env.local`, isi kredensial SMTP (mis. akun Outlook), lalu restart server. Tanpa konfigurasi ini formulir tetap berfungsi melalui mode mailto.

## Struktur Penting

```
src/
├── app/
│   ├── layout.tsx          # Root layout (html/body, font, tema)
│   ├── page.tsx            # Redirect "/" → "/id"
│   ├── [lang]/             # Semua halaman (id & en)
│   │   ├── layout.tsx      # Header/Footer + metadata terlokalisasi
│   │   └── ...             # Beranda, tentang, produk/[slug], kontak
│   └── api/kontak/route.ts # Endpoint pengiriman pesan (nodemailer)
├── components/             # Header, footer, logo, form, CTA, dll.
└── lib/i18n/
    ├── config.ts           # Locale, info situs, meta produk
    └── dictionaries.ts     # Seluruh teks situs dalam ID & EN
```

Mengubah konten cukup lewat `src/lib/i18n/dictionaries.ts`. Warna brand dapat diganti di blok `@theme` pada `src/app/globals.css`.
