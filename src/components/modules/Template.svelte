<script lang="ts">
	// IMPORTED STATES
	import { processes, ganttItems } from '$stores/processStates';
	// IMPORTED UTILS
	import { resetStates } from '$stores/processStates';
	// IMPORTED LIB-COMPONENTS
	import { Button } from 'flowbite-svelte';
	// IMPROTED COMPONENTS
	import ProcessesTable from '$components/modules/ProcessesTable.svelte';
	import GanttChart from '$components/modules/GanttChart.svelte';
	import AddProcessModal from '$components/modules/AddProcessModal.svelte';

	// PROPS
	export let title: string, icon: string, calculate: () => void;

	// STATES
	let isAdderModalOpen = false;

	// UTILS
	const setIsAdderModalOpen = (isOpen: boolean) => (isAdderModalOpen = isOpen);
</script>

<AddProcessModal {...{ isModalOpen: isAdderModalOpen, setIsAdderModalOpen }} />

<div class="flex flex-col gap-4">
	<div>
		<h5 class="mb-2 flex items-center gap-2">
			{title}
			<i class="ti {icon} text-sky-500 text-[25px] mb-1" />
		</h5>
		<ProcessesTable />
		<div class="flex justify-end mt-2 gap-2">
			{#if $processes.length}
				<Button color="alternative" size="sm" on:click={resetStates}>Reset</Button>
				<Button color="alternative" size="sm" on:click={calculate}>Calculate</Button>
			{/if}
			<Button color="primary" size="sm" on:click={() => (isAdderModalOpen = true)}>Add</Button
			>
		</div>
	</div>
	{#if $ganttItems.length}
		<div>
			<h5 class="my-2 flex items-center gap-2">
				Gantt Chart
				<i class="ti ti-table-alias text-sky-500 text-[25px] mb-1" />
			</h5>
			<GanttChart />
		</div>
	{/if}
</div>
