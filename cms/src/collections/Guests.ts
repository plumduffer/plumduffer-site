import { CollectionConfig } from 'payload/types'

const Guests: CollectionConfig = {
  slug: 'guests',
  auth: true,
  admin: {
    useAsTitle: 'email',
  },
  fields: [
    // Email added by default
    // Add more fields as needed
  ],
}

export default Guests
