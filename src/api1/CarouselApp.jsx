import { useEffect, useState, useRef, useCallback } from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import mockData from '../api1.json';
import ImageWithFallback from "../components/ImageWithFallback.jsx";

/**
 * Coverflow Carousel gallery
 */
const Carousel = ({ data }) => {
    const [slide, setSlide] = useState(0);
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);
    const timeoutRef = useRef(null);

    const length = data.length;

    // --- Logic Navigasi ---
    const nextSlide = useCallback(() => {
        setSlide((prev) => (prev === length - 1 ? 0 : prev + 1));
    }, [length]);

    const prevSlide = useCallback(() => {
        setSlide((prev) => (prev === 0 ? length - 1 : prev - 1));
    }, [length]);

    // --- Helper: Tentukan Posisi Slide (Active, Prev, Next, Far-Prev, Far-Next, atau Hidden) ---
    const getSlideClass = (index) => {
        if (index === slide) return "slide active";

        const prevIndex = slide === 0 ? length - 1 : slide - 1;
        const nextIndex = slide === length - 1 ? 0 : slide + 1;

        const farPrevIndex = prevIndex === 0 ? length - 1 : prevIndex - 1;
        const farNextIndex = nextIndex === length - 1 ? 0 : nextIndex + 1;

        if (index === prevIndex) return "slide prev";
        if (index === nextIndex) return "slide next";
        if (index === farPrevIndex) return "slide far-prev";
        if (index === farNextIndex) return "slide far-next";

        return "slide hidden"; // Slide sisanya disembunyikan
    };

    // --- Auto Play & Swipe (Sama seperti sebelumnya) ---
    useEffect(() => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(nextSlide, 4000);
        return () => clearTimeout(timeoutRef.current);
    }, [slide, nextSlide]);

    const onTouchStart = (e) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
    };
    const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);
    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return;
        const distance = touchStart - touchEnd;
        if (distance > 50) nextSlide();
        if (distance < -50) prevSlide();
    };

    if (!data || length === 0) return null;

    return (
        <div
            className="carousel-container"
            onMouseEnter={() => clearTimeout(timeoutRef.current)}
            onMouseLeave={() => timeoutRef.current = setTimeout(nextSlide, 4000)}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
        >
            <BsChevronLeft className="arrow arrow-left" onClick={prevSlide} />

            <div className="carousel-track">
                {data.map((item, index) => {
                    // Hanya render gambar jika dia Active, Prev, atau Next (Optimasi Performa)
                    const className = getSlideClass(index);
                    const shouldRender = className !== "slide hidden";

                    return (
                        <div
                            key={item.id || index}
                            className={className}
                            onClick={() => setSlide(index)}
                        >
                            {shouldRender && (
                                <ImageWithFallback
                                    src={item.pcImageUrl}
                                    alt={item.title}
                                    className="slide-image"
                                />
                            )}
                        </div>
                    );
                })}
            </div>

            <BsChevronRight className="arrow arrow-right" onClick={nextSlide} />

            <div className="indicators">
                {data.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setSlide(idx)}
                        className={slide === idx ? "indicator active" : "indicator"}
                    />
                ))}
            </div>
        </div>
    );
};

// ... (Bagian Api1App sisanya sama seperti sebelumnya)
const CarouselApp = () => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // ... logic fetch data sama
        fetch("https://kolzsticks.github.io/Free-Ecommerce-Products-Api/main/products.json")
            .then(res => res.json())
            .then(data => {
                const mappedData = data.slice(0, 12).map(item => ({
                    id: item.id,
                    pcImageUrl: item.image,
                    title: item.name
                }));
                setImages(mappedData);
            })
            .catch(() => setImages(mockData))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <div className="loading-skeleton"></div>;

    return (
        <div className="section-container">
            <Carousel data={images} />
        </div>
    );
};
export default CarouselApp;
