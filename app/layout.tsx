import type { Metadata } from 'next'
import { Inter, Fraunces } from 'next/font/google'
import './globals.css'

const inter = Inter({
	subsets: ['latin'],
	variable: '--font-inter',
})

const fraunces = Fraunces({
	subsets: ['latin'],
	variable: '--font-fraunces',
})

export const metadata: Metadata = {
	title: 'Capsulify - Your Personal Capsule Wardrobe Stylist',
	description:
		'Create a capsule wardrobe that works with your body shape. Get 1,000+ outfit combinations from just 30 pieces. Perfect for inverted triangle body shapes.',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<body
				className={`${inter.variable} ${fraunces.variable} antialiased`}
				suppressHydrationWarning={true}
			>
				{children}
			</body>
		</html>
	)
}
