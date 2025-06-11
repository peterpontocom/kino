import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  Button,
  StyleSheet,
} from "react-native";
import { sendMessageToGemini } from "./api";

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
      text: "Olá! Sou seu chatbot nutricionista. Como posso ajudar você com suas perguntas sobre dieta?",
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
        style={{
          alignSelf: isUser ? "flex-end" : "flex-start",
          backgroundColor: isUser ? "#4f46e5" : "#e5e7eb",
          borderRadius: 10,
          padding: 10,
          margin: 5,
          maxWidth: "80%",
        }}
      >
        <Text style={{ color: isUser ? "#fff" : "#000" }}>{item.text}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        inverted={true}
        ListHeaderComponent={
          isLoading ? (
            <Text style={styles.loadingText}>Digitando...</Text>
          ) : null
        }
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Digite sua pergunta sobre nutrição..."
        />
        <Button title="Enviar" onPress={sendMessage} disabled={isLoading} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  inputContainer: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#fff",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 5,
    marginRight: 10,
  },
  loadingText: {
    alignSelf: "flex-start",
    padding: 10,
    color: "#666",
  },
});
