// Константи
const FIELDS = [
  "Name",                  // [0]
  "Kostenträger-Nr.",      // [1]
  "Kostenträger - Name / Ort", // [2]
  "Von Objekt / Ort",      // [3]
  "Nach Objekt / Ort",     // [4]
  "Zusatzfeld",            // [5]
  "Tarif",                 // [6]
  "Statistik",             // [7]
  "Zusatztext für Rechnung"// [8]
];

// Конфігурація категорій
const CAT_CONFIG = [
  {
    name: "SCHMIEDER KLINIK",
    overrides: { 
      0: "",
      1: "3491",
      2: "SCHMIEDER KLINIK",
      3: "SCHM. GAILINGEN",
      4: "SCHM. ALLENSBACH / MRT",
      5: "",
      6: "",
      7: "",
      8: ""
    },
    subs: [
      { label: "3 - Tragestuhl", overrides: { 6: "9211" } },
      { label: "4 - gehfähig",  overrides: { 6: "9111" } },
      { label: "5 - Rollstuhl", overrides: { 6: "9711" } }
    ]
  },
  {
    name: "PRIVAT",
    overrides: { 
      0: "",
      1: "1",
      2: "PRIVAT",
      3: "WHG",
      4: "",
      5: "",
      6: "6600",
      7: "",
      8: ""
    }
  },
  {
    name: "Hilfeleistung bzw. Tragehilfen/privat",
    overrides: { 
      0: "",
      1: "1",
      2: "Hilfeleistung bzw. Tragehilfen/privat",
      3: "4204",
      4: "WHG",
      5: "",
      6: "2800",
      7: "93",
      8: "HOCH HELFEN"
    }
  },
  {
    name: "HAUSNOTRUF",
    overrides: { 
      0: "",
      1: "8",
      2: "HAUSNOTRUF",
      3: "4204",
      4: "WHG",
      5: "8",
      6: "8609",
      7: "89",
      8: "HNR NR._ _ _ _ "
    }
  },
  {
    name: "ZFP Reichenau",
    overrides: { 
      0: "",
      1: "2775",
      2: "ZFP Reichenau",
      3: "ZFP ST. 92",
      4: "",
      5: "",
      6: "9301",
      7: "",
      8: ""
    }
  },
  {
    name: "LEERFAHRT",
    overrides: { 
      0: "DIENSTFAHRT",
      1: "9",
      2: "LEERFAHRT",
      3: "4204",
      4: "4202 / 4203 / 4205 / 4206",
      5: "7",
      6: "Kein",
      7: "91",
      8: ""
    }
  },
  {
    name: "FEHLFAHRT",
    overrides: { 
      0: "FEHLFAHRT",
      1: "9",
      2: "LEERFAHRT",
      3: "4204",
      4: "",
      5: "6",
      6: "Kein",
      7: "81",
      8: ""
    }
  },
  {
    name: "KRANKENHAUS",
    subs: [
      { 
        label: "KH - KONSTANZ", 
        overrides: { 
          1: "1203",
          2: "KH - KONSTANZ",
          3: "ZNA MED KONSTANZ",
          4: "ZNA MED SINGEN",
          6: "9101",
          7: "21"
        } 
      },
      { 
        label: "DR. ZWICKER",  
        overrides: { 
          1: "1203",
          2: "KH - KN",
          3: "PO3",
          4: "ZWICKER",
          6: "9101",
          7: "23 / 24"
        } 
      },
      { 
        label: "KH - SINGEN",  
        overrides: { 
          1: "3214",
          2: "KH - SINGEN",
          3: "ZNA MED SINGEN",
          4: "ZNA MED KONSTANZ",
          6: "9201",
          7: "21"
        } 
      },
      { 
        label: "KH - STOCKACH",
        overrides: { 
          1: "3151",
          2: "KH - STOCKACH",
          3: "ZNA MED STOCKACH",
          4: "ZNA MED KONSTANZ",
          6: "9301",
          7: "21"
        } 
      }
    ]
  },
  {
    name: "HEGAU JUGENDWERK",
    overrides: { 
      0: "",
      1: "3472",
      2: "",
      3: "",
      4: "",
      5: "",
      6: "9201",
      7: "",
      8: ""
    }
  },
  {
    name: "Tarife für Rollstuhlfahrten",
    subs: [
      { 
        label: "DAK", 
        overrides: { 
          1: "600",
          2: "DAK",
          6: "7611"
        } 
      },
      { 
        label: "TK",  
        overrides: { 
          1: "163",
          2: "TK",
          6: "7611"
        } 
      },
      { 
        label: "BEK", 
        overrides: { 
          1: "748",
          2: "BEK",
          6: "7611"
        } 
      },
      { 
        label: "KKH", 
        overrides: { 
          1: "590",
          2: "KKH",
          6: "7611"
        } 
      },
      { 
        label: "hkk", 
        overrides: { 
          1: "1602",
          2: "hkk",
          6: "7611"
        } 
      },
      { 
        label: "HEK", 
        overrides: { 
          1: "175",
          2: "HEK",
          6: "7611"
        } 
      },
      { 
        label: "IKK", 
        overrides: { 
          1: "1770",
          2: "IKK",
          6: "7621"
        } 
      }
    ]
  }
];

