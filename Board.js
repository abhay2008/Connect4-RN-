import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from 'react-native';
import Cell from "./Cell";
import checkWin from "./win";

function copyGrid(grid) {
  return Array(grid.length).fill().map((_, j) => Array(grid[j].length).fill().map((_, i) => grid[j][i]));
}

export default function Board(props) {
  // 7x6 2D array representing the board
  const [grid, setGrid] = useState(Array(6).fill().map(() => Array(7).fill().map(() => ({ player: -1, setPlayer: null }))));
  const [current, setCurrent] = useState(0);
  const [win, setWin] = useState(-1);

  function setElt(i, j, prop, value) {
    const copied = copyGrid(grid);
    copied[j][i][prop] = value;
    setGrid(copied);
  }

  function giveInfo(i, j, setPlayer) {
    setElt(i, j, "setPlayer", setPlayer);
  }

  function gameLogic(i) {
    let j = 5;
    while (j >= 0) {
      if (grid[j][i].player < 0) {
        setElt(i, j, "player", current);
        grid[j][i].setPlayer(current);
        //console.log(grid[j][i]);
        break;
      }
      j--;
    }
    setWin(checkWin(grid));
    setCurrent(1-current);
  }

  return (
    <View>
      <View style={styles.container}>
        {Array(6).fill().map((_, j) => <View style={styles.row}>
          {Array(7).fill().map((_, i) => <Cell player={-1}
            onPress={gameLogic}
            giveInfo={giveInfo}
            i={i}
            j={j} />)}
        </View>)}
      </View>
      <Text style={[styles.win, {color: win >= 0 && (win === 0 ? "red" : (win === 1 ? "yellow" : "white"))}]}>
        {win >= 0 && (win === 0 ? "Red won!" : (win === 1 ? "Yellow won!" : "It's a tie!"))}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "dodgerblue",
    borderRadius: 20,
    borderWidth: 3
  },
  row: {
    display: "flex",
    flexDirection: "row"
  },
  win: {
    fontSize: 35,
    alignSelf: "center",
  }
});
