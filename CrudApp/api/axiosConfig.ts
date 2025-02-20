import axios from 'axios';
import Constants from 'expo-constants';
import { Platform } from 'react-native';

const API_URL = (Platform.OS === 'windows' || Platform.OS === 'android') ? Constants.expoConfig?.extra?.API_URL_WINDOWS : Constants.expoConfig?.extra?.API_URL_MAC;

const api = axios.create({
    baseURL: API_URL,
    timeout: 10000,
    headers: { 'Content-Type': 'application/json' }
});

export default api;