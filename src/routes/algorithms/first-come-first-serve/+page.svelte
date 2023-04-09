<script lang="ts">
	// IMPORTED TYPES
	import type { Process } from '$types/index';
	// IMPORTED LIB-UTILS
	import _ from 'lodash';
	// IMPORTED STATES
	import { processes, ganttItems } from '$stores/processStates';
	// IMPORTED UTILS
	import { replaceProcesses, addGanttItem, incrementLastGanttItem } from '$stores/processStates';
	// IMPROTED COMPONENTS
	import Template from '$components/modules/Template.svelte';

	// UTILS
	const calculate = () => {
		ganttItems.set([]);
		let calculated: Process[] = [];
		let lastCompletion = 0;
		let isIdle = false;
		while (!$processes.every((process) => calculated.includes(process))) {
			let matched: Process[] = $processes.filter(
				(process) => !calculated.includes(process) && process.arrival <= lastCompletion,
			);
			matched = _.orderBy<Process>(matched, ['arrival'], ['asc']);
			if (matched.length) {
				isIdle = false;
				let currentProcess = matched[0];
				lastCompletion += currentProcess.burst;
				currentProcess.completion = lastCompletion;
				currentProcess.turnaround = currentProcess.completion - currentProcess.arrival;
				currentProcess.waiting = currentProcess.turnaround - currentProcess.burst;
				calculated.push(currentProcess);
				addGanttItem({ id: currentProcess.id, value: lastCompletion });
			} else {
				lastCompletion++;
				if (isIdle) incrementLastGanttItem();
				else addGanttItem({ id: 0, value: lastCompletion });
				isIdle = true;
			}
		}
		replaceProcesses(calculated);
	};
</script>

<Template {...{ title: 'First Come First Serve', icon: 'ti-dice-1', calculate }} />
