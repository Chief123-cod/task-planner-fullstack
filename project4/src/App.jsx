import { useState, useEffect } from 'react';
import './index.css';

import {
    fetchTasks,
    addTask,
    toggleTaskStatus,
    deleteTask,
    fetchCategories,
    addCategory,
    deleteCategory,
} from './services/api';

import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import CategoryModal from './components/CategoryModal';

function App() {
    const [tasks, setTasks] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    const loadInitialData = async () => {
        try {
            const [tasksData, categoriesData] = await Promise.all([
                fetchTasks(),
                fetchCategories(),
            ]);
            setTasks(tasksData);
            setCategories(categoriesData);
            if (categoriesData.length > 0 && !selectedCategory) {
                setSelectedCategory(categoriesData[0].id);
            }
        } catch (err) {
            console.error('Error memuat data:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadInitialData();
    }, []);

    // Handlers
    const handleAddTask = async (title) => {
        await addTask(title, selectedCategory);
        const updatedTasks = await fetchTasks();
        setTasks(updatedTasks);
    };

    const handleToggleTask = async (id, status) => {
        await toggleTaskStatus(id, status);
        const updatedTasks = await fetchTasks();
        setTasks(updatedTasks);
    };

    const handleDeleteTask = async (id) => {
        await deleteTask(id);
        const updatedTasks = await fetchTasks();
        setTasks(updatedTasks);
    };

    const handleAddCategory = async (name, color) => {
        const res = await addCategory(name, color);
        const updatedCats = await fetchCategories();
        setCategories(updatedCats);
        setSelectedCategory(res.id);
    };

    const handleDeleteCategory = async (id) => {
        if (!window.confirm('Yakin ingin menghapus kategori ini?')) return;
        await deleteCategory(id);
        const updatedCats = await fetchCategories();
        setCategories(updatedCats);
        const updatedTasks = await fetchTasks();
        setTasks(updatedTasks);
        if (selectedCategory == id) {
            setSelectedCategory(
                updatedCats.length > 0 ? updatedCats[0].id : '',
            );
        }
    };

    return (
        <div className='min-h-screen bg-gray-50 p-8 font-sans'>
            <div className='max-w-2xl mx-auto'>
                <div className='mb-8'>
                    <h1 className='text-3xl font-bold text-gray-800'>
                        Task Planner
                    </h1>
                    <p className='text-gray-500'>
                        Proyek Latihan Fullstack React + Tailwind + MySQL
                    </p>
                </div>

                <TaskForm
                    categories={categories}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                    onAddTask={handleAddTask}
                    onOpenModal={() => setIsCategoryModalOpen(true)}
                />

                <TaskList
                    tasks={tasks}
                    loading={loading}
                    onToggle={handleToggleTask}
                    onDelete={handleDeleteTask}
                />

                <CategoryModal
                    isOpen={isCategoryModalOpen}
                    onClose={() => setIsCategoryModalOpen(false)}
                    categories={categories}
                    onAddCategory={handleAddCategory}
                    onDeleteCategory={handleDeleteCategory}
                />
            </div>
        </div>
    );
}

export default App;
