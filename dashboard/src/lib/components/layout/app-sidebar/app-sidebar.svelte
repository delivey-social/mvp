<script lang="ts">
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import BankNoteIcon from '@lucide/svelte/icons/banknote';
	import BuildingIcon from '@lucide/svelte/icons/building';
	import ChefHatIcon from '@lucide/svelte/icons/chef-hat';

	// Menu items.
	const items = [
		{
			title: 'Pedidos',
			url: '/',
			icon: BankNoteIcon
		},
		{
			title: 'Bairros',
			url: '/bairros',
			icon: BuildingIcon
		},
		{
			title: 'Restaurantes',
			url: '/restaurantes',
			icon: ChefHatIcon
		}
	];
</script>

<Sidebar.Root>
	<Sidebar.Content>
		<Sidebar.Group>
			<Sidebar.GroupLabel>Dashboard</Sidebar.GroupLabel>

			<Sidebar.GroupContent>
				<Sidebar.Menu class="list-none m-0">
					{#each items as item (item.title)}
						<Sidebar.MenuItem>
							<Sidebar.MenuButton>
								{#snippet child({ props })}
									<a href={item.url} {...props}>
										<item.icon />
										<span>{item.title}</span>
									</a>
								{/snippet}
							</Sidebar.MenuButton>
						</Sidebar.MenuItem>
					{/each}
				</Sidebar.Menu>
			</Sidebar.GroupContent>
		</Sidebar.Group>
	</Sidebar.Content>
</Sidebar.Root>
