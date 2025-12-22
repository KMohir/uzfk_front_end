'use client'

/**
 * MapCalendar Component
 * 
 * @description Displays an interactive map of Uzbekistan regions alongside an event calendar.
 * Features responsive grid layout with glassmorphism cards.
 * 
 * @returns {JSX.Element} Map and calendar section
 */

import React from 'react'
import { RegionsMap } from '../_components/map'
import { CalendarDemo } from '../_components/calendar'
import ScrollReveal from '../../components/ScrollReveal'
import { useTranslations } from 'next-intl'

// ============================================
// MAIN COMPONENT
// ============================================

export default function MapCalendar() {
    const t = useTranslations()

    return (
        <section className='pt-24 pb-10 bg-gradient-to-b from-accent/20 to-white'>
            <div className='container mx-auto px-4 md:px-8'>
                {/* ============================================
                    SECTION HEADER
                    ============================================ */}
                <ScrollReveal>
                    <div className='text-center mb-16'>
                        {/* Category badge */}
                        <span className='text-secondary font-bold tracking-widest uppercase text-sm mb-2 block'>
                            {t('activity')}
                        </span>

                        {/* Main heading */}
                        <h2 className='text-3xl md:text-4xl font-bold text-gray-800 tracking-tight'>
                            <span className='gradient-text'>
                                {t('regions')} & {t('calendar')}
                            </span>
                        </h2>
                    </div>
                </ScrollReveal>

                {/* ============================================
                    MAP & CALENDAR GRID
                    ============================================ */}
                <div className='grid lg:grid-cols-12 gap-8'>
                    {/* ============================================
                        INTERACTIVE MAP SECTION
                        ============================================ */}
                    <div className='lg:col-span-7 flex'>
                        {/* Map container with hover effect */}
                        <div className='w-full bg-white p-6 rounded-3xl shadow-xl border border-gray-100 hover:shadow-2xl hover:border-primary/20 transition-all duration-500 flex flex-col'>
                            <ScrollReveal delay={200} className='h-full'>
                                <div className='aspect-[4/3] w-full h-full flex items-center justify-center'>
                                    <RegionsMap />
                                </div>
                            </ScrollReveal>
                        </div>
                    </div>

                    {/* ============================================
                        CALENDAR SECTION
                        ============================================ */}
                    <div className='lg:col-span-5 flex'>
                        {/* Calendar container with glassmorphism */}
                        <div className='w-full glass-strong p-8 rounded-3xl shadow-xl border border-gray-100 relative overflow-hidden flex flex-col transition-all duration-500 hover:shadow-2xl hover:border-secondary/20'>
                            <ScrollReveal delay={400} className='h-full flex flex-col'>
                                {/* Calendar header */}
                                <h3 className='text-2xl font-bold mb-6 text-gray-800 flex items-center gap-3'>
                                    {/* Emoji icon with gradient background */}
                                    <span className='w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center text-white text-xl shadow-lg'>
                                        📅
                                    </span>
                                    {t('calendar')}
                                </h3>

                                {/* Calendar component */}
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
