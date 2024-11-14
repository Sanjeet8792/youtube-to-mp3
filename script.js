addEventListener('load', checkJSLoaded)

function checkJSLoaded() { 
// script.js
document.getElementById('download-btn').addEventListener('click', function() {
    const videoId = document.getElementById('youtube-url').value;
    const resultDiv = document.getElementById('result');
    const downloadBtn = document.getElementById('download-btn');

    if (!videoId) {
        resultDiv.innerText = 'Please enter a valid YouTube Video ID.';
        resultDiv.classList.add('error');
        return;
    }

    // Disable button and change text to "Processing..."
    downloadBtn.innerText = 'Processing...';
    downloadBtn.classList.add('loading');
    resultDiv.innerText = ''; // Clear previous messages

    fetch(`https://youtube-mp36.p.rapidapi.com/dl?id=${videoId}`, {
        method: 'GET',
        headers: {
            'x-rapidapi-host': 'youtube-mp36.p.rapidapi.com',
            'x-rapidapi-key': 'e5e480105emshb57582407f6ea11p1b0325jsn5beae9f92359'
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'ok') {
            resultDiv.innerHTML = `<a href="${data.link}" class="download-link" target="_blank">Download MP3</a>`;
            resultDiv.classList.remove('error');
        } else {
            resultDiv.innerText = 'An error occurred. Please try again.';
            resultDiv.classList.add('error');
        }
    })
    .catch(error => {
        resultDiv.innerText = 'Failed to fetch the download link. Please check the video ID or try again later.';
        resultDiv.classList.add('error');
        console.error(error);
    })
    .finally(() => {
        // Re-enable button after processing
        downloadBtn.innerText = 'Download MP3';
        downloadBtn.classList.remove('loading');
    });
});

 };