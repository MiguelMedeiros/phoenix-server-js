[![npm version](https://img.shields.io/npm/v/phoenix-server-js.svg?style=flat-square)](https://www.npmjs.com/package/phoenix-server-js)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](./LICENSE)
[![downloads](https://img.shields.io/npm/dw/phoenix-server-js?style=flat-square)](https://www.npmjs.com/package/phoenix-server-js)
[![follow me](https://img.shields.io/badge/follow_me-on_Github-black?style=flat-square)](https://github.com/miguelmedeiros)

# Phoenix-Server-JS

Phoenix-Server-JS is a streamlined TypeScript/JavaScript library for seamless Lightning Network integration, inspired by the simplicity and power of PhoenixWallet for servers. It offers self-custodial, zero-configuration setup with lightweight binaries, automated liquidity, and an easy HTTP API. Designed for real-time node, channel, and payment management, Phoenix-Server-JS combines promise-based and WebSocket interfaces for developer convenience and efficiency.

## 🚀 Features

- **Node management:** Retrieve node information, balance, and list channels.
- **Channel management:** Open, close, and list Lightning Network channels.
- **Payments:** Send and receive Lightning payments, manage invoices, and on-chain payments.
- **Real-time notifications:** Utilize WebSockets for live updates on payments and channel events.

## 📋 Prerequisites

Before you can utilize the phoenix-server-js library effectively, you must have the Phoenix server daemon (phoenixd) running in your environment.

Follow these steps to download, unzip, and run phoenixd: [https://phoenix.acinq.co/server/get-started](https://phoenix.acinq.co/server/get-started)

## 💾 Installation

Install Phoenix-JS using npm:

```bash
npm install phoenix-server-js
```

Or using yarn:

```bash
yarn add phoenix-server-js
```

## 📖 Usage

Here's how to get started with Phoenix-JS:

```js
import Phoenix from "phoenix-server-js";

const start = async () => {
  const phoenix = new Phoenix({
    token: "your_api_token_here",
    host: "http://127.0.0.1:9740",
  });

  // Node Management examples
  const nodeInfo = await phoenix.getNodeInfo();
  console.log(nodeInfo);

  const balance = await phoenix.getBalance();
  console.log(balance);

  // Channel Management
  const channels = await phoenix.listChannels();
  console.log(channels);

  const closeChannel = await phoenix.closeChannel({
    channelId: "123",
    address: "your_btc_address",
    feerateSatByte: 1,
  });
  console.log(closeChannel);

  // Real-time Notifications
  const websocket = phoenix.websocket();

  // Payments
  const invoice = await phoenix.receiveLightningPayment({
    amountSat: 1001,
    description: "test invoice",
  });
  console.log(invoice);

  const lnInvoice = await phoenix.sendLightningInvoice({
    amountSat: 1,
    invoice: "your_invoice_here",
  });
  console.log(lnInvoice);

  // On-chain Payments
  const txId = await phoenix.sendOnchainPayment({
    amountSat: 100000,
    address: "your_btc_address_here",
    feerateSatByte: 12,
  });
  console.log(txId);
};

start();
```

## 📚 Documentation

For more detailed information about the available methods and their parameters, please refer to the [https://phoenix.acinq.co/server](https://phoenix.acinq.co/server).

## 👥 Contributing

Contributions are welcome! Please feel free to submit pull requests, report issues, or suggest new features.

## 📜 License

This project is licensed under the [MIT LICENSE](./LICENSE).
