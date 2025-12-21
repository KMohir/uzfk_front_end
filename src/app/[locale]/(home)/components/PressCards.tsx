'use client'

/**
 * PressCards Component
 * 
 * @description Displays interactive service/information cards with external links.
 * Features hover lift effects, icon animations, and progress bars.
 * 
 * @returns {JSX.Element} Grid of interactive link cards
 */

import React, { useEffect, useState } from 'react'
import { Link } from '@/i18n/routing'
import { ExternalLink, Loader2 } from 'lucide-react'
import ScrollReveal from '../../components/ScrollReveal'
import { useTranslations, useLocale } from 'next-intl'

// ============================================
// TYPE DEFINITIONS
// ============================================

interface LinkItem {
    url: string
    title_uz: string
    title?: string
    [key: string]: string | undefined
}

// ============================================
// MAIN COMPONENT
// ============================================

export default function PressCards() {
    const t = useTranslations()
    const locale = useLocale()

    // ============================================
    // STATE MANAGEMENT
    // ============================================
    const [links, setLinks] = useState<LinkItem[]>([])
    const [loading, setLoading] = useState(true)

    // ============================================
    // DATA FETCHING
    // ============================================
    useEffect(() => {
        const fetchLinks = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/${locale}/api/links/header/list/`)
                if (response.ok) {
                    const data = await response.json()
                    // If API results are empty or less than 3, provide defaults
                    if (!data.results || data.results.length === 0) {
                        setLinks([
                            { url: 'https://fermerlarminbari.uz/', title_uz: 'Fermerlar minbari' },
                            { url: 'https://kutubxona.uzfk.uz/', title_uz: 'Kutubxona' },
                            { url: '/farm', title_uz: 'Fermerlar markazi' }
                        ])
                    } else {
                        setLinks(data.results)
                    }
                } else {
                    // Fallback on error
                    setLinks([
                        { url: 'https://fermerlarminbari.uz/', title_uz: 'Fermerlar minbari' },
                        { url: 'https://kutubxona.uzfk.uz/', title_uz: 'Kutubxona' },
                        { url: '/farm', title_uz: 'Fermerlar markazi' }
                    ])
                }
            } catch (error) {
                console.error('Failed to fetch links:', error)
                setLinks([
                    { url: 'https://fermerlarminbari.uz/', title_uz: 'Fermerlar minbari' },
                    { url: 'https://kutubxona.uzfk.uz/', title_uz: 'Kutubxona' },
                    { url: '/farm', title_uz: 'Fermerlar markazi' }
                ])
            } finally {
                setLoading(false)
            }
        }
        fetchLinks()
    }, [locale])

    /**
     * Helper to get localized title with fallbacks
     */
    const getLocalizedTitle = (link: LinkItem) => {
        // 1. Try explicit locale-specific title from API (e.g. title_ru, title_oz)
        if (link[`title_${locale}`]) return link[`title_${locale}`]

        // 2. Try matching known items for manual translation (overrides generic 'title' which might be stuck in Uzbek)
        if (link.title_uz) {
            const titleUz = link.title_uz.toLowerCase()
            if (titleUz.includes('minbari')) return t('farmers_tribune')
            if (titleUz.includes('kutubxona')) return t('library')
            if (titleUz.includes('markazi')) return t('farm_info_center')
        }

        // 3. Fallback to generic title (might be Uzbek if API didn't translate)
        if (link.title) return link.title

        // 4. Last resort
        return link.title_uz
    }

    // ============================================
    // LOADING STATE
    // ============================================
    if (loading) {
        return (
            <div className='flex justify-center py-12'>
                <Loader2 className='animate-spin text-primary' size={32} />
            </div>
        )
    }

    return (
        <section className='py-24 relative overflow-hidden'>
            {/* ============================================
                BACKGROUND DECORATION
                ============================================ */}
            {/* Skewed background with primary color */}
            <div className='absolute inset-0 bg-gradient-to-br from-primary/5 via-primary/10 to-secondary/5 -skew-y-3 z-0' />

            {/* ============================================
                CONTENT CONTAINER
                ============================================ */}
            <div className='container mx-auto px-4 relative z-10'>
                {/* ============================================
                    SECTION HEADER
                    ============================================ */}
                <ScrollReveal>
                    <div className='text-center mb-16'>
                        {/* Category badge */}
                        <span className='text-secondary font-bold tracking-widest uppercase text-sm mb-2 block'>
                            {t('interactive')}
                        </span>

                        {/* Main heading */}
                        <h2 className='text-3xl md:text-4xl font-bold text-gray-800'>
                            {t('information')} & {t('services')}
                        </h2>
                    </div>
                </ScrollReveal>

                {/* ============================================
                    CARDS GRID
                    ============================================ */}
                <div className='grid sm:grid-cols-2 lg:grid-cols-4 gap-6'>
                    {links.map((link, index) => (
                        <ScrollReveal key={link.url} delay={index * 100}>
                            <Link
                                href={link.url}
                                target='_blank'
                                className='group block h-full bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:border-secondary/50 transition-all duration-300 hover:shadow-2xl hover:-translate-y-3 hover-lift'
                            >
                                {/* ============================================
                                    CARD HEADER
                                    ============================================ */}
                                <div className='flex justify-between items-start mb-6'>
                                    {/* Icon container with hover effect */}
                                    <div className='w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary group-hover:bg-gradient-primary group-hover:text-white transition-all duration-300 group-hover:scale-110 group-hover:rotate-12'>
                                        <ExternalLink size={24} />
                                    </div>

                                    {/* Card number badge */}
                                    <span className='text-gray-300 group-hover:text-secondary transition-colors font-bold text-lg'>
                                        0{index + 1}
                                    </span>
                                </div>

                                {/* ============================================
                                    CARD CONTENT
                                    ============================================ */}
                                {/* Title with color transition */}
                                <h3 className='text-lg font-bold text-gray-800 group-hover:text-primary transition-colors leading-tight mb-2'>
                                    {getLocalizedTitle(link)}
                                </h3>

                                {/* Animated progress bar */}
                                <div className='w-8 h-1 bg-secondary rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300' />
                            </Link>
                        </ScrollReveal>
                    ))}

                    {/* ============================================
                        STATIC CONTACT CARD (4th Card)
                        ============================================ */}
                    <ScrollReveal delay={links.length * 100}>
                        <Link
                            href='/contact'
                            className='group block h-full bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:border-secondary/50 transition-all duration-300 hover:shadow-2xl hover:-translate-y-3 hover-lift'
                        >
                            <div className='flex justify-between items-start mb-6'>
                                <div className='w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary group-hover:bg-gradient-primary group-hover:text-white transition-all duration-300 group-hover:scale-110 group-hover:rotate-12'>
                                    <ExternalLink size={24} />
                                </div>
                                <span className='text-gray-300 group-hover:text-secondary transition-colors font-bold text-lg'>
                                    0{links.length + 1}
                                </span>
                            </div>
                            <h3 className='text-lg font-bold text-gray-800 group-hover:text-primary transition-colors leading-tight mb-2'>
                                {t('contact_for')}
                            </h3>
                            <div className='w-8 h-1 bg-secondary rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300' />
                        </Link>
                    </ScrollReveal>
                </div>
            </div>
        </section>
    )
}
