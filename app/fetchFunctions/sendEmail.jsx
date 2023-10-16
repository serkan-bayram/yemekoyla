export async function sendEmail(data) {
  const response = await fetch(`http://localhost:3000/api/send-email`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // Specify the content type as JSON
    },
    body: JSON.stringify(data), // Convert the data to JSON format,
    cache: "no-store",
  });

  return response;
}
