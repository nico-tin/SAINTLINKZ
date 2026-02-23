# SAINTLINKZ - Charm Bracelet Builder

A feature-rich, interactive charm bracelet designer built with vanilla JavaScript, HTML5, and CSS3. Create custom bracelets, encode them as shareable codes, and restore them anytime.

## Features

- **Multiple Charm Types**: Regular, Dangle, Premium, and Plain charms
- **Metal Options**: Silver, Gold, and Pink metals with distinct pricing
- **Real-time Pricing**: Automatic price calculation as you add/remove charms
- **Shareable Codes**: Generate unique Base36-encoded codes to share your bracelet design
- **Restore Function**: Decode companion codes to recreate bracelets exactly
- **Responsive Design**: Fully optimized for desktop, tablet, and mobile devices
- **Accessibility**: WCAG AA compliant with ARIA labels, semantic HTML, and screen reader support
- **Visual Feedback**: Smooth transitions, hover effects, and interactive states on all elements

## Project Structure

```
saintweb/
├── index.html                 # Main HTML markup (semantic structure)
├── data.js                    # Charm catalog, pricing, image URL resolution
├── ui.js                      # UI rendering, user interactions, category display
├── bracelet.js                # Bracelet state management, encoding/decoding
├── styles.css                 # Layout, responsive design, visual styling
├── README.md                  # This file
├── resources/
│   └── LOGO.png              # SAINTLINKZ brand logo
└── images/                    # Organized charm images by metal and type
    ├── silver/
    │   ├── regular/          # Silver regular charms (by category)
    │   │   ├── ALB/          # Albums & Artist
    │   │   ├── BRA/          # Brands
    │   │   ├── COQ/          # Coquette
    │   │   ├── COU/          # Couple
    │   │   ├── F1/           # Formula 1
    │   │   ├── ILO/          # I Love
    │   │   └── TEM/          # Temp/Popular Picks
    │   ├── dangle/           # Silver dangle charms (SDAN01-SDAN15)
    │   └── premium/          # Silver premium charms
    ├── gold/
    │   ├── regular/          # Gold regular charms (by category)
    │   │   ├── ALB/
    │   │   ├── BRA/
    │   │   ├── COQ/
    │   │   ├── COU/
    │   │   ├── F1/
    │   │   ├── ILO/
    │   │   └── TEM/
    │   ├── dangle/           # Gold dangle charms (GDAN01-GDAN15)
    │   └── premium/          # Gold premium charms
    ├── pink/
    │   └── dangle/           # Pink dangle charms (PDAN01-PDAN15)
    └── plain/                # Plain charms (GPLAIN, PPLAIN, SPLAIN)
```


## Pricing Model

Charm prices vary by metal and type:

| Type | Silver | Gold | Pink |
|------|--------|------|------|
| Regular | ₱35 | ₱45 | ₱35 |
| Dangle | ₱50 | ₱60 | ₱60 |
| Premium | ₱90 | ₱90 | N/A |
| Plain | ₱15 | ₱20 | ₱20 |

## How to Use

### Building a Bracelet

1. Open `index.html` in your web browser
2. Browse charm categories in each metal section
3. Click any charm image to add it to your bracelet
4. The total price and item count update automatically
5. Use "Remove" buttons (visible on hover) to delete charms
6. Click "Clear Bracelet" to start over

### Sharing a Bracelet

1. After designing your bracelet, click "Copy Bracelet Code"
2. A unique code is generated and displayed
3. Share this code with friends or save for later
4. They can paste the code in the "Restore" section to see your design

### Restoring from a Code

1. Paste a bracelet code in the "Or Paste Your Bracelet Code to Restore" input field
2. Click "Restore Bracelet"
3. Your bracelet will be recreated with all items and pricing

## Technical Details

### Encoding/Decoding

