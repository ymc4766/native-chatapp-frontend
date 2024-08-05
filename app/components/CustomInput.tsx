import React from "react";
import { TextInput, TextInputProps, TouchableOpacity } from "react-native";

interface CustomInputProps extends TextInputProps {
  containerStyles?: string;
  inputStyles?: string;
}

const CustomInput: React.FC<CustomInputProps> = ({
  containerStyles = "",
  inputStyles = "",
  ...props
}) => {
  return (
    <TextInput
      className={`w-4/5 h-10 border border-gray-400 rounded-md px-2 my-2 ${inputStyles}`}
      {...props}
    />
  );
};

export default CustomInput;
