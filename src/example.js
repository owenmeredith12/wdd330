const url = 'https://pokeapi.co/api/v2/pokemon/ditto';
let results;

async function getPokemon(url) {
  const response = await fetch(url);
  if (response.ok) {
    const data = await response.json();
    doStuff(data);
  }
}

function doStuff(data) {
  results = data;
  console.log('first: ', results);
}

getPokemon(url);
console.log('second: ', results);
