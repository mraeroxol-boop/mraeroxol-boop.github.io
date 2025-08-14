const gallery = document.getElementById('video-gallery');
const searchInput = document.getElementById('search');

// Function to display videos
function displayVideos(videos) {
  gallery.innerHTML = '';
  videos.forEach(video => {
    const a = document.createElement('a');
    a.href = video.url;
    a.target = "_blank";
    a.className = 'video-card';
    a.innerHTML = `
      <img src="https://img.youtube.com/vi/${video.url.split('v=')[1]}/hqdefault.jpg" alt="${video.title}">
      <p>${video.title}</p>
    `;
    gallery.appendChild(a);
  });
}

// Initial load
displayVideos(videosData);

// Search filter
searchInput.addEventListener('input', () => {
  const filter = searchInput.value.toLowerCase();
  const filtered = videosData.filter(v => v.title.toLowerCase().includes(filter));
  displayVideos(filtered);
});
