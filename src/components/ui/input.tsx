import { Text, TextInput, View, type TextInputProps } from "react-native";

interface InputProps extends TextInputProps {}

export function Input(InputProps: InputProps) {
  return (
    <View className="rounded-lg border border-zinc-300 bg-white px-3 py-1">
      <TextInput {...InputProps} />
    </View>
  );
}
