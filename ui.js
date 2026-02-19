import { 
  CHARM_CATEGORIES, 
  getCharmImageUrl, 
  getCharmPrice,
  getCategoryInfo,
  getCharmCountInCategory,
  getMetalFromCategory,
  getBaseCategory,
  loadInventory,
  getCharmStock,
  isCharmInStock
} from './data.js';
import * as Bracelet from './bracelet.js';

// DOM Elements
const braceletDiv = document.getElementById('bracelet');
const totalPriceEl = document.getElementById('totalPrice');
const charmCountEl = document.getElementById('charmCount');
const braceletCodeEl = document.getElementById('braceletCode');
const copyMsgEl = document.getElementById('copyMsg');
const charmsContainer = document.getElementById('charmsContainer');

export function addCharm(img) {
  const id = parseInt(img.dataset.name);
  const stock = getCharmStock(id);
  
  // Check if charm is in stock
  if (!isCharmInStock(id)) {
    alert('This charm is out of stock!');
    return;
  }
  
  // Check if we've already added the maximum allowed
  const currentCount = Bracelet.countCharmById(id);
  if (currentCount >= stock) {
    alert(`You can only add ${stock} of this charm to your bracelet!`);
    return;
  }
  
  const price = parseFloat(img.dataset.price);
  const src = img.src;
  const categoryIndex = parseInt(img.dataset.categoryIndex) || 0;
  const metal = img.dataset.metal; // optional, used for PLAIN items

  Bracelet.addItem({ id, price, src, category: img.dataset.category, categoryIndex, metal });
  renderBracelet();
}

export function removeCharm(index) {
  Bracelet.removeItem(index);
  renderBracelet();
}

export function renderBracelet() {
  braceletDiv.innerHTML = '';
  const items = Bracelet.getBraceletItems();
  
  if (items.length === 0) {
    braceletDiv.innerHTML = '<div id="braceletPlaceholder">Your bracelet is empty</div>';
  } else {
    items.forEach((item, index) => {
      const itemDiv = document.createElement('div');
      itemDiv.classList.add('bracelet-item');
      
      const img = document.createElement('img');
      img.src = item.src;
      img.alt = `Charm ${item.id}`;
      
      const btn = document.createElement('button');
      btn.innerText = '×';
      btn.classList.add('remove-btn');
      btn.onclick = () => {
        removeCharm(index);
        renderCharmCategories(); // Update charm grid tooltips
      };
      
      itemDiv.appendChild(img);
      itemDiv.appendChild(btn);
      braceletDiv.appendChild(itemDiv);
    });
  }
  
  updateDisplay();
  renderCharmCategories(); // Update charm grid with new stock counts
}

function updateDisplay() {
  totalPriceEl.textContent = Bracelet.getTotalPrice();
  charmCountEl.textContent = Bracelet.getCharmCount();
}

export function clearBracelet() {
  Bracelet.clearBracelet();
  braceletCodeEl.innerText = '...';
  copyMsgEl.innerText = '';
  renderBracelet();
}

export function generateBraceletCode() {
  const code = Bracelet.generateCode();
  if (!code) {
    braceletCodeEl.innerText = '...';
    copyMsgEl.innerText = '';
    return;
  }
  
  braceletCodeEl.innerText = code;
  navigator.clipboard.writeText(code)
    .then(() => {
      copyMsgEl.innerText = 'Copied!';
      copyMsgEl.style.color = 'green';
    })
    .catch(() => {
      copyMsgEl.innerText = 'Failed to copy';
      copyMsgEl.style.color = 'red';
    });
}

export function renderCharmCategories() {
  if (!charmsContainer) return;
  
  charmsContainer.innerHTML = '';
  
  // Group categories by metal type for better UI organization
  const silverCategories = Object.keys(CHARM_CATEGORIES).filter(cat => cat.includes("SILVER"));
  const goldCategories = Object.keys(CHARM_CATEGORIES).filter(cat => cat.includes("GOLD"));
  const pinkCategories = Object.keys(CHARM_CATEGORIES).filter(cat => cat.includes("PINK"));

  // Render SILVER section
  // Render PLAIN section at top (single category not separated by metal)
  if (CHARM_CATEGORIES["PLAIN"]) {
    renderMetalSection("PLAIN", ["PLAIN"]);
  }

  // Render SILVER section
  if (silverCategories.length > 0) {
    renderMetalSection("SILVER", silverCategories);
  }

  // Render PINK section (between metals)
  if (pinkCategories.length > 0) {
    const separator1 = document.createElement('div');
    separator1.style.cssText = 'margin: 30px 0; border-top: 2px dashed #aaa; opacity: 0.3;';
    charmsContainer.appendChild(separator1);
    renderMetalSection("PINK", pinkCategories);
  }

  // Add visual separator before GOLD
  const separator = document.createElement('div');
  separator.style.cssText = 'margin: 40px 0; border-top: 3px solid #76023c; opacity: 0.3;';
  charmsContainer.appendChild(separator);

  // Render GOLD section
  if (goldCategories.length > 0) {
    renderMetalSection("GOLD", goldCategories);
  }
}

