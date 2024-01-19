import React, {useEffect, useRef, useState} from 'react';
import {Animated, StyleSheet, StatusBar} from 'react-native';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../utils/Methods';
import {colors} from '../../utils/theme/colors';
import {fontSizes} from '../../utils/theme/fontSizes';

export function WithSplashScreen({children, isAppReady}) {
  return (
    <>
      {isAppReady && children}

      <Splash isAppReady={isAppReady} />
    </>
  );
}

const LOADING_IMAGE = 'Loading image';
const FADE_IN_IMAGE = 'Fade in image';
const WAIT_FOR_APP_TO_BE_READY = 'Wait for app to be ready';
const FADE_OUT = 'Fade out';
const HIDDEN = 'Hidden';

export const Splash = ({isAppReady}) => {
  const containerOpacity = useRef(new Animated.Value(1)).current;
  const imageOpacity = useRef(new Animated.Value(0)).current;

  const [state, setState] = useState(LOADING_IMAGE);

  useEffect(() => {
    if (state === FADE_IN_IMAGE) {
      Animated.timing(imageOpacity, {
        toValue: 1,
        duration: 1000, // Fade in duration
        useNativeDriver: true,
      }).start(() => {
        setState(WAIT_FOR_APP_TO_BE_READY);
      });
    }
  }, [imageOpacity, state]);

  useEffect(() => {
    if (state === WAIT_FOR_APP_TO_BE_READY) {
      if (isAppReady) {
        setState(FADE_OUT);
      }
    }
  }, [isAppReady, state]);

  useEffect(() => {
    if (state === FADE_OUT) {
      Animated.timing(containerOpacity, {
        toValue: 0,
        duration: 1000, // Fade out duration
        delay: 1000, // Minimum time the logo will stay visible
        useNativeDriver: true,
      }).start(() => {
        setState(HIDDEN);
      });
    }
  }, [containerOpacity, state]);

  if (state === HIDDEN) return null;

  return (
    <>
      <StatusBar hidden={true} />
      <Animated.View
        collapsable={false}
        style={[styles.container, {opacity: containerOpacity}]}>
        <Animated.Image
          source={require('../../assets/images/splashDesign.png')}
          fadeDuration={0}
          onLoad={() => {
            setState(FADE_IN_IMAGE);
          }}
          style={[styles.image, {opacity: containerOpacity}]}
          resizeMode="contain"
        />
        <Animated.View
          collapsable={false}
          style={{opacity: containerOpacity, marginBottom: 100}}>
          <Animated.Image
            source={require('../../assets/images/logowithname.png')}
            fadeDuration={0}
            onLoad={() => {
              setState(FADE_IN_IMAGE);
            }}
            style={[styles.image2]}
            resizeMode="contain"
          />
          <Animated.Text
            // style={style.getcartext}
            style={[styles.sloganText]}
            fadeDuration={0}
            onLoad={() => {
              setState(FADE_IN_IMAGE);
            }}>
            Unleash Your Creativity!
          </Animated.Text>
        </Animated.View>
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.splashColor,
  },
  image: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    position: 'absolute',
    objectFit: 'fill',
    right: 0,
    bottom: 0,
  },
  image2: {
    width: SCREEN_WIDTH,
    height: 200,
  },
  sloganText: {
    fontSize: fontSizes.splashSlogan,
    color: colors.black,
    marginTop: 10,
    textAlign: 'center',
  },
});
