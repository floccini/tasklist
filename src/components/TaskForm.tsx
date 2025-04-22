import { AddIcon } from "@chakra-ui/icons";
import { Flex, IconButton, Input } from "@chakra-ui/react";
import React from "react";
import { ChangeEvent } from "react";

interface TaskFormProps {
  value: string;
  createTask: () => void;
  changeInput: (e: ChangeEvent<HTMLInputElement>) => void;
}
export const TaskForm = ({ value, createTask, changeInput }: TaskFormProps) => {
  return (
    <Flex w="full" alignItems="center" justifyContent="space-between" gap={2}>
      <Input placeholder="Nova tarefa" value={value} onChange={changeInput} />
      <IconButton
        aria-label="Create task"
        onClick={createTask}
        colorScheme="teal"
        icon={<AddIcon />}
      />
    </Flex>
  );
};