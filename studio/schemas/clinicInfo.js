export default {
  name: 'clinicInfo',
  title: 'Clinic Info',
  type: 'document',
  fields: [
    {
      name: 'contactTitle',
      title: 'Contact Title',
      type: 'string',
    },
    {
      name: 'contactSubtitle',
      title: 'Contact Subtitle',
      type: 'string',
    },
    {
      name: 'contactDescription',
      title: 'Contact Description',
      type: 'text',
    },
    {
      name: 'address',
      title: 'Address',
      type: 'string',
    },
    {
      name: 'phone',
      title: 'Phone / Zalo',
      type: 'string',
    },
    {
      name: 'zaloLink',
      title: 'Zalo Link',
      type: 'url',
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
    },
    {
      name: 'openingHours',
      title: 'Opening Hours',
      type: 'text',
    }
  ]
}
