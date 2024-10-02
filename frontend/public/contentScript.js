const translatePage = async (targetLanguage) => {
  const elementsToTranslate = document.querySelectorAll(
    "*:not(script):not(style)"
  );

  const textContents = [];
  elementsToTranslate.forEach((element) => {
    if (element.innerText.trim()) {
      textContents.push({ element, text: element.innerText });
    }
  });

  for (let item of textContents) {
    const translatedText = await translateText(item.text, targetLanguage); // Handles API call
    item.element.innerText = translatedText;
  }
};

const translateText = async (text, targetLanguage) => {
  const apiKey = "YOUR_API_KEY";
  const response = await fetch(
    `https://translation-api.com/translate?text=${encodeURIComponent(
      text
    )}&target=${targetLanguage}&key=${apiKey}`
  );
  const result = await response.json();
  return result.translatedText;
};

translatePage("en");
