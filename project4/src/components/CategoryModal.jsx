import { useState } from 'react';

function CategoryModal({
    isOpen,
    onClose,
    categories,
    onAddCategory,
    onDeleteCategory,
}) {
    const [newCategoryName, setNewCategoryName] = useState('');
    const [newCategoryColor, setNewCategoryColor] = useState('#3B82F6');

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!newCategoryName.trim()) return;
        onAddCategory(newCategoryName, newCategoryColor);
        setNewCategoryName('');
        setNewCategoryColor('#3B82F6');
    };

    return (
        <div className='fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50'>
            <div className='bg-white rounded-2xl p-6 w-full max-w-md shadow-xl border border-gray-100 max-h-[90vh] overflow-y-auto'>
                <div className='flex justify-between items-center mb-4'>
                    <h2 className='text-xl font-bold text-gray-800'>
                        Kelola Kategori
                    </h2>
                    <button
                        onClick={onClose}
                        className='text-gray-400 hover:text-gray-600 text-lg font-bold'
                    >
                        ✕
                    </button>
                </div>

                {/* Form Tambah Kategori */}
                <form
                    onSubmit={handleSubmit}
                    className='space-y-3 pb-6 border-b border-gray-100 mb-6'
                >
                    <h3 className='text-sm font-semibold text-gray-500 uppercase tracking-wider'>
                        Tambah Baru
                    </h3>
                    <input
                        type='text'
                        required
                        value={newCategoryName}
                        onChange={(e) => setNewCategoryName(e.target.value)}
                        placeholder='Nama Kategori (contoh: Belanja)'
                        className='w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800'
                    />

                    <div className='flex items-center justify-between gap-3'>
                        <div className='flex items-center gap-2'>
                            <label className='text-sm text-gray-600'>
                                Warna:
                            </label>
                            <input
                                type='color'
                                value={newCategoryColor}
                                onChange={(e) =>
                                    setNewCategoryColor(e.target.value)
                                }
                                className='w-8 h-8 rounded cursor-pointer border border-gray-200'
                            />
                        </div>

                        <button
                            type='submit'
                            className='px-4 py-2 bg-blue-600 text-white font-medium text-sm rounded-lg hover:bg-blue-700 transition'
                        >
                            + Simpan
                        </button>
                    </div>
                </form>

                {/* Daftar Kategori */}
                <div>
                    <h3 className='text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3'>
                        Daftar Kategori
                    </h3>
                    {categories.length === 0 ? (
                        <p className='text-sm text-gray-400'>
                            Belum ada kategori.
                        </p>
                    ) : (
                        <div className='space-y-2'>
                            {categories.map((cat) => (
                                <div
                                    key={cat.id}
                                    className='flex items-center justify-between p-2.5 bg-gray-50 rounded-lg border border-gray-100'
                                >
                                    <div className='flex items-center gap-2'>
                                        <span
                                            className='w-3.5 h-3.5 rounded-full inline-block'
                                            style={{
                                                backgroundColor: cat.color,
                                            }}
                                        />
                                        <span className='font-medium text-gray-700 text-sm'>
                                            {cat.name}
                                        </span>
                                    </div>

                                    <button
                                        type='button'
                                        onClick={() => onDeleteCategory(cat.id)}
                                        className='text-xs text-red-500 hover:text-red-700 hover:bg-red-50 px-2 py-1 rounded transition'
                                    >
                                        Hapus
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default CategoryModal;
