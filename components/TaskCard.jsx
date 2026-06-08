import { useRouter } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { ProgressBar } from './ProgressBar';

export function TaskCard({ task }) {
    const router = useRouter();

    return (
        <Pressable
            onPress={() =>
                router.push({
                    pathname: '/setup-timer',
                    params: { taskId: task.id },
                })
            }
            className="bg-white rounded-lg p-4 mb-3 shadow-sm border border-gray-200 active:opacity-70"
        >

            {/* Header */}
            <View className="flex-row justify-between items-start mb-3">

                <Text className="text-lg font-semibold text-gray-900 flex-1">
                    {task.name}
                </Text>

                {/* Edit button */}
                <Pressable
                    onPress={(e) => {
                        e.stopPropagation();
                        router.push({
                            pathname: '/task-form',
                            params: { taskId: task.id },
                        });
                    }}
                    className="ml-3 px-2 py-1 rounded bg-gray-200 active:bg-gray-300"
                >
                    <Text className="text-xs font-bold text-gray-700">
                        Edit
                    </Text>
                </Pressable>

            </View>

            <ProgressBar progress={task.progress} />
        </Pressable>
    );
}