import configureEmails from "../../config/emails";

import renderEmailFactory from "../../utils/renderEmailFactory";
import humanReadablePaymentMethod from "../../constants/humanReadablePaymentMethod";

import NovoPedidoEmail from "@shared/emails/emails/novo-pedido";
import PedidoEmail from "@shared/emails/emails/pedido";
import EntregaEmail from "@shared/emails/emails/entrega";

import { MenuItemsService } from "../menu-items/service.d";

import { Channel, Event } from "./Events.d";
import { Order } from "../order/types.d";
import { ResourceNotFoundError } from "../../errors/HTTPError";

export class EmailChannel implements Channel {
  private senderEmail = process.env.EMAIL_USER!;
  private deliveryEmail =
    process.env.MODE === "PRODUCTION"
      ? "santocrepecwb@gmail.com"
      : "thiagotolotti@gmail.com";
  private restaurantEmail = this.deliveryEmail;
  private motoboyEmail = "thiagotolotti@gmail.com";
  private transporter = configureEmails();

  constructor(private menuItemsService: MenuItemsService) {}

  [Event.OrderCreated] = async (data: Order) => {
    const email = renderEmailFactory(NovoPedidoEmail);

    const html = await email({
      totalValue: data.totalAmount,
      client: data.user,
      id: data.id,
      date: new Date(),
      buttonUrl: `${process.env.BACKEND_URL!}/orders/confirm_payment?id=${
        data.id
      }`,
    });

    await this.transporter.sendMail({
      from: this.senderEmail,
      to: this.restaurantEmail,
      subject: "Novo pedido recebido",
      html,
    });
  };

  [Event.OrderPaid] = async (data: Order) => {
    const email = renderEmailFactory(PedidoEmail);

    const items = await Promise.all(
      data.items.map(async (item) => {
        const menuItem = await this.menuItemsService.findById(item.id);

        if (!menuItem) {
          throw new ResourceNotFoundError("menu item");
        }

        return {
          id: menuItem.id,
          name: menuItem.name,
          quantity: item.quantity,
          price: menuItem.price,
        };
      }),
    );

    const html = await email({
      items: items.map((i) => ({
        ...i,
        id: i.id.toHexString(),
      })),
      deliveryAddress: data.user.address,
      paymentMethod: humanReadablePaymentMethod[data.paymentMethod],
      appFee: data.appFee,
      deliveryFee: data.deliveryFee,
      buttonURL: `${process.env.BACKEND_URL!}/orders/ready_for_delivery?id=${data.id}`,
    });

    await this.transporter.sendMail({
      subject: `Novo pedido no seu restaurante`,
      from: this.senderEmail,
      to: this.restaurantEmail,
      bcc: this.senderEmail,
      html,
    });
  };

  [Event.OrderReadyForDelivery] = async (data: Order) => {
    const email = renderEmailFactory(EntregaEmail);

    const html = await email({
      clientAddress: data.user.address,
      date: new Date(),
      buttonUrl: `${process.env.BACKEND_URL!}/orders/delivered?id=${data.id}`,
    });

    await this.transporter.sendMail({
      subject: `Oba, tem entrega nova!`,
      from: this.senderEmail,
      to: this.motoboyEmail,
      bcc: this.senderEmail,
      html,
    });
  };
}
