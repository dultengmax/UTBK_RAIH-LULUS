import Image from 'next/image'
import Link from 'next/link'

import { BRAND } from '@/lib/brand'
import { cn } from '@/lib/utils'

interface BrandLogoProps {
  href?: string
  showName?: boolean
  subtitle?: string
  theme?: 'light' | 'dark'
  size?: number
  priority?: boolean
  className?: string
  titleClassName?: string
  subtitleClassName?: string
  logoClassName?: string
  logoWrapperClassName?: string
}

export function BrandLogo({
  href = '/',
  showName = true,
  subtitle,
  theme = 'dark',
  size = 40,
  priority = false,
  className,
  titleClassName,
  subtitleClassName,
  logoClassName,
  logoWrapperClassName,
}: BrandLogoProps) {
  const content = (
    <div className={cn('flex items-center gap-3', className)}>
      <span
        className={cn(
          'flex shrink-0 items-center justify-center overflow-hidden rounded-2xl border bg-white shadow-sm',
          theme === 'light' ? 'border-white/15 bg-white/95' : 'border-slate-200/80 bg-white',
          logoWrapperClassName,
        )}
        style={{ width: size, height: size }}
      >
        <Image
          src={BRAND.logoSrc}
          alt={`${BRAND.displayName} logo`}
          width={size}
          height={size}
          priority={priority}
          className={cn('h-full w-full object-contain p-1.5', logoClassName)}
        />
      </span>

      {showName ? (
        <span className="flex min-w-0 flex-col">
          <span
            className={cn(
              'truncate text-base font-semibold tracking-tight',
              theme === 'light' ? 'text-white' : 'text-slate-950',
              titleClassName,
            )}
          >
            {BRAND.displayName}
          </span>
          {subtitle ? (
            <span
              className={cn(
                'truncate text-xs',
                theme === 'light' ? 'text-white/70' : 'text-slate-500',
                subtitleClassName,
              )}
            >
              {subtitle}
            </span>
          ) : null}
        </span>
      ) : null}
    </div>
  )

  if (!href) {
    return content
  }

  return (
    <Link href={href} aria-label={`${BRAND.displayName} home`} className="inline-flex">
      {content}
    </Link>
  )
}
