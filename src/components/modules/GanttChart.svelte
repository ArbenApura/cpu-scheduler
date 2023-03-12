<script lang="ts">
	// IMPORTED TYPES
	import type { Process } from '$types/index';

	// PROPS
	export let processes: Process[];
</script>

<div class="overflow-x-auto overflow-y-hidden">
	<div class="flex">
		{#each processes as process, i}
			<div class="text-xs">
				<div
					class="bg-white w-[40px] h-[40px] border 
						{i + 1 !== processes.length && 'border-r-0'} 
						flex items-center justify-center"
				>
					P{process.id}
				</div>
				<div class="flex">
					<span class="flex-grow">
						{#if i === 0}
							0
						{/if}
					</span>
					<span>{process.completion}</span>
				</div>
			</div>
		{/each}
	</div>
</div>
