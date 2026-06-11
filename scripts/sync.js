const fs = require('fs');
const path = require('path');

// Load config
const CONFIG_PATH = path.join(__dirname, '../sync-config.json');
if (!fs.existsSync(CONFIG_PATH)) {
  console.error('Error: sync-config.json not found. Copy sync-config.example.json to sync-config.json and configure it.');
  process.exit(1);
}

const config = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));
const modulesDir = path.join(__dirname, '../modules');

const GENERATED_HEADER = '<!-- GENERATED FILE - DO NOT EDIT MANUALLY - SOURCE: https://github.com/romanmalko-dm/ai-process-architecture -->\n\n';

function findModulePath(name) {
  const categories = ['backend', 'frontend', 'mobile', 'engineering', 'core'];
  for (const cat of categories) {
    const fullPath = path.join(modulesDir, cat === 'core' ? '' : cat, name);
    if (fs.existsSync(fullPath) && fs.lstatSync(fullPath).isDirectory()) {
      return { path: fullPath, actualName: cat === 'core' ? name : `${cat}/${name}` };
    }
  }
  // Fallback for flat structure or explicit paths
  const directPath = path.join(modulesDir, name);
  if (fs.existsSync(directPath) && fs.lstatSync(directPath).isDirectory()) {
    return { path: directPath, actualName: name };
  }
  return null;
}

function syncProject(project) {
  console.log(`Syncing project: ${project.name} at ${project.path}`);

  if (!fs.existsSync(project.path)) {
    console.warn(`Warning: Path ${project.path} does not exist. Skipping.`);
    return;
  }

  const filesToSync = {}; // { filename: [content1, content2, ...] }

  project.modules.forEach(moduleName => {
    const moduleInfo = findModulePath(moduleName);
    if (!moduleInfo) {
      console.warn(`Warning: Module ${moduleName} not found. Skipping.`);
      return;
    }

    const { path: modulePath, actualName } = moduleInfo;
    const files = fs.readdirSync(modulePath);
    files.forEach(file => {
      if (file.endsWith('.md')) {
        const content = fs.readFileSync(path.join(modulePath, file), 'utf8');
        if (!filesToSync[file]) filesToSync[file] = [];
        filesToSync[file].push(`\n--- From Module: ${actualName} ---\n\n` + content);
      }
    });
  });

  // Write files to target project
  Object.keys(filesToSync).forEach(filename => {
    const targetPath = path.join(project.path, filename);
    const finalContent = GENERATED_HEADER + filesToSync[filename].join('\n');
    fs.writeFileSync(targetPath, finalContent);
    console.log(`  Updated: ${filename}`);
  });
}

config.projects.forEach(syncProject);
console.log('Sync complete.');
