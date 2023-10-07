import {
  Image,
  StatusBar,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import cfs from '../../utils/fontUtils';
import { useDispatch, useSelector } from 'react-redux';
import SoundPlayer from 'react-native-sound-player';
import Slider from '@react-native-community/slider';
import {
  setCurrentTime,
  fetchCurrentSong,
  setCurrentIndex,
  toggleIsPlaying,
} from '../../redux_toolkit/slices/currentSongSlice';

const Page = () => {
  const song = useSelector(state => state.currentSong);
  const currentQueue = useSelector(state => state.currentQueue);
  const bgColor = useSelector(
    state =>
      state.currentSong.data?.basic_info?.bgColor || state.generalData.bgColor,
  );
  const dispatch = useDispatch();

  const previous = () => {
    if (song.currentIndex) {
      SoundPlayer.stop();
      if (song.currentIndex > 0) {
        SoundPlayer.stop();
        const previousSongId = currentQueue.queue[song.currentIndex - 1].id;
        dispatch(setCurrentIndex(song.currentIndex - 1));
        dispatch(fetchCurrentSong(previousSongId));
      } else {
        dispatch(setCurrentIndex(currentQueue.queue?.length - 1));
        dispatch(fetchCurrentSong(currentQueue.queue[currentQueue.queue?.length - 1].id),
        );
      }
    }
  };
  const next = () => {
    SoundPlayer.stop();
    if (song.currentIndex) {
      if (currentQueue.queue?.length > song.currentIndex + 1) {
        SoundPlayer.stop();
        const nextSongId = currentQueue.queue[song.currentIndex + 1].id;
        dispatch(setCurrentIndex(song.currentIndex + 1));
        dispatch(fetchCurrentSong(nextSongId));
      } else {
        dispatch(setCurrentIndex(0));
        dispatch(fetchCurrentSong(currentQueue.queue[0].id));
      }
    }
  };

  const play = () => {
    try {
      if (song.isPlaying) {
        SoundPlayer.pause();
        dispatch(toggleIsPlaying());
      } else {
        SoundPlayer.play();
        dispatch(toggleIsPlaying());
      }
    } catch (error) {
      console.log(`cannot play the sound file`, error);
    }
  };

  const changeTime = value => {
    if (song.isPlaying) SoundPlayer.pause();
    SoundPlayer.seek(value);
    dispatch(setCurrentTime(value));
    SoundPlayer.play();
  };

  return (
    <View
      style={{
        backgroundColor: 'rgb(0,0,0)',
        height: Dimensions.get('window').height,
      }}>
      <View style={[styles.background, { backgroundColor: bgColor }]}>
        <StatusBar translucent backgroundColor={'transparent'} />
        <SafeAreaView>
          <Image
            source={{
              uri: song.data?.basic_info?.thumbnail?.[0]?.url,
            }}
            style={styles.banner}
          />
          <Text style={styles.name} numberOfLines={1}>
            {song.data?.basic_info?.title}
          </Text>
          <Text style={styles.artists} numberOfLines={1}>
            {song.data?.basic_info?.author}
          </Text>
          <Slider
            value={song.currentTime}
            style={{ width: cfs(300), height: 40 }}
            minimumValue={0}
            onValueChange={value => changeTime(value)}
            maximumValue={song.data?.basic_info?.duration}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="#000000"
            thumbTintColor="#FFFFFF"
          />
          <View style={styles.control}>
            <TouchableOpacity onPress={previous}>
              <Image
                source={require('../../assets/icons/change.png')}
                style={[styles.icon, { transform: [{ rotate: '180deg' }] }]}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                padding: cfs(15),
                backgroundColor: 'rgba(255,255,255,0.07)',
                borderRadius: !song.isPlaying ? cfs(18) : cfs(30),
              }}
              onPress={() => play()}>
              {song.isPlaying ? (
                <Image
                  source={require('../../assets/icons/pause.png')}
                  style={styles.icon}
                />
              ) : (
                <Image
                  source={require('../../assets/icons/play.png')}
                  style={styles.icon}
                />
              )}
            </TouchableOpacity>
            <TouchableOpacity onPress={next}>
              <Image
                source={require('../../assets/icons/change.png')}
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  background: {
    height: Dimensions.get('window').height,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  banner: {
    marginVertical: cfs(30),
    width: cfs(300),
    height: cfs(300),
    borderRadius: cfs(2),
  },
  control: {
    marginVertical: cfs(20),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: cfs(30),
    height: cfs(50),
  },
  icon: {
    width: cfs(30),
    height: cfs(30),
  },
  name: {
    color: 'white',
    fontSize: cfs(20),
    fontWeight: 'bold',
    textAlign: 'center',
    width: cfs(300),
  },
  artists: {
    color: 'white',
    opacity: 0.5,
    fontSize: cfs(16),
    fontWeight: 'bold',
    textAlign: 'center',
    width: cfs(300),
    marginBottom: cfs(20),
  },
});
