/*App name: Border Collie
Description: This is an app for creating focus sessions and ensuring accountability with regular check-ins and progress reporting.
Author: Thomas Olson, with code from Claude AI and ChatGPT.
Created on: 5/3/2026
Last updated: 6/8/2026*/

import { Link } from 'expo-router';
import React, { useContext } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { TaskCard } from '../components/TaskCard';
import { TaskContext } from '../context/TaskContext';

export default function TaskListScreen() {
  const { tasks, deleteTask } = useContext(TaskContext);

  return (
    <View className="flex-1 bg-gray-50">
      <ScrollView className="flex-1 p-4">
        {tasks.length === 0 ? (
          <View className="flex-1 justify-center items-center py-12">
            <Text className="text-gray-400 text-lg">No tasks yet</Text>
            <Text className="text-gray-400 text-sm mt-2">
              Add one to get started!
            </Text>
          </View>
        ) : (
          <View>
            {tasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </View>
        )}
      </ScrollView>

      {/* Add Task Button */}
      <View className="p-4 border-t border-gray-200 bg-white">
        <Link href="/task-form" asChild>
          <Pressable className="bg-blue-500 rounded-lg py-4 items-center active:bg-blue-600">
            <Text className="text-white font-bold text-lg">+ Add Task</Text>
          </Pressable>
        </Link>
      </View>
    </View>
  );
}