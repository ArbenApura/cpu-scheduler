<script lang="ts">
	// IMPORTED UTILS
	import { timeQuantum } from '$stores/processStates';
	// IMPORTED LIB-COMPONENTS
	import { FloatingLabelInput } from 'flowbite-svelte';

	// UTILS
	const handleChange = (event: Event) => {
		// @ts-ignore
		const value = parseInt(event.target.value || '0');
		timeQuantum.set(value);
	};
</script>

<div class="p-[2px] pb-0">
	<div class="bg-white p-2 rounded-t-sm">
		<FloatingLabelInput
			style="filled"
			type="number"
			label="Time Quantum"
			value={$timeQuantum.toString()}
			on:change={handleChange}
		/>
	</div>
</div>
