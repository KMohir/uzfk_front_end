/* eslint-disable @typescript-eslint/no-require-imports */

const createNextIntlPlugin = require('next-intl/plugin')

const withNextIntl = createNextIntlPlugin()

/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: ['uzfk.uz'], // Faqat domenni kiriting
	},
}

module.exports = withNextIntl(nextConfig)
