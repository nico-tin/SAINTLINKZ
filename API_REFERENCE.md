# 📚 API Reference - Complete Function Listing

## data.js - Configuration & Utilities

### Configuration Constants

#### PRICING
```javascript
export const PRICING = {
  SILVER: { regular: 35, dangle: 50, premium: 100 },
  GOLD: { regular: 45, dangle: 60, premium: 120 }
}
```
**Use:** Get price for any charm by metal type and charm type

---

#### CHARM_TYPES
```javascript
export const CHARM_TYPES = {
  REGULAR: 'regular',
  DANGLE: 'dangle',
  PREMIUM: 'premium'
}
```
**Use:** Identify charm type for business logic

---

#### CATEGORY_INFO
```javascript
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
}
```
**Use:** Display category icons and descriptions in UI

---

#### CHARM_CATEGORIES
```javascript
export const CHARM_CATEGORIES = {
  "SILVER - ALBUMS & ARTIST": [ { id, price }, ... ],
  "SILVER - BRANDS": [ { id, price }, ... ],
  // ... more SILVER categories
  "GOLD - ALBUMS & ARTIST": [ { id, price }, ... ],
  "GOLD - BRANDS": [ { id, price }, ... ],
  // ... more GOLD categories
}
```
**Use:** Access all charm data organized by category

---

### Utility Functions

#### getMetalFromCategory(category)
```javascript
export function getMetalFromCategory(category)
```
**Parameters:** `category` (string) - e.g., "GOLD - ALBUMS & ARTIST"  
**Returns:** `"SILVER"` or `"GOLD"`  
**Use:** Extract metal type from category name

**Example:**
```javascript
getMetalFromCategory("GOLD - ALBUMS & ARTIST") // Returns: "GOLD"
```

---

#### getBaseCategory(category)
```javascript
export function getBaseCategory(category)
```
**Parameters:** `category` (string) - e.g., "SILVER - ALBUMS & ARTIST"  
**Returns:** Base category name (string) - e.g., "ALBUMS & ARTIST"  
**Use:** Remove SILVER/GOLD prefix for file paths

**Example:**
```javascript
getBaseCategory("GOLD - ALBUMS & ARTIST") // Returns: "ALBUMS & ARTIST"
```

---

#### getCharmType(category)
```javascript
export function getCharmType(category)
```
**Parameters:** `category` (string)  
**Returns:** One of `CHARM_TYPES` values: `'regular'`, `'dangle'`, or `'premium'`  
**Use:** Identify what type of charm this category contains

**Example:**
```javascript
getCharmType("GOLD - DANGLE")    // Returns: "dangle"
getCharmType("GOLD - PREMIUM")   // Returns: "premium"
getCharmType("GOLD - BRANDS")    // Returns: "regular"
```

---

#### getCharmImageUrl(id, category)
```javascript
export function getCharmImageUrl(id, category)
```
**Parameters:**
- `id` (number) - Charm ID, e.g., 24
- `category` (string) - Category name, e.g., "GOLD - ALBUMS & ARTIST"

**Returns:** Image path (string) - e.g., `"popularimages/GOLD/ALBUMS & ARTIST/24.png"`  
**Use:** Get correct image path for any charm

**Example:**
```javascript
getCharmImageUrl(24, "GOLD - ALBUMS & ARTIST")
// Returns: "popularimages/GOLD/ALBUMS & ARTIST/24.png"

getCharmImageUrl(24, "SILVER - ALBUMS & ARTIST")
// Returns: "popularimages/SILVER/ALBUMS & ARTIST/24.png"

getCharmImageUrl(86, "GOLD - PREMIUM")
// Returns: "premiumimages/CAR EMBLEMS/86.png"

getCharmImageUrl(91, "SILVER - DANGLE")
// Returns: "silverdanglyiamges/91.png"
```

---

#### getCharmPrice(id, category)
```javascript
export function getCharmPrice(id, category)
```
**Parameters:**
- `id` (number) - Charm ID
- `category` (string) - Category name

**Returns:** Price (number) - e.g., 35, 45, 50, 60, 100, 120  
**Use:** Get price for a specific charm

**Example:**
```javascript
getCharmPrice(24, "SILVER - ALBUMS & ARTIST") // Returns: 35
getCharmPrice(24, "GOLD - ALBUMS & ARTIST")   // Returns: 45
getCharmPrice(91, "SILVER - DANGLE")          // Returns: 50
getCharmPrice(91, "GOLD - DANGLE")            // Returns: 60
getCharmPrice(86, "SILVER - PREMIUM")         // Returns: 100
getCharmPrice(86, "GOLD - PREMIUM")           // Returns: 120
```

