const STORAGE_KEY = "dlena-demo-content";

const defaultContent = {
  heroEyebrow: "Alta cocina contemporánea",
  heroTitle: "Una experiencia íntima, verde y dorada.",
  heroText: "D'Leña es una demo conceptual de restaurante premium: atmósfera sobria, cocina de autor y una dirección visual pensada para transmitir lujo silencioso.",
  heroNoteOne: "Cenas privadas con maridaje curado por sommeliers.",
  heroNoteTwo: "Menú estacional con ingredientes frescos de origen selecto.",
  heroNoteThree: "Servicio elegante con detalle editorial en cada mesa.",
  featuredDishName: "Lomo verde aureo",
  featuredDishText: "Reducción intensa, hojas tostadas y acabado de oro culinario sobre un corte en su punto.",
  heroImage: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
  menuTitle: "Menú degustación y selección signature",
  menuIntro: "Una carta construida para una noche de ritmo pausado, platos precisos y contrastes elegantes entre frescura herbal y profundidad tostada.",
  menuSummary: "Cada categoría se presenta como una escena distinta: entradas ligeras, principales con estructura y postres diseñados para cerrar con textura, perfume y brillo.",
  menuItems: [
    {
      categoryName: "Entradas",
      categoryTitle: "Aperturas",
      items: [
        {
          name: "Ostra imperial",
          description: "Ostra fresca, granita de pepino y aceite de albahaca con nota cítrica.",
          price: "$18"
        },
        {
          name: "Tártaro esmeralda",
          description: "Res curada, mostaza fina, chips de raíz y crema ahumada.",
          price: "$24"
        }
      ]
    },
    {
      categoryName: "Principales",
      categoryTitle: "Piezas centrales",
      items: [
        {
          name: "Lomo verde aureo",
          description: "Corte premium, puré de apio, espárragos y demi-glace con acabado dorado.",
          price: "$46"
        },
        {
          name: "Robalo de jardín",
          description: "Filete sellado, mantequilla de hierbas, hinojo y emulsión de limón.",
          price: "$39"
        }
      ]
    },
    {
      categoryName: "Postres",
      categoryTitle: "Cierre",
      items: [
        {
          name: "Opera de pistacho",
          description: "Capas ligeras, ganache suave y polvo dulce de nuez.",
          price: "$16"
        },
        {
          name: "Perla cítrica",
          description: "Mousse de vainilla, centro de maracuyá y espejo brillante.",
          price: "$15"
        }
      ]
    }
  ],
  aboutTitle: "Diseño sensorial con carácter premium",
  aboutText: "El concepto combina acabados oscuros, dorados sobrios y una narrativa visual de alta gama. Todo el contenido de esta demo puede editarse desde el administrador: textos, imágenes y categorías completas del menú.",
  aboutImage: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1200&q=80",
  hoursText: "Martes a domingo, 6:00 PM a 11:30 PM",
  locationText: "Zona exclusiva, salón privado y terraza de firma",
  reservationText: "reservas@dlena.demo | +502 5555 0101"
};

const state = loadContent();

function loadContent() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) {
    return structuredClone(defaultContent);
  }

  try {
    const parsed = JSON.parse(saved);
    return {
      ...structuredClone(defaultContent),
      ...parsed
    };
  } catch (error) {
    return structuredClone(defaultContent);
  }
}

function saveContent(content) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
}

function renderContent() {
  const textFields = [
    "heroEyebrow",
    "heroTitle",
    "heroText",
    "heroNoteOne",
    "heroNoteTwo",
    "heroNoteThree",
    "featuredDishName",
    "featuredDishText",
    "menuTitle",
    "menuIntro",
    "menuSummary",
    "aboutTitle",
    "aboutText",
    "hoursText",
    "locationText",
    "reservationText"
  ];

  textFields.forEach((key) => {
    const element = document.getElementById(key);
    if (element) {
      element.textContent = state[key];
    }
  });

  document.documentElement.style.setProperty("--hero-image", `url("${state.heroImage}")`);
  document.documentElement.style.setProperty("--about-image", `url("${state.aboutImage}")`);

  const categoriesContainer = document.getElementById("menuCategories");
  const categoryTemplate = document.getElementById("menuCategoryTemplate");
  const itemTemplate = document.getElementById("menuItemTemplate");

  categoriesContainer.innerHTML = "";

  state.menuItems.forEach((category) => {
    const categoryNode = categoryTemplate.content.firstElementChild.cloneNode(true);
    categoryNode.querySelector(".category-name").textContent = category.categoryName;
    categoryNode.querySelector(".category-title").textContent = category.categoryTitle;

    const itemsContainer = categoryNode.querySelector(".menu-items");
    category.items.forEach((item) => {
      const itemNode = itemTemplate.content.firstElementChild.cloneNode(true);
      itemNode.querySelector(".item-name").textContent = item.name;
      itemNode.querySelector(".item-description").textContent = item.description;
      itemNode.querySelector(".item-price").textContent = item.price;
      itemsContainer.appendChild(itemNode);
    });

    categoriesContainer.appendChild(categoryNode);
  });
}

function populateAdminForm() {
  const form = document.getElementById("adminForm");
  const entries = { ...state };

  Object.entries(entries).forEach(([key, value]) => {
    const field = form.elements.namedItem(key);
    if (field) {
      field.value = value;
    }
  });

  renderAdminMenuEditor();
}

