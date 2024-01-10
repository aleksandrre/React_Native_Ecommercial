const refreshAccessToken = async () => {
  try {
    const refreshToken = localStorage.getItem("refreshToken");

    const response = await fetch("http://192.168.0.105:3001/auth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: refreshToken }),
    });

    const data = await response.json();

    if (response.ok) {
      // Update the stored access token with the new one
      localStorage.setItem("accessToken", data.accessToken);
      // You can also use the new access token for any ongoing requests
      return data.accessToken;
    } else {
      // Handle token refresh failure
      console.error("Token refresh failed:", data.message);
      return null;
    }
  } catch (error) {
    console.error("Error during token refresh:", error);
    return null;
  }
};
