let pokemons = {};

fetch("https://pokeapi.co/api/v2/pokemon/")
  .then(response => {
    if (response.ok) return response.json();
  })
  .then(data => {
    pokemons = data['results'];
    pokemons.forEach(item => {
      Add2List(item['name'], item['url']);
    });
  })
  .catch(error => {
    console.log("Can't fetch data from API.");
  });

var Add2List = (name, url) => {
  var urlsplited = url.split("/");
  var imageUrl =
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/" +
    urlsplited[6] +
    ".png";

  var pokemonDiv = document.getElementById("pokemonlist");
  var card = document.createElement("div");
  card.setAttribute("class", "card col-4");

  var imag = document.createElement("img");
  imag.setAttribute("class", "card-img-top");
  imag.setAttribute("src", imageUrl);

  var nameDiv = document.createElement("div");
  nameDiv.setAttribute("class", "card-body");

  var title = document.createElement("h5");
  title.setAttribute("class", "card-title");
  title.innerText = name;

  var button = document.createElement("button"); // Changed from <a> to <button>
  button.setAttribute("class", "btn btn-primary");
  button.innerText = "more...";
  button.addEventListener("click", () => {
    displayPokemonDetails(name);
  });

  nameDiv.appendChild(title);
  nameDiv.appendChild(button);

  card.appendChild(imag);
  card.appendChild(nameDiv);

  pokemonDiv.appendChild(card);
};

function displayPokemonDetails(name) {
  fetch(`https://pokeapi.co/api/v2/pokemon/${name}/`)
    .then(response => {
      if (response.ok) return response.json();
    })
    .then(data => {
      // Display the details in a new window or modal (customize as needed)
      alert(`
        Name: ${data.name}
        Height: ${data.height}
        Weight: ${data.weight}
        Abilities: ${data.abilities.map(ability => ability.ability.name).join(', ')}
        // Add more details as needed
      `);
    })
    .catch(error => {
      console.log("Error fetching Pokemon details.");
    });
}
