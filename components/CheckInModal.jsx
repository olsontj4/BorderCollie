/*CheckInModal.jsx
Popup to check in on task focus.
If a contact is specified, the user has one minute to acknowledge popup or contact is notified that the user needs motivation.
If no contact is specified, only a button to acknowledge is displayed.*/
import { useEffect, useState } from 'react';
import { Modal, Pressable, Text, View } from 'react-native';

export function CheckInModal({
    visible,
    onClose,
    onFail,
    hasContact = false,
}) {
    const [seconds, setSeconds] = useState(60);

    useEffect(() => {
        if (!visible || !hasContact) return;

        setSeconds(60);

        const interval = setInterval(() => {
            setSeconds(prev => {
                if (prev <= 1) {
                    clearInterval(interval);
                    onFail?.();
                    onClose?.();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [visible, hasContact]);

    const mm = String(Math.floor(seconds / 60)).padStart(2, '0');
    const ss = String(seconds % 60).padStart(2, '0');

    return (
        <Modal transparent visible={visible} animationType="fade">
            <View className="flex-1 justify-center items-center bg-black/50">
                <View className="bg-white rounded-2xl p-6 w-4/5 shadow-lg">

                    <Text className="text-2xl font-bold text-center mb-2 text-gray-900">
                        Border Collie!
                    </Text>

                    <Text className="text-center text-gray-600 mb-6">
                        Are you staying focused?
                    </Text>

                    {/* CASE 1: With contact (full check-in system) */}
                    {hasContact ? (
                        <View className="flex-row gap-3">

                            <Pressable
                                onPress={onClose}
                                className="flex-1 bg-blue-500 active:bg-blue-600 rounded-xl py-4 items-center"
                            >
                                <Text className="text-white font-bold">
                                    Yes ({mm}:{ss})
                                </Text>
                            </Pressable>

                            <Pressable
                                onPress={() => {
                                    onFail?.();
                                    onClose?.();
                                }}
                                className="flex-1 bg-gray-500 active:bg-gray-600 rounded-xl py-4 items-center"
                            >
                                <Text className="text-white font-bold">
                                    Help Me
                                </Text>
                            </Pressable>

                        </View>
                    ) : (
                        /* CASE 2: No contact (simple confirm) */
                        <Pressable
                            onPress={onClose}
                            className="bg-blue-500 active:bg-blue-600 rounded-xl py-4 items-center"
                        >
                            <Text className="text-white font-bold text-base">
                                Yes
                            </Text>
                        </Pressable>
                    )}

                </View>
            </View>
        </Modal>
    );
}