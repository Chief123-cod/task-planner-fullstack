const API_URL = 'https://task-planner-fullstack.vercel.app';

// --- TASKS API ---
export const fetchTasks = async () => {
    const res = await fetch(`${API_URL}/tasks`);
    return res.json();
};

export const addTask = async (title, categoryId) => {
    const res = await fetch(`${API_URL}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, category_id: categoryId || null }),
    });
    return res.json();
};

export const toggleTaskStatus = async (id, currentStatus) => {
    const nextStatus = currentStatus === 'completed' ? 'pending' : 'completed';
    const res = await fetch(`${API_URL}/tasks/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: nextStatus }),
    });
    return res.json();
};

export const deleteTask = async (id) => {
    const res = await fetch(`${API_URL}/tasks/${id}`, { method: 'DELETE' });
    return res.json();
};

// --- CATEGORIES API ---
export const fetchCategories = async () => {
    const res = await fetch(`${API_URL}/categories`);
    return res.json();
};

export const addCategory = async (name, color) => {
    const res = await fetch(`${API_URL}/categories`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, color }),
    });
    return res.json();
};

export const deleteCategory = async (id) => {
    const res = await fetch(`${API_URL}/categories/${id}`, { method: 'DELETE' });
    return res.json();
};