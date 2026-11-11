import fs from 'node:fs';
import path from 'node:path';

const iconsDir = path.resolve('src/assets/icons');
const outputFile = path.resolve('src/core/models/icap-icons.generated.models.ts');

const allowedExtensions = ['.svg', '.png'];

const generate = () => {
  const icons = fs.readdirSync(iconsDir)
                  .filter(file => allowedExtensions.includes(path.extname(file)))
                  .map(file => path.basename(file, path.extname(file)));

  const content = `
// AUTO-GENERATED FILE. DO NOT EDIT.
export const iconNames = ${ JSON.stringify(icons, null, 2) } as const;
export type IcapIconName = typeof iconNames[number];
`.trimStart();
  fs.writeFileSync(outputFile, content);
}

generate();

fs.watch(iconsDir, { recursive: true }, generate);