---

#### getCategoriesByMetal(metal)
```javascript
export function getCategoriesByMetal(metal)
```
**Parameters:** `metal` (string) - `"SILVER"` or `"GOLD"`  
**Returns:** Array of category names (string[])  
**Use:** Get all categories for a specific metal

**Example:**
```javascript
getCategoriesByMetal("SILVER")
// Returns: [
//   "SILVER - ALBUMS & ARTIST",
//   "SILVER - BRANDS",
//   "SILVER - COQUETTE",
//   ... and 5 more SILVER categories
// ]

getCategoriesByMetal("GOLD")
// Returns: [
//   "GOLD - ALBUMS & ARTIST",
//   "GOLD - BRANDS",
//   "GOLD - COQUETTE",
//   ... and 5 more GOLD categories
// ]
```

---

#### getCharmCountInCategory(category)
```javascript
export function getCharmCountInCategory(category)
```
**Parameters:** `category` (string)  
**Returns:** Number of charms in category (number)  
**Use:** Get how many charms are in a specific category

**Example:**
```javascript
getCharmCountInCategory("SILVER - ALBUMS & ARTIST") // Returns: 21
getCharmCountInCategory("SILVER - BRANDS")          // Returns: 8
getCharmCountInCategory("GOLD - ALBUMS & ARTIST")   // Returns: 21
```

---

#### getCategoryInfo(category)
```javascript
export function getCategoryInfo(category)
```
**Parameters:** `category` (string)  
**Returns:** Object with `{ icon: string, description: string }`  
**Use:** Get UI metadata for a category

**Example:**
```javascript
getCategoryInfo("GOLD - ALBUMS & ARTIST")
// Returns: {
//   icon: "🎵",
//   description: "Music & Artists"
// }

getCategoryInfo("SILVER - BRANDS")
// Returns: {
//   icon: "🏷️",
//   description: "Popular Brands"
// }
```

---

## bracelet.js - State Management

### Functions

#### getBraceletItems()
```javascript
export function getBraceletItems()
```
**Returns:** Array of bracelet items (copy)  
**Item structure:** `{ id, price, src, category, addedAt }`  
**Use:** Get current items in bracelet

**Example:**
```javascript
const items = getBraceletItems()
// Returns: [
//   { id: 24, price: 35, src: "...", category: "SILVER - ALBUMS & ARTIST", addedAt: 1708... },
//   { id: 53, price: 35, src: "...", category: "SILVER - ALBUMS & ARTIST", addedAt: 1708... },
//   { id: 24, price: 45, src: "...", category: "GOLD - ALBUMS & ARTIST", addedAt: 1708... }
// ]
```

---

#### addItem(item)
```javascript
export function addItem(item)
```
**Parameters:** `item` object with `{ id, price, src, category }`  
**Use:** Add a charm to the bracelet

**Example:**
```javascript
addItem({
  id: 24,
  price: 35,
  src: "popularimages/SILVER/ALBUMS & ARTIST/24.png",
  category: "SILVER - ALBUMS & ARTIST"
})
```

---

#### removeItem(index)
```javascript
export function removeItem(index)
```
**Parameters:** `index` (number) - Position in bracelet array  
**Use:** Remove a charm by position

**Example:**
```javascript
removeItem(0) // Removes first charm
removeItem(2) // Removes third charm
```

---

#### clearBracelet()
```javascript
export function clearBracelet()
```
**Use:** Remove all charms from bracelet

**Example:**
```javascript
clearBracelet() // Empties the entire bracelet
```

---

#### getTotalPrice()
```javascript
export function getTotalPrice()
```
**Returns:** Total price (string, formatted to 2 decimals) - e.g., "145.50"  
**Use:** Get total cost of all charms in bracelet

**Example:**
```javascript
getTotalPrice() // Returns: "145.50"
```

---

#### getCharmCount()
```javascript
export function getCharmCount()
```
**Returns:** Number of charms (number)  
**Use:** Get how many charms are in the bracelet

**Example:**
```javascript
getCharmCount() // Returns: 5
```

---

#### generateCode()
```javascript
export function generateCode()
```
**Returns:** Bracelet code (string) - e.g., "24-53-55-24-91"  
**Use:** Generate code representing all charms in order

**Example:**
```javascript
generateCode() // Returns: "24-53-55-91-86"
```

---

#### getItemsByMetal(metal)
```javascript
export function getItemsByMetal(metal)
```
**Parameters:** `metal` (string) - `"SILVER"` or `"GOLD"`  
**Returns:** Array of items (filtered by metal type)  
**Use:** Get breakdown by metal type

