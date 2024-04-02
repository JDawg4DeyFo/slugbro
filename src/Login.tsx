import React, { useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native'
// Style
import StylesObj from './Styles';
import { TextInput } from 'react-native-gesture-handler';
const Styles = StylesObj.StylesObj;
// Firebase
import { UserSignUp, UserSignIn } from './FireBaseFunctions';


const Login = () => {
    const [Email, ChangeEmail] = React.useState('');
    const [Password, ChangePassword] = React.useState('');
    const [loginDisabled, setLoginDisabled] = useState(false);
    const [signupDisabled, setSignupDisabled] = useState(false);

    return (
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
                // placeholder='SammySlug@ucsc.edu'
                />
                <Text style={Styles.TextInputTitle}>Password</Text>
                <TextInput
                    style={Styles.LoginTextInput}
                    onChangeText={ChangePassword}
                    value={Password}
                    secureTextEntry={true}
                />
                <View style={Styles.LoginActionRow}>
                    <TouchableOpacity disabled={loginDisabled || signupDisabled} onPress={async () => {
                        setLoginDisabled(true);
                        await UserSignIn({ Email, Password });
                        setLoginDisabled(false);
                    }}>
                        <View style={Styles.LoginActionButton}>
                            <Text style={Styles.LoginActionButtonText}>Login</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity disabled={loginDisabled || signupDisabled} onPress={async () => {
                        setSignupDisabled(true);
                        await UserSignUp({ Email, Password });
                        setSignupDisabled(false);
                    }}>
                        <View style={Styles.LoginActionButton}>
                            <Text style={Styles.LoginActionButtonText}>Sign Up</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={Styles.LoginHeader}>
                <Text style={Styles.LoginHeaderText}>SlugBro is an April Fool's app created by Jacob Dennon and Daniel Chang. It's a simple app where you can "bro" anyone else who has the app </Text>
            </View>
        </View>
    );
};

export default Login;