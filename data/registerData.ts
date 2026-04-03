"use client"

import type {
  AccountFieldMeta,
  GroupedOptionSection,
  HighlightStat,
  OverseasRegionTab,
  PasswordRule,
  ProgramFieldMeta,
  ProgramId,
  ProgramOption,
  RegisterData,
  RegisterStepMeta,
  SuccessParticle,
  SummaryFieldMeta,
  UniversityOption,
  WeaknessOption,
} from "@/types/register"

export const OVERSEAS_PROGRAM_ID: ProgramId = "luar_negeri"

export const REGISTER_INITIAL_DATA: RegisterData = {
  program: "",
  university: "",
  jurusan: "",
  weaknesses: [],
  name: "",
  email: "",
  username: "",
  password: "",
}

export const REGISTER_STEP_META: RegisterStepMeta[] = [
  {
    id: 0,
    label: "Program",
    title: "Pilih program tryout yang paling relevan",
    description: "Kita pakai pilihan ini untuk menyesuaikan jalur belajar, daftar tujuan, dan rekomendasi fokus materi.",
  },
  {
    id: 1,
    label: "Tujuan",
    title: "Tentukan tujuan spesifik yang ingin kamu kejar",
    description: "Cari jurusan, formasi, sekolah, atau universitas agar materi yang muncul terasa lebih kontekstual.",
  },
  {
    id: 2,
    label: "Kelemahan",
    title: "Tandai area yang paling ingin kamu perbaiki",
    description: "Pilih minimal satu fokus kelemahan supaya dashboard awalmu langsung personal.",
  },
  {
    id: 3,
    label: "Akun",
    title: "Buat akun yang siap dipakai belajar",
    description: "Isi data inti akun. Validasi berjalan langsung supaya kamu tidak perlu mengulang saat submit.",
  },
  {
    id: 4,
    label: "Konfirmasi",
    title: "Cek ulang semua detail sebelum daftar",
    description: "Ringkasan ini akan menjadi dasar personalisasi awal saat kamu masuk ke dashboard.",
  },
]

export const REGISTER_PAGE_COPY = {
  heroSubtitle: "Multi-step registration",
  heroTitle: "Mulai dari jalur yang tepat, lalu bangun progres yang terasa personal.",
  heroDescription:
    "Form pendaftaran ini menyesuaikan tujuan, minat, dan titik lemahmu sejak awal agar pengalaman belajarnya langsung terasa relevan.",
  sideCardTitle: "Rute belajar yang lebih tajam",
  sideCardDescription:
    "Setelah daftar, dashboard bisa langsung memetakan target dan area fokus utama berdasarkan pilihanmu.",
  testimonial:
    '"Begitu selesai daftar, saya langsung dapat arah belajar yang jauh lebih jelas dan tidak lagi bingung mulai dari mana."',
  testimonialAuthor: "Peserta tryout aktif",
  mobileSubtitle: "Buat akun baru",
  footerDescription:
    "Dirancang untuk pendaftaran yang lebih rapi, cepat dipahami, dan siap mengarahkan pengguna ke dashboard belajar.",
}

export const REGISTER_HIGHLIGHTS: HighlightStat[] = [
  {
    label: "7 Program",
    value: "Fleksibel",
    description: "Satu alur pendaftaran untuk jalur tryout populer dan universitas luar negeri.",
  },
  {
    label: "Personal",
    value: "Targeted",
    description: "Pilihan program, tujuan, dan kelemahan langsung membentuk pengalaman awal yang lebih relevan.",
  },
  {
    label: "Cepat",
    value: "< 3 Menit",
    description: "Form dibagi menjadi langkah-langkah singkat supaya pengguna tetap fokus sampai selesai.",
  },
]

export const PROGRAM_OPTIONS: ProgramOption[] = [
  {
    id: "cpns",
    label: "CPNS",
    description: "Siapkan strategi untuk formasi umum dan teknis yang paling sering diburu.",
  },
  {
    id: "utbk_snbt",
    label: "UTBK/SNBT",
    description: "Pilih jurusan impian lalu fokus pada subtes yang paling menentukan.",
  },
  {
    id: "kedinasan",
    label: "Kedinasan",
    description: "Targetkan sekolah kedinasan dan pola materi seleksi yang relevan.",
  },
  {
    id: "bumn",
    label: "BUMN",
    description: "Petakan jalur rekrutmen, tes kemampuan dasar, dan posisi incaran.",
  },
  {
    id: "pppk",
    label: "PPPK",
    description: "Susun latihan berdasarkan jenis jabatan dan karakter tes yang sering muncul.",
  },
  {
    id: "tni_polri",
    label: "TNI/Polri",
    description: "Fokuskan persiapan pada jalur masuk, tes akademik, dan pengetahuan umum.",
  },
  {
    id: "luar_negeri",
    label: "Universitas Luar Negeri",
    description: "Jelajahi kampus global, jurusan populer, dan kebutuhan tes internasional.",
    badge: "Baru",
  },
]

