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
              <Link
                key={task.id}
                href={{
                  pathname: '/task-details',
                  params: { taskId: task.id },
                }}
                asChild
              >
                <TaskCard
                  task={task}
                  onPress={() => { }}
                  onDelete={() => deleteTask(task.id)}
                />
              </Link>
            ))}
          </View>
        )}
      </ScrollView>

      {/* Add Task Button */}
      <View className="p-4 border-t border-gray-200 bg-white">
        <Link href="/task-details" asChild>
          <Pressable className="bg-blue-500 rounded-lg py-4 items-center active:bg-blue-600">
            <Text className="text-white font-bold text-lg">+ Add Task</Text>
          </Pressable>
        </Link>
      </View>
    </View>
  );
}