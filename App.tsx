// Main React imports
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import * as NavigationBar from "expo-navigation-bar";
// Slugbro component imports
import Tabs from './src/Tabs'

export default function App() {
  // Hide navigation bar
  // I don't really know what this code does
  const [barVisibility, setBarVisibility] = useState();

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

  // Meat of the app
  return (
    <NavigationContainer>
      <Tabs/>
    </NavigationContainer>
  );
}
