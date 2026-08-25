import type { Locale } from "./config";

const id = {
  meta: {
    tagline: "Solusi Software untuk Bisnis & Pendidikan",
    description:
      "Latansa adalah penyedia jasa pengembangan software. Kami membantu bisnis, sekolah, dan UMKM membangun aplikasi enterprise, aplikasi pendidikan, mobile app, serta website profesional - mulai dari konsultasi gratis hingga pendampingan pasca-rilis.",
  },
  nav: {
    home: "Beranda",
    about: "Tentang Kami",
    products: "Produk",
    games: "Permainan",
    pricing: "Harga",
    blog: "Blog",
    contact: "Kontak",
    startProject: "Mulai Proyek",
  },
  hero: {
    titleStart: "Wujudkan Ide Digital Anda Bersama ",
    titleHighlight: "Latansa",
    description:
      "Kami membantu bisnis dan lembaga pendidikan membangun aplikasi enterprise, aplikasi pendidikan, mobile app, hingga website profesional - mulai dari konsultasi gratis sampai pendampingan pasca-rilis.",
    primaryCta: "Konsultasi Gratis",
    secondaryCta: "Lihat Produk Kami",
    stats: [
      { value: "4", label: "Lini Produk Digital" },
      { value: "100%", label: "Mobile-First & Responsif" },
      { value: "<24 Jam", label: "Respon Konsultasi" },
    ],
    mockUrl: "latansa.id/dashboard",
    liveBadge: "LIVE",
    progress: [
      { label: "Desain UI", width: "90%" },
      { label: "Pengembangan", width: "72%" },
      { label: "Pengujian", width: "45%" },
    ],
    floatA: {
      title: "Rilis Lebih Cepat",
      sub: "Proses terstruktur & transparan",
    },
    floatB: {
      title: "Aman & Terpercaya",
      sub: "Data Anda terjaga privasinya",
    },
  },
  techStrip: "Dibangun dengan Teknologi Modern & Teruji",
  productsSection: {
    eyebrow: "Produk Kami",
    titleStart: "Empat Lini Produk, ",
    titleHighlight: "Satu Tujuan",
    titleEnd: ": Membantu Anda Tumbuh",
    description:
      "Dari sistem internal perusahaan sampai website etalase usaha - semua dirancang khusus sesuai kebutuhan, bukan solusi tempelan.",
  },
  learnMore: "Selengkapnya",
  whyUs: {
    eyebrow: "Kenapa Latansa",
    title: "Mengapa Memulai Bersama Kami?",
    description:
      "Kami studio muda yang sedang bertumbuh - dan itu justru menjadi nilai lebih: setiap proyek mendapat perhatian penuh, bukan sekadar nomor tiket.",
    items: [
      {
        title: "Harga Bersahabat",
        description:
          "Sebagai studio yang sedang bertumbuh, kami menawarkan harga transparan dan realistis - disesuaikan dengan kebutuhan serta anggaran Anda.",
      },
      {
        title: "Pendekatan Kolaboratif",
        description:
          "Anda dilibatkan di setiap tahap - dari diskusi awal, desain, hingga rilis. Bukan sekadar terima jadi, melainkan membangun bersama.",
      },
      {
        title: "Teknologi Modern",
        description:
          "Kami menggunakan stack teknologi terkini yang cepat, aman, dan mudah dikembangkan, sehingga produk Anda tidak cepat usang.",
      },
      {
        title: "Mobile-First & Responsif",
        description:
          "Setiap produk dirancang mengutamakan tampilan mobile tanpa mengabaikan pengalaman di tablet maupun desktop.",
      },
      {
        title: "Dukungan Pasca-Rilis",
        description:
          "Garansi perbaikan bug dan opsi pemeliharaan bulanan membuat aplikasi Anda tetap sehat dan berkembang setelah diluncurkan.",
      },
      {
        title: "Lokal & Mudah Diakses",
        description:
          "Kami mudah dihubungi dan terbuka untuk meeting tatap muka bagi klien di area sekitarnya.",
      },
    ],
  },
  processSection: {
    eyebrow: "Proses Kerja",
    title: "Alur Kerja yang Jelas & Transparan",
    description:
      "Lima tahap sederhana dari ide sampai aplikasi berjalan - Anda selalu tahu posisi proyek Anda di setiap langkahnya.",
    steps: [
      {
        step: "01",
        title: "Konsultasi & Discovery",
        description:
          "Ceritakan kebutuhan dan tantangan Anda secara gratis. Kami bantu rumuskan ide menjadi solusi digital yang tepat.",
      },
      {
        step: "02",
        title: "Proposal & Perencanaan",
        description:
          "Anda menerima proposal berisi ruang lingkup, timeline, dan estimasi biaya yang jelas - tanpa biaya tersembunyi.",
      },
      {
        step: "03",
        title: "Desain UI/UX",
        description:
          "Desain antarmuka dibuat mobile-first dengan pendekatan modern, lalu direvisi bersama Anda hingga benar-benar cocok.",
      },
      {
        step: "04",
        title: "Pengembangan",
        description:
          "Proses coding menggunakan teknologi terkini dengan progres yang dilaporkan berkala agar Anda selalu up-to-date.",
      },
      {
        step: "05",
        title: "Peluncuran & Pendampingan",
        description:
          "Pengujian menyeluruh, peluncuran, pelatihan penggunaan, hingga dukungan pemeliharaan setelah aplikasi berjalan.",
      },
    ],
  },
  cta: {
    titleStart: "Punya ide atau masalah yang butuh ",
    titleHighlight: "solusi digital",
    titleEnd: "?",
    description:
      "Ceritakan kebutuhan Anda hari ini. Konsultasi awal gratis - kami bantu carikan bentuk solusi yang paling sesuai dengan tujuan dan anggaran Anda.",
    button: "Konsultasi Gratis Sekarang",
  },
  footer: {
    description:
      "Studio pengembangan software yang membantu bisnis dan lembaga pendidikan memulai transformasi digital dengan solusi yang tepat sasaran.",
    navigationTitle: "Navigasi",
    productsTitle: "Produk",
    contactTitle: "Kontak",
    copyright: "Seluruh hak cipta dilindungi.",
    builtWith: "Dibangun dengan Next.js & Tailwind CSS.",
    newsletterSide:
      "Maksimal 1-2 email per bulan. Berhenti berlangganan kapan saja dengan satu klik.",
  },
  contactInfo: {
    addressFull:
      "Jalan Raya Bandung, Kecamatan Diwek, Kabupaten Jombang, Jawa Timur 61471",
    addressShort: "Jl. Raya Bandung, Diwek, Jombang 61471",
    hours: "Sabtu - Rabu, 08.00 - 16.00 WIB",
  },
  products: [
    {
      slug: "aplikasi-enterprise",
      name: "Aplikasi Enterprise",
      tagline:
        "Sistem terintegrasi untuk operasional bisnis yang lebih efisien",
      summary:
        "ERP, manajemen inventori, kasir, hingga sistem internal yang dirancang khusus sesuai alur kerja perusahaan Anda.",
      description: [
        "Setiap bisnis memiliki cara kerja yang unik. Aplikasi enterprise dari Latansa membantu mendigitalisasi proses bisnis Anda - mulai dari pencatatan stok, transaksi kasir, manajemen karyawan, sampai laporan yang biasanya dikerjakan manual lewat spreadsheet.",
        "Kami membangun sistem dari nol sesuai kebutuhan Anda, sehingga aplikasi benar-benar mengikuti alur kerja perusahaan, bukan sebaliknya. Hasilnya: operasional lebih rapi, data lebih akurat, dan pengambilan keputusan lebih cepat.",
      ],
      features: [
        "Manajemen inventori & stok real-time",
        "Point of Sale (POS) / kasir terintegrasi",
        "Dashboard laporan & analitik penjualan",
        "Multi-user dengan hak akses berjenjang",
        "Otomasi alur kerja (approval, notifikasi)",
        "Ekspor data & integrasi API",
      ],
      idealFor: [
        "Distributor & Grosir",
        "Retail & F&B Multi-cabang",
        "Manufaktur & Workshop",
        "Perusahaan Jasa",
      ],
      tech: ["Next.js", "Laravel", "MySQL", "REST API"],
    },
    {
      slug: "aplikasi-pendidikan",
      name: "Aplikasi Pendidikan",
      tagline: "Digitalisasi sekolah dan lembaga pendidikan dalam satu platform",
      summary:
        "Sistem informasi akademik, PPDB online, ujian daring, dan portal orang tua untuk sekolah, pesantren, hingga lembaga kursus.",
      description: [
        "Administrasi sekolah yang masih manual sering kali memakan waktu guru dan staff. Aplikasi pendidikan dari Latansa membantu sekolah, pesantren, dan lembaga kursus mengelola data akademik secara terpusat - dari pendaftaran siswa baru sampai penerbitan rapor.",
        "Dirancang dengan antarmuka yang sederhana agar mudah digunakan oleh guru, staf, siswa, maupun orang tua tanpa pelatihan yang rumit.",
      ],
      features: [
        "Sistem informasi akademik terpadu",
        "PPDB / pendaftaran siswa baru online",
        "Ujian daring dengan bank soal",
        "Absensi digital siswa & guru",
        "Rapor digital & arsip nilai",
        "Portal orang tua dengan notifikasi",
      ],
      idealFor: ["SD, SMP, SMA/SMK", "Pesantren & Madrasah", "Lembaga Kursus & Bimbel", "PAUD / TK"],
      tech: ["Next.js", "React", "Laravel", "Firebase"],
    },
    {
      slug: "mobile-app",
      name: "Mobile App",
      tagline: "Aplikasi Android & iOS yang cepat, ringan, dan mudah digunakan",
      summary:
        "Aplikasi mobile cross-platform untuk bisnis, startup, dan komunitas - lengkap dari development sampai tayang di Play Store.",
      description: [
        "Pelanggan Anda ada di smartphone. Mobile app membuat bisnis Anda lebih dekat: notifikasi promo langsung ke pengguna, pemesanan lebih praktis, dan brand semakin melekat di ingatan.",
        "Kami mengembangkan aplikasi dengan pendekatan cross-platform sehingga Android dan iOS bisa diluncurkan lebih cepat dengan biaya lebih hemat, tanpa mengorbankan kualitas pengalaman pengguna.",
      ],
      features: [
        "Cross-platform: satu kode untuk Android & iOS",
        "Notifikasi push untuk promosi & informasi",
        "Integrasi payment gateway",
        "Mode offline & sinkronisasi data",
        "Autentikasi aman (login, OTP)",
        "Pendampingan publikasi ke Play Store / App Store",
      ],
      idealFor: [
        "UMKM & Toko Online",
        "Startup Digital",
        "Bisnis Layanan (booking, antar-jemput)",
        "Komunitas & Organisasi",
      ],
      tech: ["Flutter", "React Native", "Firebase", "Node.js"],
    },
    {
      slug: "website-profesional",
      name: "Website Profesional",
      tagline:
        "Company profile dan website usaha yang meyakinkan di mata pelanggan",
      summary:
        "Homepage profesional, company profile, landing page, dan toko online - cepat, aman, dan mudah ditemukan di Google.",
      description: [
        "Website adalah etalase digital pertama yang dilihat calon pelanggan. Sebelum memutuskan membeli, mereka akan mencari usaha Anda di Google. Website yang rapi dan profesional membuat usaha Anda terlihat kredibel dan dipercaya.",
        "Kami membangun website dengan desain modern, performa cepat, dan struktur SEO-friendly - plus panel admin sederhana agar Anda bisa mengubah konten sendiri tanpa perlu jadi programmer.",
      ],
      features: [
        "Desain modern, responsif & mobile-first",
        "Struktur SEO-friendly agar mudah ditemukan",
        "Panel admin untuk kelola konten sendiri",
        "Integrasi WhatsApp & Google Maps",
        "Keamanan SSL & performa loading cepat",
        "Bantuan setup domain, hosting & email bisnis",
      ],
      idealFor: [
        "UMKM & Usaha Lokal",
        "Profesional (dokter, konsultan, fotografer)",
        "Sekolah & Yayasan",
        "Event & Komunitas",
      ],
      tech: ["Next.js", "Tailwind CSS", "TypeScript", "Vercel"],
    },
  ],
  productsIndex: {
    eyebrow: "Produk Kami",
    titleStart: "Solusi Digital untuk ",
    titleHighlight: "Berbagai Kebutuhan",
    titleEnd: "",
    description:
      "Setiap bisnis dan lembaga punya tantangan berbeda. Karena itu semua produk kami dikembangkan sesuai pesanan - menyesuaikan alur kerja Anda, bukan sebaliknya.",
    featureHeading: "Fitur Unggulan",
    detailPrefix: "Lihat Detail",
    customTitle: "Tidak menemukan yang Anda cari?",
    customDescription:
      "Keempat produk di atas hanya titik awal. Ceritakan kebutuhan unik Anda - kami bangun solusi khusus dari nol.",
    customButton: "Diskusikan Ide Anda",
  },
  productDetail: {
    backToAll: "Semua Produk",
    consultCta: "Konsultasi Produk Ini",
    emailCta: "Kirim Email",
    emailSubjectPrefix: "Menanyakan soal",
    overviewTitle: "Ringkasan",
    featuresTitle: "Fitur Utama",
    idealForTitle: "Paling Cocok Untuk",
    techTitle: "Teknologi yang Digunakan",
    techNote:
      "Teknologi dapat menyesuaikan kebutuhan dan sistem yang sudah Anda miliki.",
    interestedTitle: "Tertarik dengan produk ini?",
    interestedDesc:
      "Konsultasikan sekarang - gratis dan tanpa komitmen. Kami bantu hitung estimasi biaya serta waktunya.",
    interestedButton: "Ajukan Konsultasi Gratis",
    otherProducts: "Produk Lainnya",
    viewAll: "Lihat semua",
    viewAllMobile: "Lihat semua produk",
  },
  tentang: {
    header: {
      eyebrow: "Tentang Kami",
      titleStart: "Studio Muda dengan ",
      titleHighlight: "Standar yang Besar",
      titleEnd: "",
      description:
        "Latansa lahir dengan satu keyakinan sederhana: bisnis lokal dan lembaga pendidikan juga layak mendapatkan teknologi berkualitas.",
    },
    story: {
      eyebrow: "Cerita Kami",
      title: "Dimulai dari Keresahan yang Sering Kami Dengar",
      paragraphs: [
        "\u201cSistem kasirnya sering error.\u201d \u201cData siswa masih dicatat di buku.\u201d \u201cPengen punya aplikasi, tapi jasa pembuatan software itu mahal dan cuma ada di kota besar.\u201d Kalimat-kalimat seperti itulah yang menjadi alasan Latansa hadir.",
        "Berbasis di Jalan Raya Bandung, Kecamatan Diwek, kami mengambil posisi yang jujur: kami studio muda yang sedang merintis. Belum banyak proyek bisa kami pajang - tetapi justru karena itu, setiap proyek yang masuk mendapat perhatian penuh dari seluruh tim, dikerjakan seolah-olah portofolio pertama dan terakhir kami.",
        "Kami fokus pada empat lini produk: aplikasi enterprise, aplikasi pendidikan, mobile app, dan website profesional - semuanya dibangun sesuai pesanan, dengan proses yang transparan dan harga yang masuk akal bagi UMKM maupun sekolah.",
      ],
    },
    factsTitle: "Sekilas Latansa",
    factLabels: {
      location: "Lokasi",
      email: "Email",
      hours: "Jam Operasional",
    },
    focusLabel: "Fokus layanan",
    visionLabel: "Visi",
    missionLabel: "Misi",
    visionText:
      "Menjadi mitra teknologi tepercaya yang membantu bisnis dan lembaga pendidikan bertransformasi digital secara bertahap, terjangkau, dan berkelanjutan.",
    missionItems: [
      "Membantu UMKM dan sekolah memulai transformasi digital secara bertahap tanpa memberatkan anggaran.",
      "Membangun produk yang benar-benar mudah digunakan siapa pun, bukan hanya oleh mereka yang melek teknologi.",
      "Menjaga komunikasi yang jujur dan proses yang transparan di setiap proyek.",
      "Menumbuhkan ekosistem digital lokal secara bertahap.",
    ],
    valuesSection: {
      eyebrow: "Nilai Kami",
      title: "Prinsip yang Memandu Setiap Proyek",
      description:
        "Enam nilai ini menjadi fondasi cara kami bekerja - dari konsultasi pertama sampai aplikasi Anda berjalan.",
      items: [
        {
          title: "Integritas",
          description:
            "Jujur soal kemampuan, waktu pengerjaan, dan biaya. Tidak ada janji berlebihan - hanya komitmen yang kami penuhi.",
        },
        {
          title: "Inovasi Berkelanjutan",
          description:
            "Kami terus belajar teknologi terbaru agar solusi yang diberikan tidak usang dalam beberapa tahun ke depan.",
        },
        {
          title: "Kualitas di Setiap Detail",
          description:
            "Dari tulisan kode, desain antarmuka, sampai cara kami menjawab email - semua dikerjakan dengan teliti.",
        },
        {
          title: "Kolaborasi",
          description:
            "Klien adalah partner. Ide Anda dipadukan dengan pengalaman teknis kami untuk menghasilkan produk terbaik.",
        },
        {
          title: "Berorientasi Pengguna",
          description:
            "Aplikasi yang bagus bukan yang paling canggih, melainkan yang paling mudah digunakan oleh orang-orang Anda.",
        },
        {
          title: "Tumbuh Bersama",
          description:
            "Kesuksesan klien adalah kesuksesan kami. Kami ingin tumbuh perlahan tapi kokoh bersama klien pertama kami.",
        },
      ],
    },
    cta: {
      titleStart: "Kenalan dulu, ",
      titleHighlight: "ngobrol santai saja",
      titleEnd: "",
      description:
        "Tidak perlu persiapan apa pun. Ceritakan rencana atau kendala Anda - kami bantu pikirkan solusinya, gratis.",
      button: "Konsultasi Gratis Sekarang",
    },
  },
  kontak: {
    header: {
      eyebrow: "Kontak",
      titleStart: "Mari Mulai ",
      titleHighlight: "Percakapan",
      titleEnd: " Pertama Kita",
      description:
        "Ceritakan ide, kebutuhan, atau kendala Anda. Konsultasi awal sepenuhnya gratis - tanpa komitmen apa pun.",
    },
    labels: {
      address: "Alamat Kantor",
      email: "Email",
      hours: "Jam Operasional",
    },
    quickResponse: {
      title: "Respon cepat di jam kerja",
      description:
        "Pesan yang masuk pada jam operasional umumnya kami balas dalam hitungan menit sampai jam - bukan hari.",
    },
    openNow: "Buka Sekarang - konsultasi langsung dibalas",
    closedNow: "Sedang Tutup - tinggalkan pesan, dibalas besok pagi",
    form: {
      title: "Ceritakan Kebutuhan Anda",
      description:
        "Isi formulir di bawah - pesan Anda akan terkirim langsung ke tim kami di meone@outlook.co.id.",
      nameLabel: "Nama Lengkap",
      namePlaceholder: "John Doe",
      emailLabel: "Email",
      emailPlaceholder: "john.doe@email.com",
      whatsappLabel: "No. WhatsApp",
      whatsappPlaceholder: "08xxxxxxxxxx",
      needLabel: "Jenis Kebutuhan",
      needPlaceholder: "Pilih kebutuhan…",
      customOption: "Solusi Kustom / Lainnya",
      messageLabel: "Ceritakan Proyek Anda",
      messagePlaceholder:
        "Contoh: Saya punya toko bangunan dan ingin sistem kasir + stok yang bisa dipakai di HP…",
      submit: "Kirim Pesan",
      sending: "Mengirim…",
      successNote:
        "Pesan Anda berhasil terkirim ke tim kami. Kami akan membalas segera pada jam operasional.",
      fallbackNote:
        "Perangkat email Anda akan terbuka dengan pesan yang sudah tersusun otomatis. Jika tidak terbuka, kirim manual ke",
      errorNote:
        "Terjadi kendala saat mengirim pesan. Silakan coba lagi, atau kirim langsung ke",
    },
    faq: {
      eyebrow: "FAQ",
      title: "Pertanyaan yang Sering Diajukan",
      description:
        "Belum menemukan jawabannya? Langsung tanya lewat formulir di atas atau email kami.",
      items: [
        {
          question: "Berapa biaya pembuatan aplikasi atau website?",
          answer:
            "Biaya sangat bergantung pada fitur dan kompleksitas yang dibutuhkan. Website company profile umumnya lebih terjangkau dibanding aplikasi enterprise. Ceritakan kebutuhan Anda lewat halaman kontak - konsultasi dan penawaran harga gratis, tanpa komitmen.",
        },
        {
          question: "Berapa lama proses pengerjaannya?",
          answer:
            "Website profesional biasanya selesai dalam 1-2 minggu. Mobile app dan aplikasi enterprise menyesuaikan jumlah fiturnya, umumnya 1-3 bulan. Estimasi detail akan kami sertakan di proposal proyek.",
        },
        {
          question: "Apakah saya bisa meminta revisi desain?",
          answer:
            "Tentu bisa. Tahap desain UI/UX melibatkan Anda sejak awal, dan revisi dilakukan hingga desain benar-benar sesuai harapan sebelum masuk tahap pengembangan.",
        },
        {
          question: "Apakah ada garansi setelah aplikasi selesai?",
          answer:
            "Ada. Setiap proyek mendapatkan masa garansi perbaikan bug setelah serah terima. Tersedia juga opsi kontrak pemeliharaan bulanan untuk update konten, monitoring, dan pengembangan fitur lanjutan.",
        },
        {
          question: "Apakah menerima proyek dari luar Jombang?",
          answer:
            "Ya. Kami menerima klien dari seluruh Indonesia. Komunikasi dapat dilakukan secara remote melalui email, WhatsApp, atau video call - dan tetap efektif tanpa harus bertemu langsung.",
        },
        {
          question: "Bagaimana skema pembayarannya?",
          answer:
            "Umumnya dimulai dengan DP, kemudian pelunasan dibagi per tahapan (milestone) yang telah disepakati di proposal. Semua tertulis jelas di awal agar transparan bagi kedua pihak.",
        },
      ],
    },
  },
  notFound: {
    title: "Halaman tidak ditemukan",
    description:
      "Halaman yang Anda cari mungkin sudah dipindahkan atau belum pernah ada. Yuk kembali menjelajah dari beranda.",
    backHome: "Kembali ke Beranda",
  },
  blog: {
    header: {
      eyebrow: "Artikel",
      titleStart: "Wawasan ",
      titleHighlight: "Digital",
      titleEnd: " dari Kami",
      description:
        "Tips, panduan, dan sudut pandang seputar website serta transformasi digital untuk bisnis dan pendidikan.",
    },
    readMore: "Baca Selengkapnya",
    backToBlog: "Semua Artikel",
    minRead: "menit baca",
    searchPlaceholder: "Cari artikel...",
    allTags: "Semua",
    noResults: "Tidak ada artikel yang cocok dengan pencarianmu.",
  },
  legal: {
    privacyTitle: "Kebijakan Privasi",
    termsTitle: "Syarat & Ketentuan",
    lastUpdated: "Terakhir diperbarui",
    contactHeading: "Ada pertanyaan tentang dokumen ini?",
    contactBody:
      "Hubungi kami melalui meone@outlook.co.id - kami akan dengan senang hati menjelaskan lebih detail.",
  },
  news: {
    title: "Kabar dari Latansa",
    desc: "Artikel, tips digital, dan penawaran terbatas - langsung ke email Anda, tanpa spam.",
    placeholder: "Alamat email Anda",
    button: "Berlangganan",
    success: "Terima kasih! Email Anda sudah kami catat.",
    invalid: "Gagal mencatat email. Coba lagi atau hubungi kami langsung.",
  },
  profile: {
    title: "Profil Perusahaan",
    tagline: "Solusi Software untuk Bisnis & Pendidikan",
    download: "Unduh PDF",
    docNote:
      "Ringkasan perusahaan satu halaman - siap dibagikan ke mitra, bank, atau investor.",
  },
  pricing: {
    header: {
      eyebrow: "Harga & Paket",
      titleStart: "Investasi ",
      titleHighlight: "Transparan",
      titleEnd: ", Sesuai Kebutuhan",
      description:
        "Harga paket website yang jelas sejak awal. Untuk aplikasi enterprise, pendidikan, maupun mobile app, biaya dihitung berdasarkan ruang lingkup setelah konsultasi gratis.",
    },
    popularBadge: "Paling Direkomendasikan",
    startFrom: "Mulai dari",
    perProject: "/proyek",
    ctaPlan: "Konsultasi Sekarang",
    plans: [
      {
        name: "Website UMKM",
        price: "Rp 1,5 jt",
        description:
          "Cocok untuk memulai kehadiran online usaha kecil dan personal branding.",
        features: [
          "Website responsif 1-5 halaman",
          "Domain + hosting 1 tahun",
          "Desain template profesional",
          "Tombol WhatsApp & Google Maps",
          "SEO dasar on-page",
          "Revisi desain 2 kali",
          "Garansi perbaikan 30 hari",
        ],
      },
      {
        name: "Website Bisnis",
        price: "Rp 3,9 jt",
        description:
          "Pilihan terlengkap untuk bisnis yang serius ingin tumbuh di dunia digital.",
        popular: true,
        features: [
          "Semua fitur paket UMKM",
          "Halaman hingga 12+ sesuai kebutuhan",
          "Domain .com + hosting lebih cepat",
          "Panel admin kelola konten sendiri",
          "Integrasi media sosial & email bisnis",
          "Revisi desain 4 kali",
          "Garansi perbaikan 60 hari",
        ],
      },
      {
        name: "Toko Online",
        price: "Rp 6,9 jt",
        description:
          "Mulai jualan online dengan katalog produk dan pembayaran otomatis.",
        features: [
          "Semua fitur paket Bisnis",
          "Katalog produk tanpa batas",
          "Keranjang belanja & checkout",
          "Payment gateway (QRIS, transfer VA)",
          "Notifikasi pesanan via email",
          "Pelatihan mengelola toko",
          "Garansi perbaikan 90 hari",
        ],
      },
    ],
    custom: {
      title: "Butuh Aplikasi Enterprise, Pendidikan, atau Mobile App?",
      description:
        "Biaya sangat bergantung pada fitur dan kompleksitas. Setelah konsultasi gratis, Anda menerima proposal lengkap berisi ruang lingkup, timeline, dan estimasi biaya yang transparan.",
      priceLabel: "Mulai dari",
      price: "Rp 15 jt",
      cta: "Diskusikan Proyek Anda",
    },
    note: "Semua harga adalah titik awal perkiraan dan dapat disesuaikan dengan fitur serta anggaran Anda. Konsultasi selalu gratis - tanpa komitmen apa pun.",
    calc: {
      title: "Kalkulator Estimasi Biaya",
      subtitle:
        "Pilih jenis proyek dan fitur tambahan untuk mendapatkan rentang estimasi secara instan.",
      projectLabel: "Jenis Proyek",
      projects: {
        web: "Website Company Profile",
        toko: "Toko Online",
        mobile: "Aplikasi Mobile",
        system: "Sistem / Aplikasi Khusus",
      },
      addonsLabel: "Fitur Tambahan (opsional)",
      addons: {
        admin: "Panel Admin",
        login: "Login & Multi-user",
        payment: "Payment Gateway",
        i18n: "Multi-bahasa",
        waapi: "Integrasi WhatsApp API",
        dashboard: "Laporan & Dashboard",
        push: "Notifikasi Push",
      },
      estimateLabel: "Estimasi Rentang Biaya",
      note: "*Estimasi kasar titik awal - harga final ditentukan setelah diskusi kebutuhan lengkap.",
      cta: "Ajukan Konsultasi dengan Estimasi Ini",
    },
  },
  games: {
    header: {
      eyebrow: "Permainan Web",
      titleStart: "Sambil Nunggu, ",
      titleHighlight: "Main Dulu!",
      titleEnd: "",
      description:
        "Empat permainan ringan buatan sendiri untuk mengisi waktu santai - tanpa iklan, tanpa unduhan, langsung main dari browser di HP maupun desktop.",
    },
    playNow: "Main Sekarang",
    howToTitle: "Cara Bermain",
    backToAll: "Semua Permainan",
    otherGames: "Permainan Lainnya",
    items: [
      {
        slug: "snake",
        name: "Snake",
        tagline:
          "Klasik abadi: kendalikan ular, makan terus, dan jangan pernah menabrak badan sendiri.",
        description:
          "Snake adalah permainan arcade legendaris yang lahir era 70-an. Versi ini dibuat ulang khusus untuk layar sentuh - geser jari atau gunakan tombol arah yang tersedia - dan tetap nyaman dimainkan dengan keyboard di desktop. Skor tertinggi Anda tersimpan otomatis di perangkat.",
        instructions: [
          "Geser layar (di HP) atau tekan tombol panah / WASD untuk mengubah arah ular.",
          "Makan titik hijau agar tubuh memanjang dan skor bertambah satu.",
          "Kecepatan ular akan meningkat seiring bertambahnya skormu.",
          "Permainan berakhir jika kepala ular menabrak dinding atau tubuh sendiri.",
        ],
      },
      {
        slug: "memory-match",
        name: "Memory Match",
        tagline:
          "Latih daya ingat dengan menemukan seluruh pasangan kartu sesedikit mungkin langkah.",
        description:
          "Delapan pasang ikon disembunyikan di balik kartu tertutup. Balikkan dua kartu setiap giliran: jika ikonnya sama, pasangan itu tetap terbuka. Cocokkan semuanya dalam hitungan langkah seringkat mungkin dan kalahkan rekor pribadimu!",
        instructions: [
          "Ketuk dua kartu untuk membaliknya dan melihat ikonnya.",
          "Jika kedua ikon sama, kartu tetap terbuka. Jika tidak, kartu tertutup kembali.",
          "Ingat posisi setiap ikon untuk mencocokkan pasangan berikutnya.",
          "Seluruh 8 pasangan ditemukan = kamu menang. Makin sedikit langkah, makin hebat!",
        ],
      },
      {
        slug: "tic-tac-toe",
        name: "Tic Tac Toe",
        tagline:
          "X melawan O melawan komputer - buktikan siapa yang lebih cerdik menyusun tiga garis.",
        description:
          "Permainan papan klasik yang tak pernah membosankan. Kamu memainkan X melawan komputer yang dilengkapi AI minimax - artinya komputer berpikir beberapa langkah ke depan dan sulit ditipu. Mampu mengalahkannya adalah tanda strategimu benar-benar matang; hasil seri pun sudah patut dibanggakan.",
        instructions: [
          "Kamu memainkan X dan selalu mendapat giliran pertama.",
          "Ketuk kotak kosong untuk menempatkan tanda X milikmu.",
          "Susun tiga tanda sejajar - horizontal, vertikal, atau diagonal - untuk menang.",
          "Komputer membalas dengan AI minimax; mencuri kemenangan darinya adalah prestasi sesungguhnya.",
        ],
      },
      {
        slug: "rock-paper-scissors",
        name: "Batu Kertas Gunting",
        tagline:
          "Duel kilat melawan komputer: batu menghancurkan gunting, gunting memotong kertas, kertas membungkus batu.",
        description:
          "Permainan suit paling populer di dunia, kini melawan komputer dengan pilihan acak di setiap ronde. Skor kemenanganmu dicatat berjalan - seberapa tinggi streak bisa kamu buat sebelum komputer balas menyerang?",
        instructions: [
          "Pilih salah satu senjata: batu, kertas, atau gunting.",
          "Komputer memilih senjatanya secara acak pada saat yang sama.",
          "Batu mengalahkan gunting, gunting mengalahkan kertas, kertas mengalahkan batu.",
          "Skor Anda vs komputer tercatat berjalan hingga skornya direset.",
        ],
      },
    ],
    leaderboard: {
      title: "Papan Rekor Kamu",
      snakeLabel: "Skor Snake",
      memoryLabel: "Langkah Memory",
      tttLabel: "Menang Tic Tac Toe",
      movesSuffix: "langkah",
      resetAll: "Reset semua skor",
      emptyHint:
        "Skor tersimpan di perangkat kamu - mainkan game-game di atas untuk mengisinya!",
    },
    ui: {
      score: "Skor",
      best: "Rekor",
      start: "Mulai",
      pause: "Jeda",
      resume: "Lanjut",
      restart: "Main Lagi",
      gameOver: "Permainan Selesai",
      moves: "Langkah",
      pairsFound: "Pasangan",
      you: "Anda",
      computer: "Komputer",
      win: "Anda Menang!",
      lose: "Komputer Menang!",
      draw: "Hasil Seri!",
      yourTurn: "Giliran Anda (X)",
      resetScore: "Reset Skor",
      chooseWeapon: "Pilih senjatamu!",
      rock: "Batu",
      paper: "Kertas",
      scissors: "Gunting",
      up: "Atas",
      down: "Bawah",
      left: "Kiri",
      right: "Kanan",
    },
  },
};

