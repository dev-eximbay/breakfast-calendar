<script lang="ts">
	import { onMount } from 'svelte';

	let { children } = $props();

	onMount(() => {});
</script>

{@render children()}
