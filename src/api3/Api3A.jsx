import React, {useEffect, useState} from "react";

const GridList = ({ items: data }) => {
    // Function to create a grid list
    const createGridList = () => {
        const numRows = Math.ceil(data.length / 5); // Calculate number of rows needed
        let rows = [];

        for (let i = 0; i < numRows; i++) {
            let columns = [];

            // First item in the row is title and subtitle
            const currentItem = data[i * 5];
            columns.push(
                <div className="column" key={currentItem.id}>
                    <h4>{currentItem.title}</h4>
                    <p>{currentItem.subtitle}</p>
                </div>
            );

            // Rest of the items in the row display the URI from the media object
            for (let j = 1; j < 5; j++) {
                const subItemIndex = i * 5 + j;
                if (subItemIndex < data.length) {
                    const subItem = data[subItemIndex];
                    // console.log('subItem', subItem)

                    // const mediaUri = subItem.publication?.media[0]?.uri; // Assuming there's only one media object
                    // const mediaUri = subItem.media[0]?.uri;//✔️ banyak ini gambarnya
                    // const mediaUri = subItem.items[0]?.publication.media[0].uri;//✔️
                    // https://dvd6ljcj7w3pj.cloudfront.net/media/PUBLICATION/4f668941-c2b3-4ed6-8112-368e43d45fa2.jpeg
                    let mediaUri
                    if (subItem.media[0]) {
                        mediaUri = subItem.media[0]?.uri;
                    } else {
                        mediaUri = subItem.items[0]?.publication.media[0].uri
                    }
                    const title = subItem.items[0]?.publication.title
                    const discountRate = subItem.items[0]?.publication.priceInfo.discountRate
                    const discountPrice = subItem.items[0]?.publication.priceInfo.discountPrice
                    const couponDiscountRate = subItem.items[0]?.publication.priceInfo?.couponDiscountRate
                    const couponDiscountPrice = subItem.items[0]?.publication.priceInfo?.couponDiscountPrice

                    console.log('cdr', couponDiscountRate)
                    console.log('cdp', couponDiscountPrice)

                    columns.push(
                        <div className="column" key={subItem.id}>
                            {mediaUri
                                ? <img src={mediaUri} alt="Image" className='mediaUri'/>
                                : <div>No Pic</div>
                            }
                            <div className='justified'>
                                {title && title.length > 10
                                    ? title.substring(0, 24)+"..."
                                    : title
                                }
                            </div>
                            <div>
                                <span style={{color:'#ff7031'}}>
                                    {discountRate ? discountRate : couponDiscountRate}%
                                </span>{discountPrice ? discountPrice : couponDiscountPrice}KR
                            </div>
                        </div>
                    );
                } else {
                    columns.push(
                        <div className="column" key={j}></div>
                    ); // Empty column if no more items
                }
            }

            rows.push(
                <div className="row" key={i}>
                    {columns}
                </div>
            );
        }

        return rows;
    }

    return (
        <div className="gridContainer">
            {createGridList()}
        </div>
    )
}

export const Api3AApp = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('https://api.testvalley.kr/collections?prearrangedDiscount&type=SINGLE&viewType=TILE')
            .then(response => response.json())
            .then(data => {
                // console.log('data', data.items)
                setData(data.items);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <div className='App'>
            <GridList items={data}/>
        </div>
    )
}
