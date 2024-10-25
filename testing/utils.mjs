export async function httpRequest(request) {
  const headers = new Headers();
  request.headers?.forEach(header => headers.append(header[0], header[1]));
  const options = {
    method: request.method,
    body: JSON.stringify(request.body),
    headers: headers,
  };
  if (request.body) {
    options.body = JSON.stringify(request.body);
  }
  return await fetch(`https://biohofapp.de/api/${request.url}`, options);
}

export function getJson(response) {
  return response.json();
}
