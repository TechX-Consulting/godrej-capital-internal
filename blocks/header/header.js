import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

// media query match that indicates mobile/tablet width
const isDesktop = window.matchMedia('(min-width: 900px)');

function closeOnEscape(e) {
  if (e.code === 'Escape') {
    const nav = document.getElementById('nav');
    const navSections = nav.querySelector('.nav-sections');
    const navSectionExpanded = navSections.querySelector('[aria-expanded="true"]');
    if (navSectionExpanded && isDesktop.matches) {
      // eslint-disable-next-line no-use-before-define
      toggleAllNavSections(navSections);
      navSectionExpanded.focus();
    } else if (!isDesktop.matches) {
      // eslint-disable-next-line no-use-before-define
      toggleMenu(nav, navSections);
      nav.querySelector('button').focus();
    }
  }
}

function openOnKeydown(e) {
  const focused = document.activeElement;
  const isNavDrop = focused.className === 'nav-drop';
  if (isNavDrop && (e.code === 'Enter' || e.code === 'Space')) {
    const dropExpanded = focused.getAttribute('aria-expanded') === 'true';
    // eslint-disable-next-line no-use-before-define
    toggleAllNavSections(focused.closest('.nav-sections'));
    focused.setAttribute('aria-expanded', dropExpanded ? 'false' : 'true');
  }
}

function focusNavSection() {
  document.activeElement.addEventListener('keydown', openOnKeydown);
}

/**
 * Toggles all nav sections
 * @param {Element} sections The container element
 * @param {Boolean} expanded Whether the element should be expanded or collapsed
 */
function toggleAllNavSections(sections, expanded = false) {
  sections.querySelectorAll('.nav-sections .default-content-wrapper > ul > li').forEach((section) => {
    section.setAttribute('aria-expanded', expanded);
  });
}

/**
 * Toggles the entire nav
 * @param {Element} nav The container element
 * @param {Element} navSections The nav sections within the container element
 * @param {*} forceExpanded Optional param to force nav expand behavior when not null
 */
function toggleMenu(nav, navSections, forceExpanded = null) {
  const expanded = forceExpanded !== null ? !forceExpanded : nav.getAttribute('aria-expanded') === 'true';
  const button = nav.querySelector('.nav-hamburger button');
  document.body.style.overflowY = (expanded || isDesktop.matches) ? '' : 'hidden';
  nav.setAttribute('aria-expanded', expanded ? 'false' : 'true');
  toggleAllNavSections(navSections, expanded || isDesktop.matches ? 'false' : 'true');
  button.setAttribute('aria-label', expanded ? 'Open navigation' : 'Close navigation');
  // enable nav dropdown keyboard accessibility
  const navDrops = navSections.querySelectorAll('.nav-drop');
  if (isDesktop.matches) {
    navDrops.forEach((drop) => {
      if (!drop.hasAttribute('tabindex')) {
        drop.setAttribute('role', 'button');
        drop.setAttribute('tabindex', 0);
        drop.addEventListener('focus', focusNavSection);
      }
    });
  } else {
    navDrops.forEach((drop) => {
      drop.removeAttribute('role');
      drop.removeAttribute('tabindex');
      drop.removeEventListener('focus', focusNavSection);
    });
  }
  // enable menu collapse on escape keypress
  if (!expanded || isDesktop.matches) {
    // collapse menu on escape press
    window.addEventListener('keydown', closeOnEscape);
  } else {
    window.removeEventListener('keydown', closeOnEscape);
  }
}

/**
 * loads and decorates the header, mainly the nav
 * @param {Element} block The header block element
 */
