import React, {useState, useRef} from 'react';
import {Dimensions, View, Platform, StatusBar} from 'react-native';
import MediaControls, {PLAYER_STATES} from 'react-native-media-controls';
import Video from 'react-native-video';

const VideoPlayer = () => {
  //  The video we will play on the player.
  const uri =
    // 'https://player.vimeo.com/external/591110988.hd.mp4?s=98538aca39e9bf77d73f2e5b488f4813637d013c&profile_id=174&oauth2_token_id=1528619126';
    'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
  const videoPlayer = useRef(null);
  const [duration, setDuration] = useState(0);
  const [paused, setPaused] = useState(true);

  const [currentTime, setCurrentTime] = useState(0);
  const [playerState, setPlayerState] = useState(PLAYER_STATES.PAUSED);
  const [isLoading, setIsLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const onSeek = seek => {
    videoPlayer.current.seek(seek);
  };

  const onSeeking = currentVideoTime => setCurrentTime(currentVideoTime);

  const onPaused = newState => {
    setPaused(!paused);
    setPlayerState(newState);
  };

  const onReplay = () => {
    videoPlayer.current.seek(0);
    setCurrentTime(0);
    if (Platform.OS === 'android') {
      setPlayerState(PLAYER_STATES.PAUSED);
      setPaused(true);
    } else {
      setPlayerState(PLAYER_STATES.PLAYING);
      setPaused(false);
    }
  };

  const onProgress = data => {
    if (!isLoading) {
      setCurrentTime(data.currentTime);
    }
  };

  const onLoad = data => {
    setDuration(Math.round(data.duration));
    setIsLoading(false);
  };

  const onLoadStart = () => setIsLoading(true);

  const onEnd = () => {
    setPlayerState(PLAYER_STATES.ENDED);
    setCurrentTime(duration);
  };

  const onFullScreen = () => {
    setIsFullscreen(!isFullscreen);
    // console.log(videoPlayer.current);
    if (isFullscreen) {
      console.log('isfull');
      videoPlayer.current._onFullscreenPlayerWillPresent(true);
      StatusBar.setHidden(true);
    } else {
      console.log('notfull');
      videoPlayer.current._onFullscreenPlayerWillPresent(false);
      StatusBar.setHidden(false);
    }
  };

  const videoDims = {
    height: (Dimensions.get('window').width * 9) / 16,
    width: isFullscreen ? Dimensions.get('window').width : '100%',
  };

  return (
    <View>
      <Video
        onEnd={onEnd}
        onLoad={onLoad}
        onLoadStart={onLoadStart}
        onProgress={onProgress}
        paused={paused}
        ref={ref => (videoPlayer.current = ref)}
        resizeMode={'cover'}
        source={{uri}}
        style={videoDims}
      />
      <MediaControls
        isFullScreen={true}
        onFullScreen={onFullScreen}
        duration={duration}
        isLoading={isLoading}
        progress={currentTime}
        onPaused={onPaused}
        onReplay={onReplay}
        onSeek={onSeek}
        onSeeking={onSeeking}
        mainColor={'orange'}
        playerState={playerState}
        sliderStyle={{containerStyle: {}, thumbStyle: {}, trackStyle: {}}}
      />
    </View>
  );
};

export default VideoPlayer;
