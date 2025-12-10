'use client'

import React from 'react'
import Videos from '../_components/videos'
import ScrollReveal from '../../components/ScrollReveal'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'
import { ArrowRight, Play } from 'lucide-react'

export default function VideoGallery() {
    const t = useTranslations()

    return (
        <section className='py-24 bg-primary text-white relative overflow-hidden'>
            <div className='absolute inset-0 wheat-pattern opacity-5 mix-blend-overlay' />

            <div className='container mx-auto px-4 relative z-10'>
                <div className='flex justify-between items-end mb-12'>
                    <ScrollReveal>
                        <div>
                            <span className='text-secondary font-bold tracking-widest uppercase text-sm mb-2 block'>
                                Media
                            </span>
                            <h2 className='text-3xl md:text-5xl font-bold'>
                                {t('videos')}
                            </h2>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal delay={200} className='hidden md:block'>
                        <Link
                            href='https://www.youtube.com/c/OzbekistonFermerlarKengashiuzbfermer/videos'
                            target='_blank'
                            className='flex items-center gap-2 text-secondary font-bold hover:text-white transition-colors'
                        >
                            {t('allVideo')} <ArrowRight size={20} />
                        </Link>
                    </ScrollReveal>
                </div>

                <ScrollReveal delay={300}>
                    <div className='bg-white/5 backdrop-blur-sm p-6 rounded-3xl border border-white/10'>
                        <Videos />
                    </div>
                </ScrollReveal>

                <div className='mt-8 md:hidden text-center'>
                    <Link
                        href='https://www.youtube.com/c/OzbekistonFermerlarKengashiuzbfermer/videos'
                        className='inline-flex items-center gap-2 text-secondary font-bold'
                    >
                        {t('allVideo')} <ArrowRight size={20} />
                    </Link>
                </div>
            </div>
        </section>
    )
}
