import { createFileRoute, Link } from '@tanstack/react-router'

import { getItemsFn } from '@/data/items'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CopyIcon } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { copyToClipboard } from '@/lib/clipboard'

export const Route = createFileRoute('/dashboard/items/')({
  component: RouteComponent,
  loader: () => getItemsFn(),
})

function RouteComponent() {
  const data = Route.useLoaderData()

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {data.map((item) => (
        <Card
          key={item.id}
          className="group overflow-hidden transition-all hover:shadow-lg pt-0"
        >
          <Link to="/dashboard" className="block">
            {item.ogImage && (
              <div className="aspect-video w-full overflow-hidden bg-muted">
                <img
                  src={item.ogImage}
                  alt={item.title ?? 'Article Thumbnail'}
                  className="size-full object-cover transition-transform group-hover:scale-105"
                />
              </div>
            )}

            <CardHeader className="space-y-3 pt-4">
              <div className="flex items-center justify-between gap-2">
                <Badge
                  variant={
                    item.status === 'COMPLETED' ? 'default' : 'destructive'
                  }
                >
                  {item.status.charAt(0).toUpperCase() +
                    item.status.slice(1).toLowerCase()}
                </Badge>
                <Button
                  onClick={async (e) => {
                    e.preventDefault()
                    await copyToClipboard(item.url)
                  }}
                  variant="outline"
                  size="icon"
                  className="size-8"
                >
                  <CopyIcon className="size-4" />
                </Button>
              </div>
              <CardTitle className="line-clamp-1 text-xl leading-snug group-hover:text-primary transition-colors">
                {item.title}
              </CardTitle>
              {item.author && (
                <p className="text-xs text-muted-foreground">{item.author}</p>
              )}
            </CardHeader>
          </Link>
        </Card>
      ))}
    </div>
  )
}
