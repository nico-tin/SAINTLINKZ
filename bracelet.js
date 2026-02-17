// Bracelet management state and logic
let braceletItems = [];

export function getBraceletItems() {
  return [...braceletItems]; // Return a copy to prevent external mutations
}

export function addItem(item) {
  // Ensure item has all required properties
  const completeItem = {
    id: item.id,
    price: item.price,
    src: item.src,
    category: item.category,
    categoryIndex: item.categoryIndex !== undefined ? item.categoryIndex : 0, // Position in category array
    addedAt: new Date().getTime() // Track when item was added
  };
  braceletItems.push(completeItem);
}

export function removeItem(index) {
  if (index >= 0 && index < braceletItems.length) {
    braceletItems.splice(index, 1);
  }
}

export function clearBracelet() {
  braceletItems = [];
}

export function getTotalPrice() {
  return braceletItems.reduce((sum, item) => sum + (item.price || 0), 0);
}

export function getCharmCount() {
  return braceletItems.length;
}

// Category to single-character mapping for hex encoding
const CATEGORY_MAP = {
  "ALBUMS & ARTIST": "A",
  "BRANDS": "B",
  "COQUETTE": "C",
  "COUPLE": "U",
  "F1": "F",
  "I LOVE": "I",
  "TEMP": "T",
  "DANGLE": "D",
  "PREMIUM": "P"
};

// Reverse mapping for decoding
const REVERSE_CATEGORY_MAP = {
  "A": "ALBUMS & ARTIST",
  "B": "BRANDS",
  "C": "COQUETTE",
  "U": "COUPLE",
  "F": "F1",
  "I": "I LOVE",
  "T": "TEMP",
  "D": "DANGLE",
  "P": "PREMIUM"
};

export function generateCode() {
  if (braceletItems.length === 0) return '';
  
  // Maximum compression: Fixed 2-char Base36 per charm
  // Each charm = fixed Base36 value (0-1295)
  // Structure: (metal:1bit << 10) | (category:4bits << 6) | (index:6bits)
  // Result: 2 Base36 chars per charm (00-ZZ)
  // Example: A5B7C2 = 3 charms
  
  let base36Code = '';
  
  braceletItems.forEach(item => {
    // Metal: 0=Silver, 1=Gold
    const metalBit = item.category.includes("GOLD") ? 1 : 0;
    
    // Category: 0-15 (A-P maps to 0-15)
    const baseCat = item.category.replace(/^SILVER - /, '').replace(/^GOLD - /, '');
    const catIndex = Object.keys(CATEGORY_MAP).indexOf(baseCat);
    const categoryBits = catIndex !== -1 ? catIndex : 15; // Default to P if not found
    
    // Index: 0-63 (position in category, fits 6 bits)
    const indexBits = (item.categoryIndex !== undefined ? item.categoryIndex : (item.id & 0xFF)) & 0x3F;
    
    // Combine into single 11-bit value (0-1295)
    const charmValue = (metalBit << 10) | (categoryBits << 6) | indexBits;
    
    // Convert to Base36 with fixed 2 chars (pad with 0)
    base36Code += charmValue.toString(36).toUpperCase().padStart(2, '0');
  });
  
  return base36Code;
}

export function decodeHexCode(hexCode) {
  if (!hexCode || typeof hexCode !== 'string') return [];
  
  // Fixed 2-char Base36 decoder: reverse of generateCode
  // Each 2 Base36 chars = 1 charm (no ambiguity)
  hexCode = hexCode.toUpperCase().replace(/\s/g, '');
  
  // Validate: only Base36 chars (0-9, A-Z) and must be even length
  if (!/^[0-9A-Z]+$/.test(hexCode) || hexCode.length % 2 !== 0) return [];
  
  const decodedItems = [];
  
  // Process exactly 2 chars at a time
  for (let i = 0; i < hexCode.length; i += 2) {
    const twoChar = hexCode.substr(i, 2);
    const charmValue = parseInt(twoChar, 36);
    
    if (isNaN(charmValue) || charmValue > 1295) return []; // Invalid value
    
    // Extract components
    const metalBit = (charmValue >> 10) & 1;
    const categoryBits = (charmValue >> 6) & 15;
    const indexBits = charmValue & 63;
    
    // Reverse category mapping
    const categoryKeys = Object.keys(CATEGORY_MAP);
    const baseCategory = categoryKeys[categoryBits] || categoryKeys[15];
    
    if (!baseCategory) return [];
    
    // Reconstruct full category name
    const fullCategory = (metalBit === 1 ? "GOLD - " : "SILVER - ") + baseCategory;
    
    decodedItems.push({
      category: fullCategory,
      categoryIndex: indexBits
    });
  }
  
  return decodedItems;
}

/**
 * Get breakdown of items by metal type
 */
export function getItemsByMetal(metal) {
  return braceletItems.filter(item => 
    item.category && item.category.includes(metal)
  );
}

/**
 * Get breakdown of items by category
 */
export function getItemsByCategory(category) {
  return braceletItems.filter(item => item.category === category);
}

/**
 * Calculate total price for specific metal type
 */
export function getTotalPriceByMetal(metal) {
  return getItemsByMetal(metal).reduce((sum, item) => sum + (item.price || 0), 0);
}
