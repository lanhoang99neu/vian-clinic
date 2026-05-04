import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Button } from '../ui/Button';
import { sanityClient } from '../../sanityClient';

export const Header = () => {
  const [clinicData, setClinicData] = useState(null);
  const [siteConfig, setSiteConfig] = useState(null);

  useEffect(() => {
    sanityClient.fetch('*[_type == "clinicInfo"][0]')
      .then(data => setClinicData(data))
      .catch(console.error);
      
    sanityClient.fetch('*[_type == "siteConfig"][0]{..., "logoUrl": logo.asset->url}')
      .then(data => setSiteConfig(data))
      .catch(console.error);
  }, []);

  const defaultNavLinks = [
    { title: 'Về chúng tôi', url: '/' },
    { title: 'Dịch vụ', url: '/services' },
    { title: 'Kiến thức da liễu', url: '/blog' },
    { title: 'Hỏi đáp', url: '/faq' },
    { title: 'Liên hệ', url: '/contact' }
  ];
  
  const navLinks = siteConfig?.navLinks?.length > 0 ? siteConfig.navLinks : defaultNavLinks;

  return (
    <header className="sticky top-0 z-50 bg-surface/80 backdrop-blur-md border-b border-surface-variant/50">
      <div className="max-w-[1200px] mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-primary">
          <img src={siteConfig?.logoUrl || "/logo.png"} alt={siteConfig?.siteName || "Vian Skin Clinic"} className="h-12" />
        </Link>
        <nav className="hidden md:flex gap-8 font-sans font-semibold text-sm text-on-surface-variant">
          {navLinks.map((link, idx) => (
            <NavLink 
              key={idx} 
              to={link.url || '#'} 
              end={link.url === '/'}
              className={({ isActive }) => 
                `transition-colors ${isActive ? 'text-[#8B1A2A] font-bold border-b-2 border-[#8B1A2A] pb-1' : 'hover:text-primary'}`
              }
            >
              {link.title}
            </NavLink>
          ))}
        </nav>
        <Button href={clinicData?.zaloLink || "https://zalo.me/0398510688"} target="_blank" rel="noopener noreferrer" variant="primary" className="hidden md:inline-flex">
          Đặt lịch tư vấn
        </Button>
      </div>
    </header>
  );
};
