import React, { useEffect, useState, useCallback } from "react";
import {
  Platform,
  PermissionsAndroid,
  View,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing,
  Text,
  FlatList,
} from "react-native";
import Voice from "@react-native-voice/voice";
import { useConversation } from "../contexts/SearchContext";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../types/navigation";


const OPENAI_API_KEY = '';
const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";

const artisans = [
  { id: "1", name: "John Doe", skill: "Plumber", location: "Lagos", rating: 4.8 },
  { id: "2", name: "Mary Smith", skill: "Electrician", location: "Abuja", rating: 4.6 },
  { id: "3", name: "Ali Bello", skill: "Carpenter", location: "Kano", rating: 4.7 },
  { id: "4", name: "Grace Johnson", skill: "Tailor", location: "Port Harcourt", rating: 4.9 },
];

type SearchScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Search'
>;

interface Props {
  navigation: SearchScreenNavigationProp;
}

const SearchScreen: React.FC<Props> = ({ navigation }) =>{
  const { conversation, setConversation } = useConversation();
  const [isListening, setIsListening] = useState(false);
  const [spokenText, setSpokenText] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [pulseAnim] = useState(new Animated.Value(1));

  // ---- Intent Extraction ----


  // const getIntent = async (text: string, prevConversation: any) => {
  //   const prompt = `
  //   Extract intent from this request: "${text}".
  //   Fields: skill, location, time.
  //   Use previous conversation context: ${JSON.stringify(prevConversation)}.
  //   If some field is missing, respond with JSON including missingFields array.

  //   Example:
  //   { "skill": "Plumber", "location": null, "time": null, "missingFields": ["location","time"] }
  //   `;

  //   const res = await client.chat.completions.create({
  //     model: "gpt-4o-mini",
  //     messages: [{ role: "user", content: prompt }],
  //   });

  //   try {
  //     return JSON.parse(res.choices[0]?.message?.content || "{}");
  //   } catch (err) {
  //     console.log("Parse error", err);
  //     return null;
  //   }
  // };

  const getIntent = async (text: string, prevConversation: any) => {
    console.log("🔍 Starting intent extraction for text:", text);
    
    const prompt = `
    Extract intent from this request: "${text}".
    Fields: skill, location, time.
    Use previous conversation context: ${JSON.stringify(prevConversation)}.
    If some field is missing, respond with JSON including missingFields array.
  
    Example:
    { "skill": "Plumber", "location": null, "time": null, "missingFields": ["location","time"] }
    `;

    const requestBody = {
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 150,
      temperature: 0.3
    };
  
    try {
      console.log("📡 Making OpenAI API call with fetch...");
      console.log("🌐 API URL:", OPENAI_API_URL);
      
      const response = await fetch(OPENAI_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${OPENAI_API_KEY}`
        },
        body: JSON.stringify(requestBody)
      });

      console.log("📊 Response status:", response.status);
      console.log("📊 Response ok:", response.ok);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error("❌ API Error response:", errorText);
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      console.log("✅ OpenAI API response received:", data);
  
      try {
        const content = data.choices?.[0]?.message?.content || "{}";
        console.log("📝 Raw AI response content:", content);
        
        // Clean the content by removing markdown code blocks
        let cleanContent = content;
        if (content.includes('```json')) {
          cleanContent = content.replace(/```json\s*/, '').replace(/```\s*$/, '').trim();
          console.log("🧹 Cleaned content:", cleanContent);
        } else if (content.includes('```')) {
          cleanContent = content.replace(/```\s*/, '').replace(/```\s*$/, '').trim();
          console.log("🧹 Cleaned content:", cleanContent);
        }
        
        const parsed = JSON.parse(cleanContent);
        console.log("✅ Successfully parsed AI intent:", parsed);
        return parsed;
      } catch (parseErr) {
        console.error("❌ JSON Parse error:", parseErr);
        console.error("❌ Raw content that failed to parse:", data.choices?.[0]?.message?.content);
        return null;
      }
    } catch (apiErr: any) {
      console.error("❌ OpenAI API Error:", apiErr);
      console.error("❌ Error message:", apiErr.message);
      
      if (apiErr.message?.includes('404')) {
        console.error("❌ 404 Error - Invalid URL or endpoint");
      }
      if (apiErr.message?.includes('401')) {
        console.error("❌ 401 Error - Invalid API key");
      }
      if (apiErr.message?.includes('429')) {
        console.error("❌ 429 Error - Rate limit exceeded");
      }
      return null;
    }
  };
  

  // ---- Handlers ----
  const onSpeechStart = useCallback(() => {
    startPulse();
  }, []);

  const onSpeechEnd = useCallback(() => {
    setIsListening(false);
    stopPulse();
  }, []);

  const onSpeechResults = useCallback(
    async (event: any) => {
      console.log("🎤 Speech results received:", event);
      
      if (event.value && event.value.length > 0) {
        const text = event.value[0];
        console.log("🗣️ Speech text:", text);
        setSpokenText(text);

        const aiIntent = await getIntent(text, conversation);
        if (!aiIntent) {
          console.log("❌ Failed to get AI intent, returning");
          return;
        }

        console.log("💭 Setting conversation with intent:", aiIntent);
        setConversation(aiIntent);

        if (aiIntent.missingFields && aiIntent.missingFields.length > 0) {
          const missing = aiIntent.missingFields[0];
          console.log("❓ Missing field detected:", missing);
          if (missing === "location") {
            setSpokenText("Where do you need this service?");
          } else if (missing === "time") {
            setSpokenText("What time do you need the service?");
          } else if (missing === "skill") {
            setSpokenText("What kind of artisan do you need?");
          }
          setResults([]);
        } else {
          console.log("🔍 Filtering artisans with skill:", aiIntent.skill, "location:", aiIntent.location);
          const filtered = artisans.filter(
            (a) =>
              a.skill.toLowerCase() === aiIntent.skill?.toLowerCase() &&
              a.location.toLowerCase() === aiIntent.location?.toLowerCase()
          );
          console.log("📋 Filtered results:", filtered);
          setResults(filtered);
        }
      } else {
        console.log("❌ No speech results in event");
      }
    },
    [conversation]
  );

  useEffect(() => {
    console.log("🔧 Setting up Voice listeners...");
    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechEnd = onSpeechEnd;
    Voice.onSpeechResults = onSpeechResults;

    // Add error handlers
    Voice.onSpeechError = (event: any) => {
      console.error("❌ Speech Error:", event);
    };

    Voice.onSpeechVolumeChanged = (event: any) => {
      console.log("🔊 Speech volume changed:", event);
    };

    const checkPermission = async () => {
      console.log("🔐 Checking permissions...");
      console.log("📱 Platform:", Platform.OS);
      
      if (Platform.OS === "android") {
        try {
          const result = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.RECORD_AUDIO
          );
          console.log("🔐 Permission result:", result);
          
          if (result === PermissionsAndroid.RESULTS.GRANTED) {
            console.log("✅ Audio permission granted");
          } else {
            console.error("❌ Audio permission denied:", result);
          }
        } catch (permissionError) {
          console.error("❌ Permission request failed:", permissionError);
        }
      } else {
        console.log("📱 iOS platform - no explicit permission request needed");
      }
    };
    checkPermission();

    return () => {
      console.log("🧹 Cleaning up Voice listeners...");
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, [onSpeechStart, onSpeechEnd, onSpeechResults]);

  // ---- Mic Control ----
  const startListening = async () => {
    console.log("🎤 Starting to listen...");
    try {
      console.log("🔊 Calling Voice.start with locale: en-US");
      await Voice.start("en-US");
      console.log("✅ Voice.start successful");
      setIsListening(true);
      startPulse();
    } catch (error) {
      console.error("❌ Start Listening Error:", error);
      console.error("❌ Error details:", JSON.stringify(error, null, 2));
    }
  };

  const stopListening = async () => {
    console.log("🛑 Stopping listening...");
    try {
      await Voice.stop();
      console.log("✅ Voice.stop successful");
      setIsListening(false);
      stopPulse();
    } catch (error) {
      console.error("❌ Stop Listening Error:", error);
      console.error("❌ Error details:", JSON.stringify(error, null, 2));
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
    <View style={styles.wrSearchScreener}>
      {spokenText ? (
        <Text style={styles.text}>{spokenText}</Text>
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
        style={styles.micWrSearchScreener}
      >
        <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
          <Text style={styles.micIcon}>🎤</Text>
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wrSearchScreener: {
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
  micWrSearchScreener: {
    position: "absolute",
    bottom: 60,
    alignSelf: "center",
  },
  micIcon: {
    fontSize: 40,
    color: "#fff",
  },
});

export default SearchScreen;
