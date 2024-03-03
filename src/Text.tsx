// This file is to specify a common font family for all text components.
import React from 'react';
import { Text as RNText, StyleSheet, TextStyle } from 'react-native';

const Text = ({ style, ...props }: { style?: TextStyle }) => {
    return <RNText style={styles.text}/>
};

const styles = StyleSheet.create({
    text: {
        fontSize:   16,
    },
});

export default Text;