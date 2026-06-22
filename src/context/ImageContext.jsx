import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { getImageUrl } from '../utils/imageHelper';

const ImageContext = createContext();

export const usePageImages = () => useContext(ImageContext);

export const ImageProvider = ({ children }) => {
  const [imagesMap, setImagesMap] = useState({});
  const [loading, setLoading] = useState(true);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  const fetchPageImages = async () => {
    try {
      const res = await axios.get(`${API_URL}/page-images`);
      if (res.data.success) {
        const map = {};
        res.data.data.forEach((img) => {
          map[img.key] = img.imageUrl;
        });
        setImagesMap(map);
      }
    } catch (err) {
      console.warn('Failed to load dynamic page images, using local fallbacks.', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPageImages();
  }, []);

  const getDynamicImage = (key, defaultPath) => {
    if (imagesMap[key]) {
      // Resolve using getImageUrl helper (which resolves uploads URLs correctly)
      return getImageUrl(imagesMap[key]);
    }
    return getImageUrl(defaultPath);
  };

  return (
    <ImageContext.Provider value={{ getDynamicImage, refreshPageImages: fetchPageImages, imagesMap, loading }}>
      {children}
    </ImageContext.Provider>
  );
};
