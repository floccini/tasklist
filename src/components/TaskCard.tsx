import { Card, CardBody, Checkbox, IconButton, Text } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import React from "react";
import { ScaleFade } from "@chakra-ui/react"; // Certifique-se de que está importando ScaleFade corretamente

interface TaskCardProps {
  id: string;
  status: boolean;
  label: string;
  taskChangeStatus: () => void;
  removeTask: () => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({
  id,
  status,
  taskChangeStatus,
  removeTask,
  label,
}) => {
  return (
    <ScaleFade initialScale={0.9} in={true}>
      <>
        <Card w="full" bg={status ? "blackAlpha.300" : ""}>
          <CardBody
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Checkbox
              w="full"
              id={id}
              onChange={taskChangeStatus}
              isChecked={status}
            >
              <Text as={status ? "del" : "b"}>{label}</Text>
            </Checkbox>
            <IconButton
              aria-label="delete task"
              variant="ghost"
              colorScheme="red"
              icon={<DeleteIcon />}
              onClick={removeTask}
            />
          </CardBody>
        </Card>
      </>
    </ScaleFade>
  );
};