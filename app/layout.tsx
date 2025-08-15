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
	title: 'Capsulify',
	description: 'Capsule Wardrobe Landing Page',
	icons: {
		icon: '/assets/images/logo/logo.svg',
	},
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
