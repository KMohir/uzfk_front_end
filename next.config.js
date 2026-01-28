/* eslint-disable @typescript-eslint/no-require-imports */

const createNextIntlPlugin = require('next-intl/plugin')

const withNextIntl = createNextIntlPlugin()

/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'uzfk.uz',
			},
		],
	},
}

module.exports = withNextIntl(nextConfig)
