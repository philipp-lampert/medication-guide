import mild from '$lib/assets/icons/answers/mild.svg';
import moderate from '$lib/assets/icons/answers/moderate.svg';
import severe from '$lib/assets/icons/answers/severe.svg';

import lightning from '$lib/assets/icons/answers/lightning.svg';
import time from '$lib/assets/icons/answers/time.svg';

import temperatureHigh from '$lib/assets/icons/answers/temperature-high.svg';
import temperatureLow from '$lib/assets/icons/answers/temperature-low.svg';

import inflammation from '$lib/assets/icons/answers/inflammation.svg';
import noInflammation from '$lib/assets/icons/answers/no-inflammation.svg';

import pregnant from '$lib/assets/icons/answers/pregnant.svg';
import person from '$lib/assets/icons/answers/person.svg';

import kidney from '$lib/assets/icons/answers/kidney.svg';
import heart from '$lib/assets/icons/answers/heart.svg';
import liver from '$lib/assets/icons/answers/liver.svg';

import stomach from '$lib/assets/icons/answers/stomach.svg';
import stomachPain from '$lib/assets/icons/answers/stomach-pain.svg';

import pills from '$lib/assets/icons/answers/pills.svg';
import noPills from '$lib/assets/icons/answers/no-pills.svg';

import child from '$lib/assets/icons/answers/child.svg';
import adult from '$lib/assets/icons/answers/adult.svg';

