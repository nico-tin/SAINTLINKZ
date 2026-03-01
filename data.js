// ===== INVENTORY SYSTEM =====
let inventoryData = {};

export async function loadInventory() {
  try {
    const response = await fetch('./inventory.json');
    const data = await response.json();
    inventoryData = data.charms || {};
  } catch (error) {
    console.warn('Could not load inventory.json:', error);
    // Fallback: all charms in stock
    inventoryData = {};
  }
}

export function getCharmStock(id) {
  const id_str = id.toString();
  return inventoryData[id_str] !== undefined ? inventoryData[id_str] : 10;
}

export function isCharmInStock(id) {
  return getCharmStock(id) > 0;
}

// ===== PRICING CONFIGURATION =====
export const PRICING = {
  SILVER: { regular: 35, dangle: 50, premium: 90, plain: 15 },
  GOLD: { regular: 45, dangle: 60, premium: 90, plain: 20 },
  PINK: { regular: 35, dangle: 60, premium: 80, plain: 20 }
};

// ===== CHARM TYPES =====
export const CHARM_TYPES = {
  REGULAR: 'regular',
  DANGLE: 'dangle',
  PREMIUM: 'premium',
  PLAIN: 'plain'
};

// ===== CATEGORY METADATA FOR UI =====
export const CATEGORY_INFO = {
  "ALBUMS & ARTIST": { icon: "🎵", description: "Music & Artists" },
  "BRANDS": { icon: "🏷️", description: "Popular Brands" },
  "COQUETTE": { icon: "💕", description: "Cute & Romantic" },
  "COUPLE": { icon: "👫", description: "Couple Themes" },
  "F1": { icon: "🏎️", description: "Formula 1" },
  "I LOVE": { icon: "❤️", description: "I Love..." },
  "TRENDY": { icon: "⭐", description: "Popular Picks" },
  "DANGLE": { icon: "✨", description: "Dangle Charms" },
  "PINK - DANGLE": { icon: "🎀", description: "Pink Dangle Charms" },
  "PLAIN": { icon: "◻️", description: "Plain Charms" },
  "PREMIUM": { icon: "👑", description: "Premium Metal Charms"}
};

