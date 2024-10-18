export async function httpRequest(request) {
  const options = {
    method: request.method,
    body: JSON.stringify(request.body),
  };
  if (request.body) {
    options.body = JSON.stringify(request.body);
  }
  return await fetch(`https://biohofapp.de/api/${request.url}`, options);
}

export function getJson(response) {
  return response.json();
}
