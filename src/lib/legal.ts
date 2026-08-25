/**
 * Konten halaman hukum (Kebijakan Privasi & Syarat dan Ketentuan)
 * dalam dua bahasa. Disimpan terpisah dari dictionary agar ringkas.
 */

export type LegalSection = { heading: string; paragraphs: string[] };

export type LegalDoc = {
  title: string;
  sections: LegalSection[];
};

export type LegalContent = {
  privacy: Record<"id" | "en", LegalDoc>;
  terms: Record<"id" | "en", LegalDoc>;
};

const ID_UPDATED = "12 Agustus 2026";
const EN_UPDATED = "August 12, 2026";

export const legalUpdated: Record<"id" | "en", string> = {
  id: ID_UPDATED,
  en: EN_UPDATED,
};

export const legalContent: LegalContent = {
  privacy: {
    id: {
      title: "Kebijakan Privasi",
      sections: [
        {
          heading: "Pendahuluan",
          paragraphs: [
            "Latansa menghargai privasi setiap pengunjung website ini. Kebijakan berikut menjelaskan data apa yang kami kumpulkan, bagaimana kami menggunakannya, serta hak-hak Anda terkait data tersebut.",
          ],
        },
        {
          heading: "Data yang Kami Kumpulkan",
          paragraphs: [
            "Satu-satunya data yang kami kumpulkan adalah data yang Anda kirimkan secara sukarela melalui formulir kontak: nama, alamat email, nomor WhatsApp (opsional), jenis kebutuhan, dan isi pesan.",
            "Kami tidak menggunakan cookie pelacak pihak ketiga dan tidak memasang iklan di website ini.",
          ],
        },
        {
          heading: "Penggunaan Data",
          paragraphs: [
            "Data yang Anda kirim digunakan semata-mata untuk menanggapi pertanyaan atau permintaan konsultasi Anda. Pesan diteruskan ke tim kami melalui layanan Telegram dan/atau email resmi Latansa.",
          ],
        },
        {
          heading: "Penyimpanan dan Keamanan",
          paragraphs: [
            "Pesan tersimpan pada kanal komunikasi resmi kami (Telegram dan email) yang dilindungi autentikasi dua faktor. Website ini juga menerapkan pengaturan keamanan standar industri seperti pembatasan permintaan (rate limit) dan proteksi terhadap spam otomatis.",
          ],
        },
        {
          heading: "Berbagi Data",
          paragraphs: [
            "Kami tidak menjual, menyewakan, maupun membagikan data Anda kepada pihak ketiga untuk keperluan apa pun. Data hanya dapat diungkap bila diwajibkan oleh hukum yang berlaku.",
          ],
        },
        {
          heading: "Hak Anda",
          paragraphs: [
            "Anda berhak meminta salinan, koreksi, atau penghapusan data yang pernah Anda kirimkan. Cukup hubungi kami melalui meone@outlook.co.id dan kami akan memprosesnya secepatnya.",
          ],
        },
      ],
    },
    en: {
      title: "Privacy Policy",
      sections: [
        {
          heading: "Introduction",
          paragraphs: [
            "Latansa respects the privacy of every visitor of this website. This policy explains what data we collect, how we use it, and your rights regarding that data.",
          ],
        },
        {
          heading: "Data We Collect",
          paragraphs: [
            "The only data we collect is what you voluntarily submit through the contact form: name, email address, WhatsApp number (optional), type of need, and message content.",
            "We do not use third-party tracking cookies and we do not display ads on this website.",
          ],
        },
        {
          heading: "How We Use Data",
          paragraphs: [
            "Data you submit is used solely to respond to your questions or consultation requests. Messages are forwarded to our team via Telegram and/or Latansa's official email.",
          ],
        },
        {
          heading: "Storage and Security",
          paragraphs: [
            "Messages are stored on our official communication channels (Telegram and email) protected by two-factor authentication. This website also applies industry-standard security settings such as request rate limiting and automatic spam protection.",
          ],
        },
        {
          heading: "Data Sharing",
          paragraphs: [
            "We never sell, rent, or share your data with any third party for any purpose. Data may only be disclosed when required by applicable law.",
          ],
        },
        {
          heading: "Your Rights",
          paragraphs: [
            "You may request a copy, correction, or deletion of the data you have submitted. Simply contact us at meone@outlook.co.id and we will process it promptly.",
          ],
        },
      ],
    },
  },

  terms: {
    id: {
      title: "Syarat & Ketentuan",
      sections: [
        {
          heading: "Lingkup Layanan",
          paragraphs: [
            "Latansa menyediakan jasa pengembangan software meliputi aplikasi enterprise, aplikasi pendidikan, mobile app, dan website profesional. Setiap proyek diatur dalam proposal tertulis yang disepakati kedua belah pihak sebelum pekerjaan dimulai.",
          ],
        },
        {
          heading: "Konsultasi dan Penawaran",
          paragraphs: [
            "Konsultasi awal dan penawaran harga diberikan gratis. Estimasi biaya bersifat perkiraan dan final setelah ruang lingkup proyek disepakati dalam proposal.",
          ],
        },
        {
          heading: "Pembayaran",
          paragraphs: [
            "Skema pembayaran umumnya dimulai dengan uang muka (DP) dilanjutkan pelunasan per tahapan (milestone) sesuai proposal. Proyek dikerjakan setelah DP diterima.",
          ],
        },
        {
          heading: "Revisi dan Garansi",
          paragraphs: [
            "Jumlah revisi desain dan masa garansi perbaikan bug mengikuti paket atau kesepakatan yang tertulis di proposal. Permintaan di luar lingkup kesepakatan akan dihitung sebagai pekerjaan tambahan.",
          ],
        },
        {
          heading: "Hak Kekayaan Intelektual",
          paragraphs: [
            "Seluruh hak kepemilikan kode sumber dan desain berpindah sepenuhnya kepada klien setelah pelunasan akhir. Latansa berhak menampilkan proyek sebagai portofolio kecuali klien meminta sebaliknya secara tertulis.",
          ],
        },
        {
          heading: "Batasan Tanggung Jawab",
          paragraphs: [
            "Latansa tidak bertanggung jawab atas kerugian tidak langsung yang timbul dari penggunaan produk, termasuk namun tidak terbatas pada gangguan layanan pihak ketiga seperti hosting atau payment gateway.",
          ],
        },
        {
          heading: "Perubahan Ketentuan",
          paragraphs: [
            "Syarat dan ketentuan ini dapat diperbarui sewaktu-waktu. Versi terbaru selalu tersedia pada halaman ini beserta tanggal pembaruannya.",
          ],
        },
      ],
    },
    en: {
      title: "Terms of Service",
      sections: [
        {
          heading: "Scope of Services",
          paragraphs: [
            "Latansa provides software development services including enterprise applications, education applications, mobile apps, and professional websites. Every project is governed by a written proposal agreed upon by both parties before work begins.",
          ],
        },
        {
          heading: "Consultation and Quotations",
          paragraphs: [
            "Initial consultations and quotations are provided free of charge. Cost estimates are approximate and become final once the project scope is agreed upon in the proposal.",
          ],
        },
        {
          heading: "Payment",
          paragraphs: [
            "The payment scheme generally starts with a down payment followed by installments per milestone as stated in the proposal. Work begins once the down payment is received.",
          ],
        },
        {
          heading: "Revisions and Warranty",
          paragraphs: [
            "The number of design revisions and the bug-fix warranty period follow the chosen package or agreements written in the proposal. Requests beyond the agreed scope are billed as additional work.",
          ],
        },
        {
          heading: "Intellectual Property",
          paragraphs: [
            "Full ownership of source code and design transfers to the client after final payment. Latansa reserves the right to feature the project as a portfolio item unless the client requests otherwise in writing.",
          ],
        },
        {
          heading: "Limitation of Liability",
          paragraphs: [
            "Latansa is not liable for indirect losses arising from product usage, including but not limited to third-party service disruptions such as hosting or payment gateways.",
          ],
        },
        {
          heading: "Changes to These Terms",
          paragraphs: [
            "These terms may be updated at any time. The latest version is always available on this page along with its revision date.",
          ],
        },
      ],
    },
  },
};
