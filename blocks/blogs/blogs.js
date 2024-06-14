import ffetch from '../../scripts/ffetch.js';

let displayData; let updatePagination; let displayPagination;
let createCards; let filterAndSortCards;

export default async function decorate(block) {
  const mainContainer = document.createElement('div');
  mainContainer.className = 'container';
  block.appendChild(mainContainer);

  // Create input field
  const inputField = document.createElement('input');
  inputField.type = 'text';
  inputField.className = 'input-field';
  inputField.placeholder = 'Enter text';
  mainContainer.appendChild(inputField);

  // Function to create dropdowns
  function createDropdown(parent, className, placeholderText, optionsArray) {
    const dropdown = document.createElement('select');
    dropdown.className = className;

    const placeholderOption = document.createElement('option');
    placeholderOption.textContent = placeholderText;
    placeholderOption.disabled = true;
    placeholderOption.selected = true;
    dropdown.appendChild(placeholderOption);

    optionsArray.forEach((optionText) => {
      const option = document.createElement('option');
      option.value = optionText.toLowerCase().replace(/ /g, '');
      option.textContent = optionText;
      dropdown.appendChild(option);
    });

    parent.appendChild(dropdown);
    return dropdown;
  }

  try {
    const responseData = await ffetch('https://main--eds--aryanjha12.hlx.page/blogs/query-index.json').all();
    console.log('new object is', responseData);

    // Store the original data
    const originalData = responseData;
    console.log(originalData);
    const dateDropdown = ['latest to oldest', 'oldest to latest'];
    const categoryVal = originalData.map((item) => item.category);
    // Create and populate dropdowns
    const dropdown1 = createDropdown(
      mainContainer,
      'date-dropdown',
      'Select filters',
      dateDropdown,
    );
    const dropdown2 = createDropdown(
      mainContainer,
      'product_dropdown',
      'Select category',
      categoryVal,
    );

    const cardContainer = document.createElement('div');
    cardContainer.className = 'card-container';
    mainContainer.appendChild(cardContainer);

    const noResultsContainer = document.createElement('div');
    noResultsContainer.className = 'no-results';
    noResultsContainer.textContent = 'No results found';
    noResultsContainer.style.display = 'none'; // Initially hidden
    mainContainer.appendChild(noResultsContainer);

    const paginationContainer = document.createElement('div');
    paginationContainer.className = 'pagination';
    mainContainer.appendChild(paginationContainer);

    const itemsPerPage = 2;
    let currentPage = 1;
    window.currentBtn = 1;

    createCards = (data) => {
      cardContainer.innerHTML = '';
      data.forEach((entry) => {
        const cardLink = document.createElement('a');
        cardLink.href = entry.path;
        cardLink.className = 'card-link';

        const card = document.createElement('div');
        card.className = 'card';

        const image = document.createElement('img');
        image.src = entry.image;
        card.appendChild(image);

        const description = document.createElement('p');
        description.textContent = entry.description;
        card.appendChild(description);

        const readTime = document.createElement('p');
        readTime.textContent = entry.readtime;
        card.appendChild(readTime);

        const date = document.createElement('p');
        date.textContent = entry.publishdate;
        card.appendChild(date);

        cardLink.appendChild(card);
        cardContainer.appendChild(cardLink);
      });
    };

    displayData = (page, data) => {
      const start = (page - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      const pageData = data.slice(start, end);
      createCards(pageData);
    };

    // Function to create cards

    displayPagination = (data) => {
      paginationContainer.innerHTML = '';
      const totalPages = Math.ceil(data.length / itemsPerPage);

      const prevButton = document.createElement('button');
      prevButton.textContent = 'Previous';
      prevButton.className = 'page-page-button';
      prevButton.disabled = Number(window.currentBtn) === 1;

      paginationContainer.appendChild(prevButton);

      for (let i = 1; i <= totalPages; i += 1) {
        const button = document.createElement('button');
        button.textContent = i;
        button.className = 'current-page-button';
        button.setAttribute('data-index', i);
        if (i === currentPage) {
          button.classList.add('active');
        }
        paginationContainer.appendChild(button);
      }
      const nextButton = document.createElement('button');
      nextButton.textContent = 'Next';
      nextButton.className = 'next-page-button';
      nextButton.disabled = Number(window.currentBtn) === totalPages;
      // if(window.currentBtn > 1){

      // }
      paginationContainer.appendChild(nextButton);

      const currentBtn = document.querySelectorAll('.current-page-button');
      currentBtn.forEach((btn) => {
        btn.addEventListener('click', function () {
          currentPage = this.getAttribute('data-index');
          window.currentBtn = currentPage;
          updatePagination(data);
        });
      });

      prevButton.addEventListener('click', () => {
        if (window.currentBtn > 1) {
          currentPage -= 1;
          window.currentBtn = currentPage;
          updatePagination(data);
        }
      });

      nextButton.addEventListener('click', () => {
        if (window.currentBtn < totalPages) {
          window.currentBtn = currentPage;
          currentPage += 1;
          window.currentBtn = currentPage;
          updatePagination(data);
        }
      });
    };
    updatePagination = (data) => {
      displayData(currentPage, data);
      displayPagination(data);
    };

    filterAndSortCards = () => {
      const selectedCategory = dropdown2.value.toLowerCase().replace(/ /g, '');
      const selectedFilter = dropdown1.value;
      const searchText = inputField.value.toLowerCase();

      // Filter the original data based on the selected category
      let filteredData = originalData.filter((entry) => {
        const matchesCategory = entry.category.toLowerCase().replace(/ /g, '') === selectedCategory || selectedCategory === 'selectcategory';
        return matchesCategory;
      });

      // Sort the filtered data by date
      if (selectedFilter === 'oldesttolatest') {
        filteredData.sort((a, b) => new Date(a.publishdate) - new Date(b.publishdate));
      } else if (selectedFilter === 'latesttooldest') {
        filteredData.sort((a, b) => new Date(b.publishdate) - new Date(a.publishdate));
      }

      // Further filter the sorted data by search text
      filteredData = filteredData.filter(
        (entry) => entry.description.toLowerCase().includes(searchText),
      );

      // Show or hide "No results found" message
      if (filteredData.length === 0) {
        noResultsContainer.style.display = 'block';
        paginationContainer.style.display = 'none';
      } else {
        noResultsContainer.style.display = 'none';
        paginationContainer.style.display = 'block';
      }
      // Create the cards with the filtered and sorted data
      currentPage = 1; // Reset to first page on new filter/sort
      updatePagination(filteredData);
    };

    // Initial cards creation and pagination display
    updatePagination(originalData);

    // Filter and sort cards based on dropdown selections and input field
    dropdown2.addEventListener('change', () => {
      filterAndSortCards();
    });

    dropdown1.addEventListener('change', () => {
      filterAndSortCards();
    });

    inputField.addEventListener('input', () => {
      const searchText = inputField.value.trim().toLowerCase();
      // Trigger search only if the length of the search text is at least three characters
      if (searchText.length >= 3) {
        filterAndSortCards(searchText);
      } else if (searchText.length === 0) {
        // Reset search and show all results if search text is empty
        filterAndSortCards('');
      }
    });
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}
