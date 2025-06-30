document.addEventListener('DOMContentLoaded', function () {
  const searchButton = document.querySelector('.search-btn');
  const resultsDiv = document.getElementById('coffee');

  searchButton.addEventListener('click', function () {
    const restaurantName = document.getElementById('menu').value.toLowerCase();
    const coffeeType = document.getElementById('coffee-type').value.toLowerCase();

    resultsDiv.innerHTML = "<p>Searching for coffee... <i class='fas fa-spinner fa-spin'></i></p>";

    fetch('/cafes')
      .then(response => response.json())
      .then(data => {
        const filtered = data.filter(cafe => {
          const nameMatch = cafe.name.toLowerCase().includes(restaurantName);
          return nameMatch;
        });

        showResults(filtered, coffeeType);
      })
      .catch(() => {
        resultsDiv.innerHTML = "<p>Failed to fetch coffee data.</p>";
      });
  });

  function showResults(cafes, coffeeType) {
    resultsDiv.innerHTML = '';

    if (cafes.length === 0) {
      resultsDiv.innerHTML = "<p>No coffee shops found. Try different search terms.</p>";
      return;
    }

    cafes.forEach(cafe => {
      const cafeDiv = document.createElement('div');
      cafeDiv.className = 'cafe-result';

      let menuHTML = '<h3>Menu:</h3>';
      let foundCoffee = false;

      cafe.menu.forEach(item => {
        if (item.name.toLowerCase().includes(coffeeType) || coffeeType === '') {
          foundCoffee = true;
          menuHTML += `
            <div class="coffee-item">
              <h4>${item.name}</h4>
              <p>${item.description}</p>
              <p>Price: $${item.price.toFixed(2)}</p>
              <p>${item.is_available ? 'Available' : 'Sold out'}</p>
            </div>
          `;
        }
      });

      if (!foundCoffee) {
        menuHTML = "<p>No matching coffee types found.</p>";
      }

      cafeDiv.innerHTML = `
        <h2>${cafe.name}</h2>
        <p>Location: ${cafe.country}</p>
        ${menuHTML}
      `;

      resultsDiv.appendChild(cafeDiv);
    });
  }
});
