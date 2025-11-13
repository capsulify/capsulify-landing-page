'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'

// Types for FAQ
interface FAQ {
	q: string
	a: React.ReactNode
}

interface FAQColumnProps {
	faqs: FAQ[]
	columnKey: string
}

interface FAQItemProps {
	question: string
	answer: React.ReactNode
	open: boolean
	onClick: () => void
}

// NoSSR wrapper to prevent hydration issues
function NoSSR({ children }: { children: React.ReactNode }) {
	const [mounted, setMounted] = React.useState(false)

	React.useEffect(() => {
		setMounted(true)
	}, [])

	if (!mounted) {
		return <div className='space-y-4'>{children}</div>
	}

	return <>{children}</>
}

// FAQColumn and FAQItem components
function FAQColumn({ faqs, columnKey }: FAQColumnProps) {
	const [openIdx, setOpenIdx] = React.useState<number | null>(null)
	return (
		<NoSSR>
			<div className='space-y-4'>
				{faqs.map((faq, idx) => (
					<FAQItem
						key={faq.q}
						question={faq.q}
						answer={faq.a}
						open={openIdx === idx}
						onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
					/>
				))}
			</div>
		</NoSSR>
	)
}

function FAQItem({ question, answer, open, onClick }: FAQItemProps) {
	return (
		<div className='border-b border-neutral-dark/10 pb-4 last:border-b-0'>
			<button
				className='flex items-center justify-between w-full text-left text-accent font-inter text-base md:text-lg font-bold focus:outline-none py-3 hover:text-accent/80 transition-colors'
				onClick={onClick}
				aria-expanded={open}
				type='button'
			>
				<span className='flex-1 pr-4'>{question}</span>
				<span className='flex-shrink-0'>
					{!open ? (
						<svg
							className='w-5 h-5 text-accent/60'
							fill='none'
							stroke='currentColor'
							strokeWidth='2'
							viewBox='0 0 24 24'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M19 9l-7 7-7-7'
							/>
						</svg>
					) : (
						<svg
							className='w-5 h-5 text-accent/60'
							fill='none'
							stroke='currentColor'
							strokeWidth='2'
							viewBox='0 0 24 24'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M19 15l-7-7-7 7'
							/>
						</svg>
					)}
				</span>
			</button>
			{open && (
				<div className='text-accent/80 text-sm md:text-base leading-relaxed animate-fade-in'>
					{answer}
				</div>
			)}
		</div>
	)
}

// FAQ Section Component with expandable items
function FAQSection() {
	const [openIndex, setOpenIndex] = useState<number | null>(-1) // Start with FAQ 2 open

	const faqs = [
		{
			q: 'How does it work with my existing wardrobe?',
			a: (
				<div className='space-y-3 text-sm md:text-sm text-accent/80 leading-relaxed pt-2'>
					<p>
						Simply upload your pieces (or use our starter
						templates), and Capsulify shows you hundreds of outfit
						combinations from your clothes.
					</p>
					<p className='font-semibold text-accent'>
						You can start small:
					</p>
					<ul className='list-disc list-inside space-y-2 ml-2'>
						<li>
							Upload just 5–10 core pieces to see your first
							outfit combinations
						</li>
						<li>
							Add more pieces over time as you build your digital
							wardrobe
						</li>
						<li>
							Or start from scratch with our curated starter
							templates
						</li>
					</ul>
					<p>
						The more pieces you add, the more outfit combinations
						you discover. You don't need a perfectly curated closet
						— just start with what you have now and see the magic
						happen.
					</p>
				</div>
			),
		},
		{
			q: 'I hate uploading clothes. This sounds like work.',
			a: (
				<div className='space-y-3 text-sm md:text-sm text-accent/80 leading-relaxed pt-2'>
					<p className='font-semibold text-accent'>
						Totally fair. That's why we made it fast.
					</p>
					<p>
						You just need to snap a photo of your existing item
						under good lighting. If you can find the photo of your
						clothing from its website (even with the model wearing
						it!), that's even better. Our app will just detect the
						item and render it accordingly.
					</p>
					<p>
						Or just start with 10–15 core pieces and still get
						dozens of looks. 30 mins and you're done.
					</p>
					<p className='font-semibold text-accent'>
						You don't need to upload your whole closet on Day 1.
					</p>
				</div>
			),
		},
		{
			q: 'Do I need to upload my entire closet?',
			a: (
				<div className='space-y-3 text-sm md:text-sm text-accent/80 leading-relaxed pt-2'>
					<p className='font-semibold text-accent'>
						Nope — definitely not.
					</p>
					<p>You can start with just a few pieces:</p>
					<p className='ml-4'>
						2–4 tops, 2 bottoms, a pair of shoes — and you're good
						to go.
					</p>
					<p>
						Capsulify will already start generating outfit ideas
						based on those.
					</p>
					<p>
						The more you add, the smarter and more personalized the
						outfit suggestions become. But there's no need to upload
						your entire wardrobe on Day 1.
					</p>
					<p className='font-semibold text-accent'>
						Start small. Build as you go. We designed it that way on
						purpose — to be useful even when your closet is still
						half-loaded.
					</p>
				</div>
			),
		},
		{
			q: 'Do I have to have 30 pieces?',
			a: (
				<div className='space-y-3 text-sm md:text-sm text-accent/80 leading-relaxed pt-2'>
					<p className='font-semibold text-accent'>Not at all.</p>
					<p>
						30 pieces is just a{' '}
						<span className='font-semibold'>
							starting framework
						</span>
						, not a requirement. You can begin with as few as 6–12
						items and still see useful outfit combinations. Some
						women start with even less, especially if they're
						building their capsule from scratch.
					</p>
					<p>
						Capsulify is designed to work with{' '}
						<span className='font-semibold'>whatever you have</span>{' '}
						— whether that's a full closet or a handful of go-to
						staples. You can add more pieces over time as your
						wardrobe (or confidence) grows.
					</p>
					<p className='font-semibold text-accent'>
						No pressure. No minimum. Just smarter styling from
						wherever you're starting.
					</p>
				</div>
			),
		},
	]

	return (
		<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
			{/* Left Column */}
			<div className='space-y-4'>
				<FAQItem
					question={faqs[0].q}
					answer={faqs[0].a}
					open={openIndex === 0}
					onClick={() => setOpenIndex(openIndex === 0 ? null : 0)}
				/>
				<FAQItem
					question={faqs[1].q}
					answer={faqs[1].a}
					open={openIndex === 1}
					onClick={() => setOpenIndex(openIndex === 1 ? null : 1)}
				/>
			</div>
			{/* Right Column */}
			<div className='space-y-4'>
				<FAQItem
					question={faqs[2].q}
					answer={faqs[2].a}
					open={openIndex === 2}
					onClick={() => setOpenIndex(openIndex === 2 ? null : 2)}
				/>
				<FAQItem
					question={faqs[3].q}
					answer={faqs[3].a}
					open={openIndex === 3}
					onClick={() => setOpenIndex(openIndex === 3 ? null : 3)}
				/>
			</div>
		</div>
	)
}

