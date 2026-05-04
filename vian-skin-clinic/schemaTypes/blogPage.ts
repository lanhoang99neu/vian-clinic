import {defineField, defineType} from 'sanity'

export const blogPage = defineType({
  name: 'blogPage',
  title: 'Blog Page Content',
  type: 'document',
  fields: [
    defineField({
      name: 'pageTitle',
      title: 'Page Title',
      type: 'string',
    }),
    defineField({
      name: 'searchPlaceholder',
      title: 'Search Placeholder Text',
      type: 'string',
    }),
    defineField({
      name: 'categories',
      title: 'Available Categories',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Used for the filter chips at the top of the blog page.',
    }),
  ],
})
