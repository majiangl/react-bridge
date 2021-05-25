const {execSync} = require('child_process');

const execOptions = {
  stdio: 'inherit'
};

execSync('npm install', execOptions);
execSync('npm run build', execOptions);