import React, { createContext, useContext, useEffect, useState } from "react";

const FavoriteContext = createContext(null);

export const FavoriteProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    const stored = localStorage.getItem("favorites");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (item) => {
    setFavorites((prev) => {
      const exists = prev.find((f) => f.id === item.id);
      if (exists) {
        return prev.filter((f) => f.id !== item.id);
      }
      return [...prev, item];
    });
  };

  const value = {
    favorites,
    toggleFavorite,
  };

  return <FavoriteContext.Provider value={value}>{children}</FavoriteContext.Provider>;
};

export const useFavorite = () => useContext(FavoriteContext);
