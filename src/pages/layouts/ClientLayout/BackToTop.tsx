// BackToTop.jsx
import React from 'react';

function BackToTop() {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // Smooth scroll effect
        });
    };

    return (
        <button 
            onClick={scrollToTop} 
            className="fixed bottom-4 right-4 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition duration-300 ease-in-out"
            aria-label="Scroll to top"
        >
            ↑ {/* This can be replaced with an icon if you prefer */}
        </button>
    );
}

export default BackToTop;
