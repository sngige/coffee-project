document.addEventListener('DOMContentLoaded', function() {
  // Get all the elements we need from the page
  const searchButton = document.querySelector('.search-btn');
  const resultsDiv = document.getElementById('coffee');
  
  // When search button is clicked
  searchButton.addEventListener('click', function() {
    // Get the search values
    const restaurantName = document.getElementById('menu').value.toLowerCase();
    const coffeeType = document.getElementById('coffee-type').value.toLowerCase();
    const country = document.getElementById('country').value.toLowerCase();
    
    // Show loading message
    resultsDiv.innerHTML = "<p>Searching for coffee... <i class='fas fa-spinner fa-spin'></i></p>";
    
    // Simulate searching (in a real app, this would fetch from an API)
    setTimeout(function() {
      // Simple example results
      const exampleResults = [
        {
          name: "Java Cafe",
          country: "USA",
          menu: [
            {
              name: "Espresso",
              description: "Strong black coffee",
              price: 3.50,
              is_available: true
            },
            {
              name: "Latte",
              description: "Espresso with steamed milk",
              price: 4.00,
              is_available: true
            }
          ]
        }
      ];
      
      // Filter results based on search
      const filtered = exampleResults.filter(cafe => {
        const nameMatch = cafe.name.toLowerCase().includes(restaurantName);
        const countryMatch = cafe.country.toLowerCase().includes(country);
        return nameMatch && countryMatch;
      });
      
      // Display results
      showResults(filtered, coffeeType);
    }, 1000); // Simulate 1 second delay
  });
  
  // Function to display results
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