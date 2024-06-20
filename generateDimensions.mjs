import path from 'path';
import fs from 'fs';
import { globSync } from "glob";
import imageSize from "image-size";

const baseDimensions = Object.fromEntries(
    globSync('public/assets/bases/base_*.png').map((filepath) => {
        const { width, height } = imageSize(filepath);
        return [path.parse(filepath).name, [width, height]]
    })
);

const fileContents = `export const BASE_DIMENSIONS = ${JSON.stringify(baseDimensions)};`;

fs.writeFileSync('src/baseDimensions.ts', fileContents, { flag: 'w+' });