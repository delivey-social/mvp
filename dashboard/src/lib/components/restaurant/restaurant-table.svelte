<script lang="ts">
	import type { Restaurant } from '../../../app';

	import * as Table from '$lib/components/ui/table/index.js';

	import { toast } from 'svelte-sonner';

	const { items }: { items: Restaurant[] } = $props();
</script>

<Table.Root>
	<Table.Caption>Restaurantes cadastrados no comida.app.</Table.Caption>
	<Table.Header>
		<Table.Row>
			<Table.Head>id</Table.Head>

			<Table.Head>Nome</Table.Head>

			<Table.Head>Status</Table.Head>

			<Table.Head>Endereço</Table.Head>

			<Table.Head class="text-end">Ações</Table.Head>
		</Table.Row>
	</Table.Header>

	<Table.Body>
		{#each items as item}
			<Table.Row>
				<Table.Cell
					class="max-w-10 truncate cursor-pointer"
					onclick={() => {
						navigator.clipboard.writeText(item.id);
						toast.success('id copiado para a área de transferência!');
					}}
					title={item.id}>{item.id}</Table.Cell
				>

				<Table.Cell>{item.name}</Table.Cell>

				<Table.Cell>Ativo</Table.Cell>

				<Table.Cell>{item.address}</Table.Cell>

				<Table.Cell></Table.Cell>
			</Table.Row>
		{/each}
	</Table.Body>
</Table.Root>
