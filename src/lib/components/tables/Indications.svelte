<script lang="ts">
	import { statusColors } from './table-design';
	import { paracetamolAcetaminophen } from '$lib/functions/paracetamol-acetaminophen';

	const statusNames: { [key: number]: string } = {
		1: 'High',
		0.5: 'Moderate',
		0: 'Low'
	};

	const indications = [
		{
			condition: 'Fever',
			drugs: [
				{ drug: 'paracetamol', status: 1 },
				{ drug: 'ibuprofen', status: 1 },
				{ drug: 'naproxen', status: 0.5 },
				{ drug: 'aspirin', status: 0.5 }
			]
		},
		{
			condition: 'Headache',
			drugs: [
				{ drug: 'paracetamol', status: 1 },
				{ drug: 'ibuprofen', status: 0.5 },
				{ drug: 'naproxen', status: 0.5 },
				{ drug: 'aspirin', status: 1 }
			]
		},
		{
			condition: 'Menstrual cramps',
			drugs: [
				{ drug: 'paracetamol', status: 0 },
				{ drug: 'ibuprofen', status: 1 },
				{ drug: 'naproxen', status: 1 },
				{ drug: 'aspirin', status: 0 }
			]
		},
		{
			condition: 'Inflammation',
			drugs: [
				{ drug: 'paracetamol', status: 0 },
				{ drug: 'ibuprofen', status: 1 },
				{ drug: 'naproxen', status: 1 },
				{ drug: 'aspirin', status: 0.5 }
			]
		},
		{
			condition: 'Back pain',
			drugs: [
				{ drug: 'paracetamol', status: 0.5 },
				{ drug: 'ibuprofen', status: 1 },
				{ drug: 'naproxen', status: 1 },
				{ drug: 'aspirin', status: 0.5 }
			]
		},
		{
			condition: 'Chronic pain',
			drugs: [
				{ drug: 'paracetamol', status: 0.5 },
				{ drug: 'ibuprofen', status: 0.5 },
				{ drug: 'naproxen', status: 1 },
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
		{#each indications as row, i}
			<tr class="{i % 2 === 0 ? 'bg-white' : 'bg-gray-50'} transition-colors hover:bg-gray-100">
				<td class=" px-4 py-3 text-left">{row.condition}</td>
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
