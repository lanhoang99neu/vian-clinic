import React, { useEffect, useState } from 'react';
import { Button } from '../components/ui/Button';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { sanityClient } from '../sanityClient';

export const ContactPage = () => {
  const [clinicData, setClinicData] = useState(null);

  useEffect(() => {
    const fetchQuery = '*[_type == "clinicInfo"][0]{..., "mapImageUrl": mapImage.asset->url}';
    const listenQuery = '*[_type == "clinicInfo"]';
    
    const fetchData = async () => {
      try {
        const clinic = await sanityClient.fetch(fetchQuery);
        console.log('Sanity Raw Data for Clinic Info:', clinic);
        setClinicData(clinic);
      } catch (error) {
        console.error('Error fetching Sanity data:', error);
      }
    };
    
    fetchData();

    // Listen for real-time updates using a simple query
    const subscription = sanityClient.listen(listenQuery).subscribe((update) => {
      // Re-fetch to ensure any references (like mapImageUrl) are properly resolved
      fetchData();
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <main className="py-20 bg-surface min-h-[calc(100vh-80px)]">
      <div className="max-w-[1200px] mx-auto px-6">
        
        {/* Main Card */}
        <div className="bg-surface-container-lowest rounded-[2rem] shadow-lg border border-surface-variant/30 overflow-hidden flex flex-col md:flex-row">
          
          {/* Left Side: Contact Info */}
          <div className="md:w-1/2 p-12 md:p-16 bg-[#8B1A2A] text-white flex flex-col justify-center">
            <h3 className="font-bold tracking-[0.2em] text-sm mb-4 uppercase text-white/80">{clinicData?.contactTitle || "THÔNG TIN LIÊN HỆ"}</h3>
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4 leading-tight">{clinicData?.contactSubtitle || "Đồng hành cùng bạn trên chặng đường chăm sóc da"}</h1>
            <p className="font-sans text-white/90 text-lg leading-relaxed mb-12 whitespace-pre-line">
              {clinicData?.contactDescription || "Tại Vian Skin Clinic, chúng tôi tin rằng mỗi làn da đều có câu chuyện riêng. Các bác sĩ và chuyên gia của chúng tôi luôn sẵn sàng lắng nghe, thấu hiểu và cung cấp các giải pháp thẩm mỹ an toàn, hiệu quả và tối ưu nhất cho bạn."}
            </p>
            
            <div className="space-y-8 font-sans">
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-bold mb-1 text-lg">Địa chỉ</h4>
                  <p className="leading-relaxed text-white/90 whitespace-pre-line">
                    {clinicData?.address || "Liền kề A14 - khu nhà ở thấp tầng 108 Nguyễn Trãi - Thượng Đình - Hà Nội"}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <Phone className="w-6 h-6 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-bold mb-1 text-lg">Số điện thoại / Zalo</h4>
                  <a href={clinicData?.zaloLink || "https://zalo.me/0398510688"} target="_blank" rel="noopener noreferrer" className="leading-relaxed text-white/90 hover:text-white hover:underline transition-colors font-medium text-lg">
                    {clinicData?.phone || "039 851 0688"}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Mail className="w-6 h-6 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-bold mb-1 text-lg">Email</h4>
                  <a href={`mailto:${clinicData?.email || "cskh.nhatminhspacosmetic@gmail.com"}`} className="leading-relaxed text-white/90 hover:text-white hover:underline transition-colors break-all">
                    {clinicData?.email || "cskh.nhatminhspacosmetic@gmail.com"}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Clock className="w-6 h-6 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-bold mb-1 text-lg">Giờ mở cửa</h4>
                  <p className="leading-relaxed text-white/90 whitespace-pre-line">
                    {clinicData?.openingHours || "9:00 - 19:00 tất cả các ngày trong tuần\n(nhận khách cuối cùng lúc 18:00)"}
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Side: Map & CTA */}
          <div className="md:w-1/2 p-12 md:p-16 flex flex-col items-center justify-center bg-surface-container-lowest">
            <div className="w-full h-[400px] rounded-2xl overflow-hidden border border-surface-variant/30 mb-8 shadow-sm relative group cursor-pointer">
              <a 
                href="https://www.google.com/maps/dir/?api=1&destination=108+Nguyen+Trai,+Thuong+Dinh,+Hanoi" 
                target="_blank" 
                rel="noopener noreferrer"
                className="absolute inset-0 z-10 bg-transparent flex items-center justify-center transition-all duration-300"
                aria-label="Open directions in Google Maps"
              >
                <div className="opacity-0 group-hover:opacity-100 bg-black/60 text-white font-bold py-3 px-6 rounded-full transition-opacity shadow-lg backdrop-blur-sm flex items-center gap-2">
                  <MapPin className="w-5 h-5" /> Mở bản đồ chỉ đường
                </div>
              </a>
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
            
            <Button href="https://zalo.me/0398510688" target="_blank" rel="noopener noreferrer" className="bg-[#8B1A2A] text-white hover:bg-[#8B1A2A]/90 w-full py-4 text-lg font-bold shadow-md">
              Chat Zalo ngay
            </Button>
          </div>

        </div>
      </div>
    </main>
  );
};
