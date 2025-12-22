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

// ============================================
// MAIN COMPONENT
// ============================================

export default function MapCalendar() {

    return (
        <section className='pt-0 pb-10 bg-gradient-to-b from-accent/20 to-white'>
            <div className='container mx-auto px-4 md:px-8'>
                {/* ============================================
                    SECTION HEADER
                    ============================================ */}

                {/* ============================================
                    MAP & CALENDAR GRID
                    ============================================ */}
                <div className='grid lg:grid-cols-[2.5fr,1fr] gap-6'>
                    {/* ============================================
                        INTERACTIVE MAP SECTION
                        ============================================ */}
                    <div className='flex'>
                        {/* Map container with hover effect */}
                        <div className='w-full bg-white p-12 rounded-3xl shadow-xl border border-gray-100 hover:shadow-2xl hover:border-primary/20 transition-all duration-500 flex flex-col justify-center'>
                            <div className='w-full h-full flex items-center justify-center'>
                                <RegionsMap />
                            </div>
                        </div>
                    </div>

                    {/* ============================================
                        CALENDAR SECTION
                        ============================================ */}
                    <div className='flex'>
                        {/* Calendar container with glassmorphism */}
                        <div className='w-full glass-strong p-4 rounded-3xl shadow-xl border border-gray-100 relative overflow-hidden flex flex-col transition-all duration-500 hover:shadow-2xl hover:border-secondary/20'>
                            <ScrollReveal delay={400} className='h-full flex flex-col'>
                                {/* Calendar header */}

                                {/* Calendar component */}
                                <div className='w-full h-full'>
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
