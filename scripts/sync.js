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

const masterClaudePath = path.join(rootDir, 'CLAUDE.md');
const masterGeminiPath = path.join(rootDir, 'GEMINI.md');

if (!fs.existsSync(masterClaudePath) || !fs.existsSync(masterGeminiPath)) {
  console.error('Error: Master CLAUDE.md or GEMINI.md not found in root.');
  process.exit(1);
}

const claudeContent = fs.readFileSync(masterClaudePath, 'utf8');
const geminiContent = fs.readFileSync(masterGeminiPath, 'utf8');

function syncProject(project) {
  console.log(`Syncing project: ${project.name} at ${project.path}`);

  if (!fs.existsSync(project.path)) {
    console.warn(`Warning: Path ${project.path} does not exist. Skipping.`);
    return;
  }

  // Define target paths
  const targetClaude = path.join(project.path, 'CLAUDE.md');
  const targetGemini = path.join(project.path, 'GEMINI.md');

  // Copy files
  fs.writeFileSync(targetClaude, claudeContent, 'utf8');
  fs.writeFileSync(targetGemini, geminiContent, 'utf8');
  console.log(`  Updated: CLAUDE.md`);
  console.log(`  Updated: GEMINI.md`);
}

config.projects.forEach(syncProject);
console.log('Sync complete.');
