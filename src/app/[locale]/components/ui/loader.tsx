'use client'

import React, { useEffect, useState } from 'react'

export default function Loader() {
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		// Simulate loading time
		const timer = setTimeout(() => {
			setIsLoading(false)
		}, 1000) // Loader vaqtini belgilash

		return () => clearTimeout(timer)
	}, [])

	if (isLoading) {
		// Loader ko‘rinishi
		return (
			<div className='flex items-center justify-center h-screen bg-white dark:bg-gray-900'>
				<div className='loader border-t-4 border-blue-500 rounded-full w-12 h-12 animate-spin'></div>
			</div>
		)
	}

	return null // Yuklanish tugagach, hech narsa ko‘rsatmaymiz
}
