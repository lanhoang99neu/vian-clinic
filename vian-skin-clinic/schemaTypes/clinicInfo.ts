import {defineField, defineType} from 'sanity'

export const clinicInfo = defineType({
  name: 'clinicInfo',
  title: 'Clinic Information',
  type: 'document',
  fields: [
    defineField({
      name: 'address',
      title: 'Address',
      type: 'string',
    }),
    defineField({
      name: 'phone',
      title: 'Phone / Zalo Display Text',
      type: 'string',
    }),
    defineField({
      name: 'zaloLink',
      title: 'Zalo Link',
      type: 'url',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
    }),
    defineField({
      name: 'openingHours',
      title: 'Opening Hours',
      type: 'text',
    }),
    defineField({
      name: 'contactTitle',
      title: 'Contact Title',
      type: 'string',
    }),
    defineField({
      name: 'contactSubtitle',
      title: 'Contact Subtitle',
      type: 'string',
    }),
    defineField({
      name: 'contactDescription',
      title: 'Contact Description',
      type: 'text',
    }),
    defineField({
      name: 'contactPageTitle',
      title: 'Contact Page Title',
      type: 'string',
    }),
    defineField({
      name: 'contactPageDescription',
      title: 'Contact Page Description',
      type: 'text',
    }),
    defineField({
      name: 'mapImage',
      title: 'Map Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
})
