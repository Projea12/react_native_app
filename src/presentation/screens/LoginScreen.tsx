// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   SafeAreaView,
//   KeyboardAvoidingView,
//   Platform,
//   Alert,
// } from 'react-native';
// import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// import { RootStackParamList } from '../../../types/navigation';
// import { useAuth } from '../contexts/AuthContext';

// type LoginScreenNavigationProp = NativeStackNavigationProp<
//   RootStackParamList,
//   'Login'
// >;

// interface Props {
//   navigation: LoginScreenNavigationProp;
// }

// const LoginScreen: React.FC<Props> = ({ navigation }) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const { state, login, clearError } = useAuth();

//   // Navigate to home screen when login is successful
//   useEffect(() => {
//     if (state.isAuthenticated && state.user) {
//       navigation.navigate('Home');
//     }
//   }, [state.isAuthenticated, state.user, navigation]);

//   // Clear error when component unmounts or when user starts typing
//   useEffect(() => {
//     return () => {
//       if (state.error) {
//         clearError();
//       }
//     };
//   }, []);

//   useEffect(() => {
//     if (state.error) {
//       clearError();
//     }
//   }, [email, password]);

//   const handleLogin = async () => {
//     try {
//       await login(email, password);
//     } catch (error) {
//       // Error is handled by the context and shown via state.error
//       console.log('Login error handled by context');
//     }
//   };

//   const navigateToSignup = () => {
//     navigation.navigate('Signup');
//   };

//   // Show error alert when error state changes
//   useEffect(() => {
//     if (state.error) {
//       Alert.alert('Error', state.error);
//     }
//   }, [state.error]);

//   return (
//     <SafeAreaView style={styles.container}>
//       <KeyboardAvoidingView
//         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//         style={styles.keyboardAvoidingView}
//       >
//         <View style={styles.content}>
//           {/* Logo/Header Section */}
//           <View style={styles.headerSection}>
//             <View style={styles.logoContainer}>
//               <Text style={styles.logoText}>📱</Text>
//             </View>
//             <Text style={styles.welcomeText}>Welcome Back</Text>
//             <Text style={styles.subtitleText}>Sign in to continue</Text>
//           </View>

//           {/* Form Section */}
//           <View style={styles.formSection}>
//             {/* Email Input */}
//             <View style={styles.inputContainer}>
//               <Text style={styles.inputLabel}>Email</Text>
//               <TextInput
//                 style={styles.textInput}
//                 placeholder="Enter your email"
//                 value={email}
//                 onChangeText={setEmail}
//                 keyboardType="email-address"
//                 autoCapitalize="none"
//                 autoCorrect={false}
//                 placeholderTextColor="#9CA3AF"
//                 editable={!state.isLoading}
//               />
//             </View>

//             {/* Password Input */}
//             <View style={styles.inputContainer}>
//               <Text style={styles.inputLabel}>Password</Text>
//               <View style={styles.passwordContainer}>
//                 <TextInput
//                   style={styles.passwordInput}
//                   placeholder="Enter your password"
//                   value={password}
//                   onChangeText={setPassword}
//                   secureTextEntry={!showPassword}
//                   autoCapitalize="none"
//                   autoCorrect={false}
//                   placeholderTextColor="#9CA3AF"
//                   editable={!state.isLoading}
//                 />
//                 <TouchableOpacity
//                   style={styles.eyeButton}
//                   onPress={() => setShowPassword(!showPassword)}
//                   disabled={state.isLoading}
//                 >
//                   <Text style={styles.eyeText}>{showPassword ? '👁️' : '👁️‍🗨️'}</Text>
//                 </TouchableOpacity>
//               </View>
//             </View>

//             {/* Forgot Password */}
//             <TouchableOpacity 
//               style={styles.forgotPasswordContainer}
//               disabled={state.isLoading}
//             >
//               <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
//             </TouchableOpacity>

