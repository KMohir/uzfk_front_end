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
        <section className='py-24 bg-white relative overflow-hidden'>
            <div className='absolute inset-0 wheat-pattern opacity-[0.03]' />

            <div className='container mx-auto px-4 md:px-8 relative z-10'>
                <div className='flex justify-between items-end mb-12'>
                    <ScrollReveal>
                        <div>
                            <span className='text-gray-500 font-bold tracking-widest uppercase text-sm mb-2 block'>
                                Media
                            </span>
                            <h2 className='text-3xl md:text-5xl font-bold text-gray-900'>
                                {t('videos')}
                            </h2>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal delay={200} className='hidden md:block'>
                        <Link
                            href='https://www.youtube.com/c/OzbekistonFermerlarKengashiuzbfermer/videos'
                            target='_blank'
                            className='flex items-center gap-2 text-primary font-bold hover:text-green-700 transition-colors'
                        >
                            {t('allVideo')} <ArrowRight size={20} />
                        </Link>
                    </ScrollReveal>
                </div>

                <ScrollReveal delay={300}>
                    <div className='bg-gray-50 p-6 rounded-3xl border border-gray-100 shadow-lg'>
                        <Videos />
                    </div>
                </ScrollReveal>

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
