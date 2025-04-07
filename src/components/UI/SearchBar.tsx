import React, { useState } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="flex items-center gap-4 w-full">
      <div className="relative flex-1">
        <input
          type="text"
          placeholder="search for products by name or bar code"
          className={`w-full bg-transparent border px-4 py-2 text-white placeholder-[#595959] focus:outline-none transition-all duration-200 rounded-md ${
            isFocused
              ? "border-white/50 bg-white/5"
              : "border-[#595959]/45 hover:border-[#595959]/80"
          }`}
          onChange={(e) => onSearch(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </div>
      <button
        className="px-4 py-2 border border-[#595959]/45 text-[#595959] hover:border-white/50 hover:text-white transition-all duration-200 rounded-md hover:bg-white/5 active:bg-white/10"
        onClick={() => {
          // TODO: Implement barcode scanning functionality
          console.log("Scan barcode");
        }}
      >
        <div className="flex items-center gap-4">
          <svg
            width="28"
            height="26"
            viewBox="0 0 28 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 hover:text-white"
          >
            <path
              d="M26.3498 11.9568H1.10181V13.8211H26.3498V11.9568Z"
              fill="#595959"
            />
            <path
              d="M24.1372 0H22.0523V1.86435H24.1372C24.7497 1.86435 25.248 2.33652 25.248 2.91689V4.89261H27.2154V2.91689C27.2154 1.3085 25.8345 0 24.1372 0ZM1.96744 2.91689C1.96744 2.33652 2.4657 1.86435 3.07816 1.86435H5.16319V0H3.07816C1.38084 0 0 1.3085 0 2.91689V4.89261H1.96744V2.91689ZM25.248 22.8726C25.248 23.453 24.7497 23.9251 24.1372 23.9251H22.0523V25.7895H24.1372C25.8345 25.7895 27.2154 24.481 27.2154 22.8726V20.8968H25.248V22.8726ZM1.96744 22.8726V20.8968H0V22.8726C0 24.481 1.38084 25.7895 3.07816 25.7895H5.16319V23.9251H3.07816C2.4657 23.9251 1.96744 23.453 1.96744 22.8726Z"
              fill="#595959"
            />
          </svg>
          SCAN BAR CODE
        </div>
      </button>
    </div>
  );
}
