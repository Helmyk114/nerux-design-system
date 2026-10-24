export * from "./generated/types";

import type { Theme, TokenName } from "./generated/types";

export type TokenValue = string;

export type TokenRegistry = Record<string, TokenValue>;

export type TokenGetter = (token: TokenName, theme?: Theme) => TokenValue;
