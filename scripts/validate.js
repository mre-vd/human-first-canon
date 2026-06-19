const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
let errors = [];

function validateRootFiles() {
  const claudMd = path.join(rootDir, 'CLAUDE.md');
  const geminiMd = path.join(rootDir, 'GEMINI.md');
  const designMd = path.join(rootDir, 'DESIGN.md');

  if (!fs.existsSync(claudMd)) {
    errors.push('Master CLAUDE.md is missing from root.');
  } else {
    const content = fs.readFileSync(claudMd, 'utf8');
    if (!content.startsWith('# CLAUDE.md — ')) {
      errors.push('Master CLAUDE.md should start with "# CLAUDE.md — "');
    }
  }

  if (!fs.existsSync(geminiMd)) {
    errors.push('Master GEMINI.md is missing from root.');
  } else {
    const content = fs.readFileSync(geminiMd, 'utf8');
    if (!content.startsWith('# GEMINI.md — ')) {
      errors.push('Master GEMINI.md should start with "# GEMINI.md — "');
    }
  }

  if (!fs.existsSync(designMd)) {
    errors.push('Master DESIGN.md is missing from root.');
  } else {
    const content = fs.readFileSync(designMd, 'utf8');
    if (!content.startsWith('# DESIGN.md — ')) {
      errors.push('Master DESIGN.md should start with "# DESIGN.md — "');
    }
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
