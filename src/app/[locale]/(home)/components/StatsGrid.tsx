'use client'

/**
 * StatsGrid Component
 * 
 * @description Displays key statistics in an animated grid with gradient cards.
 * Features animated counters, hover effects, and glassmorphism design.
 * 
 * @returns {JSX.Element} Statistics grid section with 4 stat cards
 */

import React from 'react'
import CountUp from 'react-countup'
import ScrollReveal from '../../components/ScrollReveal'
import { Users, Briefcase, TreeDeciduous, Sprout } from 'lucide-react'

// ============================================
// TYPE DEFINITIONS
// ============================================

interface StatItem {
    icon: React.ComponentType<{ size?: number; strokeWidth?: number }>
    label: string
    value: number
    suffix: string
    color: string
    shadow: string
    decimals?: number
}

// ============================================
// MAIN COMPONENT
// ============================================

export default function StatsGrid() {
    // ============================================
    // STATISTICS DATA
    // ============================================
    const stats: StatItem[] = [
        {
            icon: Users,
            label: "Ko'p tarmoqli fermer xo'jaliklar",
            value: 23400,
            suffix: '+',
            color: 'from-orange-400 via-orange-500 to-amber-500',
            shadow: 'shadow-orange-200'
        },
        {
            icon: Briefcase,
            label: 'Ish bilan bandlik',
            value: 1.38,
            suffix: ' Mln',
            decimals: 2,
            color: 'from-blue-500 via-blue-600 to-cyan-600',
            shadow: 'shadow-blue-200'
        },
        {
            icon: TreeDeciduous,
            label: 'Ekilgan Daraxtlar',
            value: 24.8,
            suffix: ' Mln',
            decimals: 1,
            color: 'from-green-500 via-emerald-600 to-teal-600',
            shadow: 'shadow-green-200'
        },
        {
            icon: Sprout,
            label: 'Ekin Maydonlari',
            value: 200.9,
            suffix: 'k ga',
            decimals: 1,
            color: 'from-cyan-400 via-cyan-500 to-blue-400',
            shadow: 'shadow-cyan-200'
        },
    ]

    return (
        <section className='py-20 bg-gradient-to-b from-gray-50/50 to-white'>
            <div className='container mx-auto px-4 md:px-8'>
                {/* ============================================
                    SECTION HEADER
                    ============================================ */}
                <ScrollReveal>
                    <div className='text-center mb-16'>
                        {/* Category badge */}
                        <span className='inline-block px-4 py-1.5 bg-green-100 text-green-700 text-xs font-bold rounded-full mb-4 uppercase tracking-wider animate-scale-in'>
                            Raqamlar so&apos;zlaganda
                        </span>

                        {/* Main heading with gradient text */}
                        <h2 className='text-3xl md:text-5xl font-bold text-gray-800 tracking-tight'>
                            <span className='gradient-text'>
                                Qishloq Xo&apos;jaligi Ko&apos;rsatkichlari
                            </span>
                        </h2>

                        {/* Subtitle */}
                        <p className='mt-4 text-gray-500 max-w-2xl mx-auto'>
                            Mamlakatimiz bo&apos;ylab amalga oshirilayotgan islohotlar va erishilgan natijalar raqamlarda.
                        </p>
                    </div>
                </ScrollReveal>

                {/* ============================================
                    STATISTICS GRID
                    ============================================ */}
                <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-8'>
                    {stats.map((stat, index) => (
                        <ScrollReveal key={stat.label} delay={index * 100}>
                            {/* Stat card with gradient background and hover effects */}
                            <div className={`
                                relative overflow-hidden rounded-[2rem] p-8 
                                bg-gradient-to-br ${stat.color} 
                                text-white shadow-xl ${stat.shadow} 
                                hover:shadow-2xl hover:-translate-y-3 
                                transition-all duration-500 
                                group h-full flex flex-col items-center justify-center text-center
                                hover-lift
                            `}>
                                {/* ============================================
                                    DECORATIVE BACKGROUND SHAPES
                                    ============================================ */}
                                {/* Top-right glow orb */}
                                <div className='absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-white/20 transition-colors duration-500' />

                                {/* Bottom-left shadow orb */}
                                <div className='absolute bottom-0 left-0 w-24 h-24 bg-black/5 rounded-full blur-xl translate-y-1/2 -translate-x-1/2' />

                                {/* Shimmer effect on hover */}
                                <div className='absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-700' />

                                {/* ============================================
                                    ICON CONTAINER
                                    ============================================ */}
                                {/* Icon with glassmorphism background */}
                                <div className='relative z-10 mb-6 p-4 bg-white/20 rounded-2xl backdrop-blur-sm shadow-inner ring-1 ring-white/30 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500'>
                                    <stat.icon size={32} strokeWidth={1.5} />
                                </div>

                                {/* ============================================
                                    ANIMATED COUNTER
                                    ============================================ */}
                                {/* Number with count-up animation */}
                                <h3 className='relative z-10 text-4xl md:text-5xl font-bold mb-3 tracking-tight font-sans'>
                                    <CountUp
                                        end={stat.value}
                                        duration={2.5}
                                        separator=','
                                        decimals={stat.decimals || 0}
                                        enableScrollSpy
                                        scrollSpyOnce
                                    />
                                    <span className='text-white/90 text-2xl ml-1'>{stat.suffix}</span>
                                </h3>

                                {/* ============================================
                                    LABEL
                                    ============================================ */}
                                {/* Category label with badge styling */}
                                <span className='relative z-10 font-bold text-white/90 uppercase tracking-widest text-xs bg-black/10 px-4 py-1.5 rounded-full'>
                                    {stat.label}
                                </span>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    )
}
