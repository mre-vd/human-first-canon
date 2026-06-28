const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
let errors = [];

function validateRootFiles() {
  const masters = ['CLAUDE.md', 'STACKS.md', 'DATABASE.md', 'DEVOPS.md', 'TESTING.md', 'SECURITY.md'];

  masters.forEach((name) => {
    const filePath = path.join(rootDir, name);
    if (!fs.existsSync(filePath)) {
      errors.push(`Master ${name} is missing from root.`);
      return;
    }
    const content = fs.readFileSync(filePath, 'utf8');
    const expectedPrefix = `# ${name} — `;
    if (!content.startsWith(expectedPrefix)) {
      errors.push(`Master ${name} should start with "${expectedPrefix}"`);
    }
  });
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
