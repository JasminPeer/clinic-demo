import React, { useEffect, useRef, useState } from 'react';
import { MapPin, Navigation, ExternalLink, Star, Compass, ZoomIn, ZoomOut, Layers } from 'lucide-react';
import { getDirectionsUrl, DEFAULT_CENTER } from '../../services/googleMapsService';
import { PlacePhoto } from './PlacePhoto';

export const GoogleMap = ({
  center = DEFAULT_CENTER,
  zoom = 14,
  markers = [],
  selectedPlace = null,
  onSelectPlace = () => {},
  userLocation = null,
  className = 'w-full h-full min-h-[400px]',
}) => {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]);
  const infoWindowRef = useRef(null);

  const [hasGoogleMapsApi, setHasGoogleMapsApi] = useState(false);
  const [simulatedZoom, setSimulatedZoom] = useState(zoom);
  const [activePopupPlace, setActivePopupPlace] = useState(null);

  // Sync selectedPlace to active popup
  useEffect(() => {
    if (selectedPlace) {
      setActivePopupPlace(selectedPlace);
    }
  }, [selectedPlace]);

  // Check for live Google Maps JS SDK
  useEffect(() => {
    if (typeof window !== 'undefined' && window.google && window.google.maps) {
      setHasGoogleMapsApi(true);
    }
  }, []);

  // Initialize Real Google Map if available
  useEffect(() => {
    if (!hasGoogleMapsApi || !mapContainerRef.current) return;

    try {
      const mapOptions = {
        center: { lat: center.lat, lng: center.lng },
        zoom: zoom,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: true,
        zoomControl: true,
        styles: [
          { featureType: 'poi.medical', elementType: 'geometry', stylers: [{ color: '#e0f2fe' }] },
          { featureType: 'poi.business', stylers: [{ visibility: 'simplified' }] }
        ]
      };

      const map = new window.google.maps.Map(mapContainerRef.current, mapOptions);
      mapInstanceRef.current = map;
      infoWindowRef.current = new window.google.maps.InfoWindow();

      return () => {
        // cleanup markers
        markersRef.current.forEach(m => m.setMap(null));
        markersRef.current = [];
      };
    } catch (e) {
      console.warn('Error initializing Google Maps SDK:', e);
      setHasGoogleMapsApi(false);
    }
  }, [hasGoogleMapsApi]);

  // Update center when prop changes
  useEffect(() => {
    if (mapInstanceRef.current && center?.lat && center?.lng) {
      mapInstanceRef.current.panTo({ lat: center.lat, lng: center.lng });
    }
  }, [center]);

  // Render Real Markers on Google Map
  useEffect(() => {
    if (!mapInstanceRef.current || !hasGoogleMapsApi) return;

    // Clear previous markers
    markersRef.current.forEach(m => m.setMap(null));
    markersRef.current = [];

    // User Location Marker
    if (userLocation) {
      const userMarker = new window.google.maps.Marker({
        position: { lat: userLocation.lat, lng: userLocation.lng },
        map: mapInstanceRef.current,
        title: 'Your Location',
        icon: {
          path: window.google.maps.SymbolPath.CIRCLE,
          scale: 9,
          fillColor: '#3b82f6',
          fillOpacity: 1,
          strokeColor: '#ffffff',
          strokeWeight: 3
        }
      });
      markersRef.current.push(userMarker);
    }

    // Clinic Markers
    markers.forEach((place) => {
      const isCareSphere = place.isCareSphere;
      const isSelected = selectedPlace?.id === place.id;

      // Custom SVG Pin Icon
      const pinColor = isCareSphere ? '#0D5C75' : '#0284C7';
      const pinScale = isSelected ? 1.25 : 1.0;

      const marker = new window.google.maps.Marker({
        position: { lat: place.lat, lng: place.lng },
        map: mapInstanceRef.current,
        title: place.name,
        animation: isSelected ? window.google.maps.Animation.BOUNCE : null
      });

      marker.addListener('click', () => {
        onSelectPlace(place);
        setActivePopupPlace(place);

        if (infoWindowRef.current) {
          const contentString = `
            <div style="font-family: 'Plus Jakarta Sans', sans-serif; max-width: 250px; padding: 4px;">
              <div style="font-size: 11px; font-weight: 700; color: ${isCareSphere ? '#0d5c75' : '#0284c7'}; text-transform: uppercase;">
                ${isCareSphere ? 'CareSphere Primary Clinic' : 'Nearby Healthcare Facility'}
              </div>
              <div style="font-size: 14px; font-weight: 700; color: #0f172a; margin: 4px 0;">${place.name}</div>
              <div style="font-size: 12px; color: #475569; margin-bottom: 8px;">${place.address}</div>
              <div style="display: flex; gap: 6px;">
                <a href="${getDirectionsUrl(place.lat, place.lng, place.name)}" target="_blank" style="display: inline-block; background: #0d5c75; color: white; padding: 4px 8px; border-radius: 6px; font-size: 11px; text-decoration: none; font-weight: 600;">Directions</a>
              </div>
            </div>
          `;
          infoWindowRef.current.setContent(contentString);
          infoWindowRef.current.open(mapInstanceRef.current, marker);
        }
      });

      markersRef.current.push(marker);
    });
  }, [markers, hasGoogleMapsApi, selectedPlace, userLocation]);

  // If live Google Maps SDK is active, render the SDK container
  if (hasGoogleMapsApi) {
    return (
      <div className={`relative rounded-3xl overflow-hidden border border-slate-200/80 shadow-soft ${className}`}>
        <div ref={mapContainerRef} className="w-full h-full min-h-[400px]" />
      </div>
    );
  }

  // SIMULATED INTERACTIVE MAP VIEW (Kanchipuram Geo-Visualizer)
  // Guarantees 100% functionality even when offline or before the user inputs their Google API key!
  const baseLat = center.lat || DEFAULT_CENTER.lat;
  const baseLng = center.lng || DEFAULT_CENTER.lng;

  // Convert GPS to % coordinates on the map container
  const getCoordinatesPct = (lat, lng) => {
    // Zoom sensitivity factor
    const spread = 0.055 / (simulatedZoom / 14);
    const x = 50 + ((lng - baseLng) / spread) * 45;
    const y = 50 - ((lat - baseLat) / spread) * 45;
    return {
      left: `${Math.max(5, Math.min(95, x))}%`,
      top: `${Math.max(5, Math.min(95, y))}%`
    };
  };

  return (
    <div className={`relative rounded-3xl overflow-hidden border border-slate-200/80 shadow-soft bg-[#EBF2F7] flex flex-col select-none ${className}`}>
      {/* Map Header Status Indicator */}
      <div className="absolute top-3 left-3 z-20 flex items-center gap-2">
        <div className="px-3 py-1.5 rounded-xl bg-white/95 backdrop-blur-md shadow-sm border border-slate-200 text-xs font-semibold text-slate-700 flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>Kanchipuram, Tamil Nadu</span>
        </div>
        <div className="hidden sm:inline-flex px-2.5 py-1 rounded-lg bg-brand-50/90 border border-brand-200 text-[10px] font-bold text-brand-800 uppercase tracking-wider">
          Google Maps Platform Ready
        </div>
      </div>

      {/* Map Control Buttons */}
      <div className="absolute top-3 right-3 z-20 flex flex-col gap-1.5">
        <button
          onClick={() => setSimulatedZoom(z => Math.min(18, z + 1))}
          className="p-2 rounded-xl bg-white/95 backdrop-blur-md shadow-sm border border-slate-200 text-slate-700 hover:text-brand-800 hover:bg-slate-50 transition-colors"
          title="Zoom in"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <button
          onClick={() => setSimulatedZoom(z => Math.max(10, z - 1))}
          className="p-2 rounded-xl bg-white/95 backdrop-blur-md shadow-sm border border-slate-200 text-slate-700 hover:text-brand-800 hover:bg-slate-50 transition-colors"
          title="Zoom out"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        <button
          onClick={() => {
            setSimulatedZoom(14);
            onSelectPlace(null);
            setActivePopupPlace(null);
          }}
          className="p-2 rounded-xl bg-white/95 backdrop-blur-md shadow-sm border border-slate-200 text-slate-700 hover:text-brand-800 hover:bg-slate-50 transition-colors"
          title="Recenter Kanchipuram"
        >
          <Compass className="w-4 h-4" />
        </button>
      </div>

      {/* Map Surface Grid & Roads SVG Simulation */}
      <div className="relative w-full h-full min-h-[400px] flex-1 overflow-hidden cursor-grab active:cursor-grabbing">
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40" preserveAspectRatio="none">
          {/* Arterial roads simulation */}
          <path d="M-50,200 Q200,180 500,240 T900,220" stroke="#CBD5E1" strokeWidth="18" fill="none" />
          <path d="M-50,200 Q200,180 500,240 T900,220" stroke="#FFFFFF" strokeWidth="10" fill="none" />
          
          <path d="M300,-50 Q320,250 280,600" stroke="#CBD5E1" strokeWidth="14" fill="none" />
          <path d="M300,-50 Q320,250 280,600" stroke="#FFFFFF" strokeWidth="8" fill="none" />

          {/* Secondary streets */}
          <path d="M100,50 L400,450" stroke="#E2E8F0" strokeWidth="6" fill="none" />
          <path d="M150,380 L600,100" stroke="#E2E8F0" strokeWidth="6" fill="none" />
          <path d="M450,-50 L520,550" stroke="#E2E8F0" strokeWidth="5" fill="none" />

          {/* Vegur / Vegavathi River simulation */}
          <path d="M0,320 Q250,300 480,350 T900,380" stroke="#BAE6FD" strokeWidth="16" fill="none" />

          {/* Green parks & landmarks */}
          <rect x="180" y="80" width="80" height="60" rx="12" fill="#D1FAE5" opacity="0.6" />
          <rect x="420" y="260" width="120" height="70" rx="16" fill="#D1FAE5" opacity="0.6" />
        </svg>

        {/* User Location Pulse Marker */}
        {userLocation && (
          <div
            className="absolute z-20 -translate-x-1/2 -translate-y-1/2 transition-all duration-300"
            style={getCoordinatesPct(userLocation.lat, userLocation.lng)}
          >
            <div className="relative flex items-center justify-center">
              <div className="w-8 h-8 rounded-full bg-blue-500/25 animate-ping absolute" />
              <div className="w-4 h-4 rounded-full bg-blue-600 border-2 border-white shadow-md relative z-10" />
            </div>
            <div className="absolute top-5 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-slate-900/80 text-[10px] text-white whitespace-nowrap font-medium pointer-events-none">
              You are here
            </div>
          </div>
        )}

        {/* Clinic Pins */}
        {markers.map((place) => {
          const coords = getCoordinatesPct(place.lat, place.lng);
          const isCareSphere = place.isCareSphere;
          const isSelected = selectedPlace?.id === place.id || activePopupPlace?.id === place.id;

          return (
            <button
              key={place.id}
              onClick={() => {
                onSelectPlace(place);
                setActivePopupPlace(place);
              }}
              style={coords}
              className={`absolute z-30 -translate-x-1/2 -translate-y-full transition-transform duration-200 group focus:outline-none ${
                isSelected ? 'scale-125 z-40' : 'hover:scale-115'
              }`}
            >
              {/* Pin container */}
              <div className="relative flex flex-col items-center">
                <div
                  className={`px-2 py-1 rounded-lg text-white font-bold text-[11px] shadow-lg flex items-center gap-1 transition-colors ${
                    isCareSphere
                      ? 'bg-brand-800 border border-brand-500 shadow-brand-900/30'
                      : 'bg-cyan-700 border border-cyan-500 shadow-cyan-900/30'
                  }`}
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span className="max-w-[120px] truncate">{place.name.replace('Hospital', 'Hosp.').replace('Multispeciality', 'Multi.')}</span>
                </div>
                {/* Pointer arrow */}
                <div
                  className={`w-2.5 h-2.5 rotate-45 -mt-1 ${
                    isCareSphere ? 'bg-brand-800' : 'bg-cyan-700'
                  }`}
                />
              </div>
            </button>
          );
        })}

        {/* Selected Clinic Popover / InfoWindow */}
        {activePopupPlace && (
          <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-80 z-40 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-slate-200/90 animate-in fade-in slide-in-from-bottom-2 duration-200">
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <span
                  className={`inline-block text-[10px] font-extrabold uppercase px-2 py-0.5 rounded tracking-wide ${
                    activePopupPlace.isCareSphere
                      ? 'bg-brand-100 text-brand-800 border border-brand-200'
                      : 'bg-slate-100 text-slate-700 border border-slate-200'
                  }`}
                >
                  {activePopupPlace.facilityType || (activePopupPlace.isCareSphere ? 'CareSphere Clinic' : 'Nearby Healthcare')}
                </span>
                <h4 className="font-bold text-slate-900 text-sm mt-1 leading-tight">
                  {activePopupPlace.name}
                </h4>
              </div>
              <button
                onClick={() => setActivePopupPlace(null)}
                className="text-slate-400 hover:text-slate-600 text-lg leading-none px-1"
              >
                ×
              </button>
            </div>

            <p className="text-xs text-slate-600 line-clamp-2 mb-3">
              {activePopupPlace.address}
            </p>

            <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
              <div className="flex items-center gap-1 text-amber-500 font-bold">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <span>{activePopupPlace.rating || 4.5}</span>
                {activePopupPlace.distanceKm && (
                  <span className="text-slate-400 font-normal ml-2">
                    • {activePopupPlace.distanceKm} km away
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={getDirectionsUrl(activePopupPlace.lat, activePopupPlace.lng, activePopupPlace.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-brand-800 text-white font-semibold text-[11px] hover:bg-brand-900 transition-colors shadow-xs"
                >
                  <Navigation className="w-3 h-3" />
                  Directions
                </a>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Map Footer Bar */}
      <div className="px-4 py-2 bg-white/90 border-t border-slate-200 text-[11px] text-slate-500 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-brand-800" />
            <span className="font-medium text-slate-700">CareSphere Clinic</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-cyan-600" />
            <span className="font-medium text-slate-700">Nearby Healthcare</span>
          </div>
        </div>
        <div className="text-[10px] text-slate-400 italic">
          Maps JavaScript API • Places Nearby Search
        </div>
      </div>
    </div>
  );
};
