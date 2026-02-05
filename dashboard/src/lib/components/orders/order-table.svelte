<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Table from '$lib/components/ui/table/index.js';

	import { Pencil, Trash } from '@lucide/svelte';
	import type { Order } from '../../../app';

	const { items }: { items: Order[] } = $props();
</script>

<Table.Root>
	<Table.Caption>Pedidos recentes realizados no comida.app.</Table.Caption>
	<Table.Header>
		<Table.Row>
			<Table.Head class="w-25">id</Table.Head>

			<Table.Head>Status</Table.Head>

			<Table.Head>Forma de pagamento</Table.Head>

			<Table.Head class="text-end">Valor total</Table.Head>

			<Table.Head class="text-end">Ações</Table.Head>
		</Table.Row>
	</Table.Header>

	<Table.Body>
		{#each items as item}
			<Table.Row>
				<Table.Cell>{item.id}</Table.Cell>

				<Table.Cell>{item.status}</Table.Cell>

				<Table.Cell>{item.paymentMethod}</Table.Cell>

				<Table.Cell>{item.totalAmount}</Table.Cell>

				<Table.Cell class="text-end flex gap-2 justify-end">
					<Button variant="outline">
						<Pencil />
					</Button>
					<Button variant="destructive">
						<Trash />
					</Button>
				</Table.Cell>
			</Table.Row>
		{/each}
	</Table.Body>
</Table.Root>
