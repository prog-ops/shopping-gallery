import { useEffect, useState, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import mockData from "../api1.json";
import ImageWithFallback from "../components/ImageWithFallback.jsx";

/**
 * Coverflow Carousel gallery powered by Embla Carousel (React 19 compatible)
 */
const Carousel = ({ data }) => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [emblaRef, emblaApi] = useEmblaCarousel(
        { loop: true, align: "center", skipSnaps: false },
        [Autoplay({ delay: 4000, stopOnInteraction: false, stopOnMouseEnter: true })]
    );

    const length = data?.length ?? 0;

    // Navigation handlers
    const prevSlide = useCallback(() => {
        emblaApi?.scrollPrev();
    }, [emblaApi]);

    const nextSlide = useCallback(() => {
        emblaApi?.scrollNext();
    }, [emblaApi]);

    const scrollTo = useCallback(
        (index) => {
            emblaApi?.scrollTo(index);
        },
        [emblaApi]
    );

    // Sync active slide state with Embla Carousel selection events
    useEffect(() => {
        if (!emblaApi) return;

        const onSelect = () => {
            setSelectedIndex(emblaApi.selectedScrollSnap());
        };

        emblaApi.on("select", onSelect);
        emblaApi.on("reInit", onSelect);

        return () => {
            emblaApi.off("select", onSelect);
            emblaApi.off("reInit", onSelect);
        };
    }, [emblaApi]);

    // Determine slide position state (active, prev, next, far-prev, far-next, or hidden)
    const getSlideState = (index) => {
        if (index === selectedIndex) return "active";
        if (length <= 1) return "hidden";

        let offset = (index - selectedIndex + length) % length;
        if (offset > length / 2) offset -= length;

        if (offset === -1) return "prev";
        if (offset === 1) return "next";
        if (offset === -2) return "far-prev";
        if (offset === 2) return "far-next";

        return "hidden";
    };

    if (!data || length === 0) return null;

    return (
        <div className="carousel-container">
            <BsChevronLeft
                className="arrow arrow-left"
                onClick={prevSlide}
                aria-label="Previous slide"
            />

            <div className="carousel-viewport" ref={emblaRef}>
                <div className="carousel-track">
                    {data.map((item, index) => {
                        const slideState = getSlideState(index);

                        return (
                            <div
                                key={item.id ?? item.mainBannerId ?? index}
                                className={`embla-slide ${slideState}`}
                                onClick={() => scrollTo(index)}
                            >
                                <div className="slide-card">
                                    <ImageWithFallback
                                        src={item.pcImageUrl}
                                        alt={item.title}
                                        className="slide-image"
                                        loading={slideState === "active" ? "eager" : "lazy"}
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <BsChevronRight
                className="arrow arrow-right"
                onClick={nextSlide}
                aria-label="Next slide"
            />

            <div className="indicators">
                {data.map((item, idx) => (
                    <button
                        key={item.id ?? item.mainBannerId ?? idx}
                        type="button"
                        onClick={() => scrollTo(idx)}
                        aria-label={`Go to slide ${idx + 1}`}
                        className={selectedIndex === idx ? "indicator active" : "indicator"}
                    />
                ))}
            </div>
        </div>
    );
};

const CarouselApp = () => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch banner product images with local mock fallback
        fetch("https://kolzsticks.github.io/Free-Ecommerce-Products-Api/main/products.json")
            .then((res) => res.json())
            .then((data) => {
                const mappedData = data.slice(0, 12).map((item) => ({
                    id: item.id,
                    pcImageUrl: item.image,
                    title: item.name,
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
