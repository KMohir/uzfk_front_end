'use client'

import React from 'react'
import CountUp from 'react-countup'
import ScrollReveal from '../../components/ScrollReveal'
import { Users, Tractor, Building2, Sprout } from 'lucide-react'

const stats = [
    { icon: Users, label: 'Fermerlar', value: 12500, suffix: '+' },
    { icon: Tractor, label: 'Texnikalar', value: 8400, suffix: '' },
    { icon: Building2, label: 'Hududiy Kengashlar', value: 14, suffix: '' },
    { icon: Sprout, label: 'Ekin Maydonlari', value: 450, suffix: 'k ga' },
]

export default function StatsGrid() {
    return (
        <section className='py-20 bg-primary text-white relative overflow-hidden'>
            {/* Abstract background shapes */}
            <div className='absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2' />
            <div className='absolute bottom-0 left-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2' />

            <div className='container mx-auto px-4 relative z-10'>
                <div className='grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12'>
                    {stats.map((stat, index) => (
                        <ScrollReveal key={stat.label} delay={index * 100}>
                            <div className='flex flex-col items-center text-center group'>
                                <div className='mb-4 p-4 bg-white/10 rounded-2xl group-hover:bg-secondary group-hover:scale-110 transition-all duration-300'>
                                    <stat.icon size={32} className='text-white' />
                                </div>
                                <h3 className='text-4xl md:text-5xl font-bold mb-2 font-mono'>
                                    <CountUp end={stat.value} duration={2.5} separator=',' />
                                    <span className='text-secondary'>{stat.suffix}</span>
                                </h3>
                                <p className='text-gray-300 font-medium tracking-wide uppercase text-sm'>
                                    {stat.label}
                                </p>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    )
}
