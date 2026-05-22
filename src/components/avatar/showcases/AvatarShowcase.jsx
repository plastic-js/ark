import { Avatar } from '../../../index.js'
import { css } from '@emotion/css'

const avatarRootClass = css({
	display: 'inline-flex',
	alignItems: 'center',
	justifyContent: 'center',
	width: '64px',
	height: '64px',
	borderRadius: '50%',
	background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.14), rgba(16, 185, 129, 0.14))',
	border: '2px solid rgba(59, 130, 246, 0.25)',
	overflow: 'hidden',
})

const avatarFallbackClass = css({
	fontSize: '1.25rem',
	fontWeight: 700,
	color: '#113355',
})

const avatarImageClass = css({
	width: '100%',
	height: '100%',
	objectFit: 'cover',
})

const AvatarShowcase = ()=> (
	<div className='container'>
		<header className='hero'>
			<p className='eyebrow'>ark-plastic component showcase</p>
			<h1>Avatar</h1>
			<p className='hero-copy'>Live, component-specific demo for Avatar.</p>
		</header>
		<section className='feature-card'>
			<h3>With image</h3>
			<Avatar.Root className={avatarRootClass}>
				<Avatar.Fallback className={avatarFallbackClass}>LC</Avatar.Fallback>
				<Avatar.Image className={avatarImageClass} src='https://i.pravatar.cc/128' alt='avatar' />
			</Avatar.Root>
		</section>
		<section className='feature-card'>
			<h3>Fallback only</h3>
			<Avatar.Root className={avatarRootClass}>
				<Avatar.Fallback className={avatarFallbackClass}>JD</Avatar.Fallback>
			</Avatar.Root>
		</section>
		<section className='feature-card'>
			<h3>Broken image</h3>
			<Avatar.Root className={avatarRootClass}>
				<Avatar.Fallback className={avatarFallbackClass}>XX</Avatar.Fallback>
				<Avatar.Image className={avatarImageClass} src='https://invalid.example.com/img.jpg' alt='broken' />
			</Avatar.Root>
		</section>
		<code className='anatomy'>{`<Avatar.Root>
  <Avatar.Fallback>LC</Avatar.Fallback>
  <Avatar.Image src="..." alt="..." />
</Avatar.Root>`}</code>
	</div>
)

export default AvatarShowcase
