# Shopping Gallery - Test Valley Clone

![React](https://img.shields.io/badge/React-18.2.0-blue)
![Vite](https://img.shields.io/badge/Vite-5.1.0-purple)
![License](https://img.shields.io/badge/license-MIT-green)

---

## 📚 **Documentation Index**

| Document                                                 | Description                 | Use Case                    |
| -------------------------------------------------------- | --------------------------- | --------------------------- |
| **[README.md](README.md)**                               | Main project documentation  | First-time setup & overview |
| **[QUICK_REFERENCE.md](QUICK_REFERENCE.md)**             | Quick reference guide       | Daily development lookup    |
| **[BUG_REPORT.md](BUG_REPORT.md)**                       | Detailed bug analysis       | Understanding issues found  |
| **[FIXES_SUMMARY.md](FIXES_SUMMARY.md)**                 | Complete fix documentation  | Learning what was fixed     |
| **[PROJECT_STATUS.md](PROJECT_STATUS.md)**               | Current project status      | Quick status check          |
| **[CHANGELOG.md](CHANGELOG.md)**                         | Version history             | Tracking changes over time  |
| **[API_FALLBACK_SOLUTION.md](API_FALLBACK_SOLUTION.md)** | API fallback implementation | Understanding offline mode  |
| **[IMAGE_UPDATE_DOCS.md](IMAGE_UPDATE_DOCS.md)**         | Image URL replacement       | Product images solution     |

---

## 📋 Deskripsi Proyek

**Shopping Gallery** adalah aplikasi web React yang merupakan kloning dari halaman utama [Test Valley](https://www.testvalley.kr/). Proyek ini dibuat sebagai bagian dari assessment untuk mendemonstrasikan kemampuan dalam:

- Mengkonsumsi REST API
- Membuat komponen carousel/slider
- Menampilkan data produk dalam grid layout
- Implementasi UI yang responsif dan menarik

## 🎯 Tujuan Proyek

Proyek ini bertujuan untuk mereplikasi tampilan dan fungsionalitas halaman utama Test Valley dengan fokus pada:

1. **Carousel Banner** - Menampilkan banner promosi utama
2. **Shortcut Menu** - Menampilkan menu shortcut navigasi
3. **Product Grid** - Menampilkan produk dengan diskon dalam layout grid

## 🛠️ Tech Stack

### Core Technologies

- **React** `18.2.0` - Library JavaScript untuk membangun user interface
- **Vite** `5.1.0` - Build tool dan dev server yang cepat
- **JavaScript (ES6+)** - Bahasa pemrograman utama

### Dependencies

- **axios** `^1.6.7` - HTTP client untuk API requests
- **react-elastic-carousel** `^0.11.5` - Library carousel yang fleksibel
- **react-icons** `^5.0.1` - Icon library (menggunakan Bootstrap Icons)

### Dev Dependencies

- **ESLint** `^8.56.0` - Linter untuk code quality
- **@vitejs/plugin-react** `^4.2.1` - Plugin Vite untuk React
- **@types/react** & **@types/react-dom** - TypeScript definitions

## 📁 Struktur Proyek

```
shopping-gallery/
├── public/                 # Static assets
├── src/
│   ├── api1/              # Komponen untuk Banner Carousel
│   │   ├── Api1.jsx       # Main carousel component (aktif)
│   │   ├── a.jsx          # Versi alternatif carousel
│   │   ├── b.jsx          # Versi alternatif carousel
│   │   ├── c.jsx          # Versi alternatif carousel
│   │   ├── d.jsx          # Versi alternatif carousel
│   │   ├── e.jsx          # Versi alternatif carousel
│   │   └── BuildASimpleCarouselLib.jsx
│   │
│   ├── api2/              # Komponen untuk Shortcut Menu
│   │   └── Api2A.jsx      # Shortcut menu component
│   │
│   ├── api3/              # Komponen untuk Product Grid
│   │   ├── Api3A.jsx      # Main product grid (functional)
│   │   └── Api3AClass.jsx # Class-based version
│   │
│   ├── assets/            # Images dan media files
│   ├── App.jsx            # Root component
│   ├── App.css            # App-specific styles
│   ├── index.css          # Global styles
│   ├── main.jsx           # Entry point
│   ├── api1.json          # Mock data untuk testing
│   ├── api2.json          # Mock data untuk testing
│   ├── api3.json          # Mock data untuk testing
│   └── readme.md          # Assignment documentation
│
├── index.html             # HTML template
├── package.json           # Project dependencies
├── vite.config.js         # Vite configuration
├── .eslintrc.cjs          # ESLint configuration
└── README.md              # Project documentation
```

## 🔌 API Endpoints

Aplikasi ini mengkonsumsi 3 API endpoints dari Test Valley:

### 1. Main Banner API

```
GET https://api.testvalley.kr/main-banner/all
```

**Digunakan untuk:** Carousel banner utama di bagian atas halaman

**Response Fields:**

- `pcImageUrl` - URL gambar banner untuk desktop
- `title` - Judul banner

### 2. Main Shortcut API

```
GET https://api.testvalley.kr/main-shortcut/all
```

**Digunakan untuk:** Menu shortcut navigasi

**Response Fields:**

- `imageUrl` - URL icon shortcut
- `title` - Nama shortcut

### 3. Collections API

```
GET https://api.testvalley.kr/collections?prearrangedDiscount&type=SINGLE&viewType=TILE
```

**Digunakan untuk:** Grid produk dengan diskon

**Response Fields:**

- `items` - Array produk
- `media[0].uri` - URL gambar produk
- `publication.title` - Nama produk
- `publication.priceInfo.discountRate` - Persentase diskon
- `publication.priceInfo.discountPrice` - Harga setelah diskon

## 🚀 Cara Menjalankan Proyek

### Prerequisites

- Node.js (versi 16 atau lebih tinggi)
- pnpm (atau npm/yarn)

### Installation

1. **Clone repository**

```bash
git clone <repository-url>
cd shopping-gallery
```

2. **Install dependencies**

```bash
pnpm install
# atau
npm install
```

3. **Jalankan development server**

```bash
pnpm dev
# atau
npm run dev
```

4. **Buka browser**

```
http://localhost:5173
```

### Available Scripts

```bash
pnpm dev        # Menjalankan development server
pnpm build      # Build untuk production
pnpm preview    # Preview production build
pnpm lint       # Menjalankan ESLint
```

## 💡 Fitur Utama

### 1. **Banner Carousel**

- ✅ Auto-sliding banner dengan navigasi manual
- ✅ Arrow navigation (kiri/kanan)
- ✅ Indicator dots untuk navigasi langsung
- ✅ Responsive design
- ✅ Smooth transitions

### 2. **Shortcut Menu**

- ✅ Horizontal scrollable menu
- ✅ Icon-based navigation
- ✅ Fetching data dari API

### 3. **Product Grid**

- ✅ Layout grid 5 kolom
- ✅ Setiap row dimulai dengan title & description
- ✅ Menampilkan gambar produk
- ✅ Menampilkan harga diskon
- ✅ Truncate text untuk judul panjang
- ✅ Responsive layout (mobile-friendly)

## 🎨 Styling & Design

### CSS Architecture

- **App.css** - Component-specific styles
- **index.css** - Global styles, carousel, grid layout

### Design Highlights

- Responsive grid system (5 kolom → 2 kolom → 1 kolom)
- Custom carousel dengan smooth animations
- Shadow effects untuk depth
- Hover states untuk interaktivitas
- Color scheme yang konsisten dengan Test Valley

## 🔧 Komponen Utama

### `App.jsx`

Root component yang mengintegrasikan semua komponen utama:

```jsx
<Api1App />    // Banner Carousel
<Api2AApp />   // Shortcut Menu
<Api3AApp />   // Product Grid
```

### `Api1.jsx` - Carousel Component

- State management untuk slide aktif
- Navigation functions (prev/next)
- Indicator dots untuk navigasi
- Responsive image display

### `Api2A.jsx` - Shortcut Menu

- Horizontal flex layout
- Image rendering dari API
- Minimal styling untuk clean look

### `Api3A.jsx` - Product Grid

- Complex grid layout logic
- Dynamic row/column generation
- Price formatting
- Conditional rendering untuk media

## 📱 Responsive Design

Aplikasi ini fully responsive dengan breakpoints:

- **Desktop** (> 768px): 5 kolom grid
- **Tablet** (480px - 768px): 2 kolom grid
- **Mobile** (< 480px): 1 kolom grid

## 🐛 Known Issues & Limitations

1. **Pagination** - Tidak diimplementasikan (sesuai requirement)
2. **Routing** - Single page application tanpa routing
3. **Error Handling** - Basic error handling dengan console.error
4. **Loading States** - Tidak ada loading indicator

## 🔮 Future Improvements

- [ ] Menambahkan loading skeleton
- [ ] Implementasi error boundaries
- [ ] Menambahkan lazy loading untuk images
- [ ] Infinite scroll untuk product grid
- [ ] Search & filter functionality
- [ ] Shopping cart integration
- [ ] User authentication

## 📝 Assignment Details

Proyek ini dibuat untuk memenuhi **Assessment No.1** dengan requirements:

✅ Replicate Test Valley homepage design  
✅ Consume 3 API endpoints  
✅ No pagination/redirection needed  
✅ UI exactly same with Test Valley's design

## 👨‍💻 Development Notes

### Versi Alternatif Carousel

Folder `api1/` berisi beberapa versi implementasi carousel:

- `a.jsx` - Tampil semua gambar
- `b.jsx` - Tampil 3 gambar
- `c.jsx`, `d.jsx`, `e.jsx` - Variasi lainnya
- `Api1.jsx` - **Versi final yang digunakan**

### Data Testing

File JSON (`api1.json`, `api2.json`, `api3.json`) disediakan untuk testing offline jika API tidak tersedia.

## 🤝 Contributing

Jika ingin berkontribusi:

1. Fork repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 License

This project is created for educational purposes.

## 📞 Contact

Untuk pertanyaan atau feedback, silakan buka issue di repository ini.

---

**Built with ❤️ using React + Vite**
