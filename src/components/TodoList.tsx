import React, { useState, useRef } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { addTodo, removeTodo } from "../store/todoSlice";
import TodoItem from "./TodoItem";

const TodoList: React.FC = () => {
  const todos = useSelector((state: RootState) => state.todo.todos);
  const dispatch = useDispatch();
  const [selected, setSelected] = useState<number[]>([]);
  const carRef = useRef<HTMLInputElement>(null);
  const lawnRef = useRef<HTMLInputElement>(null);
  const washingRef = useRef<HTMLInputElement>(null);
  const [carText, setCarText] = useState("");
  const [lawnText, setLawnText] = useState("");
  const [washingText, setWashingText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (carText.trim() && lawnText.trim() && washingText.trim()) {
      dispatch(
        addTodo({
          id: Date.now(),
          car: carText,
          lawn: lawnText,
          washing: washingText,
        })
      );
      setCarText("");
      setLawnText("");
      setWashingText("");
      carRef.current?.focus();
    } else {
      if (carText.trim() === "") {
        carRef.current?.focus();
      } else if (lawnText.trim() === "") {
        lawnRef.current?.focus();
      } else if (washingText.trim() === "") {
        washingRef.current?.focus();
      }
    }
  };

  const handleCheckedAllRemove = () => {
    selected.forEach((id) => dispatch(removeTodo(id)));
    setSelected([]);
    carRef.current?.focus();
  };

  const handleReset = () => {
    setCarText("");
    setLawnText("");
    setWashingText("");
    carRef.current?.focus();
    setSelected([]);
  };

  return (
    <form onSubmit={handleSubmit} onReset={handleReset}>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Wash the car</th>
            <th>Mow the lawn</th>
            <th>Do the washing-up </th>
            <th align="left">
              <button
                type="button"
                style={{ width: 200 }}
                onClick={handleCheckedAllRemove}
              >
                Remove(Checked)
              </button>
            </th>
          </tr>
          <tr>
            <td>
              <input
                type="checkbox"
                disabled={todos.length === 0}
                checked={todos.length > 0 && selected.length === todos.length}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelected(todos.map((todo) => todo.id));
                  } else {
                    setSelected([]);
                  }
                }}
              />
            </td>
            <td width={200}>
              <input
                ref={carRef}
                type="text"
                value={carText}
                onChange={(e) => setCarText(e.target.value)}
                placeholder="Add a new Car"
              />
            </td>
            <td width={200}>
              <input
                ref={lawnRef}
                type="text"
                value={lawnText}
                onChange={(e) => setLawnText(e.target.value)}
                placeholder="Add a new Lawn"
              />
            </td>
            <td width={200}>
              <input
                ref={washingRef}
                type="text"
                value={washingText}
                onChange={(e) => setWashingText(e.target.value)}
                placeholder="Add a new Washing"
              />
            </td>
            <td width={300}>
              <button type="submit">Add</button>
              <button type="reset">Clear</button>
            </td>
          </tr>
        </thead>
        <tbody>
          {todos.length === 0 ? (
            <tr>
              <td colSpan={5}>No todos available</td>
            </tr>
          ) : (
            todos.map((todo) => (
              <TodoItem
                key={todo.id}
                id={todo.id}
                car={todo.car}
                lawn={todo.lawn}
                washing={todo.washing}
                checked={selected.includes(todo.id)}
                handleCheck={(id, checked) => {
                  if (checked) {
                    setSelected([...selected, id]);
                  } else {
                    setSelected(selected.filter((s) => s !== id));
                  }
                }}
              />
            ))
          )}
        </tbody>
      </table>
    </form>
  );
};

export default TodoList;
