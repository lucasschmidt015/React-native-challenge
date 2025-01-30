import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Pressable } from 'react-native';
import { useRouter } from 'expo-router';

const NewTask = () => {
    const router = useRouter();

    const [task, editTask] = useState<string>('');

    const onPressSave = () => {
        
    }

    const onPressCancel = () => {
        router.back();
    }

    return (
        <View style={styles.container}>
            <Text style={styles.labelStyle}>Type your new task bellow:</Text>
            <TextInput
                style={styles.editStyle}
                value={task}
                onChangeText={editTask}
            />
            <View style={styles.buttonLine}>
                <Pressable 
                    style={styles.cancelButton}
                    onPress={onPressCancel}    
                >
                    <Text style={styles.buttonText}>Cancel</Text>
                </Pressable>

                <Pressable 
                    style={styles.saveButton}
                    onPress={onPressSave}    
                >
                    <Text style={styles.buttonText}>Save</Text>
                </Pressable>

            </View>
        </View>
    );
}

const buttonsCommunStyles = {
    width: 90,
    height: 35,
    marginLeft: 10,
    justifyContent: 'center',        
    alignItems: 'center',
    borderRadius: 5,
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 15,
        paddingVertical: 8,
    }, 
    labelStyle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
        color: "#3a3a3a"
    },
    editStyle: {
        backgroundColor: '#FFF',
        height: 50,
        paddingLeft: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#d1d0d0a0',
    },
    buttonLine: {
        flexDirection: "row",
        justifyContent: 'flex-end',        
        marginTop: 15,
    },
    cancelButton: {
        ...buttonsCommunStyles,
        backgroundColor: '#e70000',
    },
    saveButton: {
        ...buttonsCommunStyles,
        backgroundColor: '#00a308',
    },
    buttonText: {
        color: "#FFF",
        fontSize: 16,
    }
})

export default NewTask;
