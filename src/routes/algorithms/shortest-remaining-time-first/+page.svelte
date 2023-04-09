<script lang="ts">
	// IMPORTED TYPES
	import type { Process } from '$types/index';
	// IMPORTED LIB-UTILS
	import _ from 'lodash';
	// IMPORTED STATES
	import { processes, ganttItems } from '$stores/processStates';
	// IMPORTED UTILS
	import {
		resetValues,
		replaceProcess,
		addGanttItem,
		incrementLastGanttItem,
	} from '$stores/processStates';
	// IMPROTED COMPONENTS
	import Template from '$components/modules/Template.svelte';

	// UTILS
	const calculate = () => {
		resetValues();
		ganttItems.set([]);
		let currentProcess: Process;
		let lastCompletion = 0;
		let isIdle = false;
		while ($processes.some((process) => process.remaining)) {
			let matched = $processes.filter(
				(process) =>
					(currentProcess ? process.id !== currentProcess.id : true) &&
					process.remaining &&
					process.arrival <= lastCompletion,
			);
			matched = _.orderBy<Process>(matched, ['remaining', 'id'], ['asc', 'asc']);
			if (matched.length) {
				isIdle = false;
				let currentProcess = matched[0];
				let iteration = 0;
				while (currentProcess.remaining) {
					iteration++;
					matched = $processes.filter(
						(process) =>
							process.id !== currentProcess.id &&
							process.remaining &&
							process.arrival <= lastCompletion &&
							process.remaining < currentProcess.remaining,
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
			} else {
				lastCompletion++;
				if (isIdle) incrementLastGanttItem();
				else addGanttItem({ id: 0, value: lastCompletion });
				isIdle = true;
			}
		}
	};
</script>

<Template {...{ title: 'Shortest Remaining Time First', icon: 'ti-dice-3', calculate }} />
