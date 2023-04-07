<script lang="ts">
	// IMPORTED TYPES
	import type { Process } from '$types/index';
	// IMPORTED LIB-UTILS
	import _ from 'lodash';
	// IMPORTED LIB-COMPONENTS
	import { Button, Modal, Label, Input, Radio } from 'flowbite-svelte';

	// PROPS
	export let isModalOpen: boolean,
		processes: Process[],
		setIsAdderModalOpen: (isOpen: boolean) => void,
		addProcess: (id: number, arrival: number, burst: number) => void;

	// STATES
	let mode = 'comma-seperated';
	let error = '';
	let isOpen = false;

	// REACTIVE STATEMENTS
	$: isModalOpen && (isOpen = isModalOpen);
	$: !isOpen && setIsAdderModalOpen(isOpen);

	// UTILS
	const handleSubmit = (event: SubmitEvent) => {
		try {
			const form = event.target as HTMLFormElement;
			const inputs: { id: number; arrival: number; burst: number }[] = [];
			if (mode === 'comma-seperated') {
				const filter = /[^0-9, ]|[0-9]+( +)[0-9]+|^( +,)|(, +)$/g;
				if (form.input_arrival.value.match(filter))
					throw new Error('Invalid value in Arrival Time!');
				const arrivals = form.input_arrival.value
					.split(',')
					.map((v: string) => parseInt(v)) as number[];
				if (form.input_burst.value.match(filter))
					throw new Error('Invalid value in Burst Time!');
				const bursts = form.input_burst.value
					.split(',')
					.map((v: string) => parseInt(v)) as number[];
				if (arrivals.length !== bursts.length)
					throw new Error('The values was not even in length!');
				for (let i = 0; i < arrivals.length; i++) {
					const id = inputs.length + processes.length + 1;
					const arrival = arrivals[i];
					const burst = bursts[i];
					inputs.push({ id, arrival, burst });
				}
			} else {
				const id = parseInt(form.input_id.value);
				const arrival = parseInt(form.input_arrival.value);
				const burst = parseInt(form.input_burst.value);
				inputs.push({ id, arrival, burst });
			}
			inputs.map(({ id, arrival, burst }) => addProcess(id, arrival, burst));
			isOpen = false;
		} catch (err: any) {
			console.log(error);
			error = typeof err === 'object' ? err.message : err;
		}
	};
</script>

<Modal bind:open={isOpen} size="xs" title="Add Process" class="w-full">
	<form class="flex flex-col space-y-3" action="#" on:submit|preventDefault={handleSubmit}>
		<Label class="space-y-2">
			<span>Mode</span>
			<div class="flex gap-4">
				<Radio bind:group={mode} value="comma-seperated" inline>Comma-Seperated</Radio>
				<Radio bind:group={mode} value="manual" inline>Manual</Radio>
			</div>
		</Label>
		{#if mode === 'comma-seperated'}
			<Label class="space-y-2">
				<span>Arrival Time</span>
				<Input
					name="input_arrival"
					type="text"
					placeholder="Input numbers seperated by comma"
					required
				/>
			</Label>
			<Label class="space-y-2">
				<span>Burst Time</span>
				<Input
					name="input_burst"
					type="text"
					placeholder="Input numbers seperated by comma"
					required
				/>
			</Label>
		{:else}
			<Label class="space-y-2">
				<span>ID</span>
				<Input name="input_id" type="text" value={processes.length + 1} readonly disabled />
			</Label>
			<Label class="space-y-2">
				<span>Arrival Time</span>
				<Input name="input_arrival" type="number" placeholder="Input a number" required />
			</Label>
			<Label class="space-y-2">
				<span>Burst Time</span>
				<Input name="input_burst" type="number" placeholder="Input a number" required />
			</Label>
		{/if}
		<p class="text-sm text-red-500 leading-none flex items-center">
			{#if error}
				<i class="ti ti-exclamation-circle text-base mr-1" />{error}
			{/if}
		</p>
		<Button type="submit" color="primary" class="w-full">Add</Button>
	</form>
</Modal>
