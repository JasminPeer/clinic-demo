import React from 'react';
import { Star } from 'lucide-react';

export const StarRating = ({ rating = 4.5, reviewCount, showCount = true, size = 'sm' }) => {
  const iconSize = size === 'xs' ? 'w-3 h-3' : size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4';
  const textSize = size === 'xs' ? 'text-[11px]' : size === 'sm' ? 'text-xs' : 'text-sm';

  return (
    <div className="inline-flex items-center gap-1.5">
      <div className="flex items-center text-amber-400">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${iconSize} ${
              star <= Math.round(rating)
                ? 'fill-amber-400 text-amber-400'
                : 'fill-slate-200 text-slate-200'
            }`}
          />
        ))}
      </div>
      <span className={`font-bold text-slate-700 ${textSize}`}>{rating.toFixed(1)}</span>
      {showCount && reviewCount && (
        <span className={`text-slate-400 ${textSize}`}>({reviewCount})</span>
      )}
    </div>
  );
};
