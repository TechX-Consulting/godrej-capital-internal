export default async function decorate(block) {
    console.log(block);

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
    newsTab.textContent = 'News';

    pressReleaseTab.id = 'pressReleaseTab';
    pressReleaseTab.className = 'tab';
    pressReleaseTab.textContent = 'Press Release';

    tabsContainer.appendChild(newsTab);
    tabsContainer.appendChild(pressReleaseTab);
    container.appendChild(tabsContainer);

    // Create controls container
    const controlsContainer = document.createElement('div');
    controlsContainer.className = 'controls';

    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.id = 'searchInput';
    searchInput.placeholder = 'Search...';

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

    // Add event listeners
    newsTab.addEventListener('click', function() {
        setActiveTab('news');
    });

    pressReleaseTab.addEventListener('click', function() {
        setActiveTab('pressRelease');
    });

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
}

// Use the decorate function
const blockElement = document.getElementById('block');
decorate(blockElement);