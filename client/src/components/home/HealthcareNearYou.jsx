import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Navigation, Star, Phone, ArrowRight, Building2, CheckCircle2, Info } from 'lucide-react';
import { GoogleMap } from '../common/GoogleMap';
import { LocationSearch } from '../common/LocationSearch';
import { PlacePhoto } from '../common/PlacePhoto';
import { searchNearbyClinics, getDirectionsUrl, DEFAULT_CENTER, calculateDistance } from '../../services/googleMapsService';
import { api } from '../../services/api';

export const HealthcareNearYou = () => {
  const [center, setCenter] = useState(DEFAULT_CENTER);
  const [locationName, setLocationName] = useState('Kanchipuram, Tamil Nadu');
  const [userLocation, setUserLocation] = useState(null);
  const [clinics, setClinics] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load initial clinics and nearby facilities
  useEffect(() => {
    const fetchClinics = async () => {
      setLoading(true);
      // Fetch CareSphere clinics
      const careSphereClinics = await api.getClinics();

      // Fetch nearby places around center via Google Maps Places / fallback
      const nearbyFacilities = await searchNearbyClinics(null, center, 8000);

      // Combine with CareSphere flagship at the top
      const combined = [
        ...careSphereClinics.filter(c => c.isCareSphere),
        ...nearbyFacilities.filter(n => !careSphereClinics.some(c => c.id === n.id))
      ].map(place => ({
        ...place,
        distanceKm: calculateDistance(center.lat, center.lng, place.lat, place.lng)
      }));

      // Sort by distance
      combined.sort((a, b) => (a.distanceKm || 0) - (b.distanceKm || 0));

      setClinics(combined);
      setSelectedPlace(combined[0] || null);
      setLoading(false);
    };

    fetchClinics();
  }, [center]);

  // Handle location change from search or "Use My Location"
  const handleLocationChange = (loc) => {
    setCenter({ lat: loc.lat, lng: loc.lng });
    setLocationName(loc.name);
    if (loc.isUserLocation) {
      setUserLocation({ lat: loc.lat, lng: loc.lng });
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-12 select-none">
      {/* Container Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-soft">
        {/* Header with Title & Location badge */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-brand-800 bg-brand-50 px-2.5 py-1 rounded-md mb-2">
              <MapPin className="w-3.5 h-3.5" />
              <span>Location-Aware Healthcare</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Healthcare Near You
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Currently centered on: <strong className="text-slate-800">{locationName}</strong>
            </p>
          </div>

          <Link
            to="/clinics"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-800 hover:text-brand-900 hover:underline"
          >
            <span>Open Full Clinic Locator</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Location Search Bar & Geolocation Trigger */}
        <div className="my-6">
          <LocationSearch
            onSelectLocation={handleLocationChange}
            currentLocationName={locationName}
            placeholder="Search city, area or clinic in Kanchipuram, Chennai, Tambaram..."
          />
        </div>

        {/* Main Split Layout: Left Clinic Cards, Right Google Map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT: Clinic Cards List (5 cols) */}
          <div className="lg:col-span-5 space-y-4 max-h-[580px] overflow-y-auto pr-1">
            <div className="flex items-center justify-between text-xs text-slate-400 font-bold uppercase tracking-wider mb-2">
              <span>Healthcare Facilities ({clinics.length})</span>
              <span className="text-[11px] text-slate-400">Click to focus map</span>
            </div>

            {clinics.map((clinic) => {
              const isSelected = selectedPlace?.id === clinic.id;
              const isCareSphere = clinic.isCareSphere;

              return (
                <div
                  key={clinic.id}
                  onClick={() => setSelectedPlace(clinic)}
                  className={`p-4 rounded-2xl border transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'border-brand-600 bg-brand-50/40 shadow-md ring-1 ring-brand-600/30'
                      : 'border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50/70 shadow-xs'
                  }`}
                >
                  <div className="flex items-start gap-3.5">
                    {/* Thumbnail */}
                    <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 border border-slate-100">
                      <PlacePhoto
                        photo={clinic.photo}
                        fallbackUrl={clinic.image}
                        alt={clinic.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Meta info */}
                    <div className="flex-1 min-w-0">
                      {/* Facility Badge */}
                      <div className="flex items-center gap-1.5 mb-1">
                        <span
                          className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded tracking-wide ${
                            isCareSphere
                              ? 'bg-brand-100 text-brand-800 border border-brand-200'
                              : 'bg-slate-100 text-slate-600 border border-slate-200'
                          }`}
                        >
                          {isCareSphere ? 'CareSphere Clinic' : 'Nearby Healthcare Facility'}
                        </span>
                        {clinic.distanceKm && (
                          <span className="text-[11px] font-semibold text-brand-800 ml-auto">
                            {clinic.distanceKm} km away
                          </span>
                        )}
                      </div>

                      <h4 className="text-sm font-bold text-slate-900 truncate">
                        {clinic.name}
                      </h4>

                      <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                        {clinic.address}
                      </p>

                      <div className="flex items-center gap-3 mt-1.5 text-xs">
                        <div className="flex items-center gap-1 text-amber-500 font-bold">
                          <Star className="w-3.5 h-3.5 fill-amber-400" />
                          <span>{clinic.rating || 4.2}</span>
                        </div>

                        {clinic.openNow && (
                          <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            Open Now
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                    {isCareSphere ? (
                      <Link
                        to={`/clinics/${clinic.id}`}
                        className="text-xs font-bold text-brand-800 hover:text-brand-900 hover:underline"
                        onClick={(e) => e.stopPropagation()}
                      >
                        View Clinic Profile →
                      </Link>
                    ) : (
                      <span className="text-[10px] text-slate-400 flex items-center gap-1">
                        <Info className="w-3 h-3 text-slate-400" />
                        External Facility (Google Maps)
                      </span>
                    )}

                    <div className="flex items-center gap-2">
                      {isCareSphere && (
                        <Link
                          to="/appointments"
                          className="px-3 py-1.5 rounded-xl bg-brand-800 hover:bg-brand-900 text-white font-bold text-xs transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          Book Visit
                        </Link>
                      )}

                      <a
                        href={getDirectionsUrl(clinic.lat, clinic.lng, clinic.name)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Navigation className="w-3 h-3 text-brand-700" />
                        <span>Directions</span>
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* RIGHT: Interactive Google Map (7 cols) */}
          <div className="lg:col-span-7 h-[580px] rounded-3xl overflow-hidden shadow-sm border border-slate-200">
            <GoogleMap
              center={center}
              zoom={14}
              markers={clinics}
              selectedPlace={selectedPlace}
              onSelectPlace={(place) => setSelectedPlace(place)}
              userLocation={userLocation}
              className="w-full h-full min-h-[500px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
