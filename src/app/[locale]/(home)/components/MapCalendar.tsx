'use client'

import React from 'react'
import { RegionsMap } from '../_components/map'
import { CalendarDemo } from '../_components/calendar'
import ScrollReveal from '../../components/ScrollReveal'
import { useTranslations } from 'next-intl'

export default function MapCalendar() {
    const t = useTranslations()

    return (
        <section className='py-24 bg-accent/20'>
            <div className='container mx-auto px-4 md:px-8'>
                <ScrollReveal>
                    <div className='text-center mb-16'>
                        <span className='text-secondary font-bold tracking-widest uppercase text-sm mb-2 block'>
                            {t('activity')}
                        </span>
                        <h2 className='text-3xl md:text-4xl font-bold text-gray-800'>
                            {t('regions')} & {t('calendar')}
                        </h2>
                    </div>
                </ScrollReveal>

                <div className='grid lg:grid-cols-12 gap-8'>
                    {/* Map Section */}
                    <div className='lg:col-span-7 flex'>
                        <div className='w-full bg-white p-6 rounded-3xl shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-500 flex flex-col'>
                            <ScrollReveal delay={200} className='h-full'>
                                <div className='aspect-[4/3] w-full h-full flex items-center justify-center'>
                                    <RegionsMap />
                                </div>
                            </ScrollReveal>
                        </div>
                    </div>

                    {/* Calendar Section */}
                    <div className='lg:col-span-5 flex'>
                        <div className='w-full bg-white p-8 rounded-3xl shadow-xl border border-gray-100 relative overflow-hidden flex flex-col transition-all duration-500 hover:shadow-2xl'>
                            <ScrollReveal delay={400} className='h-full flex flex-col'>
                                <div className='absolute top-0 left-0 w-2 h-full bg-secondary' />
                                <h3 className='text-2xl font-bold mb-6 text-gray-800 flex items-center gap-3'>
                                    <span className='w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xl'>
                                        📅
                                    </span>
                                    {t('calendar')}
                                </h3>
                                <div className='flex justify-center flex-grow items-center'>
                                    <CalendarDemo />
                                </div>
                            </ScrollReveal>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
