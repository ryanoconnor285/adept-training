const axios = require('axios');

const getResponse = async (scenario, question) => {
  const messages = [
      {
        role: 'system',
        content: `
        You are simulating a paramedic training scenario. Your role is to act as a paramedic instructor.
        The instructor provides a brief scenario and the student asks questions. The instructor should give very concise answers that only directly answer the questions without giving too much information. 
        It is up to the student to keep asking questions until they implement a treatment plan. 
        If a student correctly treats a patient, the patient's condition should improve. 
        If the treatments are incorrect or contraindicated, the patient's condition should decline. 
        The student will only know the patient is declining by asking questions.
        Provide direct, brief answers that help guide the student but require them to ask more questions to fully understand the situation.
        If the student provides a treatment that is not recommended or is dangerous, make up a patient response that indicates the patient's condition is declining.
        `,
      },
    { role: 'user', content: `Scenario: ${scenario.type} training. Patient: ${scenario.description}. Question: ${question}` }
  ];

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4o',
        messages: messages,
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Error connecting to OpenAI:', error.response ? error.response.data : error.message);
    throw new Error('Error connecting to OpenAI');
  }
};

module.exports = { getResponse };
