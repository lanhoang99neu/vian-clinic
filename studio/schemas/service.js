export default {
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Service Name',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name' }
    },
    {
      name: 'description',
      title: 'Short Description',
      type: 'text',
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Trẻ hóa & Nâng cơ', value: 'Trẻ hóa & Nâng cơ' },
          { title: 'Điều trị da', value: 'Điều trị da' },
          { title: 'Dịch vụ khác', value: 'Dịch vụ khác' }
        ]
      }
    },
    {
      name: 'image',
      title: 'Service Image',
      type: 'image',
      options: { hotspot: true }
    },
    {
      name: 'iconName',
      title: 'Lucide Icon Name',
      type: 'string',
      description: 'e.g., Sparkles, Zap, Activity'
    },
    {
      name: 'content',
      title: 'Detail Content',
      type: 'array',
      of: [{ type: 'block' }]
    }
  ]
}