// Countdown Timer Component
function CountdownTimer() {
	const [timeLeft, setTimeLeft] = useState({
		days: 0,
		hours: 0,
		minutes: 0,
		seconds: 0,
	})

	useEffect(() => {
		function getSGTTargetDate() {
			const utcDate = new Date(Date.UTC(2025, 7, 30, 15, 59, 0))
			return utcDate
		}

		const targetDate = getSGTTargetDate()

		const updateTimer = () => {
			const now = new Date()
			const difference = targetDate.getTime() - now.getTime()

			if (difference > 0) {
				const days = Math.floor(difference / (1000 * 60 * 60 * 24))
				const hours = Math.floor(
					(difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
				)
				const minutes = Math.floor(
					(difference % (1000 * 60 * 60)) / (1000 * 60)
				)
				const seconds = Math.floor((difference % (1000 * 60)) / 1000)
				setTimeLeft({ days, hours, minutes, seconds })
			} else {
				setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
			}
		}

		updateTimer()
		const timer = setInterval(updateTimer, 1000)
		return () => clearInterval(timer)
	}, [])

	const boxClass =
		'text-neutral-dark bg-white/80 border border-neutral-dark/10 rounded-xl w-14 h-14 md:w-20 md:h-20 flex flex-col items-center justify-center mx-1 backdrop-blur-sm shadow-md'
	const numberClass =
		'font-mono text-lg md:text-xl font-extrabold leading-none tracking-wider text-neutral-dark'
	const labelClass =
		'text-[10px] md:text-xs font-medium mt-1 tracking-[0.18em] text-neutral-dark/70 uppercase'

	return (
		<div className='flex justify-center items-center gap-0 mt-2'>
			<div className={boxClass}>
				<span className={numberClass}>
					{String(timeLeft.days).padStart(2, '0')}
				</span>
				<span className={labelClass}>Days</span>
			</div>
			<div className={boxClass}>
				<span className={numberClass}>
					{String(timeLeft.hours).padStart(2, '0')}
				</span>
				<span className={labelClass}>Hours</span>
			</div>
			<div className={boxClass}>
				<span className={numberClass}>
					{String(timeLeft.minutes).padStart(2, '0')}
				</span>
				<span className={labelClass}>Minutes</span>
			</div>
			<div className={boxClass}>
				<span className={numberClass}>
					{String(timeLeft.seconds).padStart(2, '0')}
				</span>
				<span className={labelClass}>Seconds</span>
			</div>
		</div>
	)
}

// eBook Section logic
function EbookSection() {
	const [email, setEmail] = useState('')
	const [name, setName] = useState('')
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState('')
	const [success, setSuccess] = useState(false)
	const [mounted, setMounted] = useState(false)

	useEffect(() => {
		setMounted(true)
	}, [])

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setLoading(true)
		setError('')
		setSuccess(false)
		try {
			const res = await fetch('/api/subscriber', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email, name }),
			})
			const data = await res.json()
			if (!res.ok) {
				throw new Error(data.error || 'Failed to subscribe')
			}
			setSuccess(true)
		} catch (err: any) {
			setError(err.message || 'Something went wrong.')
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className='w-full max-w-6xl mx-auto px-4 py-10'>
			<h2 className='text-center text-xl md:text-3xl font-extrabold font-fraunces mb-8 text-accent'>
				Get instant access to the full eBook
			</h2>
			<div className='flex justify-center my-8'>
				<Image
					src='/assets/images/ebookcover.jpeg'
					alt='eBook Cover'
					width={320}
					height={420}
					className='w-80 h-auto rounded-lg shadow-xl bg-white object-contain max-w-full'
				/>
			</div>

			{!mounted ? (
				<div className='w-full max-w-md mx-auto flex flex-col gap-4'>
					<div className='w-full flex flex-col gap-3'>
						<div className='flex-1 px-4 py-3 rounded-lg border border-neutral-dark/20 bg-soft-accent/40 h-[52px]'></div>
						<div className='flex-1 px-4 py-3 rounded-lg border border-neutral-dark/20 bg-soft-accent/40 h-[52px]'></div>
					</div>
					<div className='w-full bg-accent text-neutral-dark font-bold px-6 py-3 rounded-lg text-base capitalize font-fraunces italic text-center'>
						Download eBook Now
					</div>
				</div>
			) : (
				<form
					onSubmit={handleSubmit}
					className='w-full max-w-md mx-auto flex flex-col gap-4'
				>
					<div className='w-full flex flex-col gap-3'>
						<input
							type='text'
							required
							placeholder='Enter your name'
							value={name}
							onChange={(e) => setName(e.target.value)}
							className='flex-1 px-4 py-3 rounded-lg border border-neutral-dark/20 focus:outline-none text-accent bg-soft-accent/30 text-base'
						/>
						<input
							type='email'
							required
							placeholder='Enter your e-mail address'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className='flex-1 px-4 py-3 rounded-lg border border-neutral-dark/20 focus:outline-none text-accent bg-soft-accent/30 text-base'
						/>
					</div>
					<button
						type='submit'
						disabled={loading}
						className='btn-primary w-full uppercase tracking-wide text-sm font-fraunces italic cursor-pointer disabled:opacity-60'
					>
						{loading ? 'Processing...' : 'Download eBook Now'}
					</button>
				</form>
			)}
			{error && <p className='text-red-600 text-center mt-4'>{error}</p>}
			{success && (
				<p className='text-green-600 text-center mt-4'>
					Check your email to download the ebook!
				</p>
			)}
		</div>
	)
}

