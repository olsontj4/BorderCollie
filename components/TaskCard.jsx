import { Pressable, Text, View } from 'react-native';
import { ProgressBar } from './ProgressBar';

export function TaskCard({ task, onPress, onDelete }) {
    return (
        <Pressable
            onPress={onPress}
            className="bg-white rounded-lg p-4 mb-3 shadow-sm border border-gray-200 active:opacity-70"
        >
            <View className="flex-row justify-between items-start mb-3">
                <Text className="text-lg font-semibold text-gray-900 flex-1">
                    {task.name}
                </Text>
                <Pressable
                    onPress={onDelete}
                    className="p-2 rounded-md active:bg-red-100"
                >
                    <Text className="text-red-500 font-bold">×</Text>
                </Pressable>
            </View>

            <ProgressBar progress={task.progress} />

            <View className="flex-row justify-between mt-3 pt-3 border-t border-gray-100">
                <Text className="text-sm text-gray-600">
                    ⏱ {task.timerLength} min
                </Text>
                <Text className="text-sm text-gray-600">
                    🔔 Every {task.checkInFrequency} min
                </Text>
            </View>

            {task.contact && (
                <View className="mt-2">
                    <Text className="text-xs text-blue-600">
                        📧 {task.contact}
                    </Text>
                </View>
            )}
        </Pressable>
    );
}