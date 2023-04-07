<script lang="ts">
	// IMPORTED TYPES
	import type { GanttItem } from '$types/index';

	// PROPS
	export let items: GanttItem[];
</script>

<div class="overflow-x-auto overflow-y-hidden">
	<div class="flex">
		{#each items as item, i}
			<div class="text-xs">
				<div
					class="bg-white w-[40px] h-[40px] border 
						{i + 1 !== items.length && 'border-r-0'} 
						flex items-center justify-center"
				>
					P{item.id}
				</div>
				<div class="flex">
					<span class="flex-grow">
						{#if i === 0}
							0
						{/if}
					</span>
					<span>{item.value}</span>
				</div>
			</div>
		{/each}
	</div>
</div>
