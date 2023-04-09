<script lang="ts">
	// IMPORTED STATES
	import { ganttItems } from '$stores/processStates';
</script>

<div class="overflow-x-auto overflow-y-hidden border rounded-md">
	<div class="flex">
		{#each $ganttItems as item, i}
			<div class="text-xs">
				<div
					class="bg-white w-[40px] h-[40px] border 
						{i + 1 !== $ganttItems.length && 'border-r-0'} 
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
