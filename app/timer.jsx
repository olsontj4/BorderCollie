import { useLocalSearchParams, useRouter } from 'expo-router';
import { useCallback, useContext, useState } from 'react';
import { Alert, Pressable, Text, View } from 'react-native';
import { ProgressSlider } from '../components/ProgressSlider';
import { TimerDisplay } from '../components/TimerDisplay';
import { TaskContext } from '../context/TaskContext';

export default function TimerScreen() {
    const router = useRouter();
    const { taskId } = useLocalSearchParams();
    const { getTask, updateTask } = useContext(TaskContext);

    const task = getTask(taskId);
    const [secondsLeft, setSecondsLeft] = useState((task?.timerLength || 25) * 60);
    const [showProgressModal, setShowProgressModal] = useState(false);
    const [nextCheckInSeconds, setNextCheckInSeconds] = useState(
        (task?.checkInFrequency || 5) * 60
    );

    // Handle timer tick and check-in logic
    const handleTick = useCallback(
        (remaining) => {
            setSecondsLeft(remaining);
            setNextCheckInSeconds((prev) => {
                const newValue = prev - 1;

                // Show popup when check-in frequency is reached
                if (newValue === 0) {
                    setShowProgressModal(true);
                    // Reset check-in counter
                    return (task?.checkInFrequency || 5) * 60;
                }

                return newValue;
            });
        },
        [task?.checkInFrequency]
    );

    // Handle timer completion
    const handleTimerComplete = () => {
        Alert.alert(
            '✅ Session Complete!',
            'Great work! You completed your focus session.',
            [
                {
                    text: 'Back to Tasks',
                    onPress: () => router.replace('/'),
                },
            ]
        );
    };

    // Handle progress save
    const handleSaveProgress = (progress) => {
        if (task) {
            updateTask(task.id, { progress });
        }
    };

    if (!task) {
        return (
            <View className="flex-1 justify-center items-center bg-gray-50">
                <Text className="text-gray-600 text-lg">Task not found</Text>
                <Pressable
                    onPress={() => router.replace('/')}
                    className="mt-4 bg-blue-500 rounded-lg px-6 py-3 active:bg-blue-600"
                >
                    <Text className="text-white font-bold">Back to Tasks</Text>
                </Pressable>
            </View>
        );
    }

    // Format next check-in time
    const checkInMinutes = Math.floor(nextCheckInSeconds / 60);
    const checkInSeconds = nextCheckInSeconds % 60;
    const checkInDisplay = `${checkInMinutes.toString().padStart(2, '0')}:${checkInSeconds.toString().padStart(2, '0')}`;

    return (
        <View className="flex-1 bg-gradient-to-b from-blue-50 to-gray-50 justify-center">
            {/* Task Info Header */}
            <View className="px-4 mb-12">
                <Text className="text-2xl font-bold text-gray-900 text-center mb-1">
                    {task.name}
                </Text>
                <Text className="text-gray-600 text-center">
                    Stay focused and crush this task!
                </Text>
            </View>

            {/* Timer Display */}
            <View className="mb-12">
                <TimerDisplay
                    initialSeconds={(task.timerLength || 25) * 60}
                    onTick={handleTick}
                    onComplete={handleTimerComplete}
                />
            </View>

            {/* Next Check-in Display */}
            <View className="px-4 mb-12">
                <View className="bg-white rounded-lg p-4 border border-gray-200">
                    <Text className="text-gray-600 text-center text-sm mb-2">
                        Next check-in
                    </Text>
                    <Text className="text-3xl font-bold text-center text-blue-600 font-mono">
                        {checkInDisplay}
                    </Text>
                </View>
            </View>

            {/* Manual Check-in Button */}
            <View className="px-4">
                <Pressable
                    onPress={() => setShowProgressModal(true)}
                    className="bg-green-500 rounded-lg py-4 items-center active:bg-green-600"
                >
                    <Text className="text-white font-bold text-lg">
                        📊 Update Progress
                    </Text>
                </Pressable>

                <Pressable
                    onPress={() => {
                        Alert.alert('Exit Session?', 'Are you sure? You can resume later.', [
                            { text: 'Cancel', style: 'cancel' },
                            {
                                text: 'Exit',
                                onPress: () => router.replace('/'),
                                style: 'destructive',
                            },
                        ]);
                    }}
                    className="bg-gray-400 rounded-lg py-3 items-center mt-3 active:bg-gray-500"
                >
                    <Text className="text-white font-bold">Exit Session</Text>
                </Pressable>
            </View>

            {/* Progress Slider Modal */}
            <ProgressSlider
                visible={showProgressModal}
                currentProgress={task.progress}
                onClose={() => setShowProgressModal(false)}
                onSave={handleSaveProgress}
            />
        </View>
    );
}