//             {/* Login Button */}
//             <TouchableOpacity
//               style={[styles.loginButton, state.isLoading && styles.loginButtonDisabled]}
//               onPress={handleLogin}
//               disabled={state.isLoading}
//             >
//               <Text style={styles.loginButtonText}>
//                 {state.isLoading ? 'Signing In...' : 'Sign In'}
//               </Text>
//             </TouchableOpacity>

//             {/* Divider */}
//             <View style={styles.dividerContainer}>
//               <View style={styles.dividerLine} />
//               <Text style={styles.dividerText}>OR</Text>
//               <View style={styles.dividerLine} />
//             </View>

//             {/* Social Login Buttons */}
//             <TouchableOpacity 
//               style={styles.socialButton}
//               disabled={state.isLoading}
//             >
//               <Text style={styles.socialButtonIcon}>🌐</Text>
//               <Text style={styles.socialButtonText}>Continue with Google</Text>
//             </TouchableOpacity>

//             <TouchableOpacity 
//               style={styles.socialButton}
//               disabled={state.isLoading}
//             >
//               <Text style={styles.socialButtonIcon}>📘</Text>
//               <Text style={styles.socialButtonText}>Continue with Facebook</Text>
//             </TouchableOpacity>
//           </View>

//           {/* Footer Section */}
//           <View style={styles.footerSection}>
//             <Text style={styles.footerText}>Don't have an account? </Text>
//             <TouchableOpacity 
//               onPress={navigateToSignup}
//               disabled={state.isLoading}
//             >
//               <Text style={[styles.signupLink, state.isLoading && styles.disabledText]}>
//                 Sign Up
//               </Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F8FAFC',
//   },
//   keyboardAvoidingView: {
//     flex: 1,
//   },
//   content: {
//     flex: 1,
//     paddingHorizontal: 24,
//     justifyContent: 'center',
//   },
//   headerSection: {
//     alignItems: 'center',
//     marginBottom: 40,
//   },
//   logoContainer: {
//     width: 80,
//     height: 80,
//     borderRadius: 40,
//     backgroundColor: '#4A90E2',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 24,
//     shadowColor: '#4A90E2',
//     shadowOffset: {
//       width: 0,
//       height: 4,
//     },
//     shadowOpacity: 0.3,
//     shadowRadius: 8,
//     elevation: 8,
//   },
//   logoText: {
//     fontSize: 32,
//     color: 'white',
//   },
//   welcomeText: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     color: '#1F2937',
//     marginBottom: 8,
//   },
//   subtitleText: {
//     fontSize: 16,
//     color: '#6B7280',
//   },
//   formSection: {
//     marginBottom: 32,
//   },
//   inputContainer: {
//     marginBottom: 20,
//   },
//   inputLabel: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: '#374151',
//     marginBottom: 8,
//   },
//   textInput: {
//     backgroundColor: 'white',
//     borderWidth: 1,
//     borderColor: '#E5E7EB',
//     borderRadius: 12,
//     paddingHorizontal: 16,
//     paddingVertical: 14,
//     fontSize: 16,
//     color: '#1F2937',
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 1,
//     },
//     shadowOpacity: 0.05,
//     shadowRadius: 2,
//     elevation: 1,
//   },
//   passwordContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: 'white',
//     borderWidth: 1,
//     borderColor: '#E5E7EB',
//     borderRadius: 12,
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 1,
//     },
//     shadowOpacity: 0.05,
//     shadowRadius: 2,
//     elevation: 1,
//   },
//   passwordInput: {
//     flex: 1,
//     paddingHorizontal: 16,
//     paddingVertical: 14,
//     fontSize: 16,
//     color: '#1F2937',
//   },
//   eyeButton: {
//     paddingHorizontal: 12,
//     paddingVertical: 8,
//   },
//   eyeText: {
//     fontSize: 18,
//   },
//   forgotPasswordContainer: {
//     alignSelf: 'flex-end',
//     marginBottom: 24,
//   },
//   forgotPasswordText: {
//     color: '#4A90E2',
//     fontSize: 14,
//     fontWeight: '500',
//   },
//   loginButton: {
//     backgroundColor: '#4A90E2',
//     borderRadius: 12,
//     paddingVertical: 16,
//     alignItems: 'center',
//     shadowColor: '#4A90E2',
//     shadowOffset: {
//       width: 0,
//       height: 4,
//     },
//     shadowOpacity: 0.3,
//     shadowRadius: 8,
//     elevation: 8,
//     marginBottom: 24,
//   },
//   loginButtonDisabled: {
//     backgroundColor: '#9CA3AF',
//   },
//   loginButtonText: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   dividerContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginVertical: 24,
//   },
//   dividerLine: {
//     flex: 1,
//     height: 1,
//     backgroundColor: '#E5E7EB',
//   },
//   dividerText: {
//     marginHorizontal: 16,
//     color: '#9CA3AF',
//     fontSize: 14,
//     fontWeight: '500',
//   },
//   socialButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: 'white',
//     borderWidth: 1,
//     borderColor: '#E5E7EB',
//     borderRadius: 12,
//     paddingVertical: 14,
//     paddingHorizontal: 16,
//     marginBottom: 12,
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 1,
//     },
//     shadowOpacity: 0.05,
//     shadowRadius: 2,
//     elevation: 1,
//   },
//   socialButtonIcon: {
//     fontSize: 20,
//     marginRight: 12,
//   },
//   socialButtonText: {
//     flex: 1,
//     textAlign: 'center',
//     fontSize: 16,
//     fontWeight: '500',
//     color: '#374151',
//   },
//   footerSection: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   footerText: {
//     fontSize: 14,
//     color: '#6B7280',
//   },
//   signupLink: {
//     fontSize: 14,
//     color: '#4A90E2',
//     fontWeight: '600',
//   },
//   disabledText: {
//     color: '#9CA3AF',
//   },
// });

