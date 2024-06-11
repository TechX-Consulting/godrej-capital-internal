// export function initializeProfilePopup() {
//     document.addEventListener('DOMContentLoaded', function() {
//         // Get the profile picture element
//         const profilePicture = document.querySelector('.profiles picture img');

//         if (!profilePicture) return;

//         // Get the second inner div within the profile1 block which contains the description
//         const profileBlock = profilePicture.closest('.profiles');
//         const descriptionDiv = profileBlock.querySelectorAll('div > div')[1];

//         if (!descriptionDiv) return;

//         // Hide the description div initially
//         descriptionDiv.style.display = 'none';

//         // Create the popup and overlay elements
//         const overlay = document.createElement('div');
//         overlay.id = 'overlay';
//         overlay.style.display = 'none';
//         overlay.style.position = 'fixed';
//         overlay.style.top = 0;
//         overlay.style.left = 0;
//         overlay.style.width = '100%';
//         overlay.style.height = '100%';
//         overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
//         overlay.style.zIndex = 999;
//         document.body.appendChild(overlay);

//         const popup = document.createElement('div');
//         popup.id = 'popup';
//         popup.style.display = 'none';
//         popup.style.position = 'fixed';
//         popup.style.top = '50%';
//         popup.style.left = '50%';
//         popup.style.transform = 'translate(-50%, -50%)';
//         popup.style.border = '1px solid #ccc';
//         popup.style.padding = '20px';
//         popup.style.backgroundColor = 'white';
//         popup.style.zIndex = 1000;
//         popup.style.maxWidth = '80%';
//         popup.style.maxHeight = '80%';
//         popup.style.overflow = 'auto';
//         document.body.appendChild(popup);

//         const popupContent = document.createElement('div');
//         popupContent.id = 'popup-content';
//         popupContent.innerHTML = descriptionDiv.innerHTML;
//         popup.appendChild(popupContent);

//         // Function to show the popup
//         function showPopup() {
//             overlay.style.display = 'block';
//             popup.style.display = 'block';
//         }

//         // Function to hide the popup
//         function hidePopup() {
//             overlay.style.display = 'none';
//             popup.style.display = 'none';
//         }

//         // Add click event listener to the profile picture
//         profilePicture.addEventListener('click', showPopup);

//         // Add click event listener to the overlay to close the popup
//         overlay.addEventListener('click', hidePopup);
//     });
// }
