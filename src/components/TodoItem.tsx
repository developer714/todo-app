import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { removeTodo, updateTodo } from "../store/todoSlice";

interface TodoItemProps {
  id: number;
  car: string;
  lawn: string;
  washing: string;
  handleCheck: (id: number, checked: boolean) => void;
  checked?: boolean;
}

const TodoItem: React.FC<TodoItemProps> = ({
  id,
  car,
  lawn,
  washing,
  checked,
  handleCheck,
}) => {
  const dispatch = useDispatch();
  const carRef = useRef<HTMLInputElement>(null);
  const lawnRef = useRef<HTMLInputElement>(null);
  const washingRef = useRef<HTMLInputElement>(null);

  const [carText, setCarText] = useState(car);
  const [lawnText, setLawnText] = useState(lawn);
  const [washingText, setWashingText] = useState(washing);

  const [edit, setEdit] = useState<boolean>(false);

  const handleRemove = () => {
    dispatch(removeTodo(id));
  };

  const handleSave = () => {
    updateTodo({ id, car: carText, lawn: lawnText, washing: washingText });
    setEdit(false);
  };

  return (
    <tr>
      <td>
        <input
          value={id}
          type="checkbox"
          checked={checked ?? false}
          onChange={(e) => handleCheck(id, e.target.checked)}
        />
      </td>
      <td>
        {edit ? (
          <input
            value={carText}
            onChange={(e) => setCarText(e.target.value)}
            ref={carRef}
          />
        ) : (
          car
        )}
      </td>
      <td>
        {edit ? (
          <input
            value={lawnText}
            onChange={(e) => setLawnText(e.target.value)}
            ref={lawnRef}
          />
        ) : (
          lawn
        )}
      </td>
      <td>
        {edit ? (
          <input
            value={washingText}
            onChange={(e) => setWashingText(e.target.value)}
            ref={washingRef}
          />
        ) : (
          washing
        )}
      </td>
      <td>
        <button
          type="button"
          onClick={() => {
            if (edit) {
              handleSave();
            } else {
              setEdit(true);
            }
          }}
        >
          {edit ? "Save" : "Edit"}
        </button>
        <button
          type="button"
          onClick={() => {
            if (edit) {
              setEdit(false);
            } else {
              handleRemove();
            }
          }}
        >
          {edit ? "Cancel" : "Delete"}
        </button>
      </td>
    </tr>
  );
};

export default TodoItem;
