import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const handleSearch = (e) => {
    e?.preventDefault();
    if (searchQuery?.trim()) {
      console.log('Searching for:', searchQuery);
      // In real app, this would trigger search functionality
    }
  };

  const quickSearchSuggestions = [
    { type: 'patient', label: 'Find Patient', icon: 'User' },
    { type: 'doctor', label: 'Find Doctor', icon: 'UserCheck' },
    { type: 'appointment', label: 'Find Appointment', icon: 'Calendar' },
    { type: 'room', label: 'Find Room', icon: 'MapPin' }
  ];

  return (
    <div className="relative">
      <form onSubmit={handleSearch} className="relative">
        <div className="relative">
          <Icon 
            name="Search" 
            size={20} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
          />
          <input
            type="text"
            placeholder="Search patients, doctors, appointments..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e?.target?.value)}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
            className="w-full pl-10 pr-4 py-3 bg-muted border border-border rounded-lg text-sm placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
          />
        </div>
      </form>
      {/* Search Suggestions Dropdown */}
      {isSearchFocused && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-popover border border-border rounded-lg shadow-medical-lg z-50 animate-slide-down">
          <div className="p-2">
            <div className="text-xs font-medium text-muted-foreground px-3 py-2">Quick Search</div>
            {quickSearchSuggestions?.map((suggestion, index) => (
              <button
                key={index}
                className="flex items-center space-x-3 w-full px-3 py-2 text-sm text-foreground hover:bg-muted rounded-md transition-colors duration-200"
                onClick={() => {
                  setSearchQuery(suggestion?.label?.toLowerCase());
                  setIsSearchFocused(false);
                }}
              >
                <Icon name={suggestion?.icon} size={16} className="text-muted-foreground" />
                <span>{suggestion?.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;