import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Clock, ArrowRight, Sparkles } from 'lucide-react';
import { api } from '../services/api';

export const HealthTipsPage = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    api.getHealthTips().then(data => setArticles(data || []));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 select-none">
      <div className="mb-8">
        <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-brand-800 bg-brand-50 px-2.5 py-1 rounded-md mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Preventive Wellness Articles</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Health Tips & Articles
        </h1>
        <p className="text-sm text-slate-500 mt-1 max-w-2xl">
          Actionable lifestyle advice on nutrition, circadian sleep, cardiovascular longevity, and daily movement.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <div
            key={article.slug}
            className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-soft hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between group"
          >
            <div>
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider">
                  {article.category}
                </div>
              </div>

              <div className="p-6 space-y-2.5">
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{article.readingTime}</span>
                </div>

                <h2 className="text-base font-bold text-slate-900 group-hover:text-brand-800 transition-colors line-clamp-2">
                  <Link to={`/health-tips/${article.slug}`}>{article.title}</Link>
                </h2>

                <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                  {article.summary}
                </p>
              </div>
            </div>

            <div className="p-6 pt-0">
              <Link
                to={`/health-tips/${article.slug}`}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-800 group-hover:text-brand-900 group-hover:underline"
              >
                <span>Read Full Article</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
