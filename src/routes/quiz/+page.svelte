<script lang="ts">
	import AnimatedUnderline from '$lib/components/AnimatedUnderline.svelte';
	import ArrowDoubleRight from '$lib/icons/buttons/ArrowDoubleRight.svelte';
	import IconNone from '$lib/icons/buttons/IconNone.svelte';
	import turnAround from '$lib/icons/buttons/arrow-turn-around.svg';
	import reload from '$lib/icons/buttons/reload.svg';
	import home from '$lib/icons/buttons/home.svg';
	import Info from '$lib/icons/buttons/Info.svelte';
	import { fade } from 'svelte/transition';
	import { questions } from './questions';
	import { capitalizeFirstLetter } from '$lib/functions/utils';
	import { paracetamolAcetaminophen } from '$lib/functions/paracetamol-acetaminophen';
	import ProgressBar from './ProgressBar.svelte';
	import HeadContent from './HeadContent.svelte';
	import { MEDICATIONS } from './questions';
	import type { Answer, Explanation, Medication, ValueExplanation } from './questions.ts';
	import Modal from '$lib/components/Modal.svelte';

	// Modal window state and controls for detailed explanations
	let modalOpen = $state(false);
	function openModal() {
		modalOpen = true;
	}
	function closeModal() {
		modalOpen = false;
	}

	// State for displaying content within the modal
	let currentLongExplanation: string = $state('');
	let currentSources: { label: string; url: string }[] = $state([]);

	function setCurrentExplanationSources(
		longExplanation: string,
		sources: {
			label: string;
			url: string;
		}[]
	) {
		currentLongExplanation = longExplanation;
		currentSources = sources;
	}

	// Core quiz progression state
	let clientHeight: number = $state(0);
	let currentIndex: number = $state(0);
	let direction: number = $state(1); // Animation direction for question transitions (1: forward, -1: backward)

	// --- Type definitions for structuring medication recommendation data ---
	type RecommendationCategory = 'positive' | 'neutral' | 'negative';
	type MedicationRecommendation = Record<RecommendationCategory, Explanation[]>;
	type MedicationReasons = Record<Medication, MedicationRecommendation>;

	// Stores the user's selected answers for each question
	let selectedAnswers: { answers: Answer[] }[] = $state([]);

	// --- Answer selection logic ---
	function isAnswerSelected(answer: Answer): boolean {
		return questions[currentIndex].multipleChoice === false
			? selectedAnswers[currentIndex]?.answers[0]?.label === answer.label
			: selectedAnswers[currentIndex] &&
					selectedAnswers[currentIndex].answers.some((a) => a.label === answer.label);
	}

	function answerSelection(answer: Answer): void {
		// Handles user answer selection and navigation for single-choice
		if (!selectedAnswers[currentIndex]) {
			selectedAnswers[currentIndex] = { answers: [] };
		}

		if (questions[currentIndex].multipleChoice === false) {
			selectedAnswers[currentIndex].answers = [answer];
			currentIndex++;
			direction = 1;
		} else {
			// For multiple-choice, toggle answer selection
			const existingAnswerIndex = selectedAnswers[currentIndex].answers.findIndex(
				(existingAnswer) => existingAnswer.label === answer.label
			);

			if (existingAnswerIndex >= 0) {
				selectedAnswers[currentIndex].answers.splice(existingAnswerIndex, 1);
			} else {
				selectedAnswers[currentIndex].answers.push(answer);
			}
		}
	}

	// --- Derived state: Calculations based on user answers ---
	// Computes categorized reasons (positive, neutral, negative) for each medication
	let medicationReasons: MedicationReasons = $derived(
		MEDICATIONS.reduce((acc, medication) => {
			const userReasons: Record<RecommendationCategory, Explanation[]> = {
				positive: [],
				neutral: [],
				negative: []
			};

			selectedAnswers.forEach((question) => {
				question.answers.forEach((answer) => {
					const medicationData = answer.medications[medication];
					if (medicationData) {
						const category = categorizeMedicationEffect(medicationData.value);
						if (category && medicationData.explanation?.short) {
							userReasons[category].push({
								short: medicationData.explanation.short,
								long: medicationData.explanation.long,
								sources: medicationData.explanation.sources
							});
						}
					}
				});
			});

			return {
				...acc,
				[medication]: {
					positive: [...userReasons.positive],
					neutral: [...userReasons.neutral],
					negative: [...userReasons.negative]
				}
			};
		}, {} as MedicationReasons)
	);

	function categorizeMedicationEffect(value: number): RecommendationCategory | null {
		// Helper to map score value to a category
		if (value === 1) return 'positive';
		if (value === 0.5) return 'neutral';
		if (value === 0) return 'negative';
		return null;
	}

	// Calculates raw scores for each medication based on selected answers
	let medicationScores: Record<Medication, number> = $derived(
		MEDICATIONS.reduce(
			(acc, name) => ({
				...acc,
				[name]: selectedAnswers
					.flatMap((question) =>
						question.answers.map((answer) => answer.medications[name]?.value || 0)
					)
					.reduce((sum, value) => sum + value, 0)
			}),
			{} as Record<Medication, number>
		)
	);

	let numSelectedAnswers = $derived(
		selectedAnswers.reduce((total, question) => total + (question.answers?.length || 0), 0)
	);

	// Calculates percentage match for each medication based on scores and number of answers
	let percentages: Record<string, number> = $derived(
		MEDICATIONS.reduce(
			(acc, medication) => {
				const score = medicationScores[medication] || 0;
				acc[medication] = numSelectedAnswers > 0 ? (score / numSelectedAnswers) * 100 : 0;
				return acc;
			},
			{} as Record<string, number>
		)
	);

	// --- Navigation and Quiz Flow Control Functions ---
	function nextQuestion(): void {
		currentIndex++;
		direction = 1;
	}

	function noneOfTheAbove(): void {
		// Handles 'None of the above' selection, assigning a default assessment
		if (!selectedAnswers[currentIndex]) {
			selectedAnswers[currentIndex] = { answers: [] };
		}
		const defaultAssessment: ValueExplanation = {
			value: 1,
			explanation: { short: '', long: '', sources: [{ label: '', url: '' }] }
		};
		const medicationAssessments = Object.fromEntries(
			MEDICATIONS.map((med) => [med, defaultAssessment])
		) as Record<Medication, ValueExplanation>;
		selectedAnswers[currentIndex].answers = [
			{ label: 'None of the above', image: '', medications: medicationAssessments }
		];
		nextQuestion();
	}

	function goBack(): void {
		if (currentIndex > 0) {
			direction = -1;
			currentIndex--;
		}
	}

	function restart(): void {
		currentIndex = 0;
		selectedAnswers = [];
	}

	function goHome(): void {
		window.location.href = '/';
	}
