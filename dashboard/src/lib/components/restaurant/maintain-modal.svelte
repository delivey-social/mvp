<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';

	import Button from '../ui/button/button.svelte';
	import Input from '../ui/input/input.svelte';
	import Label from '../ui/label/label.svelte';

	import { buttonVariants } from '../ui/button';
</script>

<Dialog.Root>
	<Dialog.Trigger class={buttonVariants({ variant: 'default' })}>Criar restaurante</Dialog.Trigger>

	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>Criar restaurante</Dialog.Title>
			<Dialog.Description>Crie um novo restaurante</Dialog.Description>
		</Dialog.Header>

		<form class="grid gap-6" method="POST">
			<div class="grid gap-3">
				<Label>Nome</Label>
				<Input type="text" placeholder="Nome do restaurante" name="name" />
			</div>

			<div class="grid gap-3">
				<Label>Endereço</Label>
				<Input type="text" placeholder="Endereço do restaurante" name="address" />
			</div>

			<Dialog.Footer>
				<Dialog.Close class={buttonVariants({ variant: 'outline' })}>Fechar</Dialog.Close>
				<Button type="submit">Criar</Button>
			</Dialog.Footer>
		</form>
	</Dialog.Content>
</Dialog.Root>
