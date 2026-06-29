import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Platform,
  TouchableOpacity,
} from "react-native";

import { Header } from "./src/components/Header";
import { Timer } from "./src/components/Timer";

import { useAudioPlayer } from "expo-audio";

const colores = ["#F7DC6F", "#A2D9CE", "#D7BDE2"];

export default function App() {
  const getInitialTime = (mode) => {
    if (mode === 0) return 25 * 60;
    if (mode === 1) return 5 * 60;
    return 15 * 60;
  };

  const player = useAudioPlayer(
    require("./assets/virtualzero-mouse-tap-single-studio-vocal-hd-379364.mp3"),
  );

  const [currentTime, setCurrentTime] = useState(0);

  const [time, setTime] = useState(getInitialTime(0));

  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      setTime((prev) => {
        if (prev <= 1) {
          setIsActive(false);

          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive]);

  const handleStart = () => {
    playSound();
    setIsActive(true);
  };

  const handlePause = () => {
    playSound();
    setIsActive(false);
  };

  const handleReset = () => {
    playSound();
    setIsActive(false);

    setTime(getInitialTime(currentTime));
  };

  const playSound = async () => {
    player.seekTo(0);
    player.play();
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colores[currentTime],
        },
      ]}
    >
      <Text style={[styles.texto, styles.stylePaddingTop]}>Pomodoro</Text>

      <Header
        setTime={setTime}
        currentTime={currentTime}
        setCurrentTime={setCurrentTime}
        setIsActive={setIsActive}
      />
      <Timer time={time} />

      <View style={styles.buttons}>
        <TouchableOpacity style={styles.button} onPress={handleStart}>
          <Text style={styles.textButton}>START</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handlePause}>
          <Text style={styles.textButton}>PAUSE</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleReset}>
          <Text style={styles.textButton}>RESET</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
  },

  texto: {
    fontSize: 32,
    fontWeight: "bold",
  },

  stylePaddingTop: {
    paddingTop: Platform.OS === "android" ? 50 : 0,
  },

  buttons: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 10,
    marginTop: 20,
  },

  button: {
    backgroundColor: "#333",
    padding: 15,
    borderRadius: 15,
  },

  textButton: {
    color: "white",
    fontWeight: "bold",
  },
});
