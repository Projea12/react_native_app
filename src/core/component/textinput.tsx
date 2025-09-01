import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { globalStyles } from './styles';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/Ionicons'; 

type TextInputProps = {
    hint?: string;
    label?: string;
    value: string;
    onChangeText: (text:string) => void;
    secureTextEntry?: boolean
};

export const TextInputGlobal = ({
  hint,
  label,
  value,
  onChangeText,
  secureTextEntry = false,
}:TextInputProps) => {
  return (
    <View style={globalStyles.inputContainer}>
      <TextInput 
      style = {globalStyles.input} 
      placeholder={hint} 
      value={value}
      onChangeText = {onChangeText}
      placeholderTextColor="#888"
      secureTextEntry = {secureTextEntry}/>
     
    </View>
  )
};






type PasswordInputProps = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
};

const PasswordInput: React.FC<PasswordInputProps> = ({
  value,
  onChangeText,
  placeholder,
}) => {
  const [secure, setSecure] = useState(true);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={secure}
        placeholderTextColor="#888"
      />
      <TouchableOpacity onPress={() => setSecure(!secure)}>
        <Icon
          name={secure ? 'eye-off' : 'eye'}
          size={20}
          color="#555"
        />
      </TouchableOpacity>
    </View>
  );
};

export default PasswordInput;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginVertical: 8,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 16,
    color: '#000',
  },
});


