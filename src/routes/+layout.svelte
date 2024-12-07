<script>
	import '../app.css';
	import Schema from '$lib/components/Schema.svelte';
	import WebSite from './Site.json';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';

	// Vercel analytics and speed insights
	import { injectAnalytics } from '@vercel/analytics/sveltekit';
	import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';
	import { dev } from '$app/environment';

	injectAnalytics({ mode: dev ? 'development' : 'production' });
	injectSpeedInsights();

	// Posthog analytics
	import posthog from 'posthog-js';
	import { browser } from '$app/environment';
	import { beforeNavigate, afterNavigate } from '$app/navigation';

	if (browser) {
		beforeNavigate(() => posthog.capture('$pageleave'));
		afterNavigate(() => posthog.capture('$pageview'));
	}

	let { children } = $props();
</script>

<svelte:head>
	<meta property="og:site_name" content="Medication Guide" />
	<Schema json={WebSite} />

	<script>
		// Simple Analytics placeholder event function
		window.sa_event =
			window.sa_event ||
			function () {
				var a = [].slice.call(arguments);
				window.sa_event.q ? window.sa_event.q.push(a) : (window.sa_event.q = [a]);
			};
	</script>
</svelte:head>

<div class="flex min-h-screen flex-col">
	<Header />
	<main class="relative flex-grow">
		{@render children()}
	</main>
	<Footer />
</div>

{#if browser}
	<script async defer src="https://scripts.simpleanalyticscdn.com/latest.js">
		//Simple Analytics default script
	</script>
	<noscript
		><img
			src="https://queue.simpleanalyticscdn.com/noscript.gif"
			alt=""
			referrerpolicy="no-referrer-when-downgrade"
		/></noscript
	>
	<script>
		// Simple Analytics link events
		(function () {
			function saLoadedLinkEvents() {
				document.querySelectorAll('a[data-sa-link-event]').forEach(function (element) {
					var href = element.getAttribute('href');
					var eventName = element.getAttribute('data-sa-link-event');
					if (!href || !window.sa_event || !window.sa_loaded) return;

					element.addEventListener('click', function (event) {
						var target = element.getAttribute('target');
						if (target === '_blank') {
							event.preventDefault();
							window.sa_event(eventName, function () {
								window.location.href = href;
							});
							return false;
						} else {
							window.sa_event(eventName);
							return true;
						}
					});
				});
			}

			if (document.readyState === 'ready' || document.readyState === 'complete') {
				saLoadedLinkEvents();
			} else {
				document.addEventListener('readystatechange', function (event) {
					if (event.target.readyState === 'complete') saLoadedLinkEvents();
				});
			}
		})();
	</script>
{/if}
