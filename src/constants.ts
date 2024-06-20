export const GRID_SIZE = 32;

export const POOF_DURATION = 600;

export const BASES = [
  { id: 'base_0000_1', label: 'Square Cave', type: 'cave' },
  { id: 'base_0005_6', label: 'Long Cave', type: 'cave' },
  { id: 'base_0016_17', label: '2-Room Cave', type: 'cave' },
  { id: 'base_0019_20', label: 'Divided Cave', type: 'cave' },

  { id: 'base_0001_2', label: 'Square Tree', type: 'tree' },
  { id: 'base_0015_16', label: '3-Room Tree', type: 'tree' },
  { id: 'base_0018_19', label: 'Split Tree', type: 'tree' },
  { id: 'base_0021_22', label: 'Long Tree', type: 'tree' },

  { id: 'base_0002_3', label: 'Square Shrub', type: 'shrub' },
  { id: 'base_0011_12', label: 'Divided Shrub', type: 'shrub' },
  { id: 'base_0014_15', label: '2-Room Shrub', type: 'shrub' },
  { id: 'base_0020_21', label: 'Wide Shrub', type: 'shrub' },

  { id: 'base_0003_4', label: 'Square Mountain Cave', type: 'mountain_cave' },
  { id: 'base_0007_8', label: '1-Room Mountain Cave', type: 'mountain_cave' },
  { id: 'base_0009_10', label: 'Split Mountain Cave', type: 'mountain_cave' },
  { id: 'base_0017_18', label: '2-Room Mountain Cave', type: 'mountain_cave' },

  { id: 'base_0004_5', label: 'Square Water Cave', type: 'water_cave' },
  { id: 'base_0010_11', label: 'Winding Water Cave', type: 'water_cave' },
  { id: 'base_0013_14', label: 'Long Water Cave', type: 'water_cave' },
  { id: 'base_0023_24', label: 'Wide Water Cave', type: 'water_cave' },

  { id: 'base_0006_7', label: 'Square Desert Cave', type: 'desert_cave' },
  { id: 'base_0008_9', label: '1-Room Desert Cave', type: 'desert_cave' },
  { id: 'base_0012_13', label: '2-Room Desert Cave', type: 'desert_cave' },
  { id: 'base_0022_23', label: 'U-Shape Desert Cave', type: 'desert_cave' },
] as const;

