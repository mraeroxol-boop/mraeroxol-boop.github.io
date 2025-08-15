const gallery = document.getElementById('gallery');
const searchInput = document.getElementById('searchInput');
let historyData = [];

function getYouTubeID(url) {
  try {
    if (url.includes('youtu.be/')) {
      return url.split('youtu.be/')[1].split('?')[0];
    } else {
      return new URL(url).searchParams.get('v');
    }
  } catch {
    return null;
  }
}

function displayVideos(videos) {
  gallery.innerHTML = '';
  videos.forEach(video => {
    const videoId = getYouTubeID(video.url);
    if (!videoId) return;

    const thumbnail = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

    const card = document.createElement('div');
    card.className = 'video-card';

    const link = document.createElement('a');
    link.href = video.url;
    link.target = "_blank";

    const img = document.createElement('img');
    img.src = thumbnail;
    img.alt = video.title;

    link.appendChild(img);
    card.appendChild(link);

    // Video title below thumbnail
    const titleDiv = document.createElement('div');
    titleDiv.className = 'video-title';
    titleDiv.textContent = video.title;

    card.appendChild(titleDiv);

    link.addEventListener('click', () => {
      if (!historyData.includes(video)) historyData.push(video);
    });

    gallery.appendChild(card);
  });
}

function showHome() {
  displayVideos(videosData);
}

function showHistory() {
  displayVideos(historyData);
}

searchInput.addEventListener('input', () => {
  const term = searchInput.value.toLowerCase();
  const filtered = videosData.filter(v => v.title.toLowerCase().includes(term));
  displayVideos(filtered);
});

function toggleMenu() {
  const menu = document.querySelector('.menu-items');
  menu.style.display = menu.style.display === 'flex' ? 'none' : 'flex';
}

// Load home by default
displayVideos(videosData);
