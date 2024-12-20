<script lang="ts">
	import SlidingBottomBorder from '$lib/animations/SlidingBottomBorder.svelte';
	import ArrowDoubleRight from '$lib/assets/icons/buttons/ArrowDoubleRight.svelte';
	import IconNone from '$lib/assets/icons/buttons/IconNone.svelte';
	import turnAround from '$lib/assets/icons/buttons/arrow-turn-around.svg';
	import reload from '$lib/assets/icons/buttons/reload.svg';
	import home from '$lib/assets/icons/buttons/home.svg';
	import { fade } from 'svelte/transition';
	import { questions } from './questions';
	import { capitalizeFirstLetter } from '$lib/functions/utils';
	import { medicationInfo } from './medication-info';
	import { paracetamolAcetaminophen } from '$lib/functions/paracetamol-acetaminophen';
	import ProgressBar from './ProgressBar.svelte';

	let h: number = $state(0);
	let currentIndex: number = $state(0);
	let direction: number = $state(1); // 1: forward, -1: backward

	const MEDICATIONS = ['ibuprofen', 'paracetamol', 'naproxen', 'aspirin'] as const;

	type Medications = (typeof MEDICATIONS)[number];
	type MedicationReasons = Record<
		Medications,
		{
			positive: string[];
			neutral: string[];
			negative: string[];
		}
	>;

	// Answer selection
	let selectedAnswers = $state(
		[] as {
			answers: {
				text: string;
				image: string;
				medications: { [K in Medications]: { value: number; reason: string } };
			}[];
		}[]
	);

	function answerSelection(answer: {
		text: string;
		image: string;
		medications: { [K in Medications]: { value: number; reason: string } };
	}) {
		if (!selectedAnswers[currentIndex]) {
			// Initialize index if it doesn't exist
			selectedAnswers[currentIndex] = { answers: [] };
		}

		if (questions[currentIndex].type === 'single-choice') {
			// Replace any existing answer
			selectedAnswers[currentIndex].answers = [answer];
			currentIndex++;
			direction = 1;
		} else {
			// For multiple-choice, toggle the answer selection
			const existingAnswerIndex = selectedAnswers[currentIndex].answers.findIndex(
				(existingAnswer) => JSON.stringify(existingAnswer) === JSON.stringify(answer)
			);

			if (existingAnswerIndex > -1) {
				// If the answer exists, remove it (deselection)
				selectedAnswers[currentIndex].answers.splice(existingAnswerIndex, 1);
			} else {
				// If the answer does not exist, add it to the array
				selectedAnswers[currentIndex].answers.push(answer);
			}
		}
	}

	// Medication reasons
	let medicationReasons: MedicationReasons = $derived(
		MEDICATIONS.reduce((acc, medication) => {
			const userReasons: { positive: string[]; neutral: string[]; negative: string[] } = {
				positive: [],
				neutral: [],
				negative: []
			};

			selectedAnswers.forEach((question) => {
				question.answers.forEach((answer) => {
					const medicationData = answer.medications[medication];

					if (medicationData?.reason) {
						const categorizeReason = (value: number) => {
							if (value === 1) return 'positive';
							if (value === 0.5) return 'neutral';
							if (value === 0) return 'negative';
							return null;
						};

						const category = categorizeReason(medicationData.value);
						if (category) {
							userReasons[category].push(medicationData.reason);
						}
					}
				});
			});

			return {
				...acc,
				[medication]: {
					positive: [...medicationInfo[medication].positive, ...userReasons.positive],
					neutral: [...medicationInfo[medication].neutral, ...userReasons.neutral],
					negative: [...medicationInfo[medication].negative, ...userReasons.negative]
				}
			};
		}, {} as MedicationReasons)
	);

	// CALCULATE MATCHING PERCENTAGES
	// Medication scores based on selected answers
	let medicationScores: Record<Medications, number> = $derived(
		MEDICATIONS.reduce(
			(acc, name) => ({
				...acc,
				[name]: selectedAnswers
					.flatMap((question) =>
						question.answers.map((answer) => answer.medications[name as Medications]?.value || 0)
					)
					.reduce((sum, value) => sum + value, 0)
			}),
			{} as Record<Medications, number>
		)
	);

	// Number of selected answers
	let numSelectedAnswers = $derived(
		selectedAnswers.reduce((total, question) => total + (question.answers?.length || 0), 0)
	);

	// Calculate percentages
	export function calculatePercentages() {
		const totalScores = Object.entries(medicationScores).reduce(
			(scores, [medication, score]) => {
				scores[medication] = score;
				return scores;
			},
			{} as { [key: string]: number }
		);

		return Object.entries(totalScores).reduce(
			(percentages, [medication, totalScore]) => {
				percentages[medication] = (totalScore / numSelectedAnswers) * 100;
				return percentages;
			},
			{} as { [key: string]: number }
		);
	}

	// Navigation
	function nextQuestion() {
		currentIndex++;
		direction = 1;
	}

	function noneOfTheAbove() {
		if (!selectedAnswers[currentIndex]) {
			// Initialize index if it doesn't exist
			selectedAnswers[currentIndex] = { answers: [] };
		}
		selectedAnswers[currentIndex].answers = [
			{
				text: 'None of the above',
				image: '',
				medications: Object.fromEntries(
					MEDICATIONS.map((med) => [med, { value: 1, reason: '' }])
				) as Record<Medications, { value: number; reason: string }>
			}
		];
		nextQuestion();
	}

	function goBack() {
		if (currentIndex > 0) {
			direction = -1;
			currentIndex--;
		}
	}

	function restart() {
		currentIndex = 0;
		selectedAnswers = [];
	}

	function goHome() {
		window.location.href = '/';
	}
	$inspect(currentIndex);
