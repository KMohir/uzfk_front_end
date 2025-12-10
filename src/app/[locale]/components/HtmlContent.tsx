'use client'

import parse from 'html-react-parser'

interface HtmlContentProps {
	content?: string
}

export default function HtmlContent({ content }: HtmlContentProps) {
	if (!content) {
		return null
	}

	return (
		<div className='text-gray-800 text-justify dark:text-white leading-relaxed px-10'>
			{parse(content)}
		</div>
	)
}
