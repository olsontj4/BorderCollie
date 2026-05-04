import { useState } from 'react';
import { Modal, Pressable, Slider, Text, View } from 'react-native';

export function ProgressSlider({
    visible = false,
    currentProgress = 0,
    onClose = () => { },
    onSave = () => { }
}) {
    const [progress, setProgress] = useState(currentProgress);

    const handleSave = () => {
        onSave(progress);
        onClose();
    };

    return (
        <Modal
            transparent={true}
            visible={visible}
            animationType="fade"
        >
            <View className="flex-1 bg-black/50 justify-center items-center">
                <View className="bg-white rounded-lg p-6 w-4/5 shadow-lg">
                    <Text className="text-lg font-bold text-gray-900 mb-4">
                        Update Progress
                    </Text>

                    <View className="bg-blue-100 rounded-lg p-3 mb-4">
                        <Text className="text-3xl font-bold text-center text-blue-600">
                            {Math.round(progress)}%
                        </Text>
                    </View>

                    <View className="mb-6">
                        <Slider
                            style={{ height: 40 }}
                            minimumValue={0}
                            maximumValue={100}
                            value={progress}
                            onValueChange={(value) => setProgress(value[0] || value)}
                            step={1}
                            minimumTrackTintColor="#3b82f6"
                            maximumTrackTintColor="#e5e7eb"
                        />
                    </View>

                    <View className="flex-row gap-3">
                        <Pressable
                            onPress={onClose}
                            className="flex-1 bg-gray-300 rounded-lg py-3 items-center active:bg-gray-400"
                        >
                            <Text className="font-bold text-gray-700">Cancel</Text>
                        </Pressable>

                        <Pressable
                            onPress={handleSave}
                            className="flex-1 bg-blue-500 rounded-lg py-3 items-center active:bg-blue-600"
                        >
                            <Text className="font-bold text-white">Save</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    );
}