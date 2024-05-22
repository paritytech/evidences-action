# evidences-action

## Description

A GitHub Action aiming to help in the process of the fellows evidences referenda.

Learn more about the Evidences proposal process [here](https://github.com/polkadot-fellows/Evidences/#process).

## Usage

On an Evidence Pull Request, add a comment starting with `/evidence`.

### Commands

1. Submit

Proposes the creation of an extrinsic that submits the evidence to the chain

```
/evidence submit
```

Will result in a comment response with instructions to create the extrinsic.

## Configuration

To use the action in a repository, add a job that is going to run on specific comments on PRs:

```yaml
name: Evidences action

on:
  issue_comment:
    types: [created]

permissions:
  pull-requests: write
  contents: write

jobs:
  evidences-action:
    name: Handle an Evidence-related command in a Evidence proposal PR
    if: ${{ github.event.issue.pull_request && startsWith(github.event.comment.body, '/evidence') }}
    runs-on: ubuntu-latest
    timeout-minutes: 5
    steps:
      - uses: paritytech/evidence-action@main
    env:
      GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
      PROVIDER_URL: "wss://polkadot-collectives-rpc.polkadot.io" # Optional.

```

### Environment variables

The action uses the `GH_TOKEN` environment variable supplied to it.

The built-in `secrets.GITHUB_TOKEN` can be used, as long as it has the necessary permissions.

- `pull-requests: write` permission is used to write comments in the PR.
- `contents: write` permission is used to close/merge the PR.

The `PROVIDER_URL` variable can be specified to override the default public endpoint to the Collectives parachain.

A full archive node is needed to process the confirmed referenda.
