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
            content: "You are a helpful plant doctor. Based on symptoms provided by the user, give a possible diagnosis and care tips."
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

