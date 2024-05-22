import * as fs from "fs";

import { extractCommitHash, hashProposal } from "./util";

describe("Utility functions", () => {
  describe("hashProposal", () => {
    test("Properly hashes the RFC text", () => {
      // https://raw.githubusercontent.com/polkadot-fellows/RFCs/c368187e2b80c9b76a399f30127e866f47594ae8/text/0014-improve-locking-mechanism-for-parachains.md
      const rfcText = fs.readFileSync("src/examples/0014-improve-locking-mechanism-for-parachains.md").toString();

      // https://collectives.subsquare.io/fellowship/referendum/16
      // The remark is: "RFC_APPROVE(0014,ba8418fc46d251acfdd39604c5fe6ea3d69ed464ed4113d50e82ea1c712a44fc)"
      const expectedHash = "ba8418fc46d251acfdd39604c5fe6ea3d69ed464ed4113d50e82ea1c712a44fc";

      expect(hashProposal(rfcText)).toEqual(expectedHash);
    });
  });

  it("extracts commit hash", () => {
    const rawUrl =
      "https://github.com/paritytech-stg/RFCs/raw/210dd4c3d4a83443e8e35e47b5f67a7f9dc0a9d1/text%2F0005-coretime-interface-test.md";
    expect(extractCommitHash(rawUrl)).toEqual("210dd4c3d4a83443e8e35e47b5f67a7f9dc0a9d1");
  });
});
