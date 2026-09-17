import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, User, Share2, BookOpen } from 'lucide-react';
import { api } from '../services/api';

export const HealthTipDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.getHealthTipBySlug(slug).then((data) => {
      setArticle(data);
      setLoading(false);
    });
  }, [slug]);

  if (loading) return <div className="max-w-4xl mx-auto py-20 text-center text-slate-500">Loading article...</div>;
  if (!article) {
    return (
      <div className="max-w-md mx-auto py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold">Article Not Found</h2>
        <Link to="/health-tips" className="px-5 py-2.5 rounded-xl bg-brand-800 text-white font-bold text-xs inline-block">
          Return to Health Articles
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 select-none">
      <button
        onClick={() => navigate('/health-tips')}
        className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-brand-800 mb-6"
      >
        <ArrowLeft className="w-4 h-4" /> Back to All Articles
      </button>

      <div className="space-y-4 mb-6">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-md bg-brand-100 text-brand-800">
            {article.category}
          </span>
          <div className="flex items-center gap-1 text-xs text-slate-400">
            <Clock className="w-3.5 h-3.5" />
            <span>{article.readingTime}</span>
          </div>
        </div>

        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 leading-tight">
          {article.title}
        </h1>

        <p className="text-sm text-slate-600 leading-relaxed font-medium">
          {article.summary}
        </p>

        <div className="flex items-center gap-2 text-xs text-slate-400 pt-1">
          <User className="w-3.5 h-3.5 text-brand-700" />
          <span>Authored by: <strong className="text-slate-700">{article.author}</strong></span>
        </div>
      </div>

      <div className="rounded-3xl overflow-hidden aspect-[16/9] shadow-sm mb-8 bg-slate-100">
        <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
      </div>

      <div className="space-y-6 text-slate-800 text-sm leading-relaxed">
        {article.content?.map((sec, idx) => (
          <div key={idx} className="space-y-2">
            <h2 className="text-xl font-bold text-slate-900">{sec.heading}</h2>
            <p className="text-slate-600 leading-relaxed">{sec.text}</p>
          </div>
        ))}
      </div>

      {article.relatedTopics && (
        <div className="mt-10 pt-6 border-t border-slate-200">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Related Topics:</div>
          <div className="flex flex-wrap gap-2">
            {article.relatedTopics.map((top, idx) => (
              <span key={idx} className="px-3 py-1 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold">
                {top}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
