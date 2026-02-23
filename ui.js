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
const metalFiltersContainer = document.getElementById('metalFilters');

// Current filter state: 'ALL' | 'GOLD' | 'SILVER' | 'PINK' | 'PLAIN'
let currentMetalFilter = 'ALL';
// Track current drag hover target to avoid repeated class toggles (prevents flicker)
let currentDragTarget = { el: null, mode: null };

function clearInsertClasses(el) {
  if (!el) return;
  el.classList.remove('drag-over', 'insert-before', 'insert-after', 'drop-center');
}

/**
 * Setup mobile touch drag handlers for a bracelet item
 */
function setupTouchHandlers(itemDiv, srcIndex) {
  let touchState = null;

  function findBraceletItemElement(el) {
    while (el && !el.classList.contains('bracelet-item')) el = el.parentElement;
    return el;
  }

  itemDiv.addEventListener('touchstart', (e) => {
    if (e.touches.length !== 1) return;
    const touch = e.touches[0];
    touchState = {
      srcIndex,
      ghost: null,
      holdTimer: null,
      dragging: false,
      startX: touch.clientX,
      startY: touch.clientY
    };

    touchState.holdTimer = setTimeout(() => {
      document.querySelectorAll('.bracelet-item').forEach(el => el.classList.remove('show-remove'));
      const ghost = itemDiv.cloneNode(true);
      ghost.style.position = 'fixed';
      ghost.style.left = touch.clientX + 'px';
      ghost.style.top = touch.clientY + 'px';
      ghost.style.transform = 'translate(-50%, -50%) scale(1.05)';
      ghost.style.pointerEvents = 'none';
      ghost.style.opacity = '0.95';
      ghost.style.zIndex = '9999';
      ghost.classList.add('drag-ghost');
      document.body.appendChild(ghost);
      touchState.ghost = ghost;
      touchState.dragging = true;
      itemDiv.classList.add('dragging');
    }, 180);
  }, { passive: false });

  itemDiv.addEventListener('touchmove', (e) => {
    if (!touchState) return;
    const touch = e.touches[0];
    const dx = Math.abs(touch.clientX - touchState.startX);
    const dy = Math.abs(touch.clientY - touchState.startY);
    
    if (!touchState.dragging && touchState.holdTimer && (dx > 12 || dy > 12)) {
      clearTimeout(touchState.holdTimer);
      touchState.holdTimer = null;
    }

    e.preventDefault();
    if (touchState.dragging && touchState.ghost) {
      touchState.ghost.style.left = touch.clientX + 'px';
      touchState.ghost.style.top = touch.clientY + 'px';

      const el = document.elementFromPoint(touch.clientX, touch.clientY);
      const targetItem = findBraceletItemElement(el);

      let mode = null;
      if (targetItem) {
        const rect = targetItem.getBoundingClientRect();
        const x = touch.clientX - rect.left;
        const ratio = x / rect.width;
        if (ratio < 0.4) mode = 'before';
        else if (ratio > 0.6) mode = 'after';
        else mode = 'center';
      }

      if (currentDragTarget.el === targetItem && currentDragTarget.mode === mode) return;

      document.querySelectorAll('.bracelet-item').forEach(el => el.classList.remove('drag-over','insert-before','insert-after','drop-center'));

      if (targetItem) {
        currentDragTarget.el = targetItem;
        currentDragTarget.mode = mode;
        if (mode === 'before') targetItem.classList.add('insert-before');
        else if (mode === 'after') targetItem.classList.add('insert-after');
        else targetItem.classList.add('drop-center');
      } else {
        currentDragTarget.el = null;
        currentDragTarget.mode = null;
      }
    }
  }, { passive: false });

  itemDiv.addEventListener('touchend', (e) => {
    if (!touchState) return;
    
    if (touchState.holdTimer && !touchState.dragging) {
      clearTimeout(touchState.holdTimer);
      touchState.holdTimer = null;
      const was = itemDiv.classList.contains('show-remove');
      document.querySelectorAll('.bracelet-item').forEach(el => el.classList.remove('show-remove'));
      if (!was) itemDiv.classList.add('show-remove');
      touchState = null;
      e.preventDefault();
      return;
    }

    const ghost = touchState.ghost;
    if (ghost && ghost.parentElement) ghost.parentElement.removeChild(ghost);
    itemDiv.classList.remove('dragging');
    
    const lastTouch = (e.changedTouches && e.changedTouches[0]) || null;
    let performed = false;
    
    if (lastTouch) {
      const el = document.elementFromPoint(lastTouch.clientX, lastTouch.clientY);
      const dropTarget = findBraceletItemElement(el);
      if (dropTarget && dropTarget.dataset.index !== undefined) {
        const rect = dropTarget.getBoundingClientRect();
        const x = lastTouch.clientX - rect.left;
        const ratio = x / rect.width;
        const targetIndex = parseInt(dropTarget.dataset.index);
        if (ratio < 0.4) {
          Bracelet.insertItem(touchState.srcIndex, targetIndex);
          performed = true;
        } else if (ratio > 0.6) {
          Bracelet.insertItem(touchState.srcIndex, targetIndex + 1);
          performed = true;
        } else {
          Bracelet.moveItem(touchState.srcIndex, targetIndex);
          performed = true;
        }
      }
    }

    if (!performed && typeof touchState.srcIndex === 'number') {
      Bracelet.insertItem(touchState.srcIndex, Bracelet.getBraceletItems().length);
    }

    if (currentDragTarget.el) clearInsertClasses(currentDragTarget.el);
    currentDragTarget.el = null;
    currentDragTarget.mode = null;
    document.querySelectorAll('.bracelet-item').forEach(el => el.classList.remove('drag-over'));
    renderBracelet();
    touchState = null;
  }, { passive: false });
}

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
      // stop click from bubbling to the item (which toggles show-remove)
      btn.style.touchAction = 'manipulation';
      btn.addEventListener('pointerdown', (ev) => {
        ev.preventDefault();
        ev.stopPropagation();
        // remove and clear any visible remove buttons
        removeCharm(index);
        document.querySelectorAll('.bracelet-item').forEach(el => el.classList.remove('show-remove'));
        renderCharmCategories(); // Update charm grid tooltips
        ev.stopImmediatePropagation();
      });
      // Fallback for environments without pointer events
      btn.addEventListener('click', (ev) => {
        ev.preventDefault();
        ev.stopPropagation();
        removeCharm(index);
        document.querySelectorAll('.bracelet-item').forEach(el => el.classList.remove('show-remove'));
        renderCharmCategories();
      });

      // clicking the item (not the remove button) toggles the remove button visibility
      itemDiv.addEventListener('click', (ev) => {
        // ignore clicks that originate from the remove button
        if (ev.target === btn) return;
        const was = itemDiv.classList.contains('show-remove');
        // hide others
        document.querySelectorAll('.bracelet-item').forEach(el => el.classList.remove('show-remove'));
        if (!was) itemDiv.classList.add('show-remove');
      });
      
      itemDiv.appendChild(img);
      itemDiv.appendChild(btn);
      braceletDiv.appendChild(itemDiv);

      // Make bracelet items draggable for reordering
      itemDiv.draggable = true;
      itemDiv.dataset.index = index;

      itemDiv.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', index.toString());
        e.dataTransfer.effectAllowed = 'move';
        // hide any visible remove buttons while dragging
        document.querySelectorAll('.bracelet-item').forEach(el => el.classList.remove('show-remove'));
        itemDiv.classList.add('dragging');
      });

      itemDiv.addEventListener('dragend', () => {
        itemDiv.classList.remove('dragging');
        if (currentDragTarget.el) clearInsertClasses(currentDragTarget.el);
        currentDragTarget.el = null;
        currentDragTarget.mode = null;
        document.querySelectorAll('.bracelet-item').forEach(el => el.classList.remove('drag-over'));
      });

      itemDiv.addEventListener('dragover', (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        // compute pointer position relative to item to decide insert-before/after or center-swap
        const rect = itemDiv.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const ratio = x / rect.width;

        // decide mode
        let mode = 'center';
        if (ratio < 0.4) mode = 'before';
        else if (ratio > 0.6) mode = 'after';

        // if unchanged target+mode, skip toggling classes to avoid flicker
        if (currentDragTarget.el === itemDiv && currentDragTarget.mode === mode) return;

        // clear previous (remove insert classes globally to avoid duplicate indicators)
        document.querySelectorAll('.bracelet-item').forEach(el => el.classList.remove('drag-over','insert-before','insert-after','drop-center'));

        // set new
        currentDragTarget.el = itemDiv;
        currentDragTarget.mode = mode;
        if (mode === 'before') itemDiv.classList.add('insert-before');
        else if (mode === 'after') itemDiv.classList.add('insert-after');
        else itemDiv.classList.add('drop-center');
      });

      itemDiv.addEventListener('dragleave', () => {
        itemDiv.classList.remove('drag-over','insert-before','insert-after','drop-center');
      });

      itemDiv.addEventListener('drop', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const src = parseInt(e.dataTransfer.getData('text/plain'));
        if (isNaN(src)) return;
        const destIndex = parseInt(itemDiv.dataset.index);
        const rect = itemDiv.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const ratio = x / rect.width;

        if (ratio < 0.4) {
          // insert before
          Bracelet.insertItem(src, destIndex);
        } else if (ratio > 0.6) {
          // insert after
          Bracelet.insertItem(src, destIndex + 1);
        } else {
          // center -> swap
          Bracelet.moveItem(src, destIndex);
        }

        // cleanup classes
        document.querySelectorAll('.bracelet-item').forEach(el => el.classList.remove('drag-over','insert-before','insert-after','drop-center','dragging'));
        renderBracelet();
      });

      // Setup mobile touch drag handlers
      setupTouchHandlers(itemDiv, index);
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
  renderFilterControls();

  // Group categories by metal type for better UI organization
  const silverCategories = Object.keys(CHARM_CATEGORIES).filter(cat => cat.includes("SILVER"));
  const goldCategories = Object.keys(CHARM_CATEGORIES).filter(cat => cat.includes("GOLD"));
  const pinkCategories = Object.keys(CHARM_CATEGORIES).filter(cat => cat.includes("PINK"));

  // Render based on current filter
  if (currentMetalFilter === 'PLAIN') {
    if (CHARM_CATEGORIES["PLAIN"]) renderMetalSection("PLAIN", ["PLAIN"]);
    return;
  }

  if (currentMetalFilter === 'SILVER') {
    if (silverCategories.length > 0) renderMetalSection("SILVER", silverCategories);
    return;
  }

  if (currentMetalFilter === 'GOLD') {
    if (goldCategories.length > 0) renderMetalSection("GOLD", goldCategories);
    return;
  }

  if (currentMetalFilter === 'PINK') {
    if (pinkCategories.length > 0) renderMetalSection("PINK", pinkCategories);
    return;
  }

  // Default: ALL - render all sections in a logical order
  if (CHARM_CATEGORIES["PLAIN"]) {
    renderMetalSection("PLAIN", ["PLAIN"]);
  }

  if (silverCategories.length > 0) {
    renderMetalSection("SILVER", silverCategories);
  }

  if (pinkCategories.length > 0) {
    const separator1 = document.createElement('div');
    separator1.style.cssText = 'margin: 30px 0; border-top: 2px dashed #aaa; opacity: 0.3;';
    charmsContainer.appendChild(separator1);
    renderMetalSection("PINK", pinkCategories);
  }

  const separator = document.createElement('div');
  separator.style.cssText = 'margin: 40px 0; border-top: 3px solid #76023c; opacity: 0.3;';
  charmsContainer.appendChild(separator);

  if (goldCategories.length > 0) {
    renderMetalSection("GOLD", goldCategories);
  }
}

