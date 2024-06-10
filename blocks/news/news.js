export default async function decorate(block) {

<<<<<<< HEAD
    var title, description;
  
    let responseData = []; 
   
    const newsTabLabel = getDataAttributeValueByName('newsTabLabel');
    const pressReleaseLabel = getDataAttributeValueByName('pressReleaseLabel');
    const inputFieldPlaceholder = getDataAttributeValueByName('inputFieldPlaceholder');
    const sortByLabel = getDataAttributeValueByName('sortByLabel');
    const latestToOldestLabel = getDataAttributeValueByName('latestToOldestLabel');
    const oldestToLatestLabel = getDataAttributeValueByName('oldestToLatestLabel');
  
  
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
      newsContent.innerHTML = `<h2>News Content</h2><p>Content for News.</p>`;
  
      pressReleaseContent.id = 'pressReleaseContent';
      pressReleaseContent.className = 'content';
      pressReleaseContent.innerHTML = `<h2>Press Release Content</h2><p>Content for Press Release.</p>`;
  
      block.appendChild(newsContent);
      block.appendChild(pressReleaseContent);
  
      const newsApi = "https://main--eds-site--24shrishti.hlx.page/news/query-index.json";
      const pressReleaseApi = "https://main--eds-site--24shrishti.hlx.page/pressrelease/query-index.json";
  
      // News Tab Event Listener
      newsTab.addEventListener('click', function() {
          setActiveTab('news');
          getApiResponse(newsApi);
      });
      
      // Press Release Tab Event Listener
      pressReleaseTab.addEventListener('click', function() {
          setActiveTab('pressRelease');
          console.log('btn click');
          getApiResponse(pressReleaseApi);
      });
      
      // Function for get authored label data
      function getDataAttributeValueByName(name) {
          const element = document.querySelector(`[data-${name}]`);
          return element ? element.getAttribute(`data-${name}`) : null;
      }
  
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
  
      // Function for an api call
      function getApiResponse(api) {
          fetch(api, {
              method: 'GET'
          })
              .then(response => {
                  if (!response.ok) {
                      throw new Error('Network response was not ok ' + response.statusText);
                  }
                  return response.json();
              })
              .then(response => {
                  getResponseData(response.data);
                  console.log(response.data);
                  responseData = response.data;
              })
              .catch(error => {
                  console.error('There was a problem with the fetch operation:', error);
              });
      }
  
      // Function to render news items
      function getResponseData(filteredData) {
      const newsContent = document.createElement('div');
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
  
     // Add event listener to the search input
     searchInput.addEventListener('input', function(event) {
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
=======
  // This will be your API response data
  let responseData = [];
  let currentPage = 1;

  // Function for get authored label data
  function getDataAttributeValueByName(name) {
    const element = document.querySelector(`[data-${name}]`);
    return element ? element.getAttribute(`data-${name}`) : null;
  }

  const newsTabLabel = getDataAttributeValueByName('newsTabLabel');
  const pressReleaseLabel = getDataAttributeValueByName('pressReleaseLabel');
  const inputFieldPlaceholder = getDataAttributeValueByName('inputFieldPlaceholder');
  const sortByLabel = getDataAttributeValueByName('sortByLabel');
  const latestToOldestLabel = getDataAttributeValueByName('latestToOldestLabel');
  const oldestToLatestLabel = getDataAttributeValueByName('oldestToLatestLabel');
  const itemsPerPage = parseInt(getDataAttributeValueByName('itemsPerPage'));
  const noResultFoundMessage = getDataAttributeValueByName('noResultFoundMessage');
  const newsApi = "https://main--eds-site--24shrishti.hlx.page/news/query-index.json";
  const pressReleaseApi = "https://main--eds-site--24shrishti.hlx.page/pressrelease/query-index.json";

  // Create container
  const container = document.createElement('div');
  container.className = 'container';

  // Create tabs and controls container
  const tabsAndControlsContainer = document.createElement('div');
  tabsAndControlsContainer.className = 'tabs-and-controls-container';

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
  optionNewToOld.textContent = latestToOldestLabel;
  const optionOldToNew = document.createElement('option');
  optionOldToNew.value = 'oldToNew';
  optionOldToNew.textContent = oldestToLatestLabel;

  sortDropdown.appendChild(optionNewToOld);
  sortDropdown.appendChild(optionOldToNew);

  controlsContainer.appendChild(searchInput);
  controlsContainer.appendChild(sortDropdown);

  // Append tabs and controls to tabsAndControlsContainer
  tabsAndControlsContainer.appendChild(tabsContainer);
  tabsAndControlsContainer.appendChild(controlsContainer);

  // Create pagination container
  const paginationContainer = document.createElement('div');
  paginationContainer.className = 'pagination';

  // Create content container
  const contentContainer = document.createElement('div');
  contentContainer.id = 'contentContainer';

  // Append sub-divs to main container
  container.appendChild(tabsAndControlsContainer);
  container.appendChild(paginationContainer);
  container.appendChild(contentContainer);

  // Append main container to block
  block.appendChild(container);

  // Function for active tabs
  function setActiveTab(tab) {
    if (tab === 'news') {
      newsTab.classList.add('active');
      pressReleaseTab.classList.remove('active');
    } else {
      newsTab.classList.remove('active');
      pressReleaseTab.classList.add('active');
    }
    getApiResponse(tab === 'news' ? newsApi : pressReleaseApi);
  }

  // Function to render news items
  function getResponseData(filteredData) {
    contentContainer.innerHTML = '';
    const paginationDiv = document.querySelector('.pagination');
    if (filteredData.length === 0) {
      contentContainer.innerHTML = noResultFoundMessage;
      paginationDiv.style.display = 'none';
    } else {
      paginationDiv.style.display = 'block';
      filteredData.forEach((item) => {
        const newsContainerData = document.createElement('div');
        newsContainerData.className = 'newsContainer';
        const titleElement = document.createElement('h3');
        titleElement.textContent = item.title;
        const descriptionElement = document.createElement('p');
        descriptionElement.textContent = item.description;
        const publishDateElement = document.createElement('p');
        publishDateElement.textContent = item.publishdate;
        newsContainerData.appendChild(titleElement);
        newsContainerData.appendChild(descriptionElement);
        newsContainerData.appendChild(publishDateElement);
        contentContainer.appendChild(newsContainerData);
      });
    }
  }

  // Function to render pagination buttons
  function renderPagination() {
      paginationContainer.innerHTML = '';
      const totalPages = Math.ceil(responseData.length / itemsPerPage);
      // Only show pagination buttons if there are more items than the items per page limit
      if (responseData.length > itemsPerPage) {
        for (let i = 1; i <= totalPages; i++) {
          const pageButton = document.createElement('button');
          pageButton.textContent = i;
          pageButton.className = 'page-button';
          if (i === currentPage) {
            pageButton.classList.add('active');
          }
          pageButton.addEventListener('click', () => {
            currentPage = i;
            renderPage();
          });
          paginationContainer.appendChild(pageButton);
        }
      }
  }

  // Function to render items on the current page
  function renderPage() {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const currentData = responseData.slice(start, end);
    getResponseData(currentData);
    renderPagination();
  }

  // On load api call function call
  getApiResponse(newsApi);

  // News Tab Event Listener
  newsTab.addEventListener('click', function handleNewsTabClick() {
    setActiveTab('news');
    getApiResponse(newsApi);
  });

  // Press Release Tab Event Listener
  pressReleaseTab.addEventListener('click', function handlePressReleaseTabClick() {
    setActiveTab('pressRelease');
    getApiResponse(pressReleaseApi);
  });

  function handleSearchInput(event) {
    const searchText = event.target.value.toLowerCase();
    const filteredData = responseData.filter((item) => {
      return item.title.toLowerCase().includes(searchText) || item.description.toLowerCase().includes(searchText);});
      getResponseData(filteredData);
  }

  searchInput.addEventListener('input', handleSearchInput);

  // Function to sort data based on the selected option
  function sortData() {
      const selectedOption = sortDropdown.value;
      if (selectedOption === 'newToOld') {
        responseData.sort((a, b) => new Date(b.publishdate) - new Date(a.publishdate));
      } else if (selectedOption === 'oldToNew') {
        responseData.sort((a, b) => new Date(a.publishdate) - new Date(b.publishdate));
      }
  }

  // Function for an api call
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
            responseData = response.data;
            currentPage = 1;
            sortData();  // Ensure data is sorted initially
            renderPage();
          })
          .catch((error) => {
            console.error(error);
          });
  }

  // Add event listener to the sort dropdown
  sortDropdown.addEventListener('change', function() {
    sortData();
    renderPage();
  });
  
}

// Use the decorate function
const blockElement = document.getElementById('block');
decorate(blockElement);
>>>>>>> origin/feature/srishti
