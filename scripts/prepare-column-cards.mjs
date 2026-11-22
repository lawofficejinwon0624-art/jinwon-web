// ImageResponse does not decode WebP. Prepare JPEG/PNG sources for card rendering.
import sharp from 'sharp';
import {readdir} from 'node:fs/promises';
const dir='public/images/columns';
for(const file of await readdir(dir)){
 if(file.endsWith('.webp'))await sharp(`${dir}/${file}`).jpeg({quality:90}).toFile(`${dir}/${file.replace(/\.webp$/,'.jpg')}`);
}
await sharp('public/images/logo-emblem.webp').png().toFile('assets/logo-emblem.png');
console.log('Prepared column card image sources.');
