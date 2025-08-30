import React, { useEffect, useState, useCallback } from "react";
import {
  Platform,
  PermissionsAndroid,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing,
  Text,
  FlatList,
} from "react-native";
import Voice from "@react-native-voice/voice";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const artisans = [
  { id: "1", name: "John Doe", skill: "Plumber", location: "Lagos", rating: 4.8 },
  { id: "2", name: "Mary Smith", skill: "Electrician", location: "Abuja", rating: 4.6 },
  { id: "3", name: "Ali Bello", skill: "Carpenter", location: "Kano", rating: 4.7 },
  { id: "4", name: "Grace Johnson", skill: "Tailor", location: "Port Harcourt", rating: 4.9 },
];

const App = () => {
  const [isListening, setIsListening] = useState(false);
  const [spokenText, setSpokenText] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [pulseAnim] = useState(new Animated.Value(1));

  // ---- Handlers ----
  const onSpeechStart = useCallback(() => {
    startPulse();
  }, []);

  const onSpeechEnd = useCallback(() => {
    setIsListening(false);
    stopPulse();
  }, []);

  const onSpeechResults = useCallback((event: any) => {
    if (event.value && event.value.length > 0) {
      const text = event.value[0];
      setSpokenText(text);
      const filtered = artisans.filter(
        (a) =>
          text.toLowerCase().includes(a.skill.toLowerCase()) ||
          text.toLowerCase().includes(a.location.toLowerCase())
      );
      setResults(filtered);
    }
  }, []);

  useEffect(() => {
    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechEnd = onSpeechEnd;
    Voice.onSpeechResults = onSpeechResults;

    const checkPermission = async () => {
      if (Platform.OS === "android") {
        await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO
        );
      }
    };
    checkPermission();

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, [onSpeechStart, onSpeechEnd, onSpeechResults]);

  // ---- Mic Control ----
  const startListening = async () => {
    try {
      await Voice.start("en-US");
      setIsListening(true);
      startPulse();
    } catch (error) {
      console.log("Start Listening Error", error);
    }
  };

  const stopListening = async () => {
    try {
      await Voice.stop();
      setIsListening(false);
      stopPulse();
    } catch (error) {
      console.log("Stop Listening Error", error);
    }
  };

  const startPulse = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.3,
          duration: 800,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 800,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const stopPulse = () => {
    pulseAnim.stopAnimation();
    pulseAnim.setValue(1);
  };

  const renderArtisan = ({ item }: any) => (
    <View style={styles.card}>
      <Text style={styles.cardName}>{item.name}</Text>
      <Text style={styles.cardSkill}>{item.skill}</Text>
      <Text style={styles.cardLocation}>📍 {item.location}</Text>
      <Text style={styles.cardRating}>⭐ {item.rating}</Text>
    </View>
  );

  return (
    <View style={styles.wrapper}>
      {spokenText ? (
        <Text style={styles.text}>“{spokenText}”</Text>
      ) : (
        <Text style={styles.text}>Tap the orb and ask for an artisan 👇</Text>
      )}
      <FlatList
        data={results}
        keyExtractor={(item) => item.id}
        renderItem={renderArtisan}
        contentContainerStyle={{ paddingBottom: 180 }}
      />

      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => (isListening ? stopListening() : startListening())}
        style={styles.micWrapper}
      >
        <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
            <Text style={styles.micIcon}>🎤</Text>
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#0f172a",
    padding: 20,
  },
  text: {
    fontSize: 22,
    color: "#f8fafc",
    textAlign: "center",
    marginVertical: 20,
    fontWeight: "600",
  },
  card: {
    backgroundColor: "#1e293b",
    borderRadius: 16,
    padding: 16,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  cardName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#f8fafc",
  },
  cardSkill: {
    fontSize: 16,
    color: "#93c5fd",
  },
  cardLocation: {
    fontSize: 14,
    color: "#e2e8f0",
    marginTop: 4,
  },
  cardRating: {
    fontSize: 14,
    color: "#facc15",
    marginTop: 4,
  },
  micWrapper: {
    position: "absolute",
    bottom: 60,
    alignSelf: "center",
  },
  orb: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#3b82f6",
    shadowOpacity: 0.9,
    shadowRadius: 15,
    elevation: 12,
  },
  micIcon: {
    fontSize: 40,
    color: "#fff",
  },
});

export default App;
