import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'visados:favoritos';

function load(): Set<string> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return new Set();
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? new Set(arr.filter((x) => typeof x === 'string')) : new Set();
  } catch {
    return new Set();
  }
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<Set<string>>(() =>
    typeof window === 'undefined' ? new Set() : load()
  );

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...favorites]));
    } catch {
      /* almacenamiento no disponible: se ignora */
    }
  }, [favorites]);

  const toggle = useCallback((id: string) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const isFavorite = useCallback((id: string) => favorites.has(id), [favorites]);

  return { favorites, toggle, isFavorite, count: favorites.size };
}
