import { CollectionConfig } from 'payload/types'
import { isAdmin, isAdminFieldLevel } from '../access/isAdmin'
import { isAdminOrSelf } from '../access/isAdminOrSelf'
import { restrictViewer } from '../access/restrictViewer'
import payload from 'payload'

const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'email',
  },
  access: {
    create: isAdmin,
    read: isAdminOrSelf,
    update: isAdmin,
    delete: isAdmin,
    admin: restrictViewer
  },
  hooks: {
    beforeValidate: [async ({ data, operation }) => {
      if (operation !== 'create') return data;
      const users = await payload.find({
        collection: 'users',
        depth: 0,
        limit: 1,
        pagination: false,
      });
      if (users.docs.length) return data;
      data.roles = ['admin'];
      return data;
    }]
  },
  fields: [
    {
      name: 'roles',
      saveToJWT: true,
      type: 'select',
      hasMany: true,
      defaultValue: ['viewer'],
      admin: {
        description: `Choosing 'Viewer Only' will overwrite all other roles. The user will no longer have access to the content management system. They will only be able to view password protected pages.`
      },
      access: {
        create: isAdminFieldLevel,
        update: isAdminFieldLevel
      },
      hooks: {
        beforeValidate: [({ value }) => {
          if (!value) return [];
          if (!value.includes('viewer')) return value;
          return ['viewer'];
        }]
      },
      validate: (val, { operation, id, user }) => {
        if (operation === 'create') return true;
        if (val.includes('viewer') && +id === +user.id) {
          return `Setting 'Viewer Only' on yourself will lock you out of the content management system. Aborting action.`;
        }
        return true;
      },
      options: [
        {
          label: 'Admin',
          value: 'admin'
        },
        {
          label: 'Viewer Only',
          value: 'viewer'
        }
      ]
    }
  ],
}

export default Users
