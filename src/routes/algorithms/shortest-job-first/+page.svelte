<script lang="ts">
	// IMPORTED TYPES
	import type { Process } from '$types/index';
	// IMPORTED LIB-UTILS
	import _ from 'lodash';
	// IMPORTED STATES
	import { processes, ganttItems } from '$stores/processStates';
	// IMPORTED UTILS
	import { getShortestArrival } from '$utils/helpers';
	import { replaceProcesses } from '$stores/processStates';
	// IMPROTED COMPONENTS
	import Template from '$components/modules/Template.svelte';

	// UTILS
	const calculate = () => {
		let calculated: Process[] = [];
		let lastCompletion: number = getShortestArrival($processes).arrival;
		while (calculated.length !== $processes.length) {
			const passed = $processes.filter((process) => {
				if (calculated.some((calcProcess) => calcProcess.id === process.id)) return false;
				else if (process.arrival > lastCompletion) return false;
				return true;
			});
			if (!passed.length) break;
			const sorted = _.orderBy<Process>(passed, ['burst'], ['asc']);
			const shortest = sorted[0];
			shortest.completion = shortest.burst + lastCompletion;
			shortest.turnaround = shortest.completion - shortest.arrival;
			shortest.waiting = shortest.turnaround - shortest.burst;
			lastCompletion = shortest.completion;
			calculated.push(shortest);
		}
		replaceProcesses(calculated);
		ganttItems.set(
			_.orderBy(
				calculated.map((process) => ({ id: process.id, value: process.completion })),
				['value'],
				['asc'],
			),
		);
	};
</script>

<Template {...{ title: 'Shortest Job First', icon: 'ti-dice-2', calculate }} />
