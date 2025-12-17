import React, {useEffect, useState} from "react";
import mockData from '../api3.json';

const COLUMNS_PER_ROW = 5;

const GridList = ({ items: data }) => {
    // Function to create a grid list
    const createGridList = () => {
        const numRows = Math.ceil(data.length / COLUMNS_PER_ROW);
        let rows = [];

        for (let i = 0; i < numRows; i++) {
            let columns = [];

            // First item in the row is title and subtitle
            const currentItem = data[i * COLUMNS_PER_ROW];
            columns.push(
                <div className="column" key={currentItem?.id || `title-${i}`}>
                    <h4>{currentItem?.title || 'No Title'}</h4>
                    <p>{currentItem?.description || ''}</p>
                </div>
            );

            // Rest of the items in the row display the URI from the media object
            for (let j = 1; j < COLUMNS_PER_ROW; j++) {
                const subItemIndex = i * COLUMNS_PER_ROW + j;
                if (subItemIndex < data.length) {
                    const subItem = data[subItemIndex];

                    // ✅ FIXED: Proper null checking with optional chaining
                    let mediaUri;
                    if (subItem?.media?.[0]) {
                        mediaUri = subItem.media[0].uri;
                    } else {
                        mediaUri = subItem?.items?.[0]?.publication?.media?.[0]?.uri;
                    }

                    const title = subItem?.items?.[0]?.publication?.title || 'No Title';
                    const discountRate = subItem?.items?.[0]?.publication?.priceInfo?.discountRate;
                    const discountPrice = subItem?.items?.[0]?.publication?.priceInfo?.discountPrice;
                    const couponDiscountRate = subItem?.items?.[0]?.publication?.priceInfo?.couponDiscountRate;
                    const couponDiscountPrice = subItem?.items?.[0]?.publication?.priceInfo?.couponDiscountPrice;

                    const finalDiscountRate = discountRate || couponDiscountRate;
                    const finalDiscountPrice = discountPrice || couponDiscountPrice;

                    columns.push(
                        <div className="column" key={subItem?.id || `product-${subItemIndex}`}>
                            {mediaUri
                                ? <img src={mediaUri} alt={title} className='mediaUri'/>
                                : <div className='no-image'>No Image</div>
                            }
                            <div className='justified'>
                                {title && title.length > 24
                                    ? title.substring(0, 24)+"..."
                                    : title
                                }
                            </div>
                            {finalDiscountRate && finalDiscountPrice && (
                                <div>
                                    <span style={{color:'#ff7031'}}>
                                        {finalDiscountRate}%
                                    </span> {finalDiscountPrice}KR
                                </div>
                            )}
                        </div>
                    );
                } else {
                    columns.push(
                        <div className="column" key={`empty-${i}-${j}`}></div>
                    ); // Empty column if no more items
                }
            }

            rows.push(
                <div className="row" key={`row-${i}`}>
                    {columns}
                </div>
            );
        }

        return rows;
    }

    if (!data || data.length === 0) {
        return null;
    }

    return (
        <div className="gridContainer">
            {createGridList()}
        </div>
    )
}

export const Api3AApp = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        
        // Try to fetch from API first
        fetch('https://api.testvalley.kr/collections?prearrangedDiscount&type=SINGLE&viewType=TILE')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                setData(data.items || []);
                setError(null);
            })
            .catch(error => {
                console.warn('API unavailable, using mock data:', error.message);
                // Fallback to mock data if API fails
                setData(mockData.items || []);
                setError('⚠️ Using offline data (API unavailable)');
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div className='App'><div className="loading">Loading products...</div></div>;
    }

    if (data.length === 0) {
        return <div className='App'><div className="no-data">No products available</div></div>;
    }

    return (
        <div className='App'>
            {error && <div className="warning">{error}</div>}
            <GridList items={data}/>
        </div>
    )
}
