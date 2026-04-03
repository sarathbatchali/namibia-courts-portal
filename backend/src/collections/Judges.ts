import type { CollectionConfig } from 'payload'

export const Judges: CollectionConfig = {
  slug: 'judges',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'court'],
    group: 'Organization & Profiles',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'court',
      type: 'select',
      options: [
        { label: 'Supreme Court', value: 'supreme' },
        { label: 'High Court', value: 'high' },
      ],
      required: true,
    },
    {
      name: 'bio',
      type: 'richText',
    },
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
    },
  ],
}
