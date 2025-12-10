'use client'

import React from 'react'
import Image from 'next/image'
import { Link } from '@/i18n/routing'
import { ArrowRight, Calendar } from 'lucide-react'
import { useTranslations } from 'next-intl'
import ScrollReveal from '../../components/ScrollReveal'

interface NewsItem {
    id: number
    title: string
    slug: string
    image: string
    created_at: string
}

interface HeroNewsProps {
    mainNews: NewsItem | null
    otherNews: NewsItem[]
}

export default function HeroNews({ mainNews, otherNews }: HeroNewsProps) {
    const t = useTranslations()

    if (!mainNews) return null

    return (
        <section className='relative min-h-[85vh] flex items-center pt-24 pb-12 overflow-hidden'>
            {/* Background Pattern */}
            <div className='absolute inset-0 wheat-pattern z-0' />
            <div className='absolute inset-0 bg-gradient-to-b from-transparent to-white/90 z-0' />

            <div className='container mx-auto px-4 relative z-10'>
                <div className='grid lg:grid-cols-12 gap-8 items-start'>

                    {/* Main Featured News */}
                    <div className='lg:col-span-8'>
                        <ScrollReveal>
                            <Link href={`/news/${mainNews.slug}`} className='group block relative h-[500px] rounded-3xl overflow-hidden shadow-2xl'>
                                <Image
                                    src={mainNews.image}
                                    alt={mainNews.title}
                                    fill
                                    className='object-cover transition-transform duration-700 group-hover:scale-110'
                                />
                                <div className='absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent' />

                                <div className='absolute bottom-0 left-0 p-8 md:p-12 w-full'>
                                    <span className='inline-block px-4 py-1.5 bg-secondary text-white text-sm font-bold rounded-full mb-4 animate-pulse-slow'>
                                        {t('news')}
                                    </span>
                                    <h1 className='text-3xl md:text-5xl font-bold text-white leading-tight mb-4 group-hover:text-secondary transition-colors'>
                                        {mainNews.title}
                                    </h1>
                                    <div className='flex items-center text-gray-300 gap-4'>
                                        <span className='flex items-center gap-2'>
                                            <Calendar size={18} />
                                            {new Date(mainNews.created_at).toLocaleDateString()}
                                        </span>
                                        <span className='flex items-center gap-1 text-secondary font-medium group-hover:translate-x-2 transition-transform'>
                                            {t('readMore')} <ArrowRight size={18} />
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        </ScrollReveal>
                    </div>

                    {/* Side News List */}
                    <div className='lg:col-span-4 flex flex-col gap-6 h-full justify-between'>
                        {otherNews.map((news, index) => (
                            <ScrollReveal key={news.id} delay={index * 150} className='flex-1'>
                                <Link href={`/news/${news.slug}`} className='group flex gap-4 bg-white/50 backdrop-blur-sm p-4 rounded-2xl hover:bg-white hover:shadow-lg transition-all border border-transparent hover:border-secondary/20'>
                                    <div className='relative w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden'>
                                        <Image
                                            src={news.image}
                                            alt={news.title}
                                            fill
                                            className='object-cover group-hover:scale-110 transition-transform duration-500'
                                        />
                                    </div>
                                    <div className='flex flex-col justify-center'>
                                        <span className='text-xs text-gray-500 flex items-center gap-1 mb-1'>
                                            <Calendar size={12} />
                                            {new Date(news.created_at).toLocaleDateString()}
                                        </span>
                                        <h3 className='font-bold text-gray-800 leading-snug group-hover:text-secondary transition-colors line-clamp-2'>
                                            {news.title}
                                        </h3>
                                    </div>
                                </Link>
                            </ScrollReveal>
                        ))}

                        <ScrollReveal delay={400}>
                            <Link href='/news' className='w-full py-4 flex items-center justify-center gap-2 bg-primary/10 text-primary font-bold rounded-2xl hover:bg-primary hover:text-white transition-all'>
                                {t('allNew')} <ArrowRight size={20} />
                            </Link>
                        </ScrollReveal>
                    </div>
                </div>
            </div>
        </section>
    )
}
