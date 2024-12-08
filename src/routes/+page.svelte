<script>
	import Indications from '../lib/components/tables/Indications.svelte';
	import Contraindications from '$lib/components/tables/Contraindications.svelte';
	import SeeDoctor from '$lib/components/tables/SeeDoctor.svelte';
	import SlidingBottomBorder from '$lib/animations/SlidingBottomBorder.svelte';
	import ArrowDoubleRight from '$lib/assets/icons/buttons/ArrowDoubleRight.svelte';
	import Schema from '$lib/components/Schema.svelte';
	import MedicalWebPage from './MedicalWebPage.json';
	import MedicalScholarlyArticle from './MedicalScholarlyArticle.json';
	import { paracetamolAcetaminophen } from '$lib/functions/paracetamol-acetaminophen';
</script>

<svelte:head>
	<title>Find the best pain reliever for your symptoms | Medication Guide™</title>
	<meta
		name="description"
		content="Use our interactive quiz to get a personalized recommendation based on your symptoms and risk profile. Choose the most effective option while minimizing side effects."
	/>
	<meta property="og:title" content="Find the best pain reliever for your symptoms" />
	<meta property="og:type" content="website" />
	<meta
		property="og:description"
		content="Use our interactive quiz to get a personalized recommendation."
	/>
	<meta property="og:image" content="https://medicationguide.org/logo-social.jpg" />
	<meta property="og:url" content="https://medicationguide.org" />
	<Schema json={MedicalWebPage} />
	<Schema json={MedicalScholarlyArticle} />
</svelte:head>

<section class="section">
	<div class="container flex flex-col items-center gap-10 md:gap-12">
		<h1 class="h1">Which pain reliever should I use?</h1>
		<div class="flex flex-col gap-y-4">
			<p class="max-w-2xl">
				While many analgesics can be purchased without a prescription, not all are effective for
				every symptom. Side effects also vary and can put individuals with certain health conditions
				at risk.
			</p>
			<p class="max-w-2xl font-medium">
				Use the interactive quiz to find the appropriate medication for you and your symptoms.
			</p>
		</div>
		<div
			class="flex flex-row flex-wrap items-center justify-center gap-x-8 gap-y-4 rounded-2xl border-2 border-gray-200 bg-gray-100 py-4 pl-6 pr-4 text-center sm:text-left"
		>
			<p class="text-sm font-normal text-gray-700">
				Get a personalized recommendation<br />by taking our anonymous quiz.
			</p>
			<a
				href="/interactive"
				data-sa-link-event="start_quiz_main"
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
					>Start Quiz</span
				>
			</a>
		</div>
	</div>
</section>
<section class="section">
	<article class="container flex flex-col items-center gap-10 md:gap-20">
		<div class="flex flex-col items-center gap-y-6">
			<h2 class="h2">Differences between over-the-counter painkillers</h2>
			<p class="max-w-4xl">
				Non-prescription analgesics fall into four main categories:
				<strong class="font-medium">Ibuprofen</strong>,
				<strong class="font-medium">Aspirin</strong>,
				<strong class="font-medium">{paracetamolAcetaminophen()}</strong>, and
				<strong class="font-medium">Naproxen</strong>. Each of these medications has distinct
				characteristics. For example, Ibuprofen and Naproxen belong to the class of nonsteroidal
				anti-inflammatory drugs (NSAIDs) and are effective at reducing inflammation, while {paracetamolAcetaminophen()}
				tends to have a lower risk of side effects and is ideal for children and during pregnancy. Keep
				in mind that many manufacturers use brand names, so always check the ingredients listed on the
				packaging. For a personalized recommendation, have a look at our
				<a class="text-link group" href="/interactive">interactive quiz<SlidingBottomBorder /></a>.
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
