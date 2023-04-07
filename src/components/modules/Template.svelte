<script lang="ts">
	// IMPORTED TYPES
	import type { Process, GanttItem } from '$types/index';
	// IMPORTED LIB-UTILS
	import _ from 'lodash';
	// IMPORTED LIB-COMPONENTS
	import { Button } from 'flowbite-svelte';
	// IMPROTED COMPONENTS
	import ProcessesTable from '$components/modules/ProcessesTable.svelte';
	import GanttChart from '$components/modules/GanttChart.svelte';
	import AddProcessModal from '$components/modules/AddProcessModal.svelte';

	// PROPS
	export let title: string,
		icon: string,
		calculate: (processes: Process[]) => { processes: Process[]; ganttItems: GanttItem[] };

	// STATES
	let processes: Process[] = [];
	let ganttItems: GanttItem[] = [];
	let isAdderModalOpen = false;

	// UTILS
	const setIsAdderModalOpen = (isOpen: boolean) => (isAdderModalOpen = isOpen);
	const resetRemaining = () =>
		(processes = processes.map((process) => {
			process.remaining = process.burst;
			return process;
		}));
	const replace = (calculated: Process[]) => {
		calculated.forEach((calcProcess) => {
			processes = processes.map((process) => {
				if (calcProcess.id !== process.id) return process;
				process.completion = calcProcess.completion;
				process.turnaround = calcProcess.turnaround;
				process.waiting = calcProcess.waiting;
				process.remaining = calcProcess.remaining;
				return process;
			});
		});
	};
	const addProcess = (id: number, arrival: number, burst: number) => {
		processes = [
			...processes,
			{
				id,
				arrival,
				burst,
				remaining: burst,
				completion: 0,
				turnaround: 0,
				waiting: 0,
			},
		];
		resetRemaining();
	};
	const editProcess = (id: number, arrival: number, burst: number) => {
		processes = processes.map((process) => {
			if (process.id !== id) return process;
			process.arrival = arrival;
			process.burst = burst;
			process.remaining = burst;
			return process;
		});
		resetRemaining();
	};
	const deleteProcess = (id: number) => {
		processes = processes.filter((process) => process.id !== id);
		resetRemaining();
	};
	const handleCalculate = () => {
		const calculated = calculate(processes);
		replace(calculated.processes);
		ganttItems = calculated.ganttItems;
		resetRemaining();
	};
	const handleReset = () => {
		processes = [];
		ganttItems = [];
	};
</script>

<AddProcessModal
	{...{ isModalOpen: isAdderModalOpen, setIsAdderModalOpen, processes, addProcess }}
/>

<h5 class="mb-2 flex items-center gap-1">
	{title}
	<i class="ti {icon} text-sky-500" />
</h5>
<ProcessesTable {...{ processes, deleteProcess, editProcess }} />
<div class="flex justify-end mt-2 gap-2">
	{#if processes.length}
		<Button color="alternative" size="sm" on:click={handleReset}>Reset</Button>
		<Button color="alternative" size="sm" on:click={handleCalculate}>Calculate</Button>
	{/if}
	<Button color="primary" size="sm" on:click={() => (isAdderModalOpen = true)}>Add</Button>
</div>

{#if ganttItems.length}
	<h5 class="my-2">
		Gantt Chart
		<i class="ti ti-table-alias text-sky-500" />
	</h5>
	<GanttChart items={ganttItems} />
{/if}