// export default LoginScreen;



import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
  Animated,
  ToastAndroid,
} from "react-native";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";

// Define navigation stack types
type RootStackParamList = {
  Login: undefined;
  Dashboard: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Login">;

const LoginPhoneScreen: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const navigation = useNavigation<NavigationProp>();
  const scaleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  }, []);

  const showToast = (msg: string) => {
    ToastAndroid.show(msg, ToastAndroid.SHORT);
  };

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);

      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      // const { idToken } = await GoogleSignin.signIn();

      // if (!idToken) {
      //   showToast("Google sign-in cancelled 😕");
      //   return;
      // }

      // const googleCredential =
      //   auth.GoogleAuthProvider.credential(idToken);

      // const userCred: FirebaseAuthTypes.UserCredential =
      //   await auth().signInWithCredential(googleCredential);

      // const user = userCred.user;

      // Save user data locally
      // await AsyncStorage.setItem("user_name", user.displayName ?? "");
      // await AsyncStorage.setItem("email", user.email ?? "");
      // await AsyncStorage.setItem("id", user.uid);

      // showToast(`Welcome, ${user.displayName ?? "User"} 🎉`);
      navigation.replace("Dashboard");
    } catch (error: any) {
      console.error(error);
      showToast("Oops! Sign-in failed 😬");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        {/* <Image source={require("./assets/app_icon.png")} style={styles.logo} /> */}
      </Animated.View>

      <Text style={styles.title}>Welcome to SanFix! 👋</Text>
      <Text style={styles.subtitle}>
        Let’s get you started with your repair journey!
      </Text>

      {loading ? (
        <ActivityIndicator size="large" color="#000" style={{ marginTop: 40 }} />
      ) : (
        <TouchableOpacity style={styles.googleBtn} onPress={handleGoogleSignIn}>
          {/* <Image
            source={require("./assets/google.png")}
            style={{ height: 24, width: 24 }}
          /> */}
          <Text style={styles.googleText}>Sign in with Google</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default LoginPhoneScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F7FF",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  logo: {
    height: 200,
    width: 200,
    resizeMode: "contain",
    marginBottom: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 10,
    marginBottom: 40,
    color: "#333",
  },
  googleBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 18,
    elevation: 2,
  },
  googleText: {
    marginLeft: 12,
    fontWeight: "600",
    fontSize: 16,
    color: "#000",
  },
});
