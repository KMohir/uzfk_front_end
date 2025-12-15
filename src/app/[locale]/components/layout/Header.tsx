'use client'

import React, { useState, useEffect } from 'react'
import { Link, usePathname } from '@/i18n/routing'
import { useTranslations } from 'next-intl'
import { Menu, X, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import LanguageSwitcher from '../ui/language'

import MyMarquee from '../marquee/MyMarquee'

import { createPortal } from 'react-dom'

export default function Header() {
    const t = useTranslations()
    const pathname = usePathname()
    const [scrolled, setScrolled] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
    const [mounted, setMounted] = useState(false)

    // Update header style on scroll
    useEffect(() => {
        setMounted(true)
        const handleScroll = () => setScrolled(window.scrollY > 20)
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const navItems = [
        { name: 'home', label: t('nav1'), href: '/' },
        {
            name: 'about',
            label: t('nav2'),
            href: '#',
            dropdown: [
                { label: t('nav4'), href: '/management' },
                { label: t('structure'), href: '/structure' },
                { label: t('centers'), href: '/center-units' },
                { label: t('goals'), href: '/goals' },
                { label: t('nav7'), href: '/regions' },
            ]
        },
        {
            name: 'press',
            label: t('nav8'),
            href: '#',
            dropdown: [
                { label: t('nav9'), href: '/news' },
                { label: t('nav10'), href: '/announcements' },
                { label: t('videos'), href: '/video' }
            ]
        },
        { name: 'normatives', label: t('nav13'), href: '/normatives' },
        { name: 'contacts', label: t('nav15'), href: '#footer' }, // Temporary link to footer
    ]

    return (
        <header
            className={cn(
                'fixed top-0 left-0 right-0 z-[100] transition-all duration-300 font-sans bg-white/95 backdrop-blur-md shadow-md',
                scrolled ? 'py-2' : 'py-4'
            )}
        >
            <div className='w-full absolute top-0 left-0'>
                {!pathname.includes('/news/') && <MyMarquee />}
            </div>

            <div className='container mx-auto px-4 md:px-8 flex items-center justify-between mt-8'>
                {/* Logo */}
                <Link href='/' className='flex items-center gap-3 group'>
                    <div className='relative w-12 h-12 overflow-hidden rounded-full border-2 border-secondary group-hover:scale-105 transition-transform'>
                        <Image src='/logo.png' alt='UzFK Logo' fill className='object-cover' />
                    </div>
                    <div className='flex flex-col text-primary'>
                        <span className='font-bold text-lg leading-tight tracking-tight max-w-[200px]'>
                            {t('logo')}
                        </span>
                    </div>
                </Link>

                {/* Desktop Nav */}
                <nav className='hidden lg:flex items-center gap-6'>
                    {navItems.map((item) => (
                        <div
                            key={item.name}
                            className='relative group h-full flex items-center'
                            onMouseEnter={() => setActiveDropdown(item.name)}
                            onMouseLeave={() => setActiveDropdown(null)}
                        >
                            <Link
                                href={item.href}
                                className={cn(
                                    'flex items-center gap-1 text-sm font-medium transition-colors py-2 text-gray-700 hover:text-primary',
                                    pathname.includes(item.href) && item.href !== '#' && 'text-primary font-bold'
                                )}
                            >
                                {item.label}
                                {item.dropdown && <ChevronDown size={14} className='group-hover:rotate-180 transition-transform' />}
                            </Link>

                            {/* Dropdown */}
                            {item.dropdown && (
                                <div
                                    className={cn(
                                        'absolute top-full left-1/2 -translate-x-1/2 w-56 pt-2 opacity-0 invisible transition-all duration-200 transform translate-y-2',
                                        activeDropdown === item.name && 'opacity-100 visible translate-y-0'
                                    )}
                                >
                                    <div className='bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden p-1'>
                                        {item.dropdown.map((subItem) => (
                                            <Link
                                                key={subItem.href}
                                                href={subItem.href}
                                                className='block px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 hover:text-primary rounded-lg transition-colors'
                                            >
                                                {subItem.label}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </nav>

                {/* Right Actions */}
                <div className='flex items-center gap-4'>
                    {/* Language Switcher Mock */}
                    <div className='block'>
                        <LanguageSwitcher />
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className='lg:hidden text-gray-800'
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay with Portal */}
            {mobileMenuOpen && mounted && createPortal(
                <div className='fixed inset-0 z-[90] bg-white pt-24 px-6 lg:hidden animate-in slide-in-from-right duration-300'>
                    <nav className='flex flex-col gap-4'>
                        {navItems.map((item) => (
                            <div key={item.name} className='border-b border-gray-100 pb-2'>
                                <Link
                                    href={item.href}
                                    className='text-lg font-semibold text-gray-800 block mb-2'
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {item.label}
                                </Link>
                                {item.dropdown && (
                                    <div className='pl-4 flex flex-col gap-2'>
                                        {item.dropdown.map((subItem) => (
                                            <Link
                                                key={subItem.href}
                                                href={subItem.href}
                                                className='text-gray-500 hover:text-primary transition-colors'
                                                onClick={() => setMobileMenuOpen(false)}
                                            >
                                                {subItem.label}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </nav>
                    <div className='mt-4 border-t border-gray-100 pt-4'>
                        <p className='text-sm text-gray-500 mb-2'>Tilni tanlash:</p>
                        <LanguageSwitcher />
                    </div>
                </div>,
                document.body
            )}
        </header>
    )
}
