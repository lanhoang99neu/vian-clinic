export default {
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  fields: [
    {
      name: 'heroSubtitle',
      title: 'Hero Subtitle',
      type: 'string',
    },
    {
      name: 'heroTitle',
      title: 'Hero Title',
      type: 'string',
    },
    {
      name: 'heroDescription',
      title: 'Hero Description',
      type: 'text',
    },
    {
      name: 'aboutDescription',
      title: 'About Description',
      type: 'text',
    },
    {
      name: 'testimonials',
      title: 'Testimonials',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', title: 'Reviewer Name', type: 'string' },
            { name: 'rating', title: 'Rating (1-5)', type: 'number' },
            { name: 'text', title: 'Review Text', type: 'text' },
            { name: 'avatarInitial', title: 'Avatar Initial', type: 'string' }
          ]
        }
      ]
    }
  ]
}
