exports.createPrompt = (scenario, question) => {
    return `You are simulating a ${scenario.type} training scenario. The scenario involves ${scenario.description}. ${question}`;
  };
  