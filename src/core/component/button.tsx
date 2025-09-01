import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { globalStyles } from './styles';

type ButtonProps = {
  title:string;
  onPress:() => void;
}

export const AppButton = ({title, onPress}:ButtonProps) => {
  return (
    <TouchableOpacity style={globalStyles.button} onPress={onPress}>
      <Text style={globalStyles.text} >{title}</Text>
    </TouchableOpacity>
  )
}