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

const HEURISTICS = [
  { module: 'core', check: () => true },
  { module: 'general', check: () => true },
  { module: 'security', check: () => true },
  { 
    module: 'design', 
    check: (files, pkg) => 
      pkg?.dependencies?.['react'] || 
      pkg?.devDependencies?.['react'] ||
      pkg?.dependencies?.['vue'] || 
      pkg?.devDependencies?.['vue'] ||
      pkg?.dependencies?.['svelte'] || 
      pkg?.devDependencies?.['svelte'] ||
      pkg?.dependencies?.['next'] || 
      files.some(f => f.includes('next.config') || f.includes('nuxt.config'))
  },
  { module: 'nestjs', check: (files, pkg) => pkg?.dependencies?.['@nestjs/core'] || pkg?.devDependencies?.['@nestjs/core'] },
  { module: 'nextjs', check: (files, pkg) => pkg?.dependencies?.['next'] || files.some(f => f.includes('next.config')) },
  { module: 'react', check: (files, pkg) => pkg?.dependencies?.['react'] || pkg?.devDependencies?.['react'] },
  { module: 'vue', check: (files, pkg) => pkg?.dependencies?.['vue'] || pkg?.devDependencies?.['vue'] },
  { module: 'svelte', check: (files, pkg) => pkg?.dependencies?.['svelte'] || pkg?.devDependencies?.['svelte'] },
  { module: 'go', check: (files) => files.includes('go.mod') },
  { module: 'rust', check: (files) => files.includes('Cargo.toml') },
  { module: 'python', check: (files) => files.some(f => ['requirements.txt', 'pyproject.toml', 'Pipfile', 'setup.py'].includes(f)) },
  { module: 'flutter', check: (files) => files.includes('pubspec.yaml') },
  { module: 'spring-boot', check: (files) => files.some(f => f.includes('build.gradle') || f.includes('pom.xml')) && files.some(f => f.includes('src')) },
  { module: 'jvm', check: (files) => files.some(f => f.includes('build.gradle') || f.includes('pom.xml')) },
  { module: 'devops', check: (files) => files.some(f => f.includes('Dockerfile') || f.includes('docker-compose') || f.includes('.github') || f.includes('.gitlab-ci')) },
  { module: 'playwright', check: (files, pkg) => pkg?.devDependencies?.['@playwright/test'] || files.some(f => f.includes('playwright.config')) },
  { 
    module: 'qa', 
    check: (files, pkg) => 
      pkg?.devDependencies?.['jest'] || 
      pkg?.devDependencies?.['cypress'] || 
      pkg?.devDependencies?.['@playwright/test'] || 
      files.some(f => ['test', 'tests', '__tests__', 'spec', 'specs'].includes(f.toLowerCase()))
  },
  { 
    module: 'database', 
    check: (files, pkg) => 
      pkg?.dependencies?.['prisma'] || 
      pkg?.dependencies?.['typeorm'] || 
      pkg?.dependencies?.['mongoose'] || 
      files.some(f => ['prisma', 'migrations', 'migration'].includes(f.toLowerCase()) || f.endsWith('.sql'))
  },
  { 
    module: 'cloud', 
    check: (files, pkg) => 
      files.some(f => ['terraform', 'serverless.yml', 'serverless.yaml', 'provision', 'deploy'].includes(f.toLowerCase())) || 
      pkg?.dependencies?.['aws-sdk']
  }
];

function discoverModules(targetDir) {
  if (!fs.existsSync(targetDir)) return [];
  
  const allFiles = new Set();
  const allPkgs = [];

  function scan(dir, depth = 0) {
    if (depth > 4) return;
    if (dir.includes('node_modules') || dir.includes('.git') || dir.includes('build') || dir.includes('dist') || dir.includes('target')) return;

    try {
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      entries.forEach(entry => {
        allFiles.add(entry.name);
        const fullPath = path.join(dir, entry.name);
        if (entry.isFile() && entry.name === 'package.json') {
          try {
            allPkgs.push(JSON.parse(fs.readFileSync(fullPath, 'utf8')));
          } catch (e) {}
        }
        if (entry.isDirectory()) {
          scan(fullPath, depth + 1);
        }
      });
    } catch (e) {}
  }

  scan(targetDir);

  const filesArray = Array.from(allFiles);
  return HEURISTICS
    .filter(h => h.check(filesArray, allPkgs.reduce((acc, p) => ({
      dependencies: { ...acc.dependencies, ...p.dependencies },
      devDependencies: { ...acc.devDependencies, ...p.devDependencies }
    }), { dependencies: {}, devDependencies: {} })))
    .map(h => h.module);
}

function findModulePath(name) {
  const categories = ['backend', 'frontend', 'mobile', 'engineering', 'core'];
  for (const cat of categories) {
    const fullPath = path.join(modulesDir, cat === 'core' ? '' : cat, name);
    if (fs.existsSync(fullPath) && fs.lstatSync(fullPath).isDirectory()) {
      return { path: fullPath, actualName: cat === 'core' ? name : `${cat}/${name}` };
    }
  }
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

  let modules = project.modules || [];
  if (project.autodetect) {
    const detected = discoverModules(project.path);
    console.log(`  Autodetected modules: ${detected.join(', ')}`);
    
    // Special case: if this is the source repo (it contains the modules directory), sync everything
    if (fs.existsSync(path.join(project.path, 'modules'))) {
      const allAvailableModules = [];
      const categories = ['backend', 'frontend', 'mobile', 'engineering', 'core'];
      categories.forEach(cat => {
        const catPath = path.join(project.path, 'modules', cat === 'core' ? '' : cat);
        if (fs.existsSync(catPath)) {
          fs.readdirSync(catPath).forEach(m => {
            if (fs.lstatSync(path.join(catPath, m)).isDirectory()) {
              allAvailableModules.push(m);
            }
          });
        }
      });
      console.log('  Source repository detected: syncing all available modules.');
      modules = [...new Set([...allAvailableModules])];
    } else {
      // Merge detected with manual, ensuring uniqueness
      modules = [...new Set([...modules, ...detected])];
    }
  }

  const filesToSync = {};

  modules.forEach(moduleName => {
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

  Object.keys(filesToSync).forEach(filename => {
    const targetPath = path.join(project.path, filename);
    const finalContent = GENERATED_HEADER + filesToSync[filename].join('\n');
    fs.writeFileSync(targetPath, finalContent);
    console.log(`  Updated: ${filename}`);
  });
}

config.projects.forEach(syncProject);
console.log('Sync complete.');
