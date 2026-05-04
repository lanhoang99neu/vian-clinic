import {defineField, defineType} from 'sanity'

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Customer Name',
      type: 'string',
    }),
    defineField({
      name: 'avatarInitial',
      title: 'Avatar Initial',
      type: 'string',
      description: 'e.g. M, L, H (leave empty to auto-generate from name)',
    }),
    defineField({
      name: 'rating',
      title: 'Rating',
      type: 'number',
      description: 'e.g. 4.5 or 5',
    }),
    defineField({
      name: 'text',
      title: 'Testimonial Text',
      type: 'text',
    }),
  ],
})
