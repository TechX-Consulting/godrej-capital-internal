//  document.addEventListener('DOMContentLoaded', function() {
//         // Get the anchor tag
//         const anchor = document.querySelector('.button.primary');
        
//         // Get the URL from the href attribute
//         const url = anchor.getAttribute('href');

//         // Fetch the HTML content from the URL
//         fetch(url)
//             .then(response => {
//                 if (!response.ok) {
//                     throw new Error('Network response was not ok ' + response.statusText);
//                 }
//                 return response.text();
//             })
//             .then(html => {
//                 // Create a temporary div to hold the fetched HTML
//                 const tempDiv = document.createElement('div');
//                 tempDiv.innerHTML = html;

//                 // Extract the body content from the fetched HTML
//                 const bodyContent = tempDiv.querySelector('body').innerHTML;

//                 // Find the fragment block
//                 const buttonContainer = anchor.parentElement;
//                 buttonContainer.innerHTML = bodyContent;
//             })
//             .catch(error => {
//                 console.error('Error fetching the HTML:', error);
//             });
//     });
    
    // export function loadBoardContentFromURL() {
    //     document.addEventListener('DOMContentLoaded', function() {
    //         const boardMembersElement = document.querySelector('.boardmembers');
    //         if (!boardMembersElement) {
    //             console.log('No element with class "boardmembers" found.');
    //             return;
    //         }

    //         const anchor = boardMembersElement.querySelector('.button.primary');
    //         if (!anchor) {
    //             console.log('No anchor with class "button primary" found.');
    //             return;
    //         }

    //         const url = anchor.getAttribute('href');
    //         if (!url) {
    //             console.log('No href found on the anchor element.');
    //             return;
    //         }

    //         fetch(url)
    //             .then(response => {
    //                 if (!response.ok) {
    //                     throw new Error('Network response was not ok ' + response.statusText);
    //                 }
    //                 return response.text();
    //             })
    //             .then(html => {
    //                 const tempDiv = document.createElement('div');
    //                 tempDiv.innerHTML = html;

    //                 let contentToInsert = '';
    //                 const bodyTag = tempDiv.querySelector('body');
    //                 if (bodyTag) {
    //                     contentToInsert = bodyTag.innerHTML;
    //                 } else {
    //                     const mainTag = tempDiv.querySelector('main');
    //                     if (mainTag) {
    //                         const firstChildDiv = mainTag.querySelector('div');
    //                         if (firstChildDiv) {
    //                             contentToInsert = firstChildDiv.innerHTML;
    //                         } else {
    //                             console.error('No suitable content found to insert.');
    //                             return;
    //                         }
    //                     } else {
    //                         console.error('No body or main tag found.');
    //                         return;
    //                     }
    //                 }

    //                 // Locate and hide the description div in the extracted content
    //                 const tempContentDiv = document.createElement('div');
    //                 tempContentDiv.innerHTML = contentToInsert;
    //                 const descriptionDiv = tempContentDiv.querySelector('.profile1 div div');
    //                 if (descriptionDiv) {
    //                     descriptionDiv.style.display = 'none';
    //                 }

    //                 // Update contentToInsert with the modified content
    //                 contentToInsert = tempContentDiv.innerHTML;

    //                 // Insert the modified content into the button container
    //                 const buttonContainer = anchor.parentElement;
    //                 buttonContainer.innerHTML = contentToInsert;

    //                 // Now work with the newly inserted content
    //                 const profilePicture = buttonContainer.querySelector('.profiles picture img');
    //                 if (!profilePicture) {
    //                     console.log('No profile picture found in the fetched HTML.');
    //                     return;
    //                 }

    //                 const profileBlock = profilePicture.closest('.profiles');
    //                 const descriptionDivNew = profileBlock.querySelectorAll('div')[2];
    //                 if (!descriptionDivNew) {
    //                     console.log('No description div found.');
    //                     return;
    //                 }

    //                 descriptionDivNew.style.display = 'none';

    //                 const overlay = document.createElement('div');
    //                 overlay.id = 'overlay';
    //                 overlay.style.display = 'none';
    //                 overlay.style.position = 'fixed';
    //                 overlay.style.top = 0;
    //                 overlay.style.left = 0;
    //                 overlay.style.width = '100%';
    //                 overlay.style.height = '100%';
    //                 overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    //                 overlay.style.zIndex = 999;
    //                 document.body.appendChild(overlay);

    //                 const popup = document.createElement('div');
    //                 popup.id = 'popup';
    //                 popup.style.display = 'none';
    //                 popup.style.position = 'fixed';
    //                 popup.style.top = '50%';
    //                 popup.style.left = '50%';
    //                 popup.style.transform = 'translate(-50%, -50%)';    
    //                 popup.style.border = '1px solid #ccc';
    //                 popup.style.padding = '20px';
    //                 popup.style.backgroundColor = 'white';
    //                 popup.style.zIndex = 1000;
    //                 popup.style.maxWidth = '80%';
    //                 popup.style.maxHeight = '80%';
    //                 popup.style.overflow = 'auto';
    //                 document.body.appendChild(popup);

    //                 const popupContent = document.createElement('div');
    //                 popupContent.id = 'popup-content';
    //                 popupContent.innerHTML = tempContentDiv.innerHTML;
    //                 popup.appendChild(popupContent);

    //                 function showPopup() {
    //                     overlay.style.display = 'block';
    //                     popup.style.display = 'block';
    //                 }

    //                 function hidePopup() {
    //                     overlay.style.display = 'none';
    //                     popup.style.display = 'none';
    //                 }

    //                 profilePicture.addEventListener('click', showPopup);
    //                 overlay.addEventListener('click', hidePopup);
    //             })
    //             .catch(error => {
    //                 console.error('Error fetching the HTML:', error);
    //             });
    //     });
    // }


    export function loadBoardContentFromURL() {
        document.addEventListener('DOMContentLoaded', function() {
            const boardMembersElements = document.querySelectorAll('.boardmembers');
    
            if (boardMembersElements.length === 0) {
                console.log('No elements with class "boardmembers" found.');
                return;
            }
    
            boardMembersElements.forEach(boardMembersElement => {
                const anchors = boardMembersElement.querySelectorAll('.button.primary');
                if (anchors.length === 0) {
                    console.log('No anchor with class "button primary" found in the boardmembers element.');
                    return;
                }
    
                anchors.forEach(anchor => {
                    const url = anchor.getAttribute('href');
                    if (!url) {
                        console.log('No href found on the anchor element.');
                        return;
                    }
    
                    fetch(url)
                        .then(response => {
                            if (!response.ok) {
                                throw new Error('Network response was not ok ' + response.statusText);
                            }
                            return response.text();
                        })
                        .then(html => {
                            // Create a temporary container to parse the fetched HTML
                            const tempContainer = document.createElement('div');
                            tempContainer.innerHTML = html;
    
                            // Extract content from the fetched HTML
                            let contentToInsert = tempContainer.innerHTML;
    
                            // Insert the content into the button container
                            const buttonContainer = anchor.parentElement;
                            buttonContainer.innerHTML = contentToInsert;
    
                            // Find the profile picture and associated description div
                            const profilePicture = buttonContainer.querySelector('.profiles picture img');
                            if (!profilePicture) {
                                console.log('No profile picture found in the fetched HTML.');
                                return;
                            }
    
                            const profileBlock = profilePicture.closest('.profiles');
                            const descriptionDiv = profileBlock.querySelector('div:nth-child(2)');
                            if (!descriptionDiv) {
                                console.log('No description div found.');
                                return;
                            }
    
                            // Hide the description div initially
                            descriptionDiv.style.display = 'none';
    
                            // Create overlay and popup elements for each anchor
                            const overlay = document.createElement('div');
                            overlay.style.display = 'none';
                            overlay.style.position = 'fixed';
                            overlay.style.top = 0;
                            overlay.style.left = 0;
                            overlay.style.width = '100%';
                            overlay.style.height = '100%';
                            overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
                            overlay.style.zIndex = 999;
                            document.body.appendChild(overlay);
    
                            const popup = document.createElement('div');
                            popup.style.display = 'none';
                            popup.style.position = 'fixed';
                            popup.style.top = '50%';
                            popup.style.left = '50%';
                            popup.style.transform = 'translate(-50%, -50%)';    
                            popup.style.border = '1px solid #ccc';
                            popup.style.padding = '20px';
                            popup.style.backgroundColor = 'white';
                            popup.style.zIndex = 1000;
                            popup.style.maxWidth = '80%';
                            popup.style.maxHeight = '80%';
                            popup.style.overflow = 'auto';
                            document.body.appendChild(popup);
    
                            const popupContent = document.createElement('div');
                            popupContent.innerHTML = contentToInsert;
                            popup.appendChild(popupContent);
    
                            // Function to show the popup
                            function showPopup() {
                                overlay.style.display = 'block';
                                popup.style.display = 'block';
                            }
    
                            // Function to hide the popup
                            function hidePopup() {
                                overlay.style.display = 'none';
                                popup.style.display = 'none';
                            }
    
                            // Add click event listener to the profile picture
                            profilePicture.addEventListener('click', showPopup);
    
                            // Add click event listener to the overlay to close the popup
                            overlay.addEventListener('click', hidePopup);
                        })
                        .catch(error => {
                            console.error('Error fetching the HTML:', error);
                        });
                });
            });
        });
    }

    
    
    
    
    
    



