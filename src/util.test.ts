import * as fs from "fs";

import { extractCommitHash, hashProposal } from "./util";

describe("Utility functions", () => {
  describe("hashProposal", () => {
    test("Properly hashes the Evidence text", () => {
      // https://github.com/polkadot-fellows/Evidences/blob/594f3f9015706f666180d54486a68ac6ee83ef7f/evidence/davxy/0001-davxy-2024-H1.md
      const evidenceText = fs.readFileSync("src/examples/0001-davxy-2024-H1.md").toString();

      // b2sum -l 256 0001-davxy-2024-H1.md
      const expectedHash = "e06ac00a2d6d134d1ae51cbc1574ca719578af568a700054f352db356ce2e22c";

      expect(hashProposal(evidenceText)).toEqual(expectedHash);
    });
  });

  it("extracts commit hash", () => {
    const rawUrl =
      "https://github.com/paritytech/Evidences/raw/594f3f9015706f666180d54486a68ac6ee83ef7f/text%2F0005-coretime-interface-test.md";
    expect(extractCommitHash(rawUrl)).toEqual("210dd4c3d4a83443e8e35e47b5f67a7f9dc0a9d1");
  });
});
