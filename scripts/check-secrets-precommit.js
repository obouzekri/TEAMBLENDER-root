'use strict';

const { execFileSync } = require('child_process');

const PATTERNS = [
  { name: 'private_key', regex: /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/ },
  { name: 'jwt_secret_placeholder', regex: /JWT_SECRET\s*=\s*(teamsparksecret|change_this_secret|dev-secret-change-me|changeme)/i },
  { name: 'smtp_password', regex: /SMTP_PASS\s*=\s*\S+/i },
  { name: 'smtp_from_name', regex: /SMTP_FROM_NAME\s*=\s*TEAMSPARK/i },
  { name: 'aws_access_key', regex: /AKIA[0-9A-Z]{16}/ },
  { name: 'github_token', regex: /gh[pousr]_[A-Za-z0-9_]{20,}/ },
  { name: 'google_api_key', regex: /AIza[0-9A-Za-z\-_]{30,}/ },
  { name: 'slack_token', regex: /xox[baprs]-[A-Za-z0-9-]{10,}/ },
  { name: 'paypal_secret', regex: /PAYPAL_CLIENT_SECRET\s*=\s*\S+/i },
  { name: 'brevo_api_key', regex: /BREVO_API_KEY\s*=\s*\S+/i }
];

function getStagedDiff() {
  return execFileSync('git', ['diff', '--cached', '--unified=0', '--no-color'], {
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'ignore']
  });
}

function main() {
  let diff = '';
  try {
    diff = getStagedDiff();
  } catch (error) {
    console.error(`secret-scan: unable to read staged diff (${error.message})`);
    process.exit(1);
  }

  const matches = [];
  for (const pattern of PATTERNS) {
    if (pattern.regex.test(diff)) {
      matches.push(pattern.name);
    }
  }

  if (matches.length > 0) {
    console.error(`secret-scan: possible secrets detected (${matches.join(', ')})`);
    process.exit(1);
  }

  console.log('secret-scan: no obvious secrets detected in staged diff');
}

main();
