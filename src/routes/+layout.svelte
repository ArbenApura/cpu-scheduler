<script lang="ts">
	// IMPORTED STYLES
	import '$styles/tailwind.scss';
	// IMPORTED LIB-UTILS
	import { onMount } from 'svelte';
	// IMPORTED UTILS
	import { initializeStores } from '$stores/index';
	import { windowWidth } from '$stores/mediaStates';

	const handleResize = () => windowWidth.set(window.innerWidth);

	// LIFECYCLES
	onMount(initializeStores);
</script>

<svelte:window on:resize={handleResize} />

<slot />
