import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../types/navigation';
import PasswordInput, { TextInputGlobal } from '../../core/component/textinput';
import { AppButton } from '../../core/component/button';
import { globalStyles } from '../../core/component/styles';
import { useAuth } from '../contexts/AuthContext';
import { useNotify } from '../../core/component/toast';

type LoginScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Login'
>;

interface Props {
  navigation: LoginScreenNavigationProp;
}

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {login} = useAuth();
  const notify = useNotify();
  const handleLogin = async () => {
    try {
      await login(email, password);
      notify("success", "Welcome back!", "Login Successful 🎉");
      navigation.replace("Home");
    } catch (err: any) {
      notify("error", err.nativeErrorMessage || "Something went wrong", "Login Failed ❌");
    }
  };

  return (
    <SafeAreaView style={globalStyles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={globalStyles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <View style={globalStyles.card}>
            <Text style={globalStyles.title}>Welcome Back 👋</Text>
            <Text style={globalStyles.subtitle}>Login to continue</Text>

            <View style={globalStyles.inputContainer}>
              <TextInputGlobal
                value={email}
                onChangeText={setEmail}
                hint="Enter your email"
              />
              <PasswordInput
                value={password}
                onChangeText={setPassword}
              placeholder="Enter your password"
            />
            </View>

            <AppButton title="Login" onPress={handleLogin} />

            <Text style={globalStyles.footerText}>
              Don’t have an account?{' '}
              <Text
                style={globalStyles.link}
                onPress={() => navigation.navigate('Signup')}
              >
                Sign up
              </Text>
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};


export default LoginScreen;