</script>

<svelte:head>
	<HeadContent />
</svelte:head>

{#snippet navButton(label: string, icon: string, action: () => void)}
	<button
		type="button"
		onclick={action}
		class="group relative flex flex-row items-center gap-2.5 overflow-hidden bg-white px-0.5 py-0.5 font-medium"
	>
		<img src={icon} alt={label} class="h-4 pb-0.5" />
		{label}
		<AnimatedUnderline />
	</button>
{/snippet}

<div
	bind:clientHeight
	class="container my-8 flex min-h-[525px] flex-grow justify-center sm:my-12 sm:min-h-[500px]"
>
	{#if currentIndex < questions.length}
		<ProgressBar
			{questions}
			{selectedAnswers}
			{currentIndex}
			onclick={(index: number) => {
				currentIndex = index;
			}}
		/>
	{/if}
	{#each questions as question, index (index)}
		{#if index === currentIndex}
			<form
				style="top: {clientHeight / 1.65}px; transform: translateY(-50%)"
				class="absolute inset-x-0 mx-auto flex flex-col items-center justify-center gap-8 text-center sm:max-w-4xl md:gap-10 md:py-12"
				out:fade={{ duration: 150 }}
				in:fade={{ duration: 250, delay: 250 }}
				onsubmit={nextQuestion}
			>
				<div class="flex flex-col gap-2">
					<h1 class="mx-8 font-mallory text-3xl font-light leading-8 tracking-tight">
						{question.label}
					</h1>
					{#if questions[currentIndex].label === 'multiple-choice'}
						<span class="text-lg italic">Select all that apply.</span>
					{/if}
				</div>
				<div
					class="grid grid-cols-2 justify-items-center gap-4"
					class:sm:grid-cols-3={question.answers.length === 3}
					class:sm:grid-cols-4={question.answers.length === 4}
				>
					{#each question.answers as answer, i}
						<button
							type="button"
							onclick={() => answerSelection(answer)}
							class="
                       flex h-36 w-36 flex-col items-center justify-center gap-2 rounded-2xl border-2
                       border-gray-200 bg-gray-50 font-medium text-black [transition:border-color_300ms,background-color_300ms,filter_300ms]
                      hover:border-black hover:bg-white hover:drop-shadow-xl sm:gap-4 md:h-44 md:w-44 md:text-lg
                      {question.answers.length === 3 && i === 2 ? 'col-span-2 sm:col-auto' : ''}
                      {isAnswerSelected(answer)
								? 'border-3 border-gray-950 bg-white shadow-inner-strong drop-shadow-none'
								: ''}
                  "
						>
							{answer.label}
							{#if answer.image}
								<img src={answer.image} alt={answer.label} class="h-16" />
							{/if}
						</button>
					{/each}
				</div>

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
					{:else if questions[currentIndex].multipleChoice === true}
						<button
							type="button"
							onclick={noneOfTheAbove}
							class="group relative flex flex-row items-center gap-2.5 overflow-hidden whitespace-nowrap bg-white px-0.5 py-0.5 font-medium text-green-800"
						>
							None of the above
							<IconNone classes={'fill-current h-4 pb-0.5'} />
							<AnimatedUnderline color={'bg-current'} />
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
					This website does not provide medical advice and is not a substitute for consulting with a
					physician. Please refer to our <a class="text-link" href="/legal/disclaimer"
						>disclaimer<AnimatedUnderline /></a
					> for more information.
				</p>
			</div>
			<div
				class="grid w-full grid-cols-1 gap-x-10 gap-y-12 md:grid-cols-2 lg:grid-cols-4 xl:gap-x-12"
			>
				{#each Object.entries(percentages).sort(([, percentageA], [, percentageB]) => percentageB - percentageA) as [medication, percentage]}
					<div class=" flex flex-col gap-2 bg-white text-left">
						<h2 class="h3 border-b-2">
							{#if medication === 'paracetamol'}
								{paracetamolAcetaminophen(true)}
							{:else}
								{capitalizeFirstLetter(medication)}
							{/if}
						</h2>
						<div class="text-sm font-normal">
							{(percentage as number).toFixed(0)}% match
						</div>
						<div class="flex flex-col gap-2">
							<div class="h-2 w-full rounded bg-gray-200">
								<div
									class="h-full rounded"
									style="width: {(percentage as number).toFixed(0)}%; 
             background-color: hsl({(percentage as number) * 1.2}, 70%, 50%)"
								></div>
							</div>

							{#snippet reasons(type: RecommendationCategory, color: string, insetColor: string)}
								{#if medicationReasons[medication as Medication][type].length > 0}
									<div class="rounded-lg {color} p-1 text-left text-sm font-normal">
										<ul class="flex flex-col gap-1">
											{#each medicationReasons[medication as Medication][type] as reasonInfo}
												<li
													class="rounded-md {insetColor} flex flex-row items-center justify-between gap-2 py-1 pl-2 pr-1"
												>
													{reasonInfo.short}
													{#if reasonInfo.long && reasonInfo.sources.length > 0}
														<button
															onclick={() => {
																setCurrentExplanationSources(
																	reasonInfo.long || '',
																	reasonInfo.sources || []
																);
																openModal();
															}}><Info classes="h-4 opacity-50" /></button
														>
													{/if}
												</li>
											{/each}
										</ul>
									</div>
								{/if}
							{/snippet}

							{@render reasons('positive', 'bg-green-200', 'bg-green-100')}
							{@render reasons('neutral', 'bg-yellow-200', 'bg-yellow-100')}
							{@render reasons('negative', 'bg-red-200', 'bg-red-100')}
						</div>
					</div>
				{/each}
			</div>
			<div class="flex flex-row gap-6">
				{@render navButton('Previous', turnAround, goBack)}
				{@render navButton('Restart', reload, restart)}
				{@render navButton('Home', home, goHome)}
			</div>
		</div>
	{/if}

	<Modal isOpen={modalOpen} {closeModal}>
		<div class="flex flex-col gap-2">
			<p class="text-left">
				{currentLongExplanation}
			</p>
			<ul class="flex flex-row flex-wrap gap-x-2 gap-y-1.5 text-xs text-gray-500">
				{#each currentSources as source}
					<li class="flex-shrink-0">
						<a class="text-link group relative text-nowrap" href={source.url} target="_blank"
							>{source.label}<AnimatedUnderline color={'bg-current'} /></a
						>
					</li>
				{/each}
			</ul>
		</div>
	</Modal>
</div>

<style lang="postcss">
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
