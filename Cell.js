import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';
const window = Dimensions.get("window");
const screen = Dimensions.get("screen");
const H=window.height
const W=window.width

export default function Cell(props) {
  const [player, setPlayer] = useState(props.player);
  const [dimensions, setDimensions] = useState({ window, screen });
  
  useEffect(() => {
    props.giveInfo(props.i, props.j, setPlayer);
  }, []);
  
  useEffect(() => {
    const subscription = Dimensions.addEventListener(
      "change",
      ({ window, screen }) => {
        setDimensions({ window, screen });
      }
    );
    return () => subscription?.remove();
  });
  
  return (
    <TouchableOpacity style={styles.container} onPress={() => props.onPress(props.i, props.j)}>
      <View style={[styles.opening, {
        backgroundColor: player < 0 ? "#181818" : (player === 0 ? "salmon" : "yellow"),
      }]}></View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 0.1*W,
    height: 0.1*W,
    display: "flex",
    alignItems: "center",
    justifyContent: "center", 
  },
  opening: {
    width: "80%",
    height: "80%",
    borderRadius: 100,
  }
});
