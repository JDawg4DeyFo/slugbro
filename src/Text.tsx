// This file is to specify a common font family for all text components.
import React from 'react';
import { Platform, Text as RNText, StyleSheet, TextStyle } from 'react-native';

const Text = ({ style, children }: { style?: TextStyle, children?: React.ReactNode }) => {
    return <RNText style={styles.text}>{children}</RNText>
};

const styles = StyleSheet.create({
    text: {
        fontFamily: 'Inter-Bold'
    }
});

export default Text;