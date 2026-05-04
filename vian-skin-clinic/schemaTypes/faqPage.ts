import {defineField, defineType} from 'sanity'

export const faqPage = defineType({
  name: 'faqPage',
  title: 'FAQ Page Content',
  type: 'document',
  fields: [
    defineField({
      name: 'pageTitle',
      title: 'Page Title',
      type: 'string',
    }),
    defineField({
      name: 'pageDescription',
      title: 'Page Description',
      type: 'text',
    }),
    defineField({
      name: 'ctaTitle',
      title: 'CTA Box Title',
      type: 'string',
    }),
    defineField({
      name: 'ctaDescription',
      title: 'CTA Box Description',
      type: 'text',
    }),
    defineField({
      name: 'ctaButtonText',
      title: 'CTA Button Text',
      type: 'string',
    }),
  ],
})
