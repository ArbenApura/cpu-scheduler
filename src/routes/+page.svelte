<script lang="ts">
	// STATES
	const algorithms = [
		{
			title: 'First Come First Serve',
			href: '/algorithms/first-come-first-serve',
			description:
				'A scheduling algorithm where the process that arrives first is executed first, and the next process is executed only after the first process has finished.',
		},
		{
			title: 'Shortest Job First',
			href: '/algorithms/shortest-job-first',
			description:
				'A scheduling algorithm where the job with the shortest CPU burst time is scheduled to run first.',
		},
	];
</script>

<h5 class="mb-2">
	Algorithms
	<i class="ti ti-affiliate text-sky-500" />
</h5>
<div class="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
	{#each algorithms as algorithm}
		<a href={algorithm.href} class="bg-white hover:bg-gray-100 border rounded-md">
			<div class="flex items-center gap-4 p-4">
				<div
					class="bg-sky-500 rounded-md w-[40px] h-[40px] flex items-center justify-center"
				>
					<i class="ti ti-table-alias text-[30px] text-white" />
				</div>
				<h6>{algorithm.title}</h6>
			</div>
			<hr />
			<div class="p-4">
				<p class="text-xs text-gray-500">{algorithm.description}</p>
			</div>
		</a>
	{/each}
</div>
