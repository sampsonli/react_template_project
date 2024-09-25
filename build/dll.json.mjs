import {readFileSync} from 'node:fs'
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const base = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../');
export const vendorManifest = JSON.parse(readFileSync(`${base}/static/dll/vendors-manifest.json`));
export const bundleConfig = JSON.parse(readFileSync(`${base}/static/dll/bundle-config.json`));
