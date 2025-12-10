'use client'

import React from 'react'
import CountUp from 'react-countup'
import ScrollReveal from '../../components/ScrollReveal'
import { Users, Tractor, Building2, Sprout } from 'lucide-react'

export default function StatsGrid() {
    const stats = [
        {
            icon: Users,
            label: 'Fermerlar',
            value: 12500,
            suffix: '+',
            color: 'from-orange-400 to-amber-500',
            shadow: 'shadow-orange-200'
        },
        {
            icon: Tractor,
            label: 'Texnikalar',
            value: 8400,
            suffix: '',
            color: 'from-blue-500 to-blue-600',
            shadow: 'shadow-blue-200'
        },
        {
            icon: Building2,
            label: 'Hududiy Kengashlar',
            value: 14,
            suffix: '',
            color: 'from-green-500 to-emerald-600',
            shadow: 'shadow-green-200'
        },
        {
            icon: Sprout,
            label: 'Ekin Maydonlari',
            value: 450,
            suffix: 'k ga',
            color: 'from-cyan-400 to-blue-400',
            shadow: 'shadow-cyan-200'
        },
    ]

    return (
        <section className='py-20 bg-gray-50/50'>
            <div className='container mx-auto px-4 md:px-8'>
                <ScrollReveal>
                    <div className='text-center mb-16'>
                        <span className='inline-block px-4 py-1.5 bg-green-100 text-green-700 text-xs font-bold rounded-full mb-4 uppercase tracking-wider'>
                            Raqamlar so'zlaganda
                        </span>
                        <h2 className='text-3xl md:text-5xl font-bold text-gray-800 tracking-tight'>
                            <span className='bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-green-800'>
                                Qishloq Xo'jaligi Ko'rsatkichlari
                            </span>
                        </h2>
                        <p className='mt-4 text-gray-500 max-w-2xl mx-auto'>
                            Mamlakatimiz bo'ylab amalga oshirilayotgan islohotlar va erishilgan natijalar raqamlarda.
                        </p>
                    </div>
                </ScrollReveal>

                <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-8'>
                    {stats.map((stat, index) => (
                        <ScrollReveal key={stat.label} delay={index * 100}>
                            <div className={`relative overflow-hidden rounded-[2rem] p-8 bg-gradient-to-br ${stat.color} text-white shadow-xl ${stat.shadow} hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group h-full flex flex-col items-center justify-center text-center`}>
                                {/* Background Shapes */}
                                <div className='absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-white/20 transition-colors' />
                                <div className='absolute bottom-0 left-0 w-24 h-24 bg-black/5 rounded-full blur-xl translate-y-1/2 -translate-x-1/2' />

                                <div className='relative z-10 mb-6 p-4 bg-white/20 rounded-2xl backdrop-blur-sm shadow-inner ring-1 ring-white/30 group-hover:scale-110 transition-transform duration-500'>
                                    <stat.icon size={32} strokeWidth={1.5} />
                                </div>

                                <h3 className='relative z-10 text-4xl md:text-5xl font-bold mb-3 tracking-tight font-sans'>
                                    <CountUp end={stat.value} duration={2.5} separator=',' />
                                    <span className='text-white/90 text-2xl ml-1'>{stat.suffix}</span>
                                </h3>

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
