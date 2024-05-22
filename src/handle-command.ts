import { handleProposeSubmitCommand } from "./propose-submit";
import { RequestResult, RequestState } from "./types";

const usageInstructions = "See [usage instructions](https://github.com/paritytech/evidences-action#usage).";

export const handleCommand = async (opts: {
  command: string | undefined;
  requestState: RequestState;
  args: (string | undefined)[];
}): Promise<RequestResult> => {
  const { command, requestState, args } = opts;
  if (command?.toLowerCase() === "help") {
    return {
      success: true,
      message:
        "The Evidences action aims to help with the creation of on-chain Evidence extrinsics." +
        "\n\nThe main command is `/evidences submit`.\n\n" +
        usageInstructions,
    };
  }
  if (command?.toLowerCase() === "submit") {
    return await handleProposeSubmitCommand(requestState);
  }
  return {
    success: false,
    errorMessage: "Unrecognized command. Expected one of: `help`, `submit`.\n\n" + usageInstructions,
  };
};
