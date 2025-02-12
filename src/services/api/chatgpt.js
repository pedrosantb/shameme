import OpenAI from "openai";

const accessToken = process.env.OPEN_AI_ACCESS_TOKEN

const openai = new OpenAI({
    apiKey: accessToken,
});

export async function apiLLM(prompt) {

    const completion = await openai.chat.completions.create({
        messages: [{ role: "user", content: prompt }],
        model: "gpt-4o-mini",
      });


    return completion.choices[0].message.content
}
