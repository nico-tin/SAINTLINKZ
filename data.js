// ===== PRICING CONFIGURATION =====
export const PRICING = {
  SILVER: { regular: 35, dangle: 50, premium: 80 },
  GOLD: { regular: 45, dangle: 60, premium: 80 }
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
  "SILVER - DANGLE": [
    { id: 91, price: 50, isDangle: true },
    { id: 92, price: 50, isDangle: true },
    { id: 93, price: 50, isDangle: true },
    { id: 94, price: 50, isDangle: true },
    { id: 95, price: 50, isDangle: true },
  ],
  "SILVER - PREMIUM": [
    { id: 86, price: 80 },
    { id: 87, price: 80 },
    { id: 88, price: 80 },
    { id: 89, price: 80 },
    { id: 90, price: 80 },
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
    { id: 91, price: 60, isDangle: true },
    { id: 92, price: 60, isDangle: true },
    { id: 93, price: 60, isDangle: true },
    { id: 94, price: 60, isDangle: true },
    { id: 95, price: 60, isDangle: true },
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
  return category.includes("GOLD") ? "GOLD" : "SILVER";
}

/**
 * Extract base category name (remove SILVER/GOLD prefix)
 */
export function getBaseCategory(category) {
  return category.replace(/^SILVER - /, '').replace(/^GOLD - /, '');
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
    return `premiumimages/CAR EMBLEMS/${newName}.png`;
  }
  
  if (charmType === CHARM_TYPES.DANGLE) {
    return `silverdanglyiamges/${newName}.png`;
  }
  
  return `popularimages/${metal}/${folderName}/${newName}.png`;
}

/**
 * Get price for a charm based on metal and type
 */
export function getCharmPrice(id, category) {
  const metal = getMetalFromCategory(category);
  const charmType = getCharmType(category);
  
  const priceKey = metal === "GOLD" ? "GOLD" : "SILVER";
  const typeKey = charmType === CHARM_TYPES.DANGLE ? "dangle" : (charmType === CHARM_TYPES.PREMIUM ? "premium" : "regular");
  
  return PRICING[priceKey]?.[typeKey] || 0;
}

/**
 * Get all categories organized by metal type
 */
export function getCategoriesByMetal(metal) {
  const prefix = metal === "GOLD" ? "GOLD - " : "SILVER - ";
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
