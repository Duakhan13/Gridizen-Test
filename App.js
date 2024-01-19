import React, {useEffect, useState} from 'react';

import {Provider} from 'react-redux';
import {persistStore} from 'redux-persist';
import store from './src/core/store/store';
import {PersistGate} from 'redux-persist/lib/integration/react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
// import RootNavigator from './src/navigation';
import {WithSplashScreen} from './src/components/SplashScreen';
import {LogBox} from 'react-native';
import Home from './src/screens/Home';

const App = () => {
  let persistor = persistStore(store);
  const [isAppReady, setIsAppReady] = useState(false);
  LogBox.ignoreAllLogs(); //Ignore all log notifications

  useEffect(() => {
    setTimeout(() => {
      setIsAppReady(true);
    }, 3000);
  }, []);

  return (
    <WithSplashScreen isAppReady={isAppReady}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <SafeAreaProvider>
            {/* <RootNavigator /> */}
            <Home />
          </SafeAreaProvider>
        </PersistGate>
      </Provider>
    </WithSplashScreen>
  );
};

export default App;