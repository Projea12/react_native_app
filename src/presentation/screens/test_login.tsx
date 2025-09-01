import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TextInputGlobal } from '../../core/component/textinput'
import { AppButton } from '../../core/component/button'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../../types/navigation'
import { globalStyles } from '../../core/component/styles'
// const TestLoginScreen: React.FC<Props> = ({ navigation }) => {


    type TestLoginScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    'TestLogin'
  >;
  
  interface Props {
    navigation: TestLoginScreenNavigationProp;
  }
const Test_login :React.FC<Props> = ({ navigation }) =>{
    const [email, setEmail] =  useState('')
    const [password, setPassword] = useState('')
    const handleLogin = () => {
     
    }
  return (
    <SafeAreaView style ={globalStyles.container}>
        <view>
            <Text>Login Page</Text>
        </view>

            <TextInputGlobal value={email} onChangeText={setEmail} hint='Enter your email'/>
            <TextInputGlobal value = {password} onChangeText={setPassword} hint ='Enter your password'/>
            <AppButton title={'Login'} onPress={handleLogin} />
 
    </SafeAreaView>
  )
}

export default Test_login

const styles = StyleSheet.create({})