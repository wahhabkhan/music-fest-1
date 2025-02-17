  // Function to handle Sum Activity
  function handleSumActivity() {
    fetch('/api/sumActivity')
      .then(response => response.json())
      .then(data => {
        const userAnswer = prompt(data.message);
        fetch('/api/checkSum', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: `answer=${userAnswer}&correctSum=${data.correctSum}`,
        })
          .then(response => response.json())
          .then(data => {
            document.getElementById('interactiveResult').innerHTML = data.message;
          })
          .catch(error => console.error('Error fetching data:', error));
      })
      .catch(error => console.error('Error fetching data:', error));
  }

  // Event listener for Sum Button
  document.getElementById('sumBtn').addEventListener('click', handleSumActivity);