import React, { useEffect, useState } from "react";
import { Button, ButtonProps, Checkbox, Modal } from "@mantine/core";
import { Motion } from "react-motion";
import DemoDashboard from "..";
import useList from "../../../hooks/List";
import AutoModal from "../../../organisms/ButtonModal";

const listConfiguration = {
  name: "TodoList",
};

interface BaseList {
  _id: string;
}
interface List extends BaseList {
  title: string;
  completed: boolean;
  date: string;
  priority?: number;
}

const Tasks = () => {
  const { allList, addItem, updateItem } = useList<List>(listConfiguration);

  const handleAddItem = () => {
    addItem({
      completed: false,
      date: Date.now().toString(),
      title: "Task Example (1)",
      priority: 1,
    });
  };

  const handleUpdateItem = (item: List) => {
    updateItem({ ...item, completed: !item.completed });
  };

  return (
    <div className="space-y-3 flex flex-col w-full m-auto">
      <DemoDashboard.Item title="Your tasks">
        <p>
          this is an Example of how works a Todo List bust using diferent
          patterns and I will explain why, ofcourse it will come with code and
          how it is done.
        </p>
        <div className="space-x-2">
          <Button onClick={handleAddItem}>Create one</Button>
          <AutoModal title="Add your new task" buttonTitle="Add new Task">
            <div>
              <h4>Form for it</h4>
              <Button onClick={handleAddItem}>Create one</Button>
            </div>
          </AutoModal>
        </div>
      </DemoDashboard.Item>
      <DemoDashboard.Item title="How its done?">
        <p>Please click one to toggle active or not your tasks</p>
        <div className="grid grid-cols-4 gap-4">
          {allList.map((item) => (
            <TaskCard
              key={item._id}
              list={item}
              onToggleComplete={handleUpdateItem}
            />
          ))}
        </div>
      </DemoDashboard.Item>
    </div>
  );
};

interface CardProps {
  list: List;
  onToggleComplete: (item: List) => void;
}

const TaskCard = ({ list, onToggleComplete }: CardProps) => {
  const { title, completed, date } = list;
  const baseClass = `p-4 object-center wrapper-task-card rounded row ${
    completed ? "task-card-completed" : ""
  }`;
  return (
    <div className={baseClass} onClick={() => onToggleComplete(list)}>
      <div>
        <p>{title}</p>
        <p className="text-xs">{new Date(date).toLocaleString("es-MX")}</p>
      </div>
      <Checkbox className="ml-auto" checked={completed} />
    </div>
  );
};

export default Tasks;
