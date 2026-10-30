#!/usr/bin/env node
// Clone the TeamBlender sub-repos into this workspace if they are missing.
const { execFileSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const repos = [
  { dir: 'frontend-next', url: 'https://github.com/obouzekri/TEAMBLENDER-frontend-next.git' },
  { dir: 'backend', url: 'https://github.com/obouzekri/TEAMBLENDER-backend.git' },
];

for (const { dir, url } of repos) {
  const target = path.join(root, dir);
  if (fs.existsSync(path.join(target, '.git'))) {
    console.log(`[workspace] ${dir} déjà présent`);
    continue;
  }
  console.log(`[workspace] clonage de ${dir}…`);
  execFileSync('git', ['clone', url, target], { stdio: 'inherit' });
}
