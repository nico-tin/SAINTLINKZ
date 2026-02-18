import { 
  CHARM_CATEGORIES, 
  getCharmImageUrl, 
  getCharmPrice,
  getCategoryInfo,
  getCharmCountInCategory,
  getMetalFromCategory,
  getBaseCategory
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
  const price = parseFloat(img.dataset.price);
  const src = img.src;
  const categoryIndex = parseInt(img.dataset.categoryIndex) || 0;
  
  Bracelet.addItem({ id, price, src, category: img.dataset.category, categoryIndex });
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
      btn.onclick = () => removeCharm(index);
      
      itemDiv.appendChild(img);
      itemDiv.appendChild(btn);
      braceletDiv.appendChild(itemDiv);
    });
  }
  
  updateDisplay();
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
      img.src = getCharmImageUrl(charm.id, category);
      img.className = 'charm';
      img.dataset.name = charm.id;
      img.dataset.price = charm.price;
      img.dataset.category = category;
      img.dataset.categoryIndex = index;  // Store the index in the category array
      img.loading = 'lazy';
      img.alt = `Charm ${charm.id}`;
      
      // Enhanced charm styling
      img.style.cssText = `
        width: 60px;
        height: 60px;
        object-fit: contain;
        cursor: pointer;
        padding: 4px;
        border-radius: 8px;
        transition: all 0.2s ease;
        background: #f5f5f5;
        border: 2px solid transparent;
      `;
      
      img.addEventListener('mouseenter', () => {
        img.style.cssText += 'transform: scale(1.15); border-color: #76023c; box-shadow: 0 4px 8px rgba(118, 2, 60, 0.3);';
      });
      
      img.addEventListener('mouseleave', () => {
        img.style.cssText = `
          width: 60px;
          height: 60px;
          object-fit: contain;
          cursor: pointer;
          padding: 4px;
          border-radius: 8px;
          transition: all 0.2s ease;
          background: #f5f5f5;
          border: 2px solid transparent;
        `;
      });
      
      // Tooltip on hover
      const tooltip = document.createElement('div');
      tooltip.className = 'charm-tooltip';
      tooltip.style.cssText = `
        position: absolute;
        bottom: 100%;
        left: 50%;
        transform: translateX(-50%);
        background: #76023c;
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
      tooltip.textContent = `₱${charm.price}`;
      
      const imgWrapper = document.createElement('div');
      imgWrapper.style.cssText = 'position: relative;';
      imgWrapper.appendChild(img);
      imgWrapper.appendChild(tooltip);
      
      img.addEventListener('mouseenter', () => {
        tooltip.style.opacity = '1';
      });
      
      img.addEventListener('mouseleave', () => {
        tooltip.style.opacity = '0';
      });
      
      img.addEventListener('click', () => addCharm(img));
      
      menu.appendChild(imgWrapper);
    });
    
    categoryCard.appendChild(menu);
    categoriesGrid.appendChild(categoryCard);
  });
  
  section.appendChild(categoriesGrid);
  charmsContainer.appendChild(section);
}

// Event listeners
export function init() {
  document.getElementById('clearBtn').addEventListener('click', clearBracelet);
  document.getElementById('generateBtn').addEventListener('click', generateBraceletCode);
  document.getElementById('decodeBtn').addEventListener('click', decodeBraceletCode);
  
  // Allow Enter key in input to trigger decode
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
  
  // Add decoded items
  let successCount = 0;
  decodedItems.forEach(decodedItem => {
    const category = decodedItem.category;
    const categoryIndex = decodedItem.categoryIndex;
    
    // Get the charms array for this category
    if (CHARM_CATEGORIES[category] && categoryIndex < CHARM_CATEGORIES[category].length) {
      const charm = CHARM_CATEGORIES[category][categoryIndex];
      if (charm) {
        const price = getCharmPrice(charm.id, category);
        const src = getCharmImageUrl(charm.id, category);
        
        if (src) {
          Bracelet.addItem({
            id: charm.id,
            price,
            src,
            category,
            categoryIndex // Store the index for encoding
          });
          successCount++;
        }
      }
    }
  });
  
  if (successCount === 0) {
    decodeMsg.textContent = 'Could not restore any charms from this code';
    decodeMsg.style.color = 'red';
    renderBracelet();
    return;
  }
  
  decodeMsg.textContent = `✓ Restored ${successCount} charm${successCount !== 1 ? 's' : ''} successfully!`;
  decodeMsg.style.color = 'green';
  
  renderBracelet();
  hexInput.value = '';
  
  // Clear message after 3 seconds
  setTimeout(() => {
    decodeMsg.textContent = '';
  }, 3000);
}
