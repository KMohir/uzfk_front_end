'use client'

import parse from 'html-react-parser'

const DEFAULT_SERVER = process.env.NEXT_PUBLIC_SERVER || 'https://uzfk.uz'

interface HtmlContentProps {
	content?: string
	/** Базовый URL для подстановки в src картинок и href ссылок (напр. /media/... → полный URL). */
	imageBaseUrl?: string
}

/** Подставляет полный URL для относительных img src и a href (как в админке). */
function rewriteRelativeUrls(html: string, baseUrl: string): string {
	if (!html || !baseUrl) return html
	const base = baseUrl.replace(/\/$/, '')
	let out = html
	// <img ... src="/path"
	out = out.replace(/<img([^>]*)\s+src="(\/[^"]*)"/gi, (_, rest, src) => `<img${rest} src="${base}${src}"`)
	out = out.replace(/<img([^>]*)\s+src='(\/[^']*)'/gi, (_, rest, src) => `<img${rest} src="${base}${src}"`)
	out = out.replace(/<img\s+src="(\/[^"]*)"/gi, (_, src) => `<img src="${base}${src}"`)
	out = out.replace(/<img\s+src='(\/[^']*)'/gi, (_, src) => `<img src="${base}${src}"`)
	// <a href="/path"> — относительные ссылки ведём на тот же сервер (документы, media и т.д.)
	out = out.replace(/<a([^>]*)\s+href="(\/[^"]*)"/gi, (_, rest, href) => `<a${rest} href="${base}${href}"`)
	out = out.replace(/<a([^>]*)\s+href='(\/[^']*)'/gi, (_, rest, href) => `<a${rest} href="${base}${href}"`)
	out = out.replace(/<a\s+href="(\/[^"]*)"/gi, (_, href) => `<a href="${base}${href}"`)
	out = out.replace(/<a\s+href='(\/[^']*)'/gi, (_, href) => `<a href="${base}${href}"`)
	return out
}

export default function HtmlContent({ content, imageBaseUrl = DEFAULT_SERVER }: HtmlContentProps) {
	if (!content) {
		return null
	}

	const html = rewriteRelativeUrls(content, imageBaseUrl)

	return (
		<div className='text-gray-800 text-justify dark:text-white leading-relaxed px-10 prose prose-img:max-w-full prose-img:rounded-lg dark:prose-invert max-w-none'>
			{parse(html)}
		</div>
	)
}