Bracelets are encoded as Base36 strings using a bitwise packing scheme:
- **Total bits per charm**: 10 (metal: 1 bit, category: 4 bits, index: 5 bits)
- **Metal bit**: 0 = Silver/Pink, 1 = Gold
- **Category bits**: 0-9 (regular categories) or 10 (PLAIN)
- **Index bits**: Position within the category, allows 0-31 items per category

### Category Order (Encoding Index)

| Index | Category |
|-------|----------|
| 0 | ALBUMS & ARTIST |
| 1 | BRANDS |
| 2 | COQUETTE |
| 3 | COUPLE |
| 4 | F1 |
| 5 | I LOVE |
| 6 | TEMP |
| 7 | DANGLE (Silver/Gold) |
| 8 | DANGLE (Pink) |
| 9 | DANGLE (Pink) |
| 10 | PLAIN (consolidated, metal stored separately) |
| 11-15 | Reserved |

### Key Functions

#### `data.js`
- `getCharmImageUrl(id, category, metalOverride)`: Resolves charm image file path
- `getCharmPrice(id, category, metalOverride)`: Calculates charm price
- `getCharmNewName(id)`: Maps charm ID to filename
- `getMetalFromCategory(category)`: Extracts metal from category name

#### `ui.js`
- `init()`: Initializes UI and event listeners
- `renderCharmCategories()`: Renders charm grid grouped by metal
- `addCharm(img)`: Adds selected charm to bracelet
- `updateSummary()`: Updates price and count display
- `generateBraceletCode()`: Creates shareable code
- `decodeBraceletCode(code)`: Restores bracelet from code

#### `bracelet.js`
- `addItem(item)`: Adds item to bracelet array
- `removeItem(index)`: Removes item by index
- `generateCode()`: Encodes bracelet as Base36 string
- `decodeHexCode(code)`: Decodes Base36 code back to items

## Styling & Responsiveness

- **Desktop**: Full 3-column charm grid, all features visible
- **Tablet (768px)**: 2-column grid, optimized spacing
- **Mobile (600px)**: 4-column charm grid, compact layout
- **Small Mobile (480px)**: Single-column categories, touch-friendly buttons

## Accessibility Features

- **Semantic HTML**: `<main>`, `<header>`, proper heading hierarchy (h1 for main title)
- **ARIA Labels**: All interactive elements labeled for screen readers
- **Keyboard Navigation**: All buttons and inputs are keyboard-accessible
- **Focus States**: 3px colored outlines with offset on all interactive elements
- **Color Contrast**: WCAG AA compliant text and button colors
- **Status Updates**: Live regions for code copy feedback and restore messages

## Adding New Charms

To add new charms to the catalog:

1. **Add image files**: Place PNG images in the appropriate `images/[metal]/[type]/[category]/` folder
2. **Update `data.js`**:
   - Add charm entry to `CHARM_CATEGORIES[category]` with `id` and `price`
   - Update ID-to-filename mapping in `ID_TO_FILENAME_MAP` if using non-standard naming
3. **Test**: Refresh browser and verify charm appears in the correct category

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Development Notes

- **No build tool required**: Uses ES6 modules over HTTP
- **Local development**: Serve files via HTTP server (e.g., `python -m http.server` or VS Code Live Server)
- **No external dependencies**: Pure vanilla JavaScript, no frameworks
- **Modular architecture**: Separate concerns (data, UI, state) across three main files

## Future Enhancements

- Image lazy-loading for performance
- Charm search/filter by name
- Favorite/wishlist functionality
- Multi-language support
- Dark mode theme
- Charm preview modal with detailed info
- Print-friendly bracelet receipt

---

## Adding New Products - Complete Step-by-Step Guide

### Overview
Adding new charms to SAINTLINKZ requires updating three key areas:
1. **Image files** in the appropriate folder structure
2. **`data.js`** to register the charm
3. **`inventory.json`** to set stock quantities (optional)

### Prerequisites
- PNG charm images optimized for web (60x60px recommended)
- Charm ID (unique integer)
- Price in Philippine Pesos (₱)
- Category classification (regular, dangle, premium, or plain)
- Metal type (silver, gold, pink, or plain)

