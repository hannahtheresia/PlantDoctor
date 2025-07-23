checkBtn.addEventListener("click", async () => {
  const symptoms = symptomInput.value.trim();
  if (!symptoms) {
    alert("Please describe your plant's symptoms.");
    return;
  }

  responseArea.textContent = "Checking symptoms...";

  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: [
          {
            role: "system",
            content: "You are a professional botanist and plant expert.A person is describing a problem with their plant. Based on that, give:1. A short, clear diagnosis 2. A simple solution anyone can try. Be kind, clear, and avoid technical jargon. Your response should be well formatted making it look aesthetic. You can use emojis."
          },
          {
            role: "user",
            content: symptoms
          }
        ]
      }),
    });

    const data = await response.json();

    if (data.error) {
      responseArea.textContent = "Error: " + data.error.message;
      return;
    }

    const answer = data.choices[0].message.content;
    responseArea.textContent = answer;

  } catch (error) {
    responseArea.textContent = "Request error: " + error.message;
  }
});

