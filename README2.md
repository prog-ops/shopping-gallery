# 🛍️ Shopping Gallery UI (Modern E-Commerce)

https://shopping-gallery-t2yo.vercel.app/

A high-performance, responsive e-commerce homepage interface built with **React**, **Zustand**, and **TanStack Query**.

This project demonstrates modern frontend architecture, focusing on **Core Web Vitals (CWV)**, seamless UX, and efficient state management without heavy dependencies.

## 🚀 Key Highlights & Best Practices

This is engineered for performance and scalability.

### ⚡ Performance & Optimization
- **Hybrid State Management**:
    - **Server State**: Handled by **TanStack Query (React Query)** with caching logic (`staleTime`, `cacheTime`) to prevent redundant network requests and ensure instant navigation.
    - **Client State**: Managed by **Zustand** for a lightweight, boilerplate-free global store (used for filtering logic).
- **LCP (Largest Contentful Paint) Optimized**: The main carousel prioritizes the active slide image (`loading="eager"`) while lazy-loading off-screen images.
- **CLS (Cumulative Layout Shift) Prevention**: All image containers utilize aspect-ratio placeholders and skeleton loaders to prevent layout jumps during data fetching.

### 🎨 Modern UX/UI Architecture
- **3D "Cover Flow" Carousel**: Custom-built CSS 3D Transform carousel (No heavy libraries like `slick` or `swiper`). Features touch swipe gestures, auto-play with hover-pause, and smooth hardware-accelerated transitions.
- **Smart Image Fallbacks**: A robust `ImageWithFallback` component that gracefully handles broken URLs (404s) or loading errors by showing a polished placeholder.
- **Instant Filtering**: Category selection performs client-side filtering on cached data, resulting in **zero-latency** UI updates.
- **Indeterminate Loading States**: Custom animated progress bars instead of generic spinners for a perceived faster loading experience.

### 🛠 Code Quality
- **Separation of Concerns**: Logic is decoupled from UI. API calls are isolated in hooks/queries, and complex UI logic is separated into reusable components.
- **DRY (Don't Repeat Yourself)**: Reusable components for `Loading`, `ImageWithFallback`, and consistent CSS variables.
- **Mobile-First Design**: Fully responsive Grid and Flex layouts using CSS Grid (`repeat(auto-fit)` logic) and Media Queries.

## 📦 Tech Stack

- **Core**: React 18, Vite
- **State Management**: Zustand (Client), TanStack Query (Server/Async)
- **Styling**: CSS Modules / Native CSS Variables (No heavy UI frameworks)
- **Icons**: React Icons
- **Language**: JavaScript (ES6+)

## 📂 Project Structure

```bash
src/
├── api1/           # Main Banner (Carousel) Logic
├── api2/           # Shortcut Navigation Logic
├── api3/           # Product Grid & Filtering Logic
├── components/     # Shared Reusable Components
│   ├── ImageWithFallback.jsx
│   └── Loading.jsx
├── store/          # Zustand Global Store
├── App.css         # Global Styles & Variables
└── main.jsx        # App Entry Point & Providers
