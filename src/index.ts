import axios from "axios";
import WebSocket from "ws";

import {
  Balance,
  ChannelStates,
  CloseChannelResponse,
  Invoice,
  NodeInfo,
  PayInvoiceResponse,
  PaymentInfo,
  PaymentInfoOutgoing,
  PhoenixConfig
} from "./types";

class Phoenix {
  private _http;
  private _username;
  private _token;
  private _host;

  constructor({ token, host ="http://127.0.0.1:9740", username = "phoenix" }: PhoenixConfig) {
    this._username = username;
    this._token = token;
    this._host = host;

    this._http = axios.create({
      baseURL: this._host,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      auth: {
        username: this._username,
        password: this._host,
      },
    });
  }

  // Payments

  async receiveLightningPayment({
    description,
    amountSat,
    externalId = "",
  }: {
    description: string;
    amountSat: number;
    externalId?: string;
  }): Promise<Invoice | null> {
    try {
      const data = {
        description,
        amountSat,
        externalId,
      };
      const response = await this._http.post("/createinvoice", data);
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async sendLightningInvoice(params: {
    amountSat?: number;
    invoice: string;
  }): Promise<PayInvoiceResponse> {
    try {
      const response = await this._http.post(
        "/payinvoice",
        new URLSearchParams(params as any)
      );
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async sendOnchainPayment(params: {
    amountSat: number;
    address: string;
    feerateSatByte: number;
  }): Promise<string> {
    try {
      const response = await this._http.post(
        "/sendtoaddress",
        new URLSearchParams(params as any)
      );
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async listIncomingPayments({
    externalId,
  }: {
    externalId: string;
  }): Promise<PaymentInfo[] | null> {
    try {
      const response = await this._http.get(
        `/payments/incoming?externalId=${externalId}`
      );
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async getIncomingPayment({
    paymentHash,
  }: {
    paymentHash: string;
  }): Promise<PaymentInfo | null> {
    try {
      const response = await this._http.get(
        `/payments/incoming/${paymentHash}`
      );
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async getOutgoingPayment({
    paymentId,
  }: {
    paymentId: string;
  }): Promise<PaymentInfoOutgoing | null> {
    try {
      const response = await this._http.get(`/payments/outgoing/${paymentId}`);
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  // Notifications

  websocket(): WebSocket {
    // remove http:// or https:// from this._host
    const wsHost = this._host.replace(/(^\w+:|^)\/\//, "");
    const tokenBase64 = Buffer.from(`:${this._token}`).toString("base64");

    const ws = new WebSocket(`ws://${wsHost}/websocket`, {
      headers: {
        Authorization: `Basic ${tokenBase64}`,
      },
    });

    ws.on("open", function open() {
      console.log("Connected to payments websocket");
    });

    ws.on("message", function incoming(data: any) {
      const payment = JSON.parse(data.toString());
      console.log("Received payment:", payment);
    });

    ws.on("close", function close() {
      console.log("Disconnected from payments websocket");
    });

    ws.on("error", function error(err: any) {
      console.error("WebSocket error:", err);
    });

    return ws;
  }

  // Node Management

  async getNodeInfo(): Promise<NodeInfo | null> {
    try {
      const response = await this._http.get("/getinfo");
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async getBalance(): Promise<Balance | null> {
    try {
      const response = await this._http.get("/getbalance");
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async listChannels(): Promise<ChannelStates | null> {
    try {
      const response = await this._http.get("/listchannels");
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async closeChannel({
    channelId,
    address,
    feerateSatByte,
  }: {
    channelId: string;
    address: string;
    feerateSatByte: number;
  }): Promise<CloseChannelResponse | null> {
    try {
      const params = new URLSearchParams();
      params.append("channelId", channelId);
      params.append("address", address);
      params.append("feerateSatByte", feerateSatByte.toString());

      const response = await this._http.post(
        "/closechannel",
        params.toString()
      );
      if (response.data === "ok") {
        return { status: "ok" };
      } else {
        console.error(response.data);
        return { status: "error", message: "Unexpected response" };
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}

export default Phoenix;
