// api.js
async function fetchFromApi(endpoint, method = 'GET', body = null, headers = {}) {
  const response = await fetch(`https://job.inminternational.uz/${endpoint}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: body ? JSON.stringify(body) : null,
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data;
}

export default fetchFromApi;
