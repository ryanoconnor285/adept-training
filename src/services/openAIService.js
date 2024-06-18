const { createPrompt } = require('../utils/scenarioUtils');

exports.getResponse = async (scenario, question) => {
  const prompt = createPrompt(scenario, question);

  const response = await axios.post(
    'https://api.openai.com/v1/completions',
    {
      model: 'text-davinci-003',
      prompt,
      max_tokens: 150,
      temperature: 0.7
    },
    {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      }
    }
  );

  return response.data.choices[0].text.trim();
};
