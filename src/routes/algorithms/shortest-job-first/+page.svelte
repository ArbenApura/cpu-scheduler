<script lang="ts">
	// IMPORTED TYPES
	import type { Process } from '$types/index';
	// IMPORTED LIB-UTILS
	import _ from 'lodash';
	// IMPORTED UTILS
	import { getShortestArrival } from '$utils/helpers';
	// IMPROTED COMPONENTS
	import Template from '$components/modules/Template.svelte';

	// UTILS
	const calculate = (data: Process[]) => {
		let processes: Process[] = [];
		let lastCompletion: number = getShortestArrival(data).arrival;
		while (processes.length !== data.length) {
			const passed = data.filter((process) => {
				if (processes.some((calcProcess) => calcProcess.id === process.id)) return false;
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
			processes.push(shortest);
		}
		let ganttItems = _.orderBy(
			processes.map((process) => ({ id: process.id, value: process.completion })),
			['value'],
			['asc'],
		);
		return { processes, ganttItems };
	};
</script>

<Template {...{ title: 'Shortest Job First', icon: 'ti-dice-2', calculate }} />
