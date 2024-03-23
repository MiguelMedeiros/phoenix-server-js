export interface PhoenixConfig {
  token: string;
  host?: string;
}

export interface Channel {
  // state: string;
  // channelId: string;
  // balanceSat: number;
  // inboundLiquiditySat: number;
  // capacitySat: number;
  // fundingTxId: string;
}

export interface NodeInfo {
  nodeId: string;
  channels: Channel[];
  chain: string;
  version: string;
}

export interface Balance {
  balanceSat: number;
  feeCreditSat: number;
}

export interface Invoice {
  amountSat: number;
  paymentHash: string;
  serialized: string;
}

export interface PaymentInfo {
  paymentHash: string;
  preimage: string;
  externalId: null | string;
  description: string;
  invoice: string;
  isPaid: boolean;
  receivedSat: number;
  fees: number;
  completedAt: null | number;
  createdAt: number;
}

export interface PaymentInfoOutgoing {
  paymentHash: string;
  preimage: string;
  isPaid: boolean;
  sent: number;
  fees: number;
  invoice: string;
  completedAt: number;
  createdAt: number;
}

export interface LocalParams {
  nodeId: string;
  fundingKeyPath: string;
  dustLimit: number;
  maxHtlcValueInFlightMsat: number;
  htlcMinimum: number;
  toSelfDelay: number;
  maxAcceptedHtlcs: number;
  isInitiator: boolean;
}

export interface RemoteParams {
  nodeId: string;
  dustLimit: number;
  maxHtlcValueInFlightMsat: number;
  htlcMinimum: number;
}

export interface Commitments {
  params: {
    channelId: string;
    channelConfig: string[];
    channelFeatures: string[];
    localParams: LocalParams;
    remoteParams: RemoteParams;
    channelFlags: number;
  };
}

export interface ChannelUpdate {
  signature: string;
  chainHash: string;
  shortChannelId: string;
  timestampSeconds: number;
  messageFlags: number;
  channelFlags: number;
  cltvExpiryDelta: number;
  htlcMinimumMsat: number;
  feeBaseMsat: number;
  feeProportionalMillionths: number;
  htlcMaximumMsat: number;
}

export interface ChannelState {
  type: string;
  commitments: Commitments;
  shortChannelId: string;
  channelUpdate: ChannelUpdate;
}

export type ChannelStates = ChannelState[];

export interface CloseChannelResponse {
  status: "ok" | "error";
  message?: string;
}

export interface PayInvoiceResponse {
  recipientAmountSat: number;
  routingFeeSat: number;
  paymentId: string;
  paymentHash: string;
  paymentPreimage: string;
}
