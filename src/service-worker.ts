import type { RedirectRule, Storage } from "./types";

let redirectMap: { [key: string]: string };

function onRedirectsUpdated(rules: RedirectRule[]) {
  redirectMap = Object.fromEntries(rules.map(({ source, destination }) => [source, destination]));
}

chrome.storage.sync.get<Storage>("rules").then(({ rules }) => {
  onRedirectsUpdated(rules ?? []);
});

chrome.storage.sync.onChanged.addListener((changes) => {
  if ("rules" in changes) {
    onRedirectsUpdated(changes.rules.newValue);
  }
});

chrome.webNavigation.onBeforeNavigate.addListener(({ url, tabId }) => {
  const origin = new URL(url).origin;

  if (origin in redirectMap) {
    const newURl = url.replace(origin, redirectMap[origin]);

    chrome.tabs.update(tabId, { url: newURl });
  }
});
