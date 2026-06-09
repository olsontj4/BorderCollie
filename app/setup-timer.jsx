/*setup-timer.jsx
Used to set timer length and number of check-ins.*/
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useContext, useEffect, useState } from 'react';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { TaskContext } from '../context/TaskContext';

export default function TaskDetailsScreen() {
    const router = useRouter();
    const { taskId } = useLocalSearchParams();
    const { getTask, addTask, updateTask, deleteTask } = useContext(TaskContext);

    // State for form inputs
    const [timerLength, setTimerLength] = useState('25');
    const [checkInFrequency, setCheckInFrequency] = useState('5');
    const [contact, setContact] = useState('');

    const [taskName, setTaskName] = useState('');

    // Check if editing existing task
    const isEditing = !!taskId;
    const existingTask = isEditing ? getTask(taskId) : null;

    // Populate form if editing
    useEffect(() => {
        if (existingTask) {
            setTaskName(existingTask.name ?? '');
            setTimerLength(existingTask.timerLength?.toString() ?? '25');
            setCheckInFrequency(existingTask.checkInFrequency?.toString() ?? '5');
            setContact(existingTask.contact || '');
        }
    }, [existingTask]);

    // Handle save
    const handleStartTimer = () => {
        const tLen = parseInt(timerLength, 10);
        const cFreq = parseInt(checkInFrequency, 10);

        if (!tLen || tLen <= 0) return;
        if (!cFreq || cFreq <= 0) return;

        const updates = {
            timerLength: tLen,
            checkInFrequency: cFreq,
            contact: contact.trim() || null,
        };

        let id = taskId;

        if (!isEditing) {
            const name = taskName.trim();
            if (!name) return;

            const newTask = {
                name,
                progress: 0,
                ...updates,
            };

            const created = addTask(newTask); // from context
            id = created?.id;
        } else {
            updateTask(taskId, updates);
        }

        if (!id) return;

        router.push({
            pathname: '/timer',
            params: { taskId: id },
        });
    };

    return (
        <View className="flex-1 bg-gray-50">
            <ScrollView
                className="flex-1 p-4"
                contentContainerStyle={{ paddingBottom: 40 }}
            >
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
                    <View className="flex-row items-center w-full">
                        <Pressable
                            onPress={() =>
                                setTimerLength(Math.max(1, parseInt(timerLength) - 1).toString())
                            }
                            className="bg-gray-300 rounded-lg w-12 h-12 justify-center items-center active:bg-gray-400"
                        >
                            <Text className="text-xl font-bold text-gray-700">−</Text>
                        </Pressable>

                        <TextInput
                            className="flex-1 min-w-0 border border-gray-300 rounded-lg px-3 py-3 mx-2 bg-white text-center text-gray-900 text-lg font-semibold"
                            placeholder="25"
                            value={timerLength}
                            onChangeText={setTimerLength}
                            keyboardType="number-pad"
                        />

                        <Pressable
                            onPress={() =>
                                setTimerLength(Math.max(1, parseInt(timerLength) - 1).toString())
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
                    <View className="flex-row items-center w-full">
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
                            className="flex-1 min-w-0 border border-gray-300 rounded-lg px-3 py-3 mx-2 bg-white text-center text-gray-900 text-lg font-semibold"
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
            </ScrollView>

            {/* Action Buttons */}
            <View className="p-4 border-t border-gray-200 bg-white gap-3">
                <Pressable
                    onPress={handleStartTimer}
                    className="bg-blue-500 rounded-lg py-4 items-center active:bg-blue-600"
                >
                    <Text className="text-white font-bold text-lg">
                        Start Timer
                    </Text>
                </Pressable>

                <Pressable
                    onPress={() => router.back()}
                    className="bg-gray-300 rounded-lg py-4 items-center active:bg-gray-400"
                >
                    <Text className="text-gray-700 font-bold text-lg">
                        Cancel
                    </Text>
                </Pressable>
            </View>
        </View>
    );
}