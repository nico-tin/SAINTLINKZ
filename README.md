# SAINTLINKZ - Bracelet Builder

A responsive web application for designing and sharing custom charm bracelets with 159+ charms across SILVER, GOLD, and PINK metal types.

## Features

- **Build Custom Bracelets** - Mix and match charms from 22 categories
- **Compact Codes** - Generate 2-character Base36 codes per charm for easy sharing
- **Restore Bracelets** - Paste codes to recreate bracelets exactly as designed
- **Three Metal Types** - SILVER (regular, dangle, premium), GOLD (regular, dangle, premium), PINK (dangle only)
- **Responsive Design** - Mobile-first (breakpoints at 480px, 768px)
- **Real-time Pricing** - Instant price calculation per metal type and charm type

## Project Structure

```
saintweb/
├── index.html          # Main HTML structure
├── styles.css          # Responsive styling
├── bracelet.js         # State management & encoding/decoding logic
├── data.js             # Charm data, pricing, and utility functions
├── ui.js               # DOM rendering and event handling
├── resources/
│   └── LOGO.png        # SAINTLINKZ logo
├── popularimages/      # Regular charm images (organized by metal/category)
├── silverdanglyimages/ # Silver dangle charms
├── pinkdanglyimages/   # Pink dangle charms
├── premiumimages/      # Premium charms (GOLD_PREMIUM, SILVER_PREMIUM)
└── golddanglyimages/   # Gold dangle charms
```

## Technical Details

### Encoding System
- **Format**: 2 Base36 characters per charm (00-ZZ)
- **Bit Structure**: Metal (1b) | Category (4b) | Index (5b) = 10 bits total
- **Range**: 0-1023 per charm, fits perfectly in 2 Base36 digits
- **Example**: `SA01` = SILVER Charm 0, GOLD Charm 1

### Charm Categories (22 Total)
**SILVER**: Albums & Artist, Brands, Coquette, Couple, F1, I Love, Temp, Dangle, Premium
**GOLD**: Albums & Artist, Brands, Coquette, Couple, F1, I Love, Temp, Dangle, Premium
**PINK**: Dangle only

### Pricing
| Metal | Regular | Dangle | Premium |
|-------|---------|--------|---------|
| SILVER| ₱35     | ₱40    | ₱80     |
| GOLD  | ₱45     | ₱50    | ₱80     |
| PINK  | N/A     | ₱50    | N/A     |

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
