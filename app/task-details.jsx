import { useLocalSearchParams, useRouter } from 'expo-router';
import { useContext, useEffect, useState } from 'react';
import { Alert, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { TaskContext } from '../context/TaskContext';

export default function TaskDetailsScreen() {
    const router = useRouter();
    const { taskId } = useLocalSearchParams();
    const { getTask, addTask, updateTask } = useContext(TaskContext);

    // State for form inputs
    const [taskName, setTaskName] = useState('');
    const [timerLength, setTimerLength] = useState('25');
    const [checkInFrequency, setCheckInFrequency] = useState('5');
    const [contact, setContact] = useState('');

    // Check if editing existing task
    const isEditing = !!taskId;
    const existingTask = isEditing ? getTask(taskId) : null;

    // Populate form if editing
    useEffect(() => {
        if (existingTask) {
            setTaskName(existingTask.name);
            setTimerLength(existingTask.timerLength.toString());
            setCheckInFrequency(existingTask.checkInFrequency.toString());
            setContact(existingTask.contact || '');
        }
    }, [existingTask]);

    // Validate inputs
    const validateForm = () => {
        if (!isEditing && !taskName.trim()) {
            Alert.alert('Error', 'Task name is required');
            return false;
        }
        if (!timerLength || parseInt(timerLength) <= 0) {
            Alert.alert('Error', 'Timer length must be greater than 0');
            return false;
        }
        if (!checkInFrequency || parseInt(checkInFrequency) <= 0) {
            Alert.alert('Error', 'Check-in frequency must be greater than 0');
            return false;
        }
        return true;
    };

    // Handle save
    const handleSave = () => {
        if (!validateForm()) return;

        const taskData = {
            name: isEditing ? existingTask.name : taskName,
            timerLength: parseInt(timerLength),
            checkInFrequency: parseInt(checkInFrequency),
            contact: contact.trim() || null,
        };

        if (isEditing) {
            updateTask(taskId, taskData);
            Alert.alert('Success', 'Task updated!', [
                { text: 'OK', onPress: () => router.back() },
            ]);
        } else {
            addTask(taskData);
            Alert.alert('Success', 'Task created!', [
                { text: 'OK', onPress: () => router.back() },
            ]);
        }
    };

    return (
        <View className="flex-1 bg-gray-50">
            <ScrollView className="flex-1 p-4">
                {/* Task Name Input (only for new tasks) */}
                {!isEditing && (
                    <View className="mb-6">
                        <Text className="text-sm font-semibold text-gray-700 mb-2">
                            Task Name *
                        </Text>
                        <TextInput
                            className="border border-gray-300 rounded-lg px-4 py-3 bg-white text-gray-900"
                            placeholder="e.g., Design Mockups"
                            value={taskName}
                            onChangeText={setTaskName}
                            placeholderTextColor="#999"
                        />
                    </View>
                )}

                {/* Timer Length Input */}
                <View className="mb-6">
                    <Text className="text-sm font-semibold text-gray-700 mb-2">
                        Timer Length (minutes) *
                    </Text>
                    <View className="flex-row items-center gap-3">
                        <Pressable
                            onPress={() =>
                                setTimerLength(Math.max(1, parseInt(timerLength) - 1).toString())
                            }
                            className="bg-gray-300 rounded-lg w-12 h-12 justify-center items-center active:bg-gray-400"
                        >
                            <Text className="text-xl font-bold text-gray-700">−</Text>
                        </Pressable>

                        <TextInput
                            className="flex-1 border border-gray-300 rounded-lg px-4 py-3 bg-white text-center text-gray-900 text-lg font-semibold"
                            placeholder="25"
                            value={timerLength}
                            onChangeText={setTimerLength}
                            keyboardType="number-pad"
                        />

                        <Pressable
                            onPress={() =>
                                setTimerLength((parseInt(timerLength) + 1).toString())
                            }
                            className="bg-gray-300 rounded-lg w-12 h-12 justify-center items-center active:bg-gray-400"
                        >
                            <Text className="text-xl font-bold text-gray-700">+</Text>
                        </Pressable>
                    </View>
                </View>

                {/* Check-in Frequency Input */}
                <View className="mb-6">
                    <Text className="text-sm font-semibold text-gray-700 mb-2">
                        Check-in Frequency (minutes) *
                    </Text>
                    <View className="flex-row items-center gap-3">
                        <Pressable
                            onPress={() =>
                                setCheckInFrequency(
                                    Math.max(1, parseInt(checkInFrequency) - 1).toString()
                                )
                            }
                            className="bg-gray-300 rounded-lg w-12 h-12 justify-center items-center active:bg-gray-400"
                        >
                            <Text className="text-xl font-bold text-gray-700">−</Text>
                        </Pressable>

                        <TextInput
                            className="flex-1 border border-gray-300 rounded-lg px-4 py-3 bg-white text-center text-gray-900 text-lg font-semibold"
                            placeholder="5"
                            value={checkInFrequency}
                            onChangeText={setCheckInFrequency}
                            keyboardType="number-pad"
                        />

                        <Pressable
                            onPress={() =>
                                setCheckInFrequency(
                                    (parseInt(checkInFrequency) + 1).toString()
                                )
                            }
                            className="bg-gray-300 rounded-lg w-12 h-12 justify-center items-center active:bg-gray-400"
                        >
                            <Text className="text-xl font-bold text-gray-700">+</Text>
                        </Pressable>
                    </View>
                </View>

                {/* Contact Input (optional) */}
                <View className="mb-6">
                    <Text className="text-sm font-semibold text-gray-700 mb-2">
                        Contact Email (optional)
                    </Text>
                    <TextInput
                        className="border border-gray-300 rounded-lg px-4 py-3 bg-white text-gray-900"
                        placeholder="friend@example.com"
                        value={contact}
                        onChangeText={setContact}
                        keyboardType="email-address"
                        placeholderTextColor="#999"
                    />
                    <Text className="text-xs text-gray-500 mt-1">
                        We'll send check-in messages to this contact
                    </Text>
                </View>

                {/* Info Box */}
                <View className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-6">
                    <Text className="text-sm text-blue-900">
                        💡 <Text className="font-semibold">Tip:</Text> Set check-ins more
                        frequently for better accountability!
                    </Text>
                </View>
            </ScrollView>

            {/* Action Buttons */}
            <View className="p-4 border-t border-gray-200 bg-white gap-3">
                <Pressable
                    onPress={handleSave}
                    className="bg-blue-500 rounded-lg py-4 items-center active:bg-blue-600"
                >
                    <Text className="text-white font-bold text-lg">
                        {isEditing ? 'Update Task' : 'Create Task'}
                    </Text>
                </Pressable>

                <Pressable
                    onPress={() => router.back()}
                    className="bg-gray-300 rounded-lg py-4 items-center active:bg-gray-400"
                >
                    <Text className="text-gray-700 font-bold text-lg">Cancel</Text>
                </Pressable>
            </View>
        </View>
    );
}