import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Board from './Board';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={{alignSelf: 'center', color: '#86b4fc', fontSize: 45, marginBottom: RFValue(50), fontWeight: 'bold'}}>Connect4</Text>
      <Board />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181818',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: '1%',
    paddingTop: '1%'
  },
});
