import fetch from "node-fetch";

import { OctokitInstance, RequestResultFailed, RequestState } from "./types";
import { hashProposal, userProcessError } from "./util";

export type ParseEvidenceResult = {
  evidenceHash: string;
  evidenceFileRawUrl: string;
};

export const extractEvidenceResult = async (
  octokit: OctokitInstance,
  pr: { owner: string; repo: string; number: number },
): Promise<{ success: true; result: ParseEvidenceResult } | { success: false; error: string }> => {
  const { owner, repo, number } = pr;
  const addedMarkdownFiles = (
    await octokit.rest.pulls.listFiles({
      owner,
      repo,
      pull_number: number,
    })
  ).data.filter(
    (file) => file.status === "added" && file.filename.startsWith("evidence/") && file.filename.includes(".md"),
  );

  if (addedMarkdownFiles.length < 1) {
    return { success: false, error: "Evidence markdown file was not found in the PR." };
  }
  if (addedMarkdownFiles.length > 1) {
    return {
      success: false,
      error: `The system can only parse **one** markdown file but more than one were found: ${addedMarkdownFiles
        .map((file) => file.filename)
        .join(",")}. Please, reduce the number of files to **one file** for the system to work.`,
    };
  }

  const [evidenceFile] = addedMarkdownFiles;
  const rawText = await (await fetch(evidenceFile.raw_url)).text();

  return {
    success: true,
    result: {
      evidenceFileRawUrl: evidenceFile.raw_url,
      evidenceHash: hashProposal(rawText)
    },
  };
};

/**
 * Parses the evidence details contained in the PR.
 */
export const parseEvidence = async (requestState: RequestState): Promise<RequestResultFailed | ParseEvidenceResult> => {
  const { octokitInstance, event } = requestState;

  const result = await extractEvidenceResult(octokitInstance, {
    repo: event.repository.name,
    owner: event.repository.owner.login,
    number: event.issue.number,
  });
  if (!result.success) {
    return userProcessError(requestState, result.error);
  }
  return result.result;
};
