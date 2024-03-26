import Phoenix from "../src/index";

const start = async () => {
  const phoenix = new Phoenix({
    username: "phoenix", // optional
    token: "your_token_goes_here",
    host: "http://127.0.0.1:9740", // optional
  });

  // Node Management examples

  const nodeInfo = await phoenix.getNodeInfo();
  console.log(nodeInfo);

  const balance = await phoenix.getBalance();
  console.log(balance);

  const channels = await phoenix.listChannels();
  console.log(channels);

  const closeChannel = await phoenix.closeChannel({
    channelId: "123",
    address: "",
    feerateSatByte: 1,
  });
  console.log(closeChannel);

  // Notification examples

  const websocket = phoenix.websocket();

  // Payments examples

  const invoice = await phoenix.receiveLightningPayment({
    amountSat: 1001,
    description: "test invoice",
  });
  console.log(invoice);

  const lnInvoice = await phoenix.sendLightningInvoice({
    amountSat: 1,
    invoice: "bolt11_invoice_goes_here",
  });
  console.log(lnInvoice);

  const txId = await phoenix.sendOnchainPayment({
    amountSat: 100000,
    address: "bitcoin_address_goes_here",
    feerateSatByte: 12,
  });

  console.log(txId);

  const incomingPayment = await phoenix.getIncomingPayment({
    paymentHash: invoice?.paymentHash || "",
  });

  console.log(incomingPayment);

  const incomingPayments = await phoenix.listIncomingPayments({
    externalId: "foobar",
  });
  console.log(incomingPayments);
};

start();
