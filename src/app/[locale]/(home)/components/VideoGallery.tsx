'use client'

/**
 * VideoGallery Component
 * 
 * @description Displays a curated video gallery section with link to full YouTube channel.
 * Features glassmorphism container and smooth animations.
 * 
 * @returns {JSX.Element} Video gallery section
 */

import React from 'react'
import Videos from '../_components/videos'
import ScrollReveal from '../../components/ScrollReveal'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'
import { ArrowRight } from 'lucide-react'

// ============================================
// MAIN COMPONENT
// ============================================

export default function VideoGallery() {
    const t = useTranslations()

    return (
        <section className='py-24 bg-white relative overflow-hidden'>
            {/* ============================================
                BACKGROUND DECORATION
                ============================================ */}
            {/* Subtle pattern background */}
            <div className='absolute inset-0 wheat-pattern opacity-[0.03]' />

            {/* ============================================
                CONTENT CONTAINER
                ============================================ */}
            <div className='container mx-auto px-4 md:px-8 relative z-10'>
                {/* ============================================
                    SECTION HEADER
                    ============================================ */}
                <div className='flex justify-between items-end mb-12'>
                    {/* Title section */}
                    <ScrollReveal>
                        <div>
                            {/* Category label */}
                            <span className='text-gray-500 font-bold tracking-widest uppercase text-sm mb-2 block'>
                                Media
                            </span>

                            {/* Main heading */}
                            <h2 className='text-3xl md:text-5xl font-bold text-gray-900 tracking-tight'>
                                <span className='gradient-text'>
                                    {t('videos')}
                                </span>
                            </h2>
                        </div>
                    </ScrollReveal>

                    {/* View all link (desktop) */}
                    <ScrollReveal delay={200} className='hidden md:block'>
                        <Link
                            href='https://www.youtube.com/c/OzbekistonFermerlarKengashiuzbfermer/videos'
                            target='_blank'
                            className='flex items-center gap-2 text-primary font-bold hover:text-green-700 transition-colors group'
                        >
                            {t('allVideo')}
                            <ArrowRight size={20} className='group-hover:translate-x-1 transition-transform' />
                        </Link>
                    </ScrollReveal>
                </div>

                {/* ============================================
                    VIDEO CONTAINER
                    ============================================ */}
                <ScrollReveal delay={300}>
                    {/* Glassmorphism container for videos */}
                    <div className='glass-strong p-6 rounded-3xl border border-gray-100 shadow-xl hover:shadow-2xl transition-all duration-500'>
                        <Videos />
                    </div>
                </ScrollReveal>

                {/* ============================================
                    VIEW ALL LINK (MOBILE)
                    ============================================ */}
                <div className='mt-8 md:hidden text-center'>
                    <Link
                        href='https://www.youtube.com/c/OzbekistonFermerlarKengashiuzbfermer/videos'
                        className='inline-flex items-center gap-2 text-primary font-bold'
                    >
                        {t('allVideo')} <ArrowRight size={20} />
                    </Link>
                </div>
            </div>
        </section>
    )
}
