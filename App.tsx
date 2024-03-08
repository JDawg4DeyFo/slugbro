// Main React imports
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';
import * as NavigationBar from "expo-navigation-bar";
import * as Font from 'expo-font';
// Slugbro component imports
import StackNavigator from './src/Stack';

const LoadFonts = async () => {
  await Font.loadAsync({
    'Inter-SemiBold': require('./assets/fonts/Inter-SemiBold.ttf'),
    'Inter-Bold': require('./assets/fonts/Inter-Bold.ttf')
  });
};

export default function App() {
  // Define usestate for font loading
  const [fontsLoaded, setFontsLoaded] = useState(false);
  // Load fonts
  useEffect(() => {
    const LoadApp = async () => {
      await LoadFonts();
      setFontsLoaded(true); 
    };

    LoadApp();
  }, []);
  
  // Display splash screen untill fonts are loaded
  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);
  // I don't know why but fonts aren't working
  // I don't know why but fonts aren't working
  // I don't know why but fonts aren't working


  // Hide navigation bar
  // I don't really know what this code does
  const [barVisibility, setBarVisibility] = useState<string>();
  NavigationBar.addVisibilityListener(({ visibility }) => {
    if (visibility == 'visible') {
      setBarVisibility(visibility);
    }
  });

  useEffect(() => {
    navigationConfig();
  }, [barVisibility]);

  const navigationConfig = async() => {
    NavigationBar.setVisibilityAsync("hidden");
  }

  // Make sure fonts are loaded
  if (!fontsLoaded) {
    return null;
  }

  // Meat of the app
  return (
    <NavigationContainer>
      <StackNavigator/>
    </NavigationContainer>
  );
}
