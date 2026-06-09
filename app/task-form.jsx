/*task-form.jsx
Used to create, edit, and delete a task.
Has inputs for task name and progress.*/
import Slider from '@react-native-community/slider';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useContext, useEffect, useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { TaskContext } from '../context/TaskContext';

export default function TaskFormScreen() {
    const router = useRouter();
    const { taskId } = useLocalSearchParams();

    const { getTask, addTask, updateTask, deleteTask } = useContext(TaskContext);

    const isEditing = !!taskId;
    const task = isEditing ? getTask(taskId) : null;

    const [taskName, setTaskName] = useState('');
    const [progress, setProgress] = useState(0);

    const [confirmDelete, setConfirmDelete] = useState(false);

    useEffect(() => {
        if (task) {
            setTaskName(task.name);
            setProgress(task.progress ?? 0);
        }
    }, [task]);

    const handleSave = () => {
        if (!taskName.trim()) return;

        const payload = {
            name: taskName.trim(),
            progress,
        };

        if (isEditing) {
            updateTask(taskId, payload);
        } else {
            addTask(payload);
        }

        router.replace('/');
    };

    const confirmDeleteTask = () => {
        deleteTask(taskId);
        setConfirmDelete(false);
        router.replace('/');
    };

    return (
        <View className="flex-1 bg-gray-50 p-4 justify-between">

            {/* Form */}
            <View>

                <Text className="text-sm font-semibold mb-2">
                    Task Name
                </Text>

                <TextInput
                    className="border border-gray-300 rounded-lg px-4 py-3 bg-white mb-6"
                    value={taskName}
                    onChangeText={setTaskName}
                    placeholder="e.g. Design Mockups"
                />

                <Text className="text-sm font-semibold mb-2">
                    Progress ({progress}%)
                </Text>

                <Slider
                    style={{ width: '100%', height: 40 }}
                    minimumValue={0}
                    maximumValue={100}
                    value={progress}
                    onValueChange={setProgress}
                    step={1}
                    minimumTrackTintColor="#3b82f6"
                    maximumTrackTintColor="#e5e7eb"
                    thumbTintColor="#2563eb"
                />

            </View>

            {/* Actions */}
            <View className="gap-3">

                <Pressable
                    onPress={handleSave}
                    className="bg-blue-500 rounded-lg py-4 items-center"
                >
                    <Text className="text-white font-bold text-lg">
                        {isEditing ? 'Save Changes' : 'Create Task'}
                    </Text>
                </Pressable>

                {isEditing && (
                    <Pressable
                        onPress={() => setConfirmDelete(true)}
                        className="bg-red-500 rounded-lg py-4 items-center"
                    >
                        <Text className="text-white font-bold text-lg">
                            Delete Task
                        </Text>
                    </Pressable>
                )}

                <Pressable
                    onPress={() => router.replace('/')}
                    className="bg-gray-400 rounded-lg py-4 items-center"
                >
                    <Text className="text-white font-bold text-lg">
                        Cancel
                    </Text>
                </Pressable>

            </View>
            {confirmDelete && (
                <View className="absolute inset-0 bg-black/50 justify-center items-center">
                    <View className="bg-white p-6 rounded-lg w-4/5">
                        <Text className="text-lg font-bold mb-4">
                            Delete this task?
                        </Text>

                        <View className="flex-row justify-end gap-4">
                            <Pressable onPress={() => setConfirmDelete(false)}>
                                <Text className="text-gray-600 font-bold">
                                    Cancel
                                </Text>
                            </Pressable>

                            <Pressable
                                onPress={confirmDeleteTask}
                            >
                                <Text className="text-red-600 font-bold">
                                    Delete
                                </Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            )}
        </View>
    );
}