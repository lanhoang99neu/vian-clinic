import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Chip } from '../components/ui/Chip';
import { ArrowLeft, Clock, ShieldCheck } from 'lucide-react';
import { sanityClient } from '../sanityClient';
import { PortableText } from '@portabletext/react';

export const ServiceDetailPage = () => {
  const { id } = useParams();
  const [service, setService] = useState(null);

  useEffect(() => {
    sanityClient.fetch('*[_type == "service" && slug.current == $id][0]{..., "imageUrl": image.asset->url}', { id })
      .then(data => setService(data))
      .catch(console.error);
  }, [id]);

  const serviceName = service?.name || (id ? id.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') : 'Hifu');
  const serviceDesc = service?.description || 'Công nghệ sóng siêu âm hội tụ cường độ cao giúp nâng cơ, xóa nhăn không xâm lấn.';
  const serviceCategory = service?.category || 'Trẻ hóa da';
  const serviceImg = service?.imageUrl || 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2053&auto=format&fit=crop';

  return (
    <main className="bg-surface pb-24">
      {/* Hero */}
      <section className="relative h-[500px] flex items-end pb-16">
        <div className="absolute inset-0 z-0">
          <img 
            src={serviceImg} 
            alt={serviceName} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/80 to-transparent"></div>
        </div>
        
        <div className="max-w-[1200px] mx-auto px-6 relative z-10 w-full">
          <Link to="/services" className="inline-flex items-center text-primary hover:underline mb-6 font-sans font-semibold">
            <ArrowLeft className="w-4 h-4 mr-2" /> Quay lại
          </Link>
          <div className="flex gap-3 mb-4">
            <Chip>{serviceCategory}</Chip>
          </div>
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-on-surface mb-4">
            {serviceName}
          </h1>
          <p className="font-sans text-xl text-on-surface-variant max-w-2xl">
            {serviceDesc}
          </p>
          {service?.price && (
            <p className="font-sans font-bold text-2xl text-primary mt-6">
              {service.price}
            </p>
          )}
        </div>
      </section>

      <section className="max-w-[1200px] mx-auto px-6 grid md:grid-cols-3 gap-12 pt-12">
        <div className="md:col-span-2 space-y-12">
          <div>
            <h2 className="font-serif text-3xl font-bold mb-6 text-on-surface">Về phương pháp điều trị</h2>
            {service?.content ? (
              <div className="prose prose-lg text-on-surface-variant font-sans leading-relaxed">
                <PortableText value={service.content} />
              </div>
            ) : (
              <div className="prose prose-lg text-on-surface-variant font-sans leading-relaxed">
                <p>
                  Phương pháp {serviceName} của chúng tôi sử dụng công nghệ tiên tiến nhất để giải quyết an toàn và hiệu quả các vấn đề về da. Bằng cách kích thích quá trình chữa lành tự nhiên của cơ thể, phương pháp này đẩy nhanh quá trình sản xuất collagen và elastin.
                </p>
                <p className="mt-4">
                  Kết quả mang lại một làn da săn chắc, rạng rỡ và trẻ trung hơn. Đặc biệt hiệu quả trong việc giảm thiểu nếp nhăn, sẹo mụn và tổn thương do ánh nắng mặt trời.
                </p>
              </div>
            )}
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <div className="bg-surface-container-lowest p-6 rounded-[1rem] border border-surface-variant/30">
              <Clock className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-serif text-xl font-bold mb-2">Thời gian</h3>
              <p className="font-sans text-on-surface-variant">45 - 60 phút</p>
            </div>
            <div className="bg-surface-container-lowest p-6 rounded-[1rem] border border-surface-variant/30">
              <ShieldCheck className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-serif text-xl font-bold mb-2">Thời gian phục hồi</h3>
              <p className="font-sans text-on-surface-variant">3 - 5 ngày (có thể ửng đỏ nhẹ)</p>
            </div>
          </div>
        </div>

        {/* Sticky Booking Sidebar */}
        <div className="relative">
          <div className="sticky top-28 bg-surface-container-lowest p-8 rounded-[2rem] shadow-sm border border-surface-variant/30">
            <h3 className="font-serif text-2xl font-bold mb-4 text-on-surface">Sẵn sàng thay đổi làn da?</h3>
            <p className="font-sans text-on-surface-variant mb-8">
              Đặt lịch tư vấn cá nhân hóa để tìm hiểu xem liệu trình {serviceName} có phù hợp với bạn không.
            </p>
            <Button href="https://zalo.me/0398510688" target="_blank" rel="noopener noreferrer" variant="primary" className="w-full mb-4">
              Đặt lịch tư vấn
            </Button>
            <p className="text-center text-sm text-on-surface-variant font-sans">
              Bạn có thắc mắc? <Link to="/faq" className="text-primary hover:underline">Xem Hỏi Đáp</Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};
