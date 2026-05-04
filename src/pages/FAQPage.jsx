import React, { useEffect, useState } from 'react';
import { Button } from '../components/ui/Button';
import { sanityClient } from '../sanityClient';

export const FAQPage = () => {
  const [sanityFaqs, setSanityFaqs] = useState([]);
  const [pageData, setPageData] = useState(null);

  useEffect(() => {
    sanityClient.fetch('*[_type == "faq"]')
      .then(data => setSanityFaqs(data || []))
      .catch(console.error);
      
    sanityClient.fetch('*[_type == "faqPage"][0]')
      .then(data => setPageData(data))
      .catch(console.error);
  }, []);
  
  const faqs = [
    {
      question: "Tôi nên mong đợi điều gì trong lần tư vấn đầu tiên?",
      answer: "Trong lần tư vấn đầu tiên, một trong những bác sĩ da liễu của chúng tôi sẽ đánh giá toàn diện tình trạng da của bạn, thảo luận về những mối quan tâm và mục tiêu, và xây dựng một phác đồ điều trị tùy chỉnh dành riêng cho bạn."
    },
    {
      question: "Các phương pháp điều trị của bạn có an toàn cho mọi loại da không?",
      answer: "Có, chúng tôi sử dụng nhiều loại công nghệ và phương pháp điều trị có thể thích ứng an toàn cho mọi loại da và màu da. Bác sĩ da liễu sẽ lựa chọn các phương án an toàn và hiệu quả nhất cho hồ sơ da cụ thể của bạn."
    },
    {
      question: "Thời gian phục hồi cho các phương pháp điều trị bằng laser là bao lâu?",
      answer: "Thời gian phục hồi khác nhau đáng kể tùy thuộc vào loại laser được sử dụng và cường độ điều trị. Nó có thể từ không cần thời gian nghỉ ngơi đối với laser không bóc tách đến 5-7 ngày đối với các quy trình tái tạo chuyên sâu hơn."
    },
    {
      question: "Tôi có cần ngừng sử dụng các sản phẩm chăm sóc da trước khi điều trị không?",
      answer: "Chúng tôi thường khuyên bạn nên tạm dừng sử dụng các thành phần hoạt tính như Retinols, AHAs và BHAs 3-5 ngày trước các phương pháp điều trị lâm sàng như peel da hoặc laser. Hướng dẫn chăm sóc chi tiết trước khi điều trị sẽ được cung cấp khi bạn đặt lịch."
    }
  ];

  const displayFaqs = sanityFaqs.length > 0 ? sanityFaqs : faqs;

  return (
    <main className="py-20 bg-surface min-h-[calc(100vh-80px)]">
      <div className="max-w-[800px] mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="font-serif text-5xl font-bold mb-6 text-on-surface">{pageData?.pageTitle || "Hỏi đáp"}</h1>
          <p className="font-sans text-lg text-on-surface-variant leading-relaxed">
            {pageData?.pageDescription || "Tìm câu trả lời cho những câu hỏi thường gặp về phòng khám, các phương pháp điều trị và chăm sóc bệnh nhân."}
          </p>
        </div>

        <div className="space-y-6 mb-16">
          {displayFaqs.map((faq, index) => (
            <div key={index} className="bg-surface-container-lowest p-8 rounded-[1rem] border border-surface-variant/30 shadow-sm">
              <h3 className="font-serif text-xl font-bold text-on-surface mb-3">{faq.question}</h3>
              <p className="font-sans text-on-surface-variant leading-relaxed whitespace-pre-line">{faq.answer}</p>
            </div>
          ))}
        </div>

        <div className="bg-primary/5 p-8 rounded-[2rem] text-center border border-primary/10">
          <h2 className="font-serif text-2xl font-bold text-on-surface mb-4">{pageData?.ctaTitle || "Bạn vẫn còn thắc mắc?"}</h2>
          <p className="font-sans text-on-surface-variant mb-6">
            {pageData?.ctaDescription || "Đội ngũ điều phối bệnh nhân của chúng tôi sẵn sàng trợ giúp bạn."}
          </p>
          <Button to="/contact" variant="primary">{pageData?.ctaButtonText || "Liên hệ Hỗ trợ"}</Button>
        </div>
      </div>
    </main>
  );
};
