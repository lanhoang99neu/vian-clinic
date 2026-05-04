import React, { useEffect, useState } from 'react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { ArrowRight, Star, StarHalf, MapPin, Phone, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { sanityClient } from '../sanityClient';

export const HomePage = () => {
  const [homeData, setHomeData] = useState(null);
  const [clinicData, setClinicData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const homeQuery = `*[_type == "homepage"][0]{
          ...,
          "heroImageUrl": heroImage.asset->url,
          testimonials[]{
            name,
            rating,
            text,
            avatarInitial
          }
        }`;
        const home = await sanityClient.fetch(homeQuery);
        const clinic = await sanityClient.fetch('*[_type == "clinicInfo"][0]{..., "mapImageUrl": mapImage.asset->url}');
        setHomeData(home);
        setClinicData(clinic);
      } catch (error) {
        console.error('Error fetching Sanity data:', error);
      }
    };
    fetchData();
  }, []);

  const defaultTestimonials = [
    { rating: 5, text: "Liệu trình điều trị mụn tại đây thực sự đã thay đổi cuộc sống của tôi. Các bác sĩ tại Vian Skin Clinic không chỉ giỏi chuyên môn mà còn rất tận tâm theo sát kết quả.", name: "Minh Anh N.", avatarInitial: "M" },
    { rating: 4.5, text: "Công nghệ trẻ hóa da bằng laser rất tuyệt vời. Tôi thấy sự khác biệt rõ rệt chỉ sau 2 buổi điều trị. Không gian phòng khám sang trọng và thư giãn.", name: "Lan Hương T.", avatarInitial: "L" },
    { rating: 5, text: "Chuyên nghiệp, sạch sẽ và hiệu quả rõ rệt. Tôi hoàn toàn tin tưởng Vian Skin Clinic cho mọi nhu cầu chăm sóc da liễu của mình.", name: "Hoàng M.", avatarInitial: "H" }
  ];
  
  const testimonials = homeData?.testimonials?.length > 0 ? homeData.testimonials : defaultTestimonials;

  const defaultFeatures = [
    { title: "Đội ngũ Bác sĩ", description: "Quy tụ các bác sĩ chuyên khoa da liễu có trình độ cao, giàu kinh nghiệm từ các bệnh viện lớn." },
    { title: "Công nghệ hiện đại", description: "Sở hữu trang thiết bị và công nghệ laser, trẻ hóa da đạt tiêu chuẩn FDA quốc tế." },
    { title: "Cá nhân hóa phác đồ", description: "Mỗi khách hàng được thiết kế một lộ trình điều trị riêng biệt, phù hợp với từng tình trạng da." }
  ];
  
  const features = homeData?.aboutFeatures?.length > 0 ? homeData.aboutFeatures : defaultFeatures;

  return (
    <main>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-surface py-20 md:py-32">
        <div className="max-w-[1200px] mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div className="max-w-xl z-10">
            <div className="mb-6">
              <h2 className="text-[#8B1A2A] font-bold tracking-[0.2em] text-base md:text-lg mb-2 uppercase">
                {homeData?.heroSubtitle || "PHÒNG KHÁM CHUYÊN KHOA DA LIỄU"}
              </h2>
              <h1 className="font-serif text-5xl md:text-[64px] font-bold text-[#1A1A1A] mb-6 leading-tight">
                {homeData?.heroTitle || "Vian Skin Clinic"}
              </h1>
              <div className="w-24 h-[2px] bg-[#8B1A2A]/30 mb-6"></div>
              <h3 className="font-serif text-3xl md:text-4xl text-on-surface-variant font-medium leading-snug">
                {homeData?.heroDescription || "Nuôi dưỡng làn da, Khơi dậy tự tin"}
              </h3>
            </div>
            <p className="font-sans text-lg text-on-surface-variant leading-relaxed mb-10">
              {homeData?.heroBodyText || "Trải nghiệm dịch vụ chăm sóc da liễu cao cấp kết hợp giữa chuyên môn y khoa và độ chính xác thẩm mỹ. Hành trình tìm lại làn da rạng rỡ của bạn bắt đầu cùng các chuyên gia hàng đầu."}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button href={clinicData?.zaloLink || "https://zalo.me/0398510688"} target="_blank" rel="noopener noreferrer" className="gap-2">
                {homeData?.primaryButtonText || "Đặt lịch tư vấn"}
              </Button>
              <Button to="/services" variant="secondary" className="gap-2 bg-transparent text-on-surface border-outline-variant hover:bg-surface-variant/10">
                {homeData?.secondaryButtonText || "Xem tất cả dịch vụ"} <ArrowRight className="w-5 h-5 ml-2 inline" />
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-primary/5 rounded-[2rem] transform translate-x-4 translate-y-4"></div>
            <img 
              src={homeData?.heroImageUrl || "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=2070&auto=format&fit=crop"} 
              alt={homeData?.heroTitle || "Dermatology Clinic"} 
              className="relative rounded-[2rem] shadow-xl w-full h-[600px] object-cover"
            />
          </div>
        </div>
      </section>

      {/* Features / Why Choose Us Section */}
      <section className="py-20 bg-surface">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-16">
            <h3 className="text-primary font-bold tracking-[0.2em] text-sm mb-4 uppercase">{homeData?.aboutSubtitle || "VỀ VIAN SKIN CLINIC"}</h3>
            <h2 className="font-serif text-4xl font-bold text-on-surface mb-4">{homeData?.aboutTitle || "Kinh nghiệm lâm sàng trong thẩm mỹ y khoa"}</h2>
            <p className="font-sans text-on-surface-variant text-lg max-w-3xl mx-auto leading-relaxed">
              {homeData?.aboutDescription || "Với đội ngũ bác sĩ chuyên khoa da liễu giàu kinh nghiệm và hệ thống thiết bị hiện đại, chúng tôi cam kết mang lại kết quả điều trị tốt nhất cho từng khách hàng."}
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-12 text-center">
            {features.map((feature, idx) => (
              <div key={idx}>
                <h3 className="font-serif text-2xl font-bold mb-4 text-primary">{feature.title}</h3>
                <p className="font-sans text-on-surface-variant leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-24 bg-surface-container-low">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex justify-between items-end mb-16">
            <div className="max-w-2xl">
              <h2 className="font-serif text-4xl font-bold mb-4 text-on-surface">{homeData?.servicesPreviewTitle || "Giải pháp toàn diện cho sức khỏe làn da"}</h2>
              <p className="font-sans text-on-surface-variant leading-relaxed whitespace-pre-line">
                {homeData?.servicesPreviewDescription || "Từ chẩn đoán bệnh lý da liễu đến các liệu trình thẩm mỹ cao cấp."}
              </p>
            </div>
            <Button to="/services" variant="tertiary" className="hidden md:inline-flex gap-2">
              {homeData?.servicesPreviewButtonText || "Xem tất cả"} <ArrowRight className="w-4 h-4" />
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card 
              title="Điều trị da liễu"
              description="Giải pháp y khoa cho mụn, chàm, vẩy nến và các tình trạng da liễu lâm sàng khác."
              imageSrc="https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=2000&auto=format&fit=crop"
            >
              <Button to="/services" variant="tertiary" className="p-0 hover:bg-transparent">Xem thêm &rarr;</Button>
            </Card>
            <Card 
              title="Thẩm mỹ nội khoa"
              description="Các thủ thuật không xâm lấn giúp tôn vinh vẻ đẹp tự nhiên và phục hồi sự hài hòa cho khuôn mặt."
              imageSrc="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2053&auto=format&fit=crop"
            >
              <Button to="/services" variant="tertiary" className="p-0 hover:bg-transparent">Xem thêm &rarr;</Button>
            </Card>
            <Card 
              title="Trẻ hóa da"
              description="Công nghệ laser, peel da và phi kim giúp tái tạo vẻ rạng rỡ và cấu trúc mịn màng cho làn da."
              imageSrc="https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?q=80&w=2070&auto=format&fit=crop"
            >
              <Button to="/services" variant="tertiary" className="p-0 hover:bg-transparent">Xem thêm &rarr;</Button>
            </Card>
          </div>
          <div className="mt-8 text-center md:hidden">
            <Button to="/services" variant="secondary" className="w-full">
              {homeData?.servicesPreviewButtonText || "Xem tất cả"}
            </Button>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-24 bg-[#8B1A2A] text-center">
        <div className="max-w-[1200px] mx-auto px-6">
          <h2 className="font-serif text-4xl font-bold mb-16 text-on-primary uppercase">{homeData?.testimonialsTitle || "NIỀM TIN TỪ KHÁCH HÀNG"}</h2>
          <div className="grid md:grid-cols-3 gap-8 text-left">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-surface-container-lowest p-8 rounded-xl flex flex-col gap-4 border border-surface-variant/30 shadow-md">
                <div className="flex text-[#D4AF37]">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i}>
                      {i < Math.floor(testimonial?.rating || 5) ? (
                        <Star className="w-5 h-5 fill-current" />
                      ) : i < (testimonial?.rating || 5) ? (
                        <StarHalf className="w-5 h-5 fill-current" />
                      ) : (
                        <Star className="w-5 h-5 text-gray-300" />
                      )}
                    </span>
                  ))}
                </div>
                <p className="font-sans text-on-surface-variant leading-relaxed italic flex-grow">
                  "{testimonial?.text || ''}"
                </p>
                <div className="flex items-center gap-3 mt-4">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                    {testimonial?.avatarInitial || testimonial?.name?.charAt(0) || 'K'}
                  </div>
                  <span className="font-bold text-on-surface">{testimonial?.name || 'Khách hàng'}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 bg-surface">
        <div className="max-w-[1200px] mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-[#8B1A2A] font-bold tracking-[0.2em] text-sm mb-4 uppercase">{homeData?.contactSectionLabel || 'THÔNG TIN LIÊN HỆ'}</h3>
            <h2 className="font-serif text-4xl font-bold mb-6 text-on-surface">{homeData?.contactSectionTitle || 'Đồng hành cùng bạn trên chặng đường chăm sóc da'}</h2>
            <p className="font-sans text-on-surface-variant leading-relaxed mb-10 whitespace-pre-line">
              {homeData?.contactSectionDescription || 'Tại Vian Skin Clinic, chúng tôi tin rằng mỗi làn da đều có câu chuyện riêng. Các bác sĩ và chuyên gia của chúng tôi luôn sẵn sàng lắng nghe, thấu hiểu và cung cấp các giải pháp thẩm mỹ an toàn, hiệu quả và tối ưu nhất cho bạn.'}
            </p>
            
            <div className="space-y-6 mb-10">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#8B1A2A]/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-[#8B1A2A]" />
                </div>
                <div>
                  <h4 className="font-bold text-on-surface">Địa chỉ</h4>
                  <p className="font-sans text-on-surface-variant">{clinicData?.address || "Liền kề A14 - khu nhà ở thấp tầng 108 Nguyễn Trãi - Thượng Đình - Hà Nội"}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#8B1A2A]/10 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-[#8B1A2A]" />
                </div>
                <div>
                  <h4 className="font-bold text-on-surface">Số điện thoại / Zalo</h4>
                  <p className="font-sans text-on-surface-variant">{clinicData?.phone || "039 851 0688"}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#8B1A2A]/10 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-[#8B1A2A]" />
                </div>
                <div>
                  <h4 className="font-bold text-on-surface">Giờ mở cửa</h4>
                  <p className="font-sans text-on-surface-variant">{clinicData?.openingHours || "9:00 - 19:00 tất cả các ngày trong tuần"}</p>
                </div>
              </div>
            </div>

            <Button href={clinicData?.zaloLink || "https://zalo.me/0398510688"} target="_blank" rel="noopener noreferrer" className="bg-[#8B1A2A] text-white hover:bg-[#8B1A2A]/90">
              {homeData?.ctaButtonText || "Đặt lịch ngay"}
            </Button>
          </div>
          
          <div className="h-full min-h-[500px]">
            <iframe
              src="https://maps.google.com/maps?q=108+Nguyen+Trai+Thuong+Dinh+Ha+Noi+Vietnam&output=embed"
              width="100%"
              height="100%"
              style={{border: 0}}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full rounded-[2rem] shadow-md"
              title="Bản đồ Vian Skin Clinic"
            />
          </div>
        </div>
      </section>
    </main>
  );
};
