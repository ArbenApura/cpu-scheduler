<!-- <script lang="ts">
	// IMPORTED TYPES
	import type { Process } from '$types/index';
	// IMPORTED LIB-UTILS
	import _ from 'lodash';
	// IMPORTED LIB-COMPONENTS
	import { Button } from 'flowbite-svelte';
	// IMPROTED COMPONENTS
	import ProcessesTable from '$components/modules/ProcessesTable.svelte';
	import GanttChart from '$components/modules/GanttChart.svelte';
	import AddProcessModal from '$components/modules/AddProcessModal.svelte';

	// STATES
	let processes: Process[] = [];
	let adderModal = { isOpen: false };

	// UTILS
	const getShortestAT = () => _.orderBy<Process>(processes, ['arrival'], ['asc'])[0].arrival || 0;
	const getShortestBurst = (passed: Process[]) =>
		_.orderBy<Process>(passed, ['burst'], ['asc'])[0];
	const replace = (calculated: Process[]) => {
		calculated.forEach((calcProcess) => {
			processes = processes.map((process) => {
				if (calcProcess.id !== process.id) return process;
				process.completion = calcProcess.completion;
				process.turnaround = calcProcess.turnaround;
				process.waiting = calcProcess.waiting;
				return process;
			});
		});
	};
	const calculate = () => {
		let calculated: Process[] = [];
		let lastCT: number = getShortestAT();
		while (calculated.length !== processes.length) {
			const passed = processes.filter((process) => {
				if (calculated.some((calcProcess) => calcProcess.id === process.id)) return false;
				else if (process.arrival > lastCT) return false;
				return true;
			});
			if (!passed.length) break;
			const sorted = _.orderBy<Process>(passed, ['remaining'], ['asc']);
			const shortest = getShortestBurst(sorted);
			shortest.completion = shortest.burst + lastCT;
			shortest.turnaround = shortest.completion - shortest.arrival;
			shortest.waiting = shortest.turnaround - shortest.burst;
			lastCT = shortest.completion;
			calculated.push(shortest);
			processes = processes.map((process) => {
				if (process.id === shortest.id) return process;
				process.remaining = process.burst - shortest.burst;
				return process;
			});
		}
		replace(calculated);
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
		calculate();
	};
	const editProcess = (id: number, arrival: number, burst: number) => {
		processes = processes.map((process) => {
			if (process.id !== id) return process;
			process.arrival = arrival;
			process.burst = burst;
			process.remaining = burst;
			return process;
		});
		calculate();
	};
	const deleteProcess = (id: number) => {
		processes = processes.filter((process) => process.id !== id);
		calculate();
	};
	const handleAdd = (event: SubmitEvent) => {
		const form = event.target as HTMLFormElement;
		const id = parseInt(form.input_id.value);
		const arrival = parseInt(form.input_arrival.value);
		const burst = parseInt(form.input_burst.value);
		addProcess(id, arrival, burst);
		adderModal.isOpen = false;
	};
	const handleReset = () => (processes = []);
</script>

<AddProcessModal {...{ isModalOpen: adderModal.isOpen, processes, handleAdd }} />

<h5 class="mb-2 flex items-center gap-1">
	Shortest Remaining Time First
	<i class="ti ti-dice-2 text-sky-500" />
</h5>
<ProcessesTable {...{ processes, deleteProcess, editProcess }} />
<div class="flex justify-end mt-2 gap-2">
	<Button color="alternative" size="sm" on:click={handleReset}>Reset</Button>
	<Button color="primary" size="sm" on:click={() => (adderModal.isOpen = true)}>Add</Button>
</div>

{#if processes.length}
	<h5 class="my-2">
		Gantt Chart
		<i class="ti ti-table-alias text-sky-500" />
	</h5>
	<GanttChart processes={_.orderBy(processes, ['completion'], ['asc'])} />
{/if} -->