/**
 * Create a charm wrapper with image and tooltip
 */
function createCharmElement(charm, category, index, inStock, stock, currentCount, remainingSlots) {
  const wrapper = document.createElement('div');
  wrapper.className = 'charm-wrapper';
  
  const img = document.createElement('img');
  img.src = getCharmImageUrl(charm.id, category, charm.metal);
  img.className = `charm ${!inStock ? 'out-of-stock' : remainingSlots === 0 ? 'max-reached' : ''}`;
  img.dataset.name = charm.id;
  img.dataset.price = charm.price;
  img.dataset.category = category;
  if (charm.metal) img.dataset.metal = charm.metal;
  img.dataset.categoryIndex = index;
  img.loading = 'lazy';
  img.alt = `Charm ${charm.id}`;
  img.setAttribute('role', 'button');
  img.setAttribute('tabindex', '0');
  
  // Tooltip
  const tooltip = document.createElement('div');
  tooltip.className = 'charm-tooltip';
  
  if (!inStock) {
    tooltip.textContent = 'Out of Stock';
    tooltip.setAttribute('data-status', 'out-of-stock');
  } else if (remainingSlots === 0) {
    tooltip.textContent = 'Max Reached';
    tooltip.setAttribute('data-status', 'max-reached');
  } else {
    tooltip.textContent = `₱${charm.price} (${remainingSlots} left)`;
    tooltip.setAttribute('data-status', 'available');
  }
  
  // Stock badge
  if (!inStock) {
    const badge = document.createElement('div');
    badge.className = 'stock-badge out';
    badge.textContent = '0';
    wrapper.appendChild(badge);
  } else if (remainingSlots === 0) {
    const badge = document.createElement('div');
    badge.className = 'stock-badge max';
    badge.textContent = '✓';
    wrapper.appendChild(badge);
  } else if (stock < 10) {
    const badge = document.createElement('div');
    badge.className = 'stock-badge low';
    badge.textContent = remainingSlots;
    wrapper.appendChild(badge);
  }
  
  // Tooltip display handlers - only show one tooltip at a time
  let tooltipTimeout;
  const showTooltip = () => {
    // Hide all other tooltips
    document.querySelectorAll('.charm-tooltip').forEach(t => {
      if (t !== tooltip) {
        t.style.opacity = '0';
        clearTimeout(t.dataset.timeoutId);
      }
    });
    tooltip.style.opacity = '1';
    clearTimeout(tooltipTimeout);
  };
  const hideTooltip = () => {
    clearTimeout(tooltipTimeout);
    tooltipTimeout = setTimeout(() => { tooltip.style.opacity = '0'; }, 2000);
    tooltip.dataset.timeoutId = tooltipTimeout;
  };
  
  img.addEventListener('mouseenter', showTooltip);
  img.addEventListener('mouseleave', hideTooltip);
  img.addEventListener('click', () => {
    showTooltip();
    if (inStock && remainingSlots > 0) addCharm(img);
  });
  img.addEventListener('touchstart', showTooltip, { passive: true });
  img.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (inStock && remainingSlots > 0) addCharm(img);
    }
  });
  
  wrapper.appendChild(img);
  wrapper.appendChild(tooltip);
  return wrapper;
}

