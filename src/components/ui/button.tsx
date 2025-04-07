import {
  Text,
  TouchableOpacity,
  View,
  type TouchableOpacityProps,
} from "react-native";

interface ButtonProps extends TouchableOpacityProps {
  title: string;
}

export function Button(ButtonProps: ButtonProps) {
  return (
    <View>
      <TouchableOpacity {...ButtonProps} className="rounded-lg bg-rose-500 p-4">
        <Text className="text-center font-semibold text-white">
          {ButtonProps.title}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
