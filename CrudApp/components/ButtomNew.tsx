import React from 'react';
import { StyleSheet, View } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';

type buttomNew = {
    buttomColor: string, 
    buttomSize: number
}

const ButtomNew = ({ buttomColor, buttomSize  }: buttomNew) => {
    return (
        <AntDesign style={styles.NewButtom} name="pluscircle" size={buttomSize} color={buttomColor} />
    );
}

const styles = StyleSheet.create({
    NewButtom: {
        position: 'absolute',
        bottom: 50,
        right: 20,
    }
})

export default ButtomNew;
