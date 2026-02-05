<script lang="ts">
	import './layout.css';

	import { Toaster } from '$lib/components/ui/sonner';

	import * as Sidebar from '$lib/components/ui/sidebar';
	import AppSidebar from '$lib/components/layout/app-sidebar/app-sidebar.svelte';

	let { children } = $props();
</script>

<Sidebar.Provider class="w-full">
	<Toaster position="top-center" />

	<AppSidebar />

	<main class="w-full">
		<Sidebar.Trigger />

		{@render children()}
	</main>
</Sidebar.Provider>
