import { Project } from "@/types/project";

export const projectsData: Project[] = [
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
    image: "/projects/simrs.svg",
    link: "https://github.com/DimasBrahmantya/Simrs-Rawat-Jalan.git",
    githubUrl: "https://github.com/DimasBrahmantya/Simrs-Rawat-Jalan.git",
    liveUrl: "https://github.com/DimasBrahmantya/Simrs-Rawat-Jalan.git",
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
    image: "/projects/secure-hub.svg",
    link: "https://github.com/DimasBrahmantya/Secure-Hub.git",
    githubUrl: "https://github.com/DimasBrahmantya/Secure-Hub.git",
    liveUrl: "https://github.com/DimasBrahmantya/Secure-Hub.git",
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
    image: "/projects/rsud-grati.svg",
    link: "https://github.com/DimasBrahmantya/PendaftaranRawatJalan.git",
    githubUrl: "https://github.com/DimasBrahmantya/PendaftaranRawatJalan.git",
    liveUrl: "https://github.com/DimasBrahmantya/PendaftaranRawatJalan.git",
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
    image: "/projects/smart-laundry.svg",
    link: "https://figma.com",
    githubUrl: "https://figma.com",
    liveUrl: "https://figma.com",
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
    image: "/projects/remadja-inc.svg",
    link: "https://remadja-inc.vercel.app/",
    githubUrl: "https://github.com/DimasBrahmantya",
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
    image: "/projects/sale-pisang.svg",
    link: "https://figma.com",
    githubUrl: "https://figma.com",
    liveUrl: "https://figma.com",
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
    image: "/projects/readly.svg",
    link: "https://figma.com",
    githubUrl: "https://figma.com",
    liveUrl: "https://figma.com",
    highlight: false
  },
  {
    id: "portfolio-rismansyah",
    slug: "portfolio-rismansyah",
    title: "Portfolio Rismansyah",
    type: "Personal Project",
    category: "academic",
    year: "2026",
    role: "Web Developer",
    desc: "Website portofolio interaktif yang disesuaikan untuk showcase karya profesional.",
    fullDescription: 
      "Website portofolio yang dirancang khusus untuk memamerkan profil profesional, jejak karier, dan karya rekayasa perangkat lunak milik rekan sejawat. Mengedepankan struktur tata letak modular, tipografi bersih, transisi halaman instan, serta integrasi formulir kontak langsung.",
    features: [
      "Struktur showcase proyek dengan kartu interaktif dan preview tautan",
      "Timeline riwayat pendidikan dan pengalaman organisasi/kerja",
      "Desain adaptif dan responsif di berbagai resolusi layar",
      "Waktu muat halaman cepat dengan optimasi Next.js Static Export"
    ],
    tech: ["Next.js", "React", "TailwindCSS", "Vercel"],
    image: "/projects/portfolio-rismansyah.svg",
    link: "https://rismansyah-portofolio.vercel.app/",
    githubUrl: "https://github.com/DimasBrahmantya",
    liveUrl: "https://rismansyah-portofolio.vercel.app/",
    highlight: false
  },
  {
    id: "portfolio-dimas",
    slug: "portfolio-dimas",
    title: "Portfolio Dimas",
    type: "Personal Site",
    category: "academic",
    year: "2026",
    role: "Creator & Lead Developer",
    desc: "Website portofolio pribadi versi monochrome neo-brutalism.",
    fullDescription: 
      "Eksplorasi gaya desain web neo-brutalism monochrome kontemporer yang menggabungkan kontras tegas, tipografi proporsional, border tebal, aksen neon cyan futuristik, dan animasi partikel mengambang untuk merefleksikan identitas sebagai pengembang aplikasi web dan antarmuka masa kini.",
    features: [
      "Tema estetika game HUD neo-brutalism dengan aksen cyan glow",
      "Navigasi kapsul mengambang dengan deteksi scroll aktif otomatis",
      "Animasi partikel embers mengambang interaktif",
      "Formulir kontak terintegrasi dengan validasi email instan"
    ],
    tech: ["Next.js", "TailwindCSS", "Framer Motion", "TypeScript"],
    image: "/projects/portfolio-dimas.svg",
    link: "https://dimas-portfolio-smoky.vercel.app/",
    githubUrl: "https://github.com/DimasBrahmantya/dimas-porto",
    liveUrl: "https://dimas-portfolio-smoky.vercel.app/",
    highlight: false
  }
];
