import { createFileRoute } from '@tanstack/react-router'

import { Navbar } from '@/components/web/navbar'
import { ComponentExample } from '@/components/component-example'

export const Route = createFileRoute('/')({ component: App })

function App() {
  return (
    <div>
      <Navbar />
      <ComponentExample />
    </div>
  )
}