export const PROGRAM_LABELS: Record<ProgramId, string> = {
  cpns: "CPNS",
  utbk_snbt: "UTBK/SNBT",
  kedinasan: "Kedinasan",
  bumn: "BUMN",
  pppk: "PPPK",
  tni_polri: "TNI/Polri",
  luar_negeri: "Universitas Luar Negeri",
}

export const PROGRAM_FIELD_META: Record<Exclude<ProgramId, "luar_negeri">, ProgramFieldMeta> = {
  cpns: {
    label: "Formasi",
    title: "Pilih formasi yang ingin diprioritaskan",
    description: "Mulai dari formasi umum sampai teknis agar konten latihan terasa lebih terarah.",
    searchPlaceholder: "Cari formasi atau instansi",
    emptyTitle: "Formasi tidak ditemukan",
    emptyDescription: "Coba ubah kata kunci pencarian atau cek kelompok formasi lain.",
  },
  utbk_snbt: {
    label: "Jurusan",
    title: "Tentukan jurusan yang sedang kamu incar",
    description: "Kelompok saintek dan soshum disiapkan agar pencarian jurusan tetap cepat dan jelas.",
    searchPlaceholder: "Cari jurusan atau bidang",
    emptyTitle: "Jurusan tidak ditemukan",
    emptyDescription: "Coba kata kunci lain atau lihat daftar kelompok jurusan yang tersedia.",
  },
  kedinasan: {
    label: "Sekolah",
    title: "Pilih sekolah kedinasan tujuanmu",
    description: "Setiap pilihan disertai gambaran jalur belajar agar kamu bisa cepat menentukan prioritas.",
    searchPlaceholder: "Cari sekolah kedinasan",
    emptyTitle: "Sekolah tidak ditemukan",
    emptyDescription: "Coba kata kunci lain atau kembali lihat daftar sekolah yang tersedia.",
  },
  bumn: {
    label: "Jabatan",
    title: "Pilih jalur jabatan yang ingin kamu kejar",
    description: "Daftar posisi ini memudahkan kita memetakan kombinasi kemampuan dasar yang paling relevan.",
    searchPlaceholder: "Cari jabatan atau jalur rekrutmen",
    emptyTitle: "Jabatan tidak ditemukan",
    emptyDescription: "Coba kata kunci lain atau telusuri kelompok jabatan yang tersedia.",
  },
  pppk: {
    label: "Jabatan",
    title: "Pilih jabatan PPPK yang sedang kamu targetkan",
    description: "Kita tampilkan kategori jabatan populer agar proses memilih tetap ringkas.",
    searchPlaceholder: "Cari jabatan PPPK",
    emptyTitle: "Jabatan tidak ditemukan",
    emptyDescription: "Coba kata kunci lain atau buka kategori jabatan lain.",
  },
  tni_polri: {
    label: "Jalur",
    title: "Pilih jalur seleksi yang sedang kamu incar",
    description: "Setelah jalur dipilih, rekomendasi fokus latihan akan terasa lebih presisi.",
    searchPlaceholder: "Cari jalur TNI atau Polri",
    emptyTitle: "Jalur tidak ditemukan",
    emptyDescription: "Coba kata kunci lain atau lihat kelompok jalur lain.",
  },
}

export const OVERSEAS_REGION_TABS: OverseasRegionTab[] = [
  {
    id: "amerika",
    label: "Amerika",
    description: "Universitas papan atas di Amerika Serikat dan Kanada dengan fokus riset kuat.",
  },
  {
    id: "uk_eropa",
    label: "UK & Eropa",
    description: "Pilihan kampus klasik dan modern dengan jalur akademik serta beasiswa beragam.",
  },
  {
    id: "asia_australia",
    label: "Asia & Australia",
    description: "Kampus unggulan yang populer untuk pelajar Indonesia dan dekat dengan ekosistem regional.",
  },
  {
    id: "beasiswa_populer",
    label: "Beasiswa Populer",
    description: "Pilihan universitas yang sering muncul pada jalur LPDP, Chevening, Australia Awards, dan sejenisnya.",
  },
]

export const OVERSEAS_SEARCH_COPY = {
  title: "Cari universitas lalu pilih jurusan yang ingin kamu dalami",
  description: "Filter bekerja langsung pada nama kampus, negara, tag beasiswa, dan preview jurusan.",
  searchPlaceholder: "Cari universitas, negara, jurusan, atau keyword beasiswa",
  majorsTitle: "Pilih jurusan untuk universitas ini",
  majorsDescription: "Begitu jurusan dipilih, ringkasan di langkah berikutnya akan otomatis terisi.",
  emptyTitle: "Universitas tidak ditemukan",
  emptyDescription: "Ubah kata kunci atau pindah ke kawasan lain untuk melihat hasil yang berbeda.",
}

