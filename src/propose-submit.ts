import { parseEvidence } from "./parse-evidence";
import { createSubmitEvidenceTx } from "./submit-evidence-tx";
import { RequestResult, RequestState } from "./types";
import { extractCommitHash } from "./util";

export const handleProposeSubmitCommand = async (requestState: RequestState): Promise<RequestResult> => {
  const parseEvidenceResult = await parseEvidence(requestState);
  if ("success" in parseEvidenceResult) {
    return parseEvidenceResult;
  }

  const { transactionCreationUrl: promotionTxCreationUrl } = await createSubmitEvidenceTx({
    wish: "Promotion",
    evidenceHash: parseEvidenceResult.evidenceHash,
  });

  const { transactionCreationUrl: retentionTxCreationUrl } = await createSubmitEvidenceTx({
    wish: "Retention",
    evidenceHash: parseEvidenceResult.evidenceHash,
  });

  const message =
    `Hey @${requestState.requester}, ` +
    `Here are the links you can use to submit [promotion](${promotionTxCreationUrl}) or [retention](${retentionTxCreationUrl}) evidences.` +
    `\n\n<details><summary>Instructions</summary>` +
    `\n\n1. Open one of the links.` +
    `\n\n2. Switch to the \`Submission\` tab.` +
    `\n<img width="480px" src="https://raw.githubusercontent.com/paritytech/evidences-action/main/src/images/submission_tab.png" />` +
    `\n\n3. Adjust the transaction if needed.` +
    `\n\n4. Submit the Transaction` +
    `\n</details>\n\n---` +
    `\n\nThey are based on commit hash [TODO](${
      parseEvidenceResult.evidenceFileRawUrl
    }).` +
    `\n\nThe hash of the evidence is: \`${parseEvidenceResult.evidenceHash}\`.`;

  return { success: true, message };
};
