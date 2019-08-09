import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { KeyboardAvoidingView, StyleSheet, Image, TextInput, TouchableOpacity, Text, Platform } from 'react-native';

import logo from '../assets/logo.png';

import api from '../services/api';

export default function Login({ navigation }) {
    const [user, setUser] = useState('');

    useEffect(() => {
        AsyncStorage.getItem('user').then(_user => {
            if (_user) {
                navigation.navigate('Main', { user: _user });
            }
        });
    }, [navigation]);

    async function handleLogin() {
        try {
            const response = await api.post('/devs', { username: user });
            const { _id } = response.data;
            await AsyncStorage.setItem('user', _id);

            navigation.navigate('Main', { user: _id });
        } catch (e) {
            console.log('Erro:', e);
        }
    }

    return (
        <KeyboardAvoidingView
            behavior="padding"
            enabled={Platform.OS === 'ios'}
            style={styles.container}
        >
            <Image source={logo} />
            <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="Digite seu usuário no Github"
                placeholderTextColor="#999"
                style={styles.input}
                value={user}
                onChangeText={setUser}
            />
            <TouchableOpacity onPress={handleLogin} style={styles.button}>
                <Text style={styles.buttonText}>Avançar</Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30,
    },
    input: {
        height: 46,
        alignSelf: 'stretch',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 4,
        marginTop: 20,
        paddingHorizontal: 15,
    },
    button: {
        height: 46,
        alignSelf: 'stretch',
        backgroundColor: '#df4723',
        borderRadius: 4,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

