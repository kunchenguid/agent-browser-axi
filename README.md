<h1 align="center">agent-browser-axi</h1>

<p align="center">
  <a href="https://www.npmjs.com/package/agent-browser-axi"><img alt="npm" src="https://img.shields.io/npm/v/agent-browser-axi?style=flat-square" /></a>
  <a href="https://github.com/kunchenguid/agent-browser-axi/actions/workflows/ci.yml"><img alt="CI" src="https://img.shields.io/github/actions/workflow/status/kunchenguid/agent-browser-axi/ci.yml?style=flat-square&label=CI" /></a>
  <a href="https://github.com/kunchenguid/agent-browser-axi/actions/workflows/release-please.yml"><img alt="Release" src="https://img.shields.io/github/actions/workflow/status/kunchenguid/agent-browser-axi/release-please.yml?style=flat-square&label=Release" /></a>
  <a href="#"><img alt="Platform" src="https://img.shields.io/badge/platform-macOS%20%7C%20Linux%20%7C%20Windows-blue?style=flat-square" /></a>
  <a href="https://x.com/kunchenguid"><img alt="X" src="https://img.shields.io/badge/X-@kunchenguid-black?style=flat-square" /></a>
  <a href="https://discord.gg/BW4aJuQhTf"><img alt="Discord" src="https://img.shields.io/discord/1439901831038763092?style=flat-square&label=discord" /></a>
</p>

<h3 align="center">Highly agent-ergonomic browser automation</h3>

`agent-browser-axi` wraps [agent-browser](https://www.npmjs.com/package/agent-browser) with an [AXI](https://axi.md)-compliant CLI. Every command returns a compact accessibility snapshot with just enough context and a hint about what to do next.

- **Token-efficient** — TOON-encoded output cuts token usage ~40% vs raw JSON
- **Combined operations** — one command navigates, captures, and suggests next steps
- **Contextual suggestions** — every response includes actionable next-step hints

## Quick Start

```sh
$ agent-browser-axi open https://example.com
page: {title: "Example Domain", url: "https://example.com", refs: 1}
snapshot:
RootWebArea "Example Domain"
  heading "Example Domain"
  paragraph "This domain is for use in illustrative examples..."
  ref=1 link "More information..."
help[1]:
  Run `agent-browser-axi click @1` to click the "More information..." link

$ agent-browser-axi click @1
page: {title: "IANA — IANA-Managed Reserved Domains", refs: 12}
snapshot:
...
```

## Install

**npm**

```sh
npm install -g agent-browser-axi
```

**From source**

```sh
git clone https://github.com/kunchenguid/agent-browser-axi.git
cd agent-browser-axi
npm install && npm run build
npm link
```

## How It Works

```
┌──────────────────────┐
│  agent-browser-axi   │  CLI — parse args, format output
└──────────┬───────────┘
           │ child_process.execFile
           ▼
┌──────────────────────┐
│    agent-browser     │  Browser automation daemon
└──────────────────────┘
```

- **Thin wrapper** — spawns `agent-browser` commands and captures output
- **Snapshot parsing** — accessibility tree snapshots are extracted and analyzed for interactive elements (`ref=` refs)
- **TOON encoding** — structured metadata uses [TOON format](https://www.npmjs.com/package/@toon-format/toon) for compact, token-efficient output

## CLI Reference

| Command               | Description                         |
| --------------------- | ----------------------------------- |
| `open <url>`          | Navigate to URL and snapshot        |
| `snapshot`            | Capture current page state          |
| `click @<ref>`        | Click an element by ref             |
| `fill @<ref> <text>`  | Fill a form field                   |
| `type <text>`         | Type text at current focus          |
| `press <key>`         | Press a keyboard key                |
| `scroll <dir>`        | Scroll: up, down, top, bottom       |
| `back`                | Navigate back                       |
| `wait <ms\|selector>` | Wait for time or CSS selector       |
| `eval <js>`           | Evaluate JavaScript in page context |

Running with no command is equivalent to `snapshot`.

### Flags

| Flag            | Description                     |
| --------------- | ------------------------------- |
| `--selector`    | Filter snapshot by CSS selector |
| `--depth`       | Limit snapshot tree depth       |
| `--interactive` | Show only interactive elements  |
| `--help`        | Show usage information          |

## Development

```sh
npm run build      # Compile TypeScript to dist/
npm run dev        # Run CLI directly with tsx
npm test           # Run tests with vitest
npm run test:watch # Run tests in watch mode
```
