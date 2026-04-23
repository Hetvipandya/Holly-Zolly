import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'HZ backend',

  projectId: '5o6gm3q4',
  dataset: 'categories',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