export default async function decorate(block) {
  // load nav as fragment
  const navMeta = getMetadata('nav');
  const navPath = navMeta ? new URL(navMeta, window.location).pathname : '/nav';
  const fragment = await loadFragment(navPath);

  // decorate nav DOM
  block.textContent = '';
  const nav = document.createElement('nav');
  nav.id = 'nav';
  while (fragment.firstElementChild) nav.append(fragment.firstElementChild);

  const classes = ['brand', 'sections', 'tools'];
  classes.forEach((c, i) => {
    const section = nav.children[i];
    if (section) section.classList.add(`nav-${c}`);
  });

  const navBrand = nav.querySelector('.nav-brand');
  const brandLink = navBrand.querySelector('.button');
  if (brandLink) {
    brandLink.className = '';
    brandLink.closest('.button-container').className = '';
  }

  const navSections = nav.querySelector('.nav-sections');
  if (navSections) {
    navSections.querySelectorAll(':scope .default-content-wrapper > ul > li').forEach((navSection) => {
      if (navSection.querySelector('ul')) navSection.classList.add('nav-drop');
      navSection.addEventListener('click', () => {
        if (isDesktop.matches) {
          const expanded = navSection.getAttribute('aria-expanded') === 'true';
          toggleAllNavSections(navSections);
          navSection.setAttribute('aria-expanded', expanded ? 'false' : 'true');
        }
      });
    });
  }

  // hamburger for mobile
  const hamburger = document.createElement('div');
  hamburger.classList.add('nav-hamburger');
  hamburger.innerHTML = `<button type="button" aria-controls="nav" aria-label="Open navigation">
      <span class="nav-hamburger-icon"></span>
    </button>`;
  hamburger.addEventListener('click', () => toggleMenu(nav, navSections));
  nav.prepend(hamburger);
  nav.setAttribute('aria-expanded', 'false');
  // prevent mobile nav behavior on window resize
  toggleMenu(nav, navSections, isDesktop.matches);
  isDesktop.addEventListener('change', () => toggleMenu(nav, navSections, isDesktop.matches));

  const navWrapper = document.createElement('div');
  navWrapper.className = 'nav-wrapper';
  navWrapper.append(nav);
  block.append(navWrapper);

  // my js called

  console.log('js called');

  const api = "https://main--eds-practice--imjeekxgurjar.hlx.page/nav-element/globalnavigation.json";
  let responseData = [];

  // Create the topnav div
  const topNav = document.createElement('div');
  topNav.className = 'topnav';

  // create main container div
  const belowNavMainContainer = document.createElement('div');
  belowNavMainContainer.className = 'belowNavMainContainer';

  const parentContainerDiv = document.createElement('div');
  parentContainerDiv.className = 'parentContainerdiv';

  navWrapper.appendChild(topNav); // Assuming navWrapper is defined in your HTML
  navWrapper.appendChild(belowNavMainContainer);

  // Function to render news items
  function getResponseData(filteredData) {
         // Create the ul element
         const ul = document.createElement('ul');

         filteredData.forEach((item) => {
             // Create the li element
             const li = document.createElement('li');
             li.className = 'listElement';

             // Create the a element
             const a = document.createElement('a');
             a.href = "#.html";
             a.textContent = item.HeadingName;
             a.setAttribute('data-path', item.ChildPageUrl);
             a.setAttribute('data-depth',item.depth);
             a.setAttribute('data-navItem',item.HeadingName)

             // Replace spaces with hyphens and add custom class
             const apiClass = item.HeadingName.replace(/\s+/g, '-');
             const customClass = 'anchorClass';
             a.classList.add(apiClass, customClass);

             // Append the a element to the li
             li.appendChild(a);

             // Append the li element to the ul
             ul.appendChild(li);
         });

         // Append the ul to the topNav
         topNav.appendChild(ul);
             // Add event listeners to show/hide the belowNavMainContainer
             const navItems = ul.querySelectorAll('a.anchorClass');
             const belowNavMainContainer = document.querySelector('.belowNavMainContainer');

             navItems.forEach((navItem) => {
                 navItem.addEventListener('mouseover', () => {
                     let depth = navItem.getAttribute('data-depth'),
                         navElement = navItem.getAttribute('data-navItem') ,
                         childPath =  navItem.getAttribute('data-path');
                         getChildApiResponse(childPath, navElement, depth);
                     belowNavMainContainer.classList.add('show');
                 });

                //  navItem.addEventListener('mouseout', () => {
                //      belowNavMainContainer.classList.remove('show');
                //  });
             });
  }


  function createListElement(textContent, href = "#.html") {
    const li = document.createElement('li');
    li.className = 'listElement';

    const a = document.createElement('a');
    a.href = href;
    a.textContent = textContent;
    a.className = 'anchorPath';

    li.appendChild(a);
    return li;
  }

  function getChildResponseData(childResponseData) {
    parentContainerDiv.innerHTML = '';

    console.log(childResponseData.depth);

    const firstElementChildDiv = document.createElement('div');
    firstElementChildDiv.className = 'firstElementChildDiv';

    const secondElementDiv = document.createElement('div');
    secondElementDiv.className = 'secondElementDiv';
    console.log(secondElementDiv);

    const thirdElementDiv = document.createElement('div');
    thirdElementDiv.className = 'thirdElementDiv';

    const ul = document.createElement('ul');

    console.log(childResponseData);
    if (typeof childResponseData === 'object' && childResponseData !== null) {
        // Iterate over object keys
        for (const key in childResponseData) {

            if (childResponseData.hasOwnProperty(key)) {
                const item = childResponseData[key];
                const li = createListElement(key);
                ul.appendChild(li);

                // Check if the item has children and process them
                if (Array.isArray(item)) {
                    const subUl = document.createElement('ul');
                    subUl.className = 'subList';
                    item.forEach((subItem) => {
                      console.log(subItem);
                        subUl.appendChild(createListElement(subItem.title, subItem.path));
                        console.log(subItem.depth);

                    });
                    secondElementDiv.appendChild(subUl);
                }
            }
        }
    } else {
        console.error("childResponseData is not an array or object.");
    }

    firstElementChildDiv.appendChild(ul);
    parentContainerDiv.appendChild(firstElementChildDiv);
    parentContainerDiv.appendChild(secondElementDiv);

    // By default, show the first sublist
    const firstSubList = secondElementDiv.querySelector('.subList');
    if (firstSubList) {
        firstSubList.classList.add('active');
    }

    // Add event listeners to show/hide the sublists
    const mainItems = firstElementChildDiv.querySelectorAll('.listElement');
    const subLists = secondElementDiv.querySelectorAll('.subList');
    mainItems.forEach((item, index) => {
        item.addEventListener('mouseover', () => {
            subLists.forEach((subList) => subList.classList.remove('active'));
            subLists[index].classList.add('active');
        });
        item.addEventListener('click', () => {
            subLists.forEach((subList) => subList.classList.remove('active'));
            subLists[index].classList.add('active');
        });
    });
    const anchorTags = secondElementDiv.querySelectorAll('.anchorPath');
    anchorTags.forEach(anchor => {
        anchor.addEventListener('mouseover', () => {
          console.log(anchor.getAttribute('href'));  // Use the href value as needed
            let imagePath = anchor.getAttribute('href');
            displayURLContent(imagePath, thirdElementDiv);
        });
    });

    parentContainerDiv.appendChild(thirdElementDiv);
    belowNavMainContainer.appendChild(parentContainerDiv);


  }


  function getApiResponse(api) {
      fetch(api, {
          method: 'GET',
      })
      .then((response) => {
          if (!response.ok) {
              throw new Error(response.statusText);
          }
          return response.json();
      })
      .then((response) => {
          console.log(response.data);
          responseData = response.data;
          getResponseData(responseData);
      })
      .catch((error) => {
          console.error(error);
      });
  }

  function transformResponseData(data) {
    console.log(data.depth);
    let depth = data.depth;
    const transformedData = {};
    data.forEach(item => {
      if(item.parent){
        if (!transformedData[item.parent]) {
            transformedData[item.parent] = [];
        }
        transformedData[item.parent].push({
          title: item.title,
          path: item.path,
          depth: depth
      });
      } else {
        if(item.title){
          if (!transformedData[item.title]) {
              transformedData[item.title] = [];
          }
          transformedData[item.title].push({
            title:item.title,
            path: item.path,
            depth:depth
        });
        }

      }
    });

    return transformedData;
  }

  // child path response
  function getChildApiResponse(api, navElement, depth) {
    fetch(api, {
        method: 'GET',
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return response.json();
    })
    .then((response) => {
        console.log(response.data);
        let childResponseData = response.data;
        childResponseData.depth = depth;
        console.log(childResponseData.depth);
        // Transform the response data
        const transformedData = transformResponseData(childResponseData);
        console.log(transformedData);
        getChildResponseData(transformedData);
    })
    .catch((error) => {
        console.error(error);
    });
  }

  function displayURLContent(url, targetElement) {
    let mainUrl = "https://main--eds-practice--imjeekxgurjar.hlx.page" + url;
    fetch(mainUrl)
      .then(response => response.text())
      .then(data => {
        // Create a temporary div element to hold the fetched HTML content
        let tempDiv = document.createElement('div');
        tempDiv.innerHTML = data;

        // Extract the <main> tag content
        let mainContent = tempDiv.querySelector('main');

        if (mainContent) {
          // Clear any previous content in targetElement
          targetElement.innerHTML = '';

          // Append the <main> content to the targetElement
          targetElement.appendChild(mainContent);
        } else {
          console.error('Main tag not found in fetched content.');
        }
      })
      .catch(error => {
        console.error('Error fetching URL content:', error);
      });
  }

  getApiResponse(api);
}
