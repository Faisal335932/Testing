import { Text, View, StyleSheet, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import Test from './assets/components/Test';
export default function App() {
    return (
        <Test />
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#ecf0f1',
        padding: 8,
        alignItems: 'center',
    },
    btnsyle: {
        fontSize: 55,
        fontWeight: '900',
        color: 'black'
    }

});