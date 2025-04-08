import type { ManifestV3Export } from "@crxjs/vite-plugin";
import { version } from "./package.json";

export const manifest: ManifestV3Export = {
  manifest_version: 3,
  icons: { [128]: "src/logo.png" },
  name: "Redirect Origin",
  description: "A Chrome extension to configure redirecting one origin to another while preserving path",
  version: version,
  permissions: ["webNavigation", "storage"],
  action: { default_popup: "popup.html" },
  background: { service_worker: "src/service-worker.ts", type: "module" },
};