// Charm data organized by category - SILVER and GOLD sections
export const CHARM_CATEGORIES = {
  // ===== SILVER SECTION =====
  "SILVER - ALBUMS & ARTIST": [
    { id: 24, price: 35 },
    { id: 53, price: 35 },
    { id: 55, price: 35 },
    { id: 58, price: 35 },
    { id: 59, price: 35 },
    { id: 60, price: 35 },
    { id: 61, price: 35 },
    { id: 62, price: 35 },
    { id: 63, price: 35 },
    { id: 64, price: 35 },
    { id: 65, price: 35 },
    { id: 66, price: 35 },
    { id: 67, price: 35 },
    { id: 73, price: 35 },
    { id: 74, price: 35 },
    { id: 79, price: 35 },
    { id: 80, price: 35 },
    { id: 81, price: 35 },
    { id: 82, price: 35 },
    { id: 83, price: 35 },
    { id: 84, price: 35 },
  ],
  "SILVER - BRANDS": [
    { id: 14, price: 35 },
    { id: 15, price: 35 },
    { id: 17, price: 35 },
    { id: 18, price: 35 },
    { id: 19, price: 35 },
    { id: 20, price: 35 },
    { id: 21, price: 35 },
    { id: 39, price: 35 },
  ],
  "SILVER - COQUETTE": [
    { id: 33, price: 35 },
    { id: 34, price: 35 },
    { id: 35, price: 35 },
    { id: 36, price: 35 },
    { id: 37, price: 35 },
    { id: 41, price: 35 },
  ],
  "SILVER - COUPLE": [
    { id: 29, price: 35 },
    { id: 30, price: 35 },
    { id: 31, price: 35 },
    { id: 32, price: 35 },
    { id: 46, price: 35 },
  ],
  "SILVER - F1": [
    { id: 6, price: 35 },
    { id: 7, price: 35 },
    { id: 8, price: 35 },
    { id: 9, price: 35 },
    { id: 10, price: 35 },
    { id: 11, price: 35 },
    { id: 12, price: 35 },
    { id: 13, price: 35 },
    { id: 23, price: 35 },
  ],
  "SILVER - I LOVE": [
    { id: 26, price: 35 },
    { id: 27, price: 35 },
    { id: 28, price: 35 },
    { id: 72, price: 35 },
  ],
  "SILVER - TRENDY": [
    { id: 16, price: 35 },
    { id: 22, price: 35 },
    { id: 25, price: 35 },
    { id: 38, price: 35 },
    { id: 40, price: 35 },
    { id: 42, price: 35 },
    { id: 43, price: 35 },
    { id: 44, price: 35 },
    { id: 45, price: 35 },
    { id: 47, price: 35 },
    { id: 48, price: 35 },
    { id: 49, price: 35 },
    { id: 50, price: 35 },
    { id: 51, price: 35 },
    { id: 52, price: 35 },
    { id: 54, price: 35 },
    { id: 56, price: 35 },
    { id: 57, price: 35 },
    { id: 68, price: 35 },
    { id: 69, price: 35 },
    { id: 70, price: 35 },
    { id: 71, price: 35 },
    { id: 75, price: 35 },
    { id: 76, price: 35 },
    { id: 77, price: 35 },
    { id: 78, price: 35 },
  ],
  "PINK - DANGLE": [
    // Uploaded pink dangly images (DAN06-DAN16 mapped to ids 134-144)
    { id: 134, price: 60, isDangle: true }, { id: 135, price: 60, isDangle: true }, { id: 136, price: 60, isDangle: true },
    { id: 137, price: 60, isDangle: true }, { id: 138, price: 60, isDangle: true }, { id: 139, price: 60, isDangle: true },
    { id: 140, price: 60, isDangle: true }, { id: 141, price: 60, isDangle: true }, { id: 142, price: 60, isDangle: true },
    { id: 143, price: 60, isDangle: true }, { id: 144, price: 60, isDangle: true },
    // New pink dangle items (PDAN12-PDAN13 -> IDs 380-381)
    { id: 380, price: 60, isDangle: true }, { id: 381, price: 60, isDangle: true }
  ],
  "SILVER - DANGLE": [
    { id: 91, price: 50, isDangle: true },
    { id: 92, price: 50, isDangle: true },
    { id: 93, price: 50, isDangle: true },
    { id: 94, price: 50, isDangle: true },
    { id: 95, price: 50, isDangle: true },
    // Newly uploaded silver dangle items (SDAN06-SDAN15 -> IDs 96-105)
    { id: 96, price: 50, isDangle: true }, { id: 97, price: 50, isDangle: true }, { id: 98, price: 50, isDangle: true },
    { id: 99, price: 50, isDangle: true }, { id: 100, price: 50, isDangle: true }, { id: 101, price: 50, isDangle: true },
    { id: 102, price: 50, isDangle: true }, { id: 103, price: 50, isDangle: true }, { id: 104, price: 50, isDangle: true },
    { id: 105, price: 50, isDangle: true },
  ],
  "SILVER - PREMIUM": [
    // Removed placeholder premium items (previously IDs 86-90)
    // Newly uploaded silver premium items (PRM25-PRM43)
    { id: 201, price: 90 }, { id: 202, price: 90 }, { id: 203, price: 90 }, { id: 204, price: 90 }, { id: 205, price: 90 },
    { id: 206, price: 90 }, { id: 207, price: 90 }, { id: 208, price: 90 }, { id: 209, price: 90 }, { id: 210, price: 90 },
    { id: 211, price: 90 }, { id: 212, price: 90 }, { id: 213, price: 90 }, { id: 214, price: 90 }, { id: 215, price: 90 },
    { id: 216, price: 90 }, { id: 217, price: 90 }, { id: 218, price: 90 }, { id: 219, price: 90 },
    // Newly uploaded silver-specific premium items (SPRM01-SPRM05 -> IDs 220-224)
    { id: 220, price: 90 }, { id: 221, price: 90 }, { id: 222, price: 90 }, { id: 223, price: 90 }, { id: 224, price: 90 },
    // New silver premium items (SPRM30-SPRM44 -> IDs 360-374)
    { id: 360, price: 90 }, { id: 361, price: 90 }, { id: 362, price: 90 }, { id: 363, price: 90 }, { id: 364, price: 90 },
    { id: 365, price: 90 }, { id: 366, price: 90 }, { id: 367, price: 90 }, { id: 368, price: 90 }, { id: 369, price: 90 },
    { id: 370, price: 90 }, { id: 371, price: 90 }, { id: 372, price: 90 }, { id: 373, price: 90 }, { id: 374, price: 90 }
  ],

  // ===== GOLD SECTION =====
  "GOLD - ALBUMS & ARTIST": [
    { id: 24, price: 45 },
    { id: 53, price: 45 },
    { id: 55, price: 45 },
    { id: 58, price: 45 },
    { id: 59, price: 45 },
    { id: 60, price: 45 },
    { id: 61, price: 45 },
    { id: 62, price: 45 },
    { id: 63, price: 45 },
    { id: 64, price: 45 },
    { id: 65, price: 45 },
    { id: 66, price: 45 },
    { id: 67, price: 45 },
    { id: 73, price: 45 },
    { id: 74, price: 45 },
    { id: 79, price: 45 },
    { id: 80, price: 45 },
    { id: 81, price: 45 },
    { id: 82, price: 45 },
    { id: 83, price: 45 },
    { id: 84, price: 45 },
  ],
  "GOLD - BRANDS": [
    { id: 14, price: 45 },
    { id: 15, price: 45 },
    { id: 17, price: 45 },
    { id: 18, price: 45 },
    { id: 19, price: 45 },
    { id: 20, price: 45 },
    { id: 21, price: 45 },
    { id: 39, price: 45 },
  ],
  "GOLD - COQUETTE": [
    { id: 33, price: 45 },
    { id: 34, price: 45 },
    { id: 35, price: 45 },
    { id: 36, price: 45 },
    { id: 37, price: 45 },
    { id: 41, price: 45 },
  ],
  "GOLD - COUPLE": [
    { id: 29, price: 45 },
    { id: 30, price: 45 },
    { id: 31, price: 45 },
    { id: 32, price: 45 },
    { id: 46, price: 45 },
  ],
  "GOLD - F1": [
    { id: 6, price: 45 },
    { id: 7, price: 45 },
    { id: 8, price: 45 },
    { id: 9, price: 45 },
    { id: 10, price: 45 },
    { id: 11, price: 45 },
    { id: 12, price: 45 },
    { id: 13, price: 45 },
    { id: 23, price: 45 },
  ],
  "GOLD - I LOVE": [
    { id: 26, price: 45 },
    { id: 27, price: 45 },
    { id: 28, price: 45 },
    { id: 72, price: 45 },
  ],
  "GOLD - TRENDY": [
    { id: 16, price: 45 },
    { id: 22, price: 45 },
    { id: 25, price: 45 },
    { id: 38, price: 45 },
    { id: 40, price: 45 },
    { id: 42, price: 45 },
    { id: 43, price: 45 },
    { id: 44, price: 45 },
    { id: 45, price: 45 },
    { id: 47, price: 45 },
    { id: 48, price: 45 },
    { id: 49, price: 45 },
    { id: 50, price: 45 },
    { id: 51, price: 45 },
    { id: 52, price: 45 },
    { id: 54, price: 45 },
    { id: 56, price: 45 },
    { id: 57, price: 45 },
    { id: 68, price: 45 },
    { id: 69, price: 45 },
    { id: 70, price: 45 },
    { id: 71, price: 45 },
    { id: 75, price: 45 },
    { id: 76, price: 45 },
    { id: 77, price: 45 },
    { id: 78, price: 45 },
  ],
  "GOLD - DANGLE": [
    // Newly uploaded gold dangly items (GDAN01-GDAN15 -> IDs 145-159)
    { id: 145, price: 60, isDangle: true }, { id: 146, price: 60, isDangle: true }, { id: 147, price: 60, isDangle: true },
    { id: 148, price: 60, isDangle: true }, { id: 149, price: 60, isDangle: true }, { id: 150, price: 60, isDangle: true },
    { id: 151, price: 60, isDangle: true }, { id: 152, price: 60, isDangle: true }, { id: 153, price: 60, isDangle: true },
    { id: 154, price: 60, isDangle: true }, { id: 155, price: 60, isDangle: true }, { id: 156, price: 60, isDangle: true },
    { id: 157, price: 60, isDangle: true }, { id: 158, price: 60, isDangle: true }, { id: 159, price: 60, isDangle: true },
  ],
  "GOLD - PREMIUM": [
    // Newly uploaded gold premium items only (PRM06-PRM24, IDs 115-133)
    { id: 115, price: 90 }, { id: 116, price: 90 }, { id: 117, price: 90 }, { id: 118, price: 90 }, { id: 119, price: 90 },
    { id: 120, price: 90 }, { id: 121, price: 90 }, { id: 122, price: 90 }, { id: 123, price: 90 }, { id: 124, price: 90 },
    { id: 125, price: 90 }, { id: 126, price: 90 }, { id: 127, price: 90 }, { id: 128, price: 90 }, { id: 129, price: 90 },
    { id: 130, price: 90 }, { id: 131, price: 90 }, { id: 132, price: 90 }, { id: 133, price: 90 },
    // New gold premium items (GPRM20-GPRM21 -> IDs 350-351)
    { id: 350, price: 90 }, { id: 351, price: 90 }
  ],
  // Single consolidated plain charms category (not separated by metal)
  "PLAIN": [
    { id: 301, price: 20, metal: 'GOLD' },
    { id: 302, price: 20, metal: 'PINK' },
    { id: 303, price: 15, metal: 'SILVER' },
    { id: 304, price: 20 }, { id: 305, price: 20 },
    {id: 306, price:20}, {id: 307, price: 20},
    {id: 308, price: 40}, {id: 309, price: 50},
  ],
};