---

### Step 1: Prepare Your Image File

**File Requirements:**
- Format: PNG (supports transparency)
- Size: 60x60px minimum (200x200px recommended for quality)
- Filename: Should match the charm ID or follow the system's naming convention

**Naming Convention:**
- Regular charms: `{ID}.png` (e.g., `24.png`, `53.png`)
- Dangle charms: `{PREFIX}DAN{NUMBER}.png` (e.g., `SDAN01.png`, `GDAN05.png`)
- Premium charms: `P{ID}.png` (e.g., `P01.png`)
- Plain charms: `{METAL}PLAIN.png` (e.g., `GPLAIN.png`, `SPLAIN.png`)

---

### Step 2: Place Image in Correct Folder

Navigate to the appropriate image directory based on charm type and metal:

**For SILVER Regular Charms:**
```
images/silver/regular/{CATEGORY}/{ID}.png
```
**Example:** `images/silver/regular/ALB/24.png`

**Available Categories:**
- `ALB/` = Albums & Artist
- `BRA/` = Brands
- `COQ/` = Coquette  
- `COU/` = Couple
- `F1/` = Formula 1
- `ILO/` = I Love
- `TEM/` = Temp/Popular Picks

**For SILVER Dangle Charms:**
```
images/silver/dangle/SDAN{NUMBER}.png
```
**Example:** `images/silver/dangle/SDAN01.png`

**For GOLD Regular Charms:**
```
images/gold/regular/{CATEGORY}/{ID}.png
```
**Example:** `images/gold/regular/ALB/24.png`

**For GOLD Dangle Charms:**
```
images/gold/dangle/GDAN{NUMBER}.png
```
**Example:** `images/gold/dangle/GDAN01.png`

**For GOLD Premium Charms:**
```
images/gold/premium/P{ID}.png
```
**Example:** `images/gold/premium/P01.png`

**For PINK Dangle Charms:**
```
images/pink/dangle/PDAN{NUMBER}.png
```
**Example:** `images/pink/dangle/PDAN01.png`

**For PLAIN Charms:**
```
images/plain/{METAL}PLAIN.png
```
**Example:** `images/plain/GPLAIN.png` (gold plain), `images/plain/SPLAIN.png` (silver plain)

---

### Step 3: Register Charm in `data.js`

Open `data.js` and locate the `CHARM_CATEGORIES` constant. Find the appropriate category array and add your charm.

**Example 1: Add Silver Regular Charm to Albums & Artist**

Find this section:
```javascript
"SILVER - ALBUMS & ARTIST": [
  { id: 24, price: 35 },
  { id: 53, price: 35 },
  { id: 55, price: 35 },
  // ... more charms
]
```

Add your new charm at the end of the array:
```javascript
"SILVER - ALBUMS & ARTIST": [
  { id: 24, price: 35 },
  { id: 53, price: 35 },
  { id: 55, price: 35 },
  // ... more charms
  { id: 999, price: 35 }  // NEW: Add your charm ID and price
]
```

**Key Points:**
- `id`: Unique integer that matches your image filename
- `price`: ₱ price as a number (no currency symbol)
- Use commas between entries
- Keep IDs in ascending order for clarity (optional but recommended)

**Example 2: Add Gold Dangle Charm**

Find this section:
```javascript
"GOLD - DANGLE": [
  { id: 1001, price: 60 },
  { id: 1002, price: 60 },
  // ... more charms
]
```

Add your new charm:
```javascript
"GOLD - DANGLE": [
  { id: 1001, price: 60 },
  { id: 1002, price: 60 },
  // ... more charms
  { id: 1050, price: 60 }  // NEW: Gold dangle charm
]
```

**Example 3: Add Plain Charm (with metal specification)**

Find this section:
```javascript
"PLAIN": [
  { id: 2001, price: 15, metal: "silver" },
  { id: 2002, price: 20, metal: "gold" },
  // ... more charms
]
```

