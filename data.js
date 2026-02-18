// ===== PRICING CONFIGURATION =====
export const PRICING = {
  SILVER: { regular: 35, dangle: 40, premium: 80 },
  GOLD: { regular: 45, dangle: 50, premium: 80 },
  PINK: { regular: 35, dangle: 50, premium: 80 }
};

// ===== CHARM TYPES =====
export const CHARM_TYPES = {
  REGULAR: 'regular',
  DANGLE: 'dangle',
  PREMIUM: 'premium'
};

// ===== CATEGORY METADATA FOR UI =====
export const CATEGORY_INFO = {
  "ALBUMS & ARTIST": { icon: "🎵", description: "Music & Artists" },
  "BRANDS": { icon: "🏷️", description: "Popular Brands" },
  "COQUETTE": { icon: "💕", description: "Cute & Romantic" },
  "COUPLE": { icon: "👫", description: "Couple Themes" },
  "F1": { icon: "🏎️", description: "Formula 1" },
  "I LOVE": { icon: "❤️", description: "I Love..." },
  "TEMP": { icon: "⭐", description: "Popular Picks" },
  "DANGLE": { icon: "✨", description: "Dangle Charms" },
  "PINK - DANGLE": { icon: "🎀", description: "Pink Dangle Charms" },
  "PREMIUM": { icon: "👑", description: "Premium Car Emblems" }
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
  "SILVER - TEMP": [
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
    { id: 134, price: 50, isDangle: true }, { id: 135, price: 50, isDangle: true }, { id: 136, price: 50, isDangle: true },
    { id: 137, price: 50, isDangle: true }, { id: 138, price: 50, isDangle: true }, { id: 139, price: 50, isDangle: true },
    { id: 140, price: 50, isDangle: true }, { id: 141, price: 50, isDangle: true }, { id: 142, price: 50, isDangle: true },
    { id: 143, price: 50, isDangle: true }, { id: 144, price: 50, isDangle: true }
  ],
  "SILVER - DANGLE": [
    { id: 91, price: 40, isDangle: true },
    { id: 92, price: 40, isDangle: true },
    { id: 93, price: 40, isDangle: true },
    { id: 94, price: 40, isDangle: true },
    { id: 95, price: 40, isDangle: true },
  ],
  "SILVER - PREMIUM": [
    { id: 86, price: 80 },
    { id: 87, price: 80 },
    { id: 88, price: 80 },
    { id: 89, price: 80 },
    { id: 90, price: 80 },
    // Newly uploaded silver premium items (PRM25-PRM43)
    { id: 201, price: 80 }, { id: 202, price: 80 }, { id: 203, price: 80 }, { id: 204, price: 80 }, { id: 205, price: 80 },
    { id: 206, price: 80 }, { id: 207, price: 80 }, { id: 208, price: 80 }, { id: 209, price: 80 }, { id: 210, price: 80 },
    { id: 211, price: 80 }, { id: 212, price: 80 }, { id: 213, price: 80 }, { id: 214, price: 80 }, { id: 215, price: 80 },
    { id: 216, price: 80 }, { id: 217, price: 80 }, { id: 218, price: 80 }, { id: 219, price: 80 }
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
  "GOLD - PREMIUM": [
    // Newly uploaded gold premium items (PRM06-PRM24)
    { id: 115, price: 80 }, { id: 116, price: 80 }, { id: 117, price: 80 }, { id: 118, price: 80 }, { id: 119, price: 80 },
    { id: 120, price: 80 }, { id: 121, price: 80 }, { id: 122, price: 80 }, { id: 123, price: 80 }, { id: 124, price: 80 },
    { id: 125, price: 80 }, { id: 126, price: 80 }, { id: 127, price: 80 }, { id: 128, price: 80 }, { id: 129, price: 80 },
    { id: 130, price: 80 }, { id: 131, price: 80 }, { id: 132, price: 80 }, { id: 133, price: 80 }
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
  "GOLD - TEMP": [
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
    { id: 91, price: 50, isDangle: true },
    { id: 92, price: 50, isDangle: true },
    { id: 93, price: 50, isDangle: true },
    { id: 94, price: 50, isDangle: true },
    { id: 95, price: 50, isDangle: true },
  ],
  "GOLD - PREMIUM": [
    { id: 86, price: 80 },
    { id: 87, price: 80 },
    { id: 88, price: 80 },
    { id: 89, price: 80 },
    { id: 90, price: 80 },
  ],
};

export const IMAGE_BASE_URL = 'popularimages';
export const IMAGE_GOLD_URL = 'popularimages';

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
  return CHARM_TYPES.REGULAR;
}

/**
 * Get image URL for a charm
 */
export function getCharmImageUrl(id, category) {
  const metal = getMetalFromCategory(category);
  const charmType = getCharmType(category);
  const newName = getCharmNewName(id);
  const folderName = getFolderName(category);
  if (charmType === CHARM_TYPES.PREMIUM) {
    // Original car emblems (86-90) always use CAR EMBLEMS folder
    if (id >= 86 && id <= 90) return `premiumimages/CAR EMBLEMS/${newName}.png`;
    // New gold premium (115-133) use GOLD PREMIUM folder
    if (id >= 115 && id <= 133) return `premiumimages/GOLD PREMIUM/${newName}.png`;
    // New silver premium (201-219) use SILVER PREMIUM folder
    if (id >= 201 && id <= 219) return `premiumimages/SILVER PREMIUM/${newName}.png`;
    // Fallback for any other premium
    return `premiumimages/CAR EMBLEMS/${newName}.png`;
  }

  if (charmType === CHARM_TYPES.DANGLE) {
    // Use pink dangly folder when category indicates PINK, otherwise silver dangly
    if (category.includes("PINK")) {
      return `pinkdanglyimages/${newName}.png`;
    }
    return `silverdanglyimages/${newName}.png`;
  }
  
  return `popularimages/${metal}/${folderName}/${newName}.png`;
}

/**
 * Get price for a charm based on metal and type
 */
export function getCharmPrice(id, category) {
  const metal = getMetalFromCategory(category);
  const charmType = getCharmType(category);

  const priceKey = metal === "GOLD" ? "GOLD" : (metal === 'PINK' ? 'PINK' : 'SILVER');
  const typeKey = charmType === CHARM_TYPES.DANGLE ? "dangle" : (charmType === CHARM_TYPES.PREMIUM ? "premium" : "regular");

  return PRICING[priceKey]?.[typeKey] || 0;
}

/**
 * Get all categories organized by metal type
 */
export function getCategoriesByMetal(metal) {
  const prefix = metal === "GOLD" ? "GOLD - " : (metal === 'PINK' ? 'PINK - ' : 'SILVER - ');
  return Object.keys(CHARM_CATEGORIES).filter(cat => cat.startsWith(prefix));
}

/**
 * Get charm count in a category
 */
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
    91: "DAN01", 92: "DAN02", 93: "DAN03", 94: "DAN04", 95: "DAN05",
    86: "PRM01", 87: "PRM02", 88: "PRM03", 89: "PRM04", 90: "PRM05"
    ,
    // Gold premium uploaded (115-133 -> PRM06-PRM24)
    115: "PRM06", 116: "PRM07", 117: "PRM08", 118: "PRM09", 119: "PRM10",
    120: "PRM11", 121: "PRM12", 122: "PRM13", 123: "PRM14", 124: "PRM15",
    125: "PRM16", 126: "PRM17", 127: "PRM18", 128: "PRM19", 129: "PRM20",
    130: "PRM21", 131: "PRM22", 132: "PRM23", 133: "PRM24",
    // Pink dangly uploaded (134-144 -> DAN06-DAN16)
    134: "DAN06", 135: "DAN07", 136: "DAN08", 137: "DAN09", 138: "DAN10",
    139: "DAN11", 140: "DAN12", 141: "DAN13", 142: "DAN14", 143: "DAN15", 144: "DAN16",
    // Silver premium uploaded -> map new ids 201-219 to PRM25-PRM43
    201: "PRM25", 202: "PRM26", 203: "PRM27", 204: "PRM28", 205: "PRM29",
    206: "PRM30", 207: "PRM31", 208: "PRM32", 209: "PRM33", 210: "PRM34",
    211: "PRM35", 212: "PRM36", 213: "PRM37", 214: "PRM38", 215: "PRM39",
    216: "PRM40", 217: "PRM41", 218: "PRM42", 219: "PRM43"
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
    "TEMP": "TEM",
    "DANGLE": "DAN",
    "PREMIUM": "PRM"
  };
  const baseCategory = getBaseCategory(category);
  return folderMap[baseCategory] || baseCategory;
}
