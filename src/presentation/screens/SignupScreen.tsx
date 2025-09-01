import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ScrollView,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../types/navigation';
import { useAuth } from '../contexts/AuthContext';
import { globalStyles } from '../../core/component/styles';
import PasswordInput, { TextInputGlobal } from '../../core/component/textinput';
import { AppButton } from '../../core/component/button';
import { useNotify } from '../../core/component/toast';

type SignupScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Signup'
>;

interface Props {
  navigation: SignupScreenNavigationProp;
}

const SignupScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {signIn} = useAuth();
  const notify = useNotify();
  const handleLogin = async () => {
    try {
      await signIn(email, password);
      notify("success", "Great", "Account created Successfully 🎉");
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
            <Text style={globalStyles.title}>Hello 👋</Text>
            <Text style={globalStyles.subtitle}>SignUp to get started</Text>

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

export default SignupScreen;
