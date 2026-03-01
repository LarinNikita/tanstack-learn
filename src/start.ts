import { createStart, createMiddleware } from '@tanstack/react-start'

import { authMiddleware } from './middlewares/auth'

const loggingMiddleware = createMiddleware({ type: 'request' }).server(
  ({ next }) => {
    return next()
  },
)

export const startInstance = createStart(() => {
  return {
    requestMiddleware: [loggingMiddleware, authMiddleware],
  }
})
