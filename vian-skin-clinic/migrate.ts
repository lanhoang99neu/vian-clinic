import { getCliClient } from 'sanity/cli'

const client = getCliClient()

function htmlToBlocks(html) {
  const blocks = [];
  const matches = html.matchAll(/<(p|h2)>([\s\S]*?)<\/\1>/g);
  for (const match of matches) {
    blocks.push({
      _type: 'block',
      style: match[1] === 'h2' ? 'h2' : 'normal',
      children: [
        {
          _type: 'span',
          marks: [],
          text: match[2].trim()
        }
      ]
    });
  }
  return blocks;
}

const faqs = [
  {
    _type: 'faq',
    question: "Tôi nên mong đợi điều gì trong lần tư vấn đầu tiên?",
    answer: "Trong lần tư vấn đầu tiên, một trong những bác sĩ da liễu của chúng tôi sẽ đánh giá toàn diện tình trạng da của bạn, thảo luận về những mối quan tâm và mục tiêu, và xây dựng một phác đồ điều trị tùy chỉnh dành riêng cho bạn."
  },
  {
    _type: 'faq',
    question: "Các phương pháp điều trị của bạn có an toàn cho mọi loại da không?",
    answer: "Có, chúng tôi sử dụng nhiều loại công nghệ và phương pháp điều trị có thể thích ứng an toàn cho mọi loại da và màu da. Bác sĩ da liễu sẽ lựa chọn các phương án an toàn và hiệu quả nhất cho hồ sơ da cụ thể của bạn."
  },
  {
    _type: 'faq',
    question: "Thời gian phục hồi cho các phương pháp điều trị bằng laser là bao lâu?",
    answer: "Thời gian phục hồi khác nhau đáng kể tùy thuộc vào loại laser được sử dụng và cường độ điều trị. Nó có thể từ không cần thời gian nghỉ ngơi đối với laser không bóc tách đến 5-7 ngày đối với các quy trình tái tạo chuyên sâu hơn."
  },
  {
    _type: 'faq',
    question: "Tôi có cần ngừng sử dụng các sản phẩm chăm sóc da trước khi điều trị không?",
    answer: "Chúng tôi thường khuyên bạn nên tạm dừng sử dụng các thành phần hoạt tính như Retinols, AHAs và BHAs 3-5 ngày trước các phương pháp điều trị lâm sàng như peel da hoặc laser. Hướng dẫn chăm sóc chi tiết trước khi điều trị sẽ được cung cấp khi bạn đặt lịch."
  }
];

const testimonials = [
  { _type: 'testimonial', rating: 5, text: "Liệu trình điều trị mụn tại đây thực sự đã thay đổi cuộc sống của tôi. Các bác sĩ tại Vian Skin Clinic không chỉ giỏi chuyên môn mà còn rất tận tâm theo sát kết quả.", name: "Minh Anh N.", avatarInitial: "M" },
  { _type: 'testimonial', rating: 4.5, text: "Công nghệ trẻ hóa da bằng laser rất tuyệt vời. Tôi thấy sự khác biệt rõ rệt chỉ sau 2 buổi điều trị. Không gian phòng khám sang trọng và thư giãn.", name: "Lan Hương T.", avatarInitial: "L" },
  { _type: 'testimonial', rating: 5, text: "Chuyên nghiệp, sạch sẽ và hiệu quả rõ rệt. Tôi hoàn toàn tin tưởng Vian Skin Clinic cho mọi nhu cầu chăm sóc da liễu của mình.", name: "Hoàng M.", avatarInitial: "H" }
];

const homepage = {
  _type: 'homepage',
  heroSubtitle: "PHÒNG KHÁM CHUYÊN KHOA DA LIỄU",
  heroTitle: "Vian Skin Clinic",
  heroDescription: "Nuôi dưỡng làn da, Khơi dậy tự tin",
  testimonials: testimonials.map(t => ({ _type: 'object', name: t.name, rating: t.rating, text: t.text, avatarInitial: t.avatarInitial }))
};

const clinicInfo = {
  _type: 'clinicInfo',
  address: "Liền kề A14 - khu nhà ở thấp tầng 108 Nguyễn Trãi - Thượng Đình - Hà Nội",
  phone: "039 851 0688",
  zaloLink: "https://zalo.me/0398510688",
  email: "cskh.nhatminhspacosmetic@gmail.com",
  openingHours: "9:00 - 19:00 tất cả các ngày trong tuần (nhận khách cuối cùng lúc 18:00)"
};

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