export type Dictionary = typeof id;

const en: Dictionary = {
  meta: {
    tagline: "Software Solutions for Business & Education",
    description:
      "Latansa is a software development company helping businesses, schools, and SMEs build enterprise applications, education platforms, mobile apps, and professional websites - from free consultation to post-launch support.",
  },
  nav: {
    home: "Home",
    about: "About Us",
    products: "Products",
    games: "Games",
    pricing: "Pricing",
    blog: "Blog",
    contact: "Contact",
    startProject: "Start a Project",
  },
  hero: {
    titleStart: "Turn Your Ideas Into Digital Reality with ",
    titleHighlight: "Latansa",
    description:
      "We help businesses and educational institutions build enterprise applications, education platforms, mobile apps, and professional websites - starting from a free consultation all the way to post-launch support.",
    primaryCta: "Free Consultation",
    secondaryCta: "Explore Our Products",
    stats: [
      { value: "4", label: "Digital Product Lines" },
      { value: "100%", label: "Mobile-First & Responsive" },
      { value: "<24h", label: "Consultation Response" },
    ],
    mockUrl: "latansa.id/dashboard",
    liveBadge: "LIVE",
    progress: [
      { label: "UI Design", width: "90%" },
      { label: "Development", width: "72%" },
      { label: "Testing", width: "45%" },
    ],
    floatA: {
      title: "Launch Faster",
      sub: "Structured & transparent process",
    },
    floatB: {
      title: "Secure & Trusted",
      sub: "Your data stays private",
    },
  },
  techStrip: "Built with Modern & Proven Technologies",
  productsSection: {
    eyebrow: "Our Products",
    titleStart: "Four Product Lines, ",
    titleHighlight: "One Goal",
    titleEnd: ": Helping You Grow",
    description:
      "From internal company systems to your business storefront website - everything is designed specifically around your needs, not off-the-shelf templates.",
  },
  learnMore: "Learn More",
  whyUs: {
    eyebrow: "Why Latansa",
    title: "Why Start With Us?",
    description:
      "We are a young studio on the rise - and that is exactly our advantage: every project gets our full attention, not just another ticket number.",
    items: [
      {
        title: "Friendly Pricing",
        description:
          "As a growing studio, we offer transparent and realistic pricing - tailored to your needs and budget.",
      },
      {
        title: "Collaborative Approach",
        description:
          "You are involved at every stage - from early discussions and design to launch. Not just 'done for you', but built together.",
      },
      {
        title: "Modern Technology",
        description:
          "We use up-to-date technology stacks that are fast, secure, and easy to extend, so your product will not become obsolete anytime soon.",
      },
      {
        title: "Mobile-First & Responsive",
        description:
          "Every product is designed mobile-first without compromising the experience on tablets or desktops.",
      },
      {
        title: "Post-Launch Support",
        description:
          "Bug-fix warranty and optional monthly maintenance keep your application healthy and evolving after launch.",
      },
      {
        title: "Local & Easy to Reach",
        description:
          "We are easy to contact and open to face-to-face meetings for clients in the surrounding area.",
      },
    ],
  },
  processSection: {
    eyebrow: "Our Process",
    title: "A Clear & Transparent Workflow",
    description:
      "Five simple steps from idea to a running application - you always know where your project stands.",
    steps: [
      {
        step: "01",
        title: "Consultation & Discovery",
        description:
          "Tell us your needs and challenges for free. We help shape your idea into the right digital solution.",
      },
      {
        step: "02",
        title: "Proposal & Planning",
        description:
          "You receive a proposal covering scope, timeline, and clear cost estimates - no hidden fees.",
      },
      {
        step: "03",
        title: "UI/UX Design",
        description:
          "Interfaces are designed mobile-first with a modern approach, then refined with you until they truly fit.",
      },
      {
        step: "04",
        title: "Development",
        description:
          "Coding uses current technologies with regular progress updates so you are always in the loop.",
      },
      {
        step: "05",
        title: "Launch & Support",
        description:
          "Thorough testing, launch, user training, and maintenance support once your application is live.",
      },
    ],
  },
  cta: {
    titleStart: "Have an idea or problem that needs ",
    titleHighlight: "a digital solution",
    titleEnd: "?",
    description:
      "Tell us what you need today. The initial consultation is free - we help shape the solution that best fits your goals and budget.",
    button: "Get a Free Consultation",
  },
  footer: {
    description:
      "A software development studio helping businesses and educational institutions start their digital transformation with precisely-targeted solutions.",
    navigationTitle: "Navigation",
    productsTitle: "Products",
    contactTitle: "Contact",
    copyright: "All rights reserved.",
    builtWith: "Built with Next.js & Tailwind CSS.",
    newsletterSide:
      "At most 1-2 emails per month. Unsubscribe anytime with one click.",
  },
  contactInfo: {
    addressFull:
      "Jalan Raya Bandung, Diwek District, Jombang Regency, East Java 61471, Indonesia",
    addressShort: "Jl. Raya Bandung, Diwek, Jombang 61471",
    hours: "Saturday - Wednesday, 08.00 - 16.00 WIB (GMT+7)",
  },
  products: [
    {
      slug: "aplikasi-enterprise",
      name: "Enterprise Application",
      tagline: "Integrated systems for more efficient business operations",
      summary:
        "ERP, inventory management, POS, and internal systems designed specifically around your company's workflow.",
      description: [
        "Every business works in its own unique way. Enterprise applications from Latansa help digitize your business processes - from stock recording and POS transactions to employee management and reports that are usually done manually through spreadsheets.",
        "We build systems from scratch according to your requirements, so the application truly follows your company's workflow - not the other way around. The result: tidier operations, more accurate data, and faster decision-making.",
      ],
      features: [
        "Real-time inventory & stock management",
        "Integrated Point of Sale (POS)",
        "Sales reporting & analytics dashboard",
        "Multi-user with tiered access control",
        "Workflow automation (approvals, notifications)",
        "Data export & API integration",
      ],
      idealFor: [
        "Distributors & Wholesalers",
        "Retail & Multi-branch F&B",
        "Manufacturing & Workshops",
        "Service Companies",
      ],
      tech: ["Next.js", "Laravel", "MySQL", "REST API"],
    },
    {
      slug: "aplikasi-pendidikan",
      name: "Education Application",
      tagline: "Digitize schools and educational institutions in one platform",
      summary:
        "Academic information systems, online admissions, e-exams, and parent portals for schools, Islamic boarding schools, and course providers.",
      description: [
        "Manual school administration often consumes teachers' and staff time. Education applications from Latansa help schools, boarding schools, and course institutions manage academic data centrally - from new student registration to report card issuance.",
        "Designed with simple interfaces so teachers, staff, students, and parents can use it easily without complicated training.",
      ],
      features: [
        "Integrated academic information system",
        "Online student admission (PPDB)",
        "Online exams with question banks",
        "Digital attendance for students & teachers",
        "Digital report cards & grade archives",
        "Parent portal with notifications",
      ],
      idealFor: [
        "Elementary, Middle & High Schools",
        "Islamic Boarding Schools",
        "Course Providers & Tutoring",
        "Kindergarten / Early Childhood",
      ],
      tech: ["Next.js", "React", "Laravel", "Firebase"],
    },
    {
      slug: "mobile-app",
      name: "Mobile App",
      tagline: "Fast, lightweight Android & iOS applications people love to use",
      summary:
        "Cross-platform mobile applications for businesses, startups, and communities - complete from development to Play Store publishing.",
      description: [
        "Your customers live on their smartphones. A mobile app brings your business closer: promotions delivered straight to users, easier ordering, and a brand that sticks in memory.",
        "We develop apps using a cross-platform approach so Android and iOS versions can launch faster at lower cost - without sacrificing user experience quality.",
      ],
      features: [
        "Cross-platform: one codebase for Android & iOS",
        "Push notifications for promos & information",
        "Payment gateway integration",
        "Offline mode & data synchronization",
        "Secure authentication (login, OTP)",
        "Play Store / App Store publishing assistance",
      ],
      idealFor: [
        "SMEs & Online Stores",
        "Digital Startups",
        "Service Businesses (booking, delivery)",
        "Communities & Organizations",
      ],
      tech: ["Flutter", "React Native", "Firebase", "Node.js"],
    },
    {
      slug: "website-profesional",
      name: "Professional Website",
      tagline: "Company profiles and business websites that win customer trust",
      summary:
        "Professional homepages, company profiles, landing pages, and online stores - fast, secure, and easy to find on Google.",
      description: [
        "A website is the first digital storefront potential customers see. Before deciding to buy, they will search for your business on Google. A neat, professional website makes your business look credible and trustworthy.",
        "We build websites with modern design, fast performance, and SEO-friendly structure - plus a simple admin panel so you can update content yourself without being a programmer.",
      ],
      features: [
        "Modern, responsive & mobile-first design",
        "SEO-friendly structure for discoverability",
        "Admin panel to manage content yourself",
        "WhatsApp & Google Maps integration",
        "SSL security & fast loading performance",
        "Domain, hosting & business email setup assistance",
      ],
      idealFor: [
        "SMEs & Local Businesses",
        "Professionals (doctors, consultants, photographers)",
        "Schools & Foundations",
        "Events & Communities",
      ],
      tech: ["Next.js", "Tailwind CSS", "TypeScript", "Vercel"],
    },
  ],
  productsIndex: {
    eyebrow: "Our Products",
    titleStart: "Digital Solutions for ",
    titleHighlight: "Every Need",
    titleEnd: "",
    description:
      "Every business and institution faces different challenges. That is why all of our products are built to order - adapting to your workflow, not the other way around.",
    featureHeading: "Key Features",
    detailPrefix: "View Details",
    customTitle: "Can't find what you're looking for?",
    customDescription:
      "The four products above are only starting points. Tell us your unique needs - we build custom solutions from scratch.",
    customButton: "Discuss Your Idea",
  },
  productDetail: {
    backToAll: "All Products",
    consultCta: "Consult This Product",
    emailCta: "Send Email",
    emailSubjectPrefix: "Asking about",
    overviewTitle: "Overview",
    featuresTitle: "Key Features",
    idealForTitle: "Perfect For",
    techTitle: "Technologies Used",
    techNote:
      "Technologies can be adapted to your needs and the systems you already have.",
    interestedTitle: "Interested in this product?",
    interestedDesc:
      "Consult with us now - free and with no commitment. We help estimate the cost and timeline.",
    interestedButton: "Request a Free Consultation",
    otherProducts: "Other Products",
    viewAll: "View all",
    viewAllMobile: "View all products",
  },
  tentang: {
    header: {
      eyebrow: "About Us",
      titleStart: "A Young Studio with ",
      titleHighlight: "Big Standards",
      titleEnd: "",
      description:
        "Latansa was born from one simple belief: local businesses and educational institutions deserve quality technology too.",
    },
    story: {
      eyebrow: "Our Story",
      title: "It Started with Frustrations We Kept Hearing",
      paragraphs: [
        "\u201cThe POS system keeps failing.\u201d \u201cStudent data is still recorded in books.\u201d \u201cI want an app, but software development is expensive and only available in big cities.\u201d Sentences like these are exactly why Latansa exists.",
        "Based on Jalan Raya Bandung, Diwek District, we take an honest position: we are a young studio just getting started. We don't have many projects to show off yet - and precisely because of that, every incoming project receives the full attention of our entire team, treated as if it were our first and last portfolio piece.",
        "We focus on four product lines: enterprise applications, education applications, mobile apps, and professional websites - all built to order, with transparent processes and fair pricing for SMEs and schools alike.",
      ],
    },
    factsTitle: "Latansa at a Glance",
    factLabels: {
      location: "Location",
      email: "Email",
      hours: "Business Hours",
    },
    focusLabel: "Focus areas",
    visionLabel: "Vision",
    missionLabel: "Mission",
    visionText:
      "To become a trusted technology partner helping businesses and educational institutions transform digitally - gradually, affordably, and sustainably.",
    missionItems: [
      "Help SMEs and schools begin digital transformation step by step without straining their budgets.",
      "Build products anyone can genuinely use - not just the tech-savvy.",
      "Keep communication honest and processes transparent in every project.",
      "Grow the local digital ecosystem step by step.",
    ],
    valuesSection: {
      eyebrow: "Our Values",
      title: "Principles That Guide Every Project",
      description:
        "These six values form the foundation of how we work - from the first consultation until your application is running.",
      items: [
        {
          title: "Integrity",
          description:
            "Honest about capabilities, timelines, and costs. No overpromising - only commitments we fulfill.",
        },
        {
          title: "Continuous Innovation",
          description:
            "We keep learning the latest technologies so the solutions we deliver won't become outdated within a few years.",
        },
        {
          title: "Quality in Every Detail",
          description:
            "From code, interface design, to how we reply to emails - everything is done carefully.",
        },
        {
          title: "Collaboration",
          description:
            "Clients are partners. Your ideas combined with our technical experience produce the best product.",
        },
        {
          title: "User-Oriented",
          description:
            "A great application isn't the most sophisticated one - it's the one your people find easiest to use.",
        },
        {
          title: "Growing Together",
          description:
            "Our clients' success is our success. We aim to grow slowly but solidly together with our first clients.",
        },
      ],
    },
    cta: {
      titleStart: "Let's get acquainted - ",
      titleHighlight: "just a casual chat",
      titleEnd: "",
      description:
        "No preparation needed. Share your plans or challenges - we'll gladly help think through the solution, free of charge.",
      button: "Get a Free Consultation",
    },
  },
  kontak: {
    header: {
      eyebrow: "Contact",
      titleStart: "Let's Start Our ",
      titleHighlight: "Conversation",
      titleEnd: "",
      description:
        "Share your ideas, needs, or challenges. The initial consultation is completely free - with no obligations.",
    },
    labels: {
      address: "Office Address",
      email: "Email",
      hours: "Business Hours",
    },
    quickResponse: {
      title: "Fast response during business hours",
      description:
        "Messages received during operating hours are usually answered within minutes to hours - not days.",
    },
    openNow: "Open Now - consultations answered right away",
    closedNow: "Closed - leave a message, we reply next morning",
    form: {
      title: "Tell Us What You Need",
      description:
        "Fill in the form below - your message will be delivered straight to our team at meone@outlook.co.id.",
      nameLabel: "Full Name",
      namePlaceholder: "John Doe",
      emailLabel: "Email",
      emailPlaceholder: "john.doe@email.com",
      whatsappLabel: "WhatsApp Number",
      whatsappPlaceholder: "08xxxxxxxxxx",
      needLabel: "Type of Need",
      needPlaceholder: "Select your need…",
      customOption: "Custom Solution / Other",
      messageLabel: "Describe Your Project",
      messagePlaceholder:
        "Example: I run a hardware store and need a cashier + inventory system that works on my phone…",
      submit: "Send Message",
      sending: "Sending…",
      successNote:
        "Your message has been sent to our team. We will reply shortly during business hours.",
      fallbackNote:
        "Your email application will open with a pre-filled message. If it doesn't open, send manually to",
      errorNote:
        "Something went wrong while sending your message. Please try again, or email us directly at",
    },
    faq: {
      eyebrow: "FAQ",
      title: "Frequently Asked Questions",
      description:
        "Didn't find your answer? Ask directly through the form above or via email.",
      items: [
        {
          question: "How much does it cost to build an app or website?",
          answer:
            "Costs depend heavily on the required features and complexity. A company profile website is generally far more affordable than an enterprise application. Tell us your needs through the contact page - consultation and quotations are free, with no commitment.",
        },
        {
          question: "How long does a project take?",
          answer:
            "Professional websites usually take 1-2 weeks. Mobile apps and enterprise applications scale with their feature count, typically 1-3 months. Detailed estimates are included in the project proposal.",
        },
        {
          question: "Can I request design revisions?",
          answer:
            "Absolutely. The UI/UX design stage involves you from the start, and revisions continue until the design truly matches your expectations before development begins.",
        },
        {
          question: "Is there a warranty after completion?",
          answer:
            "Yes. Every project includes a bug-fix warranty period after handover. Optional monthly maintenance contracts cover content updates, monitoring, and further feature development.",
        },
        {
          question: "Do you accept projects outside Jombang?",
          answer:
            "Yes. We accept clients from all over Indonesia. Communication happens remotely via email, WhatsApp, or video call - and remains effective without meeting in person.",
        },
        {
          question: "What is the payment scheme?",
          answer:
            "Generally it starts with a down payment, followed by installments split across agreed milestones. Everything is documented clearly upfront to keep things transparent for both parties.",
        },
      ],
    },
  },
  notFound: {
    title: "Page not found",
    description:
      "The page you're looking for may have been moved or never existed. Head back to the homepage to keep exploring.",
    backHome: "Back to Home",
  },
  blog: {
    header: {
      eyebrow: "Articles",
      titleStart: "Our ",
      titleHighlight: "Digital",
      titleEnd: " Insights",
      description:
        "Tips, guides, and perspectives on websites and digital transformation for businesses and education.",
    },
    readMore: "Read More",
    backToBlog: "All Articles",
    minRead: "min read",
    searchPlaceholder: "Search articles...",
    allTags: "All",
    noResults: "No articles match your search.",
  },
  legal: {
    privacyTitle: "Privacy Policy",
    termsTitle: "Terms of Service",
    lastUpdated: "Last updated",
    contactHeading: "Questions about this document?",
    contactBody:
      "Reach us at meone@outlook.co.id - we will gladly explain in more detail.",
  },
  news: {
    title: "News from Latansa",
    desc: "Articles, digital tips, and limited offers - straight to your inbox, no spam.",
    placeholder: "Your email address",
    button: "Subscribe",
    success: "Thank you! Your email has been noted.",
    invalid: "Failed to record your email. Try again or contact us directly.",
  },
  profile: {
    title: "Company Profile",
    tagline: "Software Solutions for Business & Education",
    download: "Download PDF",
    docNote: "A one-page company overview - ready to share with partners, banks, or investors.",
  },
  pricing: {
    header: {
      eyebrow: "Pricing & Packages",
      titleStart: "A Transparent ",
      titleHighlight: "Investment",
      titleEnd: ", Tailored to Your Needs",
      description:
        "Clear website package pricing from the start. For enterprise, education, or mobile apps, costs are calculated based on scope after a free consultation.",
    },
    popularBadge: "Recommended",
    startFrom: "Starting from",
    perProject: "/project",
    ctaPlan: "Consult Now",
    plans: [
      {
        name: "Starter Website",
        price: "Rp 1,5 jt",
        description:
          "Perfect for small businesses and personal brands starting their online presence.",
        features: [
          "Responsive website, 1-5 pages",
          "Domain + hosting for 1 year",
          "Professional template design",
          "WhatsApp button & Google Maps",
          "Basic on-page SEO",
          "2 design revisions",
          "30-day bug-fix warranty",
        ],
      },
      {
        name: "Business Website",
        price: "Rp 3,9 jt",
        description:
          "The most complete choice for businesses serious about growing digitally.",
        popular: true,
        features: [
          "Everything in the Starter package",
          "Up to 12+ custom pages",
          ".com domain + faster hosting",
          "Admin panel to manage your own content",
          "Social media & business email integration",
          "4 design revisions",
          "60-day bug-fix warranty",
        ],
      },
      {
        name: "Online Store",
        price: "Rp 6,9 jt",
        description:
          "Start selling online with product catalogs and automatic payments.",
        features: [
          "Everything in the Business package",
          "Unlimited product catalog",
          "Shopping cart & checkout",
          "Payment gateway (QRIS, bank transfer VA)",
          "Order notifications via email",
          "Store management training",
          "90-day bug-fix warranty",
        ],
      },
    ],
    custom: {
      title: "Need an Enterprise, Education, or Mobile App?",
      description:
        "Costs depend heavily on features and complexity. After a free consultation, you receive a complete proposal covering scope, timeline, and transparent cost estimates.",
      priceLabel: "Starting from",
      price: "Rp 15 jt",
      cta: "Discuss Your Project",
    },
    note: "All prices are estimated starting points and can be adjusted to fit your features and budget. Consultations are always free - with no obligations.",
    calc: {
      title: "Cost Estimate Calculator",
      subtitle:
        "Pick a project type and optional features to instantly get an estimated price range.",
      projectLabel: "Project Type",
      projects: {
        web: "Company Profile Website",
        toko: "Online Store",
        mobile: "Mobile App",
        system: "Custom System / Application",
      },
      addonsLabel: "Add-on Features (optional)",
      addons: {
        admin: "Admin Panel",
        login: "Login & Multi-user",
        payment: "Payment Gateway",
        i18n: "Multi-language",
        waapi: "WhatsApp API Integration",
        dashboard: "Reports & Dashboard",
        push: "Push Notifications",
      },
      estimateLabel: "Estimated Price Range",
      note: "*Rough starting estimate - final pricing is set after a full requirements discussion.",
      cta: "Consult With This Estimate",
    },
  },
  games: {
    header: {
      eyebrow: "Web Games",
      titleStart: "While You Wait, ",
      titleHighlight: "Play a Bit!",
      titleEnd: "",
      description:
        "Four lightweight homemade games to fill your downtime - no ads, no downloads, playable straight from the browser on phone or desktop.",
    },
    playNow: "Play Now",
    howToTitle: "How to Play",
    backToAll: "All Games",
    otherGames: "Other Games",
    items: [
      {
        slug: "snake",
        name: "Snake",
        tagline:
          "The timeless classic: steer the snake, keep eating, and never crash into your own body.",
        description:
          "Snake is a legendary arcade game born in the 1970s. This version is rebuilt for touchscreens - swipe or use the on-screen arrow buttons - while staying comfortable with a keyboard on desktop. Your high score is saved automatically on your device.",
        instructions: [
          "Swipe the screen (on mobile) or press arrow keys / WASD to change the snake's direction.",
          "Eat the green dot to grow longer and add one point to your score.",
          "The snake speeds up as your score climbs.",
          "The game ends when the snake's head hits a wall or its own body.",
        ],
      },
      {
        slug: "memory-match",
        name: "Memory Match",
        tagline:
          "Train your memory by finding every card pair in as few moves as possible.",
        description:
          "Eight pairs of icons are hidden behind face-down cards. Flip two cards each turn: if the icons match, that pair stays open. Match them all within the fewest moves possible and beat your personal best!",
        instructions: [
          "Tap two cards to flip them and reveal their icons.",
          "If both icons match, the cards stay open. Otherwise they flip back.",
          "Memorize each icon's position to match the next pair faster.",
          "Finding all 8 pairs wins the game. The fewer moves, the better!",
        ],
      },
      {
        slug: "tic-tac-toe",
        name: "Tic Tac Toe",
        tagline:
          "X versus O versus the computer - prove who is cleverer at lining up three marks.",
        description:
          "The classic board game that never gets old. You play X against a computer powered by minimax AI - meaning it thinks several moves ahead and is hard to fool. Beating it proves your strategy truly sharp; even a draw is something to be proud of.",
        instructions: [
          "You play X and always get the first turn.",
          "Tap an empty square to place your X.",
          "Line up three marks - horizontally, vertically, or diagonally - to win.",
          "The computer answers with minimax AI; stealing a win from it is a real achievement.",
        ],
      },
      {
        slug: "rock-paper-scissors",
        name: "Rock Paper Scissors",
        tagline:
          "A lightning duel against the computer: rock crushes scissors, scissors cut paper, paper wraps rock.",
        description:
          "The world's most popular hand game, now against a computer making random picks every round. Your win count is tracked continuously - how long a streak can you build before the computer strikes back?",
        instructions: [
          "Pick your weapon: rock, paper, or scissors.",
          "The computer chooses its weapon randomly at the same time.",
          "Rock beats scissors, scissors beat paper, paper beats rock.",
          "Your score vs the computer keeps running until you reset it.",
        ],
      },
    ],
    leaderboard: {
      title: "Your Scoreboard",
      snakeLabel: "Snake Score",
      memoryLabel: "Memory Moves",
      tttLabel: "Tic Tac Toe Wins",
      movesSuffix: "moves",
      resetAll: "Reset all scores",
      emptyHint:
        "Scores are stored on your device - play the games above to fill this in!",
    },
    ui: {
      score: "Score",
      best: "Best",
      start: "Start",
      pause: "Pause",
      resume: "Resume",
      restart: "Play Again",
      gameOver: "Game Over",
      moves: "Moves",
      pairsFound: "Pairs",
      you: "You",
      computer: "Computer",
      win: "You Win!",
      lose: "Computer Wins!",
      draw: "It's a Draw!",
      yourTurn: "Your turn (X)",
      resetScore: "Reset Score",
      chooseWeapon: "Choose your weapon!",
      rock: "Rock",
      paper: "Paper",
      scissors: "Scissors",
      up: "Up",
      down: "Down",
      left: "Left",
      right: "Right",
    },
  },
};

export const dictionaries: Record<Locale, Dictionary> = { id, en };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
