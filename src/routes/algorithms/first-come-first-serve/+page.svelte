<script lang="ts">
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
	const calculate = () => {
		let lastCompletion = 0;
		let calculated: Process[] = _.orderBy<Process>(processes, ['arrival'], ['asc']).map(
			(process) => {
				process.completion = process.burst + lastCompletion;
				process.turnaround = process.completion - process.arrival;
				process.waiting = process.turnaround - process.burst;
				lastCompletion = process.completion;
				return process;
			},
		);
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
	const addProcess = (id: number, arrival: number, burst: number) => {
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
	const editProcess = (id: number, arrival: number, burst: number) => {
		processes = processes.map((process) => {
			if (process.id !== id) return process;
			process.arrival = arrival;
			process.burst = burst;
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

<h5 class="mb-2">
	First Come First Serve
	<i class="ti ti-table-alias text-sky-500" />
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
	<GanttChart processes={_.orderBy(processes, ['arrival'], ['asc'])} />
{/if}
