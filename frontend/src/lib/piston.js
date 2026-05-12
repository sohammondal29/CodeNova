const API_URL = "http://localhost:3000/api/code";

export async function executeCode(language, code) {
  try {
    const response = await fetch(`${API_URL}/execute`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        language,
        code,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.message || "Execution failed",
      };
    }

    return {
      success: true,
      output:
        data.stdout ||
        data.output ||
        data.stderr ||
        "No output",
    };
  } catch (error) {
    console.log(error);

    return {
      success: false,
      error: error.message,
    };
  }
}