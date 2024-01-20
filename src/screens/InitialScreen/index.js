import React, {useState, useRef, useEffect} from 'react';
import {Text, View, TextInput, StyleSheet} from 'react-native';
import Input from '../../components/Input';
import {colors} from '../../utils/theme/colors';
import {fontSizes} from '../../utils/theme/fontSizes';
import {fonts} from '../../utils/theme/fonts';
import {useToast} from 'react-native-toast-notifications';
import {Button} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import {addUser} from '../../core/features/userSlice';
import {useNavigation} from '@react-navigation/native';
import form from '../../utils/Methods/form-data.json';

const InitialScreen = ({}) => {
  const [inputs, setInputs] = useState(form);
  const navigation = useNavigation();
  const inputRef = useRef([]);
  const [latestChangedFieldId, setLatestChangedFieldId] = useState(null);
  const dispatch = useDispatch();
  const toast = useToast();

  const [fields, setFields] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  useEffect(() => {
    if (latestChangedFieldId) {
      const currentChangedField = inputs.find(
        input => input.id === latestChangedFieldId,
      );
      console.log(currentChangedField);
      validateForm(
        currentChangedField.name,
        currentChangedField.id,
        currentChangedField.type,
      );
    }
  }, [latestChangedFieldId]);

  const handleChange = (text, fieldName, id, type) => {
    setFields(currentValue => ({
      ...currentValue,
      [fieldName]: text,
    }));
    validateForm(fieldName, id, type);
    setLatestChangedFieldId(id);
  };

  const validateForm = (fieldName, id, type) => {
    const ID = id;
    const newInput = [...inputs];

    if (type === 'text') {
      if (fields[fieldName].length === 0 || fields[fieldName] === '') {
        newInput[ID].errMessage = 'Please fill the field';
        newInput[ID].hasError = true;
      } else {
        newInput[ID].errMessage = '';
        newInput[ID].hasError = false;
      }
    }
    if (type === 'email') {
      if (fields[fieldName].length === 0 || fields[fieldName] === '') {
        newInput[ID].errMessage = 'Please fill the field';
        newInput[ID].hasError = true;
      } else if (
        !fields[fieldName].match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        )
      ) {
        newInput[ID].hasError = true;
        newInput[ID].errMessage = 'Invalid Email';
      } else {
        newInput[ID].errMessage = '';
        newInput[ID].hasError = false;
      }
    }
    if (type === 'password' && fieldName === 'password') {
      if (fields[fieldName].length === 0 || fields[fieldName] === '') {
        newInput[ID].errMessage = 'Please fill the field';
        newInput[ID].hasError = true;
      } else if (fields[fieldName].length < 6) {
        newInput[ID].hasError = true;
        newInput[ID].errMessage = 'Your password must be at least 6 characters';
      } else if (fields[fieldName].search(/[a-z]/i) < 0) {
        newInput[ID].hasError = true;
        newInput[ID].errMessage =
          'Your password must contain at least one letter.';
      } else if (fields[fieldName].search(/[0-9]/) < 0) {
        newInput[ID].hasError = true;
        newInput[ID].errMessage =
          'Your password must contain at least one digit.';
      } else {
        newInput[ID].errMessage = '';
        newInput[ID].hasError = false;
      }
    }
    if (type === 'password' && fieldName === 'confirmPassword') {
      if (fields['confirmPassword'] !== fields['password']) {
        newInput[ID].errMessage = "Password doesn't match";
        newInput[ID].hasError = true;
      } else {
        newInput[ID].errMessage = '';
        newInput[ID].hasError = false;
      }
    }
    setInputs(newInput);
  };

  const submitForm = () => {
    const err = inputs.filter(item => {
      if (item.hasError) {
        return item;
      }
    });
    if (err && err.length > 0) {
      console.log(err[0]);
      return toast.show(err[0].errMessage);
    }
    if (
      fields.firstName &&
      fields.lastName &&
      fields.email &&
      fields.password &&
      fields.confirmPassword
    ) {
      dispatch(addUser(fields));
      navigation.navigate('Home');
    } else {
      toast.show('All Fields Are required');
    }
  };
  return (
    <View style={styles.scrollviewstyles}>
      <View>
        {inputs &&
          inputs.map((value, index) => (
            <View style={{marginVertical: 10}} key={index}>
              <Text style={[styles.font, styles.formFieldText]}>
                {value.placeholder}
              </Text>
              <Input
                onBlur={() => validateForm(value.name, value.id, value.type)}
                holder={value.placeholder}
                handleTextChange={val =>
                  handleChange(val, value.name, value.id, value.type)
                }
                type="text"
                keyboardType="text"
                value={fields[value.name]}
                ref={input => (inputRef.current[value.id] = input)}
              />
            </View>
          ))}
        <Button
          style={{marginTop: 30}}
          mode="contained"
          textColor={colors.white}
          buttonColor={colors.button}
          onPress={() => submitForm()}>
          Submit
        </Button>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  scrollviewstyles: {
    flexGrow: 1,
    paddingTop: 40,
    padding: 22,
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
export default InitialScreen;
