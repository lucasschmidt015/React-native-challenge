import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Pressable, Alert } from 'react-native';
import { useRouter } from 'expo-router';

import { createNewTask } from '@/api/task';

const NewTask = () => {
    const router = useRouter();

    const [task, editTask] = useState<string>('');

    const onPressSave = async () => {
        if (task.length < 1) {
            Alert.alert("You need to type the task");
            return;
        }
        try {
            const response = await createNewTask({ message: task });
            if (response.status === 201) {
                router.push("/");
                Alert.alert("Task successfully created");
            }
        } catch (error) {
            console.log(error);
        }
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
        width: 90,
        height: 35,
        marginLeft: 10,
        justifyContent: 'center',        
        alignItems: 'center',
        borderRadius: 5,
        backgroundColor: '#e70000',
    },
    saveButton: {
        width: 90,
        height: 35,
        marginLeft: 10,
        justifyContent: 'center',        
        alignItems: 'center',
        borderRadius: 5,
        backgroundColor: '#00a308',
    },
    buttonText: {
        color: "#FFF",
        fontSize: 16,
    }
})

export default NewTask;
