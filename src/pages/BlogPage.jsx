import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { Chip } from '../components/ui/Chip';
import { blogArticles, featuredArticle } from '../data/articles';
import { sanityClient } from '../sanityClient';
import { stegaClean } from '@sanity/client/stega';

export const BlogPage = () => {
  const [activeFilter, setActiveFilter] = useState('Tất cả bài viết');
  const [sanityArticles, setSanityArticles] = useState([]);
  const [pageData, setPageData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    sanityClient.fetch('*[_type == "post"] | order(_createdAt desc){..., "imageUrl": featuredImage.asset->url}')
      .then(data => setSanityArticles(data || []))
      .catch(console.error);
      
    sanityClient.fetch('*[_type == "blogPage"][0]')
      .then(data => setPageData(data))
      .catch(console.error);
  }, []);

  const defaultCategories = [
    "Tất cả bài viết",
    "Quy trình chăm sóc da",
    "Thông tin bệnh lý",
    "Tin tức công nghệ",
    "Cập nhật phòng khám"
  ];
  
  const categories = pageData?.categories?.length > 0 ? ["Tất cả bài viết", ...pageData.categories] : defaultCategories;

  const mappedSanityArticles = sanityArticles.map(p => ({
    id: p.slug?.current || p._id,
    title: p.title,
    desc: p.excerpt,
    category: p.category || 'Tin tức',
    img: p.imageUrl,
    tagClass: 'bg-primary/10 text-primary',
    readTime: p.readTime,
    content: p.content,
    author: p.author,
    publishedAt: p.publishedAt
  }));

  const displayFeatured = mappedSanityArticles.length > 0 ? mappedSanityArticles[0] : featuredArticle;
  const gridArticles = mappedSanityArticles.length > 0 ? mappedSanityArticles.slice(1) : blogArticles;

  const filteredArticles = activeFilter === 'Tất cả bài viết' 
    ? gridArticles 
    : gridArticles.filter(article => stegaClean(article.category).toLowerCase() === activeFilter.toLowerCase());

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('vi-VN', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <main className="bg-surface pb-24">
      {/* Featured Article */}
      <section className="max-w-[1200px] mx-auto px-6 py-12 md:py-20">
        <Link to={`/blog/article-${displayFeatured.id}`} className="grid md:grid-cols-2 gap-12 items-center group cursor-pointer">
          <div className="rounded-[2rem] overflow-hidden shadow-lg h-[300px] md:h-[400px]">
            <img 
              src={displayFeatured.img} 
              alt={displayFeatured.title} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <div>
            <span className={`inline-block px-4 py-1.5 font-bold text-sm rounded-full mb-6 uppercase tracking-wider ${displayFeatured.tagClass}`}>
              {displayFeatured.category}
            </span>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-on-surface mb-6 leading-tight group-hover:text-primary transition-colors">
              {displayFeatured.title}
            </h1>
            <p className="font-sans text-lg text-on-surface-variant leading-relaxed mb-6">
              {displayFeatured.desc}
            </p>
            <div className="flex items-center gap-4 text-sm font-sans text-on-surface-variant mb-8">
               {displayFeatured.author && <span>{displayFeatured.author}</span>}
               {displayFeatured.author && displayFeatured.publishedAt && <span>•</span>}
               {displayFeatured.publishedAt && <span>{formatDate(displayFeatured.publishedAt)}</span>}
            </div>
            <span className="inline-flex items-center text-primary font-bold group-hover:underline text-lg">
              Đọc thêm &rarr;
            </span>
          </div>
        </Link>
      </section>

      {/* Filter and Search */}
      <section className="max-w-[1200px] mx-auto px-6 mb-12">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-8 border-b border-surface-variant/30 pb-8">
          <div>
            <h2 className="font-serif text-3xl font-bold text-on-surface mb-6 uppercase">{pageData?.pageTitle || "KIẾN THỨC DA LIỄU"}</h2>
            <div className="flex flex-wrap gap-3">
              {categories.map(category => (
                <Chip 
                  key={category} 
                  active={activeFilter === category}
                  onClick={() => setActiveFilter(category)}
                >
                  {category}
                </Chip>
              ))}
            </div>
          </div>
          
          <div className="relative w-full lg:w-80 shrink-0">
            <input 
              type="text" 
              placeholder={pageData?.searchPlaceholder || "Tìm kiếm bài viết..."}
              className="w-full pl-12 pr-4 py-3.5 rounded-full border border-surface-variant/50 bg-surface-container-lowest focus:outline-none focus:border-primary transition-colors font-sans shadow-sm"
            />
            <Search className="w-5 h-5 text-on-surface-variant absolute left-4 top-1/2 transform -translate-y-1/2" />
          </div>
        </div>
      </section>

      {/* Article Grid */}
      <section className="max-w-[1200px] mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map(article => (
            <Link 
              to={`/blog/article-${article.id}`}
              key={article.id} 
              className="flex flex-col bg-surface-container-lowest rounded-[1.5rem] overflow-hidden border border-surface-variant/30 shadow-sm hover:shadow-md transition-all group"
            >
              <div className="h-56 overflow-hidden">
                <img src={article.img} alt={article.title} className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500" />
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <span className={`inline-block px-3 py-1 text-[11px] font-bold rounded mb-4 self-start tracking-wider uppercase ${article.tagClass}`}>
                  {article.category}
                </span>
                <h3 className="font-serif text-2xl font-bold text-on-surface mb-4 line-clamp-2 leading-snug group-hover:text-primary transition-colors">
                  {article.title}
                </h3>
                <p className="font-sans text-on-surface-variant mb-6 line-clamp-3 flex-grow leading-relaxed">
                  {article.desc}
                </p>
                <div className="flex items-center gap-2 text-xs font-sans text-on-surface-variant mb-4">
                  {article.author && <span>{article.author}</span>}
                  {article.author && article.publishedAt && <span>•</span>}
                  {article.publishedAt && <span>{formatDate(article.publishedAt)}</span>}
                </div>
                <span className="inline-flex items-center text-primary font-bold group-hover:underline mt-auto">
                  Đọc thêm &rarr;
                </span>
              </div>
            </Link>
          ))}
        </div>
        {filteredArticles.length === 0 && (
          <div className="text-center py-12 text-on-surface-variant font-sans">
            Không có bài viết nào trong chuyên mục này.
          </div>
        )}
      </section>
    </main>
  );
};
