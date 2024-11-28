import type { Rewrite, Storage } from "./types";

let rewriteMap: { [key: string]: string };

function onRewritesUpdated(rewrites: Rewrite[]) {
  rewriteMap = Object.fromEntries(rewrites.map(({ source, destination }) => [source, destination]));
}

chrome.storage.sync.get<Storage>("rewrites").then(({ rewrites }) => {
  onRewritesUpdated(rewrites);
});

chrome.storage.sync.onChanged.addListener((changes) => {
  if ("rewrites" in changes) {
    onRewritesUpdated(changes.rewrites.newValue);
  }
});

chrome.webNavigation.onBeforeNavigate.addListener(({ url, tabId }) => {
  const origin = new URL(url).origin;

  if (origin in rewriteMap) {
    const newURl = url.replace(origin, rewriteMap[origin]);

    chrome.tabs.update(tabId, { url: newURl });
  }
});
