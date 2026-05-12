import express from "express";
import axios from "axios";

const router = express.Router();

const LANGUAGE_MAP = {
  javascript: "javascript",
  python: "python",
  java: "java",
  cpp : "cpp",
};

router.post("/execute", async (req, res) => {
  try {
    const { language, code } = req.body;

    const lang = LANGUAGE_MAP[language];

    if (!lang) {
      return res.status(400).json({
        message: "Unsupported language",
      });
    }

    const response = await axios.post(
      "https://onecompiler-apis.p.rapidapi.com/api/v1/run",

      {
        language: lang,

        stdin: "",

        files: [
          {
            name:
              language === "java"
                ? "Main.java"
                : `main.${getExtension(lang)}`,

            content: code,
          },
        ],
      },

      {
        headers: {
          "Content-Type": "application/json",

          "X-RapidAPI-Key":
            process.env.ONECOMPILER_API_KEY,

          "X-RapidAPI-Host":
            "onecompiler-apis.p.rapidapi.com",
        },
      }
    );

    res.status(200).json(response.data);
  } catch (error) {
    console.log(
      "OneCompiler Error:",
      error.response?.data || error.message
    );

    res.status(500).json({
      message: "Execution failed",
    });
  }
});

function getExtension(language) {
  const extensions = {
    javascript: "js",
    python: "py",
    java: "java",
    cpp : "cpp",
  };

  return extensions[language] || "txt";
}

export default router;