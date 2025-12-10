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

module.exports = nextConfig
