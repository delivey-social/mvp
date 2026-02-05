// since there's no dynamic data here, we can prerender

import type { PageLoad } from './$types';

// it so that it gets served as a static asset in production
// export const prerender = true;

const ORDERS_API_URL = 'http://localhost:3000/orders';

type Order = {
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
enum PaymentMethods {
	Pix = 'PIX',
	CartaoCredito = 'CREDIT_CARD',
	CartaoDebito = 'DEBIT_CARD'
}

enum OrderStatus {
	WaitingPayment = 'WAITING_PAYMENT',
	Preparing = 'PREPARING',
	ReadyForDelivery = 'READY_FOR_DELIVERY',
	Finished = 'FINISHED'
}

async function loadOrders() {
	const res = await fetch(ORDERS_API_URL);
	const data: Order[] = await res.json();

	return data;
}

export const load: PageLoad = async () => {
	return {
		items: await loadOrders()
	};
};
