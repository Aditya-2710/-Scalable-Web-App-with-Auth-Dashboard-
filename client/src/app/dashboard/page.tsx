"use client";

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Plus, Trash2, Search, Loader2, Pencil, X } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface Item {
    _id: string;
    title: string;
    description: string;
    createdAt: string;
}

export default function Dashboard() {
    const { loading: authLoading, isAuthenticated } = useAuth();
    const router = useRouter();
    const [items, setItems] = useState<Item[]>([]);
    const [loading, setLoading] = useState(true);
    const [newItemTitle, setNewItemTitle] = useState('');
    const [newItemDesc, setNewItemDesc] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [editingItem, setEditingItem] = useState<Item | null>(null);

    useEffect(() => {
        if (!authLoading && !isAuthenticated) {
            router.push('/login');
        } else if (isAuthenticated) {
            fetchItems();
        }
    }, [authLoading, isAuthenticated, router]);

    const fetchItems = async () => {
        try {
            const res = await api.get('/items');
            setItems(res.data);
        } catch (error) {
            console.error("Error fetching items", error);
            toast.error("Failed to load items");
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newItemTitle.trim()) return;

        setIsSubmitting(true);
        try {
            if (editingItem) {
                const res = await api.put(`/items/${editingItem._id}`, { title: newItemTitle, description: newItemDesc });
                setItems(items.map(item => item._id === editingItem._id ? res.data : item));
                toast.success("Item updated");
                setEditingItem(null);
            } else {
                const res = await api.post('/items', { title: newItemTitle, description: newItemDesc });
                setItems([res.data, ...items]);
                toast.success("Item added");
            }
            setNewItemTitle('');
            setNewItemDesc('');
        } catch (error) {
            console.error(error);
            toast.error(editingItem ? "Failed to update item" : "Failed to add item");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleEditClick = (item: Item) => {
        setEditingItem(item);
        setNewItemTitle(item.title);
        setNewItemDesc(item.description);
    };

    const handleCancelEdit = () => {
        setEditingItem(null);
        setNewItemTitle('');
        setNewItemDesc('');
    };

    const handleDeleteItem = async (id: string) => {
        if (!confirm("Are you sure you want to delete this item?")) return;
        try {
            await api.delete(`/items/${id}`);
            setItems(items.filter(item => item._id !== id));
            toast.success("Item deleted");
            if (editingItem?._id === id) handleCancelEdit();
        } catch (error) {
            console.error(error);
            toast.error("Failed to delete item");
        }
    };

    const filteredItems = items.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (authLoading || loading) {
        return <div className="flex h-[calc(100vh-4rem)] items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;
    }

    return (
        <div className="container py-8 space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                    <p className="text-muted-foreground">Manage your items and view your stats.</p>
                </div>
                <div className="flex items-center gap-2">
                    <div className="relative w-full md:w-64">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search items..."
                            className="pl-8"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-12">
                <Card className="md:col-span-4 h-fit">
                    <CardHeader>
                        <CardTitle>{editingItem ? 'Edit Item' : 'Add New Item'}</CardTitle>
                        <CardDescription>{editingItem ? 'Update the details of your item.' : 'Create a new item to add to your list.'}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Input
                                    placeholder="Title"
                                    value={newItemTitle}
                                    onChange={(e) => setNewItemTitle(e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Input
                                    placeholder="Description"
                                    value={newItemDesc}
                                    onChange={(e) => setNewItemDesc(e.target.value)}
                                />
                            </div>
                            <div className="flex gap-2">
                                <Button type="submit" className="flex-1" disabled={isSubmitting || !newItemTitle}>
                                    {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : (editingItem ? <Pencil className="h-4 w-4 mr-2" /> : <Plus className="h-4 w-4 mr-2" />)}
                                    {editingItem ? 'Update' : 'Add'}
                                </Button>
                                {editingItem && (
                                    <Button type="button" variant="outline" onClick={handleCancelEdit} disabled={isSubmitting}>
                                        <X className="h-4 w-4" />
                                    </Button>
                                )}
                            </div>
                        </form>
                    </CardContent>
                </Card>

                <div className="md:col-span-8 space-y-4">
                    {filteredItems.length === 0 ? (
                        <div className="text-center py-12 border rounded-lg bg-muted/10">
                            <p className="text-muted-foreground">No items found.</p>
                        </div>
                    ) : (
                        filteredItems.map((item) => (
                            <Card key={item._id} className={editingItem?._id === item._id ? 'border-primary' : ''}>
                                <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                                    <div className="space-y-1">
                                        <CardTitle className="text-base font-medium">{item.title}</CardTitle>
                                        <CardDescription>{item.description}</CardDescription>
                                    </div>
                                    <div className="flex gap-1">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => handleEditClick(item)}
                                        >
                                            <Pencil className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="text-destructive hover:text-destructive hover:bg-destructive/10"
                                            onClick={() => handleDeleteItem(item._id)}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-xs text-muted-foreground">
                                        Created: {new Date(item.createdAt).toLocaleDateString()}
                                    </p>
                                </CardContent>
                            </Card>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
