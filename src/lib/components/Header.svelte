<script>
	import SlidingBottomBorder from '$lib/animations/SlidingBottomBorder.svelte';
	import ArrowDoubleRight from '$lib/assets/icons/buttons/ArrowDoubleRight.svelte';

	let yScroll = $state(0);
	let threshold = 60;
	let buffer = 50;
	let isShrunk = $state(false);

	$effect(() => {
		if (yScroll >= threshold + buffer) {
			isShrunk = true;
		} else if (yScroll <= threshold - buffer) {
			isShrunk = false;
		}
	});
</script>

<svelte:window bind:scrollY={yScroll} />

<header class="sticky top-0 z-40 bg-white">
	<div class="mx-auto max-w-[1400px] sm:px-12 md:px-16 lg:px-20">
		<div
			class="flex flex-row items-center border-b-2 border-black px-4 transition-all duration-500 sm:px-0 {isShrunk
				? 'h-14 sm:h-16'
				: 'h-20 sm:h-28 md:h-32'}"
		>
			<nav class="mt-auto font-medium sm:ml-3">
				<ul class="flex h-14 flex-row items-center gap-x-1 sm:h-16 sm:gap-x-4 md:gap-x-6">
					<li>
						<a class="group relative p-2" href="/"
							>Home
							<SlidingBottomBorder />
						</a>
					</li>
					<li>
						<a class="group relative p-2" href="/about"
							>About
							<SlidingBottomBorder />
						</a>
					</li>
				</ul>
			</nav>
			<div
				class="ml-auto mr-2 flex h-full flex-row gap-x-3 transition-all duration-500 sm:mr-5 sm:gap-x-4 md:gap-x-5 {isShrunk
					? 'py-3'
					: 'py-4 sm:py-6 md:py-7'}"
			>
				<img src="/favicon.svg" alt="Caduceus" class="h-full object-contain" />
				<div class="grid min-h-full grid-rows-3 items-stretch">
					<div class="w-[3px] bg-black"></div>
					<div class="w-[3px] bg-german-red"></div>
					<div class="w-[3px] bg-german-gold"></div>
				</div>
				<div class="relative flex items-center">
					<span
						class="duration-50 absolute left-0 top-0 block text-left text-sm font-normal leading-4 transition-all duration-200 md:text-base md:leading-5 {isShrunk
							? 'opacity-0'
							: 'opacity-100 delay-200'}"
					>
						Medication<br />Guide
					</span>
					<a
						href="/interactive"
						class="group relative z-50 flex flex-row items-center gap-1 text-sm font-medium transition-all duration-200 sm:gap-2 {isShrunk
							? 'opacity-100 delay-200'
							: 'opacity-0'}"
					>
						Start Guide
						<ArrowDoubleRight classes={'h-3'} />
						<SlidingBottomBorder />
					</a>
				</div>
			</div>
		</div>
	</div>
</header>
