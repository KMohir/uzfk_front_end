'use client'

import React from 'react'
import { Link } from '@/i18n/routing'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { Mail, MapPin, Phone, Facebook, Instagram, Youtube, Send } from 'lucide-react'

export default function Footer() {
    const t = useTranslations()

    return (
        <footer id='footer' className='bg-gray-900 text-white pt-20 pb-10 relative overflow-hidden'>
            {/* Wheat Pattern Overlay */}
            <div className='absolute inset-0 opacity-5 wheat-pattern mix-blend-overlay' />

            <div className='container mx-auto px-4 relative z-10'>
                <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16'>
                    {/* Brand */}
                    <div>
                        <div className='flex items-center gap-4 mb-6'>
                            <div className='relative w-16 h-16 bg-white rounded-full p-1'>
                                <Image src='/logo.png' alt='UzFK Logo' fill className='object-contain p-2' />
                            </div>
                            <span className='font-bold text-lg leading-tight text-secondary'>
                                {t('logo')}
                            </span>
                        </div>
                        <p className='text-gray-400 mb-6 leading-relaxed'>
                            {t('footer_desc') || 'O&apos;zbekiston qishloq xo&apos;jaligini rivojlantirish va fermerlar huquqlarini himoya qilish yo&apos;lida.'}
                        </p>
                        <div className='flex gap-4'>
                            {[Facebook, Instagram, Youtube, Send].map((Icon, i) => (
                                <Link key={i} href='#' className='w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-secondary hover:text-white transition-all'>
                                    <Icon size={18} />
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 className='text-lg font-bold mb-6 text-white'>{t('structure')}</h4>
                        <ul className='space-y-4'>
                            {['management', 'apparatus', 'centers'].map((item) => (
                                <li key={item}>
                                    <Link
                                        href={
                                            item === 'apparatus' ? '/structure' :
                                                item === 'centers' ? '/center-units' :
                                                    `/${item}`
                                        }
                                        className='text-gray-400 hover:text-secondary transition-colors inline-block'
                                    >
                                        {t(item)}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 className='text-lg font-bold mb-6 text-white'>{t('information')}</h4>
                        <ul className='space-y-4'>
                            {['news', 'announcements', 'normatives'].map((item) => (
                                <li key={item}>
                                    <Link href={`/${item}`} className='text-gray-400 hover:text-secondary transition-colors inline-block'>
                                        {t(item)}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className='text-lg font-bold mb-6 text-white'>{t('contacts')}</h4>
                        <ul className='space-y-4'>
                            <li className='flex items-start gap-3 text-gray-400'>
                                <MapPin className='text-secondary flex-shrink-0 mt-1' size={18} />
                                <span>{t('addressTwo')}</span>
                            </li>
                            <li className='flex items-center gap-3 text-gray-400'>
                                <Phone className='text-secondary' size={18} />
                                <span>+998 71 233 06 18</span>
                            </li>
                            <li className='flex items-center gap-3 text-gray-400'>
                                <Mail className='text-secondary' size={18} />
                                <span>info@uzfk.uz</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className='border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500'>
                    <p>© 2024 UzFK. All rights reserved.</p>
                    <p>Designed with ❤️ by UzFK Team</p>
                </div>
            </div>
        </footer>
    )
}
