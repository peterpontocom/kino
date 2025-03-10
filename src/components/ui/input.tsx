import { Text, TextInput, View, type TextInputProps } from "react-native";
import { Controller, type UseControllerProps } from "react-hook-form";

interface InputProps {
  formProps: UseControllerProps;
  inputProps: TextInputProps;
}

export function Input({ formProps, inputProps }: InputProps) {
  return (
    <View className="flex-row gap-2.5 rounded-md border border-zinc-200 bg-zinc-100">
      <Controller
        render={() => {
          return (
            <TextInput
              {...inputProps}
              className="flex-1 p-2.5 placeholder:text-sm"
            />
          );
        }}
        {...formProps}
      />
    </View>
  );
}
