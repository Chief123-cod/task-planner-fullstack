function TaskItem({ task, onToggle, onDelete }) {
    return (
        <div className='bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition'>
            <div className='flex items-center gap-4'>
                <input
                    type='checkbox'
                    checked={task.status === 'completed'}
                    onChange={() => onToggle(task.id, task.status)}
                    className='w-5 h-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500 cursor-pointer'
                />

                <div>
                    <h3
                        className={`font-medium ${task.status === 'completed' ? 'text-gray-400 line-through' : 'text-gray-800'}`}
                    >
                        {task.title}
                    </h3>
                    {task.category ? (
                        <span
                            className='inline-block mt-1 px-2 py-0.5 text-xs text-white rounded-full font-medium'
                            style={{ backgroundColor: task.color || '#6B7280' }}
                        >
                            {task.category}
                        </span>
                    ) : (
                        <span className='inline-block mt-1 px-2 py-0.5 text-xs text-gray-400 bg-gray-100 rounded-full font-medium'>
                            Tanpa Kategori
                        </span>
                    )}
                </div>
            </div>

            <button
                onClick={() => onDelete(task.id)}
                className='text-gray-400 hover:text-red-500 transition px-2 py-1 text-sm rounded hover:bg-red-50'
            >
                Hapus
            </button>
        </div>
    );
}

export default TaskItem;
