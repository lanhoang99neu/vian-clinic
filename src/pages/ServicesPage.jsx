import React, { useEffect, useState } from 'react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Link } from 'react-router-dom';
import { Sparkles, Activity, Droplet, Sun, Smile, Zap, ArrowRight } from 'lucide-react';
import { sanityClient } from '../sanityClient';
import { stegaClean } from '@sanity/client/stega';

const iconMap = { Sparkles, Activity, Droplet, Sun, Smile, Zap };

export const ServicesPage = () => {
  const [services, setServices] = useState([]);
  const [pageData, setPageData] = useState(null);

  useEffect(() => {
    sanityClient.fetch('*[_type == "service"]{..., "imageUrl": image.asset->url}')
      .then(data => setServices(data || []))
      .catch(console.error);

    sanityClient.fetch('*[_type == "servicesPage"][0]{..., "heroImageUrl": heroImage.asset->url}')
      .then(data => setPageData(data))
      .catch(console.error);
  }, []);

  const defaultTreHoa = [
    { id: 'hifu', title: 'Hifu', desc: 'Công nghệ sóng siêu âm hội tụ cường độ cao giúp nâng cơ, xóa nhăn không xâm lấn.', icon: 'Activity' },
    { id: 'rf', title: 'RF', desc: 'Sử dụng sóng vô tuyến điện từ để kích thích sản sinh collagen, làm săn chắc làn da chảy xệ.', icon: 'Zap' },
    { id: 'meso', title: 'Meso', desc: 'Tiêm vi điểm đưa dưỡng chất trực tiếp vào sâu trong da, cấp ẩm và phục hồi tức thì.', icon: 'Droplet' },
    { id: 'laser', title: 'Laser', desc: 'Giải pháp đa năng cho các vấn đề sắc tố, lỗ chân lông và làm sáng da chuyên sâu.', icon: 'Sun' },
    { id: 'botox', title: 'Botox', desc: 'Xóa mờ các nếp nhăn động, định hình gương mặt thon gọn và trẻ trung hơn.', icon: 'Smile' },
    { id: 'peel-da', title: 'Peel da', desc: 'Tái tạo bề mặt da, loại bỏ lớp sừng già cỗi, mang lại làn da mịn màng và sáng khỏe.', icon: 'Sparkles' }
  ];

  const defaultDieuTri = [
    { id: 'tri-mun', title: 'Trị mụn', desc: 'Phác đồ chuẩn y khoa giúp tiêu diệt vi khuẩn, kiểm soát dầu và ngăn ngừa mụn tái phát.', img: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=2000&auto=format&fit=crop' },
    { id: 'tri-seo', title: 'Trị sẹo', desc: 'Công nghệ Laser Fractional CO2 và bóc tách đáy sẹo giúp đầy sẹo rỗ, làm mịn bề mặt da.', img: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2053&auto=format&fit=crop' },
    { id: 'viem-nang-long', title: 'Viêm nang lông', desc: 'Điều trị dứt điểm tình trạng sần sùi, mẩn đỏ, mang lại làn da cơ thể mịn màng.', img: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?q=80&w=2070&auto=format&fit=crop' },
    { id: 'tham', title: 'Thâm', desc: 'Làm mờ đốm nâu, vết thâm sau mụn và đồng đều màu da bằng công nghệ ánh sáng tiên tiến.', img: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=2070&auto=format&fit=crop' }
  ];

  const defaultKhac = [
    { id: 'triet-long', title: 'Triệt lông', desc: 'Công nghệ triệt lông lạnh, không đau, giúp se khít lỗ chân lông và làm sáng vùng da điều trị.', img: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?q=80&w=2070&auto=format&fit=crop' },
    { id: 'botox-nach', title: 'Botox nách', desc: 'Giải pháp hiệu quả kiểm soát mồ hôi vùng nách, mang lại sự tự tin và khô thoáng tuyệt đối.', img: 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?q=80&w=2070&auto=format&fit=crop' }
  ];

  const getCategoryServices = (category, defaultData) => {
    const matched = services.filter(s => stegaClean(s.category) === category);
    if (matched.length > 0) {
      return matched.map(s => ({
        id: s.slug?.current || s._id,
        title: s.name,
        desc: s.description,
        icon: s.iconName || 'Sparkles',
        img: s.imageUrl || defaultData.find(d => d.title === s.name)?.img || 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2053&auto=format&fit=crop',
        price: s.price
      }));
    }
    return defaultData;
  };

  const treHoaServices = getCategoryServices('Trẻ hóa & Nâng cơ', defaultTreHoa);
  const dieuTriServices = getCategoryServices('Điều trị da', defaultDieuTri);
  const khacServices = getCategoryServices('Dịch vụ khác', defaultKhac);

  return (
    <main className="bg-surface">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <img 
            src={pageData?.heroImageUrl || "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2053&auto=format&fit=crop"} 
            alt="Dịch vụ chuyên sâu" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        
        <div className="relative z-10 text-center max-w-3xl px-6">
          <h2 className="text-[#D4AF37] font-bold tracking-[0.2em] text-sm mb-4 uppercase">{pageData?.heroSubtitle || "CHĂM SÓC CHUYÊN NGHIỆP"}</h2>
          <h1 className="font-serif text-5xl md:text-6xl font-bold mb-6 text-white">{pageData?.heroTitle || "Dịch Vụ Chuyên Sâu"}</h1>
          <p className="font-sans text-lg text-white/90 leading-relaxed whitespace-pre-line">
            {pageData?.heroDescription || "Nơi hội tụ giữa độ chính xác của y khoa hiện đại và nghệ thuật thẩm mỹ tinh tế. Chúng tôi cam kết mang lại vẻ đẹp tự nhiên và bền vững thông qua phác đồ điều trị cá nhân hóa."}
          </p>
        </div>
      </section>

      {/* Trẻ hóa & Nâng cơ */}
      <section className="py-24 max-w-[1200px] mx-auto px-6">
        <h2 className="font-serif text-4xl font-bold mb-16 text-center text-on-surface">Trẻ hóa & Nâng cơ</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {treHoaServices.map(service => {
            const IconComponent = iconMap[service.icon] || Sparkles;
            return (
              <div key={service.id} className="bg-surface-container-lowest p-8 rounded-[2rem] border border-surface-variant/30 hover:border-[#8B1A2A] transition-colors shadow-sm flex flex-col">
                <IconComponent className="w-10 h-10 text-[#8B1A2A] mb-6" />
                <h3 className="font-serif text-2xl font-bold mb-4 text-on-surface">{service.title}</h3>
                <p className="font-sans text-on-surface-variant mb-6 flex-grow">{service.desc}</p>
                {service.price && (
                  <p className="font-sans font-semibold text-[#8B1A2A] mb-4 text-sm">{service.price}</p>
                )}
                <Link to={`/services/${service.id}`} className="inline-flex items-center text-[#8B1A2A] font-bold hover:underline">
                  Chi tiết dịch vụ <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      {/* Điều trị da */}
      <section className="py-24 bg-surface-container-low">
        <div className="max-w-[1200px] mx-auto px-6">
          <h2 className="font-serif text-4xl font-bold mb-16 text-center text-on-surface">Điều trị da</h2>
          <div className="grid md:grid-cols-2 gap-12">
            {dieuTriServices.map(service => (
              <Card key={service.id} title={service.title} description={service.desc} imageSrc={service.img}>
                {service.price && (
                  <p className="font-sans font-semibold text-[#8B1A2A] mb-4 text-sm">{service.price}</p>
                )}
                <Button to={`/services/${service.id}`} variant="tertiary" className="p-0 hover:bg-transparent text-[#8B1A2A]">
                  CHI TIẾT DỊCH VỤ &rarr;
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Dịch vụ khác */}
      <section className="py-24 max-w-[1200px] mx-auto px-6">
        <h2 className="font-serif text-4xl font-bold mb-16 text-center text-on-surface">Dịch vụ khác</h2>
        <div className="grid md:grid-cols-2 gap-12">
          {khacServices.map(service => (
            <Card key={service.id} title={service.title} description={service.desc} imageSrc={service.img}>
              {service.price && (
                <p className="font-sans font-semibold text-[#8B1A2A] mb-4 text-sm">{service.price}</p>
              )}
              <Button to={`/services/${service.id}`} variant="tertiary" className="p-0 hover:bg-transparent text-[#8B1A2A]">
                CHI TIẾT DỊCH VỤ &rarr;
              </Button>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-[#8B1A2A] py-20 text-center">
        <div className="max-w-[800px] mx-auto px-6">
          <h2 className="font-serif text-4xl font-bold mb-8 text-white">{pageData?.ctaTitle || "Sẵn sàng để bắt đầu hành trình làn da mới?"}</h2>
          <Button href="https://zalo.me/0398510688" target="_blank" rel="noopener noreferrer" className="bg-white text-[#8B1A2A] hover:bg-white/90 px-8 py-4 text-lg">
            {pageData?.ctaButtonText || "ĐẶT LỊCH TƯ VẤN"}
          </Button>
        </div>
      </section>
    </main>
  );
};