// ===== UTILITY FUNCTIONS =====

/**
 * Extract metal type from category (SILVER or GOLD)
 */
export function getMetalFromCategory(category) {
  if (category.includes("GOLD")) return "GOLD";
  if (category.includes("PINK")) return "PINK";
  return "SILVER";
}

/**
 * Extract base category name (remove SILVER/GOLD prefix)
 */
export function getBaseCategory(category) {
  return category.replace(/^SILVER - /, '').replace(/^GOLD - /, '').replace(/^PINK - /, '');
}

/**
 * Get charm type from category
 */
export function getCharmType(category) {
  if (category.includes("PREMIUM")) return CHARM_TYPES.PREMIUM;
  if (category.includes("DANGLE")) return CHARM_TYPES.DANGLE;
  if (category.includes("PLAIN")) return CHARM_TYPES.PLAIN;
  return CHARM_TYPES.REGULAR;
}

/**
 * Get image URL for a charm
 */
export function getCharmImageUrl(id, category, metalOverride) {
  const metal = metalOverride || getMetalFromCategory(category);
  const charmType = getCharmType(category);
  const newName = getCharmNewName(id);
  const folderName = getFolderName(category);
  const metalLower = metal.toLowerCase();
  
  if (charmType === CHARM_TYPES.PREMIUM) {
    // Premium charms in images/[metal]/premium/
    return `images/${metalLower}/premium/${newName}.png`;
  }

  if (charmType === CHARM_TYPES.DANGLE) {
    // Dangle charms in images/[metal]/dangle/
    return `images/${metalLower}/dangle/${newName}.png`;
  }

  if (charmType === CHARM_TYPES.PLAIN) {
    // Plain charms in images/plain/ — use the mapped filename when available
    return `images/plain/${newName}.png`;
  }
  
  // Regular charms in images/[metal]/regular/[category]/
  return `images/${metalLower}/regular/${folderName}/${newName}.png`;
}