export const PROGRAM_GROUPS: Record<Exclude<ProgramId, "luar_negeri">, GroupedOptionSection[]> = {
  utbk_snbt: [
    {
      id: "saintek",
      label: "Saintek",
      description: "Jurusan berbasis sains, teknologi, dan kesehatan.",
      items: [
        {
          value: "Teknik Informatika",
          label: "Teknik Informatika",
          description: "Fokus pada logika, pemrograman, dan sistem komputasi.",
          hint: "Cocok untuk minat teknologi dan problem solving.",
        },
        {
          value: "Kedokteran",
          label: "Kedokteran",
          description: "Jurusan kesehatan dengan persaingan sangat tinggi setiap tahun.",
          hint: "Perlu konsistensi kuat pada literasi, numerasi, dan penalaran.",
        },
        {
          value: "Teknik Industri",
          label: "Teknik Industri",
          description: "Menggabungkan sistem, optimasi proses, dan manajemen operasi.",
          hint: "Sering dipilih karena spektrum karier yang luas.",
        },
        {
          value: "Sistem Informasi",
          label: "Sistem Informasi",
          description: "Memadukan teknologi, proses bisnis, dan pengambilan keputusan berbasis data.",
          hint: "Ideal untuk yang ingin ada irisan teknologi dan bisnis.",
        },
      ],
    },
    {
      id: "soshum",
      label: "Soshum",
      description: "Jurusan sosial, humaniora, bisnis, dan kebijakan.",
      items: [
        {
          value: "Hukum",
          label: "Hukum",
          description: "Mempelajari sistem hukum, argumentasi, dan interpretasi regulasi.",
          hint: "Perlu ketelitian membaca dan kekuatan analisis verbal.",
        },
        {
          value: "Psikologi",
          label: "Psikologi",
          description: "Fokus pada perilaku manusia, asesmen, dan riset psikologis.",
          hint: "Sering dipilih lintas minat IPA maupun IPS.",
        },
        {
          value: "Manajemen",
          label: "Manajemen",
          description: "Mengasah analisis bisnis, pengambilan keputusan, dan strategi organisasi.",
          hint: "Populer untuk jalur karier bisnis dan entrepreneurship.",
        },
        {
          value: "Ilmu Komunikasi",
          label: "Ilmu Komunikasi",
          description: "Mencakup media, public relations, pemasaran, dan komunikasi strategis.",
          hint: "Cocok untuk yang suka presentasi, storytelling, dan brand thinking.",
        },
      ],
    },
  ],
  cpns: [
    {
      id: "teknis",
      label: "Formasi Teknis",
      description: "Jabatan yang biasanya memerlukan latar belakang keahlian spesifik.",
      items: [
        {
          value: "Analis Kebijakan",
          label: "Analis Kebijakan",
          description: "Mengolah data, menyusun rekomendasi, dan mendukung perumusan kebijakan.",
          hint: "Perlu analisis verbal dan penalaran yang matang.",
        },
        {
          value: "Pranata Komputer",
          label: "Pranata Komputer",
          description: "Berperan pada pengelolaan sistem, data, dan infrastruktur teknologi.",
          hint: "Cocok untuk latar belakang IT atau analitis.",
        },
        {
          value: "Perencana",
          label: "Perencana",
          description: "Fokus pada penyusunan program, target, dan evaluasi organisasi.",
          hint: "Membutuhkan kombinasi numerik dan logika yang baik.",
        },
        {
          value: "Penyuluh Sosial",
          label: "Penyuluh Sosial",
          description: "Berkaitan dengan pelayanan publik dan edukasi masyarakat.",
          hint: "Komunikasi, empati, dan pemahaman umum jadi nilai tambah.",
        },
      ],
    },
    {
      id: "umum",
      label: "Formasi Umum",
      description: "Pilihan formasi yang banyak diminati lintas latar belakang.",
      items: [
        {
          value: "Administrasi Pemerintahan",
          label: "Administrasi Pemerintahan",
          description: "Fokus pada tata kelola, administrasi, dan pelayanan lembaga publik.",
          hint: "Pilihan aman untuk peminat layanan publik dan organisasi.",
        },
        {
          value: "Pengelola Keuangan",
          label: "Pengelola Keuangan",
          description: "Berkaitan dengan penganggaran, pencatatan, dan administrasi finansial.",
          hint: "Perlu ketelitian numerik dan disiplin tinggi.",
        },
        {
          value: "Arsiparis",
          label: "Arsiparis",
          description: "Menangani dokumentasi, klasifikasi, dan tata kelola arsip.",
          hint: "Cocok untuk yang teliti dan terstruktur.",
        },
        {
          value: "Verifikator Data",
          label: "Verifikator Data",
          description: "Memastikan akurasi, kelengkapan, dan konsistensi data administrasi.",
          hint: "Bagus untuk profil yang rapi dan analitis.",
        },
      ],
    },
  ],
  kedinasan: [
    {
      id: "keuangan",
      label: "Keuangan & Tata Kelola",
      description: "Sekolah yang kuat pada pengelolaan negara, statistik, dan administrasi publik.",
      items: [
        {
          value: "PKN STAN",
          label: "PKN STAN",
          description: "Ikonik untuk bidang keuangan negara, perpajakan, dan kepabeanan.",
          hint: "Peminat tinggi, cocok untuk profil numerik kuat.",
        },
        {
          value: "Polstat STIS",
          label: "Polstat STIS",
          description: "Fokus pada statistik, data, dan analisis kebijakan berbasis angka.",
          hint: "Ideal untuk yang suka angka dan data analytics.",
        },
        {
          value: "IPDN",
          label: "IPDN",
          description: "Menyiapkan kader pemerintahan daerah dengan pembinaan intensif.",
          hint: "Perlu disiplin, kepemimpinan, dan motivasi pelayanan publik.",
        },
      ],
    },
    {
      id: "teknologi",
      label: "Teknologi & Transportasi",
      description: "Sekolah kedinasan yang beririsan dengan teknologi, transportasi, dan keamanan.",
      items: [
        {
          value: "STMKG",
          label: "STMKG",
          description: "Menggabungkan meteorologi, klimatologi, dan geofisika terapan.",
          hint: "Kuat pada matematika, fisika, dan analisis ilmiah.",
        },
        {
          value: "Poltekip",
          label: "Poltekip",
          description: "Berfokus pada pemasyarakatan, tata kelola, dan sistem pembinaan.",
          hint: "Cocok untuk jalur yang menuntut karakter kuat dan disiplin.",
        },
        {
          value: "Poltekim",
          label: "Poltekim",
          description: "Menyiapkan taruna untuk bidang keimigrasian dan pelayanan perlintasan.",
          hint: "Perlu kombinasi wawasan umum dan ketahanan mental.",
        },
      ],
    },
  ],
  bumn: [
    {
      id: "operasional",
      label: "Operasional & Bisnis",
      description: "Posisi yang dekat dengan aktivitas inti perusahaan dan layanan pelanggan.",
      items: [
        {
          value: "Management Trainee",
          label: "Management Trainee",
          description: "Program percepatan talenta untuk jalur kepemimpinan masa depan.",
          hint: "Biasanya menuntut adaptasi cepat dan penalaran kuat.",
        },
        {
          value: "Business Analyst",
          label: "Business Analyst",
          description: "Membaca performa, menyusun insight, dan memberi rekomendasi keputusan.",
          hint: "Cocok untuk profil strategis dan berbasis data.",
        },
        {
          value: "Customer Experience Officer",
          label: "Customer Experience Officer",
          description: "Menjaga kualitas layanan dan pengalaman pengguna di berbagai touchpoint.",
          hint: "Komunikasi dan problem solving jadi kunci.",
        },
      ],
    },
    {
      id: "support",
      label: "Support & Teknologi",
      description: "Peran pendukung organisasi pada sisi SDM, keuangan, dan digitalisasi.",
      items: [
        {
          value: "Data Analyst",
          label: "Data Analyst",
          description: "Mengolah data operasional menjadi insight yang bisa ditindaklanjuti.",
          hint: "Pilihan kuat untuk yang nyaman dengan angka dan visualisasi.",
        },
        {
          value: "HR Development",
          label: "HR Development",
          description: "Mengelola pengembangan talenta, budaya, dan program pembelajaran internal.",
          hint: "Perlu empati, komunikasi, dan struktur kerja rapi.",
        },
        {
          value: "IT Support",
          label: "IT Support",
          description: "Menjaga infrastruktur dasar dan membantu kebutuhan teknis internal.",
          hint: "Cocok untuk yang suka troubleshooting dan sistem.",
        },
      ],
    },
  ],
  pppk: [
    {
      id: "pendidikan",
      label: "Guru & Pendidikan",
      description: "Pilihan jabatan yang berkaitan dengan pengajaran dan manajemen kelas.",
      items: [
        {
          value: "Guru Kelas SD",
          label: "Guru Kelas SD",
          description: "Mengajar lintas mata pelajaran dasar dengan pendekatan pedagogis menyeluruh.",
          hint: "Perlu daya ajar, kesabaran, dan pengetahuan umum yang stabil.",
        },
        {
          value: "Guru Bahasa Indonesia",
          label: "Guru Bahasa Indonesia",
          description: "Fokus pada literasi, pemahaman bacaan, dan kemampuan berbahasa.",
          hint: "Cocok untuk yang kuat di verbal dan komunikasi.",
        },
        {
          value: "Guru Matematika",
          label: "Guru Matematika",
          description: "Menuntut pemahaman numerik, logika, dan strategi penyampaian konsep.",
          hint: "Perlu kombinasi logika kuat dan kesabaran mengajar.",
        },
      ],
    },
    {
      id: "teknis",
      label: "Teknis & Layanan Publik",
      description: "Jabatan penunjang layanan publik dengan tuntutan administrasi dan teknis.",
      items: [
        {
          value: "Penyuluh Pertanian",
          label: "Penyuluh Pertanian",
          description: "Mendampingi masyarakat dengan edukasi dan strategi praktik lapangan.",
          hint: "Perlu wawasan umum dan kemampuan komunikasi lapangan.",
        },
        {
          value: "Analis SDM Aparatur",
          label: "Analis SDM Aparatur",
          description: "Mendukung tata kelola sumber daya manusia pada instansi pemerintah.",
          hint: "Pilihan bagus untuk yang rapi dan teliti.",
        },
        {
          value: "Pranata Humas",
          label: "Pranata Humas",
          description: "Menangani komunikasi lembaga, informasi publik, dan narasi organisasi.",
          hint: "Kekuatan verbal dan kepekaan isu sangat membantu.",
        },
      ],
    },
  ],
  tni_polri: [
    {
      id: "tni",
      label: "Jalur TNI",
      description: "Pilihan jalur masuk TNI dari tingkat akademi sampai bintara.",
      items: [
        {
          value: "Akademi Militer",
          label: "Akademi Militer",
          description: "Jalur pendidikan perwira dengan pembinaan akademik dan karakter intensif.",
          hint: "Cocok untuk target kepemimpinan jangka panjang.",
        },
        {
          value: "Bintara TNI AD",
          label: "Bintara TNI AD",
          description: "Fokus pada pendidikan dasar militer dan kesiapan lapangan.",
          hint: "Perlu disiplin tinggi dan dasar akademik yang rapi.",
        },
        {
          value: "Tamtama TNI AL",
          label: "Tamtama TNI AL",
          description: "Jalur awal untuk bidang operasional dengan karakter seleksi ketat.",
          hint: "Wawasan umum dan kesiapan mental sangat penting.",
        },
      ],
    },
    {
      id: "polri",
      label: "Jalur Polri",
      description: "Jalur seleksi kepolisian untuk perwira, bintara, dan jalur afirmatif lainnya.",
      items: [
        {
          value: "Akpol",
          label: "Akpol",
          description: "Jalur pendidikan perwira Polri dengan fokus kepemimpinan dan akademik.",
          hint: "Persaingan tinggi dan menuntut konsistensi belajar.",
        },
        {
          value: "Bintara Polri",
          label: "Bintara Polri",
          description: "Pilihan populer dengan kombinasi tes akademik, psikologi, dan wawasan umum.",
          hint: "Cocok untuk yang ingin jalur operasional kepolisian.",
        },
        {
          value: "Tamtama Polri",
          label: "Tamtama Polri",
          description: "Jalur awal dengan seleksi disiplin dan kesiapan fisik yang tinggi.",
          hint: "Dasar akademik tetap penting untuk menunjang seleksi.",
        },
      ],
    },
  ],
}

