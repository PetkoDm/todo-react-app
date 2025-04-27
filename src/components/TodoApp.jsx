import { useState, useEffect } from 'react';

export default function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);
  const [filterUser, setFilterUser] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then(response => response.json())
      .then(data => setTodos(data));
  }, []);

  const handleComplete = (todo) => {
    setTodos(todos.filter(t => t.id !== todo.id));
    setCompletedTodos([...completedTodos, { ...todo, completedAt: new Date() }]);
  };

  const handleUncomplete = (todo) => {
    setCompletedTodos(completedTodos.filter(t => t.id !== todo.id));
    setTodos([...todos, { ...todo, completed: false }]);
  };

  const filteredTodos = todos
    .filter(todo => (filterUser ? todo.userId === Number(filterUser) : true))
    .sort((a, b) => sortOrder === 'asc' ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title));

  const filteredCompleted = completedTodos
    .filter(todo => (filterUser ? todo.userId === Number(filterUser) : true));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <h2 className="text-2xl font-semibold mb-4 text-center text-indigo-700">Uncompleted Todos</h2>
        <div className="flex gap-4 mb-6 justify-center">
          <select onChange={(e) => setFilterUser(e.target.value)} className="p-2 border rounded">
            <option value="">All Users</option>
            {[...Array(10)].map((_, i) => (
              <option key={i+1} value={i+1}>{i+1}</option>
            ))}
          </select>
          <select onChange={(e) => setSortOrder(e.target.value)} className="p-2 border rounded">
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
        <div className="flex flex-col gap-3">
          {filteredTodos.map(todo => (
            <div key={todo.id} className="bg-white shadow rounded-lg p-4 flex justify-between items-center hover:bg-indigo-50 transition">
              <span className="font-medium">{todo.title}</span>
              <button onClick={() => handleComplete(todo)} className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded">Complete</button>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4 text-center text-green-700">Completed Todos</h2>
        <div className="flex flex-col gap-3">
          {filteredCompleted.map(todo => (
            <div key={todo.id} className="bg-white shadow rounded-lg p-4 flex flex-col hover:bg-green-50 transition">
              <div className="flex justify-between items-center">
                <span className="font-medium line-through">{todo.title}</span>
                <button onClick={() => handleUncomplete(todo)} className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-1 rounded">Uncomplete</button>
              </div>
              <small className="text-gray-500 mt-2">Completed at: {todo.completedAt?.toLocaleString()}</small>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
