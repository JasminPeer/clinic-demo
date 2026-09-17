import React, { useState, useEffect, useRef } from 'react';
import { Search, MapPin, Navigation, Crosshair, AlertCircle, Loader2 } from 'lucide-react';
import { useGeolocation } from '../../hooks/useGeolocation';

// Tamil Nadu key healthcare areas preset for fast autocomplete suggestions
const POPULAR_LOCATIONS = [
  { name: 'Kanchipuram, Tamil Nadu', lat: 12.8342, lng: 79.7036, area: 'Gandhi Road / Bus Stand' },
  { name: 'Chennai, Tamil Nadu', lat: 13.0827, lng: 80.2707, area: 'Central Suburbs' },
  { name: 'Tambaram, Chennai', lat: 12.9249, lng: 80.1000, area: 'GST Road / Mudichur' },
  { name: 'Chengalpattu, Tamil Nadu', lat: 12.6922, lng: 79.9768, area: 'New Bus Stand / Collectorate' },
  { name: 'Vellore, Tamil Nadu', lat: 12.9165, lng: 79.1325, area: 'Katpadi / Fort City' }
];

export const LocationSearch = ({
  onSelectLocation = () => {},
  currentLocationName = 'Kanchipuram, Tamil Nadu',
  placeholder = 'Search city, area or clinic...'
}) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);

  const { location, loading: geoLoading, error: geoError, getLocation, clearError } = useGeolocation();

  // Handle Google Places Autocomplete if API is live
  useEffect(() => {
    if (typeof window !== 'undefined' && window.google && window.google.maps && window.google.maps.places && inputRef.current) {
      try {
        const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current, {
          componentRestrictions: { country: 'in' },
          fields: ['geometry', 'name', 'formatted_address']
        });

        autocomplete.addListener('place_changed', () => {
          const place = autocomplete.getPlace();
          if (place.geometry && place.geometry.location) {
            const newLoc = {
              name: place.formatted_address || place.name,
              lat: place.geometry.location.lat(),
              lng: place.geometry.location.lng()
            };
            setQuery(newLoc.name);
            setIsOpen(false);
            onSelectLocation(newLoc);
          }
        });
      } catch (e) {
        // Fallback to internal matching
      }
    }
  }, []);

  // When browser geolocation returns position
  useEffect(() => {
    if (location) {
      onSelectLocation({
        name: 'My Current Location',
        lat: location.lat,
        lng: location.lng,
        isUserLocation: true
      });
      setQuery('Current Geolocation');
    }
  }, [location]);

  // Fuzzy filter popular locations on input
  const handleInputChange = (e) => {
    const val = e.target.value;
    setQuery(val);
    clearError();

    if (val.trim().length > 0) {
      const filtered = POPULAR_LOCATIONS.filter(item =>
        item.name.toLowerCase().includes(val.toLowerCase()) ||
        item.area.toLowerCase().includes(val.toLowerCase())
      );
      setSuggestions(filtered);
      setIsOpen(true);
    } else {
      setSuggestions([]);
      setIsOpen(false);
    }
  };

  // Close dropdown when clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectSuggestion = (loc) => {
    setQuery(loc.name);
    setIsOpen(false);
    onSelectLocation(loc);
  };

  return (
    <div className="w-full relative" ref={dropdownRef}>
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
        {/* Search Input Box */}
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Search className="w-4 h-4" />
          </div>

          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={handleInputChange}
            onFocus={() => {
              if (query.trim().length > 0) setIsOpen(true);
            }}
            placeholder={placeholder}
            className="w-full pl-10 pr-4 py-3 bg-white rounded-2xl border border-slate-200 text-slate-800 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-600 focus:border-brand-600 shadow-xs transition-all"
          />
        </div>

        {/* Use My Location Button */}
        <button
          type="button"
          onClick={getLocation}
          disabled={geoLoading}
          className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-brand-50 hover:bg-brand-100 border border-brand-200 text-brand-800 font-semibold text-xs transition-all shrink-0 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60"
        >
          {geoLoading ? (
            <Loader2 className="w-4 h-4 animate-spin text-brand-700" />
          ) : (
            <Crosshair className="w-4 h-4 text-brand-700" />
          )}
          <span>Use My Location</span>
        </button>
      </div>

      {/* Geolocation permission denied or unavailable notice */}
      {geoError && (
        <div className="mt-2 p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center gap-2 animate-in fade-in duration-200">
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
          <span>{geoError}</span>
        </div>
      )}

      {/* Autocomplete Suggestions Dropdown */}
      {isOpen && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 sm:right-auto sm:w-96 mt-2 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
          <div className="px-3 py-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Suggested Locations
          </div>
          {suggestions.map((loc, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSelectSuggestion(loc)}
              className="w-full px-3 py-2 text-left hover:bg-slate-50 flex items-start gap-2.5 transition-colors group"
            >
              <MapPin className="w-4 h-4 text-brand-700 group-hover:text-brand-800 shrink-0 mt-0.5" />
              <div>
                <div className="text-sm font-semibold text-slate-800 group-hover:text-brand-900">
                  {loc.name}
                </div>
                <div className="text-xs text-slate-400">
                  {loc.area}
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
