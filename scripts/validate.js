const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
let errors = [];

function validateAgnosticism(filePath, fileName) {
  if (!fs.existsSync(filePath)) return;
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');

  const leakPatterns = [
    { regex: /\b(inertia|aurum|cradle)\b/i, name: 'Project name leak (Inertia/Aurum/Cradle)' },
    { regex: /\b(notary|нотаріус|нотаріал)/i, name: 'Notary domain leak' },
    { regex: /посвідчен/i, name: 'Attestation / Notarization leak (посвідчення)' },
    { regex: /\boffice\b/i, name: 'Office domain leak (office)' },
    { regex: /\bофіс\b/i, name: 'Office domain leak (офіс)' }
  ];

  lines.forEach((line, index) => {
    leakPatterns.forEach(pattern => {
      if (pattern.regex.test(line)) {
        errors.push(`Agnosticism violation in ${fileName}:${index + 1}: Found '${pattern.name}' on line: "${line.trim()}"`);
      }
    });
  });
}

function validateRootFiles() {
  const claudMd = path.join(rootDir, 'CLAUDE.md');
  const geminiMd = path.join(rootDir, 'GEMINI.md');

  if (!fs.existsSync(claudMd)) {
    errors.push('Master CLAUDE.md is missing from root.');
  } else {
    const content = fs.readFileSync(claudMd, 'utf8');
    if (!content.startsWith('# CLAUDE.md — ')) {
      errors.push('Master CLAUDE.md should start with "# CLAUDE.md — "');
    }
    validateAgnosticism(claudMd, 'CLAUDE.md');
  }

  if (!fs.existsSync(geminiMd)) {
    errors.push('Master GEMINI.md is missing from root.');
  } else {
    const content = fs.readFileSync(geminiMd, 'utf8');
    if (!content.startsWith('# GEMINI.md — ')) {
      errors.push('Master GEMINI.md should start with "# GEMINI.md — "');
    }
    validateAgnosticism(geminiMd, 'GEMINI.md');
  }
}

// Validate sync-config.json
const configPath = path.join(rootDir, 'sync-config.json');
if (fs.existsSync(configPath)) {
  try {
    const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    if (!config.projects || !Array.isArray(config.projects)) {
      errors.push('sync-config.json must contain a "projects" array');
    } else {
      config.projects.forEach((proj, index) => {
        if (!proj.name || !proj.path) {
          errors.push(`Project at index ${index} in sync-config.json is missing required fields (name, path)`);
        }
      });
    }
  } catch (e) {
    errors.push(`sync-config.json is not a valid JSON: ${e.message}`);
  }
} else {
  console.log('Note: sync-config.json not found, skipping config validation.');
}

validateRootFiles();

if (errors.length > 0) {
  console.error('Validation failed:');
  errors.forEach(err => console.error(`- ${err}`));
  process.exit(1);
} else {
  console.log('Validation passed!');
}
