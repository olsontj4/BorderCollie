import { useEffect, useState } from 'react';
import { Pressable, Text, View } from 'react-native';

export function TimerDisplay({
    initialSeconds = 1500,
    onTick = () => { },
    onComplete = () => { }
}) {
    const [secondsLeft, setSecondsLeft] = useState(initialSeconds);
    const [isRunning, setIsRunning] = useState(false);

    // Timer effect
    useEffect(() => {
        let interval;

        if (isRunning && secondsLeft > 0) {
            interval = setInterval(() => {
                setSecondsLeft(prev => {
                    const newValue = prev - 1;
                    onTick(newValue);

                    if (newValue === 0) {
                        setIsRunning(false);
                        onComplete();
                    }

                    return newValue;
                });
            }, 1000);
        }

        return () => clearInterval(interval);
    }, [isRunning, secondsLeft, onTick, onComplete]);

    // Format time as MM:SS
    const minutes = Math.floor(secondsLeft / 60);
    const seconds = secondsLeft % 60;
    const displayTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    const toggleTimer = () => {
        setIsRunning(!isRunning);
    };

    const resetTimer = () => {
        setIsRunning(false);
        setSecondsLeft(initialSeconds);
    };

    return (
        <View className="items-center justify-center">
            <Text className="text-6xl font-bold text-gray-900 font-mono mb-8">
                {displayTime}
            </Text>

            <View className="flex-row gap-4">
                <Pressable
                    onPress={toggleTimer}
                    className="rounded-lg px-8 py-3"
                    className={`${isRunning
                        ? 'bg-gray-500 active:bg-gray-600'
                        : 'bg-blue-500 active:bg-blue-600'
                        } rounded-lg px-8 py-3`}
                >
                    <Text className="text-white font-bold text-lg">
                        {isRunning ? 'Pause' : 'Start'}
                    </Text>
                </Pressable>

                <Pressable
                    onPress={resetTimer}
                    className="bg-red-500 rounded-lg px-8 py-3 active:bg-red-600"
                >
                    <Text className="text-white font-bold text-lg">Reset</Text>
                </Pressable>
            </View>
        </View>
    );
}