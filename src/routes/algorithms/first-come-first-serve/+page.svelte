<script lang="ts">
	// IMPORTED TYPES
	import type { Process } from '$types/index';
	// IMPORTED LIB-UTILS
	import _ from 'lodash';
	// IMPORTED STATES
	import { processes, ganttItems } from '$stores/processStates';
	// IMPORTED UTILS
	import { replaceProcesses } from '$stores/processStates';
	// IMPROTED COMPONENTS
	import Template from '$components/modules/Template.svelte';

	// UTILS
	const calculate = () => {
		let lastCompletion = 0;
		let calculated: Process[] = _.orderBy<Process>($processes, ['arrival'], ['asc']).map(
			(process) => {
				process.completion = process.burst + lastCompletion;
				process.turnaround = process.completion - process.arrival;
				process.waiting = process.turnaround - process.burst;
				lastCompletion = process.completion;
				return process;
			},
		);
		replaceProcesses(calculated);
		ganttItems.set(
			_.orderBy(
				calculated.map((process) => ({ id: process.id, value: process.completion })),
				['completion'],
				['asc'],
			),
		);
	};
</script>

<Template {...{ title: 'First Come First Serve', icon: 'ti-dice-1', calculate }} />
