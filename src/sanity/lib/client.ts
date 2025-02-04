import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId:process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset:process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion,
  token:"skh6ZZwPFp1cGIPGWhbxjGksscUzs6tBHuPh0T6ompKWLN22UaNFhZbZ8vD5TkmHnjlNETnl8lzQOZ29gj1CJ88c6CJ3wa3EiRpEMYt61Ptn0i6jYuqh7jKQ1YN6xs4skgZtGVfU3L98nl4pBKhJarVfvfZCApHQvlk2LwbYMvP9nCWJg3hH",
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
})
