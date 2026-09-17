import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  MapPin,
  Phone,
  Clock,
  Navigation,
  Calendar,
  CheckCircle2,
  Building2,
  Share2,
  Star,
  Info,
  ArrowLeft,
  Maximize2,
  X
} from 'lucide-react';
import { api } from '../services/api';
import { GoogleMap } from '../components/common/GoogleMap';
import { getDirectionsUrl } from '../services/googleMapsService';

export const ClinicDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [clinic, setClinic] = useState(null);
  const [activeImage, setActiveImage] = useState(null);
  const [fullscreenImage, setFullscreenImage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.getClinicById(id).then((data) => {
      setClinic(data);
      if (data?.gallery && data.gallery.length > 0) {
        setActiveImage(data.gallery[0]);
      } else if (data?.image) {
        setActiveImage(data.image);
      }
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center text-slate-500">
        Loading clinic details...
      </div>
    );
  }

  if (!clinic) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
        <Building2 className="w-12 h-12 text-slate-300 mx-auto" />
        <h2 className="text-2xl font-bold text-slate-800">Clinic Not Found</h2>
        <p className="text-sm text-slate-500">The healthcare center you requested does not exist or has moved.</p>
        <Link to="/clinics" className="inline-flex px-6 py-3 rounded-2xl bg-brand-800 text-white font-bold text-xs">
          Return to Clinic Locator
        </Link>
      </div>
    );
  }

  const isCareSphere = clinic.isCareSphere;
  const gallery = clinic.gallery || [clinic.image];
  const directionsUrl = getDirectionsUrl(clinic.lat, clinic.lng, clinic.name);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 select-none">
      {/* Back breadcrumb */}
      <button
        onClick={() => navigate('/clinics')}
        className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-brand-800 mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Clinic Locator</span>
      </button>

      {/* External Facility Notification Banner */}
      {!isCareSphere && (
        <div className="mb-6 p-4 rounded-2xl bg-slate-100 border border-slate-200 text-slate-700 text-xs flex items-center gap-3">
          <Info className="w-5 h-5 text-slate-500 shrink-0" />
          <div>
            <strong className="font-bold">External Healthcare Facility: </strong>
            This medical center is not directly operated by CareSphere. Information and ratings are retrieved through the Google Maps Platform for regional healthcare navigation.
          </div>
        </div>
      )}

      {/* Top Clinic Profile Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-soft mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Gallery Container (7 cols) */}
          <div className="lg:col-span-7 space-y-3">
            {/* Main Stage Image */}
            <div className="relative aspect-[16/10] rounded-3xl overflow-hidden shadow-sm border border-slate-100 bg-slate-100 group">
              <img
                src={activeImage || clinic.image}
                alt={clinic.name}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setFullscreenImage(activeImage || clinic.image)}
                className="absolute top-4 right-4 p-2.5 rounded-xl bg-black/50 hover:bg-black/70 text-white backdrop-blur-md transition-colors"
                title="View Fullscreen"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>

            {/* Thumbnail Row */}
            {gallery.length > 1 && (
              <div className="flex gap-2.5 overflow-x-auto pb-1">
                {gallery.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`w-20 h-14 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                      activeImage === img ? 'border-brand-800 shadow-md scale-105' : 'border-slate-200 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details & Actions (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <span
              className={`inline-block text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-md tracking-wider ${
                isCareSphere
                  ? 'bg-brand-100 text-brand-800 border border-brand-200'
                  : 'bg-slate-100 text-slate-700 border border-slate-200'
              }`}
            >
              {clinic.facilityType || (isCareSphere ? 'CareSphere Primary Clinic' : 'Nearby Healthcare Facility')}
            </span>

            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
              {clinic.name}
            </h1>

            <div className="flex items-center gap-2 text-xs">
              <div className="flex items-center text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="font-bold text-slate-800">{clinic.rating || 4.5}</span>
              <span className="text-slate-400">({clinic.reviewCount || 120} reviews)</span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              {clinic.about}
            </p>

            {/* Location & Hours */}
            <div className="space-y-2.5 pt-2 text-xs text-slate-600">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-brand-700 shrink-0 mt-0.5" />
                <span>{clinic.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-brand-700 shrink-0" />
                <span>{clinic.openingHours}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
                <a href={`tel:${clinic.phone}`} className="font-semibold text-slate-900 hover:underline">
                  {clinic.phone}
                </a>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 flex flex-col gap-2.5">
              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 rounded-2xl bg-brand-800 hover:bg-brand-900 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-colors"
              >
                <Navigation className="w-4 h-4" />
                <span>Get Google Maps Directions</span>
              </a>

              {isCareSphere && (
                <Link
                  to="/appointments"
                  className="w-full py-3 rounded-2xl bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-xs"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Appointment at this Clinic</span>
                </Link>
              )}

              <a
                href={`tel:${clinic.phone}`}
                className="w-full py-3 rounded-2xl border border-slate-200 hover:border-slate-300 text-slate-700 font-bold text-xs flex items-center justify-center gap-2 hover:bg-slate-50 transition-colors"
              >
                <Phone className="w-4 h-4 text-slate-500" />
                <span>Call Clinic Desk</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Facilities, Specialties & Mini Map Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left info (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Facilities */}
          {clinic.facilities && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-soft">
              <h3 className="text-lg font-bold text-slate-900 mb-4">
                Available Infrastructure & Facilities
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {clinic.facilities.map((fac, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>{fac}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Specialties */}
          {clinic.specialties && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-soft">
              <h3 className="text-lg font-bold text-slate-900 mb-4">
                Consulting Specialties Available
              </h3>
              <div className="flex flex-wrap gap-2">
                {clinic.specialties.map((sp, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-xl bg-brand-50 border border-brand-100 text-brand-900 text-xs font-semibold"
                  >
                    {sp}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Mini Map (5 cols) */}
        <div className="lg:col-span-5 h-[380px] rounded-3xl overflow-hidden shadow-soft border border-slate-200">
          <GoogleMap
            center={{ lat: clinic.lat, lng: clinic.lng }}
            zoom={15}
            markers={[clinic]}
            selectedPlace={clinic}
            className="w-full h-full"
          />
        </div>
      </div>

      {/* Fullscreen Image Lightbox Modal */}
      {fullscreenImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setFullscreenImage(null)}
        >
          <button
            onClick={() => setFullscreenImage(null)}
            className="absolute top-6 right-6 p-2 rounded-full bg-white/20 hover:bg-white/30 text-white"
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={fullscreenImage}
            alt="Fullscreen preview"
            className="max-w-full max-h-[90vh] rounded-2xl object-contain"
          />
        </div>
      )}
    </div>
  );
};
