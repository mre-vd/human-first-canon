const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const projectPath = process.argv[2];

if (!projectPath) {
  console.error('Usage: node scripts/discover.js <project-path>');
  process.exit(1);
}

const absolutePath = path.resolve(projectPath);

if (!fs.existsSync(absolutePath)) {
  console.error(`Error: Path ${absolutePath} does not exist.`);
  process.exit(1);
}

const CONFIG_PATH = path.join(__dirname, '../sync-config.json');
const EXAMPLE_CONFIG_PATH = path.join(__dirname, '../sync-config.example.json');

// Heuristics mapping
const HEURISTICS = [
  { module: 'core', check: () => true },
  { module: 'general', check: () => true },
  { module: 'security', check: () => true },
  { module: 'nestjs', check: (files, pkg) => pkg?.dependencies?.['@nestjs/core'] || pkg?.devDependencies?.['@nestjs/core'] },
  { module: 'react', check: (files, pkg) => pkg?.dependencies?.['react'] || pkg?.devDependencies?.['react'] },
  { module: 'vue', check: (files, pkg) => pkg?.dependencies?.['vue'] || pkg?.devDependencies?.['vue'] },
  { module: 'svelte', check: (files, pkg) => pkg?.dependencies?.['svelte'] || pkg?.devDependencies?.['svelte'] },
  { module: 'go', check: (files) => files.includes('go.mod') },
  { module: 'jvm', check: (files) => files.includes('pom.xml') || files.includes('build.gradle') || files.includes('build.gradle.kts') },
  { module: 'python', check: (files) => files.includes('requirements.txt') || files.includes('pyproject.toml') || files.includes('Pipfile') },
  { module: 'rust', check: (files) => files.includes('Cargo.toml') },
  { module: 'flutter', check: (files) => files.includes('pubspec.yaml') },
  { module: 'devops', check: (files) => files.includes('Dockerfile') || files.includes('docker-compose.yml') || files.includes('.github') },
  { 
    module: 'qa', 
    check: (files, pkg) => 
      pkg?.devDependencies?.['jest'] || 
      pkg?.devDependencies?.['cypress'] || 
      pkg?.devDependencies?.['playwright'] || 
      files.includes('tests') || 
      files.includes('test') 
  },
  { 
    module: 'database', 
    check: (files, pkg) => 
      pkg?.dependencies?.['prisma'] || 
      pkg?.dependencies?.['typeorm'] || 
      pkg?.dependencies?.['mongoose'] || 
      files.includes('prisma') || 
      files.some(f => f.endsWith('.sql'))
  },
  { 
    module: 'cloud', 
    check: (files, pkg) => 
      files.includes('terraform') || 
      files.includes('serverless.yml') || 
      pkg?.dependencies?.['aws-sdk']
  }
];

function discoverModules(targetDir) {
  const files = fs.readdirSync(targetDir);
  let pkg = {};
  
  if (files.includes('package.json')) {
    try {
      pkg = JSON.parse(fs.readFileSync(path.join(targetDir, 'package.json'), 'utf8'));
    } catch (e) {
      console.warn('Warning: Could not parse package.json');
    }
  }

  const suggested = HEURISTICS
    .filter(h => h.check(files, pkg))
    .map(h => h.module);

  return suggested;
}

const suggestedModules = discoverModules(absolutePath);
const projectName = path.basename(absolutePath);

console.log(`\n🔍 Discovered modules for project "${projectName}":`);
console.log(`   ${suggestedModules.join(', ')}`);

rl.question(`\nDo you want to add this project to your sync-config.json? (y/n): `, (answer) => {
  if (answer.toLowerCase() === 'y') {
    let config = { autoUpdate: true, projects: [] };
    
    if (fs.existsSync(CONFIG_PATH)) {
      config = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));
    } else if (fs.existsSync(EXAMPLE_CONFIG_PATH)) {
      config = JSON.parse(fs.readFileSync(EXAMPLE_CONFIG_PATH, 'utf8'));
      // Clear example projects but keep global settings
      config.projects = [];
    }

    // Check if project already exists
    const existingIndex = config.projects.findIndex(p => p.path === absolutePath);
    const projectEntry = {
      name: projectName,
      path: absolutePath,
      modules: suggestedModules
    };

    if (existingIndex > -1) {
      config.projects[existingIndex] = projectEntry;
      console.log(`Updating existing project entry for "${projectName}"...`);
    } else {
      config.projects.push(projectEntry);
      console.log(`Adding new project entry for "${projectName}"...`);
    }

    fs.writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2));
    console.log(`✅ sync-config.json updated successfully.`);
  } else {
    console.log('Operation cancelled.');
  }
  rl.close();
});
