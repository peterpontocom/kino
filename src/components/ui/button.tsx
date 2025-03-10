import {
  Text,
  TouchableOpacity,
  View,
  type TouchableOpacityProps,
} from "react-native";

export interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: "primary" | "secondary";
}

const primitives = "rounded-md px-4 py-3";
const primary = " bg-primary";
const secondary = " bg-secondary border border-secondary";

export function Button({ title, variant = "primary", ...rest }: ButtonProps) {
  return (
    <View>
      <TouchableOpacity
        className={`${primitives} ${variant === "primary" ? primary : secondary}`}
        {...rest}
      >
        <Text
          className={`text-center font-semibold ${variant === "secondary" && `text-primary`}`}
        >
          {title}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
