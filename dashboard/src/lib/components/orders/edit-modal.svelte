<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import * as Select from '$lib/components/ui/select';

	import { Pencil } from '@lucide/svelte';
	import { buttonVariants } from '../ui/button';

	import Button from '../ui/button/button.svelte';
	import Label from '../ui/label/label.svelte';
	import Input from '../ui/input/input.svelte';
	import { OrderStatus, PaymentMethods } from '../../../app.d';

	let status = $state<OrderStatus | null>(null);
	const statusTriggerContent = $derived(status === null ? 'Selecione um status' : status);

	let paymentMethod = $state<PaymentMethods | null>(null);
	const paymentMethodTriggerContent = $derived(
		paymentMethod === null ? 'Forma de pagamento' : paymentMethod
	);
</script>

<Dialog.Root>
	<Dialog.Trigger class={buttonVariants({ variant: 'outline' })}>
		<Pencil />
	</Dialog.Trigger>

	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>Editar Pedido</Dialog.Title>
			<Dialog.Description>Atualize as informações do pedido aqui</Dialog.Description>
		</Dialog.Header>

		<form class="grid gap-6">
			<div class="grid gap-3">
				<Label>Usuário</Label>

				<div class="grid grid-cols-2 gap-4">
					<Input type="email" placeholder="Email" />
					<Input type="text" placeholder="Telefone" />
				</div>

				<Input type="text" placeholder="Endereço" />
			</div>

			<div class="grid grid-cols-2">
				<div class="grid gap-3">
					<Label>Status</Label>

					<Select.Root
						type="single"
						value={status ?? undefined}
						onValueChange={(value) => (status = value as OrderStatus)}
					>
						<Select.Trigger>{statusTriggerContent}</Select.Trigger>
						<Select.Content>
							<Select.Label>Status</Select.Label>
							{#each Object.entries(OrderStatus) as [key, status]}
								<Select.Item value={status}>{key}</Select.Item>
							{/each}
						</Select.Content>
					</Select.Root>
				</div>

				<div class="grid gap-3">
					<Label>Forma de pagamento</Label>

					<Select.Root
						type="single"
						value={paymentMethod ?? undefined}
						onValueChange={(value) => (paymentMethod = value as PaymentMethods)}
					>
						<Select.Trigger>{paymentMethodTriggerContent}</Select.Trigger>

						<Select.Content>
							<Select.Label>Método de pagamento</Select.Label>
							{#each Object.entries(PaymentMethods) as [key, method]}
								<Select.Item value={method}>{key}</Select.Item>
							{/each}
						</Select.Content>
					</Select.Root>
				</div>
			</div>

			<div class="grid gap-3">
				<Label>Valores</Label>

				<Input type="text" placeholder="Total dos itens" readonly />
				<Input type="text" placeholder="Taxa de entrega" />
				<Input type="text" placeholder="Taxa do aplicativo" />
				<Input type="text" placeholder="Valor total" readonly />
			</div>
		</form>

		<Dialog.Footer>
			<Dialog.Close class={buttonVariants({ variant: 'outline' })}>Fechar</Dialog.Close>
			<Button>Editar</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
