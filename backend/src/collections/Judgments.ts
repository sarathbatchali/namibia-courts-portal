import type { CollectionConfig } from 'payload'

export const Judgments: CollectionConfig = {
  slug: 'judgments',
  admin: {
    useAsTitle: 'caseTitle',
    defaultColumns: ['caseTitle', 'court', 'category', 'judgmentDate'],
    group: 'Document Hub',
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Case Information',
          fields: [
            {
              name: 'caseTitle',
              type: 'text',
              required: true,
              label: 'Case Name / Title',
            },
            {
              name: 'caseNumber',
              type: 'text',
              required: true,
            },
            {
              name: 'judgmentDate',
              type: 'date',
              required: true,
              admin: {
                date: {
                  pickerAppearance: 'dayOnly',
                },
              },
            },
            {
              name: 'file',
              type: 'relationship',
              relationTo: 'media',
              required: false,
            },
            {
              name: 'judge',
              type: 'relationship',
              relationTo: 'judges',
              hasMany: true,
            },
          ],
        },
        {
          label: 'Taxonomy',
          fields: [
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
              name: 'category',
              type: 'select',
              options: [
                { label: 'Civil', value: 'civil' },
                { label: 'Criminal', value: 'criminal' },
                { label: 'Labour', value: 'labour' },
                { label: 'Tax', value: 'tax' },
                { label: 'Constitutional', value: 'constitutional' },
              ],
              required: true,
            },
            {
              name: 'division',
              type: 'select',
              options: [
                { label: 'Main (Windhoek)', value: 'windhoek' },
                { label: 'Coastal (Walvis Bay)', value: 'walvis-bay' },
                { label: 'Northern (Oshakati)', value: 'oshakati' },
              ],
            },
            {
              name: 'externalUrl',
              type: 'text',
              label: 'External Document URL',
              admin: {
                description: 'Use this if the document is hosted elsewhere (e.g., eJustice)',
              },
            },
          ],
        },
      ],
    },
  ],
}
