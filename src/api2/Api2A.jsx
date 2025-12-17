import {useEffect, useState} from "react";
import mockData from '../api2.json';

const Api2A = ({data}) => {
    if (!data || data.length === 0) {
        return null;
    }

    return (
        <div style={{display: 'flex', flexDirection: 'row'}}>
            {data.map((item, index) => {
                return <div
                    className='App2Item'
                    key={item.id || `shortcut-${index}`}
                    style={{marginRight: '10px'}}
                >
                    <img
                        src={item.imageUrl}
                        alt={item.title || 'Shortcut icon'}
                        style={{width: '100px', height: '100px'}}
                    />
                </div>
            })}
        </div>
    );
}

const Api2AApp = () => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        
        // Try to fetch from API first
        fetch('https://api.testvalley.kr/main-shortcut/all')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                setImages(data);
                setError(null);
            })
            .catch(error => {
                console.warn('API unavailable, using mock data:', error.message);
                // Fallback to mock data if API fails
                setImages(mockData);
                setError('⚠️ Using offline data (API unavailable)');
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div className='App2'><div className="loading">Loading shortcuts...</div></div>;
    }

    if (images.length === 0) {
        return <div className='App2'><div className="no-data">No shortcuts available</div></div>;
    }

    return (
        <div className='App2'>
            {error && <div className="warning">{error}</div>}
            <Api2A data={images} />
        </div>
    )
}
export default Api2AApp
