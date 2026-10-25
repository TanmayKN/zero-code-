/**
 * Simple Scaler & My Recipes
 * Pure Vanilla JavaScript Implementation
 * Clean Swiss Design, No Emojis, Zero External Dependencies, Offline-Ready
 */

(function () {
  'use strict';

  // ---------------------------------------------------------------------------
  // Default Pantry Database (Categorized, No Emojis)
  // ---------------------------------------------------------------------------
  const DEFAULT_PANTRY = [
    { name: 'All-Purpose Flour', unit: 'cups', defaultPrice: '0.40', category: 'baking' },
    { name: 'Baking Powder', unit: 'tsp', defaultPrice: '0.15', category: 'baking' },
    { name: 'Black Pepper', unit: 'tsp', defaultPrice: '0.10', category: 'seasoning' },
    { name: 'Butter', unit: 'cups', defaultPrice: '2.50', category: 'dairy' },
    { name: 'Chicken Breast', unit: 'grams', defaultPrice: '0.015', category: 'protein' },
    { name: 'Chocolate Chips', unit: 'cups', defaultPrice: '1.75', category: 'baking' },
    { name: 'Crushed Tomatoes', unit: 'cups', defaultPrice: '0.95', category: 'produce' },
    { name: 'Eggs', unit: 'pieces', defaultPrice: '0.40', category: 'dairy' },
    { name: 'Fettuccine Pasta', unit: 'grams', defaultPrice: '0.006', category: 'baking' },
    { name: 'Fresh Basil', unit: 'tbsp', defaultPrice: '0.30', category: 'seasoning' },
    { name: 'Fresh Mozzarella', unit: 'grams', defaultPrice: '0.02', category: 'dairy' },
    { name: 'Garlic', unit: 'tsp', defaultPrice: '0.15', category: 'produce' },
    { name: 'Heavy Cream', unit: 'cups', defaultPrice: '1.80', category: 'dairy' },
    { name: 'Lime Juice', unit: 'tbsp', defaultPrice: '0.35', category: 'produce' },
    { name: 'Milk', unit: 'cups', defaultPrice: '0.50', category: 'dairy' },
    { name: 'Olive Oil', unit: 'tbsp', defaultPrice: '0.25', category: 'seasoning' },
    { name: 'Onion', unit: 'cups', defaultPrice: '0.60', category: 'produce' },
    { name: 'Parmesan Cheese', unit: 'cups', defaultPrice: '2.80', category: 'dairy' },
    { name: 'Rice', unit: 'cups', defaultPrice: '0.45', category: 'baking' },
    { name: 'Ripe Avocados', unit: 'pieces', defaultPrice: '1.50', category: 'produce' },
    { name: 'Salt', unit: 'tsp', defaultPrice: '0.05', category: 'seasoning' },
    { name: 'Sugar', unit: 'cups', defaultPrice: '0.35', category: 'baking' },
    { name: 'Tomato Sauce', unit: 'cups', defaultPrice: '1.10', category: 'produce' }
  ];

  // ---------------------------------------------------------------------------
  // Curated Preset Recipes (No Emojis)
  // ---------------------------------------------------------------------------
  const PREMADE_RECIPES = [
    {
      id: 'premade-pizza',
      type: 'curated',
      name: 'Classic Margherita Pizza',
      makes: 2,
      ingredients: [
        { name: 'All-Purpose Flour', amount: 2, unit: 'cups', price: '0.40' },
        { name: 'Tomato Sauce', amount: 0.75, unit: 'cups', price: '1.10' },
        { name: 'Fresh Mozzarella', amount: 150, unit: 'grams', price: '0.02' }
      ]
    },
    {
      id: 'premade-cookies',
      type: 'curated',
      name: "Grandma's Chocolate Chip Cookies",
      makes: 12,
      ingredients: [
        { name: 'All-Purpose Flour', amount: 2.5, unit: 'cups', price: '0.40' },
        { name: 'Butter', amount: 1, unit: 'cups', price: '2.50' },
        { name: 'Chocolate Chips', amount: 2, unit: 'cups', price: '1.75' }
      ]
    },
    {
      id: 'premade-alfredo',
      type: 'curated',
      name: 'Creamy Garlic Alfredo Pasta',
      makes: 4,
      ingredients: [
        { name: 'Fettuccine Pasta', amount: 400, unit: 'grams', price: '0.006' },
        { name: 'Heavy Cream', amount: 1.5, unit: 'cups', price: '1.80' },
        { name: 'Parmesan Cheese', amount: 1, unit: 'cups', price: '2.80' }
      ]
    },
    {
      id: 'premade-guac',
      type: 'curated',
      name: 'Fresh Garden Guacamole',
      makes: 4,
      ingredients: [
        { name: 'Ripe Avocados', amount: 3, unit: 'pieces', price: '1.50' },
        { name: 'Lime Juice', amount: 2, unit: 'tbsp', price: '0.35' },
        { name: 'Tomato Sauce', amount: 1, unit: 'cups', price: '1.10' }
      ]
    },
    {
      id: 'premade-bolognese',
      type: 'curated',
      name: 'Authentic Beef Bolognese',
      makes: 6,
      ingredients: [
        { name: 'Chicken Breast', amount: 500, unit: 'grams', price: '0.015' },
        { name: 'Crushed Tomatoes', amount: 2, unit: 'cups', price: '0.95' },
        { name: 'Onion', amount: 1, unit: 'cups', price: '0.60' }
      ]
    },
    {
      id: 'premade-pancakes',
      type: 'curated',
      name: 'Fluffy Golden Pancakes',
      makes: 4,
      ingredients: [
        { name: 'All-Purpose Flour', amount: 2, unit: 'cups', price: '0.40' },
        { name: 'Milk', amount: 1.5, unit: 'cups', price: '0.50' },
        { name: 'Eggs', amount: 2, unit: 'pieces', price: '0.40' }
      ]
    }
  ];

  // Storage Keys
  const STORAGE = {
    USER_NAME: 'scaler_v2_username',
    THEME: 'scaler_v2_theme',
    CURRENCY: 'scaler_v2_currency',
    FRACTIONS: 'scaler_v2_fractions',
    IGNORE_PRICE_BANNER: 'scaler_v2_ignore_price_banner',
    WELCOME_IGNORED: 'scaler_v2_welcome_ignored',
    CUSTOM_PANTRY: 'scaler_v2_custom_pantry',
    CUSTOM_RECIPES: 'scaler_v2_custom_recipes',
    ACTIVE_VIEW: 'scaler_v2_active_view',
    FORM_STATE: 'scaler_v2_form_state',
    HAS_RESULTS: 'scaler_v2_has_results'
  };

  // State
  let customPantry = [];
  let customRecipes = [];
  let currentCurrency = '$';
  let showFractions = true;
  let activeView = 'home'; // 'home', 'scaler', 'recipes'
  let currentRecipeFilter = 'all';
  let activePickerTargetRow = null;
  let currentPickerCategory = 'all';

  function filterIngredients(list, query = '', category = 'all') {
    if (!Array.isArray(list)) return [];
    const q = String(query).toLowerCase().trim();
    const cat = String(category).toLowerCase().trim();
    return list.filter((item) => {
      const matchesName = !q || item.name.toLowerCase().includes(q);
      const matchesCat = cat === 'all' || (item.category && item.category.toLowerCase() === cat);
      return matchesName && matchesCat;
    });
  }

  // ---------------------------------------------------------------------------
  // Pure Math & Formatting Helpers
  // ---------------------------------------------------------------------------
  function scaleCalculation(orig, makes, wanted) {
    const o = Number(orig);
    const m = Number(makes);
    const w = Number(wanted);
    if (isNaN(o) || isNaN(m) || isNaN(w) || m <= 0 || w <= 0 || o <= 0) {
      return 0;
    }
    return (o * w) / m;
  }

  function formatCleanNumber(val) {
    if (val === 0) return '0';
    const rounded = Math.round(val * 100) / 100;
    return String(rounded);
  }

  function formatMoney(amount, currency = currentCurrency) {
    const num = Number(amount);
    if (isNaN(num) || num < 0) return currency + '0.00';
    return currency + num.toFixed(2);
  }

  function getFractionString(val) {
    if (val <= 0) return '';
    const whole = Math.floor(val);
    const remainder = val - whole;
    const tolerance = 0.045;

    let frac = '';
    if (Math.abs(remainder - 0.25) < tolerance) frac = '1/4';
    else if (Math.abs(remainder - 0.333) < tolerance) frac = '1/3';
    else if (Math.abs(remainder - 0.5) < tolerance) frac = '1/2';
    else if (Math.abs(remainder - 0.667) < tolerance) frac = '2/3';
    else if (Math.abs(remainder - 0.75) < tolerance) frac = '3/4';
    else if (Math.abs(remainder - 0.125) < tolerance) frac = '1/8';
    else if (Math.abs(remainder - 0.375) < tolerance) frac = '3/8';
    else if (Math.abs(remainder - 0.625) < tolerance) frac = '5/8';
    else if (Math.abs(remainder - 0.875) < tolerance) frac = '7/8';

    if (!frac) return '';
    return whole > 0 ? `${whole} ${frac}` : frac;
  }

  function validatePositiveNumber(raw, label) {
    const trimmed = String(raw ?? '').trim();
    if (trimmed === '') {
      return { valid: false, error: `Please enter ${label}` };
    }
    const num = Number(trimmed);
    if (isNaN(num)) {
      return { valid: false, error: 'Must be a valid number' };
    }
    if (num <= 0) {
      return { valid: false, error: 'Must be greater than 0' };
    }
    if (num > 1000000) {
      return { valid: false, error: 'Value is too large' };
    }
    return { valid: true, value: num };
  }

  // ---------------------------------------------------------------------------
  // Pricing Rule Evaluator (Check: If even 1 ingredient has no price, Price not available)
  // ---------------------------------------------------------------------------
  function calculateRecipePrice(ingredients) {
    if (!Array.isArray(ingredients) || ingredients.length === 0) {
      return { available: false, message: 'Price not available' };
    }
    let total = 0;
    for (const item of ingredients) {
      const rawPrice = item.price;
      if (rawPrice === undefined || rawPrice === null || String(rawPrice).trim() === '') {
        return { available: false, message: 'Price not available' };
      }
      const num = Number(rawPrice);
      if (isNaN(num) || num <= 0) {
        return { available: false, message: 'Price not available' };
      }
      const amount = Number(item.scaledAmount ?? item.amount ?? 0);
      total += amount * num;
    }
    const rounded = Math.round(total * 100) / 100;
    return {
      available: true,
      totalCost: rounded,
      formatted: formatMoney(rounded)
    };
  }

  // ---------------------------------------------------------------------------
  // DOM Cache
  // ---------------------------------------------------------------------------
  const dom = {
    // Shell & Views
    appShell: document.getElementById('app-shell'),
    viewHome: document.getElementById('view-home'),
    viewScaler: document.getElementById('view-scaler'),
    viewRecipes: document.getElementById('view-recipes'),

    // Nav
    headerLogoHome: document.getElementById('header-logo-home'),
    navHomeBtn: document.getElementById('nav-home-btn'),
    navScalerBtn: document.getElementById('nav-scaler-btn'),
    navRecipesBtn: document.getElementById('nav-recipes-btn'),
    headerRecipeCount: document.getElementById('header-recipe-count'),
    scalerBackHomeBtn: document.getElementById('scaler-back-home-btn'),
    recipesBackHomeBtn: document.getElementById('recipes-back-home-btn'),

    // 2 Giant Boxes
    giantBoxScaler: document.getElementById('giant-box-scaler'),
    giantBoxRecipes: document.getElementById('giant-box-recipes'),

    // Fullscreen Onboarding
    initialOnboardingScreen: document.getElementById('initial-onboarding-screen'),
    onboardingForm: document.getElementById('onboarding-form'),
    onboardingNameInput: document.getElementById('onboarding-name-input'),
    onboardingErrorMsg: document.getElementById('onboarding-error-msg'),
    onboardingSkipBtn: document.getElementById('onboarding-skip-btn'),

    // Header User Menu & Dropdown
    userMenuBtn: document.getElementById('user-menu-btn'),
    userMenuName: document.getElementById('user-menu-name'),
    userDropdownMenu: document.getElementById('user-dropdown-menu'),
    dropdownUserFull: document.getElementById('dropdown-user-full'),
    menuEditNameBtn: document.getElementById('menu-edit-name-btn'),
    menuSettingsBtn: document.getElementById('menu-settings-btn'),

    // Quick Theme Toggle
    quickThemeToggle: document.getElementById('quick-theme-toggle'),

    // Edit Name Modal
    editNameModal: document.getElementById('edit-name-modal'),
    editNameInput: document.getElementById('edit-name-input'),
    editNameError: document.getElementById('edit-name-error'),
    editNameSaveBtn: document.getElementById('edit-name-save-btn'),
    editNameCancelBtn: document.getElementById('edit-name-cancel-btn'),

    // Welcome Banner with Ignore button
    welcomeEntryBanner: document.getElementById('welcome-entry-banner'),
    ignoreWelcomeBannerBtn: document.getElementById('ignore-welcome-banner-btn'),

    // Ingredient Picker Modal
    ingredientPickerModal: document.getElementById('ingredient-picker-modal'),
    pickerCloseXBtn: document.getElementById('picker-close-x-btn'),
    pickerCancelBtn: document.getElementById('picker-cancel-btn'),
    pickerSearchInput: document.getElementById('picker-search-input'),
    pickerSearchClearBtn: document.getElementById('picker-search-clear-btn'),
    pickerCategories: document.querySelectorAll('.picker-cat-btn'),
    pickerIngredientsGrid: document.getElementById('picker-ingredients-grid'),
    pickerResultsCount: document.getElementById('picker-results-count'),

    // Settings Modal
    settingsModal: document.getElementById('settings-modal'),
    settingsCloseBtn: document.getElementById('settings-close-btn'),
    settingsCloseXBtn: document.getElementById('settings-close-x-btn'),
    settingsThemeToggleBtn: document.getElementById('settings-theme-toggle-btn'),
    settingsThemeLabel: document.getElementById('settings-theme-label'),
    settingsNameInput: document.getElementById('settings-name-input'),
    settingsCurrencySelect: document.getElementById('settings-currency-select'),
    settingsFractionsSelect: document.getElementById('settings-fractions-select'),
    settingsResetBannerBtn: document.getElementById('settings-reset-banner-btn'),
    settingsResetDataBtn: document.getElementById('settings-reset-data-btn'),
    settingsSaveBtn: document.getElementById('settings-save-btn'),

    // Pantry Registry Form (At top of Scaler)
    newIngredientForm: document.getElementById('new-ingredient-form'),
    newIngName: document.getElementById('new-ing-name'),
    newIngUnit: document.getElementById('new-ing-unit'),
    newIngPrice: document.getElementById('new-ing-price'),
    newIngError: document.getElementById('new-ing-error'),

    // Scaler Form
    scalerMainForm: document.getElementById('scaler-main-form'),
    dishName: document.getElementById('dish-name'),
    dishNameError: document.getElementById('dish-name-error'),
    servingsMakes: document.getElementById('servings-makes'),
    servingsMakesError: document.getElementById('servings-makes-error'),
    servingsWanted: document.getElementById('servings-wanted'),
    servingsWantedError: document.getElementById('servings-wanted-error'),
    multiplierChips: document.querySelectorAll('.multiplier-chip'),
    ingredientsContainer: document.getElementById('ingredients-container'),
    addIngredientRowBtn: document.getElementById('add-ingredient-row-btn'),

    // Notice Banner (with Ignore button)
    priceNoticeBanner: document.getElementById('price-notice-banner'),
    ignorePriceBannerBtn: document.getElementById('ignore-price-banner-btn'),

    // Alerts & Action Buttons
    scalerValidationAlert: document.getElementById('scaler-validation-alert'),
    scalerValidationText: document.getElementById('scaler-validation-text'),
    scaleActionBtn: document.getElementById('scale-action-btn'),
    saveRecipeActionBtn: document.getElementById('save-recipe-action-btn'),
    resetScalerActionBtn: document.getElementById('reset-scaler-action-btn'),

    // Results Card
    resultsCard: document.getElementById('results-card'),
    resultsDishName: document.getElementById('results-dish-name'),
    resultsOriginalServings: document.getElementById('results-original-servings'),
    resultsTargetServings: document.getElementById('results-target-servings'),
    resultsMultiplierPill: document.getElementById('results-multiplier-pill'),
    resultsIngredientsList: document.getElementById('results-ingredients-list'),
    resultsCostValue: document.getElementById('results-cost-value'),
    pricingNoteText: document.getElementById('pricing-note-text'),
    copyScaledBtn: document.getElementById('copy-scaled-btn'),
    printScaledBtn: document.getElementById('print-scaled-btn'),

    // My Recipes View
    recipesGridContainer: document.getElementById('recipes-grid-container'),
    filterTabAll: document.getElementById('filter-tab-all'),
    filterTabCurated: document.getElementById('filter-tab-curated'),
    filterTabCustom: document.getElementById('filter-tab-custom'),
    countAll: document.getElementById('count-all'),
    countCustom: document.getElementById('count-custom'),

    // Toast
    toastElement: document.getElementById('toast-element'),
    toastMessageText: document.getElementById('toast-message-text')
  };

  // ---------------------------------------------------------------------------
  // Toast Helper
  // ---------------------------------------------------------------------------
  let toastTimeout = null;
  function showToast(msg) {
    if (toastTimeout) clearTimeout(toastTimeout);
    dom.toastMessageText.textContent = msg;
    dom.toastElement.classList.remove('hidden');
    toastTimeout = setTimeout(() => {
      dom.toastElement.classList.add('hidden');
    }, 2800);
  }

  // ---------------------------------------------------------------------------
  // Pantry Registry (Custom Ingredients Storage & List)
  // ---------------------------------------------------------------------------
  function loadPantryFromStorage() {
    const raw = localStorage.getItem(STORAGE.CUSTOM_PANTRY);
    if (raw) {
      try {
        customPantry = JSON.parse(raw);
      } catch {
        customPantry = [];
      }
    } else {
      customPantry = [];
    }
  }

  function getAllPantryIngredients() {
    const combined = [...customPantry, ...DEFAULT_PANTRY];
    // Deduplicate by lowercase name
    const map = new Map();
    combined.forEach((item) => {
      const key = item.name.toLowerCase().trim();
      if (!map.has(key)) {
        map.set(key, item);
      }
    });
    return Array.from(map.values()).sort((a, b) => a.name.localeCompare(b.name));
  }

  function initPantryRegistry() {
    loadPantryFromStorage();

    dom.newIngredientForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = dom.newIngName.value.trim();
      const unit = dom.newIngUnit.value;
      const price = dom.newIngPrice.value.trim();

      if (!name) {
        dom.newIngError.textContent = 'Please enter an ingredient name';
        dom.newIngError.classList.remove('hidden');
        return;
      }
      dom.newIngError.classList.add('hidden');

      const newEntry = { name, unit, defaultPrice: price || '' };
      customPantry.push(newEntry);
      localStorage.setItem(STORAGE.CUSTOM_PANTRY, JSON.stringify(customPantry));

      dom.newIngName.value = '';
      dom.newIngPrice.value = '';

      // Refresh all ingredient dropdowns in existing rows
      refreshAllIngredientDropdowns();
      showToast(`Added "${name}" to pantry registry.`);
    });
  }

  function refreshAllIngredientDropdowns() {
    const rows = getIngredientRows();
    const pantryList = getAllPantryIngredients();

    rows.forEach((row) => {
      const select = row.querySelector('.ing-select');
      if (select) {
        const curVal = select.value;
        populateSelectOptions(select, pantryList, curVal);
      }
    });
  }

  function populateSelectOptions(select, pantryList, selectedName) {
    select.innerHTML = '';

    const defaultOpt = document.createElement('option');
    defaultOpt.value = '';
    defaultOpt.textContent = '-- Select Ingredient --';
    select.appendChild(defaultOpt);

    pantryList.forEach((ing) => {
      const opt = document.createElement('option');
      opt.value = ing.name;
      opt.textContent = ing.name;
      opt.dataset.unit = ing.unit || 'cups';
      opt.dataset.price = ing.defaultPrice || '';
      if (selectedName && ing.name.toLowerCase() === selectedName.toLowerCase()) {
        opt.selected = true;
      }
      select.appendChild(opt);
    });

    const customOpt = document.createElement('option');
    customOpt.value = '__custom__';
    customOpt.textContent = '+ Custom One-Off Ingredient...';
    if (selectedName === '__custom__') customOpt.selected = true;
    select.appendChild(customOpt);
  }

  // ---------------------------------------------------------------------------
  // Ingredient Rows Management (with Dropdown Menu)
  // ---------------------------------------------------------------------------
  function getIngredientRows() {
    return Array.from(dom.ingredientsContainer.querySelectorAll('.ingredient-item-row'));
  }

  function updateRowRemoveButtons() {
    const rows = getIngredientRows();
    const canRemove = rows.length > 3;
    rows.forEach((row) => {
      const btn = row.querySelector('.btn-remove-ing');
      if (btn) {
        if (canRemove) {
          btn.classList.remove('hidden');
        } else {
          btn.classList.add('hidden');
        }
      }
    });
  }

  function createIngredientRow(name = '', amount = '', unit = 'cups', price = '') {
    const rows = getIngredientRows();
    const newIdx = rows.length + 1;

    const row = document.createElement('div');
    row.className = 'ingredient-item-row';
    row.dataset.rowIndex = String(newIdx);

    const pantryList = getAllPantryIngredients();
    const isKnownPantry = pantryList.some((p) => p.name.toLowerCase() === name.toLowerCase());
    const isCustom = name && !isKnownPantry;

    row.innerHTML = `
      <div class="ing-cell ing-cell-name">
        <label for="ing-select-${newIdx}" class="field-label-xs">Ingredient ${newIdx}</label>
        <select id="ing-select-${newIdx}" class="select-input select-compact ing-select"></select>
        <div class="custom-ing-input-wrap ${isCustom ? '' : 'hidden'}">
          <input type="text" class="text-input input-compact custom-name-input" placeholder="Type custom ingredient name" value="${isCustom ? escapeHtml(name) : ''}" />
        </div>
        <span class="error-text hidden row-name-error" role="alert"></span>
      </div>

      <div class="ing-cell">
        <label for="ing-amount-${newIdx}" class="field-label-xs">Amount</label>
        <input type="number" id="ing-amount-${newIdx}" class="number-input input-compact ing-amount" min="0.01" step="any" placeholder="e.g. 1" value="${escapeHtml(amount)}" required />
        <span class="error-text hidden row-amount-error" role="alert"></span>
      </div>

      <div class="ing-cell">
        <label for="ing-unit-${newIdx}" class="field-label-xs">Unit</label>
        <select id="ing-unit-${newIdx}" class="select-input select-compact ing-unit">
          <option value="cups" ${unit === 'cups' ? 'selected' : ''}>cups</option>
          <option value="tbsp" ${unit === 'tbsp' ? 'selected' : ''}>tbsp</option>
          <option value="tsp" ${unit === 'tsp' ? 'selected' : ''}>tsp</option>
          <option value="grams" ${unit === 'grams' ? 'selected' : ''}>grams (g)</option>
          <option value="kg" ${unit === 'kg' ? 'selected' : ''}>kg</option>
          <option value="ml" ${unit === 'ml' ? 'selected' : ''}>ml</option>
          <option value="liters" ${unit === 'liters' ? 'selected' : ''}>liters (L)</option>
          <option value="oz" ${unit === 'oz' ? 'selected' : ''}>oz</option>
          <option value="lbs" ${unit === 'lbs' ? 'selected' : ''}>lbs</option>
          <option value="pieces" ${unit === 'pieces' ? 'selected' : ''}>pieces</option>
          <option value="pinch" ${unit === 'pinch' ? 'selected' : ''}>pinch</option>
        </select>
      </div>

      <div class="ing-cell">
        <label for="ing-price-${newIdx}" class="field-label-xs">Price ($ Optional)</label>
        <input type="number" id="ing-price-${newIdx}" class="number-input input-compact ing-price" min="0" step="0.01" placeholder="e.g. 0.50" value="${escapeHtml(price)}" />
      </div>

      <div class="ing-cell ing-cell-actions">
        <button type="button" class="btn-remove-ing ${rows.length >= 3 ? '' : 'hidden'}" title="Remove ingredient">✕</button>
      </div>
    `;

    // Populate dropdown options
    const select = row.querySelector('.ing-select');
    populateSelectOptions(select, pantryList, isCustom ? '__custom__' : name);

    attachRowEvents(row);
    dom.ingredientsContainer.appendChild(row);
    updateRowRemoveButtons();
    return row;
  }

  function attachRowEvents(row) {
    const select = row.querySelector('.ing-select');
    const customInputWrap = row.querySelector('.custom-ing-input-wrap');
    const customNameInput = row.querySelector('.custom-name-input');
    const amountInput = row.querySelector('.ing-amount');
    const unitSelect = row.querySelector('.ing-unit');
    const priceInput = row.querySelector('.ing-price');
    const removeBtn = row.querySelector('.btn-remove-ing');

    select.addEventListener('change', () => {
      const selectedOpt = select.options[select.selectedIndex];
      if (select.value === '__custom__') {
        customInputWrap.classList.remove('hidden');
        customNameInput.focus();
      } else {
        customInputWrap.classList.add('hidden');
        if (selectedOpt && selectedOpt.dataset.unit) {
          unitSelect.value = selectedOpt.dataset.unit;
        }
        if (selectedOpt && selectedOpt.dataset.price && !priceInput.value) {
          priceInput.value = selectedOpt.dataset.price;
        }
      }
      clearRowErrors(row);
      saveFormState();
      if (!dom.resultsCard.classList.contains('hidden')) {
        executeScale(false);
      }
    });

    const triggerRecalc = () => {
      clearRowErrors(row);
      saveFormState();
      if (!dom.resultsCard.classList.contains('hidden')) {
        executeScale(false);
      }
    };

    customNameInput.addEventListener('input', triggerRecalc);
    amountInput.addEventListener('input', triggerRecalc);
    unitSelect.addEventListener('change', triggerRecalc);
    priceInput.addEventListener('input', triggerRecalc);

    if (removeBtn) {
      removeBtn.addEventListener('click', () => {
        const rows = getIngredientRows();
        if (rows.length > 3) {
          row.remove();
          updateRowRemoveButtons();
          saveFormState();
          if (!dom.resultsCard.classList.contains('hidden')) {
            executeScale(false);
          }
        }
      });
    }
  }

  function getRowIngredientName(row) {
    const select = row.querySelector('.ing-select');
    if (!select) return '';
    if (select.value === '__custom__') {
      const customInput = row.querySelector('.custom-name-input');
      return customInput ? customInput.value.trim() : '';
    }
    return select.value.trim();
  }

  function clearRowErrors(row) {
    const nameErr = row.querySelector('.row-name-error');
    const amtErr = row.querySelector('.row-amount-error');
    const select = row.querySelector('.ing-select');
    const customInput = row.querySelector('.custom-name-input');
    const amtInput = row.querySelector('.ing-amount');

    if (nameErr) nameErr.classList.add('hidden');
    if (amtErr) amtErr.classList.add('hidden');
    if (select) select.classList.remove('input-invalid');
    if (customInput) customInput.classList.remove('input-invalid');
    if (amtInput) amtInput.classList.remove('input-invalid');
  }

  function escapeHtml(str) {
    if (str === null || str === undefined) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  // ---------------------------------------------------------------------------
  // Core Scaler Execution & Validation
  // ---------------------------------------------------------------------------
  function executeScale(showAlerts = true) {
    let hasError = false;
    let firstErrorElem = null;

    // Reset top errors
    dom.dishNameError.classList.add('hidden');
    dom.dishName.classList.remove('input-invalid');
    dom.servingsMakesError.classList.add('hidden');
    dom.servingsMakes.classList.remove('input-invalid');
    dom.servingsWantedError.classList.add('hidden');
    dom.servingsWanted.classList.remove('input-invalid');
    dom.scalerValidationAlert.classList.add('hidden');

    // 1. Dish Name
    const dish = dom.dishName.value.trim();
    if (!dish) {
      hasError = true;
      dom.dishNameError.textContent = 'Please enter a dish name';
      dom.dishNameError.classList.remove('hidden');
      dom.dishName.classList.add('input-invalid');
      if (!firstErrorElem) firstErrorElem = dom.dishName;
    }

    // 2. Makes Servings (empty, 0, or negative)
    const makesVal = dom.servingsMakes.value;
    const makesCheck = validatePositiveNumber(makesVal, 'recipe servings');
    if (!makesCheck.valid) {
      hasError = true;
      dom.servingsMakesError.textContent = makesCheck.error;
      dom.servingsMakesError.classList.remove('hidden');
      dom.servingsMakes.classList.add('input-invalid');
      if (!firstErrorElem) firstErrorElem = dom.servingsMakes;
    }

    // 3. Wanted Servings (empty, 0, or negative)
    const wantedVal = dom.servingsWanted.value;
    const wantedCheck = validatePositiveNumber(wantedVal, 'desired servings');
    if (!wantedCheck.valid) {
      hasError = true;
      dom.servingsWantedError.textContent = wantedCheck.error;
      dom.servingsWantedError.classList.remove('hidden');
      dom.servingsWanted.classList.add('input-invalid');
      if (!firstErrorElem) firstErrorElem = dom.servingsWanted;
    }

    // 4. Validate Ingredients
    const rows = getIngredientRows();
    const ingredients = [];

    rows.forEach((row) => {
      clearRowErrors(row);

      const name = getRowIngredientName(row);
      const nameErr = row.querySelector('.row-name-error');
      const amtErr = row.querySelector('.row-amount-error');
      const select = row.querySelector('.ing-select');
      const customInput = row.querySelector('.custom-name-input');
      const amtInput = row.querySelector('.ing-amount');
      const unitSelect = row.querySelector('.ing-unit');
      const priceInput = row.querySelector('.ing-price');

      let rowError = false;
      if (!name) {
        hasError = true;
        rowError = true;
        if (nameErr) {
          nameErr.textContent = 'Select or enter ingredient';
          nameErr.classList.remove('hidden');
        }
        if (select && select.value !== '__custom__') select.classList.add('input-invalid');
        if (customInput && select.value === '__custom__') customInput.classList.add('input-invalid');
        if (!firstErrorElem) firstErrorElem = select;
      }

      const amtVal = amtInput.value;
      const amtCheck = validatePositiveNumber(amtVal, 'amount');
      if (!amtCheck.valid) {
        hasError = true;
        rowError = true;
        if (amtErr) {
          amtErr.textContent = amtCheck.error;
          amtErr.classList.remove('hidden');
        }
        amtInput.classList.add('input-invalid');
        if (!firstErrorElem) firstErrorElem = amtInput;
      }

      if (!rowError) {
        ingredients.push({
          name,
          amount: amtCheck.value,
          unit: unitSelect ? unitSelect.value : 'cups',
          price: priceInput ? priceInput.value.trim() : ''
        });
      }
    });

    // Check: If invalid, show message and NO result!
    if (hasError) {
      dom.resultsCard.classList.add('hidden');
      localStorage.setItem(STORAGE.HAS_RESULTS, 'false');

      if (showAlerts) {
        dom.scalerValidationAlert.classList.remove('hidden');
        dom.scalerValidationText.textContent = 'Please correct the highlighted inputs above. Recipe servings and ingredient amounts must be positive numbers greater than 0.';
        if (firstErrorElem) firstErrorElem.focus();
      }
      return false;
    }

    // Render results
    const makes = makesCheck.value;
    const wanted = wantedCheck.value;
    const factor = wanted / makes;

    renderScaledResults({
      dish,
      makes,
      wanted,
      factor,
      ingredients
    });

    dom.resultsCard.classList.remove('hidden');
    localStorage.setItem(STORAGE.HAS_RESULTS, 'true');
    saveFormState();

    return true;
  }

  function renderScaledResults(data) {
    dom.resultsDishName.textContent = data.dish;
    dom.resultsOriginalServings.textContent = formatCleanNumber(data.makes);
    dom.resultsTargetServings.textContent = formatCleanNumber(data.wanted);

    const formattedFactor = formatCleanNumber(data.factor);
    dom.resultsMultiplierPill.textContent = `${formattedFactor}x Scale`;

    dom.resultsIngredientsList.innerHTML = '';

    const scaledForPricing = [];

    data.ingredients.forEach((item) => {
      // Formula: (original amount * servings wanted) / servings makes
      const newAmount = scaleCalculation(item.amount, data.makes, data.wanted);
      const formattedAmount = formatCleanNumber(newAmount);
      const frac = getFractionString(newAmount);

      scaledForPricing.push({
        name: item.name,
        amount: item.amount,
        scaledAmount: newAmount,
        unit: item.unit,
        price: item.price
      });

      const card = document.createElement('div');
      card.className = 'result-item-card';

      card.innerHTML = `
        <div class="result-item-info">
          <div class="result-item-name">${escapeHtml(item.name)}</div>
          <div class="result-item-orig">Base: ${formatCleanNumber(item.amount)} ${escapeHtml(item.unit)}${item.price ? ` (${formatMoney(item.price)}/${escapeHtml(item.unit)})` : ''}</div>
        </div>
        <div class="result-item-calc">
          <div class="result-amount-strong">${formattedAmount} ${escapeHtml(item.unit)}</div>
          ${frac ? `<div class="result-fraction-hint">(${frac} ${escapeHtml(item.unit)})</div>` : ''}
        </div>
      `;

      dom.resultsIngredientsList.appendChild(card);
    });

    // Pricing Rule: If even 1 ingredient does not have a price, show "Price not available"
    const priceResult = calculateRecipePrice(scaledForPricing);
    if (priceResult.available) {
      dom.resultsCostValue.textContent = priceResult.formatted;
      dom.resultsCostValue.classList.remove('price-unavailable');
      dom.pricingNoteText.textContent = `Calculated total based on specified unit prices across all ${scaledForPricing.length} ingredients.`;
    } else {
      dom.resultsCostValue.textContent = 'Price not available';
      dom.resultsCostValue.classList.add('price-unavailable');
      dom.pricingNoteText.textContent = 'Optional: Specify unit prices for all ingredients to display total scaled cost.';
    }
  }

  // ---------------------------------------------------------------------------
  // View Switcher & 2 Giant Boxes
  // ---------------------------------------------------------------------------
  function switchView(viewName) {
    activeView = viewName;
    localStorage.setItem(STORAGE.ACTIVE_VIEW, viewName);

    dom.viewHome.classList.toggle('hidden', viewName !== 'home');
    dom.viewScaler.classList.toggle('hidden', viewName !== 'scaler');
    dom.viewRecipes.classList.toggle('hidden', viewName !== 'recipes');

    dom.navHomeBtn.classList.toggle('active', viewName === 'home');
    dom.navScalerBtn.classList.toggle('active', viewName === 'scaler');
    dom.navRecipesBtn.classList.toggle('active', viewName === 'recipes');

    if (viewName === 'recipes') {
      renderRecipesCatalog();
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function initNavigation() {
    dom.headerLogoHome.addEventListener('click', () => switchView('home'));
    dom.navHomeBtn.addEventListener('click', () => switchView('home'));
    dom.navScalerBtn.addEventListener('click', () => switchView('scaler'));
    dom.navRecipesBtn.addEventListener('click', () => switchView('recipes'));

    dom.scalerBackHomeBtn.addEventListener('click', () => switchView('home'));
    dom.recipesBackHomeBtn.addEventListener('click', () => switchView('home'));

    // 2 Giant Boxes
    dom.giantBoxScaler.addEventListener('click', () => switchView('scaler'));
    dom.giantBoxRecipes.addEventListener('click', () => switchView('recipes'));

    // Key accessibility
    dom.giantBoxScaler.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        switchView('scaler');
      }
    });
    dom.giantBoxRecipes.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        switchView('recipes');
      }
    });

    // Multipliers
    dom.multiplierChips.forEach((chip) => {
      chip.addEventListener('click', () => {
        const factor = Number(chip.dataset.factor);
        const makesCheck = validatePositiveNumber(dom.servingsMakes.value, 'recipe servings');
        if (makesCheck.valid) {
          const target = Math.round(makesCheck.value * factor * 100) / 100;
          dom.servingsWanted.value = String(target);
          dom.servingsWantedError.classList.add('hidden');
          dom.servingsWanted.classList.remove('input-invalid');

          dom.multiplierChips.forEach((c) => c.classList.remove('active'));
          chip.classList.add('active');

          saveFormState();
          executeScale(false);
        } else {
          dom.servingsMakesError.textContent = makesCheck.error;
          dom.servingsMakesError.classList.remove('hidden');
          dom.servingsMakes.classList.add('input-invalid');
          dom.servingsMakes.focus();
        }
      });
    });

    // Recipe Filters
    dom.filterTabAll.addEventListener('click', () => setRecipeFilter('all'));
    dom.filterTabCurated.addEventListener('click', () => setRecipeFilter('curated'));
    dom.filterTabCustom.addEventListener('click', () => setRecipeFilter('custom'));
  }

  // ---------------------------------------------------------------------------
  // User Name Onboarding & Dropdown Menu
  // ---------------------------------------------------------------------------
  function initUserManagement() {
    const savedName = localStorage.getItem(STORAGE.USER_NAME);

    if (!savedName) {
      // First visit: Show Fullscreen Abstract Onboarding (obscuring the app)
      dom.initialOnboardingScreen.classList.remove('hidden');
      dom.appShell.classList.add('hidden');
      dom.onboardingNameInput.focus();
    } else {
      updateUserNameUI(savedName);
      dom.initialOnboardingScreen.classList.add('hidden');
      dom.appShell.classList.remove('hidden');
    }

    // Onboarding Form
    dom.onboardingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const val = dom.onboardingNameInput.value.trim();
      if (!val) {
        dom.onboardingErrorMsg.classList.remove('hidden');
        return;
      }
      dom.onboardingErrorMsg.classList.add('hidden');
      localStorage.setItem(STORAGE.USER_NAME, val);
      updateUserNameUI(val);
      dom.initialOnboardingScreen.classList.add('hidden');
      dom.appShell.classList.remove('hidden');
      switchView('home');
      showToast(`Welcome, ${val}`);
    });

    dom.onboardingSkipBtn.addEventListener('click', () => {
      localStorage.setItem(STORAGE.USER_NAME, 'Alex');
      updateUserNameUI('Alex');
      dom.initialOnboardingScreen.classList.add('hidden');
      dom.appShell.classList.remove('hidden');
      switchView('home');
    });

    // Dropdown toggle
    dom.userMenuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isExpanded = dom.userMenuBtn.getAttribute('aria-expanded') === 'true';
      dom.userMenuBtn.setAttribute('aria-expanded', !isExpanded);
      dom.userDropdownMenu.classList.toggle('hidden');
    });

    document.addEventListener('click', (e) => {
      if (!dom.userMenuBtn.contains(e.target) && !dom.userDropdownMenu.contains(e.target)) {
        dom.userDropdownMenu.classList.add('hidden');
        dom.userMenuBtn.setAttribute('aria-expanded', 'false');
      }
    });

    // Edit Name from Dropdown
    dom.menuEditNameBtn.addEventListener('click', () => {
      dom.userDropdownMenu.classList.add('hidden');
      dom.userMenuBtn.setAttribute('aria-expanded', 'false');
      const current = localStorage.getItem(STORAGE.USER_NAME) || 'Alex';
      dom.editNameInput.value = current;
      dom.editNameError.classList.add('hidden');
      dom.editNameModal.classList.remove('hidden');
      dom.editNameInput.focus();
    });

    dom.editNameCancelBtn.addEventListener('click', () => {
      dom.editNameModal.classList.add('hidden');
    });

    dom.editNameSaveBtn.addEventListener('click', () => {
      const val = dom.editNameInput.value.trim();
      if (!val) {
        dom.editNameError.textContent = 'Please enter a name';
        dom.editNameError.classList.remove('hidden');
        return;
      }
      dom.editNameError.classList.add('hidden');
      localStorage.setItem(STORAGE.USER_NAME, val);
      updateUserNameUI(val);
      dom.editNameModal.classList.add('hidden');
      showToast('Name updated');
    });

    // Settings Menu Trigger
    dom.menuSettingsBtn.addEventListener('click', () => {
      dom.userDropdownMenu.classList.add('hidden');
      dom.userMenuBtn.setAttribute('aria-expanded', 'false');
      openSettings();
    });
  }

  function updateUserNameUI(name) {
    dom.userMenuName.textContent = name;
    dom.dropdownUserFull.textContent = name;
  }

  // ---------------------------------------------------------------------------
  // Settings Menu
  // ---------------------------------------------------------------------------
  function openSettings() {
    dom.settingsCurrencySelect.value = currentCurrency;
    const isDark = document.body.classList.contains('theme-dark');
    dom.settingsThemeLabel.textContent = isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode';
    dom.settingsModal.classList.remove('hidden');
  }

  function initSettings() {
    dom.settingsCloseBtn.addEventListener('click', () => dom.settingsModal.classList.add('hidden'));
    dom.settingsCloseXBtn.addEventListener('click', () => dom.settingsModal.classList.add('hidden'));

    dom.settingsThemeToggleBtn.addEventListener('click', () => {
      toggleTheme();
      const isDark = document.body.classList.contains('theme-dark');
      dom.settingsThemeLabel.textContent = isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode';
    });

    dom.quickThemeToggle.addEventListener('click', toggleTheme);

    dom.settingsCurrencySelect.addEventListener('change', () => {
      currentCurrency = dom.settingsCurrencySelect.value;
      localStorage.setItem(STORAGE.CURRENCY, currentCurrency);
      showToast(`Currency updated to ${currentCurrency}`);
      if (!dom.resultsCard.classList.contains('hidden')) {
        executeScale(false);
      }
    });

    dom.settingsResetBannerBtn.addEventListener('click', () => {
      localStorage.removeItem(STORAGE.IGNORE_PRICE_BANNER);
      dom.priceNoticeBanner.classList.remove('hidden');
      showToast('Price banner restored');
    });

    dom.settingsResetDataBtn.addEventListener('click', () => {
      if (confirm('Are you sure you want to reset all custom recipes and settings?')) {
        localStorage.clear();
        window.location.reload();
      }
    });

    // Ignore Price Banner Button
    const bannerIgnored = localStorage.getItem(STORAGE.IGNORE_PRICE_BANNER) === 'true';
    if (bannerIgnored) {
      dom.priceNoticeBanner.classList.add('hidden');
    }

    dom.ignorePriceBannerBtn.addEventListener('click', () => {
      dom.priceNoticeBanner.classList.add('hidden');
      localStorage.setItem(STORAGE.IGNORE_PRICE_BANNER, 'true');
      showToast('Price notice dismissed');
    });
  }

  function initTheme() {
    const savedTheme = localStorage.getItem(STORAGE.THEME) || 'light';
    applyTheme(savedTheme);

    const savedCur = localStorage.getItem(STORAGE.CURRENCY) || '$';
    currentCurrency = savedCur;
  }

  function toggleTheme() {
    const isDark = document.body.classList.contains('theme-dark');
    const nextTheme = isDark ? 'light' : 'dark';
    applyTheme(nextTheme);
  }

  function applyTheme(theme) {
    if (theme === 'dark') {
      document.body.classList.remove('theme-light');
      document.body.classList.add('theme-dark');
    } else {
      document.body.classList.remove('theme-dark');
      document.body.classList.add('theme-light');
    }
    localStorage.setItem(STORAGE.THEME, theme);
  }

  // ---------------------------------------------------------------------------
  // Load Preset Recipe into Scaler
  // ---------------------------------------------------------------------------
  function loadRecipeIntoScaler(recipe) {
    dom.dishName.value = recipe.name;
    dom.servingsMakes.value = recipe.makes;
    dom.servingsWanted.value = Math.max(recipe.makes, 4);

    dom.ingredientsContainer.innerHTML = '';

    recipe.ingredients.forEach((ing) => {
      createIngredientRow(ing.name, String(ing.amount), ing.unit, ing.price || '');
    });

    while (getIngredientRows().length < 3) {
      createIngredientRow('', '', 'cups', '');
    }

    updateRowRemoveButtons();
    switchView('scaler');
    saveFormState();
    executeScale(false);
    showToast(`Loaded ${recipe.name}`);
  }

  // ---------------------------------------------------------------------------
  // My Recipes View & Catalog
  // ---------------------------------------------------------------------------
  function loadCustomRecipesFromStorage() {
    const raw = localStorage.getItem(STORAGE.CUSTOM_RECIPES);
    if (raw) {
      try {
        customRecipes = JSON.parse(raw);
      } catch {
        customRecipes = [];
      }
    } else {
      customRecipes = [];
    }
  }

  function saveCustomRecipesToStorage() {
    localStorage.setItem(STORAGE.CUSTOM_RECIPES, JSON.stringify(customRecipes));
    updateRecipeCounters();
  }

  function updateRecipeCounters() {
    const total = PREMADE_RECIPES.length + customRecipes.length;
    dom.headerRecipeCount.textContent = String(total);
    dom.countAll.textContent = String(total);
    dom.countCustom.textContent = String(customRecipes.length);
  }

  function setRecipeFilter(filter) {
    currentRecipeFilter = filter;
    dom.filterTabAll.classList.toggle('active', filter === 'all');
    dom.filterTabCurated.classList.toggle('active', filter === 'curated');
    dom.filterTabCustom.classList.toggle('active', filter === 'custom');
    renderRecipesCatalog();
  }

  function renderRecipesCatalog() {
    dom.recipesGridContainer.innerHTML = '';

    let list = [];
    if (currentRecipeFilter === 'all') {
      list = [...customRecipes, ...PREMADE_RECIPES];
    } else if (currentRecipeFilter === 'curated') {
      list = [...PREMADE_RECIPES];
    } else {
      list = [...customRecipes];
    }

    if (list.length === 0) {
      const empty = document.createElement('div');
      empty.className = 'recipe-entry-card';
      empty.innerHTML = `
        <div class="entry-card-badge-row">
          <span class="entry-type-tag tag-curated">Library Empty</span>
        </div>
        <h3 class="entry-card-title">No Custom Recipes Saved</h3>
        <p class="entry-card-servings">Compose and scale recipes in the Simple Scaler, then click "Save to My Recipes" to populate your personal collection.</p>
      `;
      dom.recipesGridContainer.appendChild(empty);
      return;
    }

    list.forEach((recipe) => {
      const card = document.createElement('div');
      card.className = 'recipe-entry-card';

      const isCustom = recipe.type === 'custom';
      const badgeClass = isCustom ? 'tag-custom' : 'tag-curated';
      const badgeText = isCustom ? 'Custom Formula' : 'Curated Preset';

      let itemsHtml = '';
      recipe.ingredients.slice(0, 3).forEach((ing) => {
        itemsHtml += `
          <li class="entry-card-ing-item">
            <span class="entry-ing-bullet">•</span>
            <span>${formatCleanNumber(ing.amount)} ${escapeHtml(ing.unit)} <strong>${escapeHtml(ing.name)}</strong></span>
          </li>
        `;
      });
      if (recipe.ingredients.length > 3) {
        itemsHtml += `<li class="entry-card-ing-item"><span class="entry-ing-bullet">+</span> <em>${recipe.ingredients.length - 3} more ingredients</em></li>`;
      }

      card.innerHTML = `
        <div>
          <div class="entry-card-badge-row">
            <span class="entry-type-tag ${badgeClass}">${badgeText}</span>
            <span class="entry-card-servings">Makes ${formatCleanNumber(recipe.makes)} servings</span>
          </div>
          <h3 class="entry-card-title">${escapeHtml(recipe.name)}</h3>
          <ul class="entry-card-ingredients">
            ${itemsHtml}
          </ul>
        </div>
        <div class="entry-card-actions">
          <button type="button" class="btn btn-sm btn-green load-recipe-action" data-id="${recipe.id}">
            Scale Recipe
          </button>
          ${isCustom ? `<button type="button" class="btn btn-sm btn-outline delete-recipe-action" data-id="${recipe.id}">Delete</button>` : ''}
        </div>
      `;

      card.querySelector('.load-recipe-action').addEventListener('click', () => {
        loadRecipeIntoScaler(recipe);
      });

      if (isCustom) {
        card.querySelector('.delete-recipe-action').addEventListener('click', () => {
          customRecipes = customRecipes.filter((r) => r.id !== recipe.id);
          saveCustomRecipesToStorage();
          renderRecipesCatalog();
          showToast('Recipe deleted from library');
        });
      }

      dom.recipesGridContainer.appendChild(card);
    });
  }

  function handleSaveCurrentRecipe() {
    const ok = executeScale(true);
    if (!ok) {
      showToast('Please resolve errors before saving');
      return;
    }

    const dish = dom.dishName.value.trim();
    const makes = Number(dom.servingsMakes.value);
    const rows = getIngredientRows();

    const ingredients = rows.map((r) => ({
      name: getRowIngredientName(r),
      amount: Number(r.querySelector('.ing-amount').value),
      unit: r.querySelector('.ing-unit').value,
      price: r.querySelector('.ing-price').value.trim()
    }));

    const newEntry = {
      id: 'custom-' + Date.now(),
      type: 'custom',
      name: dish,
      makes,
      ingredients,
      createdAt: new Date().toLocaleDateString()
    };

    customRecipes.unshift(newEntry);
    saveCustomRecipesToStorage();
    showToast(`Saved "${dish}" to My Recipes`);
  }

  // ---------------------------------------------------------------------------
  // State Persistence (Survives Reload)
  // ---------------------------------------------------------------------------
  function saveFormState() {
    const rows = getIngredientRows();
    const ingredients = rows.map((r) => ({
      name: getRowIngredientName(r),
      amount: r.querySelector('.ing-amount')?.value || '',
      unit: r.querySelector('.ing-unit')?.value || 'cups',
      price: r.querySelector('.ing-price')?.value || ''
    }));

    const state = {
      dish: dom.dishName.value,
      makes: dom.servingsMakes.value,
      wanted: dom.servingsWanted.value,
      ingredients
    };

    localStorage.setItem(STORAGE.FORM_STATE, JSON.stringify(state));
  }

  function restoreFormState() {
    const raw = localStorage.getItem(STORAGE.FORM_STATE);
    const hasResults = localStorage.getItem(STORAGE.HAS_RESULTS) === 'true';

    if (raw) {
      try {
        const state = JSON.parse(raw);
        if (state.dish !== undefined) dom.dishName.value = state.dish;
        if (state.makes !== undefined) dom.servingsMakes.value = state.makes;
        if (state.wanted !== undefined) dom.servingsWanted.value = state.wanted;

        if (Array.isArray(state.ingredients) && state.ingredients.length > 0) {
          dom.ingredientsContainer.innerHTML = '';
          state.ingredients.forEach((ing) => {
            createIngredientRow(ing.name, ing.amount, ing.unit, ing.price);
          });
        }
      } catch {
        // Fallback
      }
    }

    while (getIngredientRows().length < 3) {
      createIngredientRow('', '', 'cups', '');
    }
    updateRowRemoveButtons();

    if (hasResults) {
      executeScale(false);
    } else {
      dom.resultsCard.classList.add('hidden');
    }
  }

  // ---------------------------------------------------------------------------
  // Form Events & Realtime Feedback
  // ---------------------------------------------------------------------------
  function initFormEvents() {
    dom.scaleActionBtn.addEventListener('click', () => executeScale(true));
    dom.saveRecipeActionBtn.addEventListener('click', handleSaveCurrentRecipe);

    dom.resetScalerActionBtn.addEventListener('click', () => {
      dom.dishName.value = '';
      dom.servingsMakes.value = '';
      dom.servingsWanted.value = '';
      dom.ingredientsContainer.innerHTML = '';
      createIngredientRow('', '', 'cups', '');
      createIngredientRow('', '', 'cups', '');
      createIngredientRow('', '', 'cups', '');
      updateRowRemoveButtons();
      dom.resultsCard.classList.add('hidden');
      dom.scalerValidationAlert.classList.add('hidden');
      localStorage.setItem(STORAGE.HAS_RESULTS, 'false');
      saveFormState();
      showToast('Form cleared');
    });

    dom.addIngredientRowBtn.addEventListener('click', () => {
      createIngredientRow('', '', 'cups', '');
      saveFormState();
    });

    // Realtime listeners
    dom.dishName.addEventListener('input', () => {
      dom.dishNameError.classList.add('hidden');
      dom.dishName.classList.remove('input-invalid');
      saveFormState();
      if (!dom.resultsCard.classList.contains('hidden')) {
        executeScale(false);
      }
    });

    dom.servingsMakes.addEventListener('input', () => {
      dom.servingsMakesError.classList.add('hidden');
      dom.servingsMakes.classList.remove('input-invalid');
      saveFormState();
      if (!dom.resultsCard.classList.contains('hidden')) {
        executeScale(false);
      }
    });

    dom.servingsWanted.addEventListener('input', () => {
      dom.servingsWantedError.classList.add('hidden');
      dom.servingsWanted.classList.remove('input-invalid');
      saveFormState();
      if (!dom.resultsCard.classList.contains('hidden')) {
        executeScale(false);
      }
    });

    // Copy & Print
    dom.copyScaledBtn.addEventListener('click', () => {
      const dish = dom.resultsDishName.textContent;
      const makes = dom.resultsOriginalServings.textContent;
      const wanted = dom.resultsTargetServings.textContent;
      const factor = dom.resultsMultiplierPill.textContent;
      const priceText = dom.resultsCostValue.textContent;

      const items = [];
      dom.resultsIngredientsList.querySelectorAll('.result-item-card').forEach((card) => {
        const name = card.querySelector('.result-item-name').textContent.trim();
        const amt = card.querySelector('.result-amount-strong').textContent.trim();
        const orig = card.querySelector('.result-item-orig').textContent.trim();
        items.push(`- ${name}: ${amt} (${orig})`);
      });

      const text = `${dish}\n${factor} (Scaled from ${makes} to ${wanted} servings)\n\nIngredients:\n${items.join('\n')}\n\nTotal Cost: ${priceText}\nScaled with Simple Scaler`;

      navigator.clipboard.writeText(text).then(() => {
        showToast('Recipe formula copied to clipboard');
      }).catch(() => {
        showToast('Clipboard permission denied');
      });
    });

    dom.printScaledBtn.addEventListener('click', () => {
      window.print();
    });
  }

  // ---------------------------------------------------------------------------
  // Bootstrapping
  // ---------------------------------------------------------------------------
  function initialize() {
    initTheme();
    initUserManagement();
    initSettings();
    initPantryRegistry();
    loadCustomRecipesFromStorage();
    initNavigation();
    initFormEvents();

    restoreFormState();
    updateRecipeCounters();

    // Restore view if saved, otherwise home
    const savedView = localStorage.getItem(STORAGE.ACTIVE_VIEW) || 'home';
    switchView(savedView);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize);
  } else {
    initialize();
  }
})();