const allServices = [
  ...defaultTreHoa.map(s => ({ ...s, category: 'Trẻ hóa & Nâng cơ' })),
  ...defaultDieuTri.map(s => ({ ...s, category: 'Điều trị da' })),
  ...defaultKhac.map(s => ({ ...s, category: 'Dịch vụ khác' }))
];

const articles = [
  {
    id: "retinoids",
    title: "Độ chính xác của Retinoids: Phân tích chuyên sâu về lâm sàng",
    category: "Quy trình chăm sóc da",
    desc: "Cách bổ sung dẫn xuất vitamin A mạnh mẽ vào quy trình chăm sóc của bạn nhằm tối đa hóa hiệu quả trẻ hóa da mà không gây kích ứng hay tổn thương hàng rào bảo vệ.",
    img: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=2000&auto=format&fit=crop",
    readTime: "7 phút đọc",
    content: `
      <p>Khi chúng ta già đi, làn da trải qua một loạt các thay đổi sinh học phức tạp. Một trong những yếu tố quan trọng nhất gây ra lão hóa da rõ rệt là sự chậm lại của quá trình tái tạo tế bào. Vậy quá trình này thực sự có nghĩa là gì, và làm thế nào chúng ta có thể giải quyết nó với Retinoids?</p>
      <h2>Quá trình tái tạo tế bào là gì?</h2>
      <p>Tái tạo tế bào là quá trình làn da tạo ra các tế bào mới ở lớp sâu nhất của biểu bì và loại bỏ các tế bào cũ, chết trên bề mặt. Ở tuổi 20, quá trình này mất khoảng 28 ngày. Khi chúng ta đạt đến độ tuổi 40 và 50, nó có thể mất tới 45-60 ngày.</p>
      <h2>Retinoids hoạt động như thế nào?</h2>
      <p>Retinoids, dẫn xuất từ vitamin A, được coi là tiêu chuẩn vàng trong điều trị lão hóa. Chúng hoạt động ở cấp độ tế bào, báo hiệu cho cơ thể đẩy nhanh quá trình sừng hóa. Bằng cách kích thích sản sinh collagen và thúc đẩy sự thay mới tế bào, retinoids giúp giảm thiểu nếp nhăn, làm đều màu da và hỗ trợ điều trị mụn hiệu quả.</p>
      <p>Tuy nhiên, việc bắt đầu sử dụng retinoids đòi hỏi sự chính xác. Nếu sử dụng quá liều hoặc với nồng độ không phù hợp, nó có thể gây đỏ da, bong tróc và phá vỡ hàng rào bảo vệ tự nhiên của da.</p>
      <h2>Cách tiếp cận chuẩn y khoa</h2>
      <p>Tại Vian Skin Clinic, chúng tôi khuyến cáo phương pháp "bắt đầu thấp và chậm". Sử dụng một lượng nhỏ bằng hạt đậu 2 lần một tuần, và kết hợp chặt chẽ với các thành phần dưỡng ẩm sâu như Ceramide hoặc B5. Sự tư vấn từ chuyên gia da liễu sẽ đảm bảo quy trình của bạn tối ưu và an toàn nhất.</p>
    `
  },
  {
    id: "1",
    title: "Liệu pháp Laser thế hệ mới: Quang nhiệt phân đoạn",
    category: "Tin tức công nghệ",
    desc: "Khám phá cách công nghệ laser phân đoạn đang thay đổi tiêu chuẩn điều trị sẹo và tăng sắc tố.",
    img: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2053&auto=format&fit=crop",
    readTime: "5 phút đọc",
    content: `
      <p>Trong thập kỷ qua, liệu pháp laser đã có những bước tiến vượt bậc. Quang nhiệt phân đoạn (Fractional Photothermolysis) không còn là khái niệm quá xa lạ, nhưng các thế hệ máy mới nhất đã mang công nghệ này lên một tầm cao mới.</p>
      <h2>Cơ chế hoạt động</h2>
      <p>Thay vì tác động lên toàn bộ bề mặt da, laser phân đoạn chỉ chiếu các tia cực nhỏ, tạo ra các tổn thương vi điểm. Các khu vực da lành xung quanh sẽ đóng vai trò như "trạm trung chuyển", gửi tín hiệu phục hồi và tăng tốc sản sinh collagen để sửa chữa các vi điểm này.</p>
      <h2>Hiệu quả trên lâm sàng</h2>
      <p>Công nghệ này đặc biệt hiệu quả với sẹo rỗ lâu năm, rạn da, và tình trạng tăng sắc tố (nám, tàn nhang). Ưu điểm lớn nhất là thời gian nghỉ dưỡng (downtime) được rút ngắn đáng kể so với laser bóc tách truyền thống, đồng thời giảm thiểu rủi ro tăng sắc tố sau viêm (PIH), đặc biệt phù hợp với làn da người châu Á.</p>
    `
  },
  {
    id: "2",
    title: "Cân bằng pH: Lá chắn vô hình trong Da liễu",
    category: "Quy trình chăm sóc da",
    desc: "Tại sao độ pH của các sản phẩm làm sạch lại quyết định sức khỏe hàng rào bảo vệ da của bạn.",
    img: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?q=80&w=2070&auto=format&fit=crop",
    readTime: "4 phút đọc",
    content: `
      <p>Khi nói về chăm sóc da, chúng ta thường nhắc đến các thành phần đắt giá như Retinol, Vitamin C, Peptide. Tuy nhiên, yếu tố cơ bản và quan trọng nhất lại thường bị bỏ qua: độ pH của làn da.</p>
      <h2>Hàng rào axit bảo vệ da (Acid Mantle)</h2>
      <p>Da của chúng ta tự nhiên có tính axit nhẹ, dao động ở mức pH từ 4.5 đến 5.5. Lớp màng axit tự nhiên này (acid mantle) là tuyến phòng thủ đầu tiên chống lại vi khuẩn, chất ô nhiễm, và ngăn ngừa mất nước qua biểu bì (TEWL).</p>
      <h2>Tại sao sữa rửa mặt lại quan trọng?</h2>
      <p>Sử dụng các sản phẩm tẩy rửa có tính kiềm cao (pH > 7), như các loại xà phòng truyền thống, sẽ phá vỡ lớp màng bảo vệ này. Hậu quả là da trở nên khô căng, nhạy cảm, dễ ửng đỏ, và tạo điều kiện lý tưởng cho vi khuẩn C. acnes phát triển, dẫn đến bùng phát mụn.</p>
      <p>Hãy luôn ưu tiên sử dụng sữa rửa mặt dịu nhẹ, độ pH chuẩn (khoảng 5.0 - 5.5) để duy trì sức đề kháng tự nhiên cho làn da của bạn.</p>
    `
  },
  {
    id: "3",
    title: "Mở rộng khu chẩn đoán nâng cao của chúng tôi",
    category: "Cập nhật phòng khám",
    desc: "Cơ sở mới với các thiết bị phân tích da 3D hiện đại giúp chẩn đoán chính xác đến từng nang lông.",
    img: "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?q=80&w=2070&auto=format&fit=crop",
    readTime: "3 phút đọc",
    content: `
      <p>Vian Skin Clinic tự hào thông báo việc khánh thành khu Chẩn đoán Da Liễu Nâng cao, đánh dấu một bước tiến mới trong việc cung cấp dịch vụ khám chữa bệnh tiêu chuẩn quốc tế.</p>
      <h2>Công nghệ phân tích da 3D</h2>
      <p>Chúng tôi đã trang bị hệ thống phân tích da VISIA thế hệ mới nhất. Hệ thống này sử dụng ánh sáng phân cực và tia UV để chụp cắt lớp làn da, hé lộ những vấn đề tiềm ẩn bên dưới bề mặt mà mắt thường không thể nhìn thấy: tổn thương do tia UV, sự phân bố porphyrins (vi khuẩn gây mụn), và kết cấu da.</p>
      <h2>Ý nghĩa đối với khách hàng</h2>
      <p>Với các dữ liệu định lượng chính xác, các bác sĩ có thể thiết kế phác đồ điều trị mang tính cá nhân hóa cao hơn bao giờ hết, theo dõi sự thay đổi theo từng nanomet sau mỗi lần điều trị.</p>
    `
  },
  {
    id: "4",
    title: "Rosacea: Phía sau sự ửng đỏ",
    category: "Thông tin bệnh lý",
    desc: "Tìm hiểu nguyên nhân, yếu tố kích hoạt và phác đồ điều trị đa mô thức cho chứng đỏ da mãn tính.",
    img: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=2070&auto=format&fit=crop",
    readTime: "6 phút đọc",
    content: `
      <p>Chứng đỏ da (Rosacea) là một tình trạng da liễu mãn tính ảnh hưởng đến hàng triệu người, đặc trưng bởi sự ửng đỏ ở vùng trung tâm khuôn mặt, sự xuất hiện của các mạch máu nhỏ li ti, và trong một số trường hợp, các nốt sần giống như mụn trứng cá.</p>
      <h2>Những yếu tố kích hoạt (Triggers) phổ biến</h2>
      <p>Một trong những điều quan trọng nhất trong việc quản lý Rosacea là xác định và tránh các yếu tố kích hoạt. Ánh nắng mặt trời, thức ăn cay nóng, rượu vang đỏ, thay đổi nhiệt độ đột ngột, và căng thẳng tâm lý là những nguyên nhân hàng đầu khiến mạch máu giãn nở mạnh mẽ.</p>
      <h2>Phương pháp tiếp cận điều trị</h2>
      <p>Không có cách chữa trị dứt điểm Rosacea, nhưng hoàn toàn có thể kiểm soát nó. Việc điều trị đòi hỏi sự phối hợp: sử dụng thuốc bôi giảm viêm (như Metronidazole hoặc Azelaic acid), thuốc uống kháng sinh ở liều kháng viêm, và đặc biệt là công nghệ Laser (như Vbeam Pulsed Dye Laser) để nhắm mục tiêu và triệt tiêu các mạch máu giãn nở bất thường.</p>
    `
  },
  {
    id: "5",
    title: "Tối ưu hóa quy trình phục hồi da sau Laser",
    category: "Quy trình chăm sóc da",
    desc: "Hướng dẫn chi tiết cách sử dụng B5, Ceramide và Peptide để rút ngắn thời gian nghỉ dưỡng an toàn.",
    img: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=2070&auto=format&fit=crop",
    readTime: "5 phút đọc",
    content: `
      <p>Thực hiện một liệu trình laser (đặc biệt là laser bóc tách) chỉ là một nửa của chặng đường. Quá trình chăm sóc da tại nhà sau đó mới là yếu tố quyết định để tránh tăng sắc tố sau viêm và tối đa hóa kết quả thẩm mỹ.</p>
      <h2>3 ngày đầu tiên: Nguyên tắc "Ít hơn là Nhiều hơn"</h2>
      <p>Ngay sau laser, làn da đang ở trạng thái cực kỳ mỏng manh và tổn thương. Ưu tiên hàng đầu là cung cấp độ ẩm làm dịu và làm mát. Sử dụng xịt khoáng vô trùng và thoa một lớp kem dưỡng chứa Panthenol (Vitamin B5) hoặc Hyaluronic Acid nguyên chất. Tuyệt đối không sử dụng các hoạt chất treatment như AHA, BHA, Retinol, hay Vitamin C dạng L-AA trong giai đoạn này.</p>
      <h2>Xây dựng lại hàng rào bảo vệ</h2>
      <p>Khi da bắt đầu có dấu hiệu kéo vảy (thường vào ngày thứ 3-4), hãy bổ sung Ceramide và các nhóm Peptide sửa chữa để củng cố "lớp vữa" của hàng rào biểu bì. Chống nắng vật lý với Titanium Dioxide và Zinc Oxide là bắt buộc để bảo vệ lớp da non nớt khỏi tia bức xạ.</p>
    `
  }
];

