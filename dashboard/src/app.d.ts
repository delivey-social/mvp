// See https://svelte.dev/docs/kit/types#app.d.ts

import type { components, paths } from './types/api';

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export enum PaymentMethods {
	Pix = 'PIX',
	CartaoCredito = 'CREDIT_CARD',
	CartaoDebito = 'DEBIT_CARD'
}

export enum OrderStatus {
	WaitingPayment = 'WAITING_PAYMENT',
	Preparing = 'PREPARING',
	ReadyForDelivery = 'READY_FOR_DELIVERY',
	Finished = 'FINISHED'
}

export type Order = components['schemas']['OrderResponseDTO'];

export type Restaurant = components['schemas']['RestaurantDTO'];

export type Neighborhood = components['schemas']['NeighborhoodDTO'];

export {};
