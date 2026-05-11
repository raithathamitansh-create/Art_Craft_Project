const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'Frontend');

const files = [
    'OilPainting.html',
    'WaterColor.html',
    'AcrylicColor.html',
    'EncausticColor.html',
    'TempraColor.html',
    'PastelColor.html',
    'PastelColor2.html',
    'FrescoPaint.html'
];

const newHeader = `  <header>
    <img id="logo" src="logo.png" alt="Art & Craft Logo" onclick="window.location.href='index.html'">
    <input id="search" type="text" name="search bar" placeholder="Search for courses...">
    <div class="auth-buttons">
      <button id="login" type="button">Login</button>
      <button id="signup" type="button">Sign up</button>
    </div>
  </header>`;

files.forEach(file => {
    const filePath = path.join(dir, file);
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Regex to replace the header block
        const headerRegex = /<header>[\s\S]*?<\/header>/;
        content = content.replace(headerRegex, newHeader);
        
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated header in ${file}`);
    }
});
