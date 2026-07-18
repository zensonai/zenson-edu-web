import React from 'react';

const DefaultButton = ({
    label = "Click the Button",
    onClick,
    type = "button",
    disabled = false,
}) => {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`w-full py-2 px-8 rounded-xl font-semibold text-white
                        transition-all duration-200 shadow-md hover:shadow-lg
                        ${disabled
                    ? 'bg-gray-400 cursor-not-allowed'
                    : `bg-gradient-to-r from-indigo-500 via-indigo-600 to-indigo-700
                               hover:from-indigo-600 hover:via-indigo-700 hover:to-indigo-800
                               focus:outline-none focus:ring-2 focus:ring-indigo-300/40`}
                        transform hover:-translate-y-0.5`}
        >
            {label}
        </button>
    );
};

export default DefaultButton;