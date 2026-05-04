import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { blogArticles, featuredArticle } from '../data/articles';
import { sanityClient } from '../sanityClient';
import { PortableText } from '@portabletext/react';

export const ArticleDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [sanityArticle, setSanityArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  // Strip 'article-' prefix if it exists in the URL param
  const articleId = id?.replace('article-', '') || '';

  useEffect(() => {
    sanityClient.fetch('*[_type == "post" && slug.current == $articleId][0]{..., "imageUrl": featuredImage.asset->url}', { articleId })
      .then(data => {
        setSanityArticle(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [articleId]);

  let localArticle = null;
  if (articleId === featuredArticle.id) {
    localArticle = featuredArticle;
  } else {
    localArticle = blogArticles.find(a => a.id === articleId);
  }

  const article = sanityArticle ? {
    title: sanityArticle.title,
    category: sanityArticle.category || 'Tin tức',
    img: sanityArticle.imageUrl,
    tagClass: 'bg-primary/10 text-primary',
    readTime: sanityArticle.readTime,
    content: sanityArticle.content,
    author: sanityArticle.author,
    publishedAt: sanityArticle.publishedAt,
    isSanity: true
  } : localArticle;

  useEffect(() => {
    // Redirect back to blog if article is not found after loading finishes
    if (!loading && !article && id) {
      navigate('/blog', { replace: true });
    }
  }, [article, loading, id, navigate]);

  if (loading && !localArticle) return <div className="py-20 text-center">Đang tải...</div>;
  if (!article) return null;

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('vi-VN', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <main className="bg-surface py-20">
      <article className="max-w-[800px] mx-auto px-6">
        <Link to="/blog" className="inline-flex items-center text-primary hover:underline mb-8 font-sans font-semibold">
          <ArrowLeft className="w-4 h-4 mr-2" /> Quay lại
        </Link>
        
        <div className="mb-8">
          <span className={`inline-block px-3 py-1 text-xs font-bold rounded mb-4 tracking-wider uppercase ${article.tagClass || 'bg-primary/10 text-primary'}`}>
            {article.category}
          </span>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-on-surface mb-6 leading-tight">
            {article.title}
          </h1>
          <div className="flex items-center gap-4 text-on-surface-variant font-sans text-sm">
            {article.author ? <span className="font-semibold">{article.author}</span> : <span className="font-semibold">Bác sĩ Vian Nguyễn</span>}
            <span>•</span>
            {article.publishedAt ? <span>{formatDate(article.publishedAt)}</span> : <span>{article.readTime}</span>}
            {article.publishedAt && article.readTime && (
               <>
                 <span>•</span>
                 <span>{article.readTime}</span>
               </>
            )}
          </div>
        </div>

        <img 
          src={article.img} 
          alt={article.title} 
          className="w-full h-[400px] object-cover rounded-[2rem] mb-12 shadow-md"
        />

        {article.isSanity ? (
          <div className="prose prose-lg prose-headings:font-serif prose-headings:text-on-surface prose-p:font-sans prose-p:text-on-surface-variant prose-p:leading-relaxed prose-a:text-primary max-w-none">
            <PortableText value={article.content} />
          </div>
        ) : (
          <div 
            className="prose prose-lg prose-headings:font-serif prose-headings:text-on-surface prose-p:font-sans prose-p:text-on-surface-variant prose-p:leading-relaxed prose-a:text-primary max-w-none"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        )}
      </article>
    </main>
  );
};
