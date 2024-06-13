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
    return null; // or handle the error as needed
  }
}

function renderData(data, tablist, tabpanel, dropdown) {
  const selectedTabButton = tablist.querySelector('button[aria-selected="true"]');
  if (!selectedTabButton) {
    throw new Error('No tab is currently selected.');
  }

  const selectedTab = selectedTabButton.innerHTML;
  const selectedOption = dropdown.value;

  if (!selectedTab || !selectedOption) {
    throw new Error('Selected tab or option is invalid.');
  }

  const filteredData = data.filter(item => item.tab === selectedTab && item.dropdown === selectedOption);

  if (filteredData.length === 0) {
    throw new Error(`Data for combination '${selectedTab} - ${selectedOption}' not found.`);
  }

  // Clear previous data
  tabpanel.innerHTML = '';

  // Display the filtered data
  filteredData.forEach(item => {
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

          bulletPointsList.forEach(bullet => {
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

async function decorate(block) {
  const tabListWrapper = document.createElement('div');
  tabListWrapper.className = 'tabs-list-wrapper';

  const dropdown = document.createElement('select');
  dropdown.className = 'tabs-dropdown';

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
    button.setAttribute('aria-controls', `tabpanel-tab`);
    button.setAttribute('aria-selected', i === 0);
    button.setAttribute('role', 'tab');
    button.setAttribute('type', 'button');
    button.addEventListener('click', () => {
      tablist.querySelectorAll('.tabs-tab').forEach(btn => {
        btn.setAttribute('aria-selected', 'false');
        btn.style.backgroundColor = 'white';
        btn.style.color = 'black';
      });
      button.setAttribute('aria-selected', 'true');
      button.style.backgroundColor = 'var(--background-color)';
      button.style.color = 'white';
      renderData(data, tablist, tabpanel, dropdown);
    });
    tablist.append(button);
  });

  dropdownOptions.forEach((option) => {
    const optionElement = document.createElement('option');
    optionElement.text = option;
    dropdown.add(optionElement);
  });

  dropdown.addEventListener('change', () => {
    renderData(data, tablist, tabpanel, dropdown);
  });

  tabListWrapper.appendChild(dropdown);
  tabListWrapper.append(tablist);
  block.prepend(tabListWrapper);

  const tabpanel = document.createElement('div');
  tabpanel.className = 'tabs-panel';
  tabpanel.id = 'tabpanel-tab';
  tabpanel.setAttribute('aria-labelledby', 'tab-1');
  tabpanel.setAttribute('role', 'tabpanel');
  block.appendChild(tabpanel);

  const apiUrl = 'https://main--godrej-capital-internal--divanshu-techx.hlx.page/website/query-index.json';
  data = await fetchData(apiUrl);

  if (!data) {
    console.error('Data not available.');
    return;
  }

  renderData(data, tablist, tabpanel, dropdown);
}

export { renderData, decorate, fetchData };