/**
 * Render a metal section (SILVER or GOLD) with organized categories
 */
function renderMetalSection(metal, categories) {
  const section = document.createElement('div');
  section.className = 'metal-section';
  
  // Section header
  const header = document.createElement('div');
  header.style.cssText = 'text-align: center; margin: 30px 0 20px; padding: 10px;';
  const title = document.createElement('h1');
  title.textContent = metal;
  title.style.cssText = 'font-size: 2rem; color: #76023c; margin: 0; text-transform: uppercase; letter-spacing: 2px;';
  header.appendChild(title);
  
  section.appendChild(header);
  
  // Container for category cards
  const categoriesGrid = document.createElement('div');
  categoriesGrid.className = 'categories-grid';
  categoriesGrid.style.cssText = 'display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; padding: 0 10px;';
  
  categories.forEach(category => {
    const charms = CHARM_CATEGORIES[category];
    const baseCategory = getBaseCategory(category);
    const catInfo = getCategoryInfo(category);
    const charmCount = getCharmCountInCategory(category);
    
    const categoryCard = document.createElement('div');
    categoryCard.className = 'category-card';
    categoryCard.style.cssText = `
      background: #fff;
      border: 2px solid #76023c;
      border-radius: 12px;
      padding: 15px;
      transition: all 0.3s ease;
      cursor: pointer;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    `;
    
    categoryCard.addEventListener('mouseenter', () => {
      categoryCard.style.cssText += 'transform: translateY(-5px); box-shadow: 0 6px 16px rgba(118, 2, 60, 0.2);';
    });
    
    categoryCard.addEventListener('mouseleave', () => {
      categoryCard.style.cssText = categoryCard.getAttribute('data-original-style');
    });
    
    categoryCard.setAttribute('data-original-style', categoryCard.style.cssText);
    
    // Category header with icon and info
    const catHeader = document.createElement('div');
    catHeader.style.cssText = 'display: flex; align-items: center; gap: 10px; margin-bottom: 12px;';
    
    const icon = document.createElement('span');
    icon.textContent = catInfo.icon;
    icon.style.cssText = 'font-size: 1.8rem;';
    
    const catTitleDiv = document.createElement('div');
    const catTitle = document.createElement('h3');
    catTitle.textContent = baseCategory;
    catTitle.style.cssText = 'margin: 0; font-size: 1.1rem; color: #76023c;';
    
    const charmCountBadge = document.createElement('span');
    charmCountBadge.textContent = charmCount;
    charmCountBadge.style.cssText = 'background: #76023c; color: #feffe2; border-radius: 50%; width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 0.9rem; margin-left: auto;';
    
    catHeader.appendChild(icon);
    catTitleDiv.appendChild(catTitle);
    catHeader.appendChild(catTitleDiv);
    catHeader.appendChild(charmCountBadge);
    categoryCard.appendChild(catHeader);
    
    // Description
    const description = document.createElement('p');
    description.textContent = catInfo.description;
    description.style.cssText = 'margin: 8px 0; font-size: 0.9rem; color: #666; font-style: italic;';
    categoryCard.appendChild(description);
    
    // Charms grid
    const menu = document.createElement('div');
    menu.className = 'charm-menu';
    menu.style.cssText = 'display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-top: 12px;';
    
    charms.forEach((charm, index) => {
      const img = document.createElement('img');
      img.src = getCharmImageUrl(charm.id, category, charm.metal);
      img.className = 'charm';
      img.dataset.name = charm.id;
      img.dataset.price = charm.price;
      img.dataset.category = category;
      if (charm.metal) img.dataset.metal = charm.metal;
      img.dataset.categoryIndex = index;  // Store the index in the category array
      img.loading = 'lazy';
      img.alt = `Charm ${charm.id}`;
      
      // Check if charm is in stock
      const inStock = isCharmInStock(charm.id);
      const stock = getCharmStock(charm.id);
      const currentCount = Bracelet.countCharmById(charm.id);
      const remainingSlots = stock - currentCount;
      
      // Enhanced charm styling
      let baseStyles = `
        width: 60px;
        height: 60px;
        object-fit: contain;
        padding: 4px;
        border-radius: 8px;
        transition: all 0.2s ease;
        background: #f5f5f5;
        border: 2px solid transparent;
      `;
      
      if (!inStock) {
        baseStyles += `
          opacity: 0.4;
          cursor: not-allowed;
          filter: grayscale(100%);
        `;
      } else if (remainingSlots === 0) {
        baseStyles += `
          opacity: 0.5;
          cursor: not-allowed;
          filter: brightness(0.8);
        `;
      } else {
        baseStyles += `
          cursor: pointer;
        `;
      }
      
      img.style.cssText = baseStyles;
      
      img.addEventListener('mouseenter', () => {
        if (inStock && remainingSlots > 0) {
          img.style.cssText = baseStyles + 'transform: scale(1.15); border-color: #76023c; box-shadow: 0 4px 8px rgba(118, 2, 60, 0.3);';
        }
      });
      
      img.addEventListener('mouseleave', () => {
        img.style.cssText = baseStyles;
      });
      
      // Tooltip on hover
      const tooltip = document.createElement('div');
      tooltip.className = 'charm-tooltip';
      
      let tooltipText = '';
      let tooltipColor = '#76023c';
      
      if (!inStock) {
        tooltipText = 'Out of Stock';
        tooltipColor = '#999';
      } else if (remainingSlots === 0) {
        tooltipText = 'Max Reached';
        tooltipColor = '#ff6b6b';
      } else {
        tooltipText = `₱${charm.price} (${remainingSlots} left)`;
        tooltipColor = '#76023c';
      }
      
      tooltip.style.cssText = `
        position: absolute;
        bottom: 100%;
        left: 50%;
        transform: translateX(-50%);
        background: ${tooltipColor};
        color: #feffe2;
        padding: 6px 10px;
        border-radius: 4px;
        font-size: 0.8rem;
        white-space: nowrap;
        pointer-events: none;
        opacity: 0;
        transition: opacity 0.2s;
        z-index: 10;
        margin-bottom: 8px;
      `;
      tooltip.textContent = tooltipText;
      
      const imgWrapper = document.createElement('div');
      imgWrapper.style.cssText = 'position: relative;';
      imgWrapper.appendChild(img);
      imgWrapper.appendChild(tooltip);
      
      // Add stock badge for mobile visibility
      if (!inStock) {
        const outOfStockBadge = document.createElement('div');
        outOfStockBadge.style.cssText = `
          position: absolute;
          top: -5px;
          right: -5px;
          background: #999;
          color: white;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.65rem;
          font-weight: bold;
          box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        `;
        outOfStockBadge.textContent = '0';
        imgWrapper.appendChild(outOfStockBadge);
      } else if (remainingSlots === 0) {
        const maxBadge = document.createElement('div');
        maxBadge.style.cssText = `
          position: absolute;
          top: -5px;
          right: -5px;
          background: #ff6b6b;
          color: white;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.65rem;
          font-weight: bold;
          box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        `;
        maxBadge.textContent = '✓';
        imgWrapper.appendChild(maxBadge);
      } else if (stock < 10) {
        // Only show badge if stock is low (less than 10)
        const stockBadge = document.createElement('div');
        stockBadge.style.cssText = `
          position: absolute;
          top: -5px;
          right: -5px;
          background: #76023c;
          color: #feffe2;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.75rem;
          font-weight: bold;
          box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        `;
        stockBadge.textContent = remainingSlots;
        imgWrapper.appendChild(stockBadge);
      }
      
      img.addEventListener('mouseenter', () => {
        tooltip.style.opacity = '1';
      });
      
      img.addEventListener('mouseleave', () => {
        tooltip.style.opacity = '0';
      });
      
      // Show tooltip on touch/click for mobile - auto-dismiss after 3 seconds
      let tooltipTimeout;
      img.addEventListener('click', () => {
        tooltip.style.opacity = '1';
        clearTimeout(tooltipTimeout);
        tooltipTimeout = setTimeout(() => {
          tooltip.style.opacity = '0';
        }, 3000);
      });
      
      img.addEventListener('touchstart', () => {
        tooltip.style.opacity = '1';
        clearTimeout(tooltipTimeout);
        tooltipTimeout = setTimeout(() => {
          tooltip.style.opacity = '0';
        }, 3000);
      });
      
      if (inStock && remainingSlots > 0) {
        img.addEventListener('click', () => addCharm(img));
      }
      
      menu.appendChild(imgWrapper);
    });
    
    categoryCard.appendChild(menu);
    categoriesGrid.appendChild(categoryCard);
  });
  
  section.appendChild(categoriesGrid);
  charmsContainer.appendChild(section);
}

