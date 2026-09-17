import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Navigation, Star, Filter, Phone, CheckCircle2, Building2, Calendar, Info, Clock } from 'lucide-react';
import { GoogleMap } from '../components/common/GoogleMap';
import { LocationSearch } from '../components/common/LocationSearch';
import { PlacePhoto } from '../components/common/PlacePhoto';
import { api } from '../services/api';
import { searchNearbyClinics, getDirectionsUrl, DEFAULT_CENTER, calculateDistance } from '../services/googleMapsService';

export const ClinicsPage = () => {
  const [center, setCenter] = useState(DEFAULT_CENTER);
  const [locationName, setLocationName] = useState('Kanchipuram, Tamil Nadu');
  const [userLocation, setUserLocation] = useState(null);
  const [clinics, setClinics] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [loading, setLoading] = useState(true);

  // Filter States
  const [filterSpecialty, setFilterSpecialty] = useState('All');
  const [filterOpenNow, setFilterOpenNow] = useState(false);
  const [filterDiagnostics, setFilterDiagnostics] = useState(false);
  const [filterAppointment, setFilterAppointment] = useState(false);
  const [maxDistance, setMaxDistance] = useState(25); // km

  // Fetch Clinics & Nearby Facilities
  useEffect(() => {
    const loadClinics = async () => {
      setLoading(true);
      const careSphereClinics = await api.getClinics();
      const nearbyFacilities = await searchNearbyClinics(null, center, 10000);

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

    loadClinics();
  }, [center]);

  const handleLocationChange = (loc) => {
    setCenter({ lat: loc.lat, lng: loc.lng });
    setLocationName(loc.name);
    if (loc.isUserLocation) {
      setUserLocation({ lat: loc.lat, lng: loc.lng });
    }
  };

  // Filter logic
  const filteredClinics = clinics.filter((c) => {
    if (filterOpenNow && !c.openNow) return false;
    if (filterDiagnostics && !c.hasDiagnostics) return false;
    if (filterAppointment && !c.appointmentAvailable) return false;
    if (c.distanceKm && c.distanceKm > maxDistance) return false;
    if (filterSpecialty !== 'All') {
      if (!c.specialties || !c.specialties.some(s => s.toLowerCase().includes(filterSpecialty.toLowerCase()))) {
        return false;
      }
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 select-none">
      {/* Header */}
      <div className="mb-6">
        <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-brand-800 bg-brand-50 px-2.5 py-1 rounded-md mb-2">
          <MapPin className="w-3.5 h-3.5" />
          <span>Regional Healthcare Locator</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Find a Clinic Near You
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Explore CareSphere outpatient centers and verified nearby medical facilities in Kanchipuram and adjoining regions.
        </p>
      </div>

      {/* Top Search Bar & Geolocation */}
      <div className="mb-6">
        <LocationSearch
          onSelectLocation={handleLocationChange}
          currentLocationName={locationName}
          placeholder="Search city, area or clinic (Kanchipuram, Chennai, Tambaram, Chengalpattu)..."
        />
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs mb-8 flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex flex-wrap items-center gap-3">
          {/* Specialty Filter */}
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-slate-600">Specialty:</span>
            <select
              value={filterSpecialty}
              onChange={(e) => setFilterSpecialty(e.target.value)}
              className="px-2.5 py-1.5 rounded-xl border border-slate-200 bg-white text-slate-800 font-medium focus:outline-none focus:ring-1 focus:ring-brand-700"
            >
              <option value="All">All Specialties</option>
              <option value="General Medicine">General Medicine</option>
              <option value="Cardiology">Cardiology</option>
              <option value="Paediatrics">Paediatrics</option>
              <option value="Orthopaedics">Orthopaedics</option>
              <option value="Gynaecology">Gynaecology</option>
              <option value="Dermatology">Dermatology</option>
            </select>
          </div>

          {/* Quick Toggle Checkboxes */}
          <label className="inline-flex items-center gap-1.5 cursor-pointer font-semibold text-slate-700">
            <input
              type="checkbox"
              checked={filterOpenNow}
              onChange={(e) => setFilterOpenNow(e.target.checked)}
              className="rounded text-brand-800 focus:ring-brand-700"
            />
            <span>Open Now</span>
          </label>

          <label className="inline-flex items-center gap-1.5 cursor-pointer font-semibold text-slate-700">
            <input
              type="checkbox"
              checked={filterDiagnostics}
              onChange={(e) => setFilterDiagnostics(e.target.checked)}
              className="rounded text-brand-800 focus:ring-brand-700"
            />
            <span>Diagnostics</span>
          </label>

          <label className="inline-flex items-center gap-1.5 cursor-pointer font-semibold text-slate-700">
            <input
              type="checkbox"
              checked={filterAppointment}
              onChange={(e) => setFilterAppointment(e.target.checked)}
              className="rounded text-brand-800 focus:ring-brand-700"
            />
            <span>Online Booking</span>
          </label>
        </div>

        {/* Max Distance Slider */}
        <div className="flex items-center gap-2">
          <span className="font-bold text-slate-600">Max Distance:</span>
          <input
            type="range"
            min="2"
            max="40"
            value={maxDistance}
            onChange={(e) => setMaxDistance(Number(e.target.value))}
            className="w-24 accent-brand-800"
          />
          <span className="font-bold text-brand-800 w-12">{maxDistance} km</span>
        </div>
      </div>

      {/* Main Split Layout: 40% Clinic List / 60% Large Google Map (Desktop), Map then List on Mobile */}
      <div className="flex flex-col-reverse lg:flex-row gap-8 items-start">
        {/* LEFT: 40% Clinic List */}
        <div className="w-full lg:w-5/12 space-y-4 max-h-[750px] overflow-y-auto pr-1">
          <div className="flex items-center justify-between text-xs text-slate-400 font-bold uppercase tracking-wider mb-2">
            <span>Results ({filteredClinics.length})</span>
            <span>Click to locate on map</span>
          </div>

          {filteredClinics.length === 0 ? (
            <div className="p-8 text-center bg-white rounded-3xl border border-slate-200 text-slate-500">
              <MapPin className="w-8 h-8 mx-auto text-slate-300 mb-2" />
              <h4 className="font-bold text-slate-800">No clinics match current filters</h4>
              <p className="text-xs text-slate-400 mt-1">Try broadening your distance slider or resetting specialty filter.</p>
              <button
                onClick={() => {
                  setFilterSpecialty('All');
                  setFilterOpenNow(false);
                  setFilterDiagnostics(false);
                  setFilterAppointment(false);
                  setMaxDistance(30);
                }}
                className="mt-3 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            filteredClinics.map((clinic) => {
              const isSelected = selectedPlace?.id === clinic.id;
              const isCareSphere = clinic.isCareSphere;

              return (
                <div
                  key={clinic.id}
                  onClick={() => setSelectedPlace(clinic)}
                  className={`p-5 rounded-3xl border transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'border-brand-600 bg-brand-50/40 shadow-md ring-1 ring-brand-600/30'
                      : 'border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 shadow-xs'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-24 h-24 rounded-2xl overflow-hidden shrink-0 border border-slate-100">
                      <PlacePhoto
                        photo={clinic.photo}
                        fallbackUrl={clinic.image}
                        alt={clinic.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 mb-1">
                        <span
                          className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded tracking-wide ${
                            isCareSphere
                              ? 'bg-brand-100 text-brand-800 border border-brand-200'
                              : 'bg-slate-100 text-slate-600 border border-slate-200'
                          }`}
                        >
                          {clinic.facilityType || (isCareSphere ? 'CareSphere Clinic' : 'Nearby Healthcare')}
                        </span>
                        {clinic.distanceKm && (
                          <span className="text-[11px] font-bold text-brand-800 ml-auto">
                            {clinic.distanceKm} km away
                          </span>
                        )}
                      </div>

                      <h3 className="text-base font-bold text-slate-900 truncate">
                        {clinic.name}
                      </h3>

                      <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                        {clinic.address}
                      </p>

                      <div className="flex items-center gap-3 mt-2 text-xs">
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

                  {/* Badges & Actions */}
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                    {isCareSphere ? (
                      <Link
                        to={`/clinics/${clinic.id}`}
                        className="text-xs font-bold text-brand-800 hover:text-brand-900 hover:underline"
                        onClick={(e) => e.stopPropagation()}
                      >
                        View Full Details →
                      </Link>
                    ) : (
                      <span className="text-[10px] text-slate-400">
                        External Hospital (Google Maps)
                      </span>
                    )}

                    <div className="flex items-center gap-2">
                      {isCareSphere && (
                        <Link
                          to="/appointments"
                          className="px-3.5 py-1.5 rounded-xl bg-brand-800 hover:bg-brand-900 text-white font-bold text-xs transition-colors"
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
            })
          )}
        </div>

        {/* RIGHT: 60% Large Google Map */}
        <div className="w-full lg:w-7/12 h-[500px] lg:h-[750px] sticky top-28 rounded-3xl overflow-hidden shadow-soft border border-slate-200">
          <GoogleMap
            center={center}
            zoom={14}
            markers={filteredClinics}
            selectedPlace={selectedPlace}
            onSelectPlace={(place) => setSelectedPlace(place)}
            userLocation={userLocation}
            className="w-full h-full"
          />
        </div>
      </div>
    </div>
  );
};
