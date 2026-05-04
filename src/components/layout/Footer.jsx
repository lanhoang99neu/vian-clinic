import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  const [siteConfig, setSiteConfig] = useState(null);

  useEffect(() => {
    import('../../sanityClient').then(({ sanityClient }) => {
      sanityClient.fetch('*[_type == "siteConfig"][0]{..., "logoUrl": logo.asset->url}')
        .then(data => setSiteConfig(data))
        .catch(console.error);
    });
  }, []);

  const defaultFooterLinks = [
    { title: 'Chính sách bảo mật', url: '#' },
    { title: 'Điều khoản dịch vụ', url: '#' },
    { title: 'Câu hỏi thường gặp', url: '/faq' }
  ];
  
  const footerLinks = siteConfig?.footerLinks?.length > 0 ? siteConfig.footerLinks : defaultFooterLinks;

  return (
    <footer className="bg-surface-container py-12 border-t border-surface-variant/50">
      <div className="max-w-[1200px] mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
        
        {/* Logo Left */}
        <Link to="/" className="flex items-center gap-3 text-primary shrink-0">
          <img src={siteConfig?.logoUrl || "/logo.png"} alt="Vian Skin Clinic Logo" className="h-8 object-contain" />
          <span className="font-serif font-bold text-lg tracking-wide text-on-surface">{siteConfig?.siteName || "Vian Skin Clinic"}</span>
        </Link>
        
        {/* Links Middle */}
        <div className="flex flex-wrap justify-center gap-6 font-sans text-sm text-on-surface-variant">
          {footerLinks.map((link, idx) => (
            <Link key={idx} to={link.url || '#'} className="hover:text-primary transition-colors">{link.title}</Link>
          ))}
        </div>

        {/* Social Icons Right */}
        <div className="flex items-center gap-4 text-on-surface-variant shrink-0">
          {siteConfig?.socialLinks?.map((social, idx) => {
             // Basic fallback icons if we don't have explicit SVGs per platform, but let's just render links with text if SVG isn't possible, or keep the default hardcoded SVGs if socialLinks is empty.
             return (
               <a key={idx} href={social.url} className="hover:text-primary transition-colors text-sm font-semibold uppercase" aria-label={social.platform} target="_blank" rel="noopener noreferrer">
                 {social.platform}
               </a>
             );
          }) || (
            <>
              <a href="#" className="hover:text-primary transition-colors" aria-label="Facebook">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/></svg>
              </a>
              <a href="#" className="hover:text-primary transition-colors" aria-label="Instagram">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
              <a href="#" className="hover:text-primary transition-colors" aria-label="Youtube">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
            </>
          )}
        </div>
        
      </div>
      
      <div className="max-w-[1200px] mx-auto px-6 mt-12 text-center">
        <p className="font-sans text-xs text-on-surface-variant/70">
          &copy; {new Date().getFullYear()} {siteConfig?.siteName || "Vian Skin Clinic"}. Bản quyền thuộc về {siteConfig?.siteName || "Vian Skin Clinic"}.
        </p>
      </div>
    </footer>
  );
};
