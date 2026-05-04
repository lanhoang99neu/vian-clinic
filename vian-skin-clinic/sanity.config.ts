import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {presentationTool} from 'sanity/presentation'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'vian-skin-clinic',

  projectId: 'ni553t94',
  dataset: 'production',

  plugins: [
    structureTool(), 
    visionTool(),
    presentationTool({
      previewUrl: 'http://localhost:5173',
    }),
  ],

  schema: {
    types: schemaTypes,
  },
})
