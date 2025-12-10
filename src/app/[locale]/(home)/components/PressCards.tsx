'use client'

import React, { useEffect, useState } from 'react'
import { Link } from '@/i18n/routing'
import { ExternalLink, Loader2 } from 'lucide-react'
import ScrollReveal from '../../components/ScrollReveal'
import { useTranslations } from 'next-intl'

interface LinkItem {
    url: string
    title_uz: string
}

export default function PressCards() {
    const t = useTranslations()
    const [links, setLinks] = useState<LinkItem[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchLinks = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/uz/api/links/header/list/`)
                if (response.ok) {
                    const data = await response.json()
                    setLinks(data.results)
                }
            } catch (error) {
                console.error('Failed to fetch links:', error)
            } finally {
                setLoading(false)
            }
        }
        fetchLinks()
    }, [])

    if (loading) {
        return (
            <div className='flex justify-center py-12'>
                <Loader2 className='animate-spin text-primary' size={32} />
            </div>
        )
    }

    return (
        <section className='py-24 relative overflow-hidden'>
            <div className='absolute inset-0 bg-primary/5 -skew-y-3 z-0' />

            <div className='container mx-auto px-4 relative z-10'>
                <ScrollReveal>
                    <div className='text-center mb-16'>
                        <span className='text-secondary font-bold tracking-widest uppercase text-sm mb-2 block'>
                            {t('interactive')}
                        </span>
                        <h2 className='text-3xl md:text-4xl font-bold text-gray-800'>
                            {t('information')} & {t('services')}
                        </h2>
                    </div>
                </ScrollReveal>

                <div className='grid sm:grid-cols-2 lg:grid-cols-4 gap-6'>
                    {links.map((link, index) => (
                        <ScrollReveal key={link.url} delay={index * 100}>
                            <Link
                                href={link.url}
                                target='_blank'
                                className='group block h-full bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:border-secondary transition-all duration-300 hover:shadow-2xl hover:-translate-y-2'
                            >
                                <div className='flex justify-between items-start mb-6'>
                                    <div className='w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300'>
                                        <ExternalLink size={24} />
                                    </div>
                                    <span className='text-gray-300 group-hover:text-secondary transition-colors'>
                                        0{index + 1}
                                    </span>
                                </div>
                                <h3 className='text-lg font-bold text-gray-800 group-hover:text-primary transition-colors leading-tight mb-2'>
                                    {link.title_uz}
                                </h3>
                                <div className='w-8 h-1 bg-secondary rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300' />
                            </Link>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    )
}
