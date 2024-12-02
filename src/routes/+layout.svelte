<script lang="ts">
	import '../app.css';
	import { dev } from '$app/environment';
	import { injectAnalytics } from '@vercel/analytics/sveltekit';
	import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';
	import { page } from '$app/stores';

	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';

	injectAnalytics({ mode: dev ? 'development' : 'production' });
	injectSpeedInsights();

	let isQuestionPage = $derived($page.url.pathname.startsWith('/interactive'));
	let { children } = $props();
</script>

<div class="flex min-h-screen flex-col">
	<Header />
	<main class="relative flex-grow {isQuestionPage ? 'flex items-center justify-center' : ''}">
		{@render children()}
	</main>
	<Footer />
</div>