/**
 * Render a metal section (SILVER or GOLD) with organized categories
 */
function renderMetalSection(metal, categories) {
  const section = document.createElement('div');
  section.className = 'metal-section';
  
  // Section header
  const title = document.createElement('h1');
  title.textContent = metal;
  section.appendChild(title);
  
  // Container for category cards
  const categoriesGrid = document.createElement('div');
  categoriesGrid.className = 'categories-grid';
  
  categories.forEach(category => {
    const charms = CHARM_CATEGORIES[category];
    const baseCategory = getBaseCategory(category);
    const catInfo = getCategoryInfo(category);
    const charmCount = getCharmCountInCategory(category);
    
    const categoryCard = document.createElement('div');
    categoryCard.className = 'category-card';
    
    // Category header
    const catHeader = document.createElement('div');
    catHeader.className = 'category-header';
    
    const icon = document.createElement('span');
    icon.className = 'category-icon';
    icon.textContent = catInfo.icon;
    
    const catInfo_div = document.createElement('div');
    catInfo_div.className = 'category-info';
    const catTitle = document.createElement('h3');
    catTitle.textContent = baseCategory;
    const description = document.createElement('p');
    description.className = 'category-description';
    description.textContent = catInfo.description;
    catInfo_div.appendChild(catTitle);
    catInfo_div.appendChild(description);
    
    const badge = document.createElement('div');
    badge.className = 'category-count-badge';
    badge.textContent = charmCount;
    
    catHeader.appendChild(icon);
    catHeader.appendChild(catInfo_div);
    catHeader.appendChild(badge);
    categoryCard.appendChild(catHeader);
    
    // Charms grid
    const menu = document.createElement('div');
    menu.className = 'charm-menu';
    
    charms.forEach((charm, index) => {
      const inStock = isCharmInStock(charm.id);
      const stock = getCharmStock(charm.id);
      const currentCount = Bracelet.countCharmById(charm.id);
      const remainingSlots = stock - currentCount;
      
      const charmEl = createCharmElement(charm, category, index, inStock, stock, currentCount, remainingSlots);
      menu.appendChild(charmEl);
    });
    
    categoryCard.appendChild(menu);
    categoriesGrid.appendChild(categoryCard);
  });
  
  section.appendChild(categoriesGrid);
  charmsContainer.appendChild(section);
}

