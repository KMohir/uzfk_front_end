'use client'

import parse from 'html-react-parser'

const DEFAULT_SERVER = process.env.NEXT_PUBLIC_SERVER || 'https://uzfk.uz'

interface HtmlContentProps {
	content?: string
	/** Базовый URL для подстановки в src картинок (напр. /media/... → полный URL). Как в админке. */
	imageBaseUrl?: string
}

/** Подставляет полный URL для img src, начинающихся с / (напр. /media/...) */
function rewriteImageUrls(html: string, baseUrl: string): string {
	if (!html || !baseUrl) return html
	const normalized = baseUrl.replace(/\/$/, '')
	return html.replace(
		/<img([^>]*)\ssrc="(\/[^"]*)"/gi,
		(_, rest, src) => `<img${rest} src="${normalized}${src}"`
	)
}

export default function HtmlContent({ content, imageBaseUrl = DEFAULT_SERVER }: HtmlContentProps) {
	if (!content) {
		return null
	}

	const html = rewriteImageUrls(content, imageBaseUrl)

	return (
		<div className='text-gray-800 text-justify dark:text-white leading-relaxed px-10 prose prose-img:max-w-full prose-img:rounded-lg dark:prose-invert max-w-none'>
			{parse(html)}
		</div>
	)
}
