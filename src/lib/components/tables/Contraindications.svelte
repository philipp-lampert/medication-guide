<script lang="ts">
	import { paracetamolAcetaminophen } from '$lib/functions/paracetamol-acetaminophen';
	import { statusColors } from './table-design';

	const statusNames: { [key: number]: string } = {
		1: 'Safe',
		0.5: 'Caution',
		0: 'High risk'
	};

	const contraindications = [
		{
			condition: 'Children < 15 years',
			drugs: [
				{ drug: 'paracetamol', status: 1 },
				{ drug: 'ibuprofen', status: 1 },
				{ drug: 'naproxen', status: 0.5 },
				{ drug: 'aspirin', status: 0 }
			]
		},
		{
			condition: 'Pregnancy (3rd trimester)',
			drugs: [
				{ drug: 'paracetamol', status: 1 },
				{ drug: 'ibuprofen', status: 0 },
				{ drug: 'naproxen', status: 0 },
				{ drug: 'aspirin', status: 0 }
			]
		},
		{
			condition: 'Gastric irritation/ulcers',
			drugs: [
				{ drug: 'paracetamol', status: 1 },
				{ drug: 'ibuprofen', status: 0.5 },
				{ drug: 'naproxen', status: 0.5 },
				{ drug: 'aspirin', status: 0 }
			]
		},
		{
			condition: 'Kidney disease',
			drugs: [
				{ drug: 'paracetamol', status: 0.5 },
				{ drug: 'ibuprofen', status: 0 },
				{ drug: 'naproxen', status: 0 },
				{ drug: 'aspirin', status: 0 }
			]
		},
		{
			condition: 'Cardiovascular events',
			drugs: [
				{ drug: 'paracetamol', status: 1 },
				{ drug: 'ibuprofen', status: 0 },
				{ drug: 'naproxen', status: 0 },
				{ drug: 'aspirin', status: 0.5 }
			]
		},
		{
			condition: 'Liver disease',
			drugs: [
				{ drug: 'paracetamol', status: 0.5 },
				{ drug: 'ibuprofen', status: 0.5 },
				{ drug: 'naproxen', status: 0.5 },
				{ drug: 'aspirin', status: 0.5 }
			]
		},
		{
			condition: 'Bleeding risk',
			drugs: [
				{ drug: 'paracetamol', status: 1 },
				{ drug: 'ibuprofen', status: 0.5 },
				{ drug: 'naproxen', status: 0.5 },
				{ drug: 'aspirin', status: 0 }
			]
		},
		{
			condition: 'Consequences of overdose',
			drugs: [
				{ drug: 'paracetamol', status: 0 },
				{ drug: 'ibuprofen', status: 0.5 },
				{ drug: 'naproxen', status: 0.5 },
				{ drug: 'aspirin', status: 0 }
			]
		}
	];
</script>

<table
	class="w-[650px] table-auto border-collapse rounded-lg bg-white text-center leading-5 md:w-[900px]"
>
	<thead>
		<tr class="bg-gray-100">
			<th class="w-1/4"></th>
			<th class="px-4 py-3 font-medium">{paracetamolAcetaminophen()}</th>
			<th class="px-4 py-3 font-medium">Ibuprofen</th>
			<th class="px-4 py-3 font-medium">Naproxen</th>
			<th class="px-4 py-3 font-medium">Aspirin</th>
		</tr>
	</thead>
	<tbody>
		{#each contraindications as row, i}
			<tr class="{i % 2 === 0 ? 'bg-white' : 'bg-gray-50'} transition-colors hover:bg-gray-100">
				<td class="px-4 py-3 text-left">{row.condition}</td>
				{#each row.drugs as drugStatus}
					<td class="px-4 py-3">
						<span
							class="rounded-md px-2 pb-1 pt-1.5 text-sm font-medium {statusColors[
								drugStatus.status
							]}"
						>
							{statusNames[drugStatus.status]}
						</span>
					</td>
				{/each}
			</tr>
		{/each}
	</tbody>
</table>
