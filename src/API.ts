
export async function fetchRandomNames() {
  const endpoint = `https://randomuser.me/api/?nat=es`;
  const data = await (await fetch(endpoint)).json();
  //console.log(data.results)
  return data.results[0].name.first
}
