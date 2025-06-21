import React, { useState, useEffect } from 'react';

// Mock data for employees and admin.
const mockUsers = [
  {
    id: 1,
    name: 'Aryan',
    email: 'admin@gmail.com',
    password: 'password123',
    role: 'admin',
    department: 'Management'
  },
  {
    id: 2,
    name: 'Priya Sharma',
    email: 'employee1@gmail.com',
    password: 'employee1',
    role: 'employee',
    department: 'Marketing'
  },
  {
    id: 3,
    name: 'Vikram Singh',
    email: 'employee2@gmail.com',
    password: 'employee2',
    role: 'employee',
    department: 'Development'
  },
  {
    id: 4,
    name: 'Ananya Patel',
    email: 'employee3@gmail.com',
    password: 'employee3',
    role: 'employee',
    department: 'HR'
  },
  {
    id: 5,
    name: 'Arjun Mehta',
    email: 'employee4@gmail.com',
    password: 'employee4',
    role: 'employee',
    department: 'Finance'
  },
  {
    id: 6,
    name: 'Divya Reddy',
    email: 'employee5@gmail.com',
    password: 'employee5',
    role: 'employee',
    department: 'Customer Support'
  },
  {
    id: 7,
    name: 'Karthik Iyer',
    email: 'employee6@gmail.com',
    password: 'employee6',
    role: 'employee',
    department: 'Sales'
  },
  {
    id: 8,
    name: 'Neha Gupta',
    email: 'employee7@gmail.com',
    password: 'employee7',
    role: 'employee',
    department: 'Design'
  },
  {
    id: 9,
    name: 'Suresh Venkat',
    email: 'employee8@gmail.com',
    password: 'employee8',
    role: 'employee',
    department: 'Operations'
  },
  {
    id: 10,
    name: 'Meera Joshi',
    email: 'employee9@gmail.com',
    password: 'employee9',
    role: 'employee',
    department: 'Research'
  },
  {
    id: 11,
    name: 'Aditya Nair',
    email: 'employee10@gmail.com',
    password: 'employee10',
    role: 'employee',
    department: 'Quality Assurance'
  }
];

// Mock tasks data
const mockTasks = [
  {
    id: 1,
    title: 'Complete Q2 Marketing Strategy',
    description: 'Develop and finalize the marketing strategy for Q2 including social media campaigns and email marketing.',
    assignedTo: 2,
    status: { read: false, done: false },
    dueDate: '2025-04-20'
  },
  {
    id: 2,
    title: 'Fix Login Page Bug',
    description: 'There is a critical bug in the login page that needs immediate attention. Users are unable to reset their passwords.',
    assignedTo: 3,
    status: { read: true, done: false },
    dueDate: '2025-04-15'
  },
  {
    id: 3,
    title: 'Conduct Employee Satisfaction Survey',
    description: 'Create and distribute an employee satisfaction survey to gather feedback on company culture and work environment.',
    assignedTo: 4,
    status: { read: true, done: true },
    dueDate: '2025-04-12'
  },
  {
    id: 4,
    title: 'Prepare Monthly Financial Report',
    description: 'Compile and analyze financial data for the monthly report to be presented to stakeholders.',
    assignedTo: 5,
    status: { read: false, done: false },
    dueDate: '2025-04-30'
  },
  {
    id: 5,
    title: 'Resolve Customer Complaints',
    description: 'Address the backlog of customer complaints and provide timely responses to improve customer satisfaction.',
    assignedTo: 6,
    status: { read: true, done: false },
    dueDate: '2025-04-11'
  }
];

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [users, setUsers] = useState(mockUsers);
  const [tasks, setTasks] = useState(mockTasks);
  const [newEmployee, setNewEmployee] = useState({
    name: '',
    email: '',
    password: '',
    department: ''
  });
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    assignedTo: 0,
    dueDate: ''
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false);

//login handle:

  const handleLogin = (e) => {
    e.preventDefault();
    const user = users.find(user => user.email === email && user.password === password);
    
    if (user) {
      setCurrentUser(user);
      setIsLoggedIn(true);
      setLoginError('');
    } else {
      setLoginError('Invalid email or password');
    }
  };
//logout handle:
  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    setEmail('');
    setPassword('');
  };
  
