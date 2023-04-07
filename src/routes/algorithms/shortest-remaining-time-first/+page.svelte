<script lang="ts">
	// IMPORTED TYPES
	import type { Process, GanttItem } from '$types/index';
	// IMPORTED LIB-UTILS
	import _ from 'lodash';
	// IMPORTED UTILS
	import { getShortestArrival } from '$utils/helpers';
	// IMPROTED COMPONENTS
	import Template from '$components/modules/Template.svelte';

	// UTILS
	const calculate = (processes: Process[]) => {
		let ganttItems: GanttItem[] = [];
		let currentProcess: Process = getShortestArrival(processes);
		let lastCompletion: number = currentProcess.arrival;
		let iteration1 = 0;
		let isLogging = false;
		while (processes.some((process) => process.remaining)) {
			// ITERATION GUARD
			if (iteration1 < 20) iteration1++;
			else {
				if (isLogging) console.log('Iteration 1 error');
				break;
			}
			// ITERATION GUARD

			if (isLogging) {
				console.log('\nLoop 1 - Before');
				console.log('lastCompletion', lastCompletion);
				console.log('currentProcess', JSON.stringify(currentProcess));
				console.log('processes', JSON.stringify(processes));
			}

			let matched: Process[] = [];
			let iteration2 = 0;
			while (currentProcess.remaining) {
				// ITERATION GUARD
				if (iteration2 < 20) iteration2++;
				else {
					if (isLogging) console.log('Iteration 2 error');
					break;
				}
				// ITERATION GUARD

				if (isLogging) console.log('\nLoop 2');

				matched = processes.filter(
					(process) =>
						process.id !== currentProcess.id &&
						process.remaining &&
						process.arrival <= lastCompletion &&
						process.burst < currentProcess.burst,
				);

				if (isLogging) {
					console.log('processes ', JSON.stringify(processes));
					console.log('matched ', JSON.stringify(matched));
				}
				if (matched.length && iteration2 > 1) break;

				currentProcess.remaining--;
				lastCompletion++;

				if (isLogging) {
					console.log('lastCompletion', lastCompletion);
					console.log('currentProcess', JSON.stringify(currentProcess));
				}
			}
			currentProcess.completion = lastCompletion;
			currentProcess.turnaround = currentProcess.completion - currentProcess.arrival;
			currentProcess.waiting = currentProcess.turnaround - currentProcess.burst;

			processes = processes.map((process) =>
				process.id === currentProcess.id ? currentProcess : process,
			);
			ganttItems.push({ id: currentProcess.id, value: lastCompletion });

			if (isLogging) {
				console.log('\nLoop 1 - After');
				console.log('lastCompletion', lastCompletion);
				console.log('oldProcess', JSON.stringify(currentProcess));
				console.log('processes', JSON.stringify(processes));
				console.log('gantt', JSON.stringify(ganttItems));
			}

			if (!matched.length)
				matched = processes.filter(
					(process) =>
						process.id !== currentProcess.id &&
						process.remaining &&
						process.arrival <= lastCompletion,
				);
			matched = _.orderBy<Process>(matched, ['remaining', 'id'], ['asc', 'asc']);
			currentProcess = matched[0];
			if (!currentProcess) {
				if (isLogging) console.log('No process found!');
				break;
			}

			if (isLogging) {
				console.log('matched', JSON.stringify(matched));
				console.log('newProcess', JSON.stringify(currentProcess));
			}
		}
		return { processes, ganttItems };
	};
</script>

<Template {...{ title: 'Shortest Remaining Time First', icon: 'ti-dice-3', calculate }} />
