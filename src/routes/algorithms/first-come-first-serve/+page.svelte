<script lang="ts">
	// IMPORTED TYPES
	import type { Process } from '$types/index';
	// IMPORTED LIB-UTILS
	import _ from 'lodash';
	// IMPORTED UTILS
	import { generateRandomId } from '$utils/helpers';
	// IMPORTED LIB-COMPONENTS
	import { Button, Modal, Label, Input, Helper } from 'flowbite-svelte';
	import TableItem from './components/TableItem.svelte';

	// STATES
	let processes: Process[] = [];
	let adderModal = {
		isOpen: false,
		errors: { id: '' },
	};

	// UTILS
	const isIdDuplicate = (id: string) => processes.some((process) => process.id === id);
	const calculate = () => {
		let lastCompletion = 0;
		processes = _.orderBy<Process>(processes, ['arrival'], ['asc']).map((process) => {
			process.completion = process.burst + lastCompletion;
			process.turnaround = process.completion - process.arrival;
			process.waiting = process.turnaround - process.burst;
			lastCompletion = process.completion;
			return process;
		});
	};
	const addProcess = (id: string, arrival: number, burst: number) => {
		processes = [
			...processes,
			{
				id,
				arrival,
				burst,
				completion: 0,
				turnaround: 0,
				waiting: 0,
			},
		];
		calculate();
	};
	const editProcess = (id: string, arrival: number, burst: number) => {
		processes = processes.map((process) => {
			if (process.id !== id) return process;
			process.arrival = arrival;
			process.burst = burst;
			return process;
		});
		calculate();
	};
	const deleteProcess = (id: string) => {
		processes = processes.filter((process) => process.id !== id);
		calculate();
	};
	const handleAdd = (event: SubmitEvent) => {
		const form = event.target as HTMLFormElement;
		const id = form.input_id.value;
		const arrival = parseInt(form.input_arrival.value);
		const burst = parseInt(form.input_burst.value);
		if (isIdDuplicate(id)) return (adderModal.errors.id = 'ID is already taken!');
		addProcess(id, arrival, burst);
		adderModal.isOpen = false;
	};
</script>

<Modal bind:open={adderModal.isOpen} size="xs" title="Add Process" class="w-full">
	<form class="flex flex-col space-y-6" action="#" on:submit|preventDefault={handleAdd}>
		<Label class="space-y-2">
			<span>ID</span>
			<Input
				name="input_id"
				type="text"
				placeholder="Input a number"
				color={adderModal.errors.id ? 'red' : 'base'}
				value={generateRandomId(5)}
				required
				on:change={() => (adderModal.errors.id = '')}
			/>
			{#if adderModal.errors.id}
				<Helper class="mt-2" color="red">{adderModal.errors.id}</Helper>
			{/if}
		</Label>
		<Label class="space-y-2">
			<span>Arrival Time</span>
			<Input name="input_arrival" type="number" placeholder="Input a number" required />
		</Label>
		<Label class="space-y-2">
			<span>Burst Time</span>
			<Input name="input_burst" type="number" placeholder="Input a number" required />
		</Label>
		<Button type="submit" color="primary" class="w-full">Add</Button>
	</form>
</Modal>

<h5 class="mb-2">
	First Come First Serve
	<i class="ti ti-table-alias text-sky-500" />
</h5>
<div class="overflow-x-auto">
	<div class="min-w-[350px]">
		<table class="w-full border-collapse text-center">
			<thead class="bg-white">
				<tr>
					<th>ID</th>
					<th>Arrival Time</th>
					<th>Burst Time</th>
					<th>Completion Time</th>
					<th>Turnaround Time</th>
					<th>Waiting Time</th>
					<th><i class="ti ti-tools" /></th>
				</tr>
			</thead>
			<tbody>
				{#each processes as process}
					<TableItem {...{ process, deleteProcess, editProcess }} />
				{/each}
				{#if processes.length === 0}
					<td />
					<td />
					<td />
					<td>Empty</td>
					<td />
					<td />
					<td />
				{/if}
			</tbody>
		</table>
	</div>
</div>
<div class="flex justify-end mt-2">
	<Button color="primary" size="sm" on:click={() => (adderModal.isOpen = true)}>Add</Button>
</div>

{#if processes.length}
	<h5 class="my-2">
		Gantt Chart
		<i class="ti ti-table-alias text-sky-500" />
	</h5>
	<div class="overflow-x-auto overflow-y-hidden">
		<div class="flex">
			{#each processes as process, i}
				<div class="text-xs">
					<div
						class="bg-white w-[40px] h-[40px] border 
						{i + 1 !== processes.length && 'border-r-0'} 
						flex items-center justify-center"
					>
						P{i + 1}
					</div>
					<div class="flex">
						<span class="flex-grow">
							{#if i === 0}
								0
							{/if}
						</span>
						<span>{process.completion}</span>
					</div>
				</div>
			{/each}
		</div>
	</div>
{/if}

<style lang="scss">
	@import '$styles';
	:global(td),
	:global(th) {
		@apply text-sm leading-none border px-2 py-4 select-text;
		@include screen-only('xs') {
			@apply text-[10px];
		}
	}
</style>
