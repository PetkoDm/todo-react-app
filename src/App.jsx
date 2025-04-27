import TodoApp from './components/TodoApp';

function App() {
  return (
    <div className="min-h-screen p-6 bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Todo App</h1>
      <TodoApp />
    </div>
  );
}

export default App;