Add with metal type:
```javascript
"PLAIN": [
  { id: 2001, price: 15, metal: "silver" },
  { id: 2002, price: 20, metal: "gold" },
  { id: 2050, price: 20, metal: "gold" }  // NEW: Plain gold charm
]
```

**All Category Names:**
Make sure you use the exact category names when adding:

| Category | Metal | Type |
|----------|-------|------|
| `"SILVER - ALBUMS & ARTIST"` | Silver | Regular |
| `"SILVER - BRANDS"` | Silver | Regular |
| `"SILVER - COQUETTE"` | Silver | Regular |
| `"SILVER - COUPLE"` | Silver | Regular |
| `"SILVER - F1"` | Silver | Regular |
| `"SILVER - I LOVE"` | Silver | Regular |
| `"SILVER - TEMP"` | Silver | Regular |
| `"SILVER - DANGLE"` | Silver | Dangle |
| `"SILVER - PREMIUM"` | Silver | Premium |
| `"GOLD - ALBUMS & ARTIST"` | Gold | Regular |
| `"GOLD - BRANDS"` | Gold | Regular |
| `"GOLD - COQUETTE"` | Gold | Regular |
| `"GOLD - COUPLE"` | Gold | Regular |
| `"GOLD - F1"` | Gold | Regular |
| `"GOLD - I LOVE"` | Gold | Regular |
| `"GOLD - TEMP"` | Gold | Regular |
| `"GOLD - DANGLE"` | Gold | Dangle |
| `"GOLD - PREMIUM"` | Gold | Premium |
| `"PINK - DANGLE"` | Pink | Dangle |
| `"PLAIN"` | Mixed | Plain |

---

### Step 4: Add Image URL Mapping (Optional - If Needed)

If your charm uses a non-standard filename, update the `ID_TO_FILENAME_MAP` in `data.js`:

```javascript
const ID_TO_FILENAME_MAP = {
  // ... existing mappings
  999: 'custom_name.png',  // Maps charm ID 999 to 'custom_name.png'
};
```

*This is only needed if you prefer custom filenames different from the charm ID.*

---

### Step 5: Set Stock Quantity (Optional - via inventory.json)

To limit how many of a charm can be added to a bracelet, update `inventory.json`:

Original:
```json
{
  "charms": {
    "24": 10,
    "53": 5,
    "55": 3
  }
}
```

Add your new charm's stock:
```json
{
  "charms": {
    "24": 10,
    "53": 5,
    "55": 3,
    "999": 15
  }
}
```

**Notes:**
- If a charm ID is **not** in `inventory.json`, defaults to 10 stock
- Set to 0 to completely hide/disable the charm
- Set to any positive integer to limit selections

---

### Step 6: Test Your Changes

1. **Refresh the browser** (press `Ctrl+F5` or `Cmd+Shift+R` on Mac for hard refresh)
2. **Check the charm appears** under the correct metal section and category
3. **Add to bracelet** to verify it works with pricing
4. **Generate code** to ensure encoding/decoding works
5. **Check mobile view** on a tablet/phone to verify responsiveness

**Troubleshooting:**

| Issue | Solution |
|-------|----------|
| Charm doesn't appear | Verify category name matches exactly (case-sensitive) |
| Wrong price shown | Check `price` value in `data.js` |
| Image broken | Verify file path and filename match exactly |
| Out of stock warning | Check `inventory.json` for stock level |
| Not in edit/add mode | Clear browser cache and hard refresh |

---

### Complete Example: Adding a New Gold Coquette Charm

Here's a complete walkthrough adding charm ID `256` as a gold coquette charm priced at ₱45:

**Step 1-2: Prepare and place image**
- Create/export charm image as PNG
- Save as `256.png`
- Place in `images/gold/regular/COQ/256.png`

**Step 3: Register in data.js**
```javascript
"GOLD - COQUETTE": [
  { id: 88, price: 45 },
  { id: 89, price: 45 },
  { id: 90, price: 45 },
  { id: 256, price: 45 }  // ← Add this line
]
```