export const UNIVERSITIES: UniversityOption[] = [
  {
    id: "harvard-university",
    name: "Harvard University",
    flag: "US",
    country: "Amerika Serikat",
    qsRank: 4,
    region: "amerika",
    previewMajors: ["Economics", "Computer Science", "Public Policy"],
    majors: [
      {
        id: "harvard-economics",
        label: "Economics",
        focus: "Strong analytical track with policy and quantitative emphasis.",
      },
      {
        id: "harvard-computer-science",
        label: "Computer Science",
        focus: "Research-driven path for AI, systems, and computational theory.",
      },
      {
        id: "harvard-public-policy",
        label: "Public Policy",
        focus: "Blends leadership, governance, and social impact orientation.",
      },
    ],
    tags: ["Need-aware aid", "Ivy League", "Research"],
  },
  {
    id: "stanford-university",
    name: "Stanford University",
    flag: "US",
    country: "Amerika Serikat",
    qsRank: 6,
    region: "amerika",
    previewMajors: ["Engineering", "Business", "Computer Science"],
    majors: [
      {
        id: "stanford-engineering",
        label: "Engineering",
        focus: "Excellent for innovation, entrepreneurship, and interdisciplinary work.",
      },
      {
        id: "stanford-business",
        label: "Business",
        focus: "Well-known for leadership, venture building, and strategic thinking.",
      },
      {
        id: "stanford-computer-science",
        label: "Computer Science",
        focus: "Top choice for AI, human-computer interaction, and product thinking.",
      },
    ],
    tags: ["Innovation", "Startup ecosystem", "Silicon Valley"],
  },
  {
    id: "university-of-toronto",
    name: "University of Toronto",
    flag: "CA",
    country: "Kanada",
    qsRank: 21,
    region: "amerika",
    previewMajors: ["Data Science", "Life Sciences", "Psychology"],
    majors: [
      {
        id: "utoronto-data-science",
        label: "Data Science",
        focus: "Balanced pathway for statistics, computing, and practical analytics.",
      },
      {
        id: "utoronto-life-sciences",
        label: "Life Sciences",
        focus: "Strong undergraduate preparation for health and lab-based fields.",
      },
      {
        id: "utoronto-psychology",
        label: "Psychology",
        focus: "Research-heavy environment with broad specialisation options.",
      },
    ],
    tags: ["Co-op adjacent", "Global city", "Research"],
  },
  {
    id: "university-of-oxford",
    name: "University of Oxford",
    flag: "UK",
    country: "Inggris",
    qsRank: 3,
    region: "uk_eropa",
    previewMajors: ["Law", "Philosophy, Politics and Economics", "Medicine"],
    majors: [
      {
        id: "oxford-law",
        label: "Law",
        focus: "Deep reading, argumentation, and tutorial-style learning.",
      },
      {
        id: "oxford-ppe",
        label: "Philosophy, Politics and Economics",
        focus: "Ideal for policy, leadership, and multidisciplinary reasoning.",
      },
      {
        id: "oxford-medicine",
        label: "Medicine",
        focus: "Rigorous scientific preparation with top-tier academic standards.",
      },
    ],
    tags: ["Collegiate system", "Chevening friendly", "Tutorial model"],
  },
  {
    id: "university-of-cambridge",
    name: "University of Cambridge",
    flag: "UK",
    country: "Inggris",
    qsRank: 5,
    region: "uk_eropa",
    previewMajors: ["Engineering", "Natural Sciences", "Economics"],
    majors: [
      {
        id: "cambridge-engineering",
        label: "Engineering",
        focus: "Broad technical foundation before deeper specialisation.",
      },
      {
        id: "cambridge-natural-sciences",
        label: "Natural Sciences",
        focus: "Flexible science track with room for exploration in early years.",
      },
      {
        id: "cambridge-economics",
        label: "Economics",
        focus: "Strong quantitative and policy-oriented economics training.",
      },
    ],
    tags: ["Research", "Chevening friendly", "Traditional excellence"],
  },
  {
    id: "eth-zurich",
    name: "ETH Zurich",
    flag: "CH",
    country: "Swiss",
    qsRank: 7,
    region: "uk_eropa",
    previewMajors: ["Computer Science", "Mechanical Engineering", "Architecture"],
    majors: [
      {
        id: "ethz-computer-science",
        label: "Computer Science",
        focus: "Highly technical track with strong research and systems depth.",
      },
      {
        id: "ethz-mechanical-engineering",
        label: "Mechanical Engineering",
        focus: "Solid engineering fundamentals with innovation-led projects.",
      },
      {
        id: "ethz-architecture",
        label: "Architecture",
        focus: "Combines design precision, engineering thinking, and global perspective.",
      },
    ],
    tags: ["STEM powerhouse", "Europe", "Research"],
  },
  {
    id: "national-university-of-singapore",
    name: "National University of Singapore",
    flag: "SG",
    country: "Singapura",
    qsRank: 8,
    region: "asia_australia",
    previewMajors: ["Business Analytics", "Engineering", "Public Policy"],
    majors: [
      {
        id: "nus-business-analytics",
        label: "Business Analytics",
        focus: "Great fit for data-driven business and decision support roles.",
      },
      {
        id: "nus-engineering",
        label: "Engineering",
        focus: "Applied engineering with strong industry and regional relevance.",
      },
      {
        id: "nus-public-policy",
        label: "Public Policy",
        focus: "Strong for governance, economics, and Asia-focused policy work.",
      },
    ],
    tags: ["ASEAN favorite", "Scholarship friendly", "Regional hub"],
  },
  {
    id: "nanyang-technological-university",
    name: "Nanyang Technological University",
    flag: "SG",
    country: "Singapura",
    qsRank: 15,
    region: "asia_australia",
    previewMajors: ["Communication Studies", "Computer Engineering", "Accountancy"],
    majors: [
      {
        id: "ntu-communication-studies",
        label: "Communication Studies",
        focus: "Blends media, strategy, and digital storytelling.",
      },
      {
        id: "ntu-computer-engineering",
        label: "Computer Engineering",
        focus: "Good path for hardware-software integration and intelligent systems.",
      },
      {
        id: "ntu-accountancy",
        label: "Accountancy",
        focus: "Structured route for finance, audit, and business fundamentals.",
      },
    ],
    tags: ["ASEAN favorite", "Industry-linked", "Technology"],
  },
  {
    id: "university-of-melbourne",
    name: "University of Melbourne",
    flag: "AU",
    country: "Australia",
    qsRank: 13,
    region: "asia_australia",
    previewMajors: ["Education", "Biomedical Science", "Design"],
    majors: [
      {
        id: "melbourne-education",
        label: "Education",
        focus: "Good fit for future educators and policy-minded practitioners.",
      },
      {
        id: "melbourne-biomedical-science",
        label: "Biomedical Science",
        focus: "Strong preparation for research, health, and medicine pathways.",
      },
      {
        id: "melbourne-design",
        label: "Design",
        focus: "Combines creative exploration with strong studio practice.",
      },
    ],
    tags: ["Australia Awards", "Research", "Campus life"],
  },
  {
    id: "ucl",
    name: "University College London",
    flag: "UK",
    country: "Inggris",
    qsRank: 9,
    region: "beasiswa_populer",
    previewMajors: ["Education", "Architecture", "Data Science"],
    majors: [
      {
        id: "ucl-education",
        label: "Education",
        focus: "Policy, pedagogy, and evidence-based educational practice.",
      },
      {
        id: "ucl-architecture",
        label: "Architecture",
        focus: "Design-intensive track with strong urban context.",
      },
      {
        id: "ucl-data-science",
        label: "Data Science",
        focus: "Brings together machine learning, inference, and practical computing.",
      },
    ],
    tags: ["Chevening friendly", "LPDP favorite", "London"],
  },
  {
    id: "monash-university",
    name: "Monash University",
    flag: "AU",
    country: "Australia",
    qsRank: 37,
    region: "beasiswa_populer",
    previewMajors: ["Pharmacy", "Education", "Information Technology"],
    majors: [
      {
        id: "monash-pharmacy",
        label: "Pharmacy",
        focus: "Well-established path for pharmaceutical science and practice.",
      },
      {
        id: "monash-education",
        label: "Education",
        focus: "Strong for teaching innovation and leadership in education.",
      },
      {
        id: "monash-information-technology",
        label: "Information Technology",
        focus: "Practical industry-oriented track with broad digital skill coverage.",
      },
    ],
    tags: ["Australia Awards", "LPDP favorite", "Industry-linked"],
  },
  {
    id: "soas-university-of-london",
    name: "SOAS University of London",
    flag: "UK",
    country: "Inggris",
    qsRank: 511,
    region: "beasiswa_populer",
    previewMajors: ["Development Studies", "International Relations", "Law"],
    majors: [
      {
        id: "soas-development-studies",
        label: "Development Studies",
        focus: "Suitable for social impact, NGO, and international development careers.",
      },
      {
        id: "soas-international-relations",
        label: "International Relations",
        focus: "Great for diplomacy, global policy, and regional studies.",
      },
      {
        id: "soas-law",
        label: "Law",
        focus: "Unique perspective on comparative and international legal systems.",
      },
    ],
    tags: ["Chevening friendly", "Policy", "Social impact"],
  },
]

