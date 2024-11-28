import "./popup.css";

import { html, render } from "lit";
import type { Storage } from "./types";

let { rewrites } = await chrome.storage.sync.get<Storage>("rewrites");

function saveToStorage() {
  chrome.storage.sync.set<Storage>({ rewrites });
}

function rerender() {
  const template = html`
    ${rewrites.map(
      (rewrite, i) =>
        html`
          <input
            value=${rewrite.source}
            @change=${(event: Event) => {
              const input = event.target as HTMLInputElement;
              rewrite.source = input.value;
              saveToStorage();
            }}
          />
          <input
            value=${rewrite.destination}
            @change=${(event: Event) => {
              const input = event.target as HTMLInputElement;
              rewrite.destination = input.value;
              saveToStorage();
            }}
          />
          <button
            @click=${() => {
              rewrites.splice(i, 1);
              rerender();
              saveToStorage();
            }}
          >
            remove
          </button>
        `
    )}
    <button
      @click=${() => {
        rewrites.push({ source: "", destination: "" });
        rerender();
      }}
    >
      add
    </button>
  `;

  render(template, document.body);
}

rerender();
