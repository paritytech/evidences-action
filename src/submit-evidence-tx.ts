import { ApiPromise, WsProvider } from "@polkadot/api";

import { POLKADOT_APPS_URL, PROVIDER_URL } from "./constants";

const polkadotAppsDecodeURL = (transactionHex: string) => `${POLKADOT_APPS_URL}extrinsics/decode/${transactionHex}`;

export const createSubmitEvidenceTx = async (opts: {
  wish: "Retention" | "Promotion";
  evidenceHash: string;
}): Promise<{ transactionHex: string; transactionCreationUrl: string }> => {
  const api = new ApiPromise({ provider: new WsProvider(PROVIDER_URL) });
  await api.isReadyOrError;

  const submitEvidenceTx = api.tx.fellowshipCore.submitEvidence(opts.wish, opts.evidenceHash);

  const transactionHex: string = submitEvidenceTx.method.toHex();

  await api.disconnect();
  return { transactionHex, transactionCreationUrl: polkadotAppsDecodeURL(transactionHex) };
};
