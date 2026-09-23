import TaskItem from './TaskItem';

function TaskList({ tasks, loading, onToggle, onDelete }) {
    if (loading) {
        return <p className='text-center text-gray-400 py-8'>Memuat data...</p>;
    }

    if (tasks.length === 0) {
        return (
            <p className='text-center text-gray-400 py-8'>
                Belum ada tugas di database.
            </p>
        );
    }

    return (
        <div className='space-y-3'>
            {tasks.map((task) => (
                <TaskItem
                    key={task.id}
                    task={task}
                    onToggle={onToggle}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
}

export default TaskList;