// Генерація повного об’єкта даних
function makeData(overrides = {}) {
  return Object.fromEntries(FIELDS.map((f, i) => [f, overrides[i] ?? ""]));
}
function makeCategory(cfg) {
  const cat = { data: makeData(cfg.overrides) };
  if (Array.isArray(cfg.subs)) {
    cat.subOptions = cfg.subs.map(opt => ({
      label: opt.label,
      data: makeData({ ...cfg.overrides, ...opt.overrides })
    }));
  }
  return cat;
}
const categories = Object.fromEntries(CAT_CONFIG.map(c => [c.name, makeCategory(c)]));

// DOM
const menuButtons   = document.getElementById("menu-buttons");
const subOptionsBox = document.getElementById("sub-options");
const outputBox     = document.getElementById("output");
const resetBtn      = document.getElementById("reset-button");
const resetContainer= document.getElementById("reset-container");

// Утиліти
const clear = el => el.replaceChildren();
function createButton({ text, extraClass="", dataset={}, ariaPressed }) {
  const btn = document.createElement("button");
  btn.className = ["icon-button", extraClass].filter(Boolean).join(" ");
  btn.textContent = text;
  Object.entries(dataset).forEach(([k,v]) => btn.dataset[k] = v);
  if (ariaPressed !== undefined) {
    btn.setAttribute("aria-pressed", ariaPressed);
  }
  return btn;
}

// Рендер меню
function renderMenu() {
  clear(menuButtons); 
  clear(subOptionsBox); 
  clear(outputBox);
  resetContainer.style.display = "none";

  const frag = document.createDocumentFragment();
  Object.keys(categories).forEach(name => {
    frag.append(createButton({ 
      text: name, 
      dataset: { cat: name }, 
      ariaPressed: false 
    }));
  });
  menuButtons.append(frag);
}

// Рендер категорії
function renderCategory(catName) {
  clear(menuButtons); 
  clear(subOptionsBox); 
  clear(outputBox);
  resetContainer.style.display = "block";

  const { data, subOptions } = categories[catName];

  // Заголовок категорії
  const headerBtn = createButton({
    text: catName,
    extraClass: "category-selected",
    ariaPressed: true
  });
  outputBox.append(headerBtn);

  // Якщо є підкатегорії → показуємо їх
  if (subOptions) {
    const frag = document.createDocumentFragment();
    subOptions.forEach((opt, i) => {
      frag.append(createButton({
        text: opt.label,
        dataset: { cat: catName, sub: i },
        ariaPressed: false
      }));
    });
    subOptionsBox.append(frag);
    return;
  }

  // Якщо підкатегорій немає → показуємо таблицю
  renderTable(data);
}

// Рендер таблиці
function renderTable(entry) {
  const oldTable = outputBox.querySelector(".vertical-table");
  if (oldTable) oldTable.remove();

  const frag = document.createDocumentFragment();
  FIELDS.forEach(f => {
    if (entry[f] && entry[f].trim() !== "") {
      const row = document.createElement("div");
      row.className = "row";

      const labelEl = document.createElement("div");
      labelEl.className = "label";
      labelEl.textContent = f;

      const valueEl = document.createElement("div");
      valueEl.className = `value ${getFieldClass(f)}`;
      valueEl.textContent = entry[f];

      row.append(labelEl, valueEl);
      frag.append(row);
    }
  });

  const wrapper = document.createElement("div");
  wrapper.className = "vertical-table";
  wrapper.append(frag);
  outputBox.append(wrapper);
}

// Класи підсвічування
function getFieldClass(f) {
  if ([FIELDS[1], FIELDS[6]].includes(f)) return "highlight";
  if ([FIELDS[5], FIELDS[7]].includes(f)) return "gros";
  return "";
}

// Події
menuButtons.addEventListener("click", e => {
  const btn = e.target.closest("button[data-cat]");
  if (btn) renderCategory(btn.dataset.cat);
});

subOptionsBox.addEventListener("click", e => {
  const btn = e.target.closest("button[data-sub]");
  if (!btn) return;

  const { cat, sub } = btn.dataset;
  const entry = categories[cat].subOptions[sub].data;

  clear(subOptionsBox);
  subOptionsBox.append(createButton({
    text: btn.textContent,
    extraClass: "sub-selected",
    ariaPressed: true
  }));

  renderTable(entry);
});

resetBtn.addEventListener("click", renderMenu);

// Ініціалізація
renderMenu();
