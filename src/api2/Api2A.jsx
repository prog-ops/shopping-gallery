import {useEffect, useState} from "react";

const Api2A = ({data}) => {
    return (
        <div style={{display: 'flex', flexDirection: 'row'}}>
            {data.map((item, index) => {
                // console.log('data', data[index].imageUrl)
                // console.log('data', data[index].title)
                return <div
                    className='App2Item'
                    key={index}
                    style={{marginRight: '10px'}}
                >
                    <img
                        src={item.imageUrl}
                        alt={item.title}
                        style={{width: '100px', height: '100px'}}
                    />
                </div>
            })}
        </div>
    );
}

const Api2AApp = () => {
    const [images, setImages] = useState([]);

    useEffect(() => {
        fetch('https://api.testvalley.kr/main-shortcut/all')
            .then(response => response.json())
            .then(data => {
                setImages(data);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <div className='App2'>
            <Api2A data={images} />
        </div>
    )
}
export default Api2AApp
