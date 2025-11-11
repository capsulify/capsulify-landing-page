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
		<div className='pb-2'>
			<button
				className='flex items-center w-full text-left text-accent font-inter text-base font-medium focus:outline-none py-2'
				onClick={onClick}
				aria-expanded={open}
				type='button'
			>
				<span className='flex-1 font-bold'>{question}</span>
				<span className='ml-2'>
					{!open ? (
						<svg
							className='w-5 h-5 cursor-pointer'
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
							className='w-5 h-5 cursor-pointer'
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
				<div className='pl-2 pr-2 pb-2 text-accent/90 text-sm animate-fade-in leading-6'>
					{answer}
				</div>
			)}
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
		'text-accent rounded-lg w-14 h-14 md:w-18 md:h-18 flex flex-col items-center justify-center mx-1 shadow-md'
	const numberClass =
		'font-mono text-lg text-accent md:text-xl font-extrabold leading-none tracking-wider'
	const labelClass =
		'text-xs md:text-sm font-medium mt-1 tracking-wide text-accent uppercase'

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
						<div className='flex-1 px-4 py-3 rounded-lg border border-accent/30 bg-[#efe9e4] h-[52px]'></div>
						<div className='flex-1 px-4 py-3 rounded-lg border border-accent/30 bg-[#efe9e4] h-[52px]'></div>
					</div>
					<div className='w-full bg-[#f8c255] text-accent font-bold px-6 py-3 rounded-lg text-base capitalize font-fraunces italic text-center'>
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
							className='flex-1 px-4 py-3 rounded-lg border border-accent/30 focus:outline-none text-accent bg-[#efe9e4] text-base'
						/>
						<input
							type='email'
							required
							placeholder='Enter your e-mail address'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className='flex-1 px-4 py-3 rounded-lg border border-accent/30 focus:outline-none text-accent bg-[#efe9e4] text-base'
						/>
					</div>
					<button
						type='submit'
						disabled={loading}
						className='w-full bg-[#f8c255] text-accent font-bold px-6 py-3 rounded-lg transition-all duration-200 hover:bg-[#f0d297] shadow-md text-base capitalize font-fraunces italic cursor-pointer disabled:opacity-60'
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
	return (
		<div className='min-h-screen bg-[#f8f4f0] text-accent font-inter'>
			{/* Main Content */}
			<main>
				{/* Hero Section - Split Screen */}
				<section className='w-full bg-[#f8f4f0] py-16 md:py-20 px-6 md:px-12 text-center md:text-left'>
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
								<span className='text-[#ad4c5c]'>1000+</span>
								<span className='text-accent'> Outfit </span>
								<span className='text-[#ad4c5c]'>Ideas</span>
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
							<div className='rounded-2xl overflow-hidden shadow-2xl'>
								<Image
									src='/assets/landing-page/hero-section-img.jpg'
									alt='Capsulify App Preview'
									width={600}
									height={800}
									className='w-full h-auto object-cover'
								/>
							</div>
						</div>
					</div>
				</section>

				{/* Closet Thoughts Section (between Hero and Sound Familiar) */}
				<section className='w-full py-12 px-6 md:px-12'>
					<div className='max-w-7xl mx-auto'>
						<div className='p-0 md:p-0'>
							<h2 className='text-2xl md:text-3xl font-extrabold font-fraunces text-accent text-center mb-8 md:mb-10'>
								Have you ever looked in your closet and thought:
							</h2>
							<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8'>
								<div className='relative bg-secondary rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-shadow h-full flex flex-col text-center'>
									<span className='absolute top-5 right-6 text-4xl md:text-5xl font-extrabold text-[#f8c255]/50 select-none'>
										❞
									</span>
									<p className='text-lg text-accent mt-12 mb-4 font-bold'>
										I have so many clothes but always wear
										the same outfits.
									</p>
									<p className='text-sm text-accent/70 leading-relaxed'>
										Your closet is full of great pieces, but
										you default to the same combinations
										because they feel safe and familiar.
									</p>
								</div>
								<div className='relative bg-secondary rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-shadow h-full flex flex-col text-center'>
									<span className='absolute top-5 right-6 text-4xl md:text-5xl font-extrabold text-[#f8c255]/50 select-none'>
										❞
									</span>
									<p className='text-lg text-accent mt-12 mb-4 font-bold'>
										This top is cute but I never know what
										to pair it with.
									</p>
									<p className='text-sm text-accent/70 leading-relaxed'>
										Some clothes look great on their own,
										but you struggle to create outfits that
										make them shine together.
									</p>
								</div>
								<div className='relative bg-secondary rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-shadow h-full flex flex-col text-center'>
									<span className='absolute top-5 right-6 text-4xl md:text-5xl font-extrabold text-[#f8c255]/50 select-none'>
										❞
									</span>
									<p className='text-lg text-accent mt-12 mb-4 font-bold'>
										I end up buying more instead of wearing
										what I have.
									</p>
									<p className='text-sm text-accent/70 leading-relaxed'>
										When you're stuck, it's easier to shop
										than to experiment with combinations
										you've never tried.
									</p>
								</div>
								<div className='relative bg-secondary rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-shadow h-full flex flex-col text-center'>
									<span className='absolute top-5 right-6 text-5xl md:text-5xl font-extrabold text-[#f8c255]/50 select-none'>
										❞
									</span>
									<p className='text-lg text-accent mt-12 mb-4 font-bold'>
										I can't recreate those outfit ideas I
										saved.
									</p>
									<p className='text-sm text-accent/70 leading-relaxed'>
										Pinterest looks are inspiring but when
										you try to recreate them with your
										actual clothes, they don't quite hit the
										same.
									</p>
								</div>
								<div className='relative bg-secondary rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-shadow h-full flex flex-col text-center'>
									<span className='absolute top-5 right-6 text-4xl md:text-5xl font-extrabold text-[#f8c255]/50 select-none'>
										❞
									</span>
									<p className='text-lg text-accent mt-12 mb-4 font-bold'>
										I don't know which of my pieces actually
										look good together.
									</p>
									<p className='text-sm text-accent/70 leading-relaxed'>
										Not all combinations work, and trying
										everything on feels exhausting. You need
										a smarter way to see what works.
									</p>
								</div>
								<div className='relative bg-secondary rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-shadow h-full flex flex-col text-center'>
									<span className='absolute top-5 right-6 text-4xl md:text-5xl font-extrabold text-[#f8c255]/50 select-none'>
										❞
									</span>
									<p className='text-lg text-accent mt-12 mb-4 font-bold'>
										I want to maximize my existing wardrobe.
									</p>
									<p className='text-sm text-accent/70 leading-relaxed'>
										You believe in capsule wardrobes but
										need help discovering all the outfit
										combinations your clothes can create.
									</p>
								</div>
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
							<div className='relative bg-[#f3f0e9] rounded-xl p-8 shadow-lg'>
								<span className='absolute top-4 left-4 bg-[#994351]/70 text-secondary text-[12px] md:text-[13px] px-3 py-1 rounded-full tracking-wider font-bold'>
									Goal
								</span>
								<h3 className='text-base font-bold text-accent mb-3 mt-12 text-left'>
									I want to wear all the clothes I own, not
									just my go-to pieces.
								</h3>
								<p className='text-xs text-accent/70 leading-relaxed text-left'>
									You have great pieces collecting dust in
									your closet because you don't know how to
									style them.
								</p>
							</div>
							<div className='relative bg-white rounded-xl p-8 shadow-lg'>
								<span className='absolute top-4 left-4 bg-[#994351]/70 text-secondary text-[12px] md:text-[13px] px-3 py-1 rounded-full tracking-wider font-bold'>
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
							<div className='relative bg-[#f3f0e9] rounded-xl p-8 shadow-lg'>
								<span className='absolute top-4 left-4 bg-[#994351]/70 text-secondary text-[12px] md:text-[13px] px-3 py-1 rounded-full tracking-wider font-bold'>
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
							<div className='relative bg-white rounded-xl p-8 shadow-lg'>
								<span className='absolute top-4 left-4 bg-[#994351]/70 text-secondary text-[12px] md:text-[13px] px-3 py-1 rounded-full tracking-wider font-bold'>
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
							<div className='relative bg-[#f3f0e9] rounded-xl p-8 shadow-lg'>
								<span className='absolute top-4 left-4 bg-[#994351]/70 text-secondary text-[12px] md:text-[13px] px-3 py-1 rounded-full tracking-wider font-bold'>
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
							<div className='relative bg-white rounded-xl p-8 shadow-lg'>
								<span className='absolute top-4 left-4 bg-[#994351]/70 text-secondary text-[12px] md:text-[13px] px-3 py-1 rounded-full tracking-wider font-bold'>
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
							<p className='text-base md:text-md text-accent/70 max-w-2xl mx-auto font-semibold'>
								From closet chaos to curated style
							</p>
						</div>

						{/* Four Step Cards */}
						<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
							{/* Step 1 */}
							<div className='bg-[#f3f0e9] rounded-xl p-6 shadow-lg relative'>
								<div className='absolute top-4 right-4 text-4xl font-extrabold text-[#f8c255]/40'>
									01
								</div>
								<div className='w-10 h-10 bg-[#f8c255] rounded-lg flex items-center justify-center mb-4'>
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

							<div className='bg-white rounded-xl p-6 shadow-lg relative'>
								<div className='absolute top-4 right-4 text-4xl font-extrabold text-[#f8c255]/40'>
									02
								</div>
								<div className='w-10 h-10 bg-[#f8c255] rounded-lg flex items-center justify-center mb-4'>
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

							<div className='bg-[#f3f0e9] rounded-xl p-6 shadow-lg relative'>
								<div className='absolute top-4 right-4 text-4xl font-extrabold text-[#f8c255]/40'>
									03
								</div>
								<div className='w-10 h-10 bg-[#f8c255] rounded-lg flex items-center justify-center mb-4'>
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
							<div className='bg-white rounded-xl p-6 shadow-lg relative'>
								<div className='absolute top-4 right-4 text-4xl font-extrabold text-[#f8c255]/40'>
									04
								</div>
								<div className='w-10 h-10 bg-[#f8c255] rounded-lg flex items-center justify-center mb-4'>
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
							<div className='bg-white rounded-xl p-6 shadow-lg text-left'>
								<div className='flex items-start gap-3'>
									<div className='w-10 h-6 rounded-full bg-[#f8c255]/25 flex items-center justify-center mt-0.5'>
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
							<div className='bg-white rounded-xl p-6 shadow-lg text-left'>
								<div className='flex items-start gap-3'>
									<div className='w-10 h-6 rounded-full bg-[#f8c255]/25 flex items-center justify-center mt-0.5'>
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
							<div className='bg-white rounded-xl p-6 shadow-lg text-left'>
								<div className='flex items-start gap-3'>
									<div className='w-10 h-6 rounded-full bg-[#f8c255]/25 flex items-center justify-center mt-0.5'>
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
							<div className='bg-white rounded-xl p-6 shadow-lg text-left'>
								<div className='flex items-start gap-3'>
									<div className='w-10 h-6 rounded-full bg-[#f8c255]/25 flex items-center justify-center mt-0.5'>
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
							<div className='bg-white rounded-xl p-6 shadow-lg text-left'>
								<div className='flex items-start gap-3'>
									<div className='w-10 h-6 rounded-full bg-[#f8c255]/25 flex items-center justify-center mt-0.5'>
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
							<div className='bg-white rounded-xl p-6 shadow-lg text-left'>
								<div className='flex items-start gap-3'>
									<div className='w-10 h-6 rounded-full bg-[#f8c255]/25 flex items-center justify-center mt-0.5'>
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
						<h2 className='text-3xl md:text-4xl font-extrabold font-fraunces text-accent-2'>
							<span>Capsulify is </span>
							<span className='italic'>for you</span>
							<span> if...</span>
						</h2>

						<div className='space-y-4 text-left flex justify-center flex-col items-center'>
							{/* Item */}
							<div className='md:md:w-[55%] bg-white rounded-xl p-4 shadow-lg flex items-center justify-start gap-4'>
								<div className='w-12 md:w-7 h-7 rounded-full border border-accent/20 flex items-center justify-center text-[12px] text-accent/80 mt-0.5'>
									1
								</div>
								<p className='text-sm md:text-base text-accent'>
									You have lots of clothes, but feel like you
									wear the same few things
								</p>
							</div>
							<div className='md:w-[55%] bg-white rounded-xl p-4 shadow-lg flex items-center justify-start gap-4'>
								<div className='w-12 md:w-7 h-7 rounded-full border border-accent/20 flex items-center justify-center text-[12px] text-accent/80 mt-0.5'>
									2
								</div>
								<p className='text-sm md:text-base text-accent'>
									You want to look good on dates, workdays,
									and weekends effortlessly
								</p>
							</div>
							<div className='md:w-[55%] bg-white rounded-xl p-4 shadow-lg flex items-center justify-start gap-4'>
								<div className='w-12 md:w-7 h-7 rounded-full border border-accent/20 flex items-center justify-center text-[12px] text-accent/80 mt-0.5'>
									3
								</div>
								<p className='text-sm md:text-base text-accent'>
									You want to maximize your existing wardrobe
									and see more outfits
								</p>
							</div>
							<div className='md:w-[55%] bg-white rounded-xl p-4 shadow-lg flex items-center justify-start gap-4'>
								<div className='w-10 md:w-7 h-7 rounded-full border border-accent/20 flex items-center justify-center text-[12px] text-accent/80 mt-0.5'>
									4
								</div>
								<p className='text-sm md:text-base text-accent'>
									You don't want to pay $200+ for a stylist
									every season
								</p>
							</div>
							<div className='md:w-[55%] bg-white rounded-xl p-4 shadow-lg flex items-center justify-start gap-4'>
								<div className='w-12 md:w-7 h-7 rounded-full border border-accent/20 flex items-center justify-center text-[12px] text-accent/80 mt-0.5'>
									5
								</div>
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
								className='inline-flex items-center justify-center bg-[#f8c255] text-accent font-bold px-8 py-3 rounded-lg transition-colors hover:bg-[#f0d297] text-sm font-fraunces'
							>
								PLAY WITH CAPSULIFY NOW
							</a>
						</div>
					</div>
				</section>

				{/* Features Grid Section */}
				<section className='w-full bg-secondary py-10 px-6 md:px-12'>
					<div className='max-w-6xl mx-auto'>
						<h2 className='text-3xl md:text-4xl font-extrabold font-fraunces text-accent-2 text-center mb-8'>
							What You'll Get
						</h2>
						{/* Six Feature Cards */}
						<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
							{/* Feature 1 */}
							<div className='bg-white rounded-xl p-6 shadow-lg'>
								<div className='w-10 h-10 bg-[#f8c255] rounded-lg flex items-center justify-center mb-4'>
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
									Be a Co-Creator
								</h3>
								<p className='text-xs text-accent/70 leading-relaxed'>
									Help shape features, test updates, and
									influence design
								</p>
							</div>

							{/* Feature 2 */}
							<div className='bg-white rounded-xl p-6 shadow-lg'>
								<div className='w-10 h-10 bg-[#f8c255] rounded-lg flex items-center justify-center mb-4'>
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
								</div>
								<h3 className='text-base font-bold text-accent mb-3'>
									Build Your Own Capsule
								</h3>
								<p className='text-xs text-accent/70 leading-relaxed'>
									Build your closet from scratch with
									automatic tagging by category, color,
									occasion and more to come.
								</p>
							</div>

							{/* Feature 3 */}
							<div className='bg-white rounded-xl p-6 shadow-lg'>
								<div className='w-10 h-10 bg-[#f8c255] rounded-lg flex items-center justify-center mb-4'>
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
								</div>
								<h3 className='text-base font-bold text-accent mb-3'>
									Save Time Daily
								</h3>
								<p className='text-xs text-accent/70 leading-relaxed'>
									Wake up knowing exactly what to wear — and
									loving how it looks on you
								</p>
							</div>

							{/* Feature 4 */}
							<div className='bg-white rounded-xl p-6 shadow-lg'>
								<div className='w-10 h-10 bg-[#f8c255] rounded-lg flex items-center justify-center mb-4'>
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
								</div>
								<h3 className='text-base font-bold text-accent mb-3'>
									Ease of Use
								</h3>
								<p className='text-xs text-accent/70 leading-relaxed'>
									Works on Mobile and Desktop– no app install
									needed
								</p>
							</div>

							{/* Feature 5 */}
							<div className='bg-white rounded-xl p-6 shadow-lg'>
								<div className='w-10 h-10 bg-[#f8c255] rounded-lg flex items-center justify-center mb-4'>
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
								</div>
								<h3 className='text-base font-bold text-accent mb-3'>
									Lifetime Deal
								</h3>
								<p className='text-xs text-accent/70 leading-relaxed'>
									Lifetime pricing locked in — this tier will
									never open again
								</p>
							</div>

							{/* Feature 6 */}
							<div className='bg-white rounded-xl p-6 shadow-lg'>
								<div className='w-10 h-10 bg-[#f8c255] rounded-lg flex items-center justify-center mb-4'>
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
								</div>
								<h3 className='text-base font-bold text-accent mb-3'>
									Shop Smarter
								</h3>
								<p className='text-xs text-accent/70 leading-relaxed'>
									Know exactly what's missing from your
									wardrobe before you buy anything new.
								</p>
							</div>
						</div>
					</div>
				</section>

				{/* Final CTA Section */}
				<section className='w-full py-20 px-6 md:px-12'>
					<div className='max-w-4xl mx-auto text-center space-y-8 bg-white rounded-2xl p-12 shadow-xl'>
						<h2 className='text-3xl md:text-4xl font-extrabold font-fraunces'>
							<span className='text-accent'>
								Ready to Transform Your{' '}
							</span>
							<span className='text-[#ad4c5c]'>Wardrobe?</span>
						</h2>
						<p className='text-base text-accent/70'>
							Join thousands of happy users who've discovered the
							joy of styling with what they already own.
						</p>

						{/* Features */}
						<div className='flex flex-wrap justify-center gap-6'>
							<div className='flex items-center gap-2'>
								<svg
									className='w-5 h-5 text-[#f8c255]'
									fill='currentColor'
									viewBox='0 0 20 20'
								>
									<path
										fillRule='evenodd'
										d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
										clipRule='evenodd'
									/>
								</svg>
								<span className='text-accent font-semibold'>
									Free to start
								</span>
							</div>
							<div className='flex items-center gap-2'>
								<svg
									className='w-5 h-5 text-[#f8c255]'
									fill='currentColor'
									viewBox='0 0 20 20'
								>
									<path
										fillRule='evenodd'
										d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
										clipRule='evenodd'
									/>
								</svg>
								<span className='text-accent font-semibold'>
									No credit card required
								</span>
							</div>
							<div className='flex items-center gap-2'>
								<svg
									className='w-5 h-5 text-[#f8c255]'
									fill='currentColor'
									viewBox='0 0 20 20'
								>
									<path
										fillRule='evenodd'
										d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
										clipRule='evenodd'
									/>
								</svg>
								<span className='text-accent font-semibold'>
									Cancel anytime
								</span>
							</div>
						</div>

						{/* CTA Buttons */}
						<div className='flex flex-col sm:flex-row gap-4 justify-center'>
							<a
								href='https://app.capsulify.app/'
								target='_blank'
								rel='noopener noreferrer'
								className='bg-gradient-to-r from-[#f8c255] to-[#f0d297] text-accent font-bold px-10 py-4 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-xl text-sm uppercase font-fraunces inline-flex items-center justify-center gap-2'
							>
								<span>Get Started Now</span>
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
								className='bg-white text-accent font-semibold px-10 py-4 rounded-lg border-2 border-accent/20 transition-all duration-300 hover:border-accent/40 text-sm'
							>
								Watch Demo
							</a>
						</div>

						{/* Privacy Statement */}
						<div className='flex items-center justify-center gap-2 text-sm text-accent/60'>
							<svg
								className='w-5 h-5 text-[#f8c255]'
								fill='currentColor'
								viewBox='0 0 20 20'
							>
								<path
									fillRule='evenodd'
									d='M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z'
									clipRule='evenodd'
								/>
							</svg>
							<span>
								Your data is secure and private. We never share
								your wardrobe information.
							</span>
						</div>
					</div>
				</section>
			</main>

			{/* Footer */}
			<footer className='w-full bg-[#efe9e4] py-12 px-6 md:px-12 border-t border-accent/10'>
				<div className='max-w-6xl mx-auto'>
					<div className='grid grid-cols-1 md:grid-cols-4 gap-8 mb-8'>
						{/* Branding */}
						<div className='space-y-4'>
							<div className='flex items-center gap-3'>
								<div className='w-10 h-10 bg-gradient-to-br from-[#f8c255] to-[#ad4c5c] rounded-lg flex items-center justify-center'>
									<Image
										src='/assets/images/logo/logo-light.svg'
										alt='Capsulify'
										width={24}
										height={24}
										className='w-6 h-6'
									/>
								</div>
								<span className='font-bold text-base text-accent'>
									Capsulify
								</span>
							</div>
							<p className='text-sm text-accent/70'>
								Your smart wardrobe assistant for creating
								endless outfit combinations.
							</p>
						</div>

						{/* Product Links */}
						<div>
							<h3 className='font-bold text-accent mb-4'>
								Product
							</h3>
							<ul className='space-y-2 text-sm text-accent/70'>
								<li>
									<a
										href='#features'
										className='hover:text-accent transition-colors'
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
							<h3 className='font-bold text-accent mb-4'>
								Company
							</h3>
							<ul className='space-y-2 text-sm text-accent/70'>
								<li>
									<a
										href='#about'
										className='hover:text-accent transition-colors'
									>
										About Us
									</a>
								</li>
								<li>
									<a
										href='#blog'
										className='hover:text-accent transition-colors'
									>
										Blog
									</a>
								</li>
								<li>
									<a
										href='#careers'
										className='hover:text-accent transition-colors'
									>
										Careers
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
							<h3 className='font-bold text-accent mb-4'>
								Legal
							</h3>
							<ul className='space-y-2 text-sm text-accent/70'>
								<li>
									<a
										href='/privacy-policy'
										className='hover:text-accent transition-colors'
									>
										Privacy Policy
									</a>
								</li>
								<li>
									<a
										href='#terms'
										className='hover:text-accent transition-colors'
									>
										Terms of Service
									</a>
								</li>
								<li>
									<a
										href='#cookies'
										className='hover:text-accent transition-colors'
									>
										Cookie Policy
									</a>
								</li>
							</ul>
						</div>
					</div>

					{/* Bottom Bar */}
					<div className='border-t border-accent/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4'>
						<p className='text-sm text-accent/70'>
							© 2025 Capsulify. All rights reserved.
						</p>
						<p className='text-sm text-accent/70'>
							Made with <span className='text-[#ad4c5c]'>❤️</span>{' '}
							for fashion lovers
						</p>
					</div>
				</div>
			</footer>
		</div>
	)
}

export default page
