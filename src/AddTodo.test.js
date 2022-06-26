import { render, screen, fireEvent} from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import App from './App';

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});


 test('test that App component doesn\'t render duplicate Task', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole('button', {name: /Add/i});
  const dueDate = "05/30/2023";

  for (let i = 0; i < 2; i++) {
    fireEvent.change(inputTask, { target: { value: "History Test"}});
    fireEvent.change(inputDate, { target: { value: dueDate}});
    fireEvent.click(element);
  };

  const check = screen.getByText(/History Test/i);
  expect(check).toBeInTheDocument();

  const checkDate = screen.getByText(new RegExp(new Date(dueDate).toLocaleDateString(), "i"));
  expect(checkDate).toBeInTheDocument();
 });


 test('test that App component doesn\'t add a task without task name', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole('button', {name: /Add/i});
  const dueDate = "05/30/2023";

  fireEvent.change(inputTask, { target: { value: ""}});
  fireEvent.change(inputDate, { target: { value: dueDate}});
  fireEvent.click(element);

  const check = screen.getByText(/You have no todo's left/i);
  expect(check).toBeInTheDocument();
 });


 test('test that App component doesn\'t add a task without due date', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole('button', {name: /Add/i});

  fireEvent.change(inputTask, { target: { value: /History Test/i}});
  fireEvent.change(inputDate, { target: { value: ""}});
  fireEvent.click(element);

  const check = screen.getByText(/You have no todo's left/i);
  expect(check).toBeInTheDocument();
 });


 test('test that App component can be deleted thru checkbox', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole('button', {name: /Add/i});
  const dueDate = "05/30/2023";

  fireEvent.change(inputTask, { target: { value: "History Test"}});
  fireEvent.change(inputDate, { target: { value: dueDate}});
  fireEvent.click(element);

  const check = screen.getByText(/History Test/i);
  expect(check).toBeInTheDocument();

  const checkDate = screen.getByText(new RegExp(new Date(dueDate).toLocaleDateString(), "i"));
  expect(checkDate).toBeInTheDocument();

  const checkbox = screen.getByRole('checkbox');
  fireEvent.click(checkbox);

  const checkDeleted = screen.getByText(/You have no todo's left/i);
  expect(checkDeleted).toBeInTheDocument();
 });


 test('test that App component renders different colors for past due events', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole('button', {name: /Add/i});
  const dueDate = "05/30/2021";
  
  fireEvent.change(inputTask, { target: { value: "History Test"}});
  fireEvent.change(inputDate, { target: { value: dueDate}});
  fireEvent.click(element);

  const check = screen.getByText(/History Test/i);
  expect(check).toBeInTheDocument();

  const checkDate = screen.getByText(new RegExp(new Date(dueDate).toLocaleDateString(), "i"));
  expect(checkDate).toBeInTheDocument();

  const checkColor = screen.getByTestId(/History Test/i).style.background;
  expect(checkColor).toBe("rgb(255, 255, 0)");
 });