</script>

<svelte:head>
	<title>Interactive Pain Reliever Guide | Find The Best Option</title>
	<meta
		name="description"
		content="Use our interactive tool to get personalized painkiller recommendations based on your symptoms and risk profile, helping you find the most effective option with minimal side effects."
	/>
	<meta property="og:title" content="Medication Guide™" />
	<meta property="og:type" content="website" />
	<meta property="og:description" content="Find the best painkiller for your symptoms." />
	<meta property="og:image" content="https://medicationguide.org/logo-social.jpg" />
	<meta property="og:url" content="https://medicationguide.org/interactive" />
</svelte:head>

{#snippet navButton(label: string, icon: string, action: () => void)}
	<button
		type="button"
		onclick={action}
		class="group relative flex flex-row items-center gap-2.5 overflow-hidden bg-white px-0.5 py-0.5 font-medium"
	>
		<img src={icon} alt={label} class="h-4 pb-0.5" />
		{label}
		<SlidingBottomBorder />
	</button>
{/snippet}

<div
	bind:clientHeight={h}
	class="container my-10 flex min-h-[525px] flex-grow justify-center sm:my-12 sm:min-h-[500px]"
>
	{#if currentIndex < questions.length}
		<ProgressBar
			{questions}
			{selectedAnswers}
			{currentIndex}
			clickCircle={(index: number) => {
				currentIndex = index;
			}}
		/>
	{/if}
	{#each questions as question, index (index)}
		{#if index === currentIndex}
			<form
				style="top: {h / 1.65}px; transform: translateY(-50%)"
				class="absolute inset-x-0 mx-auto flex flex-col items-center justify-center gap-6 text-center sm:max-w-4xl md:gap-10 md:py-12"
				out:fade={{ duration: 250 }}
				in:fade={{ duration: 350, delay: 350 }}
				onsubmit={nextQuestion}
			>
				<div class="flex flex-col gap-2">
					<h1 class="mx-8 font-mallory text-3xl font-light leading-8 tracking-tight">
						{#each question.text as part}
							{#if typeof part === 'string'}
								{part}
							{:else}
								<span class:font-medium={part.highlight}>{part.content}</span>
							{/if}
						{/each}
					</h1>
					{#if questions[currentIndex].type === 'multiple-choice'}
						<span class="text-lg italic">Select all that apply.</span>
					{/if}
				</div>
				<div
					class="grid grid-cols-2 justify-items-center gap-4 {question.answers.length === 3
						? 'sm:grid-cols-3'
						: 'sm:grid-cols-2'}"
				>
					{#each question.answers as answer, index}
						<button
							type="button"
							onclick={() => answerSelection(answer)}
							class="
											 flex h-36 w-36 flex-col items-center justify-center gap-2 rounded-2xl border-2
											 border-gray-200 bg-gray-50 font-medium text-black transition-all
											duration-300 hover:border-black hover:bg-white
											hover:drop-shadow-xl sm:h-40 sm:w-40 sm:gap-3
											sm:text-lg
											{question.answers.length === 3 && index === 2 ? 'col-span-2 sm:col-auto' : ''}
									"
							class:selected={questions[currentIndex].type === 'single-choice'
								? selectedAnswers[currentIndex]?.answers[0]?.text === answer.text
								: selectedAnswers[currentIndex]?.answers.some((a) => a.text === answer.text)}
						>
							{answer.text}
							{#if answer.image}
								<img src={answer.image} alt={answer.text} class="h-16" />
							{/if}
						</button>
					{/each}
				</div>

				<!-- Navigation Buttons -->
				<div class="mx-10 flex flex-wrap justify-center gap-x-6 gap-y-1">
					{#if currentIndex > 0}
						{@render navButton('Previous', turnAround, goBack)}
					{:else}
						{@render navButton('Exit', turnAround, goHome)}
					{/if}

					{#if selectedAnswers[currentIndex]?.answers.length > 0}
						<button
							type="button"
							onclick={nextQuestion}
							class="group relative flex flex-row items-center gap-2 overflow-hidden bg-white px-0.5 py-0.5 font-medium"
							>{#if currentIndex < questions.length - 1}
								Next Question
							{:else}
								Show Results
							{/if}
							<ArrowDoubleRight classes="h-3.5" />
							<span
								class="animate-span absolute bottom-0 left-0 z-50 h-0.5 w-full scale-x-0 transform bg-black"
							></span>
						</button>
					{:else if questions[currentIndex].type === 'multiple-choice'}
						<button
							type="button"
							onclick={noneOfTheAbove}
							class="group relative flex flex-row items-center gap-2.5 overflow-hidden whitespace-nowrap bg-white px-0.5 py-0.5 font-medium text-green-800"
						>
							None of the above
							<IconNone classes={'fill-current h-4 pb-0.5'} />
							<SlidingBottomBorder color={'bg-current'} />
						</button>
					{/if}
				</div>
			</form>
		{/if}
	{/each}
	{#if currentIndex === questions.length}
		<div
			class="flex flex-col items-center gap-8 self-center py-6 sm:gap-10"
			out:fade={{ duration: 250 }}
			in:fade={{ duration: 350, delay: 350 }}
		>
			<div class="flex flex-col gap-4">
				<h1 class="h1 lg:text-5xl">Results</h1>
				<p class="group rounded-lg text-sm">
					This website does not provide medical advice. Please refer to our <a
						class="text-link"
						href="/legal/disclaimer">disclaimer<SlidingBottomBorder /></a
					> for more information.
				</p>
			</div>
			<div class="grid w-full grid-cols-1 gap-x-16 gap-y-12 md:grid-cols-2 lg:grid-cols-4">
				{#each Object.entries(calculatePercentages()).sort(([, percentageA], [, percentageB]) => percentageB - percentageA) as [medication, percentage]}
					<div class=" flex flex-col gap-2 bg-white text-left">
						<h2 class="h3 border-b-2">
							{#if medication === 'paracetamol'}
								{paracetamolAcetaminophen()}
							{:else}
								{capitalizeFirstLetter(medication)}
							{/if}
						</h2>
						<div class="text-sm font-normal">
							{(percentage as number).toFixed(0)}% match
						</div>
						<div class="flex flex-col gap-2">
							<!-- Progress Bar -->
							<div class="h-2 w-full rounded bg-gray-200">
								<div
									class="h-full rounded"
									style="width: {(percentage as number).toFixed(0)}%; 
						 background-color: hsl({(percentage as number) * 1.2}, 70%, 50%)"
								></div>
							</div>

							<!-- Reasons -->
							{#snippet reasons(type: 'positive' | 'neutral' | 'negative', color: string)}
								{#if medicationReasons[medication as Medications][type].length > 0}
									<div class="rounded-lg {color} px-4 py-2 text-left text-sm font-normal">
										<ul>
											{#each medicationReasons[medication as Medications][type] as reason}
												<li>
													{medicationReasons[medication as Medications][type].length > 1 ? '-' : ''}
													{reason}
												</li>
											{/each}
										</ul>
									</div>
								{/if}
							{/snippet}

							{@render reasons('positive', 'bg-green-100')}
							{@render reasons('neutral', 'bg-yellow-100')}
							{@render reasons('negative', 'bg-red-100')}
						</div>
					</div>
				{/each}
			</div>

			<!-- Results Buttons -->
			<div class="flex flex-row gap-6">
				{@render navButton('Previous', turnAround, goBack)}
				{@render navButton('Restart', reload, restart)}
				{@render navButton('Home', home, goHome)}
			</div>
		</div>
	{/if}
</div>

<style lang="postcss">
	.selected {
		@apply border-3 border-black bg-white shadow-inner-strong drop-shadow-none;
	}

	/* Looping animation to expand and contract underline */
	@keyframes spanAnimation {
		0% {
			transform: scaleX(0);
		}
		50% {
			transform: scaleX(1);
		}
		100% {
			transform: scaleX(0);
		}
	}

	.animate-span {
		animation: spanAnimation 2s ease-in-out infinite;
	}
</style>
