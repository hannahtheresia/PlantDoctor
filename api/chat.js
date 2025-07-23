export default async function handler(req, res) {
  const apiKey = process.env.OPENAI_API_KEY;

  const body = await req.json();

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: body.messages,
      max_tokens: 300,
      temperature: 0.7,
    }),
  });

  const data = await response.json();
  res.status(200).json(data);
}
