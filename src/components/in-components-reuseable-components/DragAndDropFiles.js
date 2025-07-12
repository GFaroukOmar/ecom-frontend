import React, { useState, useEffect } from 'react';

function DragAndDropFiles({
                              multiple = true,
                              displayMainImage = true,
                              onImagesChange,
                              initialImages = [], // [{url: string, isMainImage: boolean}]
                          }) {
    const [images, setImages] = useState(initialImages);
    const [inputId] = useState(() => `fileInput-${Math.random().toString(36).substr(2, 9)}`);

    // Notify parent component when images change
    useEffect(() => {
        if (typeof onImagesChange === 'function') {
            onImagesChange(images);
        }
    }, [images]);

    // Handle new file input
    const handleFileChange = (e) => {
        const newFiles = Array.from(e.target.files);
        const newImages = newFiles.map((file) => ({
            imageUrl: URL.createObjectURL(file),
            isMainImage: false,
        }));

        e.target.value = null; // Clear file input

        if (multiple) {
            setImages((prevImages) => {
                const updatedImages = [...prevImages, ...newImages];
                if (!updatedImages.some((img) => img.isMainImage) && updatedImages.length > 0) {
                    updatedImages[0].isMainImage = true;
                }
                return updatedImages;
            });
        } else {
            const updatedImages = newImages;
            if (updatedImages.length > 0) {
                updatedImages[0].isMainImage = true;
            }
            setImages(updatedImages);
        }
    };

    // Handle drag and drop files
    const handleDrop = (e) => {
        e.preventDefault();
        const newFiles = Array.from(e.dataTransfer.files);
        const newImages = newFiles.map((file) => ({
            imageUrl: URL.createObjectURL(file),
            isMainImage: false,
        }));

        if (multiple) {
            setImages((prevImages) => {
                const updatedImages = [...prevImages, ...newImages];
                if (!updatedImages.some((img) => img.isMainImage) && updatedImages.length > 0) {
                    updatedImages[0].isMainImage = true;
                }
                return updatedImages;
            });
        } else {
            const updatedImages = newImages;
            if (updatedImages.length > 0) {
                updatedImages[0].isMainImage = true;
            }
            setImages(updatedImages);
        }
    };

    // Remove an image
    const handleRemoveImage = (imageUrl) => {
        setImages((prevImages) => {
            const updatedImages = prevImages.filter((img) => img.imageUrl !== imageUrl);
            if (updatedImages.length > 0 && !updatedImages.some((img) => img.isMainImage)) {
                updatedImages[0].isMainImage = true;
            }
            return updatedImages;
        });
    };

    // Set main image
    const handleSetMainImage = (imageUrl) => {
        setImages((prevImages) =>
            prevImages.map((img) => ({
                ...img,
                isMainImage: img.imageUrl === imageUrl,
            }))
        );
    };

    return (
        <div className="drag-and-drop-files">
            <div
                className="drop-area d-flex flex-column align-items-center"
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
            >
                <p align="center">Drag and drop images here or</p>
                <button onClick={() => document.getElementById(inputId).click()}>
                    Browse Files
                </button>
                <input
                    id={inputId}
                    type="file"
                    multiple={multiple}
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                />
            </div>

            <div className="thumbnails">
                {images.map((image, index) => (
                    <div key={index} className="thumbnail-container">
                        <div className="thumbnail">
                            <img
                                src={image.imageUrl}
                                alt={`thumb-${index}`}
                                onClick={() => handleSetMainImage(image.imageUrl)}
                                className={image.isMainImage ? 'main' : ''}
                            />
                            <span
                                className="remove-btn"
                                onClick={() => handleRemoveImage(image.imageUrl)}
                            >
                                X
                            </span>
                        </div>
                        {displayMainImage && image.isMainImage && <span>Main Image</span>}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default DragAndDropFiles;
