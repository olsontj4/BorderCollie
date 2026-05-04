import '@/global.css';
import { Stack } from 'expo-router';
import React from 'react';
import { TaskProvider } from '../context/TaskContext';

export default function RootLayout() {
  return (
    <TaskProvider>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: '#f3f4f6',
          },
          headerTintColor: '#1f2937',
          headerTitleStyle: {
            fontWeight: '600',
          },
          headerShadowVisible: true,
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            title: 'Border Collie',
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="task-details"
          options={{
            title: 'Task Details',
            presentation: 'modal',
          }}
        />
        <Stack.Screen
          name="timer"
          options={{
            title: 'Focus Timer',
            headerBackVisible: false,
          }}
        />
      </Stack>
    </TaskProvider>
  );
}