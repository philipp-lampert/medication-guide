<script>
	import SlidingBottomBorder from '$lib/animations/SlidingBottomBorder.svelte';
</script>

<footer class="z-50 bg-white">
	<div class="mx-auto max-w-[1400px] sm:px-12 md:px-16 lg:px-20">
		<div
			class="flex h-32 flex-row place-items-stretch border-t-2 border-black py-6 md:h-36 md:py-8 lg:h-40 lg:py-8"
		>
			<a href="/" class="ml-5 flex h-full flex-row gap-x-5">
				<img src="/favicon.svg" alt="Caduceus" class="h-full object-contain" />
				<div class="grid min-h-full grid-rows-3 items-stretch">
					<div class="w-[3px] bg-black"></div>
					<div class="w-[3px] bg-german-red"></div>
					<div class="w-[3px] bg-german-gold"></div>
				</div>
				<div>
					<span class="duration-50 left-0 block text-left font-normal leading-5">
						Medication<br />Guide
					</span>
				</div>
			</a>
			<div
				class="ml-auto mr-5 flex flex-col items-end justify-between self-stretch text-right text-sm text-gray-500"
			>
				<a class="group relative inline-block w-fit" href="/legal/disclaimer"
					>Disclaimer<SlidingBottomBorder color="bg-gray-400" />
				</a>
				<a class="group relative inline-block w-fit" href="/legal/terms"
					>Terms of Use<SlidingBottomBorder color="bg-gray-400" />
				</a>
				<a class="group relative inline-block w-fit" href="/legal/privacy"
					>Privacy Policy<SlidingBottomBorder color="bg-gray-400" />
				</a>
				<a class="group relative inline-block w-fit" href="/legal/impressum"
					>Impressum<SlidingBottomBorder color="bg-gray-400" />
				</a>
			</div>
		</div>
	</div>
</footer>
