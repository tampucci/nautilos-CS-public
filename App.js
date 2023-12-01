import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as AddDataProvider } from './src/context/AddDataContext';
import { Provider as RetrieveDataProvider } from './src/context/ReportContext';
import React from 'react';
import HomeScreen from './src/screens/HomeScreen';
import LoginScreen from './src/screens/LoginScreen';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <AddDataProvider>
      <RetrieveDataProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Home" component={HomeScreen} initialParams={{ response: '', report_n: -1 }} />
          </Stack.Navigator>
        </NavigationContainer>
      </RetrieveDataProvider>
    </AddDataProvider>
  )
}

export default App;
