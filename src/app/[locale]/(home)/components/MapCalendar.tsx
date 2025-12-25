'use client'

/**
 * MapCalendar Component
 * 
 * @description Displays an interactive map of Uzbekistan regions alongside an event calendar.
 * Features responsive grid layout with glassmorphism cards.
 * 
 * @returns {JSX.Element} Map and calendar section
 */

import { MapPin, Calendar as CalendarIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { RegionsMap } from '../_components/map'
import { CalendarDemo } from '../_components/calendar'
import ScrollReveal from '../../components/ScrollReveal'

export default function MapCalendar() {
    const t = useTranslations()

    return (
        <section className='pt-20 pb-24 relative overflow-hidden bg-white/50'>
            {/* ============================================
                PREMIUM BACKGROUND ELEMENTS
                ============================================ */}
            {/* Animated decorative blobs with stronger blur */}
            <div className='absolute -top-24 -left-24 w-96 h-96 bg-primary/5 rounded-full blur-[100px] animate-pulse-slow' />
            <div className='absolute -bottom-32 -right-32 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[120px] animate-float opacity-60' style={{ animationDelay: '2s' }} />

            <div className='container mx-auto px-4 md:px-8 relative z-10'>
                {/* ============================================
                    SECTION HEADER
                    ============================================ */}


                {/* ============================================
                    MAP & CALENDAR GRID
                    ============================================ */}
                <div className='grid lg:grid-cols-[2.5fr,1fr] gap-8'>
                    {/* ============================================
                        INTERACTIVE MAP SECTION
                        ============================================ */}
                    <ScrollReveal delay={200} className='flex'>
                        {/* Map container with glassmorphism and premium effects */}
                        <div className='w-full bg-white/90 backdrop-blur-md p-8 md:p-12 rounded-[2.5rem] shadow-2xl shadow-primary/5 border border-white hover-lift border-glow transition-all duration-500 flex flex-col justify-center overflow-hidden group relative'>
                            {/* Card Decorative Label */}
                            <div className='absolute top-8 left-8 flex items-center gap-2 px-4 py-2 bg-primary/5 rounded-full border border-primary/10 backdrop-blur-sm z-20'>
                                <MapPin className='w-4 h-4 text-primary animate-pulse' />
                                <span className='text-xs font-bold text-primary uppercase tracking-widest'>{t('regions')}</span>
                            </div>

                            <div className='w-full h-full flex items-center justify-center pt-8'>
                                <RegionsMap />
                            </div>
                        </div>
                    </ScrollReveal>

                    {/* ============================================
                        CALENDAR SECTION
                        ============================================ */}
                    <ScrollReveal delay={400} className='flex'>
                        {/* Calendar container with strong glassmorphism and lift */}
                        <div className='w-full glass-strong p-6 md:p-8 rounded-[2.5rem] shadow-2xl shadow-secondary/5 border border-white/60 relative overflow-hidden flex flex-col group transition-all duration-500 hover-lift border-glow'>
                            {/* Card Decorative Label */}
                            <div className='flex items-center gap-2 mb-6 px-4 py-2 bg-secondary/10 rounded-full w-fit border border-secondary/20 backdrop-blur-sm'>
                                <CalendarIcon className='w-4 h-4 text-gray-900' />
                                <span className='text-xs font-bold text-gray-900 uppercase tracking-widest'>{t('calendar')}</span>
                            </div>

                            {/* Calendar component */}
                            <div className='w-full h-full'>
                                <CalendarDemo />
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </div>
        </section>
    )
}