function openAdmin() {
  document.getElementById("adminModal").classList.add("open");
  document.getElementById("adminModal").setAttribute("aria-hidden", "false");
}

function closeAdmin() {
  document.getElementById("adminModal").classList.remove("open");
  document.getElementById("adminModal").setAttribute("aria-hidden", "true");
}

function createEmptyCategory() {
  return {
    categoryName: "Nueva categoría",
    categoryTitle: "Título de categoría",
    items: [createEmptyDish()]
  };
}

function createEmptyDish() {
  return {
    name: "Nuevo platillo",
    description: "Describe aquí el platillo.",
    price: "$0"
  };
}

function renderAdminMenuEditor() {
  const container = document.getElementById("adminMenuEditor");
  const categoryTemplate = document.getElementById("adminCategoryTemplate");
  const dishTemplate = document.getElementById("adminDishTemplate");

  container.innerHTML = "";

  state.menuItems.forEach((category, categoryIndex) => {
    const categoryNode = categoryTemplate.content.firstElementChild.cloneNode(true);
    categoryNode.querySelector(".admin-category-name").value = category.categoryName;
    categoryNode.querySelector(".admin-category-title").value = category.categoryTitle;

    categoryNode.querySelector(".admin-category-name").addEventListener("input", (event) => {
      state.menuItems[categoryIndex].categoryName = event.target.value;
      renderContent();
      saveContent(state);
    });

    categoryNode.querySelector(".admin-category-title").addEventListener("input", (event) => {
      state.menuItems[categoryIndex].categoryTitle = event.target.value;
      renderContent();
      saveContent(state);
    });

    categoryNode.querySelector(".admin-remove-category").addEventListener("click", () => {
      state.menuItems.splice(categoryIndex, 1);
      saveContent(state);
      renderContent();
      renderAdminMenuEditor();
    });

    const dishesContainer = categoryNode.querySelector(".admin-dishes-list");

    category.items.forEach((dish, dishIndex) => {
      const dishNode = dishTemplate.content.firstElementChild.cloneNode(true);
      dishNode.querySelector(".admin-dish-name").value = dish.name;
      dishNode.querySelector(".admin-dish-price").value = dish.price;
      dishNode.querySelector(".admin-dish-description").value = dish.description;

      dishNode.querySelector(".admin-dish-name").addEventListener("input", (event) => {
        state.menuItems[categoryIndex].items[dishIndex].name = event.target.value;
        renderContent();
        saveContent(state);
      });

      dishNode.querySelector(".admin-dish-price").addEventListener("input", (event) => {
        state.menuItems[categoryIndex].items[dishIndex].price = event.target.value;
        renderContent();
        saveContent(state);
      });

      dishNode.querySelector(".admin-dish-description").addEventListener("input", (event) => {
        state.menuItems[categoryIndex].items[dishIndex].description = event.target.value;
        renderContent();
        saveContent(state);
      });

      dishNode.querySelector(".admin-remove-dish").addEventListener("click", () => {
        state.menuItems[categoryIndex].items.splice(dishIndex, 1);
        saveContent(state);
        renderContent();
        renderAdminMenuEditor();
      });

      dishesContainer.appendChild(dishNode);
    });

    categoryNode.querySelector(".admin-add-dish").addEventListener("click", () => {
      state.menuItems[categoryIndex].items.push(createEmptyDish());
      saveContent(state);
      renderContent();
      renderAdminMenuEditor();
    });

    container.appendChild(categoryNode);
  });
}

function setupAdmin() {
  document.getElementById("openAdmin").addEventListener("click", () => {
    populateAdminForm();
    openAdmin();
  });

  document.getElementById("closeAdmin").addEventListener("click", closeAdmin);
  document.getElementById("closeAdminButton").addEventListener("click", closeAdmin);

  document.getElementById("resetData").addEventListener("click", () => {
    Object.assign(state, structuredClone(defaultContent));
    saveContent(state);
    renderContent();
    populateAdminForm();
  });

  document.getElementById("addCategory").addEventListener("click", () => {
    state.menuItems.push(createEmptyCategory());
    saveContent(state);
    renderContent();
    renderAdminMenuEditor();
  });

  document.getElementById("adminForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const nextState = { ...state };

    formData.forEach((value, key) => {
      nextState[key] = value.toString().trim();
    });

    nextState.menuItems = state.menuItems;
    Object.assign(state, nextState);
    saveContent(state);
    renderContent();
    closeAdmin();
  });
}

function setupRevealAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      }
    });
  }, { threshold: 0.18 });

  document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
}

function setupMobileMenu() {
  const toggle = document.getElementById("menuToggle");
  const nav = document.getElementById("siteNav");
  const actions = document.querySelector(".topbar-actions");

  function setOpen(open) {
    nav.classList.toggle("is-open", open);
    actions.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  }

  toggle.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") !== "true";
    setOpen(open);
  });

  [...nav.querySelectorAll("a"), ...actions.querySelectorAll("a, button")].forEach((element) => {
    element.addEventListener("click", () => {
      if (window.innerWidth <= 980) {
        setOpen(false);
      }
    });
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 980) {
      setOpen(false);
    }
  });
}

renderContent();
setupAdmin();
setupRevealAnimations();
setupMobileMenu();