// 1: positive, 0.5: neutral, 0: negative
export const questions = [
	// How strong is your pain?
	{
		text: [
			{ content: 'How strong is your ', highlight: false },
			{ content: 'pain', highlight: true },
			{ content: '?', highlight: false }
		],
		type: 'single-choice',
		answers: [
			{
				text: 'Mild',
				image: mild,
				medications: {
					ibuprofen: { value: 1, reason: '' },
					paracetamol: { value: 1, reason: '' },
					naproxen: { value: 1, reason: '' },
					aspirin: { value: 1, reason: '' }
				}
			},
			{
				text: 'Moderate',
				image: moderate,
				medications: {
					ibuprofen: { value: 1, reason: '' },
					paracetamol: { value: 0.5, reason: 'Slightly weaker pain relief' },
					naproxen: { value: 1, reason: '' },
					aspirin: { value: 1, reason: '' }
				}
			},
			{
				text: 'Severe',
				image: severe,
				medications: {
					ibuprofen: { value: 0.5, reason: 'See doctor for severe pain' },
					paracetamol: { value: 0, reason: 'See doctor for severe pain' },
					naproxen: { value: 0.5, reason: 'See doctor for severe pain' },
					aspirin: { value: 0.5, reason: 'See doctor for severe pain' }
				}
			}
		]
	},
	// Is your paint acute or chronic??
	{
		text: [{ content: 'Have your symptoms lasted over 2 weeks?', highlight: false }],
		type: 'single-choice',
		answers: [
			{
				text: 'No',
				image: lightning,
				medications: {
					ibuprofen: { value: 1, reason: '' },
					paracetamol: { value: 1, reason: 'Overall lower risk of side effects' },
					naproxen: { value: 0.5, reason: 'Slower onset of effect' },
					aspirin: { value: 0.5, reason: 'Overall higher risk of side effects' }
				}
			},
			{
				text: 'Yes',
				image: time,
				medications: {
					ibuprofen: { value: 0.5, reason: '' },
					paracetamol: { value: 1, reason: 'Overall lower risk of side effects' },
					naproxen: { value: 1, reason: 'Longer duration of effect' },
					aspirin: { value: 0, reason: 'Overall higher risk of side effects' }
				}
			}
		]
	},
	// Do you have a fever?
	{
		text: [
			{ content: 'Do you have a ', highlight: false },
			{ content: 'fever', highlight: true },
			{ content: '?', highlight: false }
		],
		type: 'single-choice',
		answers: [
			{
				text: 'No',
				image: temperatureLow,
				medications: {
					ibuprofen: { value: 1, reason: '' },
					paracetamol: { value: 1, reason: '' },
					naproxen: { value: 1, reason: '' },
					aspirin: { value: 1, reason: '' }
				}
			},
			{
				text: 'Yes',
				image: temperatureHigh,
				medications: {
					ibuprofen: { value: 1, reason: 'Reduces fever effectively' },
					paracetamol: { value: 1, reason: 'Reduces fever effectively' },
					naproxen: { value: 0.5, reason: '' },
					aspirin: { value: 0.5, reason: '' }
				}
			}
		]
	},
	// Do you have local swelling or inflammation?
	{
		text: [{ content: 'Do you have joint pain?', highlight: false }],
		type: 'single-choice',
		answers: [
			{
				text: 'No',
				image: noInflammation,
				medications: {
					ibuprofen: { value: 1, reason: '' },
					paracetamol: { value: 1, reason: '' },
					naproxen: { value: 1, reason: '' },
					aspirin: { value: 1, reason: '' }
				}
			},
			{
				text: 'Yes',
				image: inflammation,
				medications: {
					ibuprofen: { value: 1, reason: 'Anti-inflammatory' },
					paracetamol: { value: 0.5, reason: 'Does not reduce inflammation' },
					naproxen: { value: 1, reason: 'Anti-inflammatory' },
					aspirin: { value: 0.5, reason: 'Does not reduce inflammation' }
				}
			}
		]
	},
	{
		// Are you pregnant in the 3rd trimester?
		text: [
			{ content: 'Are you ', highlight: false },
			{ content: 'pregnant ', highlight: true },
			{ content: 'in the ', highlight: false },
			{ content: '3rd trimester', highlight: true },
			{ content: '?', highlight: false }
		],
		type: 'single-choice',
		answers: [
			{
				text: 'No',
				image: person,
				medications: {
					ibuprofen: { value: 1, reason: '' },
					paracetamol: { value: 1, reason: '' },
					naproxen: { value: 1, reason: '' },
					aspirin: { value: 1, reason: '' }
				}
			},
			{
				text: 'Yes',
				image: pregnant,
				medications: {
					ibuprofen: { value: 0, reason: 'Pregnancy > 6 months' },
					paracetamol: { value: 1, reason: 'Safe in pregnancy' },
					naproxen: { value: 0, reason: 'Pregnancy > 6 months' },
					aspirin: { value: 0, reason: 'Pregnancy > 6 months' }
				}
			}
		]
	},
	{
		// Do you have any of the following?
		text: [
			{ content: 'Do you suffer from ', highlight: false },
			{ content: 'any of the following', highlight: true },
			{ content: '?', highlight: false }
		],
		type: 'multiple-choice',
		answers: [
			{
				text: 'Kidney disease',
				image: kidney,
				medications: {
					ibuprofen: { value: 0, reason: 'Contraindicated in kidney disease' },
					paracetamol: { value: 0.5, reason: 'Avoid in kidney disease' },
					naproxen: { value: 0, reason: 'Contraindicated in kidney disease' },
					aspirin: { value: 0, reason: 'Contraindicated in kidney disease' }
				}
			},
			{
				text: 'Heart failure',
				image: heart,
				medications: {
					ibuprofen: { value: 0, reason: 'Contraindicated in heart failure' },
					paracetamol: { value: 0.5, reason: 'Avoid in heart failure' },
					naproxen: { value: 0, reason: 'Contraindicated in  heart failure' },
					aspirin: { value: 0, reason: 'Contraindicated in  heart failure' }
				}
			},
			{
				text: 'Liver disease',
				image: liver,
				medications: {
					ibuprofen: { value: 0.5, reason: 'Avoid in liver failure' },
					paracetamol: { value: 0.5, reason: 'Lower dosage in liver failure' },
					naproxen: { value: 0.5, reason: 'Avoid in liver failure' },
					aspirin: { value: 0.5, reason: 'Avoid in liver failure' }
				}
			}
		]
	},
	{
		// Do you currently take anticoagulants?
		text: [{ content: 'Are you taking blood thinners?', highlight: false }],
		type: 'single-choice',
		answers: [
			{
				text: 'No',
				image: noPills,
				medications: {
					ibuprofen: { value: 1, reason: '' },
					paracetamol: { value: 1, reason: '' },
					naproxen: { value: 1, reason: '' },
					aspirin: { value: 1, reason: '' }
				}
			},
			{
				text: 'Yes',
				image: pills,
				medications: {
					ibuprofen: { value: 0.5, reason: 'May increase bleeding risk' },
					paracetamol: { value: 1, reason: '' },
					naproxen: { value: 0.5, reason: 'May increase bleeding risk' },
					aspirin: { value: 0, reason: 'Increases bleeding risk' }
				}
			}
		]
	},
	{
		// Do you have heartburn or stomach problems?
		text: [
			{ content: 'Do you have ', highlight: false },
			{ content: 'heartburn ', highlight: true },
			{ content: 'or ', highlight: false },
			{ content: 'stomach problems', highlight: true },
			{ content: '?', highlight: false }
		],
		type: 'single-choice',
		answers: [
			{
				text: 'No',
				image: stomach,
				medications: {
					ibuprofen: { value: 0.5, reason: 'Can cause stomach ulcers' },
					paracetamol: { value: 1, reason: '' },
					naproxen: { value: 0.5, reason: 'Can cause stomach ulcers' },
					aspirin: { value: 0.5, reason: 'Can cause stomach ulcers' }
				}
			},
			{
				text: 'Yes',
				image: stomachPain,
				medications: {
					ibuprofen: { value: 0, reason: 'May further damage stomach' },
					paracetamol: { value: 1, reason: 'Does not affect stomach' },
					naproxen: { value: 0, reason: 'May further damage stomach' },
					aspirin: { value: 0, reason: 'May further damage stomach' }
				}
			}
		]
	},
	{
		// Are you older than 16 years?
		text: [
			{ content: 'Are you older than ', highlight: false },
			{ content: '16 years', highlight: true },
			{ content: '?', highlight: false }
		],
		type: 'single-choice',
		answers: [
			{
				text: 'No',
				image: child,
				medications: {
					ibuprofen: { value: 0.5, reason: 'Risk of dehydration in children' },
					paracetamol: { value: 1, reason: 'First choice for children' },
					naproxen: { value: 0, reason: 'Contraindicated in children' },
					aspirin: { value: 0, reason: 'Contraindicated in children' }
				}
			},
			{
				text: 'Yes',
				image: adult,
				medications: {
					ibuprofen: { value: 1, reason: '' },
					paracetamol: { value: 1, reason: '' },
					naproxen: { value: 1, reason: '' },
					aspirin: { value: 1, reason: '' }
				}
			}
		]
	}
];
