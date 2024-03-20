import React, { useState } from 'react';
import {Text, View, TouchableOpacity} from 'react-native'
// Style
import StylesObj from './Styles';
import { TextInput } from 'react-native-gesture-handler';
const Styles = StylesObj.StylesObj;


const Login = () => {
    const [Email, ChangeEmail] = React.useState('');
    const [Password, ChangePassword] = React.useState('');

    return(
        <View style={Styles.RootContainer}>
            <View style={Styles.LoginHeader}>
                <Text style={Styles.LoginHeaderText}>SlugBro</Text>
            </View>
            
            <View style={Styles.MainLogin}>
                <Text style={Styles.MainLoginTitle}>Login, Or Sign Up!</Text>
                <View style={Styles.TextInputTitleRow}>
                    <Text style={Styles.TextInputTitle}>Email</Text>
                    <Text style={Styles.TextInputInfo}>@ucsc.edu emails only</Text>
                </View>
                <TextInput
                    style={Styles.LoginTextInput}
                    onChangeText={ChangeEmail}
                    value={Email}
                    placeholder='SammySlug@ucsc.edu'
                />
                <Text style={Styles.TextInputTitle}>Password</Text>
                <TextInput
                    style={Styles.LoginTextInput}
                    onChangeText={ChangePassword}
                    value={Password}
                    secureTextEntry={true}
                />
                <View style={Styles.LoginActionRow}>
                    <TouchableOpacity>
                        <View style={Styles.LoginActionButton}>
                            <Text style={Styles.LoginActionButtonText}>Login</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style={Styles.LoginActionButton}>
                            <Text style={Styles.LoginActionButtonText}>Sign Up</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default Login;