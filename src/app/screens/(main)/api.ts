import { GoogleGenAI } from "@google/genai";
import { Message } from "./Chatbot";

interface GeminiMessage {
  role: "user" | "assistant";
  parts: { text: string }[];
}

const API_KEY = "AIzaSyDgoRvgLSxkNMYTOYNLJA1HV4N8H8N8gDI";

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const sendMessageToGemini = async (
  messages: Message[],
): Promise<string> => {
  // Instrução do sistema incorporada na primeira mensagem do usuário
  const systemInstruction =
    "Você é um chatbot nutricionista para um aplicativo de entrega de comida. Seu papel é fornecer conselhos nutricionais e responder perguntas sobre alimentação saudável.\n\n";

  const formattedHistory: GeminiMessage[] = messages.map((msg, index) => {
    // Adiciona a instrução do sistema apenas à última mensagem do usuário
    const text =
      msg.user.id === 1 && index === messages.length - 1
        ? `${systemInstruction}${msg.text}`
        : msg.text;

    return {
      role: msg.user.id === 1 ? "user" : "assistant",
      parts: [{ text }],
    };
  });

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: formattedHistory,
    });

    if (!response || !response.text) {
      throw new Error("Resposta inválida da API Gemini");
    }

    return response.text;
  } catch (error) {
    console.error("Erro ao chamar a API Gemini:", error);
    throw error;
  }
};
