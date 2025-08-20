"use client";

import { createContext, useContext, useState, useEffect } from "react";

type SearchResult = {
  id: string;
  name: string;
  price: number;
  image?: string;
  category?: string;
};

type SearchContextType = {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchResults: SearchResult[];
  isLoading: boolean;
  error: string | null;
  isSearchOpen: boolean;
  toggleSearch: () => void;
  closeSearch: () => void;
};

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Debounce search
  useEffect(() => {
    const handler = setTimeout(async () => {
      if (searchQuery.trim()) {
        try {
          setIsLoading(true);
          setError(null);
          const response = await fetch(
            `/api/search?q=${encodeURIComponent(searchQuery)}`
          );
          if (!response.ok) throw new Error("Search failed");
          const data = await response.json();
          setSearchResults(data);
        } catch (err) {
          setError(err instanceof Error ? err.message : "Search failed");
          setSearchResults([]);
        } finally {
          setIsLoading(false);
        }
      } else {
        setSearchResults([]);
      }
    }, 300);

    return () => clearTimeout(handler);
  }, [searchQuery]);

  const toggleSearch = () => {
    setIsSearchOpen((prev) => !prev);
    setSearchQuery("");
    setSearchResults([]);
  };

  const closeSearch = () => {
    setIsSearchOpen(false);
    setSearchQuery("");
    setSearchResults([]);
  };

  return (
    <SearchContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        searchResults,
        isLoading,
        error,
        isSearchOpen,
        toggleSearch,
        closeSearch,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
}
