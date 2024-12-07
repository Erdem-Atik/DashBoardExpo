// /api/auth.js

export async function login(username, password) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    username,
    password,
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  try {
    const response = await fetch(
      "https://eliyte-backend.abut.workers.dev/auth/login",
      requestOptions
    );

    if (!response.ok) {
      throw new Error("Failed to log in: " + response.statusText);
    }

    const result = await response.json(); // Assuming API returns JSON
    return result; // Return the API response for consumption
  } catch (error) {
    console.error("Error during login:", error.message);
    throw error;
  }
}
