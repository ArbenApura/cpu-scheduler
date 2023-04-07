<script lang="ts">
	// IMPORTED TYPES
	import type { Process } from '$types/index';
	// IMPORTED LIB-UTILS
	import _ from 'lodash';
	// IMPROTED COMPONENTS
	import Template from '$components/modules/Template.svelte';

	// UTILS
	const calculate = (data: Process[]) => {
		let lastCompletion = 0;
		let processes: Process[] = _.orderBy<Process>(data, ['arrival'], ['asc']).map((process) => {
			process.completion = process.burst + lastCompletion;
			process.turnaround = process.completion - process.arrival;
			process.waiting = process.turnaround - process.burst;
			lastCompletion = process.completion;
			return process;
		});
		let ganttItems = _.orderBy(
			processes.map((process) => ({ id: process.id, value: process.completion })),
			['completion'],
			['asc'],
		);
		return { processes, ganttItems };
	};
</script>

<Template {...{ title: 'First Come First Serve', icon: 'ti-dice-1', calculate }} />
