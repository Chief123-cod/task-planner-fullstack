import { useState } from 'react';

function TaskForm({
    categories,
    selectedCategory,
    setSelectedCategory,
    onAddTask,
    onOpenModal,
}) {
    const [newTitle, setNewTitle] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!newTitle.trim()) return;
        onAddTask(newTitle);
        setNewTitle('');
    };

    return (
        <form
            onSubmit={handleSubmit}
            className='bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6 flex flex-col sm:flex-row gap-2'
        >
            <input
                type='text'
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder='Tambahkan tugas baru...'
                className='flex-1 px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800'
            />

            <div className='flex gap-1'>
                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className='px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer text-sm'
                >
                    <option value=''>Tanpa Kategori</option>
                    {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                            {cat.name}
                        </option>
                    ))}
                </select>

                <button
                    type='button'
                    onClick={onOpenModal}
                    className='px-3 py-2 bg-gray-100 text-gray-700 hover:bg-gray-200 font-medium rounded-lg text-sm transition'
                    title='Kelola Kategori'
                >
                    ⚙️
                </button>
            </div>

            <button
                type='submit'
                className='px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition'
            >
                Tambah
            </button>
        </form>
    );
}

export default TaskForm;
