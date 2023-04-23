<script lang="ts">
	// IMPORTED TYPES
	import type { Process } from '$types/index';
	// IMPORTED LIB-UTILS
	import _ from 'lodash';
	// IMPORTED STATES
	import { processes, ganttItems, timeQuantum } from '$stores/processStates';
	// IMPORTED UTILS
	import { resetValues, replaceProcess, addGanttItem } from '$stores/processStates';
	// IMPROTED COMPONENTS
	import Template from '$components/modules/Template.svelte';

	// UTILS
	const calculate = () => {
		resetValues();
		ganttItems.set([]);
		let lastCompletion = 0;
		while ($processes.some((process) => process.remaining)) {
			const ordered = _.orderBy<Process>($processes, ['arrival'], ['asc']);
			for (const currentProcess of ordered) {
				if (!currentProcess.remaining) continue;
				let deduction =
					currentProcess.remaining >= $timeQuantum
						? $timeQuantum
						: currentProcess.remaining;
				currentProcess.remaining -= deduction;
				lastCompletion += deduction;
				currentProcess.completion = lastCompletion;
				currentProcess.turnaround = currentProcess.completion - currentProcess.arrival;
				currentProcess.waiting = currentProcess.turnaround - currentProcess.burst;
				replaceProcess(currentProcess);
				addGanttItem({ id: currentProcess.id, value: lastCompletion });
			}
		}
	};
</script>

<Template {...{ title: 'Round Robin', icon: 'ti-dice-4', isUsingTimeQuantum: true, calculate }} />