export const GENERAL_WEAKNESSES: WeaknessOption[] = [
  {
    value: "TWK",
    label: "TWK",
    description: "Pemahaman wawasan kebangsaan, sejarah, dan nilai kebinekaan.",
  },
  {
    value: "TIU",
    label: "TIU",
    description: "Numerik, logika, dan kemampuan analitis dasar yang paling sering jadi bottleneck.",
  },
  {
    value: "TKP",
    label: "TKP",
    description: "Situasional judgement, etika kerja, dan pengambilan keputusan praktis.",
  },
  {
    value: "Matematika",
    label: "Matematika",
    description: "Hitungan dasar sampai pola numerik yang butuh latihan berulang.",
  },
  {
    value: "Bahasa Indonesia",
    label: "B. Indonesia",
    description: "Pemahaman bacaan, struktur kalimat, dan ketelitian konteks.",
  },
  {
    value: "Bahasa Inggris",
    label: "B. Inggris",
    description: "Reading comprehension, vocabulary, dan kecepatan menangkap ide utama.",
  },
  {
    value: "Penalaran Logis",
    label: "Penalaran Logis",
    description: "Hubungan sebab-akibat, pola, dan penalaran deduktif.",
  },
  {
    value: "Pengetahuan Umum",
    label: "Pengetahuan Umum",
    description: "Wawasan luas yang sering terasa random tanpa strategi belajar terstruktur.",
  },
]

