import React from 'react';

const Loading = () => {
    return (
        <div className="loading-wrapper">
            <div className="progress-track">
                <div className="progress-bar-animated"></div>
            </div>
            <p className="loading-text">Memuat konten terbaik untukmu...</p>
        </div>
    );
};

export default Loading;
