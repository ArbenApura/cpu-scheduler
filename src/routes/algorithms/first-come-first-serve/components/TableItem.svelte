<script lang="ts">
	// IMPORTED TYPES
	import type { Process } from '$types/index';
	// IMPORTED LIB-COMPONENTS
	import { Button, Modal, Label, Input, Dropdown, DropdownItem } from 'flowbite-svelte';

	// PROPS
	export let process: Process,
		deleteProcess: (id: string) => void,
		editProcess: (id: string, arrival: number, burst: number) => void;

	// STATES
	let editorModal = {
		isOpen: false,
	};

	// UTILS
	const handleEdit = (event: SubmitEvent) => {
		const form = event.target as HTMLFormElement;
		const arrival = parseInt(form.input_arrival.value);
		const burst = parseInt(form.input_burst.value);
		editProcess(process.id, arrival, burst);
		editorModal.isOpen = false;
	};
</script>

<tr>
	<td>{process.id}</td>
	<td>{process.arrival}</td>
	<td>{process.burst}</td>
	<td>{process.completion}</td>
	<td>{process.turnaround}</td>
	<td>{process.waiting}</td>
	<td class="hover:bg-gray-200 cursor-pointer"><i class="ti ti-dots" /></td>
	<Dropdown>
		<DropdownItem on:click={() => (editorModal.isOpen = true)}>
			<i class="ti ti-ballpen mr-2" />Edit
		</DropdownItem>
		<DropdownItem on:click={() => deleteProcess(process.id)}>
			<i class="ti ti-trash mr-2" />Delete
		</DropdownItem>
	</Dropdown>
</tr>

<Modal bind:open={editorModal.isOpen} size="xs" title="Edit Process" class="w-full text-left">
	<form class="flex flex-col space-y-6" action="#" on:submit|preventDefault={handleEdit}>
		<Label class="space-y-2">
			<span>Arrival Time</span>
			<Input
				name="input_arrival"
				type="number"
				placeholder="Input a number"
				value={process.arrival}
				required
			/>
		</Label>
		<Label class="space-y-2">
			<span>Burst Time</span>
			<Input
				name="input_burst"
				type="number"
				placeholder="Input a number"
				value={process.burst}
				required
			/>
		</Label>
		<Button type="submit" color="primary" class="w-full">Edit</Button>
	</form>
</Modal>
