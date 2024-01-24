import { CollectionConfig } from 'payload/types'
import { isAdmin, isAdminFieldLevel } from '../access/isAdmin'
import { isAdminOrSelf } from '../access/isAdminOrSelf'
import { restrictViewer } from '../access/restrictViewer'

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
  fields: [
    {
      name: 'roles',
      saveToJWT: true,
      type: 'select',
      hasMany: true,
      defaultValue: ['viewer'],
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
          return `Setting 'Viewer Only' on yourself will lock you out of the admin panel. Aborting action.`;
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
