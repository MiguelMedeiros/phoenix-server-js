import Phoenix from "../src/index";

const start = async () => {
  const phoenix = new Phoenix({
    token: "your_token_goes_here",
    host: "http://127.0.0.1:9740",
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
    invoice:
      "lnbc10n1pjluy52pp5t9qcmduac696laqkcqe2fjzl7dtnf89lmsfwtj90fhzujara9sqqdqgw3jhxar9cqzzsxqyz5vqsp5nacazz94e3l6qvcru2mggajzntry6mflwqz90hyj2c7hld202ggq9qyyssqgnxf4tvgd2yessfq5a9n8ndfyrs8ymutwzur26x9dcd8sznrx70hm9s6dg23h0cln9pzkehtrxkrswmewwj3jn8plksr9udpth5p9ncqmfzsmn",
  });
  console.log(lnInvoice);

  const txId = await phoenix.sendOnchainPayment({
    amountSat: 100000,
    address: "tb1qwnp38xc5qh35ch9l5p6a3r7kwupj9rw5a4jn3y",
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
