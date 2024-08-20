import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as AddDataProvider } from './src/context/AddDataContext';
import { Provider as RetrieveDataProvider } from './src/context/ReportContext';
import React from 'react';
import HomeScreen from './src/screens/HomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import CampaignScreen from './src/screens/CampaignScreen';
import PlasticsScreen from './src/screens/PlasticsScreen';
import AddPlasticCampaignScreen from './src/screens/AddPlasticCampaignScreen';
import PickCoordinatesScreen from './src/screens/PickCoordinatesScreen';
import MapScreen from './src/screens/MapScreen';
import AlgalbloomScreen from './src/screens/AlgalbloomScreen';
import DiverScreen from './src/screens/DiverScreen';
import ImageAnnotationScreen from './src/screens/ImageAnnotationScreen';
import PlasticClassificatorScreen from './src/screens/PlasticClassificator';
import ClassificationResult from './src/screens/ClassificationResultScreen';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <AddDataProvider>
      <RetrieveDataProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Home" component={HomeScreen} initialParams={{ response: '', report_n: -1 }} />
            <Stack.Screen name="Campaigns" component={CampaignScreen} />
            <Stack.Screen name="AddPlasticCampaign" component={AddPlasticCampaignScreen} />
            <Stack.Screen name="Plastics" component={PlasticsScreen} />
            <Stack.Screen name="Algalbloom" component={AlgalbloomScreen} />
            <Stack.Screen name="Diver" component={DiverScreen} />
            <Stack.Screen name="ImageAnnotation" component={ImageAnnotationScreen} />
            <Stack.Screen name="PickCoordinates" component={PickCoordinatesScreen} />
            <Stack.Screen name="Map" component={MapScreen} />
            <Stack.Screen name='PlasticClassificator' component={PlasticClassificatorScreen} />
            <Stack.Screen name='ClassificationResult' component={ClassificationResult} initialParams={{images: ['']}} />
          </Stack.Navigator>
        </NavigationContainer>
      </RetrieveDataProvider>
    </AddDataProvider>
  )
}

export default App;
