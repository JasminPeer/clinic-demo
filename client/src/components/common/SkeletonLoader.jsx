import React from 'react';

export const SkeletonLoader = ({ type = 'card', count = 3 }) => {
  const items = Array.from({ length: count });

  if (type === 'map') {
    return (
      <div className="w-full h-96 bg-slate-200 animate-pulse rounded-2xl relative overflow-hidden flex items-center justify-center">
        <div className="text-slate-400 font-medium text-sm flex items-center gap-2">
          <div className="w-4 h-4 rounded-full border-2 border-slate-300 border-t-brand-600 animate-spin" />
          Loading Google Map...
        </div>
      </div>
    );
  }

  if (type === 'doctor') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((_, i) => (
          <div key={i} className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm animate-pulse">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-20 h-20 bg-slate-200 rounded-2xl shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-slate-200 rounded-md w-3/4" />
                <div className="h-3 bg-slate-200 rounded-md w-1/2" />
                <div className="h-3 bg-slate-200 rounded-md w-1/3" />
              </div>
            </div>
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <div className="h-3 bg-slate-200 rounded-md w-full" />
              <div className="h-3 bg-slate-200 rounded-md w-5/6" />
            </div>
            <div className="mt-4 flex gap-2">
              <div className="h-9 bg-slate-200 rounded-xl flex-1" />
              <div className="h-9 bg-slate-200 rounded-xl flex-1" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (type === 'clinic') {
    return (
      <div className="space-y-4">
        {items.map((_, i) => (
          <div key={i} className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm animate-pulse flex flex-col sm:flex-row gap-4">
            <div className="w-full sm:w-36 h-28 bg-slate-200 rounded-xl shrink-0" />
            <div className="flex-1 space-y-2.5">
              <div className="h-4 bg-slate-200 rounded-md w-2/3" />
              <div className="h-3 bg-slate-200 rounded-md w-1/2" />
              <div className="h-3 bg-slate-200 rounded-md w-3/4" />
              <div className="h-8 bg-slate-200 rounded-xl w-1/3 mt-2" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (type === 'disease' || type === 'article') {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((_, i) => (
          <div key={i} className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm animate-pulse space-y-3">
            <div className="h-32 bg-slate-200 rounded-xl w-full" />
            <div className="h-4 bg-slate-200 rounded-md w-3/4" />
            <div className="h-3 bg-slate-200 rounded-md w-full" />
            <div className="h-3 bg-slate-200 rounded-md w-2/3" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {items.map((_, i) => (
        <div key={i} className="bg-white p-5 rounded-2xl border border-slate-100 animate-pulse space-y-2">
          <div className="h-4 bg-slate-200 rounded w-1/2" />
          <div className="h-3 bg-slate-200 rounded w-full" />
          <div className="h-3 bg-slate-200 rounded w-3/4" />
        </div>
      ))}
    </div>
  );
};
