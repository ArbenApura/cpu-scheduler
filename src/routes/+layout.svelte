<script lang="ts">
	// IMPORTED STYLES
	import '$styles/libs/index.scss';
	// IMPORTED LIB-UTILS
	import { onMount } from 'svelte';
	import { navigating } from '$app/stores';
	import NProgress from 'nprogress';
	// IMPORTED UTILS
	import { initializeStores } from '$stores/index';
	import { windowWidth } from '$stores/mediaStates';
	// IMPORTED COMPONENTS
	import Header from '$components/layouts/Header.svelte';
	import Footer from '$components/layouts/Footer.svelte';

	// PROPS
	export const srr = false,
		prerender = true;

	// REACTIVE STATEMENTS
	$: if ($navigating) NProgress.start();
	else NProgress.done();

	// UTILS
	const handleResize = () => windowWidth.set(window.innerWidth);

	// LIFECYCLES
	onMount(() => {
		initializeStores();
		// REMOVE LOADER
		const loaderEl = document.querySelector('.loader');
		if (loaderEl) loaderEl.remove();
	});
</script>

<svelte:window on:resize={handleResize} />

<main>
	<Header />
	<div class="min-h-[calc(100vh-(60px+88px))] p-4">
		<slot />
	</div>
	<Footer />
</main>

<style lang="scss">
	main {
		@apply w-full max-w-[1536px] mx-auto;
	}
</style>
