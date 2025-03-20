const fs = require('fs');
const terser = require('terser');
const path = require("path");

async function minify(filepath) {
    const ext = path.extname(filepath);
    const code = fs.readFileSync(filepath, 'utf8');
    const result = await terser.minify(code, {
        ecma: 2020,
        module: ext === '.mjs',
        compress: true
    });

    if (result.error) {
        console.error(result.error);
        process.exit(1);
    }

    fs.writeFileSync(filepath, result.code, 'utf8');
    console.log("Minified %s", filepath);
}

for (const file of fs.readdirSync('./dist')) {
    if (file.endsWith('.js') || file.endsWith('.mjs')) {
        minify(`./dist/${file}`);
    }
}
