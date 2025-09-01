import React, { useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  ScrollView,
  Button,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../types/navigation';
import { useAuth } from '../contexts/AuthContext';
import { globalStyles } from '../../core/component/styles';

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;

interface Props {
  navigation: HomeScreenNavigationProp;
}
export default function HomeScreen({ navigation }: { navigation: any }) {
  const { state, signOut } = useAuth();

  useEffect(() => {
    if (!state.user) {
      navigation.replace("Login");
    }
  }, [state.user, navigation]);

  if (state.loading) {
    return (
      <View style={globalStyles.container}>
        <Text>Loading…</Text>
      </View>
    );
  }

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.welcome}>Welcome</Text>
      <Text>Email: {state.user?.email}</Text>
      <Button title="Sign Out" onPress={signOut} />
    </View>
  );
}

