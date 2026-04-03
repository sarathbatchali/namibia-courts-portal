import type { CollectionConfig } from 'payload'

export const CourtRolls: CollectionConfig = {
  slug: 'court-rolls',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'court', 'rollType', 'rollDate'],
    group: 'Document Hub',
  },
  upload: {
    staticDir: 'media/rolls',
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
      label: 'Roll Title',
    },
    {
      type: 'row',
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
          name: 'division',
          type: 'select',
          options: [
            { label: 'Main (Windhoek)', value: 'windhoek' },
            { label: 'Coastal (Walvis Bay)', value: 'walvis-bay' },
            { label: 'Northern (Oshakati)', value: 'oshakati' },
          ],
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'rollType',
          type: 'select',
          options: [
            { label: 'Day Rolls', value: 'day' },
            { label: 'Motion Court Rolls', value: 'motion' },
            { label: 'Continuous Rolls', value: 'continuous' },
            { label: 'Fixed Dates', value: 'fixed' },
          ],
          required: true,
        },
        {
          name: 'rollDate',
          type: 'date',
          required: true,
          admin: {
            date: {
              pickerAppearance: 'dayOnly',
            },
          },
        },
      ],
    },
  ],
}
