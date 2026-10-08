const { execSync } = require('child_process');
const fs = require('fs');
try {
  const output = execSync('git log -p src/components/SlideCRMPipeline.tsx').toString();
  fs.writeFileSync('gitlog.txt', output);
} catch (e) {
  fs.writeFileSync('gitlog.txt', e.toString());
}
