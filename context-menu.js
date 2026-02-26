const gCM_instances = [];
let gCM_nextId = 0;

const hamburgerMenuBtn = document.getElementById('morecommands');

// Tiny polyfill for Element.matches() for IE
if (!Element.prototype.matches) {
  Element.prototype.matches = Element.prototype.msMatchesSelector;
}

// Gets an element's next/previous sibling that matches the given selector
function getSibling(el, selector, direction = 1) {
  const sibling =
    direction > 0 ? el.nextElementSibling : el.previousElementSibling;
  if (!sibling || sibling.matches(selector)) {
    return sibling;
  }
  return getSibling(sibling, selector, direction);
}

// Gets an element's next/previous sibling's child that matches the given selector
function getSiblingWithChild(el, selector, direction = 1) {

  const menu = el.closest('menu');

  let currentLi = el.closest('li');
  
  if (!menu || !currentLi) return null;

  const menuList = Array.from(menu.children);

  let currentIndex = menuList.indexOf(currentLi);

  // Wrap around if we go out of bounds
  // Prevent infinite loop by checking menu length
  for (let i = 0; i < menuList.length; i++) {

    currentIndex = (currentIndex + direction + menuList.length) % menuList.length;
    
    const sibling = menuList[currentIndex];

    const target = sibling.querySelector(selector);
    
    if (target) return target;
  }

  return null;
}

// Fires custom event on given element
function emit(el, type, data = {}) {
  const event = document.createEvent('Event');

  Object.keys(data).forEach((key) => {
    event[key] = data[key];
  });

  event.initEvent(type, true, true);
  el.dispatchEvent(event);
}

class ContextMenu {
  constructor(
    selector,
    items,
    options = {
      className: '',
      minimalStyling: false,
    },
  ) {
    this.selector = selector;
    this.items = items;
    this.options = options;
    this.id = gCM_nextId++;
    this.target = null;

    this.create();
    gCM_instances.push(this);
  }

  // Creates DOM elements, sets up event listeners
  // Lite: Customized
  // Enable expected context menu keyboard controls
  // Home / End should select First / Last menu item
  // Arrow keys should move focus but not scroll
  // Space and Enter must click menu items (free button properties)
  // Escape and Tab keys should hide the menu and shift focus
  create() {
    // Create root <ul> / <menu>
    this.menu = document.createElement('menu');
    this.menu.role = 'menu';
    this.menu.className = 'ContextMenu';
    this.menu.setAttribute('data-contextmenu', this.id);
    this.menu.setAttribute('tabindex', -1);
    this.menu.addEventListener('keydown', (e) => {
      const cm = e.currentTarget;
      const btns = cm.querySelectorAll('button');
      switch (e.code) {
        case 'Home':
          e.preventDefault();
          btns[0].focus();
          break;
        case 'End':
          e.preventDefault();
          btns[btns.length - 1].focus();
          break;
        case 'ArrowUp':
        case 'ArrowLeft':
          e.preventDefault();
          this.moveFocus(-1);
          break;
        case 'ArrowDown':
        case 'ArrowRight':
          e.preventDefault();
          this.moveFocus(1);
          break;
        case 'Escape':
        case 'Tab':
          this.hide();
          hamburgerMenuBtn.focus();
          break;
        default:
          return;
      }      
    });

    if (!this.options.minimalStyling) {
      this.menu.classList.add('ContextMenu--theme-default');
    }
    if (this.options.className) {
      this.options.className
        .split(' ')
        .forEach((cls) => this.menu.classList.add(cls));
    }

    // Create <li> / <button> elements for each menu item
    // Lite: Customized
    // Create separator elements or nested buttons
    // Assign correct ARIA roles to each element
    this.items.forEach((item, index) => {

      const li = document.createElement('li');
      li.role = 'presentation';

      if (!('name' in item)) {

        // Insert a divider
        li.className = 'ContextMenu-divider';

      } else {

        const btn = document.createElement('button');
        btn.role = 'menuitem';

        if (item.name.indexOf("*") == -1){
          btn.className = 'ContextMenu-item btn-lite';
          btn.textContent = item.name;
          btn.role = "menuitem";
          btn.setAttribute('data-contextmenuitem', index);
          if (index !== 0) btn.setAttribute('tabindex', -1);
          btn.addEventListener('click', () => this.select(btn));
          // btn.addEventListener('keyup', (e) => {
          //   if (e.code === "Space") {
          //     this.select(btn);
          //   }
          // });
        }
        else{
          item.name = item.name.replace("*","");
          btn.className = 'ContextMenu-item-red btn-lite';
          btn.textContent = item.name;
          btn.setAttribute('data-contextmenuitem', index);
          btn.setAttribute('tabindex', -1);
          btn.addEventListener('click', () => this.select(btn));
          // btn.addEventListener('keyup', (e) => {
          //   if (e.code === "Space") {
          //     this.select(btn);
          //   }
          // });
        }

        li.appendChild(btn);
      }

      this.menu.appendChild(li);
    });

    // Add root element to the <body>
    document.body.appendChild(this.menu);

    emit(this.menu, 'created');
  }

