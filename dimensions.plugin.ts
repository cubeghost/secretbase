import path from 'path';
import { globSync } from 'glob';
import imageSize from 'image-size';

export default function virtualBaseDimensions() {
  const virtualModuleId = 'virtual:base-dimensions';
  const resolvedVirtualModuleId = '\0' + virtualModuleId;

  return {
    name: 'base-dimensions', // required, will show up in warnings and errors
    resolveId: (id: string) => {
      if (id === virtualModuleId) {
        return resolvedVirtualModuleId;
      }
    },
    load: (id: string) => {
      if (id === resolvedVirtualModuleId) {
        const baseDimensions = Object.fromEntries(
          globSync('public/assets/bases/base_*.png').map((filepath) => {
            const { width, height } = imageSize(filepath);
            return [path.parse(filepath).name, [width, height]]
          })
        );

        return `export const BASE_DIMENSIONS = ${JSON.stringify(baseDimensions)};`
      }
    },
  }
}
