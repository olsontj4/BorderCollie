/*ProgressBar.jsx
A bar to display percentage of task complete.*/
import { Text, View } from 'react-native';

export function ProgressBar({ progress = 0 }) {
    // Clamp progress between 0 and 100
    const validProgress = Math.min(Math.max(progress, 0), 100);

    return (
        <View className="w-full">
            <View className="flex-row justify-between mb-1">
                <Text className="text-sm font-medium text-gray-700">Progress</Text>
                <Text className="text-sm font-medium text-gray-700">{validProgress}%</Text>
            </View>
            <View className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <View
                    className="h-full bg-blue-500 rounded-full"
                    style={{ width: `${validProgress}%` }}
                />
            </View>
        </View>
    );
}