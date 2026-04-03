import type { CollectionConfig } from 'payload'

export const Documents: CollectionConfig = {
  slug: 'documents',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'displayDate', 'updatedAt'],
    listSearchableFields: ['title', 'category'],
  },
  upload: {
    staticDir: 'media/documents',
    disableLocalStorage: false, // We'll use local storage during development
  },
  access: {
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
    read: () => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'File Info',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
            },
            {
              name: 'version',
              type: 'text',
              required: true,
              defaultValue: '1.0',
            },
            {
              name: 'displayDate',
              type: 'date',
              admin: {
                date: {
                  pickerAppearance: 'dayOnly',
                },
              },
            },
          ]
        },
        {
          label: 'Categorization',
          fields: [
            {
              name: 'category',
              type: 'relationship',
              relationTo: 'categories',
              hasMany: false,
            },
            {
              name: 'sections',
              type: 'relationship',
              relationTo: 'sections',
              hasMany: true,
            }
          ]
        }
      ]
    }
  ],
}
