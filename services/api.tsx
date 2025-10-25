export async function getAIResponse(prompt: string): Promise<string> {
  try {
    const topicContext =
      'You are a friendly English tutor helping me practice conversations about travel.';
    console.log(process.env.EXPO_PUBLIC_HUGGINGFACE_TOKEN);
    console.log(`API URL is ${process.env.EXPO_PUBLIC_HUGGINGFACE_TOKEN}`);
    const response = await fetch(
      'https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.EXPO_PUBLIC_HUGGINGFACE_TOKEN}`,
        },
        body: JSON.stringify({ inputs: `${topicContext}\nUser: ${prompt}` }),
      }
    );
    
    const data = await response.json();
    return data?.generated_text || 'Sorry, I didn’t catch that.';
  } catch (error) {
    console.error(error);
    return 'Error connecting to AI service.';
  }
}
