'use client'

import Link from 'next/link'
import ScrollReveal from '../components/ScrollReveal'

export default function NormativesPage() {
	const documents = [
		{
			id: 1,
			text: 'Ўзбекистон Республикаси Президентининг 2017 йил 9 октябрдаги "Фермер, деҳқон хўжаликлари ва томорқа ер эгаларининг ҳуқуқлари ва қонуний манфаатларини ҳимоя қилиш, қишлоқ хўжалиги экин майдонларидан самарали фойдаланиш тизимини тубдан такомиллаштириш чора-тадбирлари тўғрисида"ги',
			docNum: 'ПФ-5199-сонли Фармони',
			link: 'https://lex.uz/docs/3375308',
		},
		{
			id: 2,
			text: 'Ўзбекистон Республикаси Президентининг 2017 йил 10 октябрдаги "Фермер, деҳқон хўжаликлари ва томорқа ер эгалари фаолиятини янада ривожлантириш бўйича ташкилий чора-тадбирлар тўғрисида"ги',
			docNum: 'ПҚ-3318-сонли қарори',
			link: 'https://lex.uz/docs/3377755',
		},
		{
			id: 3,
			text: 'Ўзбекистон Республикаси Вазирлар Маҳкамасининг 2018 йил 18 мартдаги "Ўзбекистон фермер, деҳқон хўжаликлари ва томорқа ер эгалари кенгаши фаолиятини ташкил этиш чора-тадбирлари тўғрисида"ги',
			docNum: '205-сонли қарори',
			link: 'https://lex.uz/docs/3592882',
		},
		{
			id: 4,
			text: 'Ўзбекистон Республикасининг 2021 йил 1 апрелдаги "Деҳқон хўжалиги тўғрисида"ги',
			docNum: 'O‘RQ-680-сонли Қонуни',
			link: 'https://lex.uz/docs/5351781',
		},
		{
			id: 5,
			text: 'Ўзбекистон Республикасининг 1998 йил 30 апрелдаги "Фермер хўжалиги тўғрисида"ги',
			docNum: 'O‘RQ-602-I-сонли Қонуни', // Updated version is usually cited but original number is 602-I
			link: 'https://lex.uz/docs/111453',
		},
		{
			id: 6,
			text: 'Ўзбекистон Республикаси Президентининг 2018 йил 26 апрелдаги "Фермер, деҳқон хўжаликлари ва томорқа ер эгалари фаолиятини такомиллаштириш бўйича қўшимча чора-тадбирлар тўғрисида"ги',
			docNum: 'ПҚ-3680-сонли қарори',
			link: 'https://lex.uz/docs/3709543',
		},
	]

	return (
		<div className='min-h-screen bg-gray-50 dark:bg-gray-900 py-12'>
			<div className='container mx-auto px-4 md:px-8'>
				<ScrollReveal>
					<h1 className='text-3xl md:text-4xl font-bold mb-12 text-center text-gray-900 dark:text-white'>
						Меъёрий-ҳуқуқий ҳужжатлар
					</h1>
				</ScrollReveal>

				<div className='space-y-4 max-w-4xl mx-auto'>
					{documents.map((doc, index) => (
						<ScrollReveal key={doc.id} delay={index * 100}>
							<div className='block p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-md transition-all border border-gray-100 dark:border-gray-700 group'>
								<div className='flex gap-4 items-start'>
									<span className='flex-shrink-0 w-8 h-8 flex items-center justify-center bg-primary/10 text-primary font-bold rounded-full text-sm mt-1'>
										{index + 1}
									</span>
									<p className='text-lg text-gray-700 dark:text-gray-200 leading-relaxed font-medium'>
										{doc.text}{' '}
										<Link
											href={doc.link}
											target='_blank'
											className='text-primary font-bold underline decoration-2 decoration-primary/30 hover:decoration-primary transition-all inline-block mt-1'
										>
											{doc.docNum}
										</Link>
									</p>
								</div>
							</div>
						</ScrollReveal>
					))}
				</div>
			</div>
		</div>
	)
}

