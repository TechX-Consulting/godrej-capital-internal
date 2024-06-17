async function fetchData(apiUrl) {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error('Response is not JSON');
    }
    const responseData = await response.json();
    return responseData.data; // Access the 'data' array
  } catch (error) {
    console.error(error);
    return null;
  }
}

function renderData(data, selectedTab, selectedOption, tabpanel) {
  if (!selectedTab || !selectedOption) {
    console.error('Selected tab or option is invalid.');
    return;
  }

  const filteredData = data.filter((item) => {
    return item.tab === selectedTab && item.dropdown === selectedOption;
  });

  if (filteredData.length === 0) {
    console.error(`Data for combination '${selectedTab} - ${selectedOption}' not found.`);
    return;
  }

  // Clear previous data
  tabpanel.innerHTML = '';

  // Display the filtered data
  filteredData.forEach((item) => {
    let sectionIndex = 1;

    // Iterate through sections until no more titles are found
    while (item[`title_${sectionIndex}`]) {
      const title = item[`title_${sectionIndex}`].trim();
      const description = item[`description_${sectionIndex}`] || ''; // Default to empty string if description is not present
      const bulletPoints = item[`bullet_points_${sectionIndex}`] || ''; // Default to empty string if bullet points are not present

      // Create paragraph element for title with bold styling
      const titleElement = document.createElement('p');
      titleElement.textContent = title;
      titleElement.style.fontWeight = 'bold'; // Set bold font weight
      tabpanel.appendChild(titleElement);

      // Create paragraph element for description
      const descriptionElement = document.createElement('p');
      descriptionElement.textContent = description.trim();
      tabpanel.appendChild(descriptionElement);

      // Render bullet points if available
      if (bulletPoints.trim() !== '') {
        const bulletPointsList = bulletPoints.split('\n').map(bp => bp.trim()).filter(bp => bp !== '');

        if (bulletPointsList.length > 0) {
          const listElement = document.createElement('ul');
          listElement.style.listStyleType = 'disc'; // Set list style to bullet points

          bulletPointsList.forEach((bullet) => {
            const listItem = document.createElement('li');
            listItem.textContent = bullet;
            listElement.appendChild(listItem);
          });

          tabpanel.appendChild(listElement);
        }
      }

      // Add some space between sections
      tabpanel.appendChild(document.createElement('hr'));

      sectionIndex++;
    }
  });
}

function handleTabClick(event, data, tablist, tabpanel, dropdown) {
  tablist.querySelectorAll('.tabs-tab').forEach(btn => {
    btn.setAttribute('aria-selected', 'false');
    btn.style.backgroundColor = 'white';
    btn.style.color = 'black';
  });
  event.target.setAttribute('aria-selected', 'true');
  event.target.style.backgroundColor = 'var(--background-color)';
  event.target.style.color = 'white';
  const selectedTab = event.target.innerHTML;
  const selectedOption = dropdown.value;
  renderData(data, selectedTab, selectedOption, tabpanel);
}

function handleDropdownChange(data, tablist, tabpanel, dropdown) {
  const selectedTabButton = tablist.querySelector('button[aria-selected="true"]');
  const selectedTab = selectedTabButton ? selectedTabButton.innerHTML : tablist.querySelector('button').innerHTML;
  const selectedOption = dropdown.value;
  renderData(data, selectedTab, selectedOption, tabpanel);
}

function createDropdownForTabs(tabNames, tablist, data, tabpanel, dropdown) {
  const dropdownForTabs = document.createElement('select');
  dropdownForTabs.className = 'tabs-list-dropdown';

  tabNames.forEach((tabName, i) => {
    const optionElement = document.createElement('option');
    optionElement.value = tabName;
    optionElement.text = tabName;
    if (i === 0) {
      optionElement.selected = true;
    }
    dropdownForTabs.add(optionElement);
  });

  dropdownForTabs.addEventListener('change', () => {
    const selectedTab = dropdownForTabs.value;
    const selectedOption = dropdown.value;
    renderData(data, selectedTab, selectedOption, tabpanel);
  });

  return dropdownForTabs;
}

