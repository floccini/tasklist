import { TaskCard } from "@/components/TaskCard";
import { TaskForm } from "@/components/TaskForm";
import { Box, Divider, Flex, HStack, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { ChangeEvent, useState } from "react";
import { AlertIcon, AlertIconComponent } from "@/components/AlertIcon";

import { v4 as uuidv4 } from "uuid";

interface TaskProps {
  id: string;
  label: string;
  status: boolean;
}

function App() {
  const [tasks, setTasks] = useState<TaskProps[]>([]);
  const [taskInput, setTaskInput] = useState("");

  const openTasks = tasks.filter((task) => !task.status);
  const completedTasks = tasks.filter((task) => task.status);

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setTaskInput(e.currentTarget.value);
  };

  const handleCreateTask = () => {
    const newTask = { id: uuidv4(), label: taskInput, status: false };
    setTasks((tarefas) => [...tarefas, newTask]);
    setTaskInput("");
  };

  const handleExcluirTask = (id: string) => {
    setTasks((tarefas) => tarefas.filter((task) => task.id !== id));
  };

  const handleTaskCompletada = (id: string) => {
    setTasks((tarefas) =>
      tarefas.map((task) =>
        task.id === id ? { ...task, status: true } : task
      )
    );
  };

  const handleReopenTask = (id: string) => {
    setTasks((tarefas) =>
      tarefas.map((task) =>
        task.id === id ? { ...task, status: false } : task
      )
    );
  };

  const renderTaskCards = (
    tasks: TaskProps[],
    handleExcluirTask: (id: string) => void,
    handleTaskCompletada: (id: string) => void
  ) => {
    return tasks.map((task) => (
      <TaskCard
        key={task.id}
        id={task.id}
        label={task.label}
        status={task.status}
        removeTask={() => handleExcluirTask(task.id)}
        taskChangeStatus={() => handleTaskCompletada(task.id)}
      />
    ));
  };
  

  return (
    <Stack w="full" h="100vh" alignItems="center" flexDirection="column" p={10}>
      <Flex w="full" maxWidth="400" flexDirection="column" gap={4}>
        <Text as="h1" fontSize={30} fontWeight="bold">
          Lista de tarefas
        </Text>

        <TaskForm
          changeInput={handleChangeInput}
          value={taskInput}
          createTask={handleCreateTask}
        />

        <Text fontWeight="bold" textAlign="left" w="full" fontSize={20}>
          Abertas
        </Text>

        {openTasks.length !== 0 ? (
          renderTaskCards(openTasks, handleExcluirTask, handleTaskCompletada)
        ) : (
          <AlertIconComponent
            title="Parabéns!"
            description="Você completou todas as tarefas!"
          />
        )}

        <Divider />

        <Text fontWeight="bold" textAlign="left" w="full">
          Completadas
        </Text>

        {completedTasks.length !== 0 ? (
          renderTaskCards(completedTasks, handleExcluirTask, handleReopenTask)
        ) : (
          <AlertIconComponent title="Nenhuma tarefa completada!" />
        )}
      </Flex>
    </Stack>
  );
}

export default App;
