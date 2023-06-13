import { OpenAIStream, OpenAIStreamPayload } from "@/utils/openAIStream";

if (!process.env.OPENAI_API_KEY) {
  throw new Error("Missing env var from OpenAI");
}

export const config = {
  runtime: "edge",
};

export async function POST(req: Request): Promise<Response> {
  const { prompt } = (await req.json()) as {
    prompt?: string;
  };

  if (!prompt) {
    return new Response("No prompt in the request", { status: 400 });
  }

const additionalText = "please 1) aknowledge the client worry on the emotional point of view (not the factual) 2) enlarge his field of view until he see advantages that could outweight the problem 3) use the principle of scarcity. example 'this is a rare occasion for you' 4) in answering match the language and tone (formal or informal etc...) of the question 5) at the end give a related motivational example";

  const payload: OpenAIStreamPayload = {
    model: "gpt-4",
    messages: [{ role: "user", content: additionalText + " " + prompt }],
    temperature: 0.9,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    max_tokens: 3000,
    stream: true,
    n: 1,
  };

  const stream = await OpenAIStream(payload);
  return new Response(stream);
}
