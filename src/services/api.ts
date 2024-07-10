export const fetchdata = async (route: string): Promise<any> => {
  const response = await fetch(`http://localhost:3001/${route}`);

  if (!response.ok) {
    throw new Error(`Erro ao buscar dados: ${response.statusText}`);
  }

  return response.json();
};
