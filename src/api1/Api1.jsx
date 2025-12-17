import {useEffect, useState} from "react";
import {BsArrowLeftCircle, BsArrowRightCircle} from "react-icons/bs";
import mockData from '../api1.json';

const Carousel = ({data}) => {
    const [slide, setSlide] = useState(0);

    // ✅ FIXED: prev now decrements, next increments
    const prev = () => {
        setSlide(slide === 0 ? data.length - 1 : slide - 1);
    };
    const next = () => {
        setSlide(slide === data.length - 1 ? 0 : slide + 1);
    };

    // Prevent rendering if no data
    if (!data || data.length === 0) {
        return null;
    }

    return (
        <div className="carousel">
            <BsArrowLeftCircle
                className="arrow arrow-left"
                onClick={prev}
                aria-label="Previous slide"
            />
            {data.map((item, index) => {
                return (
                    <img
                        className={slide === index ? "slide" : "slide slide-hidden"}
                        key={item.id || `banner-${index}`}
                        src={item.pcImageUrl}
                        alt={item.title || "Banner image"}
                    />
                );
            })}
            <BsArrowRightCircle
                className="arrow arrow-right"
                onClick={next}
                aria-label="Next slide"
            />
            <span className="indicators">
        {data.map((item, idx) => {
            return (
                <button
                    key={item.id || `indicator-${idx}`}
                    onClick={() => setSlide(idx)}
                    aria-label={`Go to slide ${idx + 1}`}
                    className={
                        slide === idx ? "indicator" : "indicator indicator-inactive"
                    }
                ></button>
            );
        })}
      </span>
        </div>
    );
};

const Api1App = () => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);

        // Try to fetch from API first
        fetch("https://api.testvalley.kr/main-banner/all")
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                setImages(data);
                setError(null);
            })
            .catch((error) => {
                console.warn("API unavailable, using mock data:", error.message);
                // Fallback to mock data if API fails (301, CORS, network error, etc.)
                setImages(mockData);
                setError("⚠️ Using offline data (API unavailable)");
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="App">
                <div className="loading">Loading banners...</div>
            </div>
        );
    }

    if (images.length === 0) {
        return (
            <div className="App">
                <div className="no-data">No banners available</div>
            </div>
        );
    }

    return (
        <div className="App">
            {error && <div className="warning">{error}</div>}
            <Carousel data={images}/>
        </div>
    );
};
export default Api1App;
