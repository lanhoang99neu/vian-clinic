import { createClient } from '@sanity/client';

export const sanityClient = createClient({
  projectId: 'ni553t94',
  dataset: 'production',
  useCdn: false, // Set to false to ensure real-time updates when content is published
  apiVersion: '2023-05-03', // Use a recent date-string
  stega: {
    enabled: true,
    studioUrl: 'http://localhost:3333',
  },
});