export const ITEMS = [
  { filename: 'rsrh001.png', category: 'table_small', size: [1, 1], alt: 'small table' },
  { filename: 'rsrh002.png', category: 'table_small', size: [1, 1], alt: 'pokeball table' }, // "pokemon"
  { filename: 'rsrh003.png', category: 'table_medium', size: [3, 2], alt: 'metal table' }, // "heavy"
  { filename: 'rsrh004.png', category: 'table_medium', size: [3, 2], alt: 'wood table' }, // "ragged"
  { filename: 'rsrh005.png', category: 'table_medium', size: [3, 2], alt: 'tree table' }, // "comfort"
  { filename: 'rsrh006.png', category: 'table_large', size: [3, 3], alt: 'blue table' }, // "pretty"
  { filename: 'rsrh007.png', category: 'table_large', size: [3, 3], alt: 'brick table' },
  { filename: 'rsrh008.png', category: 'table_large', size: [3, 3], alt: 'log table' }, // "camp"
  { filename: 'rsrh009.png', category: 'table_large', size: [3, 3], alt: 'stone table' }, // "hard"
  { filename: 'rsrh010.png', category: 'chair', size: [1, 1], alt: 'pink chair' }, // "small"
  { filename: 'rsrh011.png', category: 'chair', size: [1, 1], alt: 'pokeball chair' }, // "pokemon"
  { filename: 'rsrh012.png', category: 'chair', size: [1, 1], alt: 'metal chair' }, // "heavy"
  { filename: 'rsrh013.png', category: 'chair', size: [1, 1], alt: 'blue chair' }, // "pretty"
  { filename: 'rsrh014.png', category: 'chair', size: [1, 1], alt: 'tree chair' }, // "comfort"
  { filename: 'rsrh015.png', category: 'chair', size: [1, 1], alt: 'wood chair' }, // "ragged"
  { filename: 'rsrh016.png', category: 'chair', size: [1, 1], alt: 'brick chair' },
  { filename: 'rsrh017.png', category: 'chair', size: [1, 1], alt: 'log chair' }, // "camp"
  { filename: 'rsrh018.png', category: 'chair', size: [1, 1], alt: 'stone chair' }, // "hard"
  { filename: 'rsrh019.png', category: 'plant', size: [1, 2], alt: 'red plant' },
  { filename: 'rsrh020.png', category: 'plant', size: [1, 2], alt: 'tropical plant' },
  { filename: 'rsrh021.png', category: 'plant', size: [1, 2], alt: 'pretty flowers' },
  { filename: 'rsrh022.png', category: 'plant', size: [2, 2], alt: 'flower bush' }, // "colorful plant"
  { filename: 'rsrh023.png', category: 'plant', size: [2, 2], alt: 'evergreen' }, // "big plant"
  { filename: 'rsrh024.png', category: 'plant', size: [2, 2], alt: 'bonsai' }, // "gorgeous plant"
  { filename: 'rsrh025.png', category: 'table_medium', size: [1, 2], alt: 'red brick' },
  { filename: 'rsrh026.png', category: 'table_medium', size: [1, 2], alt: 'yellow brick' },
  { filename: 'rsrh027.png', category: 'table_medium', size: [1, 2], alt: 'blue brick' },
  { filename: 'rsrh028.png', category: 'misc', size: [1, 1], alt: 'red balloon' },
  { filename: 'rsrh029.png', category: 'misc', size: [1, 1], alt: 'blue balloon' },
  { filename: 'rsrh030.png', category: 'misc', size: [1, 1], alt: 'yellow balloon' },
  { filename: 'rsrh035.png', category: 'misc', size: [1, 1], alt: 'fence length' },
  { filename: 'rsrh036.png', category: 'misc', size: [1, 1], alt: 'fence width' },
  { filename: 'rsrh039.png', category: 'misc', size: [1, 1], alt: 'mud ball' },
  { filename: 'rsrh033.png', category: 'misc', size: [1, 2], alt: 'wood board' },
  { filename: 'rsrh037.png', category: 'misc', size: [2, 2], alt: 'tire' },
  { filename: 'rsrh040.png', category: 'misc', size: [1, 2], alt: 'breakable door' },
  { filename: 'rsrh041.png', category: 'misc', size: [1, 2], alt: 'sand ornament' },
  { filename: 'rsrh042.png', category: 'misc', size: [1, 2], alt: 'silver shield' },
  { filename: 'rsrh043.png', category: 'misc', size: [1, 2], alt: 'gold shield' },
  { filename: 'rsrh044.png', category: 'misc', size: [1, 2], alt: 'glass ornament' },
  { filename: 'rsrh031.png', category: 'misc', size: [3, 3], alt: 'red tent' },
  { filename: 'rsrh032.png', category: 'misc', size: [3, 3], alt: 'blue tent' },
  { filename: 'rsrh034.png', category: 'misc', size: [2, 4], alt: 'slide' },
  { filename: 'rsrh038.png', category: 'misc', size: [4, 2], alt: 'platform' }, // "stand"
  { filename: 'rsrh045.png', category: 'device', size: [1, 1], alt: 'tv' },
  { filename: 'rsrh046.png', category: 'device', size: [1, 1], alt: 'round tv' },
  { filename: 'rsrh047.png', category: 'device', size: [1, 1], alt: 'cute tv' },
  { filename: 'rsrh048.png', category: 'floor_small', size: [1, 1], alt: 'glitter mat' },
  { filename: 'rsrh049.png', category: 'floor_small', size: [1, 1], alt: 'jump mat' },
  { filename: 'rsrh050.png', category: 'floor_small', size: [1, 1], alt: 'spin mat' },
  { filename: 'rsrh051.png', category: 'floor_small', size: [1, 1], alt: 'note mat' },
  { filename: 'rsrh059.png', category: 'floor_large', size: [3, 3], alt: 'surf mat' },
  { filename: 'rsrh060.png', category: 'floor_large', size: [3, 3], alt: 'thunder mat' },
  { filename: 'rsrh061.png', category: 'floor_large', size: [3, 3], alt: 'fire blast mat' },
  { filename: 'rsrh062.png', category: 'floor_large', size: [3, 3], alt: 'powder snow mat' },
  { filename: 'rsrh063.png', category: 'floor_large', size: [3, 3], alt: 'attract mat' },
  { filename: 'rsrh064.png', category: 'floor_large', size: [3, 3], alt: 'fissure mat' },
  { filename: 'rsrh065.png', category: 'floor_large', size: [3, 3], alt: 'spikes mat' },
  { filename: 'rsrh066.png', category: 'wall', size: [1, 1], alt: 'pokeball poster' }, // "ball"
  { filename: 'rsrh067.png', category: 'wall', size: [1, 1], alt: 'treecko poster' }, // "green"
  { filename: 'rsrh068.png', category: 'wall', size: [1, 1], alt: 'torchic poster' }, // "red"
  { filename: 'rsrh069.png', category: 'wall', size: [1, 1], alt: 'mudkip poster' }, // "blue"
  { filename: 'rsrh070.png', category: 'wall', size: [1, 1], alt: 'marill poster' }, // "cute"
  { filename: 'rsrh071.png', category: 'wall', size: [2, 1], alt: 'pikachu and pichu poster' }, // "pika"
  { filename: 'rsrh072.png', category: 'wall', size: [2, 1], alt: 'seviper poster' }, // "long"
  { filename: 'rsrh073.png', category: 'wall', size: [2, 1], alt: 'relicanth poster' }, // "sea"
  { filename: 'rsrh074.png', category: 'wall', size: [2, 1], alt: 'wingull poster' }, // "sky"
  { filename: 'rsrh075.png', category: 'wall', size: [2, 1], alt: 'smoochum poster' }, // "kiss"
  { filename: 'rsrh076.png', category: 'doll_small', size: [1, 1], alt: 'pichu doll' },
  { filename: 'rsrh077.png', category: 'doll_small', size: [1, 1], alt: 'pikachu doll' },
  { filename: 'rsrh078.png', category: 'doll_small', size: [1, 1], alt: 'marill doll' },
  { filename: 'rsrh079.png', category: 'doll_small', size: [1, 1], alt: 'togepi doll' },
  { filename: 'rsrh080.png', category: 'doll_small', size: [1, 1], alt: 'cyndaquil doll' },
  { filename: 'rsrh081.png', category: 'doll_small', size: [1, 1], alt: 'chikorita doll' },
  { filename: 'rsrh082.png', category: 'doll_small', size: [1, 1], alt: 'totodile doll' },
  { filename: 'rsrh083.png', category: 'doll_small', size: [1, 1], alt: 'jigglypuff doll' },
  { filename: 'rsrh084.png', category: 'doll_small', size: [1, 1], alt: 'meowth doll' },
  { filename: 'rsrh085.png', category: 'doll_small', size: [1, 1], alt: 'clefairy doll' },
  { filename: 'rsrh086.png', category: 'doll_small', size: [1, 1], alt: 'ditto doll' },
  { filename: 'rsrh087.png', category: 'doll_small', size: [1, 1], alt: 'smoochum doll' },
  { filename: 'rsrh088.png', category: 'doll_small', size: [1, 1], alt: 'treecko doll' },
  { filename: 'rsrh089.png', category: 'doll_small', size: [1, 1], alt: 'torchic doll' },
  { filename: 'rsrh090.png', category: 'doll_small', size: [1, 1], alt: 'mudkip doll' },
  { filename: 'rsrh091.png', category: 'doll_small', size: [1, 1], alt: 'duskull doll' },
  { filename: 'rsrh092.png', category: 'doll_small', size: [1, 1], alt: 'wynaut doll' },
  { filename: 'rsrh093.png', category: 'doll_small', size: [1, 1], alt: 'baltoy doll' },
  { filename: 'rsrh094.png', category: 'doll_small', size: [1, 1], alt: 'kecleon doll' },
  { filename: 'rsrh095.png', category: 'doll_small', size: [1, 1], alt: 'azurill doll' },
  { filename: 'rsrh096.png', category: 'doll_small', size: [1, 1], alt: 'skitty doll' },
  { filename: 'rsrh097.png', category: 'doll_small', size: [1, 1], alt: 'swablu doll' },
  { filename: 'rsrh098.png', category: 'doll_small', size: [1, 1], alt: 'gulpin doll' },
  { filename: 'rsrh099.png', category: 'doll_small', size: [1, 1], alt: 'lotad doll' },
  { filename: 'rsrh100.png', category: 'doll_small', size: [1, 1], alt: 'seedot doll' },
  { filename: 'rsrh101.png', category: 'cushion', size: [1, 1], alt: 'pika cushion' },
  { filename: 'rsrh102.png', category: 'cushion', size: [1, 1], alt: 'round cushion' },
  { filename: 'rsrh103.png', category: 'cushion', size: [1, 1], alt: 'kiss cushion' },
  { filename: 'rsrh104.png', category: 'cushion', size: [1, 1], alt: 'zigzag cushion' },
  { filename: 'rsrh105.png', category: 'cushion', size: [1, 1], alt: 'spin cushion' },
  { filename: 'rsrh106.png', category: 'cushion', size: [1, 1], alt: 'diamond cushion' },
  { filename: 'rsrh107.png', category: 'cushion', size: [1, 1], alt: 'ball cushion' },
  { filename: 'rsrh108.png', category: 'cushion', size: [1, 1], alt: 'grass cushion' },
  { filename: 'rsrh109.png', category: 'cushion', size: [1, 1], alt: 'fire cushion' },
  { filename: 'rsrh110.png', category: 'cushion', size: [1, 1], alt: 'water cushion' },
  { filename: 'rsrh111.png', category: 'doll_large', size: [2, 2], alt: 'snorlax doll' },
  { filename: 'rsrh112.png', category: 'doll_large', size: [2, 2], alt: 'rhydon doll' },
  { filename: 'rsrh113.png', category: 'doll_large', size: [2, 2], alt: 'lapras doll' },
  { filename: 'rsrh114.png', category: 'doll_large', size: [2, 2], alt: 'venusaur doll' },
  { filename: 'rsrh115.png', category: 'doll_large', size: [2, 2], alt: 'charizard doll' },
  { filename: 'rsrh116.png', category: 'doll_large', size: [2, 2], alt: 'blastoise doll' },
  { filename: 'rsrh117.png', category: 'doll_large', size: [2, 2], alt: 'wailmer doll' },
  { filename: 'rsrh118.png', category: 'doll_large', size: [2, 2], alt: 'regirock doll' },
  { filename: 'rsrh119.png', category: 'doll_large', size: [2, 2], alt: 'regice doll' },
  { filename: 'rsrh120.png', category: 'doll_large', size: [2, 2], alt: 'registeel doll' },
  { filename: 'laptop.png', category: 'device', size: [1, 1], alt: 'laptop', unofficial: true },
  { filename: 'pc.png', category: 'device', size: [1, 2], alt: 'pc', unofficial: true },
  { filename: 'gamecube.png', category: 'device', size: [1, 1], alt: 'gamecube', unofficial: true },
  { filename: 'map.png', category: 'wall', size: [2, 1], alt: 'map', unofficial: true },
  { filename: 'pikachu_poster.png', category: 'wall', size: [1, 1], alt: 'pikachu poster', unofficial: true },
  { filename: 'plant1.png', category: 'plant', size: [1, 2], alt: 'potted plant', unofficial: true },
  { filename: 'plant2.png', category: 'plant', size: [1, 2], alt: 'potted plant', unofficial: true },
] as const;

export const ITEMS_MAP = new Map(ITEMS.map(item => ([item.filename, item])));

export const CATEGORIES = [
  { id: 'table_small', label: 'tables (small)' },
  { id: 'table_medium', label: 'tables (medium)' },
  { id: 'table_large', label: 'tables (large)' },
  { id: 'chair', label: 'chairs' },
  { id: 'plant', label: 'plants' },
  { id: 'device', label: 'devices' },
  { id: 'floor_small', label: 'small mats' },
  { id: 'floor_large', label: 'large mats' },
  { id: 'wall', label: 'posters' },
  { id: 'cushion', label: 'cushions' },
  { id: 'doll_small', label: 'small dolls' },
  { id: 'doll_large', label: 'large dolls' },
  { id: 'misc', label: 'miscellaneous' },
] as const;