// Render the metal filter buttons (All / Gold / Silver / Pink / Plain)
function renderFilterControls() {
  if (!metalFiltersContainer) return;
  metalFiltersContainer.innerHTML = '';
  const options = [
    { key: 'ALL', label: 'All' },
    { key: 'GOLD', label: 'Gold' },
    { key: 'SILVER', label: 'Silver' },
    { key: 'PINK', label: 'Pink' },
    { key: 'PLAIN', label: 'Plain' }
  ];

  options.forEach(opt => {
    const btn = document.createElement('button');
    btn.textContent = opt.label;
    if (currentMetalFilter === opt.key) btn.classList.add('active');
    btn.addEventListener('click', () => {
      currentMetalFilter = opt.key;
      // Update classes
      Array.from(metalFiltersContainer.querySelectorAll('button')).forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderCharmCategories();
    });
    metalFiltersContainer.appendChild(btn);
  });
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
  
  // Allow dropping on the bracelet area to move item to the end
  if (braceletDiv) {
    braceletDiv.addEventListener('dragover', (e) => {
      e.preventDefault();
    });

    braceletDiv.addEventListener('drop', (e) => {
      e.preventDefault();
      const src = parseInt(e.dataTransfer.getData('text/plain'));
      if (isNaN(src)) return;
      // Append to end when dropped on empty bracelet area
      const dest = Bracelet.getBraceletItems().length;
      Bracelet.insertItem(src, dest);
      renderBracelet();
    });
  }
  renderFilterControls();
  renderCharmCategories();
  renderBracelet();

  // Global: hide any visible remove buttons when clicking or touching outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest || !e.target.closest('.bracelet-item')) {
      document.querySelectorAll('.bracelet-item').forEach(el => el.classList.remove('show-remove'));
    }
  });

  document.addEventListener('touchstart', (e) => {
    if (!e.target.closest || !e.target.closest('.bracelet-item')) {
      document.querySelectorAll('.bracelet-item').forEach(el => el.classList.remove('show-remove'));
    }
  }, { passive: true });
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
