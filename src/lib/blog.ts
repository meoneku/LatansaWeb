/**
 * Artikel blog - data-driven tanpa database.
 * Setiap artikel memiliki versi Bahasa Indonesia dan Inggris.
 */

export type BlogLocale = {
  title: string;
  excerpt: string;
  paragraphs: string[];
};

export type BlogPost = {
  slug: string;
  date: string; // YYYY-MM-DD
  tag: Record<"id" | "en", string>;
  id: BlogLocale;
  en: BlogLocale;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "5-tanda-bisnis-butuh-website",
    date: "2026-08-10",
    tag: { id: "Bisnis Digital", en: "Digital Business" },
    id: {
      title: "5 Tanda Bisnis Anda Sudah Saatnya Punya Website",
      excerpt:
        "Masih mengandalkan status WhatsApp dan akun Instagram saja? Periksa lima tanda berikut - jika satu saja terasa familiar, website adalah langkah berikutnya yang tepat.",
      paragraphs: [
        "Banyak pemilik usaha merasa cukup dengan media sosial. Padahal ada batas jelas di mana sosial media berhenti membantu dan website justru mulai bekerja untuk Anda. Berikut tanda-tandanya.",
        "Pertama, pelanggan sering bertanya hal yang sama berulang kali: alamat, jam buka, harga, atau katalog. Website company profile menjawab semua pertanyaan itu 24 jam sehari tanpa Anda perlu membalas satu per satu.",
        "Kedua, Anda sulit ditemukan di Google. Saat calon pelanggan mencari produk yang Anda jual, bisnis yang muncul di halaman pertama-lah yang dihubungi lebih dulu. Tanpa website, Anda tidak ikut serta dalam perlombaan itu.",
        "Ketiga, ingin mulai iklan digital tetapi bingung mengarahkan audiensnya. Iklan butuh tempat pendaratan yang meyakinkan - dan halaman profil Instagram bukan tempat yang ideal untuk menutup penjualan.",
        "Keempat dan kelima: ingin terlihat kredibel di mata mitra atau investor, dan ingin data penjualan/pertanyaan terkumpul rapi. Keduanya hanya bisa dipenuhi dengan aset digital yang Anda kendalikan penuh - yaitu website. Jika dua atau lebih tanda di atas terasa familiar, saatnya mengambil langkah itu. Kabari kami - konsultasinya gratis.",
      ],
    },
    en: {
      title: "5 Signs Your Business Is Ready for a Website",
      excerpt:
        "Still relying on WhatsApp status and an Instagram account alone? Check these five signs - if even one feels familiar, a website is your right next step.",
      paragraphs: [
        "Many business owners feel social media is enough. But there is a clear point where social media stops helping and a website starts working for you instead. Here are the signs.",
        "First, customers keep asking the same questions over and over: address, opening hours, prices, or catalog. A company profile website answers all of that 24/7 without you replying one by one.",
        "Second, you are hard to find on Google. When potential customers search for products you sell, the businesses on page one get contacted first. Without a website, you are not part of that race.",
        "Third, you want to run digital ads but have nowhere convincing to send the audience. Ads need a trustworthy landing place - and an Instagram profile is not ideal for closing sales.",
        "Fourth and fifth: you want to look credible to partners or investors, and you want inquiries collected in one tidy place. Both require a digital asset you fully control - a website. If two or more signs sound familiar, it is time. Let us know - the consultation is free.",
      ],
    },
  },
  {
    slug: "website-vs-media-sosial",
    date: "2026-07-28",
    tag: { id: "Strategi", en: "Strategy" },
    id: {
      title: "Website vs Media Sosial: Kenapa Keduanya Sama-sama Perlu",
      excerpt:
        "Bukan soal memilih salah satu. Website dan media sosial punya peran berbeda - dan bisnis yang tumbuh tahu cara memadukan keduanya.",
      paragraphs: [
        "Pertanyaan yang sering muncul saat konsultasi: 'Kalau sudah ada Instagram, apakah masih perlu website?' Jawabannya bukan saling menggantikan, melainkan saling melengkapi.",
        "Media sosial unggul untuk membangun kedekatan: konten harian, interaksi langsung, dan jangkauan organik maupun berbayar yang cepat. Namun ada tiga kelemahan mendasar - algoritma berubah-ubah, konten mudah tenggelam, dan Anda tidak memiliki platformnya.",
        "Website kebalikannya: trafik tidak tergantung algoritma, konten bertahan bertahun-tahun lewat pencarian Google, dan seluruh data pengunjung menjadi milik Anda. Kekurangannya, website tidak otomatis mendatangkan audiens baru tanpa dibantu promosi.",
        "Kombinasi terbaik biasanya seperti ini: media sosial sebagai etalase aktif dan alat komunikasi, website sebagai markas resmi tempat penawaran lengkap, katalog, dan formulir pemesanan hidup selamanya. Mulailah dari yang belum Anda miliki - dan kalau itu website, tim Latansa siap membantu dari nol.",
      ],
    },
    en: {
      title: "Website vs Social Media: Why You Actually Need Both",
      excerpt:
        "It is not about choosing one. Websites and social media play different roles - and growing businesses know how to combine them.",
      paragraphs: [
        "A question we often hear during consultations: 'If I already have Instagram, do I still need a website?' The answer is not either-or - they complement each other.",
        "Social media excels at building closeness: daily content, direct interaction, and fast organic or paid reach. Yet it has three fundamental weaknesses - algorithms keep changing, content sinks quickly, and you do not own the platform.",
        "A website is the opposite: traffic does not depend on algorithms, content lasts for years through Google search, and all visitor data belongs to you. Its weakness is that it does not automatically attract new audiences without promotion.",
        "The best combination usually looks like this: social media as your active storefront and communication tool, with the website as official headquarters holding complete offers, catalogs, and order forms that live forever. Start with whichever you lack - and if it is the website, team Latansa is ready to help from zero.",
      ],
    },
  },
  {
    slug: "company-profile-kepercayaan",
    date: "2026-07-15",
    tag: { id: "Branding", en: "Branding" },
    id: {
      title: "Company Profile: Faktor Penentu Kepercayaan Pelanggan",
      excerpt:
        "Sebelum memutuskan membeli, calon pelanggan mengecek Anda di Google. Tampilan halaman pertama itu sering menentukan deal atau tidaknya.",
      paragraphs: [
        "Coba ingat pembelian terakhir Anda yang nilainya besar. Hampir pasti sebelum transaksi, Anda mencari nama penyedianya di internet - melihat websitenya, membaca ulasan, menilai apakah terlihat meyakinkan. Pelanggan Anda melakukan hal yang sama.",
        "Company profile yang rapi memberi tiga sinyal sekaligus: bisnis ini sungguh-sungguh, informasinya lengkap dan teratur, serta ada cara jelas untuk menghubungi. Sebaliknya, usaha tanpa jejak digital sulit dibedakan dari penipuan online yang marak.",
        "Kabar baiknya, company profile tidak harus mahal atau rumit. Satu halaman utama yang menjelaskan layanan, portofolio singkat, testimoni, dan tombol kontak sudah lebih dari cukup untuk memulai. Yang penting adalah kesan profesional yang konsisten di setiap bagian.",
        "Di Latansa, paket Website UMKM dirancang persis untuk kebutuhan tersebut: cepat jadi, biaya jelas sejak awal, dan strukturnya siap berkembang ketika bisnis Anda tumbuh lebih besar.",
      ],
    },
    en: {
      title: "Company Profiles: The Trust Factor Behind Every Deal",
      excerpt:
        "Before buying, potential customers look you up on Google. What they see on that first page often decides whether the deal happens.",
      paragraphs: [
        "Think about your last big purchase. Almost certainly, before committing you searched the provider's name online - checking their website, reading reviews, judging whether they looked credible. Your customers do exactly the same.",
        "A tidy company profile sends three signals at once: this business is serious, its information is complete and organized, and there is a clear way to get in touch. On the flip side, a business with no digital footprint is hard to distinguish from the online scams spreading everywhere.",
        "The good news: a company profile does not have to be expensive or complicated. One solid homepage explaining services, brief portfolio, testimonials, and a contact button is more than enough to start. What matters is consistent professionalism across every section.",
        "At Latansa, our Starter Website package is designed precisely for that need: quick to launch, clear pricing from day one, and structured to grow when your business does.",
      ],
    },
  },
];

export function getPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}

/** Estimasi waktu baca berdasarkan panjang konten bahasa aktif */
export function readMinutes(post: BlogPost, locale: "id" | "en"): number {
  const words = post[locale].paragraphs
    .join(" ")
    .split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}
