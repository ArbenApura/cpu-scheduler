<script lang="ts">
	// STATES
	const algorithms = [
		{
			icon: 'ti-dice-1',
			title: 'First Come First Serve',
			href: '/algorithms/first-come-first-serve',
			description:
				'Non-Preemptive: A scheduling algorithm where the process that arrives first is executed first, and the next process is executed only after the first process has finished.',
		},
		{
			icon: 'ti-dice-2',
			title: 'Shortest Job First',
			href: '/algorithms/shortest-job-first',
			description:
				'Non-Preemptive: A scheduling algorithm where the job with the shortest CPU burst time is scheduled to run first.',
		},
		{
			icon: 'ti-dice-3',
			title: 'Shortest Remaining Time First',
			href: '/algorithms/shortest-remaining-time-first',
			description:
				'Preemptive: A scheduling algorithm where the process with the shortest estimated remaining processing time is executed next.',
		},
		{
			icon: 'ti-dice-4',
			title: 'Shortest Remaining Time First 2',
			href: '/algorithms/shortest-remaining-time-first-2',
			description:
				'Preemptive: Alternative. A scheduling algorithm where the process with the shortest estimated remaining processing time is executed next.',
		},
	];
	const infos = [
		{
			icon: 'ti-mood-wink',
			content:
				'Welcome to this website which has been designed to showcase various CPU Scheduling algorithms based on the lessons of the IT 208 - Platform Technologies course at Bulacan State University Sarmiento Campus. This website was created by Arben Apura, who was motivated to share his understanding of the different algorithms with others as he learned about them.',
		},
		{
			icon: 'ti-mood-smile',
			content:
				'One of the benefits of this website is that it offers a visual representation of the scheduling process by displaying the table of processes along with its Gantt Chart. This provides users with a clear understanding of how the scheduling algorithm works and how it affects the execution of processes in a computer system.',
		},
		{
			icon: 'ti-mood-wink-2',
			content:
				'We hope this website will be a valuable resource for students, professionals, and anyone interested in learning more about CPU Scheduling algorithms. So, feel free to explore the different algorithms presented here and gain a deeper understanding of their applications and benefits.',
		},
	];
</script>

<div class="flex flex-col gap-8">
	<div>
		<h5 class="mb-2 flex items-center gap-2">
			Algorithms
			<i class="ti ti-code text-sky-500 text-[25px] mb-1" />
		</h5>
		<div class="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
			{#each algorithms as algorithm}
				<a href={algorithm.href} class="bg-white hover:bg-gray-100 border rounded-md">
					<div class="flex items-center gap-4 p-4">
						<div
							class="bg-sky-500 rounded-md w-[40px] h-[40px] flex items-center justify-center"
						>
							<i class="ti {algorithm.icon} text-[30px] text-white" />
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
	</div>
	<div>
		<h5 class="mb-2 flex items-center gap-2">
			About This Website
			<i class="ti ti-app-window text-sky-500 text-[25px] mb-1" />
		</h5>
		<div class="bg-white border rounded-md flex flex-col">
			{#each infos as info, i}
				<div class="flex items-center">
					<div class="p-4 border-r">
						<div
							class="bg-sky-500 rounded-md w-[40px] h-[40px] flex items-center justify-center"
						>
							<i class="ti {info.icon} text-[30px] text-white" />
						</div>
					</div>
					<div class="p-4">
						<p class="text-sm text-gray-700">{info.content}</p>
					</div>
				</div>
				{#if i + 1 !== infos.length}
					<hr />
				{/if}
			{/each}
		</div>
	</div>
</div>
