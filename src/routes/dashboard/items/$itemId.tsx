import {
  ArrowLeftIcon,
  CalendarIcon,
  ChevronDownIcon,
  ClockIcon,
  ExternalLinkIcon,
  UserIcon,
} from 'lucide-react'
import { createFileRoute, Link } from '@tanstack/react-router'

import { getItemById } from '@/data/items'

import { Button, buttonVariants } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { cn } from '@/lib/utils'
import { Card, CardContent } from '@/components/ui/card'
import { useState } from 'react'
import { MessageResponse } from '@/components/ai-elements/message'

export const Route = createFileRoute('/dashboard/items/$itemId')({
  component: RouteComponent,
  loader: ({ params }) => getItemById({ data: { id: params.itemId } }),
})

function RouteComponent() {
  const data = Route.useLoaderData()
  const [contentOpen, setContentOpen] = useState(false)

  return (
    <div className="mx-auto max-w-3xl space-y-6 w-full">
      <div className="flex justify-start">
        <Link
          to="/dashboard/items"
          className={buttonVariants({ variant: 'outline' })}
        >
          <ArrowLeftIcon className="" />
          Go Back
        </Link>
      </div>

      {data.ogImage && (
        <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-muted">
          <img
            className="size-full object-cover transition-transform duration-300 hover:scale-105"
            src={data.ogImage}
            alt={data.title ?? 'Article Image'}
          />
        </div>
      )}

      <div className="space-y-3">
        <h1 className="text-3xl font-bold tracking-tight">
          {data.title ?? 'Untitled'}
        </h1>
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          {data.author && (
            <span className="inline-flex items-center gap-1">
              <UserIcon className="size-3.5" />
              {data.author}
            </span>
          )}

          {data.publishedAt && (
            <span className="inline-flex items-center gap-1">
              <CalendarIcon className="size-3.5" />
              {new Date(data.publishedAt).toLocaleDateString('en-US')}
            </span>
          )}

          <span className="inline-flex items-center gap-1">
            <ClockIcon className="size-3.5" />
            Saved {new Date(data.createdAt).toLocaleDateString('en-US')}
          </span>
        </div>

        <a
          href={data.url}
          target="_blank"
          className="text-primary hover:underline inline-flex items-center gap-1 text-sm"
        >
          View Original
          <ExternalLinkIcon className="size-3.5" />
        </a>

        {data.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {data.tags.map((tag) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </div>
        )}

        {/* // TODO implement summary section */}
        <p>Summary data</p>

        {data.content && (
          <Collapsible open={contentOpen} onOpenChange={setContentOpen}>
            <CollapsibleTrigger asChild>
              <Button variant="outline" className="w-full justify-between">
                <span className="font-medium">Full Content</span>
                <ChevronDownIcon
                  className={cn(
                    contentOpen ? 'rotate-180' : '',
                    'size-4 transition-transform duration-200',
                  )}
                />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <Card className="mt-2">
                <CardContent>
                  <MessageResponse>{data.content}</MessageResponse>
                </CardContent>
              </Card>
            </CollapsibleContent>
          </Collapsible>
        )}
      </div>
    </div>
  )
}
