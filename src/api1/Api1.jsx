import {useEffect, useState} from "react";
import {BsArrowLeftCircle, BsArrowRightCircle} from "react-icons/bs";

const Carousel = ({ data }) => {
    const [slide, setSlide] = useState(0);

    const prev = () => { // data.length - 1 is last index
        setSlide(slide === data.length - 1 ? 0 : slide + 1)
    }
    const next = () => { // 0 is first index
        setSlide(slide === 0 ? data.length - 1 : slide + 1)
    }

    return (
        <div className='carousel'>
            <BsArrowLeftCircle
                className='arrow arrow-left'
                onClick={prev}
            />
            {data.map((item, index) => {
                return (
                    <img
                        className={slide === index ? 'slide' : 'slide slide-hidden'}
                        key={index + 'item.title'}
                        src={item.pcImageUrl}
                        alt={item.title}
                    />
                )
            })}
            <BsArrowRightCircle
                className='arrow arrow-right'
                onClick={next}
            />
            <span className='indicators'>
                {data.map(index => {
                    return <button
                        key={index}
                        onClick={() => setSlide(index)}
                        className={slide === index ? 'indicator' : 'indicator indicator-inactive'}>

                    </button>
                })}
            </span>
        </div>
    )
}

const Api1App = () => {
    const [images, setImages] = useState([]);

    useEffect(() => {
        fetch('https://api.testvalley.kr/main-banner/all')
            .then(response => response.json())
            .then(data => {
                setImages(data);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);
    return (
        <div className='App'>
            <Carousel data={images}/>
        </div>
    )
}
export default Api1App
