<script lang="ts">
	// IMPORTED TYPES
	import type { Process } from '$types/index';
	// IMPROTED COMPONENTS
	import TableItem from './TableItem.svelte';

	// PROPS
	export let processes: Process[],
		deleteProcess: (id: number) => void,
		editProcess: (id: number, arrival: number, burst: number) => void;
</script>

<div class="overflow-x-auto">
	<div class="min-w-[500px]">
		<table class="w-full border-collapse text-center">
			<thead class="bg-white">
				<tr>
					<th>ID</th>
					<th>Arrival Time</th>
					<th>Burst Time</th>
					<th>Completion Time</th>
					<th>Turn Around Time</th>
					<th>Waiting Time</th>
					<th><i class="ti ti-tools" /></th>
				</tr>
			</thead>
			<tbody>
				{#each processes.sort((a, b) => a.id - b.id) as process}
					<TableItem {...{ process, deleteProcess, editProcess }} />
				{/each}
				{#if processes.length === 0}
					<td />
					<td />
					<td />
					<td>Empty</td>
					<td />
					<td />
					<td />
				{/if}
			</tbody>
		</table>
	</div>
</div>

<style lang="scss">
	@import '$styles';
	:global(td),
	:global(th) {
		@apply text-sm leading-none border px-2 py-4 select-text;
		@include screen-only('xs') {
			@apply text-[10px];
		}
	}
</style>
