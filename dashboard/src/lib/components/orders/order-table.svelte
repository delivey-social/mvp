<script lang="ts">
	import type { Order } from '../../../app';

	import * as Table from '$lib/components/ui/table/index.js';

	import EditModal from './edit-modal.svelte';
	import DeleteModal from './delete-modal.svelte';

	import { toast } from 'svelte-sonner';

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
				<Table.Cell
					class="max-w-10 truncate cursor-pointer"
					onclick={() => {
						navigator.clipboard.writeText(item.id);
						toast.success('id copiado para a área de transferência!');
					}}
					title={item.id}>{item.id}</Table.Cell
				>

				<Table.Cell>{item.status}</Table.Cell>

				<Table.Cell>{item.paymentMethod}</Table.Cell>

				<Table.Cell>{item.totalAmount}</Table.Cell>

				<Table.Cell class="text-end flex gap-2 justify-end">
					<EditModal />

					<DeleteModal />
				</Table.Cell>
			</Table.Row>
		{/each}
	</Table.Body>
</Table.Root>
