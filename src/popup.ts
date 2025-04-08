import "./popup.css";
import "@material/web/textfield/outlined-text-field";
import "@material/web/button/filled-button";
import "@material/web/iconbutton/icon-button";
import "@material/web/icon/icon";
import "@material/web/typography/md-typescale-styles.css";

import { html, render } from "lit";
import type { RedirectRule, Storage } from "./types";
import { mdiArrowRightBold, mdiDelete, mdiPlus } from "@mdi/js";
import logo from "./logo.svg";

const rules: RedirectRule[] = (await chrome.storage.sync.get<Storage>("rules")).rules ?? [
  { source: "", destination: "" },
];

function saveToStorage() {
  chrome.storage.sync.set<Storage>({ rules });
}

function validateUrlInput(input: HTMLInputElement) {
  try {
    const url = new URL(input.value);
    if (url.origin != input.value) {
      input.setCustomValidity(`Did you mean "${url.origin}"?`);
    } else {
      input.setCustomValidity("");
    }
  } catch (error) {
    if (error instanceof TypeError && error.message.includes("Invalid URL")) {
      input.setCustomValidity("Invalid origin.");
    } else {
      input.setCustomValidity(String(error));
    }
  }
  input.reportValidity();
}

function rerender() {
  const template = html`
    <h1 class="md-typescale-title-large">
      <img src="${logo}" width="36" height="36" role="presentation" />
      Redirect Origin
    </h1>

    ${rules.map(
      (rule, i) => html`
        <md-outlined-text-field
          label="Source"
          type="url"
          .value="${rule.source}"
          @input=${(event: Event) => {
            const input = event.target as HTMLInputElement;
            validateUrlInput(input);
            rule.source = input.value;
            saveToStorage();
          }}
        >
        </md-outlined-text-field>

        <md-icon>
          <svg viewBox="0 0 24 24">
            <title>Redirects To</title>
            <path d=${mdiArrowRightBold} />
          </svg>
        </md-icon>

        <md-outlined-text-field
          label="Destination"
          type="url"
          .value=${rule.destination}
          @input=${(event: Event) => {
            const input = event.target as HTMLInputElement;
            validateUrlInput(input);
            rule.destination = input.value;
            saveToStorage();
          }}
        >
        </md-outlined-text-field>

        <md-icon-button
          class="delete"
          @click=${() => {
            rules.splice(i, 1);
            rerender();
            saveToStorage();
          }}
        >
          <md-icon>
            <svg viewBox="0 0 24 24">
              <title>Delete</title>
              <path d=${mdiDelete} />
            </svg>
          </md-icon>
        </md-icon-button>
      `,
    )}
    <md-filled-button
      class="new-rule"
      @click=${() => {
        rules.push({ source: "", destination: "" });
        rerender();
        saveToStorage();
      }}
    >
      New Rule

      <svg slot="icon" viewBox="0 0 24 24">
        <path d="${mdiPlus}" />
      </svg>
    </md-filled-button>
  `;

  render(template, document.body);
}

rerender();
