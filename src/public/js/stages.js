// Using AJAX to fetch stages data from db
  fetch('/api/stages')
    .then(response => response.json())
    .then(data => {
      const stagesContent = document.getElementById('stageupContent');
      stagesContent.innerHTML = '<ul style="list-style: none; display: flex; gap: 10px;">';
      data.forEach(stage => {
        stagesContent.innerHTML += `<li style="margin:50px; width: 500px; height: 300px; border-radius: 0px; ">
          <img src="${stage.image_url}" alt="${stage.name}" style="width: 100%; height: 100%;">
        </li>`;
      });
      stagesContent.innerHTML += '</ul>';
    })
    .catch(error => console.error('Error fetching stages data:', error));
