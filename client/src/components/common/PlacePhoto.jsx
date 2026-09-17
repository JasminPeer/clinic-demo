import React, { useState } from 'react';
import { Building2 } from 'lucide-react';

export const PlacePhoto = ({ photo, fallbackUrl, alt = 'Clinic facility', className = 'w-full h-48 object-cover' }) => {
  const [hasError, setHasError] = useState(false);

  // Extract Google photo URL and HTML attributions if available
  let photoUrl = fallbackUrl || 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80';
  let attributions = [];

  if (photo) {
    if (typeof photo.getUrl === 'function') {
      try {
        photoUrl = photo.getUrl({ maxWidth: 800, maxHeight: 600 });
      } catch (e) {
        // use fallback
      }
    } else if (typeof photo === 'string') {
      photoUrl = photo;
    }

    if (photo.html_attributions && Array.isArray(photo.html_attributions)) {
      attributions = photo.html_attributions;
    }
  }

  if (hasError) {
    return (
      <div className={`bg-slate-100 flex flex-col items-center justify-center text-slate-400 p-4 ${className}`}>
        <Building2 className="w-10 h-10 mb-1 opacity-50" />
        <span className="text-xs font-medium">Healthcare Facility</span>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden group">
      <img
        src={photoUrl}
        alt={alt}
        className={`${className} transition-transform duration-500 group-hover:scale-105`}
        loading="lazy"
        onError={() => setHasError(true)}
      />

      {/* Google Attribution required by Places API terms when present */}
      {attributions.length > 0 && (
        <div className="absolute bottom-0 inset-x-0 bg-black/60 backdrop-blur-xs text-[10px] text-white/90 px-2 py-0.5 truncate text-right">
          {attributions.map((attrHtml, idx) => (
            <span key={idx} dangerouslySetInnerHTML={{ __html: attrHtml }} className="underline" />
          ))}
        </div>
      )}
    </div>
  );
};
