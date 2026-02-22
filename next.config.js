/* eslint-disable @typescript-eslint/no-require-imports */

const createNextIntlPlugin = require('next-intl/plugin')

const withNextIntl = createNextIntlPlugin()

/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{ protocol: 'https', hostname: 'uzfk.uz' },
			{ protocol: 'http', hostname: 'uzfk.uz' },
			{ protocol: 'http', hostname: 'localhost' },
			{ protocol: 'http', hostname: '127.0.0.1' },
		],
	},
}

module.exports = withNextIntl(nextConfig)
