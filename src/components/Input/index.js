import React from 'react';
import {useEffect, useState} from 'react';

import {TextInput} from 'react-native-paper';
import {Platform, StyleSheet, TouchableOpacity, View} from 'react-native';
import {showLog} from '../../utils/Methods';
import {fonts} from '../../utils/theme/fonts';
import {TextInput as InputText} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from '../../utils/theme/colors';
import {fontSizes} from '../../utils/theme/fontSizes';
const Input = ({
  handleTextChange,
  ref,
  onBlur,
  type,
  holder,
  value,
  keyboardType,
  disabled,
  multiline,
  numberOfLines,
  style,
}) => {
  const [text, setText] = useState('');
  const [showPass, setShowpass] = useState(false);
  const [focus, setFocus] = useState(false);
  useEffect(() => {
    showLog(value, 'valueee');
    setText(value);
  }, [value]);
  return (
    <TextInput
      keyboardType={keyboardType ? keyboardType : 'default'}
      mode={'outlined'}
      selectionColor={colors.black}
      onBlur={onBlur}
      placeholder={holder}
      ref={ref}
      placeholderTextColor={colors.placeholder}
      outlineColor={colors.border}
      activeOutlineColor={colors.secondry}
      outlineStyle={{borderRadius: 10, borderWidth: 1.2}}
      textColor={colors.primary}
      disabled={disabled}
      style={
        disabled
          ? {
              fontSize: fontSizes.textFont,
              fontFamily: fonts.ProductSans_Medium,
              backgroundColor: colors.disabled,
            }
          : {
              fontSize: fontSizes.textFont,
              fontFamily: fonts.ProductSans_Medium,
              backgroundColor: colors.transparent,
            }
      }
      contentStyle={[styles.input, style]}
      theme={{
        colors: {
          primary: colors.primary,
        },
        mode: 'exact',
        fonts: {regular: fonts.ProductSans_Regular},
      }}
      value={value ? value : text}
      onChangeText={txt => {
        setText(txt);
        handleTextChange(txt);
      }}
      multiline={multiline ? true : false}
      numberOfLines={numberOfLines ? numberOfLines : 1}
    />
  );
};

const styles = StyleSheet.create({
  passwordText: {
    flex: 1,
    color: colors.text,
    fontSize: 16,
    fontFamily: fonts.Montserrat_Medium,
    backgroundColor: colors.transparent,
    alignSelf: 'center',
    marginBottom: -3,
  },
  passwordInput: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.transparent,
    width: Platform.OS == 'ios' ? '100%' : '100%',
    justifyContent: 'center',
    paddingRight: 15,
    paddingVertical: Platform.OS == 'ios' ? 12 : 0,
    paddingLeft: 12,
    fontFamily: fonts.Montserrat_Medium,
    borderRadius: 10,
    borderWidth: 1,
  },
  input: {
    backgroundColor: colors.transparent,
    width: Platform.OS == 'ios' ? '100%' : '100%',
    justifyContent: 'center',
    paddingHorizontal: 15,
    fontFamily: fonts.Montserrat_Medium,
  },
});
export default Input;
