const gallery = document.getElementById('video-gallery');
const searchInput = document.getElementById('search');
const bgImage = document.getElementById('bg-image');
const menuBtn = document.getElementById('menu-btn');
const sidebar = document.getElementById('sidebar');

let historyData = [];

// Toggle Menu
menuBtn.addEventListener('click', () => {
  sidebar.classList.toggle('hidden');
});

// Get YouTube video ID
function getYouTubeID(url) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
}

// Display videos
function displayVideos(videos) {
  gallery.innerHTML = '';
  videos.forEach(video => {
    const id = getYouTubeID(video.url);
    if (!id) return;
    const a = document.createElement('a');
    a.href = video.url;
    a.target = "_blank";
    a.className = 'video-card';
    a.innerHTML = `
      <img src="https://img.youtube.com/vi/${id}/hqdefault.jpg" alt="${video.title}">
      <p>${video.title}</p>
    `;
    gallery.appendChild(a);

    // Save clicked videos to history
    a.addEventListener('click', () => {
      if (!historyData.includes(video)) historyData.push(video);
      zoomBackground();
    });
  });
}

// Initial display
displayVideos(videosData);

// Search filter
searchInput.addEventListener('input', () => {
  const filter = searchInput.value.toLowerCase();
  const filtered = videosData.filter(v => v.title.toLowerCase().includes(filter));
  displayVideos(filtered);
  zoomBackground();
});

// Sidebar buttons
document.getElementById('home-btn').addEventListener('click', () => {
  displayVideos(videosData);
  zoomBackground();
});

document.getElementById('history-btn').addEventListener('click', () => {
  if (historyData.length === 0) {
    gallery.innerHTML = "<p style='color:#ff00ff; font-weight:bold;'>No history yet!</p>";
  } else {
    displayVideos(historyData);
  }
  zoomBackground();
});

// Zoom background on action
function zoomBackground() {
  bgImage.style.transform = "scale(1.05)";
  setTimeout(() => {
    bgImage.style.transform = "scale(1)";
  }, 500);
}
