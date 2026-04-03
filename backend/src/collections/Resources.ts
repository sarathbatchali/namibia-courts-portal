import type { CollectionConfig } from 'payload'

export const Resources: CollectionConfig = {
  slug: 'resources',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'type', 'courtContext', 'updatedAt'],
    group: 'Document Hub',
  },
  upload: {
    staticDir: 'media/resources',
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Document Title',
    },
    {
      type: 'row',
      fields: [
        {
          name: 'type',
          type: 'select',
          options: [
            { label: 'Legislation (Act/Reg)', value: 'legislation' },
            { label: 'Practice Directive', value: 'directive' },
            { label: 'Form / Precedent', value: 'form' },
            { label: 'Annual Report / Register', value: 'report' },
            { label: 'Speech', value: 'speech' },
            { label: 'Media Release', value: 'news' },
            { label: 'Mediation Diary', value: 'mediation-diary' },
            { label: 'Rules of Court', value: 'rules' },
            { label: 'Fee / Tariff', value: 'fee' },
            { label: 'Constitution', value: 'constitution' },
            { label: 'Handbook / Guide', value: 'handbook' },
          ],
          required: true,
        },
        {
          name: 'courtContext',
          type: 'select',
          options: [
            { label: 'Judiciary (All)', value: 'judiciary' },
            { label: 'Supreme Court', value: 'supreme' },
            { label: 'High Court', value: 'high' },
          ],
          required: true,
          defaultValue: 'judiciary',
        },
      ],
    },
    {
      name: 'effectiveDate',
      type: 'date',
      label: 'Effective / Promulgation Date',
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
        },
      },
    },
    {
      name: 'tags',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: true,
      label: 'Sub-Categories / Tags',
    },
  ],
}
