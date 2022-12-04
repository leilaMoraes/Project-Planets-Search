const fetchApi = async () => {
  try {
    const url = 'https://swapi.py4e.com/api/planets';
    const response = await fetch(url);
    const data = await response.json();
    data.results.map((planets) => delete planets.residents);
    data.results.sort((x, y) => {
      if (x.name === y.name) {
        return 0;
      } if (x.name > y.name) {
        return 1;
      }
      const magicNumber = -1;
      return magicNumber;
    }); // https://ricardo-reis.medium.com/o-m%C3%A9todo-sort-do-array-javascript-482576734e0a#:~:text=Para%20ordenar%20esse%20array%20em,para%20o%20m%C3%A9todo%20sort()%20.
    return data.results;
  } catch (error) {
    return error;
  }
};

export default fetchApi;
