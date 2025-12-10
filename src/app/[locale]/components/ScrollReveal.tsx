/**
 * ScrollReveal Component
 * Wraps children to apply a 'fade-in-up' animation when they enter the viewport.
 */
'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

interface ScrollRevealProps {
    children: React.ReactNode
    className?: string
    threshold?: number
    delay?: number
}

export default function ScrollReveal({
    children,
    className,
    threshold = 0.1,
    delay = 0
}: ScrollRevealProps) {
    const ref = useRef<HTMLDivElement>(null)
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true)
                    observer.disconnect()
                }
            },
            { threshold }
        )

        if (ref.current) {
            observer.observe(ref.current)
        }

        return () => observer.disconnect()
    }, [threshold])

    return (
        <div
            ref={ref}
            className={cn(
                'transition-all duration-1000 ease-out transform',
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10',
                className
            )}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    )
}