async function uploadImage(url) {
  if (!url) return undefined;
  try {
    const response = await fetch(url);
    const buffer = await response.arrayBuffer();
    // Dynamically import buffer just in case
    const asset = await client.assets.upload('image', Buffer.from(buffer), { filename: 'image.jpg' });
    return {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: asset._id
      }
    };
  } catch (err) {
    console.error('Failed to upload image', url, err);
    return undefined;
  }
}

async function migrate() {
  console.log('Migrating FAQs...');
  for (const faq of faqs) {
    await client.create(faq);
  }

  console.log('Migrating Testimonials...');
  for (const t of testimonials) {
    await client.create(t);
  }

  console.log('Migrating Homepage...');
  await client.create(homepage);

  console.log('Migrating Clinic Info...');
  await client.create(clinicInfo);

  console.log('Migrating Services...');
  for (const s of allServices) {
    const imgObj = await uploadImage(s.img);
    await client.create({
      _type: 'service',
      name: s.title,
      slug: { current: s.id },
      category: s.category,
      description: s.desc,
      iconName: s.icon,
      image: imgObj
    });
  }

  console.log('Migrating Posts...');
  for (const p of articles) {
    const imgObj = await uploadImage(p.img);
    await client.create({
      _type: 'post',
      title: p.title,
      slug: { current: p.id },
      excerpt: p.desc,
      category: p.category,
      featuredImage: imgObj,
      readTime: p.readTime,
      content: htmlToBlocks(p.content)
    });
  }

  console.log('Migration completed successfully!');
}

migrate().catch(console.error);
