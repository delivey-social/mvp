<script lang="ts">
	import './layout.css';
	import { Toaster } from '$lib/components/ui/sonner';

	let { children } = $props();
</script>

<div class="app">
	<main>
		<Toaster position="top-center" />

		{@render children()}
	</main>
</div>
