import React, {useState, useEffect, useCallback} from 'react';
import {
  Pressable,
  FlatList,
  StyleSheet,
  RefreshControl,
  Text,
  ActivityIndicator,
  View,
  StatusBar,
} from 'react-native';
import {colors} from '../../utils/theme/colors';
import {
  Avatar,
  Button,
  Card,
  Divider,
  IconButton,
  List,
} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {getPosts} from '../../core/features/postSlice';
import {fonts} from '../../utils/theme/fonts';
import {useNavigation} from '@react-navigation/native';
import {fontSizes} from '../../utils/theme/fontSizes';
const Home = () => {
  const {postsData, postsDataError} = useSelector(state => state.posts);
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [data, setData] = useState(null);
  const navigation = useNavigation();

  console.log();
  useEffect(() => {
    if (postsData) {
      if (postsData.data?.length == 0) {
        setIsEmpty(true);
      } else {
        setData([...postsData]);
      }
      setLoader(false);
    } else if (postsDataError) {
      setLoader(false);
      setIsEmpty(true);
      setData([]);
    }
  }, [postsData, postsDataError]);

  useEffect(() => {
    if (!postsData) {
      setLoader(true);
      dispatch(getPosts());
    }
  }, []);

  return (
    <>
      <View style={styles.scrollviewstyles}>
        <StatusBar hidden={false} />
        {loader ? (
          <View style={{flex: 1, justifyContent: 'center'}}>
            <ActivityIndicator size="larger" color={colors.primary} />
          </View>
        ) : (
          <>
            <FlatList
              initialNumToRender={5}
              data={data}
              renderItem={({item, index}) => {
                return (
                  <>
                    <View style={{paddingVertical: 10}}>
                      {/* <List.Item titleStyle={styles.textStyle} title={item.title} /> */}
                      <Card.Title
                        titleStyle={styles.textStyle}
                        subtitleStyle={styles.subTitle}
                        subtitleNumberOfLines={3}
                        title={item.title}
                        subtitle={item.body}
                      />
                    </View>
                    <Divider />
                  </>
                );
              }}
            />
            <Button
              mode="contained"
              textColor={colors.white}
              buttonColor={colors.button}
              onPress={() => navigation.navigate('AddPost')}>
              Add post screen
            </Button>
          </>
        )}
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  textStyle: {
    color: colors.primary,
    fontSize: fontSizes.heading,
    fontFamily: fonts.ProductSans_Medium,
  },
  subTitle: {
    color: colors.primary,
    fontSize: fontSizes.textFont,
    fontFamily: fonts.ProductSans_Light,
  },
  scrollviewstyles: {
    flex: 1,
    justifyContent: 'flex-start',
    margin: 20,
    flexGrow: 1,
  },
});
export default Home;
