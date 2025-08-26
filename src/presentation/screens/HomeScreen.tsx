import React, { useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  ScrollView,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../types/navigation';
import { useAuth } from '../contexts/AuthContext';

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;

interface Props {
  navigation: HomeScreenNavigationProp;
}

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const { state, logout } = useAuth();
  useEffect(() => {
    if (!state.isAuthenticated || !state.user) {
      navigation.navigate('Login');
    }
  }, [state.isAuthenticated, state.user, navigation]);

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            await logout();
            navigation.navigate('Login');
          },
        },
      ]
    );
  };

  if (!state.isAuthenticated || !state.user) {
    return null;
  }

  return (
    <ScrollView>
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.headerSection}>
          <Text style={styles.welcomeText}>🎉</Text>
          <Text style={styles.title}>Welcome!</Text>
          <Text style={styles.subtitle}>Hello, {state.user.fullName}</Text>
          <Text style={styles.emailText}>{state.user.email}</Text>
        </View>

        <View style={styles.cardSection}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Dashboard</Text>
            <Text style={styles.cardDescription}>
              This is your main dashboard where you can manage your account and view important information.
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Profile</Text>
            <Text style={styles.cardDescription}>
              Update your personal information and account settings here.
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Settings</Text>
            <Text style={styles.cardDescription}>
              Customize your app experience and manage your preferences.
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Account Info</Text>
            <Text style={styles.cardDescription}>
              Account created: {new Date(state.user.createdAt).toLocaleDateString()}
            </Text>
            <Text style={styles.cardDescription}>
              User ID: {state.user.id}
            </Text>
          </View>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
        <View style={{height:25}}/>
      </View>
    </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
  },
  headerSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  welcomeText: {
    fontSize: 48,
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#4A90E2',
    textAlign: 'center',
    fontWeight: '600',
    marginBottom: 4,
  },
  emailText: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
  cardSection: {
    flex: 1,
    marginBottom: 32,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 4,
  },
  logoutButton: {
    backgroundColor: '#EF4444',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: '#EF4444',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default HomeScreen;