const page = () => {
	const featureHighlights = [
		{
			title: 'Be a co-creator',
			description:
				'Help shape features, test updates, and influence design with direct feedback access.',
			icon: (
				<svg
					className='w-5 h-5 text-white'
					fill='none'
					stroke='currentColor'
					viewBox='0 0 24 24'
				>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						strokeWidth={2}
						d='M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z'
					/>
				</svg>
			),
		},
		{
			title: 'Build your capsule with ease',
			description:
				'Upload pieces, auto-tag by category and color, and organise outfits by occasions in minutes.',
			icon: (
				<svg
					className='w-5 h-5 text-white'
					fill='none'
					stroke='currentColor'
					viewBox='0 0 24 24'
				>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						strokeWidth={2}
						d='M13 7h8m0 0v8m0-8l-8 8-4-4-6 6'
					/>
				</svg>
			),
		},
		{
			title: 'Plan faster mornings',
			description:
				'Wake up knowing exactly which outfit to wear for work, weekends, dates and everything between.',
			icon: (
				<svg
					className='w-5 h-5 text-white'
					fill='none'
					stroke='currentColor'
					viewBox='0 0 24 24'
				>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						strokeWidth={2}
						d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
					/>
				</svg>
			),
		},
	]

	const valueHighlights = [
		{
			title: 'Works everywhere',
			description:
				'Responsive on mobile and desktop—no app install needed, just log in and plan.',
			icon: (
				<svg
					className='w-5 h-5 text-white'
					fill='none'
					stroke='currentColor'
					viewBox='0 0 24 24'
				>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						strokeWidth={2}
						d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
					/>
				</svg>
			),
		},
		{
			title: 'Lifetime access, no fluff',
			description:
				'Locked-in pricing forever. No pushy upsells—just smart outfit planning tailored to your style.',
			icon: (
				<svg
					className='w-5 h-5 text-white'
					fill='none'
					stroke='currentColor'
					viewBox='0 0 24 24'
				>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						strokeWidth={2}
						d='M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'
					/>
				</svg>
			),
		},
		{
			title: 'Maximise what you already own',
			description:
				"See new outfit combinations instantly. It's not about buying more, it's about using better.",
			icon: (
				<svg
					className='w-5 h-5 text-white'
					fill='none'
					stroke='currentColor'
					viewBox='0 0 24 24'
				>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						strokeWidth={2}
						d='M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
					/>
				</svg>
			),
		},
	]

	return (
		<div className='min-h-screen bg-neutral-light text-neutral-dark font-inter'>
			{/* Main Content */}
			<main>
				{/* Hero Section - Split Screen */}
				<section className='w-full bg-[#f8f4f0] py-16 md:py-20 px-6 md:px-12 text-center md:text-left relative'>
					<div className='max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 md:gap-16'>
						{/* Left: Text Content */}
						<div className='flex-1 space-y-6'>
							{/* Logo and Brand Name */}
							<div className='inline-flex items-center gap-2'>
								<Image
									src='/assets/images/logo/logo.svg'
									alt='Capsulify Logo'
									width={40}
									height={40}
									className='w-8 h-8 md:w-10 md:h-10'
								/>
								<span className='font-bold font-fraunces text-3xl tracking-tight text-accent'>
									CAPSULIFY
								</span>
							</div>

							{/* Headline */}
							<h1 className='text-[32px] md:text-4xl lg:text-5xl font-extrabold leading-tight font-fraunces'>
								<span className='text-accent'>Get </span>
								<span className='text-[#ac4b5c]'>1000+</span>
								<span className='text-accent'> Outfit </span>
								<span className='text-[#ac4b5c]'>Ideas</span>
								<span className='text-accent'>
									{' '}
									from Clothes You Already Own
								</span>
							</h1>

							{/* Body Text */}
							<p className='text-sm md:text-base text-accent/70 leading-relaxed max-w-md'>
								Stop staring at a full closet with nothing to
								wear. Discover endless outfit combinations from
								your existing wardrobe.
							</p>

							{/* CTA Buttons */}
							<div className='flex flex-col sm:flex-row gap-4'>
								<a
									href='https://app.capsulify.app/'
									target='_blank'
									rel='noopener noreferrer'
									className='bg-[#f8c255] text-accent font-bold px-8 py-3 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-xl text-sm uppercase font-fraunces inline-flex items-center justify-center gap-2'
								>
									<span>Start Your Style Journey</span>
									<svg
										className='w-4 h-4'
										fill='none'
										stroke='currentColor'
										viewBox='0 0 24 24'
									>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth={2}
											d='M9 5l7 7-7 7'
										/>
									</svg>
								</a>
							</div>

							{/* Stats */}
							<div className='flex gap-12 pt-4'>
								<div>
									<div className='text-xl md:text-2xl font-extrabold text-accent'>
										30+
									</div>
									<div className='text-xs text-accent/70 mt-1'>
										Clothes
									</div>
								</div>
								<div>
									<div className='text-xl md:text-2xl font-extrabold text-accent'>
										1000+
									</div>
									<div className='text-xs text-accent/70 mt-1'>
										Outfit Ideas
									</div>
								</div>
								<div>
									<div className='text-xl md:text-2xl font-extrabold text-accent'>
										$0
									</div>
									<div className='text-xs text-accent/70 mt-1'>
										Extra Spending
									</div>
								</div>
							</div>
						</div>

						{/* Right: Hero Image */}
						<div className='flex-1'>
							<div className='rounded-2xl overflow-hidden'>
								<Image
									src='/assets/landing-page/hero-section-img.jpg'
									alt='Capsulify App Preview'
									width={700}
									height={800}
									className='w-full h-auto object-cover'
								/>
							</div>
						</div>
					</div>
					{/* Pink Accent Band at Bottom */}
					<div className='absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-[#d8b4b1] to-transparent opacity-60'></div>
				</section>

				{/* Closet Thoughts Section (between Hero and Sound Familiar) */}
				<section className='section-wrapper tight px-6 md:px-10'>
					<div className='max-w-6xl mx-auto'>
						<div className='flex flex-col items-center text-center space-y-4 mb-8'>
							<span className='badge-soft'>
								Pain points we heard from 100+ closets
							</span>
							<h2 className='text-3xl md:text-4xl font-extrabold font-fraunces text-neutral-dark text-center'>
								Have you ever looked in your closet and thought…
							</h2>
						</div>
						<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8'>
							{[
								{
									title: 'I have so many clothes but always wear the same outfits.',
									body: 'Your closet is full of great pieces, but you default to the same combinations because they feel safe and familiar.',
								},
								{
									title: 'This top is cute but I never know what to pair it with.',
									body: 'Some clothes look great on their own, but you struggle to create outfits that make them shine together.',
								},
								{
									title: 'I end up buying more instead of wearing what I have.',
									body: "When you're stuck, it's easier to shop than to experiment with combinations you've never tried.",
								},
								{
									title: "I can't recreate those outfit ideas I saved.",
									body: "Pinterest looks are inspiring but when you try to recreate them with your actual clothes, they don't quite hit the same.",
								},
								{
									title: "I don't know which of my pieces actually look good together.",
									body: 'Not all combinations work, and trying everything on feels exhausting. You need a smarter way to see what works.',
								},
								{
									title: 'I want to maximize my existing wardrobe.',
									body: 'You believe in capsule wardrobes but need help discovering all the outfit combinations your clothes can create.',
								},
							].map((item, index) => (
								<div
									key={index}
									className='relative card-base bg-white text-left md:text-left px-6 py-8'
								>
									<span className='absolute top-6 right-6 text-5xl font-extrabold text-accent-4 select-none'>
										❞
									</span>
									<h3 className='text-lg font-bold text-neutral-dark mb-4 mt-8'>
										{item.title}
									</h3>
									<p className='text-sm text-neutral-dark/70 leading-relaxed'>
										{item.body}
									</p>
								</div>
							))}
						</div>
					</div>
				</section>

				{/* Founder Story Section */}
				<section className='section-wrapper tight px-6 md:px-10'>
					<div className='max-w-6xl mx-auto bg-soft-accent/35 rounded-3xl px-6 md:px-12'>
						<h2 className='text-3xl md:text-4xl font-extrabold font-fraunces text-neutral-dark text-center mb-12'>
							From frustration to function: why I built Capsulify
						</h2>
						<div className='flex flex-col md:flex-row gap-10 md:gap-14 items-center'>
							{/* Left: Image */}
							<div className='flex-1 w-full relative'>
								<div className='rounded-2xl overflow-hidden'>
									<Image
										src='/assets/landing-page/founder-img.jpg'
										alt='Ayuni, Founder of Capsulify'
										width={520}
										height={740}
										className='w-full h-auto object-cover'
									/>
								</div>
							</div>
							<div className='hidden md:block w-[1px] bg-accent/40 h-full'></div>
							{/* Right: Text */}
							<div className='flex-1 space-y-5 text-base text-neutral-dark/80 leading-relaxed'>
								<p>
									Hi, I'm Ayuni, founder of Capsulify. Like
									many women, I used to have a closet full of
									clothes but still felt like I had nothing to
									wear. I'd buy new pieces, save outfit
									inspiration on Pinterest, but when it came
									time to get dressed, I'd just reach for the
									same few combinations.
								</p>
								<p>So I tried to fix it the “right” way:</p>
								<p>
									I bought capsule wardrobe books. Followed
									the formulas. Bought every recommended
									piece—tops, bottoms, shoes, bags. But when
									it came time to create outfits from my
									existing pieces? I was squinting at a table
									of text instructions trying to figure out
									what goes with what. I thought,
									<span className='font-bold text-primary'>
										{' '}
										Why isn't there an app for this?
									</span>
								</p>
								<p>
									And the advice itself? Cookie-cutter. One
									stylist claimed,
									<span className='font-bold text-primary'>
										{' '}
										“Just pair basics together.”
									</span>{' '}
									But which basics? With what? That wasn't
									helping me create actual outfits.
								</p>
								<p>
									I turned to Pinterest and Instagram for
									outfit ideas, but when I tried to recreate
									those looks with my actual clothes, they
									never quite worked. I couldn't figure out
									which of my pieces would create those
									combinations, so I ended up buying more
									clothes trying to match what I saw.
								</p>
								<p>
									I tried every fashion app I could find but
									they were overwhelming. Too many features,
									too much content, too focused on shopping.
									They assumed I wanted to be a fashionista. I
									didn't. I just wanted to see{' '}
									<span className='font-bold text-primary'>
										more outfit combinations from my
										existing wardrobe, not buy more.
									</span>
								</p>
								<p>
									So I decided to build what I couldn't find
									with two friends, Martin and Aditi.
									Capsulify is the tool I wish I had years
									ago.
								</p>
								<p>
									It helps you see hundreds of outfit
									combinations from your existing wardrobe. No
									fluff. No pressure to shop. Just smart
									outfit planning that shows you which pieces
									work together for you.
								</p>
								<p className='font-bold text-primary'>
									This isn't about buying a whole new
									wardrobe. It's about finally maximizing the
									clothes you already own.
								</p>
								<p className='pt-4'>
									<span className='font-bold text-primary text-lg'>
										Ayuni
									</span>
									<br />
									<span className='text-sm md:text-base text-neutral-dark/70'>
										Founder, Capsulify
									</span>
								</p>
							</div>
						</div>
					</div>
				</section>

				{/* Feelings Section (replacing Sound Familiar) */}
				<section className='w-full py-20 px-6 md:px-12'>
					<div className='max-w-6xl mx-auto text-center space-y-12'>
						<div>
							<h2 className='text-3xl md:text-4xl font-extrabold font-fraunces text-accent-2 mb-4'>
								You Don't Want More Clothes.
							</h2>
							<p className='text-base md:text-md text-accent/70 max-w-2xl mx-auto'>
								You want these feelings from the wardrobe you
								already own.
							</p>
						</div>
						<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
							<div className='relative pink-soft pink-soft rounded-none p-8'>
								<span className='absolute top-4 left-4 bg-[#994351] text-white text-[12px] md:text-[13px] px-3 py-1 rounded-full tracking-wider font-bold'>
									Goal
								</span>
								<h3 className='text-base font-bold  text-accent mb-3 mt-12 text-left'>
									I want to wear all the clothes I own, not
									just my go-to pieces.
								</h3>
								<p className='text-xs text-accent/70 leading-relaxed text-left'>
									You have great pieces collecting dust in
									your closet because you don't know how to
									style them.
								</p>
							</div>
							<div className='relative pink-soft bg-white rounded-xl p-8 '>
								<span className='absolute top-4 left-4 bg-[#994351] text-white text-[12px] md:text-[13px] px-3 py-1 rounded-full tracking-wider font-bold'>
									Outcome
								</span>
								<h3 className='text-base font-bold text-accent mb-3 mt-12 text-left'>
									I want to see hundreds of outfit ideas from
									my existing wardrobe.
								</h3>
								<p className='text-xs text-accent/70 leading-relaxed text-left'>
									Stop defaulting to the same 5 outfits. Your
									clothes can create dozens of combinations
									you've never tried.
								</p>
							</div>
							<div className='relative pink-soft bg-[#f3f0e9] rounded-xl p-8 '>
								<span className='absolute top-4 left-4 bg-[#994351] text-white text-[12px] md:text-[13px] px-3 py-1 rounded-full tracking-wider font-bold'>
									Outcome
								</span>
								<h3 className='text-base font-bold text-accent mb-3 mt-12 text-left'>
									I want to stop buying new clothes and wear
									what I have.
								</h3>
								<p className='text-xs text-accent/70 leading-relaxed text-left'>
									Rediscover your existing wardrobe and see
									how 30 smart pieces can create 1000+ outfit
									combinations.
								</p>
							</div>
							<div className='relative pink-soft bg-white rounded-xl p-8 '>
								<span className='absolute top-4 left-4 bg-[#994351] text-white text-[12px] md:text-[13px] px-3 py-1 rounded-full tracking-wider font-bold'>
									Goal
								</span>
								<h3 className='text-base font-bold text-accent mb-3 mt-12 text-left'>
									I want to look put-together without trying
									every combination.
								</h3>
								<p className='text-xs text-accent/70 leading-relaxed text-left'>
									You want to see which outfits work before
									you even put them on — making your morning
									routine effortless.
								</p>
							</div>
							<div className='relative pink-soft bg-[#f3f0e9] rounded-xl p-8 '>
								<span className='absolute top-4 left-4 bg-[#994351] text-white text-[12px] md:text-[13px] px-3 py-1 rounded-full tracking-wider font-bold'>
									Feeling
								</span>
								<h3 className='text-base font-bold text-accent mb-3 mt-12 text-left'>
									I want to rediscover my closet and fall in
									love with my clothes again.
								</h3>
								<p className='text-xs text-accent/70 leading-relaxed text-left'>
									Stop letting great pieces sit unworn. Let
									Capsulify show you fresh ways to style what
									you already own.
								</p>
							</div>
							<div className='relative pink-soft bg-white rounded-xl p-8 '>
								<span className='absolute top-4 left-4 bg-[#994351] text-white text-[12px] md:text-[13px] px-3 py-1 rounded-full tracking-wider font-bold'>
									Feeling
								</span>
								<h3 className='text-base font-bold text-accent mb-3 mt-12 text-left'>
									I want dressing to be a joy,
									<br />
									not a chore.
								</h3>
								<p className='text-xs text-accent/70 leading-relaxed text-left'>
									You want to feel good every morning, knowing
									exactly what to wear — without overthinking
									it.
								</p>
							</div>
						</div>
					</div>
				</section>

				{/* eBook Section */}
				<EbookSection />

				{/* How It Works Section */}
				<section
					id='how-it-works'
					className='w-full py-12 px-6 md:px-12'
				>
					<div className='max-w-6xl mx-auto text-center space-y-12'>
						<div>
							<h2 className='text-4xl md:text-5xl font-extrabold font-fraunces text-accent-2 mb-2'>
								How It Works
							</h2>
							<p className='text-base md:text-md text-primary max-w-2xl mx-auto font-semibold capitalize'>
								From closet chaos to curated style
							</p>
						</div>

						{/* Four Step Cards */}
						<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
							{/* Step 1 */}
							<div className='bg-[#f3f0e9] rounded-xl p-6 pb-12 shadow-lg relative'>
								<div className='absolute top-4 right-4 text-4xl font-extrabold text-[#d8b4b1]'>
									01
								</div>
								<div className='w-10 h-10 bg-primary rounded-lg flex items-center justify-center mb-4'>
									<svg
										className='w-5 h-5 text-white'
										fill='none'
										stroke='currentColor'
										viewBox='0 0 24 24'
									>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth={2}
											d='M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z'
										/>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth={2}
											d='M15 13a3 3 0 11-6 0 3 3 0 016 0z'
										/>
									</svg>
								</div>
								<h3 className='text-base font-bold text-accent mb-3'>
									Capture Your Wardrobe
								</h3>
								<p className='text-xs text-accent/70 leading-relaxed'>
									Take quick photos of your clothes or upload
									existing images. Our AI instantly catalogs
									every piece.
								</p>
							</div>

							<div className='rounded-xl p-6 pb-12 shadow-lg relative'>
								<div className='absolute top-4 right-4 text-4xl font-extrabold text-[#d8b4b1]'>
									02
								</div>
								<div className='w-10 h-10 bg-[#ac4b5c] rounded-lg flex items-center justify-center mb-4'>
									<svg
										className='w-5 h-5 text-white'
										fill='none'
										stroke='currentColor'
										viewBox='0 0 24 24'
									>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth={2}
											d='M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01'
										/>
									</svg>
								</div>
								<h3 className='text-base font-bold text-accent mb-3'>
									Get Outfit Combinations
								</h3>
								<p className='text-xs text-accent/70 leading-relaxed'>
									Receive personalized outfit suggestions that
									match your style and occasion needs.
								</p>
							</div>

							<div className='rounded-xl p-6 pb-12 shadow-lg relative'>
								<div className='absolute top-4 right-4 text-4xl font-extrabold text-[#d8b4b1]'>
									03
								</div>
								<div className='w-10 h-10 bg-[#ac4b5c] rounded-lg flex items-center justify-center mb-4'>
									<svg
										className='w-5 h-5 text-white'
										fill='none'
										stroke='currentColor'
										viewBox='0 0 24 24'
									>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth={2}
											d='M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z'
										/>
									</svg>
								</div>
								<h3 className='text-base font-bold text-accent mb-3'>
									Save Your Outfits
								</h3>
								<p className='text-xs text-accent/70 leading-relaxed'>
									Favorite the Outfits of your liking and head
									to Mirror to see yourself transform!
								</p>
							</div>

							{/* Step 4 */}
							<div className='rounded-xl p-6 pb-12 shadow-lg relative'>
								<div className='absolute top-4 right-4 text-4xl font-extrabold text-[#d8b4b1]'>
									04
								</div>
								<div className='w-10 h-10 bg-[#ac4b5c] rounded-lg flex items-center justify-center mb-4'>
									<svg
										className='w-5 h-5 text-white'
										fill='none'
										stroke='currentColor'
										viewBox='0 0 24 24'
									>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth={2}
											d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
										/>
									</svg>
								</div>
								<h3 className='text-base font-bold text-accent mb-3'>
									Try Saved Outfits in Mirror
								</h3>
								<p className='text-xs text-accent/70 leading-relaxed'>
									Virtual Try on feature will let you see
									yourself in the clothes you always imagined
									how it would look on you.
								</p>
							</div>
						</div>
					</div>
				</section>

				{/* Feelings When It Works Section */}
				<section className='w-full py-10 px-6 md:px-12'>
					<div className='max-w-6xl mx-auto text-center space-y-12'>
						<h2 className='max-w-3xl mx-auto text-3xl md:text-4xl font-extrabold font-fraunces text-accent-2'>
							<span>
								What It Feels Like When Your Wardrobe Finally
								Works{' '}
							</span>
							<span className='italic'>for</span>
							<span> You!</span>
						</h2>

						<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
							{/* Benefit 1 */}
							<div className='bg-[#f8c255]/10 rounded-xl p-6 text-left'>
								<div className='flex items-start gap-3'>
									<div className='w-10 h-6 rounded-full bg-accent-soft flex items-center justify-center mt-0.5'>
										<svg
											className='w-3.5 h-3.5 text-accent'
											viewBox='0 0 20 20'
											fill='currentColor'
										>
											<path
												fillRule='evenodd'
												d='M16.707 5.293a1 1 0 010 1.414l-7.25 7.25a1 1 0 01-1.414 0l-3-3a1 1 0 111.414-1.414l2.293 2.293 6.543-6.543a1 1 0 011.414 0z'
												clipRule='evenodd'
											/>
										</svg>
									</div>
									<p className='text-sm text-accent'>
										Wake up knowing exactly what to wear and
										loving how it looks on you
									</p>
								</div>
							</div>

							{/* Benefit 2 */}
							<div className='bg-[#f8c255]/10 rounded-xl p-6 text-left'>
								<div className='flex items-start gap-3'>
									<div className='w-10 h-6 rounded-full bg-accent-soft flex items-center justify-center mt-0.5'>
										<svg
											className='w-3.5 h-3.5 text-accent'
											viewBox='0 0 20 20'
											fill='currentColor'
										>
											<path
												fillRule='evenodd'
												d='M16.707 5.293a1 1 0 010 1.414l-7.25 7.25a1 1 0 01-1.414 0l-3-3a1 1 0 111.414-1.414l2.293 2.293 6.543-6.543a1 1 0 011.414 0z'
												clipRule='evenodd'
											/>
										</svg>
									</div>
									<p className='text-sm text-accent'>
										Look completely different every day,
										using just 30 smart pieces
									</p>
								</div>
							</div>

							{/* Benefit 3 */}
							<div className='bg-[#f8c255]/10 rounded-xl p-6 text-left'>
								<div className='flex items-start gap-3'>
									<div className='w-10 h-6 rounded-full bg-accent-soft flex items-center justify-center mt-0.5'>
										<svg
											className='w-3.5 h-3.5 text-accent'
											viewBox='0 0 20 20'
											fill='currentColor'
										>
											<path
												fillRule='evenodd'
												d='M16.707 5.293a1 1 0 010 1.414l-7.25 7.25a1 1 0 01-1.414 0l-3-3a1 1 0 111.414-1.414l2.293 2.293 6.543-6.543a1 1 0 011.414 0z'
												clipRule='evenodd'
											/>
										</svg>
									</div>
									<p className='text-sm text-accent'>
										Feel elegant on dates, commanding at
										work, and effortlessly stylish on
										weekends
									</p>
								</div>
							</div>

							{/* Benefit 4 */}
							<div className='bg-[#f8c255]/10 rounded-xl p-6 text-left'>
								<div className='flex items-start gap-3'>
									<div className='w-10 h-6 rounded-full bg-accent-soft flex items-center justify-center mt-0.5'>
										<svg
											className='w-3.5 h-3.5 text-accent'
											viewBox='0 0 20 20'
											fill='currentColor'
										>
											<path
												fillRule='evenodd'
												d='M16.707 5.293a1 1 0 010 1.414l-7.25 7.25a1 1 0 01-1.414 0l-3-3a1 1 0 111.414-1.414l2.293 2.293 6.543-6.543a1 1 0 011.414 0z'
												clipRule='evenodd'
											/>
										</svg>
									</div>
									<p className='text-sm text-accent'>
										Get real compliments. Not "you look
										nice," but "that outfit is stunning on
										you"
									</p>
								</div>
							</div>

							{/* Benefit 5 */}
							<div className='bg-[#f8c255]/10 rounded-xl p-6 text-left'>
								<div className='flex items-start gap-3'>
									<div className='w-10 h-6 rounded-full bg-accent-soft flex items-center justify-center mt-0.5'>
										<svg
											className='w-3.5 h-3.5 text-accent'
											viewBox='0 0 20 20'
											fill='currentColor'
										>
											<path
												fillRule='evenodd'
												d='M16.707 5.293a1 1 0 010 1.414l-7.25 7.25a1 1 0 01-1.414 0l-3-3a1 1 0 111.414-1.414l2.293 2.293 6.543-6.543a1 1 0 011.414 0z'
												clipRule='evenodd'
											/>
										</svg>
									</div>
									<p className='text-sm text-accent'>
										Save thousands by buying less but
										wearing more
									</p>
								</div>
							</div>

							{/* Benefit 6 */}
							<div className='bg-[#f8c255]/10 rounded-xl p-6 text-left'>
								<div className='flex items-start gap-3'>
									<div className='w-10 h-6 rounded-full bg-accent-soft flex items-center justify-center mt-0.5'>
										<svg
											className='w-3.5 h-3.5 text-accent'
											viewBox='0 0 20 20'
											fill='currentColor'
										>
											<path
												fillRule='evenodd'
												d='M16.707 5.293a1 1 0 010 1.414l-7.25 7.25a1 1 0 01-1.414 0l-3-3a1 1 0 111.414-1.414l2.293 2.293 6.543-6.543a1 1 0 011.414 0z'
												clipRule='evenodd'
											/>
										</svg>
									</div>
									<p className='text-sm text-accent'>
										No more panic shopping, style ruts, or
										outfit regrets. Just confidence,
										clarity, and compliments
									</p>
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* Capsulify Is For You If Section */}
				<section className='w-full py-20 px-6 md:px-12'>
					<div className='max-w-6xl mx-auto text-center space-y-10'>
						<h2 className='text-3xl md:text-4xl font-extrabold font-fraunces text-neutral-dark'>
							<span>Capsulify is </span>
							<span className='italic'>for you</span>
							<span> if...</span>
						</h2>

						<div className='space-y-4 text-left flex justify-center flex-col items-center'>
							{/* Item */}
							<div className='md:md:w-[55%] bg-[#d8b4b1]/25 text-primary rounded-xl p-4 flex items-center justify-start gap-4'>
								<p className='text-sm md:text-base text-accent'>
									You have lots of clothes, but feel like you
									wear the same few things
								</p>
							</div>
							<div className='md:w-[55%] bg-[#d8b4b1]/25 text-primary rounded-xl p-4 flex items-center justify-start gap-4'>
								<p className='text-sm md:text-base text-accent'>
									You want to look good on dates, workdays,
									and weekends effortlessly
								</p>
							</div>
							<div className='md:w-[55%] bg-[#d8b4b1]/25 text-primary rounded-xl p-4 flex items-center justify-start gap-4'>
								<p className='text-sm md:text-base text-accent'>
									You want to maximize your existing wardrobe
									and see more outfits
								</p>
							</div>
							<div className='md:w-[55%] bg-[#d8b4b1]/25 text-primary rounded-xl p-4 flex items-center justify-start gap-4'>
								<p className='text-sm md:text-base text-accent'>
									You don't want to pay $200+ for a stylist
									every season
								</p>
							</div>
							<div className='md:w-[55%] bg-[#d8b4b1]/25 text-primary rounded-xl p-4 flex items-center justify-start gap-4'>
								<p className='text-sm md:text-base text-accent'>
									You want to stop buying more and wear what
									you already have
								</p>
							</div>
						</div>

						<div className='pt-2'>
							<a
								href='https://app.capsulify.app/'
								target='_blank'
								rel='noopener noreferrer'
								className='btn-primary inline-flex items-center justify-center uppercase tracking-wide text-sm'
							>
								Play with Capsulify now
							</a>
						</div>
					</div>
				</section>

				{/* FAQ Section */}
				<section className='w-full py-10 px-6 md:px-12'>
					<div className='max-w-6xl mx-auto'>
						<div className='p-8 md:p-10'>
							<h2 className='text-3xl md:text-4xl font-extrabold font-fraunces text-accent-2 text-center mb-10'>
								FAQs
							</h2>

							<FAQSection />
						</div>
					</div>
				</section>

				{/* Features Grid Section */}
				<section className='section-wrapper px-6 md:px-10'>
					<div className='max-w-6xl mx-auto space-y-12'>
						<div className='text-center space-y-4'>
							<span className='badge-soft'>
								What you'll unlock
							</span>
							<h2 className='text-3xl md:text-4xl font-extrabold font-fraunces text-neutral-dark'>
								Everything you need to get dressed with clarity
							</h2>
							<p className='text-neutral-dark/70 max-w-2xl mx-auto text-base md:text-lg'>
								The same content—now structured to show the
								transformation: from getting organised to
								maximising every piece you already own.
							</p>
						</div>
						<div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
							{featureHighlights.map((feature, index) => (
								<div
									key={`feature-${index}`}
									className='card-base bg-white'
								>
									<div className='w-12 h-12 rounded-full bg-primary flex items-center justify-center mb-5'>
										{feature.icon}
									</div>
									<h3 className='text-lg font-semibold text-neutral-dark mb-3'>
										{feature.title}
									</h3>
									<p className='text-sm text-neutral-dark/70 leading-relaxed'>
										{feature.description}
									</p>
								</div>
							))}
						</div>
						<div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
							{valueHighlights.map((value, index) => (
								<div
									key={`value-${index}`}
									className='card-base bg-white'
								>
									<div className='w-12 h-12 rounded-full bg-primary flex items-center justify-center mb-5'>
										{value.icon}
									</div>
									<h3 className='text-lg font-semibold text-neutral-dark mb-3'>
										{value.title}
									</h3>
									<p className='text-sm text-neutral-dark/70 leading-relaxed'>
										{value.description}
									</p>
								</div>
							))}
						</div>
					</div>
				</section>

				{/* Final CTA Section */}
				<section className='section-wrapper px-6 md:px-10 bg-primary text-neutral-light'>
					<div className='max-w-4xl mx-auto text-center space-y-8'>
						<h2 className='text-3xl md:text-4xl font-extrabold font-fraunces'>
							Ready to transform your wardrobe?
						</h2>
						<div className='space-y-3 max-w-2xl mx-auto'>
							<p className='text-xl font-semibold'>
								Try it risk-free. Upload your first 12 pieces
								for free and see the combinations waiting in
								your closet.
							</p>
						</div>
						<div className='flex flex-wrap justify-center gap-4 text-sm font-medium text-neutral-light/85'>
							{[
								'Free to start',
								'No credit card required',
								'Cancel anytime',
							].map((pill) => (
								<span
									key={pill}
									className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 backdrop-blur-sm'
								>
									<svg
										className='w-4 h-4 text-accent'
										fill='none'
										stroke='currentColor'
										viewBox='0 0 24 24'
									>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth={2}
											d='M5 13l4 4L19 7'
										/>
									</svg>
									{pill}
								</span>
							))}
						</div>
						<div className='flex flex-col sm:flex-row gap-4 justify-center'>
							<a
								href='https://app.capsulify.app/'
								target='_blank'
								rel='noopener noreferrer'
								className='btn-primary inline-flex items-center justify-center gap-2 uppercase tracking-wide text-sm'
							>
								Get instant access
								<svg
									className='w-4 h-4'
									fill='none'
									stroke='currentColor'
									viewBox='0 0 24 24'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={2}
										d='M9 5l7 7-7 7'
									/>
								</svg>
							</a>
							<a
								href='#how-it-works'
								className='inline-flex items-center justify-center gap-2 uppercase tracking-wide text-sm px-8 py-3 rounded-xl border border-neutral-light/40 text-neutral-light bg-white/5 hover:bg-white/10 transition-colors'
							>
								See how it works
							</a>
						</div>
						<div className='flex items-center justify-center gap-2 text-sm text-neutral-light/70'>
							<svg
								className='w-5 h-5 text-accent'
								fill='none'
								stroke='currentColor'
								viewBox='0 0 24 24'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='M12 11c-1.657 0-3-1.343-3-3V5a3 3 0 116 0v3c0 1.657-1.343 3-3 3zm-7 9a7 7 0 0114 0H5z'
								/>
							</svg>
							<span>
								Your data stays private. We only use it to build
								better outfits for you.
							</span>
						</div>
					</div>
				</section>
			</main>

			{/* Footer */}
			<footer className='w-full text-primary py-16 px-6 md:px-12'>
				<div className='max-w-6xl mx-auto space-y-12'>
					<div className='grid grid-cols-1 md:grid-cols-4 gap-10'>
						{/* Branding */}
						<div className='space-y-4'>
							<div className='flex items-center gap-3'>
								<div className='w-10 h-10 brand-gradient rounded-lg flex items-center justify-center'>
									<Image
										src='/assets/images/logo/logo-light.svg'
										alt='Capsulify'
										width={24}
										height={24}
										className='w-6 h-6'
									/>
								</div>
								<span className='font-bold text-base'>
									Capsulify
								</span>
							</div>
						</div>

						{/* Product Links */}
						<div>
							<h3 className='font-bold mb-4'>Product</h3>
							<ul className='space-y-2 text-sm'>
								<li>
									<a
										href='#features'
										className=' transition-colors'
									>
										Features
									</a>
								</li>
								<li>
									<a
										href='#how-it-works'
										className='hover:text-accent transition-colors'
									>
										How It Works
									</a>
								</li>
								<li>
									<a
										href='#pricing'
										className='hover:text-accent transition-colors'
									>
										Pricing
									</a>
								</li>
								<li>
									<a
										href='#faq'
										className='hover:text-accent transition-colors'
									>
										FAQ
									</a>
								</li>
							</ul>
						</div>

						{/* Company Links */}
						<div>
							<h3 className='font-bold  mb-4'>Company</h3>
							<ul className='space-y-2 text-sm /70'>
								<li>
									<a
										href='#about'
										className='hover: transition-colors'
									>
										About Us
									</a>
								</li>
								<li>
									<a
										href='#contact'
										className='hover:text-accent transition-colors'
									>
										Contact
									</a>
								</li>
							</ul>
						</div>

						{/* Legal Links */}
						<div>
							<h3 className='font-bold mb-4'>Legal</h3>
							<ul className='space-y-2 text-sm'>
								<li>
									<a
										href='/privacy-policy'
										className='transition-colors'
									>
										Privacy Policy
									</a>
								</li>
							</ul>
						</div>
					</div>

					<div className='pt-6 flex flex-col md:flex-row justify-center items-center gap-4 text-sm'>
						<p>© 2025 Capsulify. All rights reserved.</p>
					</div>
				</div>
			</footer>
		</div>
	)
}

export default page