  // Shows context menu
  //
  // Lite: Customized
  // Handle with CSS Anchor Positioning
  // Fall back to JS if not supported
  // Fall back to center-top if no 
  // click coordinates (shortcut pressed)
  show(e) {

    const isAnchorPositioningSupported =
      CSS.supports('position-anchor: --test');

    if (!isAnchorPositioningSupported) {

      // Keep the context menu from going off the right of the screen
      if (e.pageX && isMobileBrowser()){
        this.menu.style.left = `${e.pageX-200}px`;
        this.menu.style.top = `${e.pageY}px`;
      }
      else if (e.pageX) {
        this.menu.style.left = `${e.pageX}px`;
        this.menu.style.top = `${e.pageY}px`;     
      }
      else {
        this.menu.style.left = `calc(50% - 218px / 2)`;
        this.menu.style.top = `50px`;
      }
    }

    this.menu.classList.add('is-open');
    this.target = e.target;

    // Give context menu focus
    // Lite: Customized
    // Focus on the first button if press coming from keyboard

    if (e.pointerType === '') { 

      this.menu.querySelector('button').focus(); 

    } else {

      this.menu.focus();
    }

    // Disable native context menu
    e.preventDefault();

    emit(this.menu, 'shown');
  }

  // Hides context menu
  hide() {
    this.menu.classList.remove('is-open');
    this.target = null;
    emit(this.menu, 'hidden');
  }

  // Selects the given item and calls its handler
  select(item) {
    const itemId = item.getAttribute('data-contextmenuitem');
    if (this.items[itemId]) {
      // Call item handler with target element as parameter
      this.items[itemId].fn(this.target);
    }
    this.hide();
    emit(this.menu, 'itemselected');
  }

  // Moves focus to the next/previous menu item
  moveFocus(direction = 1) {
    const focused = this.menu.querySelector('[data-contextmenuitem]:focus');
    let next;

    if (focused) {
      next = getSiblingWithChild(focused, '[data-contextmenuitem]', direction);
    }

    if (!next) {
      next =
        direction > 0
          ? this.menu.querySelector('[data-contextmenuitem]:first-child')
          : this.menu.querySelector('[data-contextmenuitem]:last-child');
    }

    if (next) next.focus();
  }

  // Convenience method for adding an event listener
  on(type, fn) {
    this.menu.addEventListener(type, fn);
  }

  // Convenience method for removing an event listener
  off(type, fn) {
    this.menu.removeEventListener(type, fn);
  }

  // Removes DOM elements, stop listeners
  destroy() {
    this.menu.parentElement.removeChild(this.menu);
    this.menu = null;
    gCM_instances.splice(gCM_instances.indexOf(this), 1);
  }
}

var gInContextMenu = false;
// Listen for c event to show menu
document.addEventListener('click', (e) => {
  gCM_instances.forEach((menu) => {
    if (e.target.matches(menu.selector)) {
      menu.show(e);
    }
  });
});

// Listen for click event to hide menu
document.addEventListener('click', (e) => {
  gCM_instances.forEach((menu) => {
    if ((!e.target.matches(`[data-contextmenu="${menu.id}"], [data-contextmenu="${menu.id}"] *`)) && (!e.target.matches(menu.selector))) {
      menu.hide();
    }
  });
});
