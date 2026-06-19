const fs = require('fs');
const path = require('path');

// Load config
const CONFIG_PATH = path.join(__dirname, '../sync-config.json');
if (!fs.existsSync(CONFIG_PATH)) {
  console.error('Error: sync-config.json not found. Copy sync-config.example.json to sync-config.json and configure it.');
  process.exit(1);
}

const config = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));
const rootDir = path.join(__dirname, '..');

const masterFiles = ['CLAUDE.md', 'GEMINI.md', 'DESIGN.md', 'DATABASE.md', 'DEVOPS.md', 'TESTING.md', 'SECURITY.md'];

const missing = masterFiles.filter((name) => !fs.existsSync(path.join(rootDir, name)));
if (missing.length > 0) {
  console.error(`Error: Master file(s) not found in root: ${missing.join(', ')}.`);
  process.exit(1);
}

const masterContents = masterFiles.map((name) => ({
  name,
  content: fs.readFileSync(path.join(rootDir, name), 'utf8'),
}));

function syncProject(project) {
  console.log(`Syncing project: ${project.name} at ${project.path}`);

  if (!fs.existsSync(project.path)) {
    console.warn(`Warning: Path ${project.path} does not exist. Skipping.`);
    return;
  }

  masterContents.forEach(({ name, content }) => {
    fs.writeFileSync(path.join(project.path, name), content, 'utf8');
    console.log(`  Updated: ${name}`);
  });
}

config.projects.forEach(syncProject);
console.log('Sync complete.');
