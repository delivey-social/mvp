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

export type Order = {
	id: string;
	items: OrderItem[];
	user: OrderUser;
	observation?: string;
	status: OrderStatus;
	paymentMethod: PaymentMethods;
	appFee: number;
	itemsTotal: number;
	deliveryFee: number;
	totalAmount: number;
};

type OrderItem = {
	id: string;
	quantity: number;
	priceSnapshot: number;
};
type OrderUser = {
	email: string;
	phoneNumber: string;
	address: string;
};

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

export type Restaurant = components['schemas']['RestaurantDTO'];

export type Neighborhood = components['schemas']['NeighborhoodDTO'];

export {};
