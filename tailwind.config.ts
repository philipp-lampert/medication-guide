import forms from '@tailwindcss/forms';
import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	corePlugins: {
		container: false
	},
	theme: {
		extend: {
			fontSize: {
				'4.5xl': ['2.625rem', '3rem'],
				'5.5xl': ['3.375rem', '1']
			},
			fontFamily: {
				retina: ['Retina, Tahoma Fallback, Arial Fallback, sans-serif'],
				editors: ['Editors, TNR Fallback, serif'],
				mallory: ['Mallory, sans-serif']
			},
			letterSpacing: {
				'medium-wide': '0.015em'
			},
			colors: {
				'german-red': '#e2001a',
				'german-gold': '#f8d100'
			},
			borderWidth: {
				'3': '3px'
			},
			boxShadow: {
				'inner-strong': 'inset 0 0px 12px 0px rgb(0 0 0 / 0.25)'
			},
			display: ['group-hover']
		}
	},

	plugins: [
		forms,
		function ({ addVariant }) {
			addVariant('hover', '@media (any-hover: hover) and (any-pointer: fine) { &:hover }');
		}
	]
} satisfies Config;