export const OVERSEAS_WEAKNESSES: WeaknessOption[] = [
  {
    value: "IELTS",
    label: "IELTS",
    description: "Targetkan band score dengan fokus pada listening, reading, writing, dan speaking.",
  },
  {
    value: "TOEFL iBT",
    label: "TOEFL iBT",
    description: "Latih reading speed, academic listening, dan struktur jawaban terukur.",
  },
  {
    value: "SAT",
    label: "SAT",
    description: "Bangun fondasi numerik dan verbal untuk seleksi undergraduate internasional.",
  },
  {
    value: "GRE",
    label: "GRE",
    description: "Fokus pada quantitative reasoning, verbal reasoning, dan analytical writing.",
  },
  {
    value: "Academic Writing",
    label: "Academic Writing",
    description: "Susun argumen yang bersih, terstruktur, dan relevan untuk kebutuhan aplikasi.",
  },
  {
    value: "Interview Beasiswa",
    label: "Interview Beasiswa",
    description: "Perkuat storytelling, motivasi studi, dan jawaban berbasis dampak.",
  },
  {
    value: "CV Internasional",
    label: "CV Internasional",
    description: "Rapikan positioning pengalaman agar lebih kuat di mata admission reviewer.",
  },
]

export const WEAKNESS_OPTIONS: Record<ProgramId, WeaknessOption[]> = {
  cpns: GENERAL_WEAKNESSES,
  utbk_snbt: GENERAL_WEAKNESSES,
  kedinasan: GENERAL_WEAKNESSES,
  bumn: GENERAL_WEAKNESSES,
  pppk: GENERAL_WEAKNESSES,
  tni_polri: GENERAL_WEAKNESSES,
  luar_negeri: OVERSEAS_WEAKNESSES,
}

