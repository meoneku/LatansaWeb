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
  },
  contactInfo: {
    addressFull:
      "Jalan Raya Bandung, Kecamatan Diwek, Kabupaten Jombang, Jawa Timur 61471",
    addressShort: "Jl. Raya Bandung, Diwek, Jombang 61471",
    hours: "Senin - Sabtu, 08.00 - 17.00 WIB",
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
  },
  contactInfo: {
    addressFull:
      "Jalan Raya Bandung, Diwek District, Jombang Regency, East Java 61471, Indonesia",
    addressShort: "Jl. Raya Bandung, Diwek, Jombang 61471",
    hours: "Monday - Saturday, 08.00 - 17.00 WIB (GMT+7)",
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
};

export const dictionaries: Record<Locale, Dictionary> = { id, en };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
