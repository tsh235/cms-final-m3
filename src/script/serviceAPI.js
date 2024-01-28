export const getData = (url, error) => fetch(url)
    .then(response => {
      if (!response.ok) {
        throw error(new Error(response.status));
      }

      return response.json();
    }).catch(error);

