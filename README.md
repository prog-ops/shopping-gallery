# 🛍️ Modern E-Commerce UI Architecture

A high-performance, responsive e-commerce interface engineered with **React**, **Zustand**, and **TanStack Query**.

This project serves as a showcase of modern frontend architecture, focusing on **Core Web Vitals (CWV)**, seamless UX, and efficient state management. Built from the ground up to mimic enterprise-level E-commerce applications without relying on heavy UI frameworks or external dependency bloat.

## 🚀 Key Highlights & Best Practices

Engineered for performance, scalability, and user-centric design.

### ⚡ Performance & State Architecture
- **Hybrid State Management**:
    - **Server State**: Handled by **TanStack Query (React Query)** with robust caching logic (`staleTime`, `cacheTime`) to prevent redundant network requests and ensure instant navigation.
    - **Client State**: Managed by **Zustand** for a lightweight, boilerplate-free global store (handling Cart, Favorites, UI Modes, and Routing).
- **LCP (Largest Contentful Paint) Optimized**: The main carousel prioritizes the active slide image (`loading="eager"`) while lazy-loading off-screen images.
- **CLS (Cumulative Layout Shift) Prevention**: All image containers utilize aspect-ratio placeholders and skeleton loaders to prevent layout jumps during data fetching.

### 🎨 Advanced UX/UI Features (Zero External Libraries)
- **3D "Cover Flow" Carousel**: Custom-built CSS 3D Transform carousel. Features smooth hardware-accelerated transitions, giving a premium feel without heavy libraries like Swiper.
- **Native Autocomplete Search**: Implemented a highly optimized search bar with **Debouncing (300ms)** and instant dropdown suggestions powered entirely by cached React Query data—resulting in zero-latency typing.
- **Dynamic Text Highlighting**: Custom implementation using Regex to actively highlight search keywords within product titles, mirroring Google Chrome's search UX natively.
- **Interactive Drawers**: Cart and Favorites utilize fixed, hover-triggered "Drawers" for rapid user access without interrupting the shopping experience.

### 💳 End-to-End E-Commerce Flow
- **Shopping Cart & Wishlist**: Real-time state updates with visual sliding animations (`translateX`) for immediate user feedback.
- **Secure Checkout Simulation**: A realistic checkout modal handling form states, mimicking network latency via a mock API (`fetch`), and concluding with a success view.
- **Transaction History**: Seamless routing to a dedicated purchase history view, generating dynamic receipts from checkout payloads.

## 🧠 Challenge & Solution

**Challenge:** 
Building a complex, instant-feedback search feature (Autocomplete + Highlighting + Case/Hyphen Tolerance) while maintaining strict performance budgets and avoiding bloated third-party libraries (like Lodash or React-Select). Furthermore, integrating an end-to-end checkout flow purely on the frontend without compromising UX realism or exposing sensitive API keys.

**Solution:** 
To solve the search performance bottleneck, I leveraged the existing **TanStack Query** cache as the source of truth for the autocomplete suggestions. By combining this with a custom **300ms Debounce hook**, the application filters data natively at blazing speeds without triggering unnecessary re-renders. For text highlighting, I engineered a specialized React component that safely escapes Regex inputs to split and wrap matching text strings in `<mark>` tags natively. 

For the checkout simulation, I architected a multi-step `CheckoutModal` connected to the Zustand store. Instead of a hardcoded timeout, it executes a real `fetch POST` request to a public JSONPlaceholder endpoint to accurately simulate asynchronous network latency. Upon a `200 OK` response, it resolves the UI state, clears the cart, and securely logs the payload into a local `Transaction History` array, perfectly mimicking an enterprise payment gateway's behavior securely on the client side.

## 📦 Tech Stack

- **Core**: React 18, Vite
- **State Management**: Zustand (Client), TanStack Query (Server/Async)
- **Styling**: Pure CSS / Native CSS Variables
- **Icons**: React Icons
- **Language**: JavaScript (ES6+)

## 📂 Project Structure

```bash
src/
├── carousel/           # 3D Carousel App Component
├── category/           # Category Shortcut Filters
├── main/               # Main Product Grid & Interactions
├── components/         # Reusable UI Components
│   ├── Cart.jsx            # Hoverable Cart Drawer
│   ├── Favorites.jsx       # Hoverable Wishlist Drawer
│   ├── SearchBar.jsx       # Debounced Autocomplete Search
│   ├── CheckoutModal.jsx   # Async Payment Simulation
│   ├── ProductModal.jsx    # Overlay Product Details
│   ├── HighlightText.jsx   # Native Text Highlighting
│   ├── Navbar.jsx          # Sticky Top Navigation
│   └── Transactions.jsx    # Purchase History View
├── store/              # Zustand Global Store (Cart, Favs, History, UI)
├── App.css             # Global Styles & Animations
└── App.jsx             # Application Root & Routing Logic
```
