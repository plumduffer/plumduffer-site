import path from 'path'

import { payloadCloud } from '@payloadcms/plugin-cloud'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { webpackBundler } from '@payloadcms/bundler-webpack'
import { slateEditor } from '@payloadcms/richtext-slate'
import { buildConfig } from 'payload/config'
import { restrictViewer } from './access/restrictViewer'

import Users from './collections/Users'
import Pages from './collections/Pages'

const publicCollections = [];
const passwordProtectedCollections = [Pages];
const massAccessControlledCollections = [publicCollections, passwordProtectedCollections].flat();

massAccessControlledCollections.forEach(collection => {
  collection.access ??= {};
  ['create', 'update', 'delete'].forEach(mutation => {
    collection.access[mutation] ??= restrictViewer
  });
})

publicCollections.forEach(collection => collection.access.read ??= () => true);

export default buildConfig({
  admin: {
    user: Users.slug,
    bundler: webpackBundler(),
  },
  editor: slateEditor({}),
  collections: [Users, ...massAccessControlledCollections],
  cors: [
    'https://plumduffer.lndo.site'
  ],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
  plugins: [payloadCloud()],
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI,
    },
  }),
})
