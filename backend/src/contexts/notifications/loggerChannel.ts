import { Channel, Event } from "./Events";

const loggerChannel: Channel = {
  [Event.OrderCreated]: (data) => {
    console.log("Order Created Event:", data);
  },
  [Event.OrderPaid]: (data) => {
    console.log("Order Paid Event:", data);
  },
  [Event.OrderReadyForDelivery]: (data) => {
    console.log("Order Ready For Delivery Event:", data);
  },
  [Event.OrderFinished]: (data) => {
    console.log("Order Finished Event:", data);
  },
};

export default loggerChannel;