// Event listeners
export async function init() {
  // Load inventory first
  await loadInventory();
  
  document.getElementById('clearBtn').addEventListener('click', clearBracelet);
  document.getElementById('generateBtn').addEventListener('click', generateBraceletCode);
  document.getElementById('decodeBtn').addEventListener('click', decodeBraceletCode);
  
  document.getElementById('hexCodeInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') decodeBraceletCode();
  });
  
  renderCharmCategories();
  renderBracelet();
}

export function decodeBraceletCode() {
  const hexInput = document.getElementById('hexCodeInput');
  const decodeMsg = document.getElementById('decodeMsg');
  const hexCode = hexInput.value.trim();
  
  if (!hexCode) {
    decodeMsg.textContent = 'Please paste a bracelet code';
    decodeMsg.style.color = 'red';
    return;
  }
  
  // Decode the hex code
  const decodedItems = Bracelet.decodeHexCode(hexCode);
  
  if (decodedItems.length === 0) {
    decodeMsg.textContent = 'Invalid bracelet code format';
    decodeMsg.style.color = 'red';
    return;
  }
  
  // Clear current bracelet
  Bracelet.clearBracelet();
  
  // Add decoded items with detailed validation
  let successCount = 0;
  let failureDetails = [];
  
  decodedItems.forEach((decodedItem, itemIndex) => {
    const category = decodedItem.category;
    const categoryIndex = decodedItem.categoryIndex;
    
    // Validate category exists
    if (!CHARM_CATEGORIES[category]) {
      failureDetails.push(`Charm ${itemIndex + 1}: Category "${category}" not found`);
      return;
    }
    
    const categoryCharms = CHARM_CATEGORIES[category];
    
    // Validate index within bounds
    if (categoryIndex >= categoryCharms.length) {
      failureDetails.push(`Charm ${itemIndex + 1}: Index ${categoryIndex} out of range for ${category} (${categoryCharms.length} items)`);
      return;
    }
    
    const charm = categoryCharms[categoryIndex];
    
    // Validate charm exists
    if (!charm || !charm.id) {
      failureDetails.push(`Charm ${itemIndex + 1}: Invalid charm data at ${category}[${categoryIndex}]`);
      return;
    }
    
    // Get price: prefer the explicit price in CHARM_CATEGORIES, otherwise fall back to pricing rules
    let price = (charm.price !== undefined && charm.price !== null) ? charm.price : getCharmPrice(charm.id, category, charm.metal);
    if (!price || price <= 0) {
      failureDetails.push(`Charm ${itemIndex + 1}: Invalid price (ID: ${charm.id})`);
      return;
    }
    
    // Get image URL and validate
    const src = getCharmImageUrl(charm.id, category, charm.metal);
    if (!src) {
      failureDetails.push(`Charm ${itemIndex + 1}: Could not generate image URL (ID: ${charm.id})`);
      return;
    }
    
    // All validations passed - add the charm
    Bracelet.addItem({
      id: charm.id,
      price,
      src,
      category,
      categoryIndex, // Store the index for encoding
      metal: charm.metal // Preserve metal info for PLAIN charms
    });
    successCount++;
  });
  
  if (successCount === 0) {
    decodeMsg.textContent = failureDetails.length > 0 
      ? `Failed: ${failureDetails[0]}`
      : 'Could not restore any charms from this code';
    decodeMsg.style.color = 'red';
    renderBracelet();
    return;
  }
  
  // Build success message
  let message = `✓ Restored ${successCount} charm${successCount !== 1 ? 's' : ''}`;
  if (failureDetails.length > 0) {
    message += ` (${failureDetails.length} failed)`;
  }
  message += '!';
  
  decodeMsg.textContent = message;
  decodeMsg.style.color = 'green';
  
  renderBracelet();
  hexInput.value = '';
  
  // Clear message after 4 seconds
  setTimeout(() => {
    decodeMsg.textContent = '';
  }, 4000);
}
