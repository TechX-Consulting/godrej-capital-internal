export default async function decorate(block) {

  // This will be your API response data
  let responseData = [];

  // Function for get authored label data
  function getDataAttributeValueByName(name) {
    const element = document.querySelector(`[data-${name}]`);
    return element ? element.getAttribute(`data-${name}`) : null;
  }

  const newsTabLabel = getDataAttributeValueByName('newsTabLabel');
  const pressReleaseLabel = getDataAttributeValueByName('pressReleaseLabel');
  const inputFieldPlaceholder = getDataAttributeValueByName('inputFieldPlaceholder');
  // const sortByLabel = getDataAttributeValueByName('sortByLabel');
  // const latestToOldestLabel = getDataAttributeValueByName('latestToOldestLabel');
  // const oldestToLatestLabel = getDataAttributeValueByName('oldestToLatestLabel');

  // Create container
  const container = document.createElement('div');
  container.className = 'container';

  // Create tabs container
  const tabsContainer = document.createElement('div');
  tabsContainer.className = 'tabs';

  const newsTab = document.createElement('div');
  const pressReleaseTab = document.createElement('div');

  newsTab.id = 'newsTab';
  newsTab.className = 'tab active';
  newsTab.textContent = newsTabLabel;

  pressReleaseTab.id = 'pressReleaseTab';
  pressReleaseTab.className = 'tab';
  pressReleaseTab.textContent = pressReleaseLabel;

  tabsContainer.appendChild(newsTab);
  tabsContainer.appendChild(pressReleaseTab);
  container.appendChild(tabsContainer);

  // Create controls container
  const controlsContainer = document.createElement('div');
  controlsContainer.className = 'controls';

  const searchInput = document.createElement('input');
  searchInput.type = 'text';
  searchInput.id = 'searchInput';
  searchInput.placeholder = inputFieldPlaceholder;

  const sortDropdown = document.createElement('select');
  sortDropdown.id = 'sortDropdown';
  const optionNewToOld = document.createElement('option');
  optionNewToOld.value = 'newToOld';
  optionNewToOld.textContent = 'New to Old';
  const optionOldToNew = document.createElement('option');
  optionOldToNew.value = 'oldToNew';
  optionOldToNew.textContent = 'Old to New';

  sortDropdown.appendChild(optionNewToOld);
  sortDropdown.appendChild(optionOldToNew);

  controlsContainer.appendChild(searchInput);
  controlsContainer.appendChild(sortDropdown);
  container.appendChild(controlsContainer);

  block.appendChild(container);

  // Create content sections
  const newsContent = document.createElement('div');
  const pressReleaseContent = document.createElement('div');

  newsContent.id = 'newsContent';
  newsContent.className = 'content active';
  newsContent.innerHTML = '<h2>News Content</h2><p>Content for News.</p>';

  pressReleaseContent.id = 'pressReleaseContent';
  pressReleaseContent.className = 'content';
  pressReleaseContent.innerHTML = '<h2>Press Release Content</h2><p>Content for Press Release.</p>';

  block.appendChild(newsContent);
  block.appendChild(pressReleaseContent);

  // Function for active tabs
  function setActiveTab(tab) {
    if (tab === 'news') {
      newsTab.classList.add('active');
      pressReleaseTab.classList.remove('active');
      newsContent.classList.add('active');
      pressReleaseContent.classList.remove('active');
    } else {
      newsTab.classList.remove('active');
      pressReleaseTab.classList.add('active');
      newsContent.classList.remove('active');
      pressReleaseContent.classList.add('active');
    }
  }

  // Function to render news items
  function getResponseData(filteredData) {
    newsContent.innerHTML = '';
    if (filteredData.length === 0) {
      newsContent.innerHTML = '<p>No results found</p>';
    } else {
      filteredData.forEach(item => {
        const newsContainerData = document.createElement('div');
        newsContainerData.className = 'newsContainer';
        const titleElement = document.createElement('h3');
        titleElement.textContent = item.title;
        const descriptionElement = document.createElement('p');
        descriptionElement.textContent = item.description;
        newsContainerData.appendChild(titleElement);
        newsContainerData.appendChild(descriptionElement);
        newsContent.appendChild(newsContainerData);
      });
    }
  }

  // Function for an api call
  function getApiResponse() {
    fetch('https://main--eds-site--24shrishti.hlx.page/query-index.json', {
      method: 'GET',
    })
      .then(response => {
        if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
        }
                return response.json();
            })
            .then(response => {
                getResponseData(response.data);
                responseData = response.data;
            })
            .catch(error => {
                console.error(error);
            });
  }

  // News Tab Event Listener
  newsTab.addEventListener('click', function handleNewsTabClick() {
    setActiveTab('news');
    // Call the function to get API response and render data on news tab click event.
    getApiResponse();
  });
  
  // Press Release Tab Event Listener
  pressReleaseTab.addEventListener('click', function handlePressReleaseTabClick() {
    setActiveTab('pressRelease');
  });

  // Add event listener to the search input
  searchInput.addEventListener('input', function handleSearchInput(event) {
    const searchText = event.target.value.toLowerCase();

    const filteredData = responseData.filter(item => {
        return item.title.toLowerCase().includes(searchText) || item.description.toLowerCase().includes(searchText);
    });
    getResponseData(filteredData);
  });

}

  // Use the decorate function
  const blockElement = document.getElementById('block');
  decorate(blockElement);