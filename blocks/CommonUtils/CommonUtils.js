// Function to get child names and set class
export default  function getChildNames(parentId) {
    var newParentId = "." + parentId;
    var parentElement = document.querySelector(newParentId);
    var childDivs = parentElement.querySelectorAll(`${newParentId} > div`);
    childDivs.forEach((div, index) => {
        div.className = `${parentId}-child`;
    });
}

// Function to get indexed child names and set class with numbering
// Helper function to get index with appropriate suffix
export function getIndex(n) {
    const s = ["th", "st", "nd", "rd"],
          v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

// Function to get indexed child names and set class with numbering
export function getIndexedChildNames(parentId) {
    var newParentId = "." + parentId;
    var parentElement = document.querySelector(newParentId);

    if (!parentElement) {
        console.error(`Parent element with ID '${parentId}' not found.`);
        return;
    }

    var childDivs = parentElement.querySelectorAll(`${newParentId} > div`);

    if (childDivs.length === 0) {
        console.warn(`No child divs found under parent element '${parentId}'.`);
    }

    childDivs.forEach((div, index) => {
        var lastIndexed = getIndex(index + 1);
        div.className = `${parentId}-child-${lastIndexed}`;
    });
}


