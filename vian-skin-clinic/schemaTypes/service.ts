import {defineField, defineType} from 'sanity'

export const service = defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Service Name',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Trẻ hóa & Nâng cơ', value: 'Trẻ hóa & Nâng cơ'},
          {title: 'Điều trị da', value: 'Điều trị da'},
          {title: 'Dịch vụ khác', value: 'Dịch vụ khác'},
        ],
      },
    }),
    defineField({
      name: 'description',
      title: 'Short Description',
      type: 'text',
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'string',
      description: 'e.g. 1.500.000 VNĐ (Optional)',
    }),
    defineField({
      name: 'iconName',
      title: 'Icon Name',
      type: 'string',
      description: 'Used for Trẻ hóa & Nâng cơ (e.g. Activity, Zap, Droplet, Sun, Smile, Sparkles)',
    }),
    defineField({
      name: 'image',
      title: 'Service Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'content',
      title: 'Detailed Content',
      type: 'array',
      of: [{type: 'block'}],
    }),
  ],
})
