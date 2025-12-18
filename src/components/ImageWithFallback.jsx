import React, { useState, useEffect } from "react";
import { BiImage } from "react-icons/bi"; // Ikon gambar generik

const ImageWithFallback = ({ src, alt, className, ...props }) => {
    const [error, setError] = useState(false);

    // Reset error jika src berubah (misal saat carousel geser)
    useEffect(() => {
        setError(false);
    }, [src]);

    // Logic: Jika error atau src kosong, tampilkan Placeholder
    if (error || !src) {
        return (
            <div className={`fallback-placeholder ${className}`}>
                <BiImage className="fallback-icon" />
            </div>
        );
    }

    return (
        <img
            src={src}
            alt={alt}
            className={className}
            onError={() => setError(true)} // Trigger saat gambar gagal load
            {...props}
        />
    );
};

export default ImageWithFallback;