async function decorate(block) {
  const tabListWrapper = document.createElement('div');
  tabListWrapper.className = 'tabs-list-wrapper';

  // Create a div to hold the "Select Category" label and dropdown
  const categoryWrapper = document.createElement('div');
  categoryWrapper.className = 'category-wrapper';

  const dropdownLabel = document.createElement('label');
  dropdownLabel.textContent = 'Select Category:';
  dropdownLabel.className = 'tabs-dropdown-label';

  const dropdown = document.createElement('select');
  dropdown.className = 'tabs-dropdown';

  categoryWrapper.appendChild(dropdownLabel);
  categoryWrapper.appendChild(dropdown);

  // Append categoryWrapper to tabListWrapper
  tabListWrapper.appendChild(categoryWrapper);

  // Create a wrapper for "Select Documents" label and dropdown
  const documentsWrapper = document.createElement('div');
  documentsWrapper.className = 'documents-wrapper'; // You can define your own class name here

  const tabListLabel = document.createElement('label');
  tabListLabel.textContent = 'Select Documents:';
  tabListLabel.className = 'tabs-list-label';

  const tablist = document.createElement('div');
  tablist.className = 'tabs-list';
  tablist.setAttribute('role', 'tablist');

  const tabNames = ['KYC Documents', 'Income Documents', 'Property Documents'];
  const dropdownOptions = ['Indian Resident Salaried', 'Non-Resident Indian Salaried', 'Business Self Employed', 'Professional Self Employed'];

  let data = [];

  tabNames.forEach((tabName, i) => {
    const button = document.createElement('button');
    button.className = 'tabs-tab';
    button.innerHTML = tabName;
    button.setAttribute('aria-controls', 'tabpanel-tab');
    button.setAttribute('aria-selected', i === 0);
    button.setAttribute('role', 'tab');
    button.setAttribute('type', 'button');
    button.addEventListener('click', (event) => handleTabClick(event, data, tablist, tabpanel, dropdown));
    tablist.append(button);
  });

  dropdownOptions.forEach((option) => {
    const optionElement = document.createElement('option');
    optionElement.text = option;
    dropdown.add(optionElement);
  });

  dropdown.addEventListener('change', () => handleDropdownChange(data, tablist, tabpanel, dropdown));

  // Append label and dropdown to documentsWrapper
  documentsWrapper.appendChild(tabListLabel);
  documentsWrapper.appendChild(tablist);
  tabListWrapper.appendChild(documentsWrapper); // Append documentsWrapper to tabListWrapper

  block.prepend(tabListWrapper);

  const tabpanel = document.createElement('div');
  tabpanel.className = 'tabs-panel';
  tabpanel.id = 'tabpanel-tab';
  tabpanel.setAttribute('aria-labelledby', 'tab-1');
  tabpanel.setAttribute('role', 'tabpanel');
  block.appendChild(tabpanel);

  const apiUrl = 'https://main--godrej-capital-internal--divanshu-techx.hlx.live/website/query-index.json';
  data = await fetchData(apiUrl);

  if (!data) {
    console.error('Data not available.');
    return;
  }

  const selectedTab = tablist.querySelector('button[aria-selected="true"]').innerHTML;
  const selectedOption = dropdown.value;
  renderData(data, selectedTab, selectedOption, tabpanel);

  const tabsListDropdown = createDropdownForTabs(tabNames, tablist, data, tabpanel, dropdown);
  documentsWrapper.appendChild(tabsListDropdown); // Append dropdown created by createDropdownForTabs to documentsWrapper

  window.addEventListener('resize', () => handleViewportChange(tablist, tabsListDropdown));
  handleViewportChange(tablist, tabsListDropdown);
}

function handleViewportChange(tablist, tabsListDropdown) {
  const tabsWrapper = document.querySelector('.tabs-list-wrapper');
  const tabsListLabel = tabsWrapper.querySelector('.tabs-list-label');
  const tabsDropdownLabel = tabsWrapper.querySelector('.tabs-dropdown-label');

  if (window.innerWidth <= 968) {
    tablist.style.display = 'none';
    tabsListDropdown.style.display = 'block';
    tabsListLabel.style.display = 'block'; // Show "Select Documents" label
  } else {
    tablist.style.display = 'flex';
    tabsListDropdown.style.display = 'none';
    tabsListLabel.style.display = 'block'; // Show "Select Documents" label
  }

  tabsDropdownLabel.style.display = 'block'; // Always show "Select Category" label
}

export default decorate;
