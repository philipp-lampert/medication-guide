<script>
	import Indications from '../lib/tables/Indications.svelte';
	import Contraindications from '$lib/tables/Contraindications.svelte';
	import SeeDoctor from '$lib/tables/SeeDoctor.svelte';
	import SlidingBottomBorder from '$lib/animations/SlidingBottomBorder.svelte';
	import ArrowDoubleRight from '$lib/assets/icons/buttons/ArrowDoubleRight.svelte';
	import Schema from '$lib/components/Schema.svelte';
	import MedicalWebPage from './MedicalWebPage.json';
	import MedicalScholarlyArticle from './MedicalScholarlyArticle.json';
</script>

<svelte:head>
	<title>Which Pain Reliever Should I Use? | Medication Guide™</title>
	<meta
		name="description"
		content="Use our interactive guide to get a personalized recommendation for the best painkiller based on your symptoms and risk profile. Choose the most effective option while minimizing side effects."
	/>
	<meta property="og:title" content="Which Pain Reliever Should I Use?" />
	<meta property="og:type" content="website" />
	<meta
		property="og:description"
		content="Find the best pain reliever for your symptoms by using our interactive guide."
	/>
	<meta property="og:image" content="https://medicationguide.org/logo-social.jpg" />
	<meta property="og:url" content="https://medicationguide.org" />
	<Schema json={MedicalWebPage} />
	<Schema json={MedicalScholarlyArticle} />
</svelte:head>

<section class="section">
	<div class="container flex flex-col items-center gap-10 md:gap-12">
		<h1 class="h1">Which pain reliever should I use?</h1>
		<div class="flex flex-col gap-y-6">
			<p class="max-w-2xl">
				While many analgesics can be purchased without a prescription, not all are effective for
				every symptom. Side effects also vary and can put individuals with certain health conditions
				at risk.
			</p>
			<p class="max-w-2xl font-medium">
				Use the interactive guide to find the appropriate medication for you and your symptoms.
			</p>
		</div>
		<div
			class="flex flex-row flex-wrap items-center justify-center gap-x-8 gap-y-4 rounded-2xl border-2 border-gray-200 bg-gray-100 py-4 pl-6 pr-4 sm:text-left"
		>
			<p class="text-sm font-normal text-gray-700">
				Get a personalized recommendation<br />to find the best pain reliever for you.
			</p>
			<a
				href="/interactive"
				data-sa-link-event="start_guide_main"
				class="group relative inline-flex items-center overflow-hidden rounded-xl bg-gradient-to-tr
										   from-black to-gray-700 px-12 py-3 text-center font-normal text-white shadow-3xl transition-all
											duration-500"
			>
				<span
					class="ease absolute right-0 flex h-10 w-10 translate-x-full transform items-center justify-start duration-500 group-hover:-translate-x-2"
				>
					<ArrowDoubleRight classes={'h-4 fill-white'} />
				</span>
				<span class="relative w-full transform duration-500 group-hover:-translate-x-2"
					>Start Guide</span
				>
			</a>
		</div>
	</div>
</section>
<section class="section">
	<article class="container flex flex-col items-center gap-10 md:gap-20">
		<div class="flex flex-col items-center gap-y-6">
			<h2 class="h2">Differences between over-the-counter analgesics</h2>
			<p class="max-w-4xl">
				Pain relievers differ in how they work and the side effects they may cause. Not all are
				effective for every type of pain, nor safe for everyone. Selecting the right painkiller
				requires careful consideration of both the desired therapeutic effects and potential risks.
				The tables below highlight the most important distinctions. For a personalized
				recommendation, use our <a class="text-link group" href="/interactive"
					>interactive guide<SlidingBottomBorder /></a
				>.
			</p>
		</div>
		<div class="w-full lg:w-fit">
			<h3 class="h3 mb-4 text-center lg:mb-6">Effectiveness and indications</h3>
			<div class="w-full overflow-auto rounded-xl lg:w-fit">
				<Indications />
			</div>
		</div>
		<div class="w-full lg:w-fit">
			<h3 class="h3 mb-4 text-center lg:mb-6">Contraindications and side effects</h3>
			<div class="w-full overflow-auto rounded-xl lg:w-fit">
				<Contraindications />
			</div>
		</div>
	</article>
</section>
<section class="section">
	<article class="container flex flex-col items-center gap-y-6">
		<h2 class="h2">When should I see a doctor?</h2>
		<p class="max-w-4xl">
			While many types of pain can be managed with over-the-counter medications, certain situations
			require medical attention to identify or address underlying causes. You should see a doctor if
			you experience any of the following:
		</p>
		<div class="w-full overflow-auto rounded-xl lg:w-fit">
			<SeeDoctor />
		</div>
	</article>
</section>