export const ACCOUNT_FIELDS: AccountFieldMeta[] = [
  {
    id: "name",
    label: "Nama Lengkap",
    placeholder: "Nama lengkap sesuai identitas",
    type: "text",
    helper: "Nama diperlukan untuk personalisasi awal akun.",
    autoComplete: "name",
  },
  {
    id: "email",
    label: "Email",
    placeholder: "nama@contoh.com",
    type: "email",
    helper: "Gunakan email aktif untuk akses akun dan update penting.",
    autoComplete: "email",
  },
  {
    id: "username",
    label: "Username",
    placeholder: "misal: raih_lulus",
    type: "text",
    helper: "Minimal 4 karakter dan hanya boleh huruf kecil, angka, atau underscore.",
    autoComplete: "username",
  },
  {
    id: "password",
    label: "Password",
    placeholder: "Minimal 8 karakter",
    type: "password",
    helper: "Gabungkan huruf, angka, dan simbol agar kekuatan password lebih baik.",
    autoComplete: "new-password",
  },
  {
    id: "confirmPassword",
    label: "Konfirmasi Password",
    placeholder: "Ulangi password yang sama",
    type: "password",
    helper: "Harus sama persis dengan password utama.",
    autoComplete: "new-password",
  },
]

export const PASSWORD_RULES: PasswordRule[] = [
  {
    id: "length",
    label: "Minimal 8 karakter",
  },
  {
    id: "case",
    label: "Ada huruf besar atau kecil yang bervariasi",
  },
  {
    id: "number",
    label: "Mengandung angka",
  },
  {
    id: "symbol",
    label: "Mengandung simbol",
  },
]

