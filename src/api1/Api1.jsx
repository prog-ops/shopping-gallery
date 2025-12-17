import { useEffect, useState, useRef, useCallback } from "react";
import { BsArrowLeftCircle, BsArrowRightCircle } from "react-icons/bs";
import mockData from '../api1.json'; // Pastikan path ini benar sesuai struktur foldermu

const Carousel = ({ data }) => {
    const [slide, setSlide] = useState(0);
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);
    const timeoutRef = useRef(null);

    // Minimum jarak swipe agar dianggap ganti slide
    const minSwipeDistance = 50;

    const length = data.length;

    // --- Logic Navigasi ---
    const nextSlide = useCallback(() => {
        setSlide((prev) => (prev === length - 1 ? 0 : prev + 1));
    }, [length]);

    const prevSlide = useCallback(() => {
        setSlide((prev) => (prev === 0 ? length - 1 : prev - 1));
    }, [length]);

    // --- Auto Play ---
    useEffect(() => {
        // Reset timer setiap kali slide berubah
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        // Ganti slide setiap 4 detik
        timeoutRef.current = setTimeout(nextSlide, 4000);

        return () => clearTimeout(timeoutRef.current);
    }, [slide, nextSlide]);

    // --- Logic Swipe (Touch) ---
    const onTouchStart = (e) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
    };

    const onTouchMove = (e) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return;
        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;

        if (isLeftSwipe) nextSlide();
        if (isRightSwipe) prevSlide();
    };

    if (!data || length === 0) return null;

    return (
        <div
            className="carousel-container"
            onMouseEnter={() => clearTimeout(timeoutRef.current)} // Pause saat mouse di atas banner
            onMouseLeave={() => timeoutRef.current = setTimeout(nextSlide, 4000)} // Resume saat mouse pergi
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
        >
            <BsArrowLeftCircle className="arrow arrow-left" onClick={prevSlide} aria-label="Previous" />

            <div className="carousel-wrapper">
                {data.map((item, index) => (
                    <div
                        key={item.id || index}
                        className={index === slide ? "slide active" : "slide"}
                    >
                        {/* Optimasi Gambar: Hanya load gambar jika slide aktif atau dekat */}
                        {Math.abs(slide - index) <= 1 && (
                            <img
                                src={item.pcImageUrl}
                                alt={item.title || "Banner"}
                                // Gambar pertama prioritas tinggi (LCP), sisanya lazy load
                                loading={index === 0 ? "eager" : "lazy"}
                                className="slide-image"
                            />
                        )}
                    </div>
                ))}
            </div>

            <BsArrowRightCircle className="arrow arrow-right" onClick={nextSlide} aria-label="Next" />

            <div className="indicators">
                {data.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setSlide(idx)}
                        className={slide === idx ? "indicator active" : "indicator"}
                        aria-label={`Go to slide ${idx + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

const Api1App = () => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const res = await fetch("https://api.testvalley.kr/main-banner/all");
                if (!res.ok) throw new Error("Network response was not ok");
                const data = await res.json();
                setImages(data);
            } catch (err) {
                console.warn("API Error, switching to mock data:", err);
                setImages(mockData);
                setError("Offline Mode");
            } finally {
                setLoading(false);
            }
        };

        fetchImages();
    }, []);

    if (loading) return <div className="loading-skeleton">Loading...</div>;
    if (!images.length) return null;

    return (
        <div className="api1-section">
            {error && <small className="status-badge">{error}</small>}
            <Carousel data={images} />
        </div>
    );
};

export default Api1App;