/**
 * Get price for a charm based on metal and type
 */
export function getCharmPrice(id, category, metalOverride) {
  const metal = metalOverride || getMetalFromCategory(category);
  const charmType = getCharmType(category);

  const priceKey = metal === "GOLD" ? "GOLD" : (metal === 'PINK' ? 'PINK' : 'SILVER');
  const typeKey = charmType === CHARM_TYPES.DANGLE ? "dangle" : (charmType === CHARM_TYPES.PREMIUM ? "premium" : (charmType === CHARM_TYPES.PLAIN ? 'plain' : 'regular'));

  return PRICING[priceKey]?.[typeKey] || 0;
}

export function getCharmCountInCategory(category) {
  return CHARM_CATEGORIES[category]?.length || 0;
}

/**
 * Get category info (icon and description)
 */
export function getCategoryInfo(category) {
  const baseCategory = getBaseCategory(category);
  return CATEGORY_INFO[baseCategory] || { icon: "🎁", description: baseCategory };
}

/**
 * Map charm ID to new modular filename
 */
export function getCharmNewName(id) {
  const idMapping = {
    24: "ALB01", 53: "ALB02", 55: "ALB03", 58: "ALB04", 59: "ALB05",
    60: "ALB06", 61: "ALB07", 62: "ALB08", 63: "ALB09", 64: "ALB10",
    65: "ALB11", 66: "ALB12", 67: "ALB13", 73: "ALB14", 74: "ALB15",
    79: "ALB16", 80: "ALB17", 81: "ALB18", 82: "ALB19", 83: "ALB20", 84: "ALB21",
    14: "BRA01", 15: "BRA02", 17: "BRA03", 18: "BRA04", 19: "BRA05",
    20: "BRA06", 21: "BRA07", 39: "BRA08",
    33: "COQ01", 34: "COQ02", 35: "COQ03", 36: "COQ04", 37: "COQ05", 41: "COQ06",
    29: "COU01", 30: "COU02", 31: "COU03", 32: "COU04", 46: "COU05",
    6: "F101", 7: "F102", 8: "F103", 9: "F104", 10: "F105",
    11: "F106", 12: "F107", 13: "F108", 23: "F109",
    26: "ILO01", 27: "ILO02", 28: "ILO03", 72: "ILO04",
    16: "TEM01", 22: "TEM02", 25: "TEM03", 38: "TEM04", 40: "TEM05",
    42: "TEM06", 43: "TEM07", 44: "TEM08", 45: "TEM09", 47: "TEM10",
    48: "TEM11", 49: "TEM12", 50: "TEM13", 51: "TEM14", 52: "TEM15",
    54: "TEM16", 56: "TEM17", 57: "TEM18", 68: "TEM19", 69: "TEM20",
    70: "TEM21", 71: "TEM22", 75: "TEM23", 76: "TEM24", 77: "TEM25", 78: "TEM26",
    91: "SDAN01", 92: "SDAN02", 93: "SDAN03", 94: "SDAN04", 95: "SDAN05",
    // Newly uploaded silver dangle mapping (96-105 -> SDAN06-SDAN15)
    96: "SDAN06", 97: "SDAN07", 98: "SDAN08", 99: "SDAN09", 100: "SDAN10",
    101: "SDAN11", 102: "SDAN12", 103: "SDAN13", 104: "SDAN14", 105: "SDAN15",
    // Gold premium uploaded (115-133 -> PRM06-PRM24)
    // Renumbered gold premium to start at GPRM01
    115: "GPRM01", 116: "GPRM02", 117: "GPRM03", 118: "GPRM04", 119: "GPRM05",
    120: "GPRM06", 121: "GPRM07", 122: "GPRM08", 123: "GPRM09", 124: "GPRM10",
    125: "GPRM11", 126: "GPRM12", 127: "GPRM13", 128: "GPRM14", 129: "GPRM15",
    130: "GPRM16", 131: "GPRM17", 132: "GPRM18", 133: "GPRM19",
    // New gold premium (350-351 -> GPRM20-GPRM21)
    350: "GPRM20", 351: "GPRM21",
    // Pink dangly uploaded (134-144 -> DAN06-DAN16)
    134: "PDAN01", 135: "PDAN02", 136: "PDAN03", 137: "PDAN04", 138: "PDAN05",
    139: "PDAN06", 140: "PDAN07", 141: "PDAN08", 142: "PDAN09", 143: "PDAN10", 144: "PDAN11",
    // Gold dangly uploaded (145-159 -> DAN17-DAN31)
    145: "GDAN01", 146: "GDAN02", 147: "GDAN03", 148: "GDAN04", 149: "GDAN05",
    150: "GDAN06", 151: "GDAN07", 152: "GDAN08", 153: "GDAN09", 154: "GDAN10",
    155: "GDAN11", 156: "GDAN12", 157: "GDAN13", 158: "GDAN14", 159: "GDAN15",
    // Silver premium uploaded -> map new ids 201-219 to SPRM06-SPRM24
    201: "SPRM06", 202: "SPRM07", 203: "SPRM08", 204: "SPRM09", 205: "SPRM10",
    206: "SPRM11", 207: "SPRM12", 208: "SPRM13", 209: "SPRM14", 210: "SPRM15",
    211: "SPRM16", 212: "SPRM17", 213: "SPRM18", 214: "SPRM19", 215: "SPRM20",
    216: "SPRM21", 217: "SPRM22", 218: "SPRM23", 219: "SPRM24",
    220: "SPRM25", 221: "SPRM26", 222: "SPRM27", 223: "SPRM28", 224: "SPRM29",
    // New silver premium (360-374 -> SPRM30-SPRM44)
    360: "SPRM30", 361: "SPRM31", 362: "SPRM32", 363: "SPRM33", 364: "SPRM34",
    365: "SPRM35", 366: "SPRM36", 367: "SPRM37", 368: "SPRM38", 369: "SPRM39",
    370: "SPRM40", 371: "SPRM41", 372: "SPRM42", 373: "SPRM43", 374: "SPRM44",
    // New pink dangle (380-381 -> PDAN12-PDAN13)
    380: "PDAN12", 381: "PDAN13",
    // Newly added plain images
    304: "VPLAIN", 305: "BPLAIN",
    // Plain images mapping
    301: "GPLAIN", 302: "PPLAIN", 303: "SPLAIN", 306: "HPLAIN", 307: "FPLAIN", 308: "GCPLAIN", 309: "SCPLAIN"
  };
  return idMapping[id] || id.toString();
}

/**
 * Get folder name from category (short prefix)
 */
export function getFolderName(category) {
  const folderMap = {
    "ALBUMS & ARTIST": "ALB",
    "BRANDS": "BRA",
    "COQUETTE": "COQ",
    "COUPLE": "COU",
    "F1": "F1",
    "I LOVE": "ILO",
    "TRENDY": "TEM",
    "DANGLE": "DAN",
    "PREMIUM": "PRM"
  };
  const baseCategory = getBaseCategory(category);
  return folderMap[baseCategory] || baseCategory;
}
