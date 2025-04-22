import { TaskCard } from "@/components/TaskCard";
import { TaskForm } from "@/components/TaskForm";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Divider,
  Flex,
  HStack,
  Stack,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { ChangeEvent, useState } from "react";

import { v4 as uuidv4 } from "uuid";

interface TaskProps {
  id: string;
  label: string;
  status: boolean;
}

function App() {
  const [tasks, setTasks] = useState<TaskProps[]>([]); // array de todas as tasks
  const [taskInput, setTaskInput] = useState(""); // controlar o estado do componente input

  const openTasks = tasks.filter((task) => task.status === false);
  const completedTasks = tasks.filter((task) => task.status === true);

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    // changeEventdoTypescript(tipagem)
    setTaskInput(e.currentTarget.value); // atualizar o estado do componente
  };

  const handleCreateTask = () => {
    // função de criação
    const newTask = { id: uuidv4(), label: taskInput, status: false };
    setTasks((tarefas) => [...tarefas, newTask]);
    setTaskInput("");
  };

  const handleExcluirTask = (id: string) => {
    const novasTarefasDepoisDeExcluir = tasks.filter((task) => task.id !== id);
    setTasks(novasTarefasDepoisDeExcluir); // se a tarefa do id for diferente da tarefa do id por parametro, devolve o array de tasks sem o id do parametro
  };

  const handleTaskCompletada = (id: string) => {
    setTasks((atualTarefas) =>
      atualTarefas.map((tasks) =>
        tasks.id === id ? { ...tasks, status: true } : tasks
      )
    );
  };

  const handleReopenTask = (id: string) => {
    setTasks((atualTarefas) =>
      atualTarefas.map((task) =>
        task.id === id ? { ...task, status: false } : task
      )
    );
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
          openTasks.map((task) => (
            <TaskCard
              key={task.id}
              id={task.id}
              label={task.label}
              status={task.status}
              removeTask={() => handleExcluirTask(task.id)}
              taskChangeStatus={() => handleTaskCompletada(task.id)}
            />
          ))
        ) : (
          <Alert status="success" borderRadius={6}>
            <AlertIcon />
            <Box>
              <AlertTitle>Parabéns!</AlertTitle>
              <AlertDescription>
                Você completou todas as tarefas.
              </AlertDescription>
            </Box>
          </Alert>
        )}

        <Divider />

        <Text fontWeight="bold" textAlign="left" w="full">
          Completadas
        </Text>

        {completedTasks.length !== 0 ? (
          completedTasks.map((task) => (
            <TaskCard
              key={task.id}
              id={task.id}
              label={task.label}
              status={task.status}
              removeTask={() => handleExcluirTask(task.id)}
              taskChangeStatus={() => handleReopenTask(task.id)}
            />
          ))
        ) : (
          <Alert status="info" borderRadius={6}>
            <AlertIcon />
            <Box>
              <AlertTitle>Nenhuma tarefa completa</AlertTitle>
            </Box>
          </Alert>
        )}
      </Flex>
    </Stack>
  );
}

export default App;
