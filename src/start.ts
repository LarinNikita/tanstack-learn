import { createStart, createMiddleware } from '@tanstack/react-start'

import { authMiddleware } from './middlewares/auth'

const loggingMiddleware = createMiddleware({ type: 'request' }).server(
  ({ request, next }) => {
    const url = new URL(request.url)

    return next({ context: { url } })
  },
)

export const startInstance = createStart(() => {
  return {
    requestMiddleware: [loggingMiddleware, authMiddleware],
  }
})
