// ImageSelector.js

import React, { useState } from 'react';
import Select from 'react-select';

const ImageSelector = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  // Sample image data (replace this with your actual data)
  const imageOptions = [
    {
      value: 'image1',
      label: 'Image 1',
      imageUrl: 'https://example.com/image1.jpg',
    },
    {
      value: 'image2',
      label: 'Image 2',
      imageUrl: 'https://example.com/image2.jpg',
    },
    // Add more images as needed
  ];

  const handleImageChange = (selectedOption) => {
    setSelectedImage(selectedOption);
  };

  return (
    <div>
      <Select
        value={selectedImage}
        options={imageOptions}
        onChange={handleImageChange}
        getOptionLabel={(option) => (
          <div>
            <img
              src={option.imageUrl}
              alt={option.label}
              style={{ width: '50px', marginRight: '10px' }}
            />
            {option.label}
          </div>
        )}
        getOptionValue={(option) => option.value}
      />

      {selectedImage && (
        <div>
          <h2>Selected Image:</h2>
          <img
            src={selectedImage.imageUrl}
            alt={selectedImage.label}
            style={{ width: '200px' }}
          />
        </div>
      )}
    </div>
  );
};

export default ImageSelector;
