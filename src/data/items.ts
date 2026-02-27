import { createServerFn } from '@tanstack/react-start'

import { firecrawl } from '@/lib/firecrawl'

import { importSchema } from '@/schemas/import'

export const scrapeUrlFn = createServerFn({ method: 'POST' })
  .inputValidator(importSchema)
  .handler(async ({ data }) => {
    const result = await firecrawl.scrape(data.url, {
      formats: ['markdown'],
      onlyMainContent: true,
    })
  })
