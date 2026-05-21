async function parseResponse(response) {
  let data = null;
  const text = await response.text();

  if (text) {
    try {
      data = JSON.parse(text);
    } catch (e) {
      console.error("Ошибка JSON:", e);
    }
  }

  return { data, status: response.status };
}

export async function get(url) {
  const response = await fetch(url);
  return parseResponse(response);
}

export async function post(url, body) {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });
  return parseResponse(response);
}

export async function patch(url, body) {
  const response = await fetch(url, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });
  return parseResponse(response);
}

export async function del(url) {
  const response = await fetch(url, {
    method: "DELETE"
  });
  return parseResponse(response);
}
