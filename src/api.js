const baseUrl = 'https://em00z.sse.codesandbox.io';

async function feedbackQuery(data) {
  const response = await fetch(`${baseUrl}/feedback`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'Sec-Fetch-Mode': 'no-cors',
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();
  return result;
}

export { feedbackQuery };
