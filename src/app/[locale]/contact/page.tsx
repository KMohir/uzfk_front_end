'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Phone, Mail, MapPin, Send } from 'lucide-react'

export default function ContactPage() {
	const t = useTranslations()
	const [formData, setFormData] = useState({
		name: '',
		phone: '',
		message: ''
	})
	const [loading, setLoading] = useState(false)
	const [success, setSuccess] = useState(false)
	const [error, setError] = useState('')

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setLoading(true)
		setError('')
		setSuccess(false)

		try {
			// Telegram bot API
			const BOT_TOKEN = '8525168440:AAFRkabFrvT3le2YWo2wKPA1HnHBNVu9KS8'
			const CHAT_ID = '5657091547'

			const text = `🆕 ${t('new_appeal')}\n\n👤 ${t('appeal_name')}: ${formData.name}\n📞 ${t('appeal_phone')}: ${formData.phone}\n✉️ ${t('appeal_message')}: ${formData.message}`

			const response = await fetch(
				`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						chat_id: CHAT_ID,
						text: text,
						parse_mode: 'HTML'
					})
				}
			)

			if (response.ok) {
				setSuccess(true)
				setFormData({ name: '', phone: '', message: '' })
			} else {
				throw new Error('Xatolik yuz berdi')
			}
		} catch (err) {
			setError(t('contact_error_message'))
			console.error(err)
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className='min-h-screen bg-gradient-to-br from-green-50 to-white dark:from-gray-900 dark:to-gray-800 py-24'>
			<div className='container mx-auto px-4 md:px-8'>
				{/* Header */}
				<div className='text-center mb-12'>
					<h1 className='text-4xl md:text-5xl font-bold text-green-700 dark:text-white mb-4'>
						{t('nav15')}
					</h1>
					<p className='text-gray-600 dark:text-gray-300 text-lg md:text-xl'>
						{t('contact_subtitle')}
					</p>
				</div>

				<div className='grid md:grid-cols-2 gap-8 max-w-7xl mx-auto'>
					{/* Contact Info */}
					<div className='space-y-6'>
						<div className='bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 md:p-8'>
							<h2 className='text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6'>
								{t('contact_info_title')}
							</h2>

							<div className='space-y-6'>
								{/* Phone */}
								<div className='flex items-start gap-4'>
									<div className='w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center flex-shrink-0'>
										<Phone className='text-green-600 dark:text-green-400' size={24} />
									</div>
									<div>
										<h3 className='font-semibold text-lg text-gray-900 dark:text-white mb-2'>
											{t('phone')}
										</h3>
										<a href='tel:+998712330618' className='text-base text-gray-600 dark:text-gray-300 hover:text-green-600 block mb-1'>
											+998 (71) 233-06-18
										</a>
										<p className='text-base text-gray-500 mt-1'>{t('phoneTwo')}: <a href='tel:+998712330714' className='hover:text-green-600'>+998 (71) 233-07-14</a></p>
									</div>
								</div>

								{/* Email */}
								<div className='flex items-start gap-4'>
									<div className='w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center flex-shrink-0'>
										<Mail className='text-blue-600 dark:text-blue-400' size={24} />
									</div>
									<div>
										<h3 className='font-semibold text-lg text-gray-900 dark:text-white mb-2'>
											{t('email')}
										</h3>
										<a href='mailto:info@uzfk.uz' className='text-base text-gray-600 dark:text-gray-300 hover:text-green-600'>
											info@uzfk.uz
										</a>
									</div>
								</div>

								{/* Address */}
								<div className='flex items-start gap-4'>
									<div className='w-12 h-12 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center flex-shrink-0'>
										<MapPin className='text-red-600 dark:text-red-400' size={24} />
									</div>
									<div>
										<h3 className='font-semibold text-lg text-gray-900 dark:text-white mb-2'>
											{t('address')}
										</h3>
										<p className='text-base text-gray-600 dark:text-gray-300 leading-relaxed'>
											{t('addressTwo')}
										</p>
									</div>
								</div>
							</div>
						</div>

						{/* Map placeholder */}
						<div className='bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 h-80 md:h-96'>
							<iframe
								src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2996.7207087394447!2d69.28447931541826!3d41.31117997927034!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8b3a5e6e3e3d%3A0x3e6e3e3e3e3e3e3e!2sIslom%20Karimov%20ko%27chasi%202A%2C%20Toshkent%2C%20Uzbekistan!5e0!3m2!1sen!2s!4v1234567890123!5m2!1sen!2s'
								width='100%'
								height='100%'
								style={{ border: 0, borderRadius: '12px' }}
								allowFullScreen
								loading='lazy'
							/>
						</div>
					</div>

					{/* Contact Form */}
					<div className='bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 md:p-8'>
						<h2 className='text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6'>
							{t('contact_send_title')}
						</h2>

						{success && (
							<div className='mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg'>
								✅ {t('contact_success_message')}
							</div>
						)}

						{error && (
							<div className='mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg'>
								❌ {error}
							</div>
						)}

						<form onSubmit={handleSubmit} className='space-y-6'>
							{/* Name */}
							<div>
								<label htmlFor='name' className='block text-base font-medium text-gray-700 dark:text-gray-300 mb-2'>
									{t('contact_name_label')} *
								</label>
								<input
									type='text'
									id='name'
									required
									value={formData.name}
									onChange={(e) => setFormData({ ...formData, name: e.target.value })}
									className='w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white'
									placeholder={t('contact_name_placeholder')}
								/>
							</div>

							{/* Phone */}
							<div>
								<label htmlFor='phone' className='block text-base font-medium text-gray-700 dark:text-gray-300 mb-2'>
									{t('contact_phone_label')} *
								</label>
								<input
									type='tel'
									id='phone'
									required
									value={formData.phone}
									onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
									className='w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white'
									placeholder='+998 90 123 45 67'
								/>
							</div>

							{/* Message */}
							<div>
								<label htmlFor='message' className='block text-base font-medium text-gray-700 dark:text-gray-300 mb-2'>
									{t('contact_message_label')} *
								</label>
								<textarea
									id='message'
									required
									rows={6}
									value={formData.message}
									onChange={(e) => setFormData({ ...formData, message: e.target.value })}
									className='w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white resize-none'
									placeholder={t('contact_message_placeholder')}
								/>
							</div>

							{/* Submit Button */}
							<button
								type='submit'
								disabled={loading}
								className='w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed'
							>
								{loading ? (
									<>
										<div className='w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin' />
										{t('contact_submitting_button')}
									</>
								) : (
									<>
										<Send size={20} />
										{t('contact_submit_button')}
									</>
								)}
							</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	)
}
