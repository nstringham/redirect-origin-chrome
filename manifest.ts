import type { ManifestV3Export } from "@crxjs/vite-plugin";

export const manifest: ManifestV3Export = {
  manifest_version: 3,
  name: "Redirect Origin",
  description: "A Chrome extension to configure redirecting one origin to another while preserving path",
  version: "0.0.1",
  permissions: ["webNavigation", "storage"],
  action: { default_popup: "popup.html" },
  background: { service_worker: "src/service-worker.ts", type: "module" },
};
