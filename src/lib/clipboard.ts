import { toast } from 'sonner'
import { createClientOnlyFn } from '@tanstack/react-start'

export const copyToClipboard = createClientOnlyFn(async (url: string) => {
  await navigator.clipboard.writeText(url)
  toast.success('URL copied to clipboard!')
  return true
})