// task management:
  const updateTaskStatus = (taskId, statusType) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === taskId) {
        return {
          ...task,
          status: {
            ...task.status,
            [statusType]: !task.status[statusType]
          }
        };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const addEmployee = (e) => {
    e.preventDefault();
    const employeeCount = users.filter(user => user.role === 'employee').length;
    const newId = users.length + 1;
    const employee = {
      id: newId,
      name: newEmployee.name,
      email: `employee${employeeCount + 1}@gmail.com`,
      password: newEmployee.password,
      role: 'employee',
      department: newEmployee.department
    };
    setUsers([...users, employee]);
    setNewEmployee({
      name: '',
      email: '',
      password: '',
      department: ''
    });
  };

  const addTask = (e) => {
    e.preventDefault();
    const newId = tasks.length + 1;
    const task = {
      id: newId,
      title: newTask.title,
      description: newTask.description,
      assignedTo: newTask.assignedTo,
      status: { read: false, done: false },
      dueDate: newTask.dueDate
    };
    setTasks([...tasks, task]);
    setNewTask({
      title: '',
      description: '',
      assignedTo: 0,
      dueDate: ''
    });
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const getEmployeeTasks = (employeeId) => {
    return tasks.filter(task => task.assignedTo === employeeId);
  };

  const getEmployeeName = (id) => {
    const employee = users.find(user => user.id === id);
    return employee ? employee.name : 'Unknown';
  };

  const getTaskStats = () => {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.status.done).length;
    const pendingTasks = totalTasks - completedTasks;
    
    return {
      totalTasks,
      completedTasks,
      pendingTasks
    };
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="px-8 py-6 bg-gradient-to-r from-blue-600 to-indigo-700 text-white text-center">
            <h1 className="text-3xl font-bold">EMS Portal</h1>
            <p className="mt-2">Employee Management System</p>
          </div>
          
          <div className="p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Login to your account</h2>
            
            {loginError && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
                {loginError}
              </div>
            )}
            
            <form onSubmit={handleLogin}>
              <div className="mb-5">
                <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-2">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i className="fas fa-envelope text-gray-400"></i>
                  </div>
                  <input
                    id="email"
                    type="email"
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <label htmlFor="password" className="block text-gray-700 text-sm font-medium mb-2">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i className="fas fa-lock text-gray-400"></i>
                  </div>
                  <input
                    id="password"
                    type="password"
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    placeholder="Enter your Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-2 px-4 rounded-lg hover:from-blue-700 hover:to-indigo-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200 !rounded-button whitespace-nowrap cursor-pointer"
              >
                Sign In
              </button>
            </form>
            
            {/* <div className="mt-6 text-center text-sm text-gray-500">
              <p>Use demo credentials:</p>
              <p className="mt-1">Admin: admin@gmail.com / password123</p>
              <p className="mt-1">Employee: employee1@gmail.com / employee1</p>
            </div>  */}
          </div>
        </div>
      </div>
    );
  }

  if (currentUser.role === 'employee') {
    const employeeTasks = getEmployeeTasks(currentUser.id);

    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <h1 className="text-xl font-bold text-blue-600">EMS Portal</h1>
                </div>
              </div>
              
              <div className="hidden md:block">
                <div class свернуть="flex items-center">
                  <span className="text-gray-700 mr-4">
                    <i className="fas fa-user-circle mr-2"></i>
                    {currentUser.name}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition duration-200 !rounded-button whitespace-nowrap cursor-pointer"
                  >
                    <i className="fas fa-sign-out-alt mr-2"></i>
                    Logout
                  </button>
                </div>
              </div>
              
              <div className="md:hidden">
                <button
                  onClick={toggleMenu}
                  className="text-gray-700 hover:text-gray-900 focus:outline-none"
                >
                  <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
                </button>
              </div>
            </div>
          </div>
          
          {isMenuOpen && (
            <div className="md:hidden bg-white border-t border-gray-200 px-4 py-3">
              <div className="flex flex-col space-y-3">
                <span className="text-gray-700">
                  <i className="fas fa-user-circle mr-2"></i>
                  {currentUser.name}
                </span>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition duration-200 !rounded-button whitespace-nowrap cursor-pointer"
                >
                  <i className="fas fa-sign-out-alt mr-2"></i>
                  Logout
                </button>
              </div>
            </div>
          )}
        </header>
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white shadow-sm rounded-lg p-6 mb-8">
            <div className="md:flex md:items-center md:justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Welcome, {currentUser.name}!</h2>
                <p className="mt-1 text-gray-600">Department: {currentUser.department}</p>
              </div>
              <div className="mt-4 md:mt-0">
                <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full">
                  <i className="fas fa-tasks mr-2"></i>
                  <span>{employeeTasks.length} Tasks Assigned</span>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Your Tasks</h3>
            
            {employeeTasks.length === 0 ? (
              <div className="bg-white shadow-sm rounded-lg p-6 text-center">
                <i className="fas fa-check-circle text-green-500 text-4xl mb-3"></i>
                <p className="text-gray-600">You have no tasks assigned at the moment.</p>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {employeeTasks.map((task) => (
                  <div 
                    key={task.id} 
                    className={`bg-white shadow-sm rounded-lg overflow-hidden border-l-4 ${
                      task.status.done ? 'border-green-500' : task.status.read ? 'border-blue-500' : 'border-yellow-500'
                    }`}
                  >
                    <div className="p-5">
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="text-lg font-semibold text-gray-800">{task.title}</h4>
                        <div className="flex space-x-1">
                          {task.status.read ? (
                            <span className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                              <i className="fas fa-eye mr-1"></i> Read
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                              <i className="fas fa-eye-slash mr-1"></i> Unread
                            </span>
                          )}
                          
                          {task.status.done ? (
                            <span className="inline-flex items-center px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                              <i className="fas fa-check mr-1"></i> Done
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
                              <i className="fas fa-clock mr-1"></i> Pending
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <p className="text-gray-600 mb-4">{task.description}</p>
                      
                      <div className="flex items-center text-sm text-gray-500 mb-4">
                        <i className="fas fa-calendar-alt mr-2"></i>
                        <span>Due: {task.dueDate}</span>
                      </div>
                      
                      <div className="flex space-x-2">
                        <button
                          onClick={() => updateTaskStatus(task.id, 'read')}
                          className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 !rounded-button whitespace-nowrap cursor-pointer ${
                            task.status.read
                              ? 'bg-blue-100 text-blue-700 hover:bg-blue-200 focus:ring-blue-500'
                              : 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500'
                          }`}
                        >
                          <i className={`fas ${task.status.read ? 'fa-eye-slash' : 'fa-eye'} mr-1`}></i>
                          {task.status.read ? 'Mark as Unread' : 'Mark as Read'}
                        </button>
                        
                        <button
                          onClick={() => updateTaskStatus(task.id, 'done')}
                          className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 !rounded-button whitespace-nowrap cursor-pointer ${
                            task.status.done
                              ? 'bg-green-100 text-green-700 hover:bg-green-200 focus:ring-green-500'
                              : 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500'
                          }`}
                        >
                          <i className={`fas ${task.status.done ? 'fa-undo' : 'fa-check'} mr-1`}></i>
                          {task.status.done ? 'Mark as Pending' : 'Mark as Done'}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-xl font-bold text-blue-600">EMS Portal</h1>
              </div>
            </div>
            
            <div className="hidden md:block">
              <div className="flex items-center">
                <span className="text-gray-700 mr-4">
                  <i className="fas fa-user-shield mr-2"></i>
                  {currentUser.name} (Admin)
                </span>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition duration-200 !rounded-button whitespace-nowrap cursor-pointer"
                >
                  <i className="fas fa-sign-out-alt mr-2"></i>
                  Logout
                </button>
              </div>
            </div>
            
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="text-gray-700 hover:text-gray-900 focus:outline-none"
              >
                <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
              </button>
            </div>
          </div>
        </div>
        
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 px-4 py-3">
            <div className="flex flex-col space-y-3">
              <span className="text-gray-700">
                <i className="fas fa-user-shield mr-2"></i>
                {currentUser.name} (Admin)
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition duration-200 !rounded-button whitespace-nowrap cursor-pointer"
              >
                <i className="fas fa-sign-out-alt mr-2"></i>
                Logout
              </button>
            </div>
          </div>
        )}
      </header>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white shadow-sm rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800">Admin Dashboard</h2>
          <p className="mt-1 text-gray-600">Manage employees and tasks from one place</p>
        </div>
        
        <div className="grid gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="bg-white shadow-sm rounded-lg p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                <i className="fas fa-users text-xl"></i>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Employees</p>
                <p className="text-2xl font-semibold text-gray-800">{users.filter(user => user.role === 'employee').length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white shadow-sm rounded-lg p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100 text-green-600">
                <i className="fas fa-tasks text-xl"></i>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Tasks</p>
                <p className="text-2xl font-semibold text-gray-800">{getTaskStats().totalTasks}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white shadow-sm rounded-lg p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-teal-100 text-teal-600">
                <i className="fas fa-check-circle text-xl"></i>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Completed Tasks</p>
                <p className="text-2xl font-semibold text-gray-800">{getTaskStats().completedTasks}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white shadow-sm rounded-lg p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-orange-100 text-orange-600">
                <i className="fas fa-clock text-xl"></i>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Pending Tasks</p>
                <p className="text-2xl font-semibold text-gray-800">{getTaskStats().pendingTasks}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid gap-8 md:grid-cols-2">
          <div className="bg-white shadow-sm rounded-lg overflow-hidden">
            <div className="px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
              <h3 className="text-lg font-semibold">Employee Management</h3>
            </div>
            
            <div className="p-6">
              <form onSubmit={addEmployee} className="mb-6">
                <h4 className="text-md font-semibold text-gray-800 mb-4">Add New Employee</h4>
                
                <div className="grid gap-4 mb-4 md:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                      placeholder="John Doe"
                      value={newEmployee.name}
                      onChange={(e) => setNewEmployee({...newEmployee, name: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-sm"
                      placeholder="Will be auto-generated"
                      value={`employee${users.filter(user => user.role === 'employee').length + 1}@gmail.com`}
                      disabled
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                    <input
                      type="password"
                      id="password"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                      placeholder="••••••••"
                      value={newEmployee.password}
                      onChange={(e) => setNewEmployee({...newEmployee, password: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                    <input
                      type="text"
                      id="department"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                      placeholder="Marketing"
                      value={newEmployee.department}
                      onChange={(e) => setNewEmployee({...newEmployee, department: e.target.value})}
                      required
                    />
                  </div>
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200 !rounded-button whitespace-nowrap cursor-pointer"
                >
                  <i className="fas fa-user-plus mr-2"></i>
                  Add Employee
                </button>
              </form>
              
              <div>
                <h4 className="text-md font-semibold text-gray-800 mb-4">Employee List</h4>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tasks</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {users.filter(user => user.role === 'employee').map((employee) => (
                        <tr key={employee.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                                <i className="fas fa-user"></i>
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                                <div className="text-sm text-gray-500">{employee.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                              {employee.department}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {getEmployeeTasks(employee.id).length} tasks
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white shadow-sm rounded-lg overflow-hidden">
            <div className="px-6 py-4 bg-gradient-to-r from-teal-600 to-green-700 text-white">
              <h3 className="text-lg font-semibold">Task Management</h3>
            </div>
            
            <div className="p-6">
              <form onSubmit={addTask} className="mb-6">
                <h4 className="text-md font-semibold text-gray-800 mb-4">Create New Task</h4>
                
                <div className="mb-4">
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Task Title</label>
                  <input
                    type="text"
                    id="title"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-sm"
                    placeholder="Complete quarterly report"
                    value={newTask.title}
                    onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    id="description"
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-sm"
                    placeholder="Detailed description of the task..."
                    value={newTask.description}
                    onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                    required
                  ></textarea>
                </div>
                
                <div className="grid gap-4 mb-4 md:grid-cols-2">
                  <div>
                    <label htmlFor="assignedTo" className="block text-sm font-medium text-gray-700 mb-1">Assign To</label>
                    <div className="relative">
                      <select
                        id="assignedTo"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-sm appearance-none"
                        value={newTask.assignedTo}
                        onChange={(e) => setNewTask({...newTask, assignedTo: parseInt(e.target.value)})}
                        required
                      >
                        <option value="">Select Employee</option>
                        {users.filter(user => user.role === 'employee').map((employee) => (
                          <option key={employee.id} value={employee.id}>{employee.name}</option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <i className="fas fa-chevron-down"></i>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                    <input
                      type="date"
                      id="dueDate"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-sm"
                      value={newTask.dueDate}
                      onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})}
                      required
                    />
                  </div>
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-teal-600 text-white py-2 px-4 rounded-lg hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50 transition duration-200 !rounded-button whitespace-nowrap cursor-pointer"
                >
                  <i className="fas fa-plus-circle mr-2"></i>
                  Create Task
                </button>
              </form>
            
              <div>
                <h4 className="text-md font-semibold text-gray-800 mb-4">Recent Tasks</h4>
                
                <div className="space-y-4">
                  {tasks.slice(0, 5).map((task) => (
                    <div key={task.id} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <h5 className="text-sm font-medium text-gray-800">{task.title}</h5>
                        <div>
                          {task.status.done ? (
                            <span className="inline-flex items-center px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                              <i className="fas fa-check mr-1"></i> Done
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                              <i className="fas fa-clock mr-1"></i> Pending
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <div className="mt-2 text-xs text-gray-500">
                        <span className="inline-block mr-3">
                          <i className="fas fa-user mr-1"></i> {getEmployeeName(task.assignedTo)}
                        </span>
                        <span className="inline-block">
                          <i className="fas fa-calendar-alt mr-1"></i> {task.dueDate}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;