<script lang="ts">
	// IMPORTED TYPES
	import type { Process } from '$types/index';
	// IMPORTED LIB-UTILS
	import _ from 'lodash';
	// IMPORTED STATES
	import { processes, ganttItems } from '$stores/processStates';
	// IMPORTED UTILS
	import { getShortestArrival } from '$utils/helpers';
	import { resetValues, replaceProcess, addGanttItem } from '$stores/processStates';
	// IMPROTED COMPONENTS
	import Template from '$components/modules/Template.svelte';

	const calculate = () => {
		resetValues();
		ganttItems.set([]);
		let currentProcess: Process = getShortestArrival($processes);
		let lastCompletion: number = currentProcess.arrival;
		while ($processes.some((process) => process.remaining)) {
			let matched: Process[] = [];
			let iteration = 0;
			while (currentProcess.remaining) {
				iteration++;
				matched = $processes.filter(
					(process) =>
						process.id !== currentProcess.id &&
						process.remaining &&
						process.arrival <= lastCompletion &&
						process.burst < currentProcess.burst,
				);
				if (matched.length && iteration > 1) break;
				currentProcess.remaining--;
				lastCompletion++;
			}
			currentProcess.completion = lastCompletion;
			currentProcess.turnaround = currentProcess.completion - currentProcess.arrival;
			currentProcess.waiting = currentProcess.turnaround - currentProcess.burst;
			replaceProcess(currentProcess);
			addGanttItem({ id: currentProcess.id, value: lastCompletion });
			if (!matched.length)
				matched = $processes.filter(
					(process) =>
						process.id !== currentProcess.id &&
						process.remaining &&
						process.arrival <= lastCompletion,
				);
			matched = _.orderBy<Process>(matched, ['remaining', 'id'], ['asc', 'asc']);
			currentProcess = matched[0];
			if (!currentProcess) break;
		}
	};
</script>

<Template {...{ title: 'Shortest Remaining Time First 2', icon: 'ti-dice-3', calculate }} />