**Step 5: Set stock (optional)**
```json
{
  "charms": {
    "256": 20
  }
}
```

**Step 6: Verify**
- Open website in browser  
- Scroll to Gold section → Coquette category
- See new charm with price ₱45
- Add to bracelet → confirms price updates
- Mobile test → charm displays properly

---

### Adding a New Charm Category

If you need an entirely new category (e.g., "ANIMALS"):

1. **Create folder structure:**
   ```
   images/silver/regular/ANI/  
   images/gold/regular/ANI/  
   ```

2. **Add to `CATEGORY_INFO` in `data.js`:**
   ```javascript
   export const CATEGORY_INFO = {
     // ... existing
     "ANIMALS": { icon: "🐾", description: "Animal Charms" }
   };
   ```

3. **Create charm arrays in `CHARM_CATEGORIES`:**
   ```javascript
   "SILVER - ANIMALS": [
     { id: 300, price: 35 },
     { id: 301, price: 35 }
   ],
   "GOLD - ANIMALS": [
     { id: 300, price: 45 },
     { id: 301, price: 45 }
   ]
   ```

4. **Update `CATEGORY_ORDER` in `bracelet.js`** if you need encoding support for the new category

---

### Adding a New Metal Type

To add a new metal (e.g., "ROSE GOLD"):

1. **Create folder structure:**
   ```
   images/rose_gold/regular/{CATEGORIES}/
   images/rose_gold/dangle/
   images/rose_gold/premium/
   ```

2. **Add pricing to `PRICING` in `data.js`:**
   ```javascript
   export const PRICING = {
     // ... existing
     ROSE_GOLD: { regular: 50, dangle: 65, premium: 95, plain: 22 }
   };
   ```

3. **Create category arrays:**
   ```javascript
   "ROSE_GOLD - ALBUMS & ARTIST": [
     { id: 400, price: 50 }
     // ... more charms
   ]
   ```

4. **The filter buttons will auto-detect** new metal types that don't match SILVER/GOLD

---

### Quick Reference: Category Key Mapping

Used internally for encoding/decoding (for reference):

```javascript
CATEGORY_ORDER = [
  "ALBUMS & ARTIST",    // Index 0
  "BRANDS",             // Index 1  
  "COQUETTE",           // Index 2
  "COUPLE",             // Index 3
  "F1",                 // Index 4
  "I LOVE",             // Index 5
  "TEMP",               // Index 6
  "DANGLE",             // Index 7  
  "PREMIUM",            // Index 8
  "PINK_DANGLE",        // Index 9
  "PLAIN"               // Index 10
];
```

---

### Tips for Best Results

✅ **DO:**
- Keep charm image files at 60x60px or larger
- Use consistent ID numbering within categories (e.g., all Categories 24-90)
- Group related charms in same ID ranges
- Test on mobile after adding new charms
- Use descriptive comments in charm arrays

❌ **DON'T:**
- Leave gaps in category arrays (optional but cleaner)
- Use decimal numbers for IDs (must be integers)
- Forget to add both SILVER and GOLD versions if offering both
- Use special characters in filenames
- Change category names mid-catalog (breaks encoding)

---

## Performance Optimization Tips

- **Lazy loading:** All charm images use `loading="lazy"` for faster page loads
- **Minimize renders:** Charm grid only re-renders when filter changes
- **Caching:** Browser caches all static images after first load
- **Encoding:** Bracelet codes are ~66% smaller than transmitting full arrays

---

## License

SAINTLINKZ © 2026. All rights reserved.

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

## Performance

- All 159+ charms load lazily
- Compact codes reduce transmission by ~66% vs full IDs
- CSS optimized for mobile-first rendering
- Responsive breakpoints: mobile (480px), tablet (768px), desktop (1000px+)

---

**SAINTLINKZ** - Craft Your Memories With Us ♥
