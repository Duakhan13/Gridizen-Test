import React, {useState} from 'react';
import Header from '../../components/Header';
import {
  StatusBar,
  View,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {Button, Snackbar, Text} from 'react-native-paper';
import Input from '../../components/Input';
import {colors} from '../../utils/theme/colors';
import {fonts} from '../../utils/theme/fonts';
import {SCREEN_WIDTH, showLog} from '../../utils/Methods';
import {fontSizes} from '../../utils/theme/fontSizes';
import {useDispatch, useSelector} from 'react-redux';
import {useToast} from 'react-native-toast-notifications';
import {addPostData} from '../../core/features/postSlice';
import {useNavigation} from '@react-navigation/native';

const AddPost = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const navigation = useNavigation();
  const [form, setForm] = useState({
    userId: '',
    id: '',
    title: '',
    body: '',
  });

  const onChangeHandler = (name, value) => {
    setForm({
      ...form,
      [name]: value,
    });
  };
  const addPost = () => {
    if (form.id && form.body && form.userId && form.title) {
      // dispatch()
      dispatch(addPostData(form));
      navigation.navigate('Home');
    } else {
      toast.show('All Fields are required');
    }
  };

  return (
    <>
      <StatusBar hidden={false} />
      <Header title={'Add Post'} />
      <View style={styles.scrollviewstyles}>
        <Text style={[styles.font, styles.formFieldText]}>User Id</Text>
        <Input
          holder={'User Id here'}
          handleTextChange={val => onChangeHandler('userId', val)}
          type="text"
          keyboardType="number-pad"
          value={form.userId}
        />
        <Text style={[styles.font, styles.formFieldText]}>Id</Text>
        <Input
          holder={'Id here'}
          handleTextChange={val => onChangeHandler('id', val)}
          type="text"
          keyboardType="number-pad"
          value={form.id}
        />
        <Text style={[styles.font, styles.formFieldText]}>Title</Text>
        <Input
          holder={'Title here'}
          handleTextChange={val => onChangeHandler('title', val)}
          type="text"
          keyboardType="text"
          value={form.title}
        />
        <Text style={[styles.font, styles.formFieldText]}>Body</Text>
        <Input
          holder={'Body of post'}
          handleTextChange={val => onChangeHandler('body', val)}
          type="text"
          keyboardType="text"
          value={form.body}
        />
        <Button
          style={{marginTop: 30}}
          mode="contained"
          textColor={colors.white}
          buttonColor={colors.button}
          onPress={() => addPost()}>
          Submit
        </Button>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  scrollviewstyles: {
    flexGrow: 1,
    paddingLeft: 22,
    paddingRight: 22,
    backgroundColor: colors.white,
  },
  safeAreaViewstyles: {
    flex: 1,
  },
  form: {
    width: '100%',
    alignSelf: 'flex-start',
    justifyContent: 'center',
  },

  formFieldText: {
    fontSize: fontSizes.LabelFont,
    marginTop: 18,
    color: colors.primary,
    marginLeft: 5,
    marginBottom: 5,
  },
  buttonSection: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 10,
  },
  font: {
    fontFamily: fonts.ProductSans_Regular,
  },
});
export default AddPost;
