import { useState } from "react";
import { BiImage } from "react-icons/bi"; // Generic image icon

const ImageWithFallback = ({ src, alt, className = "", ...props }) => {
    // Track which src failed so changing src automatically resets the error state
    const [failedSrc, setFailedSrc] = useState(null);

    // If src is missing or failed to load, render the fallback placeholder
    if (!src || failedSrc === src) {
        return (
            <div className={`fallback-placeholder ${className}`.trim()}>
                <BiImage className="fallback-icon" />
            </div>
        );
    }

    return (
        <img
            src={src}
            alt={alt}
            className={className}
            onError={() => setFailedSrc(src)} // Triggered when the image fails to load
            {...props}
        />
    );
};

export default ImageWithFallback;
