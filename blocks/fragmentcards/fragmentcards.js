export function loadContentFromURL() {
    document.addEventListener('DOMContentLoaded', function() {

        if (!document.querySelector('.fragmentcards')) {
            console.log('No element with class "fragmentcards" found.');
            return;
        }
        // Get the anchor tag
        const anchor = document.querySelector('.fragmentcards .button.primary');
        
        // Get the URL from the href attribute
        const url = anchor.getAttribute('href');

        // Fetch the HTML content from the URL
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.text();
            })
            .then(html => {
                // Create a temporary div to hold the fetched HTML
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = html;

                // Extract the content you need
                let contentToInsert = '';
                const bodyTag = tempDiv.querySelector('body');
                if (bodyTag) {
                    contentToInsert = bodyTag.innerHTML;
                } else {
                    const mainTag = tempDiv.querySelector('main');
                    if (mainTag) {
                        const firstChildDiv = mainTag.querySelector('div');
                        if (firstChildDiv) {
                            contentToInsert = firstChildDiv.innerHTML;
                        } else {
                            console.error('No suitable content found to insert.');
                            return;
                        }
                    } else {
                        console.error('No body or main tag found.');
                        return;
                    }
                }

                // Replace the link with the fetched body content
                const buttonContainer = anchor.parentElement;
                buttonContainer.innerHTML = contentToInsert;
            })
            .catch(error => {
                console.error('Error fetching the HTML:', error);
            });
    });
}
