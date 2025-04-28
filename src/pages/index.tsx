import { Alert } from '@/components/Alert';
import { TaskCard } from '@/components/TaskCard';
import { TaskForm } from '@/components/TaskForm';
import { Divider, Flex, Stack, Text, useToast } from '@chakra-ui/react';
import React from 'react';
import { ChangeEvent, useState } from 'react';

import { v4 as uuidv4 } from 'uuid';

interface TaskProps {
  id: string;
  label: string;
  isCompleted: boolean;
}

function App() {
  const [tasks, setTasks] = useState<TaskProps[]>([]); // array de todas as tasks
  const [taskInput, setTaskInput] = useState(''); // controlar o estado do componente input

  const toast = useToast();

  const openTasks = tasks.filter((task) => task.isCompleted === false);
  const completedTasks = tasks.filter((task) => task.isCompleted === true);

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    // changeEventdoTypescript(tipagem)
    setTaskInput(e.currentTarget.value); // atualizar o estado do componente
  };

  const handleCreateTask = () => {
    if (!taskInput.trim()) {
      return toast({
        title: 'Erro',
        description: 'Digite uma tarefa válida.',
        status: 'error',
        duration: 3000,
        position: 'top-right',
        isClosable: true,
      });
    }
    // função de criação
    const newTask = { id: uuidv4(), label: taskInput, isCompleted: false };
    setTasks((tarefas) => [...tarefas, newTask]);
    setTaskInput('');
  };

  const handleExcluirTask = (id: string) => {
    const novasTarefasDepoisDeExcluir = tasks.filter((task) => task.id !== id);
    setTasks(novasTarefasDepoisDeExcluir); // se a tarefa do id for diferente da tarefa do id por parametro, devolve o array de tasks sem o id do parametro
  };

  const handleToggleTaskStatus = (id: string, isCompleted: boolean) => {
    toggleTaskStatus(id, isCompleted);
  };

  const toggleTaskStatus = (id: string, isCompleted: boolean) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id ? { ...task, isCompleted } : task
      )
    );
  };

  const renderTaskCards = (
    tasks: TaskProps[],
    onStatusChange: (id: string) => void
  ) => {
    return tasks.map((task) => (
      <TaskCard
        key={task.id}
        id={task.id}
        label={task.label}
        isCompleted={task.isCompleted}
        removeTask={() => handleExcluirTask(task.id)}
        taskChangeStatus={() => onStatusChange(task.id)}
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
          renderTaskCards(openTasks, (id) => handleToggleTaskStatus(id, true))
        ) : (
          <Alert
            status="success"
            title="Parabéns!"
            description="Você completou todas as tarefas."
          />
        )}

        <Divider />

        <Text fontWeight="bold" textAlign="left" w="full">
          Completadas
        </Text>

        {completedTasks.length !== 0 ? (
          renderTaskCards(completedTasks, (id) =>
            handleToggleTaskStatus(id, false)
          )
        ) : (
          <Alert status="info" title="Nenhuma tarefa completa" />
        )}
      </Flex>
    </Stack>
  );
}

export default App;