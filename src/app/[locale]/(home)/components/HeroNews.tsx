'use client'

/**
 * HeroNews Component
 * 
 * @description Main hero section displaying featured news with a large card and sidebar of recent articles.
 * Features glassmorphism effects, smooth animations, and responsive design.
 * 
 * @param {NewsItem | null} mainNews - The primary featured news article
 * @param {NewsItem[]} otherNews - Array of secondary news articles (max 4)
 * 
 * @returns {JSX.Element | null} Hero news section or null if no main news
 */

import React from 'react'
import Image from 'next/image'
import { Link } from '@/i18n/routing'
import { ArrowRight, Calendar } from 'lucide-react'
import { useTranslations, useLocale } from 'next-intl'
import ScrollReveal from '../../components/ScrollReveal'

// ============================================
// TYPE DEFINITIONS
// ============================================

interface NewsItem {
    id: number
    title_uz: string
    title_oz: string
    title_ru: string
    title?: string
    slug: string
    image: string
    created_at: string
}

interface HeroNewsProps {
    mainNews: NewsItem | null
    otherNews: NewsItem[]
}

// ============================================
// MAIN COMPONENT
// ============================================

export default function HeroNews({ mainNews, otherNews }: HeroNewsProps) {
    const t = useTranslations()
    const locale = useLocale()

    // Early return if no main news available
    if (!mainNews) return null

    return (
        <section className='relative flex items-center pt-4 pb-0 overflow-hidden'>
            {/* ============================================
                BACKGROUND LAYERS
                ============================================ */}
            {/* Decorative wheat pattern background */}
            <div className='absolute inset-0 wheat-pattern z-0' />

            {/* Gradient overlay for smooth transition to content below */}
            <div className='absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-white/90 z-0' />

            {/* ============================================
                CONTENT CONTAINER
                ============================================ */}
            <div className='container mx-auto px-4 md:px-8 relative z-10'>
                {/* Section Title */}
                <div className='mb-6 text-center'>
                    <h2 className='text-3xl md:text-5xl font-bold text-gray-900 tracking-tight'>
                        <span className='gradient-text'>
                            {t('nav9')}
                        </span>
                    </h2>
                </div>

                <div className='grid lg:grid-cols-12 gap-8 items-start'>

                    {/* ============================================
                        MAIN FEATURED NEWS CARD
                        ============================================ */}
                    <div className='lg:col-span-7'>
                        <ScrollReveal>
                            <Link
                                href={`/news/${mainNews.slug}`}
                                className='group block relative h-[600px] rounded-3xl overflow-hidden shadow-2xl hover-lift border-glow'
                            >
                                {/* Hero image with zoom effect on hover */}
                                <Image
                                    src={mainNews.image}
                                    alt={locale === 'ru' ? mainNews.title_ru : locale === 'oz' ? (mainNews.title_oz || mainNews.title_uz) : mainNews.title_uz}
                                    fill
                                    className='object-cover transition-transform duration-700 group-hover:scale-110'
                                    priority
                                />

                                {/* Multi-stop gradient overlay for better text readability */}
                                <div className='absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent' />

                                {/* Shimmer effect on hover for premium feel */}
                                <div className='absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500' />

                                {/* Content overlay */}
                                <div className='absolute bottom-0 left-0 p-8 md:p-12 w-full max-w-[85%]'>

                                    {/* Main headline with gradient text on hover */}
                                    <h1 className='text-2xl md:text-4xl font-bold text-white leading-tight mb-4 group-hover:gradient-text transition-all line-clamp-3'>
                                        {locale === 'ru' ? mainNews.title_ru : locale === 'oz' ? (mainNews.title_oz || mainNews.title_uz) : mainNews.title_uz}
                                    </h1>

                                    {/* Metadata and CTA */}
                                    <div className='flex items-center text-gray-300 gap-4'>
                                        {/* Publication date */}
                                        <span className='flex items-center gap-2'>
                                            <Calendar size={18} />
                                            {new Date(mainNews.created_at).toLocaleDateString()}
                                        </span>

                                        {/* Read more link with slide animation */}
                                        <span className='flex items-center gap-1 text-secondary font-medium group-hover:translate-x-2 transition-transform'>
                                            {t('readMore')} <ArrowRight size={18} className='animate-float' />
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        </ScrollReveal>
                    </div>

                    {/* ============================================
                        SIDEBAR NEWS LIST
                        ============================================ */}
                    <div className='lg:col-span-5 flex flex-col gap-4 h-[600px]'>
                        {/* Map through secondary news items with staggered animation */}
                        {otherNews.map((news, index) => (
                            <ScrollReveal key={news.id} delay={index * 150} className='flex-1'>
                                <Link
                                    href={`/news/${news.slug}`}
                                    className='group flex gap-4 glass-strong p-4 rounded-2xl hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-primary/20 h-full'
                                >
                                    {/* Thumbnail with zoom effect */}
                                    <div className='relative w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden'>
                                        <Image
                                            src={news.image}
                                            alt={locale === 'ru' ? news.title_ru : locale === 'oz' ? (news.title_oz || news.title_uz) : news.title_uz}
                                            fill
                                            className='object-cover group-hover:scale-110 transition-transform duration-500'
                                        />
                                    </div>

                                    {/* News metadata and title */}
                                    <div className='flex flex-col justify-center'>
                                        {/* Date */}
                                        <span className='text-xs text-gray-500 flex items-center gap-1 mb-1'>
                                            <Calendar size={12} />
                                            {new Date(news.created_at).toLocaleDateString()}
                                        </span>

                                        <h3 className='font-bold text-gray-800 leading-snug group-hover:text-[#078D3A] transition-colors line-clamp-2'>
                                            {news.title}
                                        </h3>
                                    </div>
                                </Link>
                            </ScrollReveal>
                        ))}

                        {/* ============================================
                            VIEW ALL NEWS CTA
                            ============================================ */}
                        <ScrollReveal delay={400}>
                            <Link
                                href='/news'
                                className='w-full py-4 flex items-center justify-center gap-2 gradient-primary text-white font-bold rounded-2xl hover:shadow-2xl hover:scale-105 transition-all duration-300'
                            >
                                {t('allNew')} <ArrowRight size={20} className='group-hover:translate-x-1 transition-transform' />
                            </Link>
                        </ScrollReveal>
                    </div>
                </div>
            </div>
        </section>
    )
}
