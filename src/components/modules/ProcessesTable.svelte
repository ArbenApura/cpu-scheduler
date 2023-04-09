<script lang="ts">
	// IMPORTED STATES
	import { processes } from '$stores/processStates';
	// IMPROTED COMPONENTS
	import TableItem from './TableItem.svelte';
</script>

<div class="overflow-x-auto border rounded-md">
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
					<th>Tools</th>
				</tr>
			</thead>
			<tbody class="bg-gray-100">
				{#each $processes.sort((a, b) => a.id - b.id) as process}
					<TableItem {...{ process }} />
				{/each}
				{#if $processes.length === 0}
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
		@apply text-xs leading-none border px-2 py-4 select-text;
		@include screen-only('xs') {
			@apply text-[10px];
		}
	}
</style>
