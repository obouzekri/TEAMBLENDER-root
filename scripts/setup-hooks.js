'use strict';

const { execFileSync } = require('child_process');

function isInsideGitWorkTree() {
  try {
    const result = execFileSync('git', ['rev-parse', '--is-inside-work-tree'], {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore']
    }).trim();
    return result === 'true';
  } catch {
    return false;
  }
}

function main() {
  if (!isInsideGitWorkTree()) {
    return;
  }

  execFileSync('git', ['config', 'core.hooksPath', '.githooks'], {
    stdio: 'inherit'
  });
}

main();
