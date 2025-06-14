import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { sendMessageToGemini } from "./api";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import { FontAwesome } from "@expo/vector-icons";

export interface Message {
  id: string;
  text: string;
  createdAt: Date;
  user: {
    id: number;
    name: string;
  };
}

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const flatListRef = useRef<FlatList>(null);

  // Inicializa com a mensagem de boas-vindas
  useEffect(() => {
    const initialMessage: Message = {
      id: "1",
      text: "Olá! Sou sua a Nela. sua nutricionista. Como posso ajudar você hoje?",
      createdAt: new Date(),
      user: { id: 2, name: "Nutricionista Bot" },
    };
    setMessages([initialMessage]);
  }, []);

  // Faz o scroll automático para a última mensagem
  useEffect(() => {
    flatListRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  const sendMessage = async () => {
    if (inputText.trim() === "") return;

    const userMessage: Message = {
      id: Math.random().toString(),
      text: inputText,
      createdAt: new Date(),
      user: { id: 1, name: "User" },
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInputText("");
    setIsLoading(true);

    try {
      const botResponse = await sendMessageToGemini(newMessages);
      const botMessage: Message = {
        id: Math.random().toString(),
        text: botResponse || "Desculpe, não consegui responder.",
        createdAt: new Date(),
        user: { id: 2, name: "Nutricionista Bot" },
      };
      setMessages([...newMessages, botMessage]);
    } catch (error) {
      console.error("Erro ao chamar a API Gemini:", error);
      const errorMessage: Message = {
        id: Math.random().toString(),
        text: "Desculpe, houve um erro ao processar sua mensagem.",
        createdAt: new Date(),
        user: { id: 2, name: "Nutricionista Bot" },
      };
      setMessages([...newMessages, errorMessage]);
    }

    setIsLoading(false);
  };

  const renderItem = ({ item }: { item: Message }) => {
    const isUser = item.user.id === 1;
    return (
      <View
        className={`${isUser ? "self-end bg-rose-500" : "self-start bg-zinc-200"} my-2 w-max min-w-[15%] max-w-[80%] gap-2 rounded-lg p-2 mt-10`}
      >
        <View className="">
          <Text
            style={{ color: isUser ? "#fff" : "#000" }}
            className="leading-6"
          >
            {item.text}
          </Text>
          <FontAwesome
            name="check"
            color={`${isUser ? "#e01234c5" : "#0000006a"}`}
            className="mt-2 size-5 self-end"
          />
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView className="w-full flex-1 bg-white p-4">
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        inverted={false}
        ListHeaderComponent={isLoading ? <Text>Digitando...</Text> : null}
      />
      <View className="w-full flex-row items-center justify-center gap-2">
        <View className="flex-1 rounded-lg border border-zinc-300 bg-white px-3 py-1">
          <TextInput
            value={inputText}
            onChangeText={setInputText}
            onKeyPress={(e) => {
              if (e.nativeEvent.key === "Enter") {
                e.preventDefault();
                sendMessage();
              }
            }}
            placeholder="Digite sua pergunta sobre nutrição..."
          />
        </View>

        <Button title="Enviar" onPress={sendMessage} disabled={isLoading} />
      </View>
    </SafeAreaView>
  );
}
