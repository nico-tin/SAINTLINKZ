// Bracelet management state and logic
let braceletItems = [];

export function getBraceletItems() {
  return [...braceletItems]; // Return a copy to prevent external mutations
}

export function addItem(item) {
  braceletItems.push({
    id: item.id,
    price: item.price,
    src: item.src,
    category: item.category,
    categoryIndex: item.categoryIndex !== undefined ? item.categoryIndex : 0,
    metal: item.metal
  });
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

export function countCharmById(charmId) {
  return braceletItems.filter(item => item.id === charmId).length;
}

export function moveItem(srcIndex, destIndex) {
  // Supports two behaviors:
  // - If destIndex === braceletItems.length => move (append) the item to the end
  // - Otherwise => swap the items at srcIndex and destIndex
  if (typeof srcIndex !== 'number' || typeof destIndex !== 'number') return;
  if (srcIndex < 0 || srcIndex >= braceletItems.length) return;
  if (destIndex < 0) destIndex = 0;

  // Append to end when destIndex equals length
  if (destIndex === braceletItems.length) {
    const [item] = braceletItems.splice(srcIndex, 1);
    braceletItems.push(item);
    console.log(`moveItem: moved index ${srcIndex} -> end`);
    return;
  }

  // Clamp destIndex to valid range for swapping
  if (destIndex >= braceletItems.length) destIndex = braceletItems.length - 1;
  if (srcIndex === destIndex) return;

  const tmp = braceletItems[srcIndex];
  braceletItems[srcIndex] = braceletItems[destIndex];
  braceletItems[destIndex] = tmp;
  console.log(`moveItem: swapped ${srcIndex} <-> ${destIndex}`);
}

// Insert item at destination index (shifts others). destIndex may equal length to append.
export function insertItem(srcIndex, destIndex) {
  if (typeof srcIndex !== 'number' || typeof destIndex !== 'number') return;
  if (srcIndex < 0 || srcIndex >= braceletItems.length) return;
  if (destIndex < 0) destIndex = 0;
  if (destIndex > braceletItems.length) destIndex = braceletItems.length;

  // If inserting to the same position or adjacent equivalent, no-op
  if (srcIndex === destIndex || srcIndex + 1 === destIndex) return;

  const [item] = braceletItems.splice(srcIndex, 1);
  // Adjust destIndex if source was before destination
  if (destIndex > srcIndex) destIndex -= 1;
  braceletItems.splice(destIndex, 0, item);
}

// Ordered category list - MUST be consistent between encoder and decoder
// Index must match between generateCode() and decodeHexCode()
const CATEGORY_ORDER = [
  "ALBUMS & ARTIST",  // 0
  "BRANDS",           // 1
  "COQUETTE",         // 2
  "COUPLE",           // 3
  "F1",               // 4
  "I LOVE",           // 5
  "TEMP",             // 6
  "DANGLE",           // 7
  "PREMIUM",          // 8
  "PINK_DANGLE",      // 9
  "PLAIN", "", "", "", "", // 10-14 (reserved)
  ""                  // 15 (default)
];



export function generateCode() {
  if (braceletItems.length === 0) return '';
  
  // Compress bracelet: 2 Base36 chars per charm
  // Bits: (metal:1 << 9) | (category:4 << 5) | (index:5)
  
  let base36Code = '';
  
  braceletItems.forEach(item => {
    // Metal: 0=Silver, 1=Gold. Prefer explicit `item.metal` when present (for PLAIN items),
    // otherwise fall back to category string.
    const metalBit = (item.metal === 'GOLD' || item.category.includes("GOLD")) ? 1 : 0;
    
    // Category: Extract base category, use PINK_DANGLE for PINK charms
    let baseCat = item.category.replace(/^SILVER - /, '').replace(/^GOLD - /, '').replace(/^PINK - /, '');
    
    // If it's a PINK charm, use the PINK_DANGLE code
    if (item.category.includes("PINK")) {
      baseCat = "PINK_DANGLE";
    }
    
    // Find index in CATEGORY_ORDER (must be consistent with decoder!)
    const categoryBits = CATEGORY_ORDER.indexOf(baseCat);
    if (categoryBits === -1) {
      console.warn(`Unknown category: ${baseCat}, using PREMIUM (8)`);
    }
    
    // Index: 0-31 (position in category, fits 5 bits)
    // Max category size is SILVER-TEMP with 26 items, so 5 bits (0-31) is sufficient
    const indexBits = (item.categoryIndex !== undefined ? item.categoryIndex : (item.id & 0xFF)) & 0x1F;
    
    // Combine into single 10-bit value (0-1023, fits in 2 base36 digits)
    const charmValue = (metalBit << 9) | (Math.max(0, categoryBits) << 5) | indexBits;
    
    // Convert to Base36 with fixed 2 chars (pad with 0)
    base36Code += charmValue.toString(36).toUpperCase().padStart(2, '0');
  });
  
  return base36Code;
}

export function decodeHexCode(hexCode) {
  if (!hexCode || typeof hexCode !== 'string') return [];
  
  hexCode = hexCode.toUpperCase().replace(/\s/g, '');
  
  // Validate: only Base36 chars (0-9, A-Z) and must be even length
  if (!/^[0-9A-Z]+$/.test(hexCode) || hexCode.length % 2 !== 0) return [];
  
  const decodedItems = [];
  
  // Process exactly 2 chars at a time
  for (let i = 0; i < hexCode.length; i += 2) {
    const twoChar = hexCode.substr(i, 2);
    const charmValue = parseInt(twoChar, 36);
    
    // Allow up to 10-bit max value (1023): (1<<9)|(15<<5)|31 = 1023
    if (isNaN(charmValue) || charmValue > 1023) {
      console.error(`Invalid charm value at position ${i}: ${twoChar} (${charmValue})`);
      return []; // Invalid value
    }
    
    // Extract components using FIXED bit positions (10-bit total)
    const metalBit = (charmValue >> 9) & 1;       // Bit 9: 0=SILVER, 1=GOLD
    const categoryBits = (charmValue >> 5) & 15;   // Bits 8-5: 0-15 for category
    const indexBits = charmValue & 31;             // Bits 4-0: 0-31 for charm index
    
    // Use CATEGORY_ORDER for consistent mapping
    const baseCategory = CATEGORY_ORDER[categoryBits];
    if (!baseCategory) {
      console.error(`Invalid category index: ${categoryBits} from value ${charmValue}`);
      return [];
    }

    // Reconstruct full category name. PINK_DANGLE remains special, PLAIN is a single consolidated category.
    let fullCategory;
    if (baseCategory === "PINK_DANGLE") {
      fullCategory = "PINK - DANGLE";
    } else if (baseCategory === "PLAIN") {
      fullCategory = "PLAIN";
    } else {
      fullCategory = (metalBit === 1 ? "GOLD - " : "SILVER - ") + baseCategory;
    }
    
    decodedItems.push({
      category: fullCategory,
      categoryIndex: indexBits
    });
  }
  
  return decodedItems;
}


