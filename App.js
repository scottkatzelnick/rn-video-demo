import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet, View} from 'react-native';
import VideoPlayer from './VideoPlayer';

const App = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#131314" />
      <View style={styles.container}>
        <VideoPlayer />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#131314',
  },
});

export default App;
