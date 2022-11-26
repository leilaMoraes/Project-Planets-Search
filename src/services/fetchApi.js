const fetchApi = async () => {
  try {
    const url = 'https://swapi.dev/api/planets';
    const response = await fetch(url);
    const data = await response.json();
    data.results.map((planets) => delete planets.residents);
    return data.results;
  } catch (error) {
    return error;
  }
};

export default fetchApi;
