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

import lung from '$lib/assets/icons/answers/lung.svg';
import lungFaded from '$lib/assets/icons/answers/lung-faded.svg';

import bleeding from '$lib/assets/icons/answers/bleeding.svg';
import noBleeding from '$lib/assets/icons/answers/no-bleeding.svg';

import pills from '$lib/assets/icons/answers/pills.svg';
import bloodPressure from '$lib/assets/icons/answers/blood-pressure.svg';
import depression from '$lib/assets/icons/answers/depression.svg';

import child from '$lib/assets/icons/answers/child.svg';
import adult from '$lib/assets/icons/answers/adult.svg';

// 1: positive, 0.5: neutral, 0: negative
export const questions = [
	{
		text: 'How strong is your pain?',
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
					ibuprofen: { value: 0.5, reason: 'Severe pain needs evaluation' },
					paracetamol: { value: 0, reason: 'Severe pain needs evaluation' },
					naproxen: { value: 0.5, reason: 'Severe pain needs evaluation' },
					aspirin: { value: 0.5, reason: 'Severe pain needs evaluation' }
				}
			}
		]
	},
	{
		text: 'Have your symptoms lasted over 2 weeks?',
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
					paracetamol: { value: 1, reason: 'Lower risk of long-term side effects' },
					naproxen: { value: 1, reason: 'Longer duration of effect' },
					aspirin: { value: 0, reason: 'Higher risk of long-term side effects' }
				}
			}
		]
	},
	{
		text: 'Do you have a fever?',
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
	{
		text: 'Do you have joint pain or inflammation?',
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
					paracetamol: { value: 0, reason: 'Does not reduce inflammation' },
					naproxen: { value: 1, reason: 'Anti-inflammatory' },
					aspirin: { value: 0.5, reason: 'Less effective in reducing inflammation' }
				}
			}
		]
	},
	{
		text: 'Are you pregnant in the 3rd trimester?',
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
		text: 'Do you suffer from any of the below?',
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
					paracetamol: { value: 0, reason: 'Contraindicated in liver failure' },
					naproxen: { value: 0.5, reason: 'Avoid in liver failure' },
					aspirin: { value: 0.5, reason: 'Avoid in liver failure' }
				}
			}
		]
	},
	{
		text: 'Do you take any of these medications?',
		type: 'multiple-choice',
		answers: [
			{
				text: 'BP medication',
				image: bloodPressure,
				medications: {
					ibuprofen: { value: 0.5, reason: 'May affect blood pressure' },
					paracetamol: { value: 1, reason: '' },
					naproxen: { value: 0.5, reason: 'May affect blood pressure' },
					aspirin: { value: 0.5, reason: 'May affect blood pressure' }
				}
			},
			{
				text: 'Antidepressants',
				image: depression,
				medications: {
					ibuprofen: { value: 0.5, reason: 'Increases bleeding risk' },
					paracetamol: { value: 1, reason: '' },
					naproxen: { value: 0.5, reason: 'Increases bleeding risk' },
					aspirin: { value: 0, reason: 'High risk of serious bleeding' }
				}
			},
			{
				text: 'Steroids',
				image: pills,
				medications: {
					ibuprofen: { value: 0, reason: 'High ulcer risk with steroids' },
					paracetamol: { value: 1, reason: '' },
					naproxen: { value: 0, reason: 'High ulcer risk with steroids' },
					aspirin: { value: 0, reason: 'High ulcer risk with steroids' }
				}
			}
		]
	},
	{
		text: 'Do you bruise easily or have prolonged bleeding?',
		type: 'single-choice',
		answers: [
			{
				text: 'No',
				image: noBleeding,
				medications: {
					ibuprofen: { value: 1, reason: '' },
					paracetamol: { value: 1, reason: '' },
					naproxen: { value: 1, reason: '' },
					aspirin: { value: 1, reason: '' }
				}
			},
			{
				text: 'Yes',
				image: bleeding,
				medications: {
					ibuprofen: { value: 0.5, reason: 'Increases bleeding risk' },
					paracetamol: { value: 1, reason: '' },
					naproxen: { value: 0.5, reason: 'Increases bleeding risk' },
					aspirin: { value: 0, reason: 'High risk of serious bleeding' }
				}
			}
		]
	},
	{
		text: 'Do you have heartburn or stomach problems?',
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
		text: 'Do you have asthma?',
		type: 'single-choice',
		answers: [
			{
				text: 'No',
				image: lungFaded,
				medications: {
					ibuprofen: { value: 1, reason: '' },
					paracetamol: { value: 1, reason: '' },
					naproxen: { value: 1, reason: '' },
					aspirin: { value: 1, reason: '' }
				}
			},
			{
				text: 'Yes',
				image: lung,
				medications: {
					ibuprofen: { value: 0, reason: 'Risk of severe asthma attack' },
					paracetamol: { value: 1, reason: 'Safe with asthma' },
					naproxen: { value: 0, reason: 'Risk of severe asthma attack' },
					aspirin: { value: 0, reason: 'Risk of severe asthma attack' }
				}
			}
		]
	},
	{
		text: 'Are you older than 16 years?',
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
