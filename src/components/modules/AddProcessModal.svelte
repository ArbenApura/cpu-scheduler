<script lang="ts">
	// IMPORTED TYPES
	import type { Process } from '$types/index';
	// IMPORTED LIB-UTILS
	import _ from 'lodash';
	// IMPORTED LIB-COMPONENTS
	import { Button, Modal, Label, Input } from 'flowbite-svelte';

	// PROPS
	export let isModalOpen: boolean, processes: Process[], handleAdd: (event: SubmitEvent) => void;
</script>

<Modal bind:open={isModalOpen} size="xs" title="Add Process" class="w-full">
	<form class="flex flex-col space-y-6" action="#" on:submit|preventDefault={handleAdd}>
		<Label class="space-y-2">
			<span>ID</span>
			<Input name="input_id" type="text" value={processes.length} readonly disabled />
		</Label>
		<Label class="space-y-2">
			<span>Arrival Time</span>
			<Input name="input_arrival" type="number" placeholder="Input a number" required />
		</Label>
		<Label class="space-y-2">
			<span>Burst Time</span>
			<Input name="input_burst" type="number" placeholder="Input a number" required />
		</Label>
		<Button type="submit" color="primary" class="w-full">Add</Button>
	</form>
</Modal>
