import {defineField, defineType} from 'sanity'

export const homepage = defineType({
  name: 'homepage',
  title: 'Homepage Content',
  type: 'document',
  fields: [
    defineField({
      name: 'heroSubtitle',
      title: 'Hero Subtitle',
      type: 'string',
    }),
    defineField({
      name: 'heroTitle',
      title: 'Hero Title',
      type: 'string',
    }),
    defineField({
      name: 'heroDescription',
      title: 'Hero Description',
      type: 'string',
    }),
    defineField({
      name: 'heroBodyText',
      title: 'Hero Body Text',
      type: 'text',
      initialValue: 'Trải nghiệm dịch vụ chăm sóc da liễu cao cấp kết hợp giữa chuyên môn y khoa và độ chính xác thẩm mỹ. Hành trình tìm lại làn da rạng rỡ của bạn bắt đầu cùng các chuyên gia hàng đầu.',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'primaryButtonText',
      title: 'Primary Button Text',
      type: 'string',
    }),
    defineField({
      name: 'secondaryButtonText',
      title: 'Secondary Button Text',
      type: 'string',
    }),
    
    // About Section
    defineField({
      name: 'aboutSubtitle',
      title: 'About Subtitle',
      type: 'string',
    }),
    defineField({
      name: 'aboutTitle',
      title: 'About Title',
      type: 'string',
    }),
    defineField({
      name: 'aboutDescription',
      title: 'About Description',
      type: 'text',
      initialValue: 'Với đội ngũ bác sĩ chuyên khoa da liễu giàu kinh nghiệm và hệ thống thiết bị hiện đại, chúng tôi cam kết mang lại kết quả điều trị tốt nhất cho từng khách hàng.',
    }),
    defineField({
      name: 'aboutFeatures',
      title: 'About Features (Stats)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'title', type: 'string', title: 'Feature Title'},
            {name: 'description', type: 'text', title: 'Feature Description'},
          ]
        }
      ]
    }),

    // Services Section
    defineField({
      name: 'servicesPreviewTitle',
      title: 'Services Preview Title',
      type: 'string',
    }),
    defineField({
      name: 'servicesPreviewDescription',
      title: 'Services Preview Description',
      type: 'text',
    }),
    defineField({
      name: 'servicesPreviewButtonText',
      title: 'Services Preview Button Text',
      type: 'string',
    }),

    // Testimonials
    defineField({
      name: 'testimonialsTitle',
      title: 'Testimonials Section Title',
      type: 'string',
    }),
    defineField({
      name: 'testimonials',
      title: 'Selected Testimonials',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {name: 'name', type: 'string', title: 'Customer Name'},
          {name: 'avatarInitial', type: 'string', title: 'Avatar Initial', description: 'e.g. M, L, H (leave empty to auto-generate from name)'},
          {name: 'rating', type: 'number', title: 'Rating', description: 'e.g. 4.5 or 5'},
          {name: 'text', type: 'text', title: 'Testimonial Text'},
        ]
      }],
      description: 'Select testimonials to display on the homepage.',
    }),

    // CTA Section
    defineField({
      name: 'ctaSubtitle',
      title: 'CTA Section Subtitle',
      type: 'string',
    }),
    defineField({
      name: 'ctaTitle',
      title: 'CTA Section Title',
      type: 'string',
    }),
    defineField({
      name: 'ctaDescription',
      title: 'CTA Section Description',
      type: 'text',
    }),
    defineField({
      name: 'ctaButtonText',
      title: 'CTA Button Text',
      type: 'string',
    }),
    // Contact Section
    defineField({
      name: 'contactSectionLabel',
      title: 'Contact Section Label',
      type: 'string',
      initialValue: 'THÔNG TIN LIÊN HỆ',
    }),
    defineField({
      name: 'contactSectionTitle',
      title: 'Contact Section Title',
      type: 'string',
      initialValue: 'Đồng hành cùng bạn trên chặng đường chăm sóc da',
    }),
    defineField({
      name: 'contactSectionDescription',
      title: 'Contact Section Description',
      type: 'text',
      initialValue: 'Tại Vian Skin Clinic, chúng tôi tin rằng mỗi làn da đều có câu chuyện riêng. Các bác sĩ và chuyên gia của chúng tôi luôn sẵn sàng lắng nghe, thấu hiểu và cung cấp các giải pháp thẩm mỹ an toàn, hiệu quả và tối ưu nhất cho bạn.',
    }),
  ],
})
