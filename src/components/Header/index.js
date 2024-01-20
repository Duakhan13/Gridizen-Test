import {useNavigation, useRoute} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, TouchableOpacity, Image} from 'react-native';
import {Appbar} from 'react-native-paper';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {fonts} from '../../utils/theme/fonts';
import {colors} from '../../utils/theme/colors';

const Header = ({title}) => {
  const navigation = useNavigation();
  return (
    <Appbar.Header style={{...styles.header}}>
      <TouchableOpacity
        style={{
          ...styles.content,
        }}
        onPress={() => navigation.goBack()}>
        <EvilIcons size={45} color={colors.white} name="chevron-left" />
      </TouchableOpacity>
      <Appbar.Content
        style={{
          ...styles.content,
        }}
        titleStyle={{...styles.title}}
        title={title}
      />
    </Appbar.Header>
  );
};
const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.primary,
    height: 75,
  },
  content: {
    marginLeft: 0,
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: -1,
  },
  title: {
    alignSelf: 'center',
    color: colors.white,
    fontFamily: fonts.ProductSans_Regular,
  },
});

export default Header;
