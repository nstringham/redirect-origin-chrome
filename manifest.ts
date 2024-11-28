import type { ManifestV3Export } from "@crxjs/vite-plugin";

export const manifest: ManifestV3Export = {
  manifest_version: 3,
  name: "Rewrite Origin",
  description: "A Chrome extension to configure redirect one origin to another while preserving path",
  version: "0.0.1",
  permissions: ["webNavigation", "storage"],
  action: { default_popup: "src/popup.html" },
  background: { service_worker: "src/service-worker.ts", type: "module" },
};