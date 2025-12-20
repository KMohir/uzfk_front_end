import { useTranslations, useLocale } from 'next-intl'
import Link from 'next/link'
import ScrollReveal from '../components/ScrollReveal'

export default function NormativesPage() {
	const t = useTranslations()
	const locale = useLocale()

	const documents = [
		{
			id: 1,
			text_uz: 'O‘zbekiston Respublikasi Prezidentining 2017-yil 9-oktyabrdagi "Fermer, dehqon xo‘jaliklari va tomorqa yer egalarining huquqlari va qonuniy manfaatlarini himoya qilish, qishloq xo‘jaligi ekin maydonlaridan sama-rali foydalanish tizimini tubdan takomillashtirish chora-tadbirlari to‘g‘risida"gi',
			text_oz: 'Ўзбекистон Республикаси Президентининг 2017 йил 9 октябрдаги "Фермер, деҳқон хўжаликлари ва томорқа ер эгаларининг ҳуқуқлари ва қонуний манфаатларини ҳимоя қилиш, қишлоқ хўжалиги экин майдонларидан сама-рали фойдаланиш тизимини тубдан такомиллаштириш чора-тадбирлари тўғрисида"ги',
			text_ru: 'Указ Президента Республики Узбекистан от 9 октября 2017 года «О мерах по коренному совершенствованию системы защиты прав и законных интересов фермерских, дехканских хозяйств и владельцев приусадебных земель, рационального использования сельскохозяйственных посевных площадей»',
			docNum_uz: 'PF-5199-sonli Farmoni',
			docNum_oz: 'ПФ-5199-сонли Фармони',
			docNum_ru: 'Указ № УП-5199',
			link: 'https://lex.uz/docs/3375308',
		},
		{
			id: 2,
			text_uz: 'O‘zbekiston Respublikasi Prezidentining 2017-yil 10-oktyabrdagi "Fermer, dehqon xo‘jaliklari va tomorqa yer egalari faoliyatini yanada rivojlantirish bo‘yicha tashkiliy chora-tadbirlar to‘g‘risida"gi',
			text_oz: 'Ўзбекистон Республикаси Президентининг 2017 йил 10 октябрдаги "Фермер, деҳқон хўжаликлари ва томорқа ер эгалари фаолиятини янада ривожлантириш бўйича ташкилий чора-тадбирлар тўғрисида"ги',
			text_ru: 'Постановление Президента Республики Узбекистан от 10 октября 2017 года «Об организационных мерах по дальнейшему развитию деятельности фермерских, дехканских хозяйств и владельцев приусадебных земель»',
			docNum_uz: 'PQ-3318-sonli qarori',
			docNum_oz: 'ПҚ-3318-сонли қарори',
			docNum_ru: 'Постановление № ПП-3318',
			link: 'https://lex.uz/docs/3377755',
		},
		{
			id: 3,
			text_uz: 'O‘zbekiston Respublikasi Vazirlar Mahkamasining 2018-yil 18-martdagi "O‘zbekiston fermer, dehqon xo‘jaliklari va tomorqa yer egalari kengashi faoliyatini tashkil etish chora-tadbirlari to‘g‘risida"gi',
			text_oz: 'Ўзбекистон Республикаси Вазирлар Маҳкамасининг 2018 йил 18 мартдаги "Ўзбекистон фермер, деҳқон хўжаликлари ва томорқа ер эгалари кенгаши фаолиятини ташкил этиш чора-тадбирлари тўғрисида"ги',
			text_ru: 'Постановление Кабинета Министров Республики Узбекистан от 18 марта 2018 года «О мерах по организации деятельности Совета фермерских, дехканских хозяйств и владельцев приусадебных земель Узбекистана»',
			docNum_uz: '205-sonli qarori',
			docNum_oz: '205-сонли қарори',
			docNum_ru: 'Постановление № 205',
			link: 'https://lex.uz/docs/3592882',
		},
		{
			id: 4,
			text_uz: 'O‘zbekiston Respublikasining 2021-yil 1-apreldagi "Dehqon xo‘jaligi to‘g‘risida"gi',
			text_oz: 'Ўзбекистон Республикасининг 2021 йил 1 апрелдаги "Деҳқон хўжалиги тўғрисида"ги',
			text_ru: 'Закон Республики Узбекистан от 1 апреля 2021 года «О дехканском хозяйстве»',
			docNum_uz: 'O‘RQ-680-sonli Qonuni',
			docNum_oz: 'O‘RQ-680-сонли Қонуни',
			docNum_ru: 'Закон № ЗРУ-680',
			link: 'https://lex.uz/docs/5351781',
		},
		{
			id: 5,
			text_uz: 'O‘zbekiston Respublikasining 1998-yil 30-apreldagi "Fermer xo‘jaligi to‘g‘risida"gi',
			text_oz: 'Ўзбекистон Республикасининг 1998 йил 30 апрелдаги "Фермер хўжалиги тўғрисида"ги',
			text_ru: 'Закон Республики Узбекистан от 30 апреля 1998 года «О фермерском хозяйстве»',
			docNum_uz: 'O‘RQ-602-I-sonli Qonuni',
			docNum_oz: 'O‘RQ-602-I-сонли Қонуни',
			docNum_ru: 'Закон № ЗРУ-602-I',
			link: 'https://lex.uz/docs/111453',
		},
		{
			id: 6,
			text_uz: 'O‘zbekiston Respublikasi Prezidentining 2018-yil 26-apreldagi "Fermer, dehqon xo‘jaliklari va tomorqa yer egalari faoliyatini takomillashtirish bo‘yicha qo‘shimcha chora-tadbirlar to‘g‘risida"gi',
			text_oz: 'Ўзбекистон Республикаси Президентининг 2018 йил 26 апрелдаги "Фермер, деҳқон хўжаликлари ва томорқа ер эгалари фаолиятини такомиллаштириш бўйича қўшимча чора-тадбирлар тўғрисида"ги',
			text_ru: 'Постановление Президента Республики Узбекистан от 26 апреля 2018 года «О дополнительных мерах по совершенствованию деятельности фермерских, дехканских хозяйств и владельцев приусадебных земель»',
			docNum_uz: 'PQ-3680-sonli qarori',
			docNum_oz: 'ПҚ-3680-сонли қарори',
			docNum_ru: 'Постановление № ПП-3680',
			link: 'https://lex.uz/docs/3709543',
		},
		{
			id: 7,
			text_uz: 'O‘zbekiston Respublikasi Vazirlar Mahkamasining 2018-yil 7-iyundagi "O‘zbekiston fermerlari kengashi huzuridagi Fermer xo‘jaliklarini qo‘llab-quvvatlash jamg‘armasi faoliyatini tashkil etish to‘g‘risida"gi',
			text_oz: 'Ўзбекистон Республикаси Вазирлар Маҳкамасининг 2018 йил 7 июндаги "Ўзбекистон фермерлари кенгаши ҳузуридаги Фермер хўжаликларини қўллаб-қувватлаш жамғармаси фаолиятини ташкил этиш тўғрисида"ги',
			text_ru: 'Постановление Кабинета Министров Республики Узбекистан от 7 июня 2018 года «Об организации деятельности Фонда поддержки фермерских хозяйств при Совете фермеров Узбекистана»',
			docNum_uz: '433-sonli qarori',
			docNum_oz: '433-сонли қарори',
			docNum_ru: 'Постановление № 433',
			link: 'https://lex.uz/docs/3771569',
		},
		{
			id: 8,
			text_uz: 'Moliya vazirligi, Markaziy bank boshqaruvi va Qishloq xo‘jaligi vazirligining 2019-yil 15-yanvardagi "Fermer xo‘jaliklarining a’zolik badalini O‘zbekiston fermerlari kengashiga o‘tkazib berish tartibi to‘g‘risidagi nizomni tasdiqlash haqida"gi',
			text_oz: 'Молия вазирлиги, Марказий банк бошқаруви ва Қишлоқ хўжалиги вазирлигининг 2019 йил 15 январдаги "Фермер хўжаликларининг аъзолик бадалини Ўзбекистон фермерлари кенгашига ўтказиб бериш тартиби тўғрисидаги низомни тасдиқлаш ҳақида"ги',
			text_ru: 'Постановление Министерства финансов, Правления Центрального банка и Министерства сельского хозяйства от 15 января 2019 года «Об утверждении Положения о порядке перечисления членского взноса фермерскими хозяйствами в Совет фермеров Узбекистана»',
			docNum_uz: '3121-sonli qarori',
			docNum_oz: '3121-сонли қарори',
			docNum_ru: 'Постановление № 3121',
			link: 'https://lex.uz/docs/4164871',
		},
		{
			id: 9,
			text_uz: 'O‘zbekiston Respublikasi Prezidentining 2025-yil 14-fevraldagi "Tomorqa yer egalari va dehqon xo‘jaliklari faoliyatida zamonaviy tashkiliy tizimni joriy qilish va moliyaviy qo‘llab-quvvatlashning qo‘shimcha chora-tadbirlari to‘g‘risida"gi',
			text_oz: 'Ўзбекистон Республикаси Президентининг 2025 йил 14 февралдаги "Томорқа ер эгалари ва деҳқон хўжаликлари фаолиятида замонавий ташкилий тизимни жорий қилиш ва молиявий қўллаб-қувватлашнинг қўшимча чора-тадбирлари тўғрисида"ги',
			text_ru: 'Указ Президента Республики Узбекистан от 14 февраля 2025 года «О дополнительных мерах по внедрению современной организационной системы и финансовой поддержке деятельности владельцев приусадебных земель и дехканских хозяйств»',
			docNum_uz: 'PF-22-sonli Farmoni',
			docNum_oz: 'ПФ-22-сонли Фармони',
			docNum_ru: 'Указ № УП-22',
			link: 'https://lex.uz/docs/7085773',
		},
		{
			id: 10,
			text_uz: 'O‘zbekiston Respublikasi Prezidentining 2012-yil 22-oktyabrdagi "O‘zbekistonda fermerlik faoliyatini tashkil qilishni yanada takomillashtirish va uni rivojlantirish chora-tadbirlari to‘g‘risida"gi',
			text_oz: 'Ўзбекистон Республикаси Президентининг 2012 йил 22 октябрдаги "Ўзбекистонда фермерлик фаолиятини ташкил қилишни янада такомиллаштириш ва uni ривожлантириш чора-тадбирлари тўғрисида"ги',
			text_ru: 'Указ Президента Республики Узбекистан от 22 октября 2012 года «О мерах по дальнейшему совершенствованию организации деятельности и развитию фермерства в Узбекистане»',
			docNum_uz: 'PF-4478-sonli Farmoni',
			docNum_oz: 'ПФ-4478-сонли Фармони',
			docNum_ru: 'Указ № УП-4478',
			link: 'https://lex.uz/docs/2070362',
		},
		{
			id: 11,
			text_uz: 'O‘zbekiston Respublikasi Vazirlar Mahkamasining 2025-yil 14-iyuldagi "Respublika ijro etuvchi hokimiyat organlari hamda xo‘jalik birlashmalari rahbarlari va ularning o‘rinbosarlari faoliyatining eng muhim samaradorlik ko‘rsatkichlarini ishlab chiqish tartibini yanada takomillashtirish to‘g‘risida"gi',
			text_oz: 'Ўзбекистон Республикаси Вазирлар Маҳкамасининг 2025 йил 14 июлдаги "Республика ижро этувчи ҳокимият органлари ҳамда хўжалик бирлашмалари раҳбарлари ва уларнинг ўринбосарлари фаолиятининг энг муҳим самарадорлик кўрсаткичларини ишлаб чиқиш тартибини янада такомиллаштириш тўғрисида"ги',
			text_ru: 'Постановление Кабинета Министров Республики Узбекистан от 14 июля 2025 года «О дальнейшем совершенствовании порядка разработки наиболее важных показателей эффективности деятельности руководителей органов исполнительной власти республики и хозяйственных объединений и их заместителей»',
			docNum_uz: '435-sonli qarori',
			docNum_oz: '435-сонли қарори',
			docNum_ru: 'Постановление № 435',
			link: 'https://lex.uz/docs/7241215',
		},
	]

	return (
		<div className='bg-gray-50 dark:bg-gray-900 pt-0 pb-12'>
			<div className='container mx-auto px-4 md:px-8'>
				<ScrollReveal>
					<h1 className='text-3xl md:text-4xl font-bold mb-4 text-center text-gray-900 dark:text-white'>
						{t('normatives_title')}
					</h1>
				</ScrollReveal>

				<div className='space-y-4 max-w-4xl mx-auto'>
					{documents.map((doc, index) => {
						const text =
							locale === 'uz'
								? doc.text_uz
								: locale === 'ru'
									? doc.text_ru
									: doc.text_oz
						const docNum =
							locale === 'uz'
								? doc.docNum_uz
								: locale === 'ru'
									? doc.docNum_ru
									: doc.docNum_oz

						return (
							<ScrollReveal key={doc.id} delay={index * 100}>
								<div className='block p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-md transition-all border border-gray-100 dark:border-gray-700 group'>
									<div className='flex gap-4 items-start'>
										<span className='flex-shrink-0 w-8 h-8 flex items-center justify-center bg-primary/10 text-primary font-bold rounded-full text-sm mt-1'>
											{index + 1}
										</span>
										<p className='text-lg text-gray-700 dark:text-gray-200 leading-relaxed font-medium'>
											{text}{' '}-{' '}
											<Link
												href={doc.link}
												target='_blank'
												className='text-primary font-bold underline decoration-2 decoration-primary/30 hover:decoration-primary transition-all inline-block mt-1'
											>
												{docNum}
											</Link>
										</p>
									</div>
								</div>
							</ScrollReveal>
						)
					})}
				</div>
			</div>
		</div>
	)
}

