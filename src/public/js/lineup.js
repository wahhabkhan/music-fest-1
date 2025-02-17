  // Using AJAX to fetch lineup data from db
  fetch('/api/lineup')
    .then(response => response.json())
    .then(data => {
      const lineupContent = document.getElementById('lineupContent');
      lineupContent.innerHTML = '<ul style="list-style: none; display: flex; gap: 10px;">';
      data.forEach(artist => {
        lineupContent.innerHTML += `<li style="margin:100px; width: 400px; height: 400px; border-radius: 3px; "><img src="${artist.image_url}"  style="width: 100%; height: 100%;"></li>`;
      });
      lineupContent.innerHTML += '</ul>';
    })
    .catch(error => console.error('Error fetching lineup data:', error));