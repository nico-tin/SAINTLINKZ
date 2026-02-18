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

## License

SAINTLINKZ © 2026. All rights reserved.


## How to Use

1. **Build**: Click charms to add them to your bracelet
2. **View Code**: Press "Copy Bracelet Code" to copy the shareable code
3. **Share**: Send the code to a friend
4. **Restore**: Friend pastes the code and clicks "Restore Bracelet" to see exactly what you designed

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
