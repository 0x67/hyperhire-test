import type { ColumnType } from "kysely";
export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;
export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export type Alert = {
    id: Generated<string>;
    email: string;
};
export type AlertSettings = {
    id: Generated<string>;
    tokenId: string;
    alertId: string;
    threshold: string;
    createdAt: Generated<Timestamp>;
    updatedAt: Generated<Timestamp>;
};
export type FeatureFlag = {
    id: Generated<string>;
    name: string;
    description: string | null;
    active: Generated<boolean>;
    activeRegions: unknown | null;
    activeFrom: Timestamp | null;
    activeUntil: Timestamp | null;
    createdAt: Generated<Timestamp>;
    updatedAt: Generated<Timestamp>;
};
export type Token = {
    id: Generated<string>;
    address: string;
    name: string;
    chainId: number;
    symbol: string;
    decimals: number;
    createdAt: Generated<Timestamp>;
    updatedAt: Generated<Timestamp>;
};
export type TokenPrice = {
    id: Generated<string>;
    price: string;
    blockNumber: string;
    timestamp: Timestamp;
    createdAt: Generated<Timestamp>;
    updatedAt: Generated<Timestamp>;
    tokenId: string;
};
export type DB = {
    alertSettings: AlertSettings;
    alerts: Alert;
    featureFlags: FeatureFlag;
    tokenPrices: TokenPrice;
    tokens: Token;
};
