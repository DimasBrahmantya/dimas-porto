import { Project } from "@/types/project";

export const projectsData: Project[] = [
  {
    id: "loyalty-card",
    slug: "loyalty-card",
    title: "LoyaltyCard SaaS",
    type: "SaaS Product",
    category: "webapp",
    year: "2026",
    role: "Full-Stack Engineer & System Architect",
    desc: "Platform kartu loyalitas digital multi-tenant modern berbasis web untuk UMKM dengan pemindaian QR otomatis kasir, PostgreSQL Row Level Security (RLS), dan akses instan tanpa login.",
    fullDescription: 
      "LoyaltyCard adalah platform Software-as-a-Service (SaaS) kartu stempel loyalitas digital multi-tenant modern yang dirancang untuk memberdayakan pelaku UMKM (seperti kafe, barbershop, salon, dan laundry) dalam mempertahankan retensi pelanggan tanpa kartu stempel kertas konvensional yang mudah hilang atau rusak.\n\nSistem ini dirancang dengan pendekatan zero-friction: pelanggan tidak diwajibkan mengunduh aplikasi seluler atau mendaftar akun. Pelanggan cukup membuka tautan token acak berkekuatan kriptografi 192-bit (/c/[token]) yang memuat kartu loyalitas interaktif dan QR code identitas unik. Di sisi operasional kasir, sistem menyediakan pemindai QR berbasis kamera web dengan fitur auto-stamp otomatis, umpan balik audio chime, dan mutasi data atomik yang terlindungi dari race condition melalui PostgreSQL Stored Procedures (RPC).\n\nKeamanan dan privasi data multi-tenant diisolasi secara ketat pada level kernel basis data menggunakan PostgreSQL Row Level Security (RLS) pada Supabase, didukung sistem Role-Based Access Control (RBAC) antara Owner dan Staf Kasir, kustomisasi identitas brand toko (logo auto-cutout, warna tema, target stempel, & reward), serta kepatuhan penuh terhadap UU Perlindungan Data Pribadi (UU PDP No. 27/2022).",
    features: [
      "Pemindai QR kamera kasir otomatis (Auto-Stamp) dengan audio chime & haptic feedback",
      "Akses kartu instan pelanggan tanpa registrasi/aplikasi via token kriptografi 192-bit (/c/[token])",
      "Isolasi multi-tenant mutlak di level basis data menggunakan PostgreSQL Row Level Security (RLS)",
      "Role-Based Access Control (RBAC) ketat antara Pemilik Usaha (Owner) dan Staf Kasir",
      "Mutasi stempel, pembatalan (void), dan penukaran reward atomik via PostgreSQL Stored Procedures (RPC)",
      "Kustomisasi identitas brand lengkap (logo auto-cutout, warna tema toko, ikon stempel, & target reward)",
      "Navigasi cepat direct-access kartu pelanggan langsung dari daftar pelanggan admin",
      "Pengujian integritas & konkurensi basis data in-memory menggunakan PGlite WebAssembly",
      "Kepatuhan regulasi perlindungan data pribadi sesuai prinsip UU PDP No. 27/2022"
    ],
    tech: ["Next.js", "TypeScript", "Supabase", "PostgreSQL RLS", "TailwindCSS", "shadcn/ui", "Zod"],
    image: "/projects/loyaltycard.png",
    link: "https://loyaltycard-sable.vercel.app/",
    githubUrl: "https://github.com/DimasBrahmantya/loyaltycard",
    liveUrl: "https://loyaltycard-sable.vercel.app/",
    highlight: true
  },
  {
    id: "simrs-rawat-jalan",
    slug: "simrs-rawat-jalan",
    title: "SIMRS Rawat Jalan",
    type: "Final Tasks",
    category: "webapp",
    year: "2026",
    role: "Full-Stack Web Developer",
    desc: "Sistem pendaftaran rawat jalan rumah sakit dengan manajemen jadwal dokter, rekapitulasi data pasien, dan monitoring antrean secara realtime.",
    fullDescription: 
      "Sistem Informasi Manajemen Rumah Sakit (SIMRS) modul Rawat Jalan ini dikembangkan sebagai proyek tugas akhir untuk menyelesaikan permasalahan birokrasi dan penumpukan antrean pasien di fasilitas kesehatan. Sistem ini mengintegrasikan alur pendaftaran mandiri pasien, alokasi kuota poliklinik per dokter spesialis, pencatatan rekam medis terpadu, hingga visualisasi nomor antrean ruang tunggu yang akurat dan responsif.",
    features: [
      "Manajemen pendaftaran pasien mandiri dan verifikasi data identitas (NIK/No. RM)",
      "Penjadwalan kuota dokter spesialis realtime dengan filter poliklinik",
      "Papan antrean digital (Live Queue Display) untuk ruang tunggu poliklinik",
      "Dashboard analitik rekapitulasi data kunjungan pasien harian dan bulanan",
      "Manajemen hak akses role bertingkat (Admin, Loket Pendaftaran, Dokter, Petugas Poli)"
    ],
    tech: ["Next.js", "MongoDB", "TailwindCSS", "Node.js", "REST API"],
    image: "/projects/simrs.png",
    link: "https://github.com/DimasBrahmantya/Simrs-Rawat-Jalan.git",
    githubUrl: "https://github.com/DimasBrahmantya/Simrs-Rawat-Jalan.git",
    liveUrl: "",
    highlight: true
  },
  {
    id: "secure-hub",
    slug: "secure-hub",
    title: "Secure Hub",
    type: "Tugas Kuliah",
    category: "webapp",
    year: "2025",
    role: "Backend & Security Engineer",
    desc: "Platform pendeteksi tautan berbahaya dan anti-phishing dengan integrasi microservice arsitektur modern.",
    fullDescription: 
      "Secure Hub adalah solusi keamanan siber berbasis web yang dirancang untuk menganalisis, mengidentifikasi, dan memitigasi serangan rekayasa sosial seperti link phishing dan malware. Sistem memanfaatkan arsitektur microservices untuk melakukan scanning URL berlapis dengan latency sangat rendah, integrasi database reputasi domain global, serta memberikan feedback skor risiko keamanan seketika kepada pengguna sebelum membuka link yang mencurigakan.",
    features: [
      "Pemeriksaan tautan URL otomatis menggunakan algoritma heuristik & reputasi domain",
      "Arsitektur backend microservices performa tinggi dengan NestJS",
      "Deteksi typo-squatting, homograph attack, dan pemendek tautan (URL shortener expansion)",
      "API endpoint terisolasi untuk integrasi pihak ketiga",
      "Panel riwayat pelaporan ancaman siber dan audit log keamanan"
    ],
    tech: ["Next.js", "NestJS", "MongoDB", "TypeScript", "TailwindCSS"],
    image: "/projects/securehub.png",
    link: "https://github.com/DimasBrahmantya/Secure-Hub.git",
    githubUrl: "https://github.com/DimasBrahmantya/Secure-Hub.git",
    liveUrl: "",
    highlight: true
  },
  {
    id: "rsud-grati",
    slug: "rsud-grati",
    title: "Sistem Pendaftaran RSUD Grati",
    type: "Intern Tasks",
    category: "webapp",
    year: "2025",
    role: "Full-Stack Developer Intern",
    desc: "Pengembangan modul pendaftaran pasien rawat jalan langsung di RSUD Grati Kabupaten Pasuruan.",
    fullDescription: 
      "Proyek ini dikembangkan saat menjalani program magang kerja profesional di RSUD Grati Kabupaten Pasuruan. Modul ini fokus mendigitalkan alur pendaftaran pasien poliklinik langsung di lokasi (on-premise kiosk), mempercepat proses pencarian data rekam medis pasien lama, validasi data BPJS/umum, serta mencetak bukti registrasi antrean poliklinik secara efisien guna memangkas waktu tunggu loket.",
    features: [
      "Pencarian cepat riwayat pasien berdasarkan NIK dan Nomor Rekam Medis",
      "Pemisahan alur pasien BPJS Kesehatan vs Pasien Pembayaran Umum",
      "Integrasi pencetakan bukti pendaftaran & nomor urut loket",
      "Validasi data poli tujuan dan ketersediaan dokter jaga secara live",
      "Sinkronisasi database loket dengan sistem administrasi RSUD Grati"
    ],
    tech: ["Laravel", "MySQL", "Bootstrap", "PHP", "JavaScript"],
    image: "/projects/rsud.png",
    link: "https://github.com/DimasBrahmantya/PendaftaranRawatJalan.git",
    githubUrl: "https://github.com/DimasBrahmantya/PendaftaranRawatJalan.git",
    liveUrl: "",
    highlight: true
  },
  {
    id: "smart-laundry",
    slug: "smart-laundry",
    title: "Design UI/UX Smart Laundry",
    type: "Academic Design",
    category: "uiux",
    year: "2025",
    role: "UI/UX Researcher & Product Designer",
    desc: "Desain konseptual aplikasi pemesanan dan pelacakan layanan laundry online berbasis mobile.",
    fullDescription: 
      "Smart Laundry adalah riset dan desain antarmuka mobile application yang menghubungkan pelanggan dengan penyedia jasa laundry kiloan dan satuan. Melalui pendekatan User-Centered Design (UCD), desain ini mengedepankan kemudahan penjemputan pakaian kotor lewat GPS, pemilihan paket pencucian (dry clean, express, setrika), serta live progress tracking status pakaian dari tahap pencucian hingga pengantaran kembali ke rumah.",
    features: [
      "User journey pemesanan penjemputan cucian dengan integrasi lokasi peta",
      "Sistem pelacakan status cucian bertahap (Diterima, Dicuci, Disetrika, Dikirim)",
      "Kalkulator estimasi berat pakaian dan penghitungan biaya otomatis",
      "UI component system komprehensif, typography hierarchy, dan dark/light mode mockup",
      "High-fidelity interactive clickable prototype di Figma"
    ],
    tech: ["Figma", "UI/UX Design", "Prototyping", "Wireframing", "User Research"],
    image: "/projects/laundry.png",
    link: "https://www.figma.com/proto/RyEi7OnUZznUxftePXkO9z/Smart-Laundry?node-id=15-6&p=f&t=BFnwWDWCeQl0zySa-0&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=15%3A6",
    githubUrl: "",
    liveUrl: "https://www.figma.com/proto/RyEi7OnUZznUxftePXkO9z/Smart-Laundry?node-id=15-6&p=f&t=BFnwWDWCeQl0zySa-0&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=15%3A6",
    highlight: true
  },
  {
    id: "remadja-inc",
    slug: "remadja-inc",
    title: "Remadja.Inc Landing Page",
    type: "E-Commerce",
    category: "webapp",
    year: "2026",
    role: "Front-End Developer & Creative Designer",
    desc: "High-fashion landing page showcase untuk brand pakaian lokal Remadja.Inc.",
    fullDescription: 
      "Website showcase interaktif bertema streetwear kontemporer untuk brand pakaian lokal Remadja.Inc. Menggabungkan animasi halus berbasis Framer Motion, tipografi berkarakter kuat, dan katalog interaktif yang menonjolkan visual lookbook produk, detail material kain, serta jalur pembelian langsung ke kanal penjualan resmi.",
    features: [
      "Hero section sinematik dengan animasi transisi mikro dinamis",
      "Katalog showcase koleksi produk streetwear terbaru dengan filter kategori",
      "Desain responsif ultra-fluid optimal untuk perangkat smartphone dan desktop",
      "Optimasi gambar performa tinggi Next.js Image dengan layout bento grid",
      "Tombol Call-to-Action (CTA) terintegrasi ke WhatsApp Business & Marketplace"
    ],
    tech: ["Next.js", "Framer Motion", "TailwindCSS", "TypeScript"],
    image: "/projects/remadja.png",
    link: "https://remadja-inc.vercel.app/",
    githubUrl: "https://github.com/DimasBrahmantya/remadja-inc",
    liveUrl: "https://remadja-inc.vercel.app/",
    highlight: false
  },
  {
    id: "sale-pisang",
    slug: "sale-pisang",
    title: "Design UI/UX Sale Pisang",
    type: "E-Commerce Design",
    category: "uiux",
    year: "2024",
    role: "UI/UX Designer",
    desc: "Niche e-commerce mobile app experience design untuk penjualan produk oleh-oleh khas olahan pisang.",
    fullDescription: 
      "Konsep aplikasi e-commerce mobile yang ditargetkan untuk memberdayakan UMKM penghasil produk olahan sale pisang dan camilan khas daerah. Desain mengusung skema warna hangat (warm amber) yang menggugah selera, kemudahan navigasi katalog rasa, serta alur checkout yang singkat agar ramah digunakan oleh konsumen lintas usia.",
    features: [
      "Desain katalog produk dengan visualisasi varian rasa dan gramasi kemasan",
      "Alur checkout sederhana 3 langkah (Pilih Alamat, Kurir Makanan, Pembayaran)",
      "Sistem ulasan & rating berbasis foto dari pembeli sebelumnya",
      "Desain banner promo bundling dan penawaran musiman",
      "Desain sistem konsisten menggunakan Figma Auto-Layout"
    ],
    tech: ["Figma", "Design System", "Wireframing", "Mobile UI"],
    image: "/projects/sale.png",
    link: "https://www.figma.com/proto/pO33hTo6vxXsdHI7UqNmmZ/sale-pisang-malang-web?node-id=1-3&p=f&t=VbTr62KlYEpm4D01-0&scaling=scale-down&content-scaling=fixed&page-id=0%3A1",
    githubUrl: "",
    liveUrl: "https://www.figma.com/proto/pO33hTo6vxXsdHI7UqNmmZ/sale-pisang-malang-web?node-id=1-3&p=f&t=VbTr62KlYEpm4D01-0&scaling=scale-down&content-scaling=fixed&page-id=0%3A1",
    highlight: false
  },
  {
    id: "readly",
    slug: "readly",
    title: "Design UI/UX Readly",
    type: "Academic Design",
    category: "uiux",
    year: "2024",
    role: "UI/UX Designer",
    desc: "Antarmuka perpustakaan digital interaktif dengan pembaca e-book terintegrasi.",
    fullDescription: 
      "Readly adalah purwarupa antarmuka aplikasi perpustakaan digital modern. Fokus perancangan diarahkan pada kenyamanan membaca digital jangka panjang, meliputi fitur penyesuaian font/spasi/tema malam (dark reader), sinkronisasi bookmark otomatis, catatan kaki interaktif, dan pencarian katalog buku pintar lintas kategori fiksi maupun referensi akademis.",
    features: [
      "Antarmuka pembaca buku digital (E-Reader Mode) dengan kontrol kecerahan & margin",
      "Manajemen rak buku personal (Sedang Dibaca, Ingin Dibaca, Koleksi Favorit)",
      "Gamifikasi target baca harian & pelacakan progress persentase buku",
      "Koleksi rekomendasi buku berbasis minat dan tren pembaca",
      "Komponen desain ergonomis berstandar aksesibilitas WCAG"
    ],
    tech: ["Figma", "UI/UX Design", "Design System", "Information Architecture"],
    image: "/projects/readly.png",
    link: "https://www.figma.com/proto/dgaeEnl2KOLXDfcm1klSyY/IMK-Prototype?node-id=0-137&p=f&t=qPIvXnIm4UGve2yu-0&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=0%3A137",
    githubUrl: "",
    liveUrl: "https://www.figma.com/proto/dgaeEnl2KOLXDfcm1klSyY/IMK-Prototype?node-id=0-137&p=f&t=qPIvXnIm4UGve2yu-0&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=0%3A137",
    highlight: false
  },
  {
    id: "portfolio-rismansyah",
    slug: "portfolio-rismansyah",
    title: "Portfolio Rismansyah",
    type: "Personal Project",
    category: "webapp",
    year: "2026",
    role: "Front-End Developer",
    desc: "Website portofolio interaktif dan modern untuk memvisualisasikan karya profesional serta profil rekayasa perangkat lunak.",
    fullDescription: 
      "Website portofolio profesional yang dibangun khusus untuk memamerkan profil, rekam jejak, dan karya perangkat lunak rekanan (Rismansyah). Mengedepankan struktur tata letak yang bersih, transisi interaktif, performa muat halaman yang instan, serta integrasi tautan proyek dan kontak langsung.",
    features: [
      "Katalog showcase karya dengan kartu interaktif dan tautan preview langsung",
      "Penyajian riwayat pengalaman kerja, pendidikan, dan keahlian teknis",
      "Antarmuka responsif yang nyaman dibuka di smartphone maupun desktop",
      "Performa muat halaman instan berbasis Next.js dan Tailwind CSS"
    ],
    tech: ["Next.js", "React", "TailwindCSS", "Vercel"],
    image: "/projects/risman.png",
    link: "https://rismansyah-portofolio.vercel.app/",
    githubUrl: "https://github.com/DimasBrahmantya/porto-aris",
    liveUrl: "https://rismansyah-portofolio.vercel.app/",
    highlight: false
  },
  {
    id: "portfolio-dimas",
    slug: "portfolio-dimas",
    title: "Portfolio Dimas",
    type: "Personal Site",
    category: "webapp",
    year: "2026",
    role: "Full Stack & UI Developer",
    desc: "Website portofolio pribadi berbasis Next.js dengan arsitektur antarmuka modern, standar aksesibilitas tinggi, dan katalog proyek terstruktur.",
    fullDescription: 
      "Website portofolio personal yang dirancang untuk merefleksikan identitas dan kapabilitas teknis Dimas Brahmantya sebagai Full Stack Developer. Mengedepankan filosofi antarmuka yang bersih, performa rendering tinggi, kepatuhan aksesibilitas WCAG, katalog proyek terperinci, serta formulir kontak interaktif yang terhubung langsung ke inbox email.",
    features: [
      "Arsitektur Next.js modern dengan tata letak responsif dan optimasi performa",
      "Katalog proyek terstruktur lengkap dengan filter kategori dan modal detail",
      "Navigasi kapsul mengambang dengan sinkronisasi posisi section otomatis",
      "Formulir pesan langsung terintegrasi dengan feedback status pengiriman",
      "Standar kontras tinggi, navigasi keyboard ramah aksesibilitas, dan dukungan reduced motion"
    ],
    tech: ["Next.js", "TailwindCSS", "Framer Motion", "TypeScript"],
    image: "/projects/dimas.png",
    link: "https://dimasbas.vercel.app/",
    githubUrl: "https://github.com/DimasBrahmantya/dimas-porto",
    liveUrl: "https://dimasbas.vercel.app/",
    highlight: false
  }
];
