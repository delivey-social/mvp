<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import Button from '../ui/button/button.svelte';

	import { Trash } from '@lucide/svelte';
	import { buttonVariants } from '../ui/button';

	const { id }: { id: string } = $props();
</script>

<Dialog.Root>
	<Dialog.Trigger class={buttonVariants({ variant: 'destructive' })}>
		<Trash />
	</Dialog.Trigger>

	<Dialog.Content>
		<form method="POST" action="?/delete">
			<input type="hidden" name="id" value={id} />

			<Dialog.Header>
				<Dialog.Title>Excluir Pedido</Dialog.Title>
				<Dialog.Description
					>Você tem certeza de que deseja excluir o pedido?<br />Essa ação não pode ser desfeita</Dialog.Description
				>
			</Dialog.Header>

			<Dialog.Footer>
				<Dialog.Close class={buttonVariants({ variant: 'outline' })}>Fechar</Dialog.Close>

				<Button variant="destructive" type="submit">Excluir</Button>
			</Dialog.Footer>
		</form>
	</Dialog.Content>
</Dialog.Root>
