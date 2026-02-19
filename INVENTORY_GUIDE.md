# Inventory Management Guide

## Overview
The inventory system controls which charms are available for purchase on your website. Out-of-stock charms are **grayed out and unclickable**.

## How It Works

### 1. **Inventory File**: `inventory.json`
- Contains stock levels for each charm ID
- Format: `"charmId": quantity`
- Example:
  ```json
  {
    "charms": {
      "6": 5,
      "8": 0,
      "24": 10
    }
  }
  ```

### 2. **Visual Feedback for Users**
- ✅ **In Stock**: Normal charm image, clickable, price shown on hover
- ❌ **Out of Stock**: Grayed out (40% opacity), grayscale filter, shows "Out of Stock" tooltip, not clickable
- Alert appears if user tries to click an out-of-stock charm

### 3. **How to Update Stock**

#### Option A: Edit Directly in inventory.json
1. Open `inventory.json` in your editor
2. Change the number next to each charm ID
3. Save the file
4. Commit and push to GitHub

Example:
```json
"24": 10,  → Change to → "24": 3
```

#### Option B: Upgrade to Google Sheets (Future)
- Implement Google Sheets API integration for real-time updates without Git commits
- See inventory manager authentication guide (not yet implemented)

## Important Notes

### Safe for GitHub Pages
✅ Completely safe - data is read-only from JSON  
✅ No backend required  
✅ No security risks  
✅ Customers cannot modify inventory  

### Stock = 0 Behavior
- Charm appears grayed out on the website
- Unclickable
- Tooltip shows "Out of Stock"
- Alert message if somehow added to cart

### Fallback
If `inventory.json` is missing:
- All charms appear in stock (default quantity: 10)
- System continues to work normally

## Testing

Current test values in `inventory.json`:
- Charm ID `6`: 5 units (low stock)
- Charm ID `8`: 0 units (out of stock)

Try clicking these charms to see the visual feedback in action!

## Charm ID Reference

See `data.js` for complete mapping of charm IDs to categories.

Common categories:
- **Albums & Artist**: 24, 53, 55, 58-84
- **Brands**: 14, 15, 17-21, 39
- **F1**: 6-13, 23
- **Dangle**: 91-105, 134-144, 145-159
- **Premium**: 115-133, 201-224, etc.