**Example:**
```javascript
getItemsByMetal("SILVER")
// Returns all SILVER charms in bracelet

getItemsByMetal("GOLD")
// Returns all GOLD charms in bracelet
```

---

#### getItemsByCategory(category)
```javascript
export function getItemsByCategory(category)
```
**Parameters:** `category` (string)  
**Returns:** Array of items from that category  
**Use:** Get breakdown by category

**Example:**
```javascript
getItemsByCategory("GOLD - ALBUMS & ARTIST")
// Returns all charms from this category in bracelet
```

---

#### getTotalPriceByMetal(metal)
```javascript
export function getTotalPriceByMetal(metal)
```
**Parameters:** `metal` (string) - `"SILVER"` or `"GOLD"`  
**Returns:** Total price for that metal (string, formatted)  
**Use:** Get subtotal for SILVER or GOLD separately

**Example:**
```javascript
getTotalPriceByMetal("SILVER") // Returns: "105.00"
getTotalPriceByMetal("GOLD")   // Returns: "40.00"
// Total would be: 145.00
```

---

## ui.js - User Interface

### Exported Functions

#### addCharm(img)
```javascript
export function addCharm(img)
```
**Parameters:** `img` (HTMLImageElement) - Charm image element  
**Use:** Add charm to bracelet when clicked

---

#### removeCharm(index)
```javascript
export function removeCharm(index)
```
**Parameters:** `index` (number) - Position in bracelet  
**Use:** Remove charm from bracelet

---

#### renderBracelet()
```javascript
export function renderBracelet()
```
**Use:** Refresh bracelet display in UI

---

#### clearBracelet()
```javascript
export function clearBracelet()
```
**Use:** Clear all charms from bracelet and UI

---

#### generateBraceletCode()
```javascript
export function generateBraceletCode()
```
**Use:** Generate code and copy to clipboard

---

#### renderCharmCategories()
```javascript
export function renderCharmCategories()
```
**Use:** Render all category cards and charms

---

#### init()
```javascript
export function init()
```
**Use:** Initialize the app (run on page load)

---

## Usage Examples

### Example 1: Get Price for a Charm
```javascript
import { getCharmPrice } from './data.js'

const silverPrice = getCharmPrice(24, "SILVER - ALBUMS & ARTIST") // 35
const goldPrice = getCharmPrice(24, "GOLD - ALBUMS & ARTIST")     // 45
```

### Example 2: Get All Silver Charms from Bracelet
```javascript
import * as Bracelet from './bracelet.js'

const silverCharms = Bracelet.getItemsByMetal("SILVER")
console.log(`Silver charms: ${silverCharms.length}`)
console.log(`Silver subtotal: ₱${Bracelet.getTotalPriceByMetal("SILVER")}`)
```

### Example 3: Get Category Information
```javascript
import { getCategoryInfo, getCharmCountInCategory } from './data.js'

const catInfo = getCategoryInfo("GOLD - ALBUMS & ARTIST")
const count = getCharmCountInCategory("GOLD - ALBUMS & ARTIST")

console.log(`${catInfo.icon} ${catInfo.description} - ${count} charms`)
// Output: 🎵 Music & Artists - 21 charms
```

### Example 4: Build a Report
```javascript
import { getCategoriesByMetal } from './data.js'
import * as Bracelet from './bracelet.js'

const goldCategories = getCategoriesByMetal("GOLD")
const goldItems = Bracelet.getItemsByMetal("GOLD")

console.log(`GOLD Items by Category:`)
goldCategories.forEach(cat => {
  const items = Bracelet.getItemsByCategory(cat)
  console.log(`  ${cat}: ${items.length} items`)
})
```

---

## Quick Reference

### Get Price
```javascript
getCharmPrice(id, category)
```

### Get Image Path
```javascript
getCharmImageUrl(id, category)
```

### Manage Bracelet
```javascript
addItem(item)          // Add charm
removeItem(index)      // Remove charm
clearBracelet()        // Clear all
getTotalPrice()        // Get total
getCharmCount()        // Get count
generateCode()         // Get code
```

### Query Bracelet
```javascript
getItemsByMetal(metal)           // Filter by metal
getItemsByCategory(category)     // Filter by category
getTotalPriceByMetal(metal)      // Subtotal by metal
```

### Get Metadata
```javascript
getCategoryInfo(category)        // Icon + description
getCharmCountInCategory(category) // Count in category
getCategoriesByMetal(metal)      // All categories for metal
```

---

**Version:** 2.0 Enhanced  
**Last Updated:** February 18, 2026