export const SUMMARY_FIELDS: SummaryFieldMeta[] = [
  {
    id: "program",
    label: "Program",
  },
  {
    id: "university",
    label: "Universitas",
  },
  {
    id: "jurusan",
    label: "Tujuan",
  },
  {
    id: "name",
    label: "Nama",
  },
  {
    id: "email",
    label: "Email",
  },
  {
    id: "username",
    label: "Username",
  },
]

export const ACTION_LABELS = {
  previous: "Kembali",
  next: "Lanjut",
  review: "Lihat ringkasan",
  submit: "Buat akun sekarang",
  submitting: "Memproses pendaftaran...",
  signIn: "Masuk ke akun",
  startNow: "Masuk ke dashboard",
}

export const SUCCESS_COPY = {
  badge: "Pendaftaran selesai",
  title: "Akunmu sudah siap dipakai.",
  description: "Kami akan mengarahkanmu ke dashboard agar kamu bisa langsung mulai belajar.",
  redirectLabel: "Mengarahkan ke dashboard...",
  secondary: "Pindah sekarang",
}

export const SUCCESS_PARTICLES: SuccessParticle[] = [
  { x: -116, y: -54, size: 10, delay: 0.05, duration: 0.95, colorClass: "bg-primary/90" },
  { x: -92, y: -108, size: 8, delay: 0.08, duration: 1.15, colorClass: "bg-sky-300/90" },
  { x: -48, y: -126, size: 7, delay: 0.12, duration: 1.05, colorClass: "bg-white/80" },
  { x: -6, y: -142, size: 9, delay: 0.15, duration: 1.1, colorClass: "bg-cyan-300/90" },
  { x: 44, y: -132, size: 8, delay: 0.18, duration: 1.1, colorClass: "bg-primary/80" },
  { x: 88, y: -98, size: 10, delay: 0.22, duration: 1.2, colorClass: "bg-sky-400/90" },
  { x: 116, y: -46, size: 8, delay: 0.26, duration: 1.02, colorClass: "bg-white/80" },
  { x: 128, y: 8, size: 9, delay: 0.3, duration: 1.08, colorClass: "bg-primary/90" },
  { x: 108, y: 58, size: 7, delay: 0.34, duration: 0.98, colorClass: "bg-cyan-300/90" },
  { x: 66, y: 102, size: 10, delay: 0.36, duration: 1.12, colorClass: "bg-sky-300/90" },
  { x: 14, y: 126, size: 8, delay: 0.4, duration: 1.14, colorClass: "bg-white/80" },
  { x: -32, y: 118, size: 9, delay: 0.44, duration: 1.04, colorClass: "bg-primary/80" },
  { x: -74, y: 92, size: 8, delay: 0.48, duration: 1.18, colorClass: "bg-sky-400/90" },
  { x: -110, y: 46, size: 9, delay: 0.52, duration: 1.08, colorClass: "bg-cyan-300/90" },
  { x: -132, y: -4, size: 7, delay: 0.56, duration: 1.2, colorClass: "bg-white/80" },
  { x: -120, y: -82, size: 6, delay: 0.6, duration: 0.94, colorClass: "bg-primary/80" },
  { x: 16, y: -102, size: 6, delay: 0.62, duration: 1.06, colorClass: "bg-sky-300/90" },
  { x: 102, y: 10, size: 6, delay: 0.66, duration: 0.98, colorClass: "bg-cyan-200/90" },
]
