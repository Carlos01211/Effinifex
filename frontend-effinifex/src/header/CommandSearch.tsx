// CommandSearch.jsx
import React, { useState } from 'react';
import { Search } from 'lucide-react'; // Asegúrate de tener este ícono importado

const CommandSearch = ({ className, transactions = [], onSearchResult = () => {} }) => {
  const [input, setInput] = useState('');

  const handleSearch = (event) => {
    const searchQuery = event.target.value;
    setInput(searchQuery);
    const filtered = transactions.filter(transaction =>
      transaction.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    onSearchResult(filtered); // Enviar los resultados filtrados de vuelta al componente padre
  };

  return (
    <div className="flex items-center justify-end border border-gray-300 rounded-full overflow-hidden w-[300px] h-[35px]">
      <input
        className={className}
        type="text"
        placeholder="    Type to search..."
        value={input}
        onChange={handleSearch}
        style={{ height:"25px",width:"250px", border: "none",    outline: "none"
        }}
      />
      <Search color="#4F46E5" size={20} className="mr-3 text-blue-700" /> {/* Ícono de búsqueda */}
    </div>
  );
};

export default CommandSearch;
