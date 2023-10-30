import React, { useState, useContext, useEffect, useRef } from "react";
import { View, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Audio } from "expo-av";
import { Context } from "../../Contextapi/Provider";
import Slider from "@react-native-community/slider";
let audioid = null;
let audioPlayBy = null;
let updateInterval = null;
function AudioPlay({
  item,
  by,
  playStopButton,
  bgColor,
  thumbTintColor,
  minimumTrackTintColor,
  maximumTrackTintColor,
}) {
  const { Messages, setMessages } = useContext(Context);
  const [audioPlayer, setAudioPlayer] = useState(null);
  const [audioLength, setAudioLength] = useState(null);
  const [playingAudioLengthSeconds, setPlayingAudioLengthSeconds] = useState(0);
  const requestRef = useRef(0);
  useEffect(() => {
    updateInterval = setInterval(updatePlayingAudioLength, 1000);
    if (playingAudioLengthSeconds < audioLength) {
      requestRef.current = requestAnimationFrame(updatePlayingAudioLength);
    }
  }, [audioPlayer]);
  useEffect(() => {
    // Reset the slider position when a new audio is played
    setPlayingAudioLengthSeconds(0);
  }, [item]);
  const playAudio = async (audioURI) => {
    try {
      const { sound } = await Audio.Sound.createAsync(
        { uri: audioURI },
        { shouldPlay: true }
      );
      const status = await sound.getStatusAsync();
      const audioLengthMillis = status.durationMillis;
      const audioLengthSeconds = audioLengthMillis / 1000;
      setAudioLength(audioLengthSeconds);
      setAudioPlayer(sound);
    } catch (error) {
      console.error("Error playing audio:", error);
    }
  };
  const updatePlayingAudioLength = async () => {
    try {
      if (audioPlayer != null) {
        const status = await audioPlayer.getStatusAsync();
        const playingAudioLengthMillis = status.positionMillis;
        const playingAudioLengthSeconds = playingAudioLengthMillis / 1000;
        setPlayingAudioLengthSeconds(playingAudioLengthSeconds);
        if (!status.isPlaying) {
          // Audio has completed, stop the update
          requestRef.current = 0;
          clearInterval(updateInterval);
          pause(audioid, audioPlayBy);
          setPlayingAudioLengthSeconds(0);
        } else {
          // Continue updating if audio is still playing
          requestRef.current = requestAnimationFrame(updatePlayingAudioLength);
        }
      }
    } catch (error) {
      console.error("Error getting currently playing audio length:", error);
    }
  };
  const audioPlayButon = async (audiourl, id, by) => {
    audioid = id;
    audioPlayBy = by;
    if (by == "sender") {
      const index = Messages.findIndex((obj) => obj.id === id);
      if (index !== -1) {
        let newArraybySender = [...Messages];
        newArraybySender[index].audiostatus = true;
        setMessages(newArraybySender);
      }
    } else {
      const index = Messages.findIndex((obj) => obj.id === id);
      if (index !== -1) {
        let newArraybyreceiver = [...Messages];
        newArraybyreceiver[index].audiostatus = true;
        setMessages(newArraybyreceiver);
      }
    }
    const base64Audio = `data:audio/3gp;base64,${audiourl}`;
    playAudio(base64Audio);
  };
  const stopAudio = async () => {
    if (audioPlayer != null) {
      await audioPlayer.stopAsync();
      setAudioPlayer(null);
    }
  };
  const pause = (id, by) => {
    if (by == "sender") {
      const index = Messages.findIndex((obj) => obj.id === id);
      if (index !== -1) {
        let newArraybysender = [...Messages];
        newArraybysender[index].audiostatus = false;
        setMessages(newArraybysender);
      }
    } else {
      const index = Messages.findIndex((obj) => obj.id === id);
      if (index !== -1) {
        let newArraybyreceiver = [...Messages];
        newArraybyreceiver[index].audiostatus = false;
        setMessages(newArraybyreceiver);
      }
    }
    stopAudio();
  };
  return (
    <View
      style={{
        justifyContent: "flex-end",
        backgroundColor: bgColor,
        alignItems: "flex-end",
        flexDirection: "row",
        width: "100%",
        padding: 10,
        margin: 5,
      }}
    >
      <View style={{ flex: 1, flexDirection: "row" }}>
        {item.audiostatus == false ? (
          <TouchableOpacity
            onPress={() => audioPlayButon(item.chat, item.id, by)}
          >
            <AntDesign name="stepforward" size={20} color={playStopButton} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => pause(item.id, by)}>
            <AntDesign name="pause" size={24} color={playStopButton} />
          </TouchableOpacity>
        )}
        <Slider
          style={{ width: "90%", color: "white" }}
          minimumValue={0}
          maximumValue={audioLength}
          minimumTrackTintColor={minimumTrackTintColor}
          maximumTrackTintColor={maximumTrackTintColor}
          thumbTintColor={thumbTintColor}
          value={playingAudioLengthSeconds}
        />
      </View>
    </View>
  );
}

export default AudioPlay;
