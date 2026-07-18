import React from 'react';

const FileInput = ({ label, name, onChange, required = false, accept, multiple = false }) => {
    return (
        <div className="mb-5">
            {label && (
                <label
                    htmlFor={name}
                    className="block text-xs font-semibold mb-2"
                >
                    {label}
                </label>
            )}
            <input
                type="file"
                name={name}
                id={name}
                onChange={onChange}
                required={required}
                accept={accept}
                multiple={multiple}
                className="
                    w-full px-4 py-0 rounded border border-gray-300 
                    bg-white text-gray-900 text-sm
                    file:mr-4 file:px-4 file:py-2
                    file:rounded file:border-0
                    file:bg-gray-200 file:text-gray-700
                    hover:file:bg-gray-300
                    focus:outline-none focus:border-gray-400 
                    focus:ring-2 focus:ring-gray-300/40
                    hover:border-gray-300
                    transition-all duration-200 
                    shadow-sm hover:shadow-md
                "
            />
        </div>
    );
};

export default FileInput;
