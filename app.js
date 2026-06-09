const STORAGE_KEY = "dlena-demo-content";

const defaultContent = {
  heroEyebrow: "Alta cocina contemporanea",
  heroTitle: "Una experiencia intima, verde y dorada.",
  heroText: "D'Lena es una demo conceptual de restaurante premium: atmosfera sobria, cocina de autor y una direccion visual pensada para transmitir lujo silencioso.",
  heroNoteOne: "Cenas privadas con maridaje curado por sommeliers.",
  heroNoteTwo: "Menu estacional con ingredientes frescos de origen selecto.",
  heroNoteThree: "Servicio elegante con detalle editorial en cada mesa.",
  featuredDishName: "Lomo D'Lena",
  featuredDishText: "Reduccion intensa, hojas tostadas y acabado de oro culinario sobre un corte en su punto.",
  heroImage: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
  menuTitle: "Menu degustacion y seleccion signature",
  menuIntro: "Una carta construida para una noche de ritmo pausado, platos precisos y contrastes elegantes entre frescura herbal y profundidad tostada.",
  menuSummary: "Cada categoria se presenta como una escena distinta: entradas ligeras, principales con estructura y postres disenados para cerrar con textura, perfume y brillo.",
  menuItems: [
    {
      categoryName: "Entradas",
      categoryTitle: "Aperturas",
      items: [
        {
          name: "Ostra imperial",
          description: "Ostra fresca, granita de pepino y aceite de albahaca con nota citrica.",
          detail: "Servida sobre piedra fria con perfil marino limpio, matiz herbal y una presentacion elegante pensada para abrir la experiencia con frescura y precision.",
          image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1200&q=80",
          price: "$18"
        },
        {
          name: "Tartaro esmeralda",
          description: "Res curada, mostaza fina, chips de raiz y crema ahumada.",
          detail: "Corte fino de res con acentos terrosos y un final ahumado elegante. El montaje y la vajilla estan pensados para un servicio nocturno sofisticado.",
          image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80",
          price: "$24"
        }
      ]
    },
    {
      categoryName: "Principales",
      categoryTitle: "Piezas centrales",
      items: [
        {
          name: "Lomo D'Lena",
          description: "Corte premium, puree de apio, esparragos y demi-glace con acabado dorado.",
          detail: "La pieza central de la casa. Coccion precisa, salsa de fondo profunda y acabado visual de alta gama con acento dorado y vegetales de textura limpia.",
          image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80",
          price: "$46"
        },
        {
          name: "Robalo de jardin",
          description: "Filete sellado, mantequilla de hierbas, hinojo y emulsion de limon.",
          detail: "Preparacion luminosa con equilibrio entre mantequilla, notas anisadas y una acidez controlada para mantener una sensacion ligera y sofisticada.",
          image: "https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=1200&q=80",
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
          detail: "Postre de estructura delicada con acabado fino, volumen controlado y un perfil de frutos secos disenado para cerrar la cena sin pesadez.",
          image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=1200&q=80",
          price: "$16"
        },
        {
          name: "Perla citrica",
          description: "Mousse de vainilla, centro de maracuya y espejo brillante.",
          detail: "Una composicion ligera y brillante con centro acido y textura sedosa. Presentacion limpia para un cierre mas fresco y contemporaneo.",
          image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=1200&q=80",
          price: "$15"
        }
      ]
    }
  ],
  aboutTitle: "Disenio sensorial con caracter premium",
  aboutText: "El concepto combina acabados oscuros, dorados sobrios y una narrativa visual de alta gama. Todo el contenido de esta demo puede editarse desde el administrador: textos, imagenes y categorias completas del menu.",
  aboutImage: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1200&q=80",
  hoursText: "Martes a domingo, 6:00 PM a 11:30 PM",
  locationText: "Zona exclusiva, salon privado y terraza de firma",
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
      ...parsed,
      menuItems: normalizeMenuItems(parsed.menuItems || defaultContent.menuItems)
    };
  } catch {
    return structuredClone(defaultContent);
  }
}

function normalizeMenuItems(menuItems) {
  return menuItems.map((category) => ({
    ...category,
    items: (category.items || []).map((item) => ({
      detail: item.detail || item.description || "",
      image: item.image || defaultContent.aboutImage,
      ...item
    }))
  }));
}

function saveContent(content) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
}

function renderContent() {
  const textFields = [
    "heroEyebrow", "heroTitle", "heroText", "heroNoteOne", "heroNoteTwo", "heroNoteThree",
    "featuredDishName", "featuredDishText", "menuTitle", "menuIntro", "menuSummary",
    "aboutTitle", "aboutText", "hoursText", "locationText", "reservationText"
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
      itemNode.addEventListener("click", () => openDishModal(category, item));
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

function openDishModal(category, dish) {
  document.getElementById("dishModalCategory").textContent = category.categoryTitle;
  document.getElementById("dishModalName").textContent = dish.name;
  document.getElementById("dishModalPrice").textContent = dish.price;
  document.getElementById("dishModalDescription").textContent = dish.description;
  document.getElementById("dishModalDetail").textContent = dish.detail || dish.description;
  document.getElementById("dishModalImage").style.backgroundImage = `linear-gradient(to bottom, rgba(4, 10, 7, 0.12), rgba(4, 10, 7, 0.5)), url("${dish.image || state.aboutImage}")`;
  document.getElementById("dishModal").classList.add("open");
  document.getElementById("dishModal").setAttribute("aria-hidden", "false");
}

function closeDishModal() {
  document.getElementById("dishModal").classList.remove("open");
  document.getElementById("dishModal").setAttribute("aria-hidden", "true");
}

function createEmptyCategory() {
  return {
    categoryName: "Nueva categoria",
    categoryTitle: "Titulo de categoria",
    items: [createEmptyDish()]
  };
}

function createEmptyDish() {
  return {
    name: "Nuevo platillo",
    description: "Describe aqui el platillo.",
    detail: "Agrega aqui los detalles completos del platillo.",
    image: state.aboutImage,
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
      dishNode.querySelector(".admin-dish-detail").value = dish.detail || "";
      dishNode.querySelector(".admin-dish-image").value = dish.image || "";

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

      dishNode.querySelector(".admin-dish-detail").addEventListener("input", (event) => {
        state.menuItems[categoryIndex].items[dishIndex].detail = event.target.value;
        saveContent(state);
      });

      dishNode.querySelector(".admin-dish-image").addEventListener("input", (event) => {
        state.menuItems[categoryIndex].items[dishIndex].image = event.target.value;
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

function setupDishModal() {
  document.getElementById("closeDishModal").addEventListener("click", closeDishModal);
  document.getElementById("closeDishModalButton").addEventListener("click", closeDishModal);
}

renderContent();
setupAdmin();
setupRevealAnimations();
setupMobileMenu();
setupDishModal();
