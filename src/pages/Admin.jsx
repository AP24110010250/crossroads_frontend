import React, { useState, useEffect } from 'react';
import Navbar from '../components/sections/Navbar';
import Footer from '../components/sections/Footer';
import SmoothScroll from '../components/animations/SmoothScroll';
import { getImageUrl } from '../utils/imageHelper';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { 
  Lock, Calendar, Utensils, Star, Image as ImageIcon, MapPin, 
  Check, X, Trash2, Plus, Edit, RefreshCw, AlertCircle, Sparkles, CheckCircle2,
  Tag, FileImage
} from 'lucide-react';

const Admin = () => {
  const { isAuthenticated, login, user, token, API_URL } = useAuth();
  
  // Login form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  // Dashboard Tab state
  const [activeTab, setActiveTab] = useState('reservations');

  // Resource arrays
  const [reservations, setReservations] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [galleryItems, setGalleryItems] = useState([]);
  const [branches, setBranches] = useState([]);
  const [categories, setCategories] = useState([]);
  const [pageImages, setPageImages] = useState([]);

  // Loading / Error states
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState(null);

  // Menu Creation/Editing Form State
  const [menuForm, setMenuForm] = useState({
    name: '',
    description: '',
    price: '',
    priceHalf: '',
    category: 'Breakfast',
    isVeg: false,
    isChefSpecial: false,
    isStarred: false,
    imageFile: null
  });
  const [editingMenuId, setEditingMenuId] = useState(null);

  // Gallery Creation Form State
  const [galleryForm, setGalleryForm] = useState({
    title: '',
    category: 'Food',
    isStarred: false,
    imageFile: null
  });

  // Category Form State
  const [categoryInput, setCategoryInput] = useState('');

  // Page Image upload form state
  const [selectedPageImageKey, setSelectedPageImageKey] = useState('');
  const [pageImageFile, setPageImageFile] = useState(null);

  // Branch Editing Form State
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [branchForm, setBranchForm] = useState({
    address: '',
    phone: '',
    timings: '',
    googleMapsLink: '',
    description: ''
  });

  // Load resources based on tab
  useEffect(() => {
    if (isAuthenticated && token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      fetchTabResources();
    }
  }, [isAuthenticated, activeTab, token]);

  const fetchTabResources = async () => {
    setLoading(true);
    setError(null);
    try {
      if (activeTab === 'reservations') {
        const res = await axios.get(`${API_URL}/reservations`);
        if (res.data.success) setReservations(res.data.data);
      } else if (activeTab === 'menu') {
        const res = await axios.get(`${API_URL}/menu`);
        if (res.data.success) setMenuItems(res.data.data);
        
        // Also load categories for the select dropdown
        const catRes = await axios.get(`${API_URL}/categories`);
        if (catRes.data.success) {
          setCategories(catRes.data.data);
          // Set default category in menuForm if categories exist and form category is empty or default
          if (catRes.data.data.length > 0 && !menuForm.category) {
            setMenuForm(prev => ({ ...prev, category: catRes.data.data[0].name }));
          }
        }
      } else if (activeTab === 'categories') {
        const res = await axios.get(`${API_URL}/categories`);
        if (res.data.success) setCategories(res.data.data);
      } else if (activeTab === 'testimonials') {
        const res = await axios.get(`${API_URL}/testimonials?all=true`);
        if (res.data.success) setTestimonials(res.data.data);
      } else if (activeTab === 'gallery') {
        const res = await axios.get(`${API_URL}/gallery`);
        if (res.data.success) setGalleryItems(res.data.data);
      } else if (activeTab === 'pageImages') {
        const res = await axios.get(`${API_URL}/page-images`);
        if (res.data.success) setPageImages(res.data.data);
      } else if (activeTab === 'branches') {
        const res = await axios.get(`${API_URL}/branches`);
        if (res.data.success) setBranches(res.data.data);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch resources. Make sure backend is running.');
    } finally {
      setLoading(false);
    }
  };

  // Login handler
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError('');
    const res = await login(email, password);
    setLoginLoading(false);
    if (!res.success) {
      setLoginError(res.message);
    }
  };

  // Reservation actions
  const handleUpdateReservationStatus = async (id, status) => {
    setActionLoading(true);
    try {
      const res = await axios.put(`${API_URL}/reservations/${id}/status`, { status });
      if (res.data.success) {
        setReservations(prev => prev.map(r => r._id === id ? { ...r, status } : r));
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update reservation.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteReservation = async (id) => {
    if (!window.confirm('Delete this reservation record permanently?')) return;
    setActionLoading(true);
    try {
      const res = await axios.delete(`${API_URL}/reservations/${id}`);
      if (res.data.success) {
        setReservations(prev => prev.filter(r => r._id !== id));
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete reservation.');
    } finally {
      setActionLoading(false);
    }
  };

  // Testimonial actions
  const handleApproveTestimonial = async (id) => {
    setActionLoading(true);
    try {
      const res = await axios.put(`${API_URL}/testimonials/${id}/approve`);
      if (res.data.success) {
        setTestimonials(prev => prev.map(t => t._id === id ? { ...t, approved: true } : t));
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to approve review.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteTestimonial = async (id) => {
    if (!window.confirm('Delete this review permanently?')) return;
    setActionLoading(true);
    try {
      const res = await axios.delete(`${API_URL}/testimonials/${id}`);
      if (res.data.success) {
        setTestimonials(prev => prev.filter(t => t._id !== id));
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete review.');
    } finally {
      setActionLoading(false);
    }
  };

  // Menu Form Change Handlers
  const handleMenuInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setMenuForm({
      ...menuForm,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleMenuFileChange = (e) => {
    setMenuForm({ ...menuForm, imageFile: e.target.files[0] });
  };

  // Menu CRUD actions
  const handleMenuSubmit = async (e) => {
    e.preventDefault();
    setActionLoading(true);
    
    // Validate Signature Curations Starred constraints
    const starredCount = menuItems.filter(item => item.isStarred && item._id !== editingMenuId).length;
    if (menuForm.isStarred && starredCount >= 6) {
      alert('You can star a maximum of 6 items for the home page Signature Curations section.');
      setActionLoading(false);
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append('name', menuForm.name);
    formDataToSend.append('description', menuForm.description);
    formDataToSend.append('price', menuForm.price);
    if (menuForm.priceHalf) formDataToSend.append('priceHalf', menuForm.priceHalf);
    formDataToSend.append('category', menuForm.category);
    formDataToSend.append('isVeg', menuForm.isVeg);
    formDataToSend.append('isChefSpecial', menuForm.isChefSpecial);
    formDataToSend.append('isStarred', menuForm.isStarred);
    
    if (menuForm.imageFile) {
      formDataToSend.append('image', menuForm.imageFile);
    }

    try {
      if (editingMenuId) {
        // Edit Mode
        const res = await axios.put(`${API_URL}/menu/${editingMenuId}`, formDataToSend, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        if (res.data.success) {
          alert('Menu item updated!');
          setEditingMenuId(null);
          fetchTabResources();
          resetMenuForm();
        }
      } else {
        // Create Mode
        if (!menuForm.imageFile) {
          alert('Please upload an image for the dish!');
          setActionLoading(false);
          return;
        }
        const res = await axios.post(`${API_URL}/menu`, formDataToSend, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        if (res.data.success) {
          alert('Menu item created successfully!');
          fetchTabResources();
          resetMenuForm();
        }
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Menu operation failed.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleEditMenuSelect = (item) => {
    setEditingMenuId(item._id);
    setMenuForm({
      name: item.name,
      description: item.description || '',
      price: item.price,
      priceHalf: item.priceHalf || '',
      category: item.category,
      isVeg: item.isVeg,
      isChefSpecial: item.isChefSpecial,
      isStarred: item.isStarred || false,
      imageFile: null
    });
  };

  const handleDeleteMenuItem = async (id) => {
    if (!window.confirm('Delete this menu item permanently?')) return;
    setActionLoading(true);
    try {
      const res = await axios.delete(`${API_URL}/menu/${id}`);
      if (res.data.success) {
        setMenuItems(prev => prev.filter(m => m._id !== id));
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete menu item.');
    } finally {
      setActionLoading(false);
    }
  };

  const resetMenuForm = () => {
    setEditingMenuId(null);
    setMenuForm({
      name: '',
      description: '',
      price: '',
      priceHalf: '',
      category: categories.length > 0 ? categories[0].name : 'Breakfast',
      isVeg: false,
      isChefSpecial: false,
      isStarred: false,
      imageFile: null
    });
  };

  // Gallery actions
  const handleGallerySubmit = async (e) => {
    e.preventDefault();
    if (!galleryForm.imageFile || !galleryForm.title) {
      alert('Please provide a title and image file!');
      return;
    }
    setActionLoading(true);
    
    // Starred count check
    if (galleryForm.isStarred && galleryForm.category === 'Tollywood Wall') {
      const currentStarredCount = galleryItems.filter(g => g.isStarred && g.category === 'Tollywood Wall').length;
      if (currentStarredCount >= 5) {
        alert("Exactly 5 starred images are displayed on the Tollywood wall. Unstar another image first, or upload this as non-starred.");
        setActionLoading(false);
        return;
      }
    }

    const fd = new FormData();
    fd.append('title', galleryForm.title);
    fd.append('category', galleryForm.category);
    fd.append('isStarred', galleryForm.isStarred);
    fd.append('image', galleryForm.imageFile);

    try {
      const res = await axios.post(`${API_URL}/gallery`, fd, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      if (res.data.success) {
        alert('Gallery image uploaded!');
        setGalleryForm({ title: '', category: 'Food', isStarred: false, imageFile: null });
        fetchTabResources();
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Failed uploading image.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleToggleGalleryStar = async (item) => {
    setActionLoading(true);
    try {
      const updatedStarred = !item.isStarred;
      
      // Enforce the requirement: exactly 5 images are displayed on Tollywood Wall
      if (item.category === 'Tollywood Wall') {
        const currentStarredCount = galleryItems.filter(g => g.isStarred && g.category === 'Tollywood Wall' && g._id !== item._id).length;
        if (updatedStarred && currentStarredCount >= 5) {
          alert("Exactly 5 starred images are displayed on the Tollywood wall. Unstar another image before starring this one.");
          setActionLoading(false);
          return;
        }
      }

      const res = await axios.put(`${API_URL}/gallery/${item._id}`, { isStarred: updatedStarred });
      if (res.data.success) {
        setGalleryItems(prev => prev.map(g => g._id === item._id ? { ...g, isStarred: updatedStarred } : g));
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update image star status.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleToggleMenuStar = async (item) => {
    setActionLoading(true);
    try {
      const updatedStarred = !item.isStarred;
      if (updatedStarred) {
        const starredCount = menuItems.filter(m => m.isStarred).length;
        if (starredCount >= 6) {
          alert('You can star a maximum of 6 items for the home page Signature Curations section.');
          setActionLoading(false);
          return;
        }
      } else {
        const starredCount = menuItems.filter(m => m.isStarred).length;
        if (starredCount <= 3) {
          alert('You must have at least 3 starred menu items for Our Signature Curations. Please star another item before unstarring this one.');
          setActionLoading(false);
          return;
        }
      }

      const res = await axios.put(`${API_URL}/menu/${item._id}`, { isStarred: updatedStarred });
      if (res.data.success) {
        setMenuItems(prev => prev.map(m => m._id === item._id ? { ...m, isStarred: updatedStarred } : m));
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update menu star status.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteGalleryItem = async (id) => {
    if (!window.confirm('Delete this image from gallery?')) return;
    setActionLoading(true);
    try {
      const res = await axios.delete(`${API_URL}/gallery/${id}`);
      if (res.data.success) {
        setGalleryItems(prev => prev.filter(g => g._id !== id));
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Failed deleting image.');
    } finally {
      setActionLoading(false);
    }
  };

  // Category CRUD actions
  const handleCategoryCreate = async (e) => {
    e.preventDefault();
    if (!categoryInput.trim()) return;
    setActionLoading(true);
    try {
      const res = await axios.post(`${API_URL}/categories`, { name: categoryInput.trim() });
      if (res.data.success) {
        alert('Category added successfully!');
        setCategoryInput('');
        fetchTabResources();
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to add category.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleCategoryDelete = async (id) => {
    if (!window.confirm('Delete this category permanently?')) return;
    setActionLoading(true);
    try {
      const res = await axios.delete(`${API_URL}/categories/${id}`);
      if (res.data.success) {
        alert('Category deleted successfully!');
        fetchTabResources();
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete category.');
    } finally {
      setActionLoading(false);
    }
  };

  // Page Image upload actions
  const handlePageImageSubmit = async (e) => {
    e.preventDefault();
    if (!selectedPageImageKey || !pageImageFile) {
      alert('Please select a setting key and upload an image file!');
      return;
    }
    setActionLoading(true);
    const fd = new FormData();
    fd.append('image', pageImageFile);

    const existing = pageImages.find(img => img.key === selectedPageImageKey);
    const labelMapping = {
      'home_hero_bg': { label: 'Home Hero Background', page: 'home' },
      'home_hero_biryani': { label: 'Home Hero Biryani Item', page: 'home' },
      'home_hero_thali': { label: 'Home Hero Thali Item', page: 'home' },
      'home_hero_idly': { label: 'Home Hero Idly Item', page: 'home' },
      'home_thali': { label: 'Home Thali Experience Section', page: 'home' },
      'home_sweets': { label: 'Home Sweets Experience Section', page: 'home' },
      'home_banquet': { label: 'Home Banquet Section Image', page: 'home' },
      'about_header_bg': { label: 'About Header Background', page: 'about' },
      'about_founding': { label: 'About Founding Legacy Section', page: 'about' },
      'about_philosophy': { label: 'About Culinary Philosophy Section', page: 'about' },
      'about_banquet': { label: 'About Banquet Hall Section Details', page: 'about' }
    };
    const details = existing || labelMapping[selectedPageImageKey];
    if (details) {
      fd.append('label', details.label);
      fd.append('page', details.page);
    } else {
      fd.append('label', selectedPageImageKey.replace(/_/g, ' '));
      fd.append('page', selectedPageImageKey.startsWith('about_') ? 'about' : 'home');
    }

    try {
      const res = await axios.put(`${API_URL}/page-images/${selectedPageImageKey}`, fd, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      if (res.data.success) {
        alert('Image updated successfully!');
        setPageImageFile(null);
        setSelectedPageImageKey('');
        fetchTabResources();
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update page image.');
    } finally {
      setActionLoading(false);
    }
  };

  // Branch actions
  const handleEditBranchSelect = (branch) => {
    setSelectedBranch(branch);
    setBranchForm({
      address: branch.address,
      phone: branch.phone,
      timings: branch.timings,
      googleMapsLink: branch.googleMapsLink,
      description: branch.description || ''
    });
  };

  const handleBranchSubmit = async (e) => {
    e.preventDefault();
    setActionLoading(true);
    try {
      const res = await axios.put(`${API_URL}/branches/${selectedBranch._id}`, branchForm);
      if (res.data.success) {
        alert('Branch details updated successfully!');
        setSelectedBranch(null);
        fetchTabResources();
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Failed updating branch.');
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <SmoothScroll>
      <div className="relative min-h-screen bg-brand-lightBg text-brand-brown flex flex-col pt-[72px]">
        <Navbar />

        {/* Dashboard Frame */}
        <div className="flex-grow max-w-7xl mx-auto w-full py-12 px-6 md:px-12 z-10 text-brand-brown">
          
          {/* 1. Login Gate Screen */}
          {!isAuthenticated ? (
            <div className="max-w-md mx-auto my-12 p-8 bg-white border border-brand-brown/10 rounded-xl shadow-lg glass-card flex flex-col space-y-6">
              <div className="text-center flex flex-col items-center">
                <div className="w-14 h-14 rounded-full bg-brand-gold/10 flex items-center justify-center text-brand-gold mb-3">
                  <Lock size={24} />
                </div>
                <h2 className="font-playfair text-3xl font-bold text-brand-brown">Admin Portal</h2>
                <span className="text-sm text-brand-muted mt-1 uppercase tracking-widest font-semibold">Sign in to manage crossroads</span>
              </div>

              <form onSubmit={handleLoginSubmit} className="flex flex-col space-y-5">
                {loginError && (
                  <div className="p-3 rounded bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-1.5 font-medium">
                    <AlertCircle size={16} className="shrink-0 text-red-500" />
                    <span>{loginError}</span>
                  </div>
                )}
                <div className="flex flex-col space-y-1">
                  <label className="text-xs uppercase tracking-wider text-brand-gold font-bold">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. admin@crossroads.com"
                    className="w-full bg-white border border-brand-brown/20 rounded px-4 py-2.5 text-sm text-brand-brown focus:outline-none focus:border-brand-gold transition-colors shadow-sm"
                  />
                </div>
                <div className="flex flex-col space-y-1">
                  <label className="text-xs uppercase tracking-wider text-brand-gold font-bold">Password</label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-white border border-brand-brown/20 rounded px-4 py-2.5 text-sm text-brand-brown focus:outline-none focus:border-brand-gold transition-colors shadow-sm"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loginLoading}
                  className="w-full py-4 bg-brand-red text-brand-lightBg uppercase text-sm font-bold rounded tracking-wider border border-brand-red/20 gold-glow-hover flex items-center justify-center disabled:opacity-50 mt-2 hover:bg-brand-red/90 transition-colors"
                >
                  {loginLoading ? 'Authenticating...' : 'Sign In'}
                </button>
              </form>
            </div>
          ) : (
            // 2. Logged-in Dashboard Area
            <div className="flex flex-col space-y-8">
              
              {/* Dashboard Admin Title */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-brand-brown/10 pb-6">
                <div className="flex flex-col">
                  <span className="text-brand-gold uppercase tracking-[0.2em] font-semibold text-xs">
                    MERN Dashboard — Role: {user?.role || 'Owner'}
                  </span>
                  <h1 className="font-playfair text-4xl font-bold text-brand-brown mt-1">
                    Welcome, <span className="text-brand-gold italic">{user?.username || 'Admin'}</span>
                  </h1>
                </div>
                
                {/* Tab Navigation buttons */}
                <div className="flex flex-wrap items-center gap-2">
                  {[
                    { id: 'reservations', label: 'Reservations', icon: <Calendar size={18} /> },
                    { id: 'menu', label: 'Menu CRUD', icon: <Utensils size={18} /> },
                    { id: 'categories', label: 'Category CRUD', icon: <Tag size={18} /> },
                    { id: 'testimonials', label: 'Testimonials', icon: <Star size={18} /> },
                    { id: 'gallery', label: 'Gallery', icon: <ImageIcon size={18} /> },
                    { id: 'pageImages', label: 'Page Images', icon: <FileImage size={18} /> },
                    { id: 'branches', label: 'Branches', icon: <MapPin size={18} /> }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => { setActiveTab(tab.id); resetMenuForm(); setSelectedBranch(null); }}
                      className={`px-5 py-3 rounded text-sm uppercase font-bold tracking-wider flex items-center gap-2 transition-all ${
                        activeTab === tab.id 
                          ? 'bg-brand-gold text-brand-lightBg shadow-md' 
                          : 'bg-brand-beige border border-brand-brown/10 hover:border-brand-gold text-brand-brown/80'
                      }`}
                    >
                      {tab.icon}
                      <span>{tab.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Loader */}
              {loading && (
                <div className="flex flex-col items-center justify-center py-20 space-y-4">
                  <RefreshCw className="animate-spin text-brand-gold" size={32} />
                  <span className="text-sm text-brand-muted uppercase tracking-widest font-semibold">Loading Resources...</span>
                </div>
              )}

              {/* Error banner */}
              {error && (
                <div className="p-4 rounded bg-red-50 border border-red-200 text-red-700 text-sm flex items-center gap-2 font-medium">
                  <AlertCircle size={16} className="text-red-500 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Main Content Sections based on Active Tab */}
              {!loading && (
                <div className="w-full text-brand-brown">
                  
                  {/* TAB 1: RESERVATIONS */}
                  {activeTab === 'reservations' && (
                    <div className="flex flex-col space-y-6">
                      <div className="flex items-center gap-2">
                        <h2 className="font-playfair text-2xl font-bold text-brand-brown">Guest Reservation Requests</h2>
                        <span className="font-telugu text-brand-muted text-lg tracking-wide ml-2">అతిథి రిజర్వేషన్లు</span>
                      </div>
                      <div className="overflow-x-auto border border-brand-brown/10 rounded-lg glass-card shadow-sm">
                        <table className="w-full text-left border-collapse text-sm">
                          <thead>
                            <tr className="border-b border-brand-brown/10 bg-brand-beige text-brand-brown uppercase tracking-wider text-xs font-bold">
                              <th className="p-4">Guest</th>
                              <th className="p-4">Contact</th>
                              <th className="p-4">Branch</th>
                              <th className="p-4">Schedule</th>
                              <th className="p-4">Details</th>
                              <th className="p-4">Status</th>
                              <th className="p-4 text-center">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-brand-brown/10 text-brand-brown bg-white">
                            {reservations.length === 0 ? (
                              <tr>
                                <td colSpan="7" className="p-8 text-center text-brand-muted">No reservations booked yet.</td>
                              </tr>
                            ) : (
                              reservations.map((r) => (
                                <tr key={r._id} className="hover:bg-brand-beige/40">
                                  <td className="p-4 font-bold text-brand-brown">{r.name}</td>
                                  <td className="p-4 flex flex-col">
                                    <span className="font-semibold">{r.phone}</span>
                                    <span className="text-xs text-brand-brown/70">{r.email || 'No Email'}</span>
                                  </td>
                                  <td className="p-4 text-brand-red font-bold">{r.branch}</td>
                                  <td className="p-4 flex flex-col">
                                    <span>{r.date}</span>
                                    <span className="text-xs text-brand-brown/70">{r.time}</span>
                                  </td>
                                  <td className="p-4">
                                    <span className="bg-brand-beige px-2.5 py-1 rounded text-xs text-brand-brown font-semibold">{r.guests} Guests</span>
                                    {r.notes && <p className="text-xs text-brand-brown/70 italic mt-1 max-w-[200px] truncate" title={r.notes}>Note: {r.notes}</p>}
                                  </td>
                                  <td className="p-4">
                                    <span className={`px-2.5 py-1 rounded text-xs font-bold uppercase tracking-wider border ${
                                      r.status === 'Confirmed' ? 'bg-green-50 text-green-700 border-green-200' :
                                      r.status === 'Cancelled' ? 'bg-red-50 text-red-700 border-red-200' :
                                      'bg-yellow-50 text-yellow-750 border-yellow-200'
                                    }`}>
                                      {r.status}
                                    </span>
                                  </td>
                                  <td className="p-4">
                                    <div className="flex items-center justify-center space-x-2">
                                      {r.status === 'Pending' && (
                                        <>
                                          <button 
                                            onClick={() => handleUpdateReservationStatus(r._id, 'Confirmed')}
                                            disabled={actionLoading}
                                            className="p-2 rounded bg-green-50 hover:bg-green-100 text-green-700 border border-green-200 transition-colors"
                                            title="Confirm Reservation"
                                          >
                                            <Check size={16} />
                                          </button>
                                          <button 
                                            onClick={() => handleUpdateReservationStatus(r._id, 'Cancelled')}
                                            disabled={actionLoading}
                                            className="p-2 rounded bg-yellow-50 hover:bg-yellow-100 text-yellow-700 border border-yellow-250 transition-colors"
                                            title="Cancel Reservation"
                                          >
                                            <X size={16} />
                                          </button>
                                        </>
                                      )}
                                      <button 
                                        onClick={() => handleDeleteReservation(r._id)}
                                        disabled={actionLoading}
                                        className="p-2 rounded bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 transition-colors"
                                        title="Delete Record"
                                      >
                                        <Trash2 size={16} />
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              ))
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* TAB 2: MENU CRUD */}
                  {activeTab === 'menu' && (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-brand-brown">
                      {/* Left: Form */}
                      <div className="lg:col-span-4 bg-brand-beige border border-brand-brown/10 p-6 rounded-lg glass-card h-fit">
                        <h2 className="font-playfair text-xl font-bold text-brand-brown mb-2 border-b border-brand-brown/10 pb-2">
                          {editingMenuId ? 'Edit Culinary Dish' : 'Add New Culinary Dish'}
                        </h2>

                        {/* Starred constraint reminder */}
                        <div className={`p-3 rounded mb-4 text-xs font-semibold border leading-relaxed ${
                          menuItems.filter(item => item.isStarred).length < 3 
                            ? 'bg-yellow-50 text-yellow-800 border-yellow-250' 
                            : 'bg-green-50 text-green-700 border-green-200'
                        }`}>
                          <span>Signature Curations count: <b>{menuItems.filter(item => item.isStarred).length}</b> starred (Min 3, Max 6 required).</span>
                        </div>
                        
                        <form onSubmit={handleMenuSubmit} className="flex flex-col space-y-4 text-sm">
                          <div className="flex flex-col space-y-1">
                            <label className="text-xs uppercase font-bold text-brand-gold">Dish Name *</label>
                            <input
                              type="text"
                              required
                              name="name"
                              value={menuForm.name}
                              onChange={handleMenuInputChange}
                              placeholder="e.g. Ulavacharu Chicken Biryani"
                              className="w-full bg-white border border-brand-brown/20 rounded px-4 py-2.5 text-sm text-brand-brown focus:outline-none focus:border-brand-gold transition-colors shadow-sm"
                            />
                          </div>

                          <div className="flex flex-col space-y-1">
                            <label className="text-xs uppercase font-bold text-brand-gold">Description</label>
                            <textarea
                              name="description"
                              value={menuForm.description}
                              onChange={handleMenuInputChange}
                              rows="3"
                              placeholder="Enter spices or story parameters..."
                              className="w-full bg-white border border-brand-brown/20 rounded px-4 py-2.5 text-sm text-brand-brown focus:outline-none focus:border-brand-gold transition-colors shadow-sm"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <div className="flex flex-col space-y-1">
                              <label className="text-xs uppercase font-bold text-brand-gold">Full Price (₹) *</label>
                              <input
                                type="number"
                                required
                                name="price"
                                value={menuForm.price}
                                onChange={handleMenuInputChange}
                                placeholder="380"
                                className="w-full bg-white border border-brand-brown/20 rounded px-4 py-2.5 text-sm text-brand-brown focus:outline-none focus:border-brand-gold transition-colors shadow-sm"
                              />
                            </div>
                            <div className="flex flex-col space-y-1">
                              <label className="text-xs uppercase font-bold text-brand-gold">Half Price (Optional)</label>
                              <input
                                type="number"
                                name="priceHalf"
                                value={menuForm.priceHalf}
                                onChange={handleMenuInputChange}
                                placeholder="e.g. 210"
                                className="w-full bg-white border border-brand-brown/20 rounded px-4 py-2.5 text-sm text-brand-brown focus:outline-none focus:border-brand-gold transition-colors shadow-sm"
                              />
                            </div>
                          </div>

                          <div className="flex flex-col space-y-1">
                            <label className="text-xs uppercase font-bold text-brand-gold">Category *</label>
                            <select
                              name="category"
                              value={menuForm.category}
                              onChange={handleMenuInputChange}
                              className="w-full bg-white border border-brand-brown/20 rounded px-4 py-2.5 text-sm text-brand-brown focus:outline-none focus:border-brand-gold transition-colors shadow-sm"
                            >
                              {categories.map(cat => (
                                <option key={cat._id || cat.name} value={cat.name}>{cat.name}</option>
                              ))}
                            </select>
                          </div>

                          {/* Image upload */}
                          <div className="flex flex-col space-y-1">
                            <label className="text-xs uppercase font-bold text-brand-gold">
                              {editingMenuId ? 'Upload New Image (Optional)' : 'Upload Dish Image *'}
                            </label>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleMenuFileChange}
                              className="w-full bg-white border border-brand-brown/20 rounded px-4 py-2 text-sm text-brand-brown focus:outline-none focus:border-brand-gold transition-colors"
                            />
                          </div>

                          {/* Checkbox fields */}
                          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-2">
                            <label className="flex items-center space-x-2 text-sm cursor-pointer select-none text-brand-brown">
                              <input
                                type="checkbox"
                                name="isVeg"
                                checked={menuForm.isVeg}
                                onChange={handleMenuInputChange}
                                className="w-5 h-5 accent-brand-gold rounded border-brand-brown/20"
                              />
                              <span className="font-medium">Vegetarian</span>
                            </label>
                            <label className="flex items-center space-x-2 text-sm cursor-pointer select-none text-brand-brown">
                              <input
                                type="checkbox"
                                name="isChefSpecial"
                                checked={menuForm.isChefSpecial}
                                onChange={handleMenuInputChange}
                                className="w-5 h-5 accent-brand-gold rounded border-brand-brown/20"
                              />
                              <span className="flex items-center gap-1 text-brand-gold font-bold"><Sparkles size={14} /> Chef Special</span>
                            </label>
                            <label className="flex items-center space-x-2 text-sm cursor-pointer select-none text-brand-brown">
                              <input
                                type="checkbox"
                                name="isStarred"
                                checked={menuForm.isStarred}
                                onChange={handleMenuInputChange}
                                className="w-5 h-5 accent-brand-gold rounded border-brand-brown/20"
                              />
                              <span className="flex items-center gap-1 text-brand-red font-bold"><Star size={14} className="fill-brand-red" /> Starred (Home)</span>
                            </label>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex space-x-2 pt-2">
                             <button
                              type="submit"
                              disabled={actionLoading}
                              className="flex-grow py-3 bg-brand-gold hover:bg-brand-gold/90 text-brand-lightBg font-bold rounded uppercase tracking-wider text-xs shadow-md transition-colors"
                            >
                              {actionLoading ? 'Saving...' : editingMenuId ? 'Update Item' : 'Create Item'}
                            </button>
                            {editingMenuId && (
                              <button
                                type="button"
                                onClick={resetMenuForm}
                                className="py-3 px-5 border border-brand-brown/30 hover:border-brand-brown/50 rounded text-xs uppercase tracking-wider font-semibold text-brand-brown transition-colors"
                              >
                                Cancel
                              </button>
                            )}
                          </div>
                        </form>
                      </div>

                      {/* Right: List */}
                      <div className="lg:col-span-8 flex flex-col space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <h2 className="font-playfair text-2xl font-bold text-brand-brown">Current Menu List</h2>
                            <span className="font-telugu text-brand-muted text-lg tracking-wide ml-2">ప్రస్తుత మెనూ</span>
                          </div>
                          <span className="text-xs text-brand-brown/70 font-semibold uppercase bg-brand-beige px-3 py-1 rounded-full">{menuItems.length} items</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {menuItems.map(item => (
                            <div key={item._id} className="flex gap-4 p-5 rounded-lg bg-white border border-brand-brown/10 relative glass-card hover:border-brand-gold/40 transition-colors shadow-sm">
                              {/* Thumbnail */}
                              <div className="w-20 h-20 rounded overflow-hidden shrink-0 bg-brand-beige border border-brand-brown/10">
                                <img src={getImageUrl(item.image)} alt={item.name} className="w-full h-full object-cover" />
                              </div>
                              <div className="flex flex-col space-y-1 flex-grow pr-16 text-sm text-brand-brown">
                                <div className="flex items-center gap-1.5 flex-wrap">
                                  <span className="font-bold text-brand-brown text-base leading-snug">{item.name}</span>
                                  {item.isStarred && <Star size={12} className="text-brand-red fill-brand-red shrink-0" title="Starred (Home Signature)" />}
                                  {item.isChefSpecial && <Sparkles size={12} className="text-brand-gold shrink-0" title="Chef Special" />}
                                  <span className={`w-2.5 h-2.5 rounded-full shrink-0 border border-white ${item.isVeg ? 'bg-green-600' : 'bg-red-600'}`} title={item.isVeg ? 'Veg' : 'Non-Veg'} />
                                </div>
                                <span className="text-brand-red font-bold text-base">₹{item.price} {item.priceHalf && <span className="text-xs text-brand-brown/50 font-normal">(Half: ₹{item.priceHalf})</span>}</span>
                                <span className="text-xs text-brand-brown/60 uppercase tracking-wider font-semibold">Category: {item.category}</span>
                              </div>

                              {/* Operations */}
                              <div className="absolute top-4 right-4 flex items-center space-x-1.5">
                                <button 
                                  onClick={() => handleToggleMenuStar(item)}
                                  className={`p-2 rounded border transition-colors ${
                                    item.isStarred 
                                      ? 'bg-brand-gold border-brand-gold text-brand-lightBg hover:bg-brand-gold/80' 
                                      : 'bg-brand-beige border-brand-brown/10 hover:border-brand-gold text-brand-brown'
                                  }`}
                                  title={item.isStarred ? "Unstar (Home Signature)" : "Star for Home Signature"}
                                >
                                  <Star size={14} className={item.isStarred ? "fill-current" : ""} />
                                </button>
                                <button 
                                  onClick={() => handleEditMenuSelect(item)}
                                  className="p-2 rounded bg-brand-beige border border-brand-brown/10 hover:border-brand-gold text-brand-brown transition-colors"
                                  title="Edit Item"
                                >
                                  <Edit size={14} />
                                </button>
                                <button 
                                  onClick={() => handleDeleteMenuItem(item._id)}
                                  className="p-2 rounded bg-brand-beige border border-brand-brown/10 hover:border-brand-red text-brand-red transition-colors"
                                  title="Delete Item"
                                >
                                  <Trash2 size={14} />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 3: TESTIMONIALS */}
                  {activeTab === 'testimonials' && (
                    <div className="flex flex-col space-y-6">
                      <div className="flex items-center gap-2">
                        <h2 className="font-playfair text-2xl font-bold text-brand-brown">Guest Review Moderation</h2>
                        <span className="font-telugu text-brand-muted text-lg tracking-wide ml-2">అతిథి సమీక్షలు</span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {testimonials.map(t => (
                          <div key={t._id} className="p-6 rounded-lg bg-white border border-brand-brown/10 glass-card flex flex-col justify-between space-y-4 hover:border-brand-gold/40 transition-all shadow-sm">
                            <div className="flex flex-col space-y-2 text-sm md:text-base text-brand-brown">
                              <div className="flex items-center justify-between">
                                <span className="font-bold text-brand-brown text-base md:text-lg">{t.name}</span>
                                <span className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider border ${
                                  t.approved ? 'bg-green-50 text-green-700 border-green-200' : 'bg-yellow-50 text-yellow-755 border-yellow-250'
                                }`}>
                                  {t.approved ? 'Approved' : 'Pending Review'}
                                </span>
                              </div>
                              <span className="text-xs text-brand-brown/60 uppercase tracking-widest">{t.designation || 'Happy Diner'}</span>
                              <div className="flex text-brand-gold space-x-0.5">
                                {Array.from({ length: t.rating }).map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                              </div>
                              <p className="text-brand-brown/90 italic font-light pt-2 leading-relaxed text-sm md:text-base">"{t.comment}"</p>
                            </div>

                            <div className="pt-4 border-t border-brand-brown/10 flex items-center justify-end space-x-2">
                              {!t.approved && (
                                <button 
                                  onClick={() => handleApproveTestimonial(t._id)}
                                  disabled={actionLoading}
                                  className="px-4 py-2 rounded bg-green-50 hover:bg-green-100 text-green-700 text-xs font-bold flex items-center gap-1 border border-green-200 transition-colors"
                                >
                                  <Check size={14} />
                                  <span>Approve Review</span>
                                </button>
                              )}
                              <button 
                                onClick={() => handleDeleteTestimonial(t._id)}
                                disabled={actionLoading}
                                className="px-4 py-2 rounded bg-red-50 hover:bg-red-100 text-red-700 text-xs font-bold flex items-center gap-1 border border-red-200 transition-colors"
                              >
                                <Trash2 size={14} />
                                <span>Delete</span>
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* TAB 4: GALLERY */}
                  {activeTab === 'gallery' && (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-brand-brown">
                      {/* Left Form */}
                      <div className="lg:col-span-4 bg-brand-beige border border-brand-brown/10 p-6 rounded-lg glass-card h-fit">
                        <h2 className="font-playfair text-xl font-bold text-brand-brown mb-4 border-b border-brand-brown/10 pb-2">Upload Gallery Image</h2>
                        
                        <form onSubmit={handleGallerySubmit} className="flex flex-col space-y-4 text-sm">
                          <div className="flex flex-col space-y-1">
                            <label className="text-xs uppercase font-bold text-brand-gold">Image Title *</label>
                            <input
                              type="text"
                              required
                              value={galleryForm.title}
                              onChange={(e) => setGalleryForm({ ...galleryForm, title: e.target.value })}
                              placeholder="e.g. Classic NTR poster framed"
                              className="w-full bg-white border border-brand-brown/20 rounded px-4 py-2.5 text-sm text-brand-brown focus:outline-none focus:border-brand-gold transition-colors shadow-sm"
                            />
                          </div>

                          <div className="flex flex-col space-y-1">
                            <label className="text-xs uppercase font-bold text-brand-gold">Category *</label>
                            <select
                              value={galleryForm.category}
                              onChange={(e) => setGalleryForm({ ...galleryForm, category: e.target.value })}
                              className="w-full bg-white border border-brand-brown/20 rounded px-4 py-2.5 text-sm text-brand-brown focus:outline-none focus:border-brand-gold transition-colors shadow-sm"
                            >
                              {['Food', 'Interiors', 'Events', 'Tollywood Wall'].map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                              ))}
                            </select>
                          </div>

                          <div className="flex flex-col space-y-1">
                            <label className="text-xs uppercase font-bold text-brand-gold">Image File *</label>
                            <input
                              type="file"
                              required
                              accept="image/*"
                              onChange={(e) => setGalleryForm({ ...galleryForm, imageFile: e.target.files[0] })}
                              className="w-full bg-white border border-brand-brown/20 rounded px-4 py-2 text-sm text-brand-brown focus:outline-none focus:border-brand-gold transition-colors"
                            />
                          </div>

                          <button 
                            type="submit"
                            disabled={actionLoading}
                            className="w-full py-3 bg-brand-gold hover:bg-brand-gold/90 text-brand-lightBg font-bold rounded uppercase tracking-wider text-xs shadow-md transition-colors"
                          >
                            {actionLoading ? 'Uploading...' : 'Upload Frame'}
                          </button>
                        </form>
                      </div>

                      {/* Right List */}
                      <div className="lg:col-span-8 flex flex-col space-y-4">
                        <div className="flex items-center gap-2">
                          <h2 className="font-playfair text-2xl font-bold text-brand-brown">Current Gallery Media</h2>
                          <span className="font-telugu text-brand-muted text-lg tracking-wide ml-2">గ్యాలరీ చిత్రాలు</span>
                        </div>

                        {/* Starred count check banner */}
                        {(() => {
                          const starredTollywoodCount = galleryItems.filter(g => g.isStarred && g.category === 'Tollywood Wall').length;
                          return (
                            <div className={`p-3.5 rounded-lg border text-sm font-semibold flex items-center gap-2.5 transition-all shadow-sm ${
                              starredTollywoodCount === 5 
                                ? 'bg-green-50 text-green-700 border-green-200' 
                                : 'bg-yellow-50 text-yellow-800 border-yellow-250 animate-pulse'
                            }`}>
                              <AlertCircle size={18} className="shrink-0 text-brand-gold" />
                              <span>
                                Tollywood Wall Starred Count: <b>{starredTollywoodCount}</b> of <b>5</b> starred.
                                {starredTollywoodCount !== 5 && ' (Exactly 5 starred images are required for the Tollywood Wall to display on the homepage!)'}
                              </span>
                            </div>
                          );
                        })()}

                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                          {galleryItems.map(g => (
                            <div key={g._id} className="relative aspect-video rounded overflow-hidden group border border-brand-brown/10 bg-white shadow-sm hover:shadow-md transition-shadow">
                              <img src={getImageUrl(g.image)} alt={g.title} className="w-full h-full object-cover" />
                              
                              {/* Star indicator badge (visible without hover) */}
                              {g.isStarred && (
                                <div className="absolute top-2 left-2 z-20 bg-brand-gold text-white px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 shadow">
                                  <Star size={10} className="fill-current" />
                                  <span>Starred</span>
                                </div>
                              )}

                              <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-3.5 z-10 text-brand-lightBg">
                                <span className="text-xs uppercase tracking-wider text-brand-gold font-bold">{g.category}</span>
                                <div className="flex items-center justify-between gap-2">
                                  <span className="text-xs text-brand-lightBg truncate max-w-[100px]" title={g.title}>{g.title}</span>
                                  <div className="flex items-center gap-1">
                                    <button 
                                      onClick={() => handleToggleGalleryStar(g)}
                                      disabled={actionLoading}
                                      className={`p-1.5 rounded transition-colors ${
                                        g.isStarred 
                                          ? 'bg-brand-gold text-brand-lightBg hover:bg-brand-gold/80' 
                                          : 'bg-white/20 text-white hover:bg-white/40'
                                      }`}
                                      title={g.isStarred ? "Unstar Image" : "Star Image"}
                                    >
                                      <Star size={12} className={g.isStarred ? "fill-current" : ""} />
                                    </button>
                                    <button 
                                      onClick={() => handleDeleteGalleryItem(g._id)}
                                      disabled={actionLoading}
                                      className="p-1.5 rounded bg-red-900 hover:bg-red-805 text-brand-lightBg transition-colors"
                                      title="Delete Image"
                                    >
                                      <Trash2 size={12} />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 3 (Inserted): CATEGORIES CRUD */}
                  {activeTab === 'categories' && (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-brand-brown">
                      {/* Left: Add Category Form */}
                      <div className="lg:col-span-4 bg-brand-beige border border-brand-brown/10 p-6 rounded-lg glass-card h-fit">
                        <h2 className="font-playfair text-xl font-bold text-brand-brown mb-4 border-b border-brand-brown/10 pb-2">
                          Add New Category
                        </h2>
                        <form onSubmit={handleCategoryCreate} className="flex flex-col space-y-4 text-sm">
                          <div className="flex flex-col space-y-1">
                            <label className="text-xs uppercase font-bold text-brand-gold">Category Name *</label>
                            <input
                              type="text"
                              required
                              value={categoryInput}
                              onChange={(e) => setCategoryInput(e.target.value)}
                              placeholder="e.g. Traditional Soups"
                              className="w-full bg-white border border-brand-brown/20 rounded px-4 py-2.5 text-sm text-brand-brown focus:outline-none focus:border-brand-gold transition-colors shadow-sm"
                            />
                          </div>
                          <button
                            type="submit"
                            disabled={actionLoading}
                            className="w-full py-3 bg-brand-gold hover:bg-brand-gold/90 text-brand-lightBg font-bold rounded uppercase tracking-wider text-xs shadow-md transition-colors"
                          >
                            {actionLoading ? 'Creating...' : 'Create Category'}
                          </button>
                        </form>
                      </div>

                      {/* Right: Category List */}
                      <div className="lg:col-span-8 flex flex-col space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <h2 className="font-playfair text-2xl font-bold text-brand-brown">Categories</h2>
                            <span className="font-telugu text-brand-muted text-lg tracking-wide ml-2">వర్గాలు</span>
                          </div>
                          <span className="text-xs text-brand-brown/70 font-semibold uppercase bg-brand-beige px-3 py-1 rounded-full">{categories.length} categories</span>
                        </div>

                        <div className="overflow-x-auto border border-brand-brown/10 rounded-lg glass-card shadow-sm">
                          <table className="w-full text-left border-collapse text-sm">
                            <thead>
                              <tr className="border-b border-brand-brown/10 bg-brand-beige text-brand-brown uppercase tracking-wider text-xs font-bold">
                                <th className="p-4">Name</th>
                                <th className="p-4">Created Date</th>
                                <th className="p-4 text-center">Actions</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-brand-brown/10 text-brand-brown bg-white">
                              {categories.length === 0 ? (
                                <tr>
                                  <td colSpan="3" className="p-8 text-center text-brand-muted">No categories created yet.</td>
                                </tr>
                              ) : (
                                categories.map((cat) => (
                                  <tr key={cat._id} className="hover:bg-brand-beige/40">
                                    <td className="p-4 font-bold text-brand-brown">{cat.name}</td>
                                    <td className="p-4">{new Date(cat.createdAt || Date.now()).toLocaleDateString()}</td>
                                    <td className="p-4">
                                      <div className="flex items-center justify-center">
                                        <button
                                          onClick={() => handleCategoryDelete(cat._id)}
                                          disabled={actionLoading}
                                          className="p-2 rounded bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 transition-colors"
                                          title="Delete Category"
                                        >
                                          <Trash2 size={16} />
                                        </button>
                                      </div>
                                    </td>
                                  </tr>
                                ))
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 4 (Inserted): PAGE IMAGES CUSTOMIZER */}
                  {activeTab === 'pageImages' && (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-brand-brown">
                      {/* Left: Upload/Change Page Image Form */}
                      <div className="lg:col-span-4 bg-brand-beige border border-brand-brown/10 p-6 rounded-lg glass-card h-fit">
                        <h2 className="font-playfair text-xl font-bold text-brand-brown mb-4 border-b border-brand-brown/10 pb-2">
                          Customize Website Images
                        </h2>
                        <form onSubmit={handlePageImageSubmit} className="flex flex-col space-y-4 text-sm">
                          <div className="flex flex-col space-y-1">
                            <label className="text-xs uppercase font-bold text-brand-gold">Select Setting / Image Key *</label>
                            <select
                              required
                              value={selectedPageImageKey}
                              onChange={(e) => setSelectedPageImageKey(e.target.value)}
                              className="w-full bg-white border border-brand-brown/20 rounded px-4 py-2.5 text-sm text-brand-brown focus:outline-none focus:border-brand-gold transition-colors shadow-sm"
                            >
                              <option value="">-- Choose Key to Customize --</option>
                              <optgroup label="Homepage Settings">
                                <option value="home_hero_bg">Home Hero Background</option>
                                <option value="home_hero_biryani">Home Hero Biryani Item</option>
                                <option value="home_hero_thali">Home Hero Thali Item</option>
                                <option value="home_hero_idly">Home Hero Idly Item</option>
                                <option value="home_thali">Home Thali Experience Section</option>
                                <option value="home_sweets">Home Sweets Experience Section</option>
                                <option value="home_banquet">Home Banquet Section Image</option>
                              </optgroup>
                              <optgroup label="About Page Settings">
                                <option value="about_header_bg">About Header Background</option>
                                <option value="about_founding">About Founding Legacy Section</option>
                                <option value="about_philosophy">About Culinary Philosophy Section</option>
                                <option value="about_banquet">About Banquet Hall Section Details</option>
                              </optgroup>
                            </select>
                          </div>

                          <div className="flex flex-col space-y-1">
                            <label className="text-xs uppercase font-bold text-brand-gold">Upload Custom Image *</label>
                            <input
                              type="file"
                              required
                              accept="image/*"
                              onChange={(e) => setPageImageFile(e.target.files[0])}
                              className="w-full bg-white border border-brand-brown/20 rounded px-4 py-2 text-sm text-brand-brown focus:outline-none focus:border-brand-gold transition-colors"
                            />
                          </div>

                          <button
                            type="submit"
                            disabled={actionLoading}
                            className="w-full py-3 bg-brand-gold hover:bg-brand-gold/90 text-brand-lightBg font-bold rounded uppercase tracking-wider text-xs shadow-md transition-colors"
                          >
                            {actionLoading ? 'Uploading...' : 'Save Website Image'}
                          </button>
                        </form>
                      </div>

                      {/* Right: Current Images Grid */}
                      <div className="lg:col-span-8 flex flex-col space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <h2 className="font-playfair text-2xl font-bold text-brand-brown">Custom Page Images</h2>
                            <span className="font-telugu text-brand-muted text-lg tracking-wide ml-2">వెబ్‌సైట్ చిత్రాలు</span>
                          </div>
                          <span className="text-xs text-brand-brown/70 font-semibold uppercase bg-brand-beige px-3 py-1 rounded-full">{pageImages.length} active customizations</span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {pageImages.length === 0 ? (
                            <div className="col-span-2 border border-dashed border-brand-brown/25 rounded-lg flex items-center justify-center p-8 text-center text-brand-muted text-sm bg-brand-beige/30">
                              No custom images uploaded yet. Default placeholders will be loaded.
                            </div>
                          ) : (
                            pageImages.map((img) => (
                              <div key={img._id} className="p-4 rounded-lg bg-white border border-brand-brown/10 glass-card flex flex-col space-y-3 shadow-sm">
                                <div className="flex justify-between items-start">
                                  <div>
                                    <h4 className="font-bold text-brand-brown text-base">{img.label}</h4>
                                    <code className="text-xs text-brand-gold bg-brand-beige/60 px-1.5 py-0.5 rounded font-mono block mt-0.5">{img.key}</code>
                                  </div>
                                  <span className="px-2 py-0.5 rounded-full text-[10px] uppercase font-bold tracking-wider bg-brand-beige border border-brand-brown/10 text-brand-brown">
                                    {img.page}
                                  </span>
                                </div>
                                <div className="aspect-video w-full rounded overflow-hidden bg-brand-beige border border-brand-brown/5">
                                  <img src={getImageUrl(img.imageUrl)} alt={img.label} className="w-full h-full object-cover" />
                                </div>
                                <div className="text-[10px] text-brand-brown/50 text-right">
                                  Updated: {new Date(img.updatedAt || Date.now()).toLocaleString()}
                                </div>
                              </div>
                            ))
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 5: BRANCHES */}
                  {activeTab === 'branches' && (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-brand-brown">
                      {/* Left list */}
                      <div className="lg:col-span-5 flex flex-col space-y-4">
                        <div className="flex items-center gap-2">
                          <h2 className="font-playfair text-2xl font-bold text-brand-brown">Select Branch to Edit</h2>
                          <span className="font-telugu text-brand-muted text-lg tracking-wide ml-2">శాఖను ఎంచుకోండి</span>
                        </div>
                        <div className="flex flex-col space-y-3">
                          {branches.map(b => (
                            <div 
                              key={b._id} 
                              onClick={() => handleEditBranchSelect(b)}
                              className={`p-5 rounded-lg border cursor-pointer transition-all shadow-sm ${
                                selectedBranch?._id === b._id 
                                  ? 'bg-brand-beige border-brand-gold shadow-md' 
                                  : 'bg-white border-brand-brown/10 hover:border-brand-gold/40'
                              }`}
                            >
                              <div className="flex justify-between items-center text-brand-brown">
                                <span className="font-bold text-base md:text-lg">{b.name}</span>
                                <Edit size={16} className="text-brand-gold" />
                              </div>
                              <span className="text-xs text-brand-brown/70 block mt-1">Phone: {b.phone}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Right Form */}
                      <div className="lg:col-span-7">
                        {selectedBranch ? (
                          <div className="bg-brand-beige border border-brand-brown/10 p-6 rounded-lg glass-card text-brand-brown shadow-sm">
                            <h2 className="font-playfair text-xl font-bold text-brand-brown mb-4 border-b border-brand-brown/10 pb-2">
                              Edit Details: <span className="text-brand-gold italic">{selectedBranch.name}</span>
                            </h2>
                            <form onSubmit={handleBranchSubmit} className="flex flex-col space-y-4 text-sm">
                              <div className="flex flex-col space-y-1">
                                <label className="text-xs uppercase font-bold text-brand-gold">Address *</label>
                                <textarea
                                  required
                                  value={branchForm.address}
                                  onChange={(e) => setBranchForm({ ...branchForm, address: e.target.value })}
                                  rows="2"
                                  className="w-full bg-white border border-brand-brown/20 rounded px-4 py-2.5 text-sm text-brand-brown focus:outline-none focus:border-brand-gold transition-colors shadow-sm"
                                />
                              </div>

                              <div className="grid grid-cols-2 gap-4">
                                <div className="flex flex-col space-y-1">
                                  <label className="text-xs uppercase font-bold text-brand-gold">Phone Number(s) *</label>
                                  <input
                                    type="text"
                                    required
                                    value={branchForm.phone}
                                    onChange={(e) => setBranchForm({ ...branchForm, phone: e.target.value })}
                                    className="w-full bg-white border border-brand-brown/20 rounded px-4 py-2.5 text-sm text-brand-brown focus:outline-none focus:border-brand-gold transition-colors shadow-sm"
                                  />
                                </div>
                                <div className="flex flex-col space-y-1">
                                  <label className="text-xs uppercase font-bold text-brand-gold">Opening Hours *</label>
                                  <input
                                    type="text"
                                    required
                                    value={branchForm.timings}
                                    onChange={(e) => setBranchForm({ ...branchForm, timings: e.target.value })}
                                    className="w-full bg-white border border-brand-brown/20 rounded px-4 py-2.5 text-sm text-brand-brown focus:outline-none focus:border-brand-gold transition-colors shadow-sm"
                                  />
                                </div>
                              </div>

                              <div className="flex flex-col space-y-1">
                                <label className="text-xs uppercase font-bold text-brand-gold">Google Maps Link *</label>
                                <input
                                  type="url"
                                  required
                                  value={branchForm.googleMapsLink}
                                  onChange={(e) => setBranchForm({ ...branchForm, googleMapsLink: e.target.value })}
                                  className="w-full bg-white border border-brand-brown/20 rounded px-4 py-2.5 text-sm text-brand-brown focus:outline-none focus:border-brand-gold transition-colors shadow-sm"
                                />
                              </div>

                              <div className="flex flex-col space-y-1">
                                <label className="text-xs uppercase font-bold text-brand-gold">Branch Description</label>
                                <textarea
                                  value={branchForm.description}
                                  onChange={(e) => setBranchForm({ ...branchForm, description: e.target.value })}
                                  rows="3"
                                  className="w-full bg-white border border-brand-brown/20 rounded px-4 py-2.5 text-sm text-brand-brown focus:outline-none focus:border-brand-gold transition-colors shadow-sm"
                                />
                              </div>

                              <div className="pt-2 flex space-x-2">
                                <button
                                  type="submit"
                                  disabled={actionLoading}
                                  className="flex-grow py-3 bg-brand-gold hover:bg-brand-gold/90 text-brand-lightBg font-bold rounded uppercase tracking-wider text-xs shadow-md transition-colors"
                                >
                                  {actionLoading ? 'Saving...' : 'Save Branch Details'}
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setSelectedBranch(null)}
                                  className="py-3 px-5 border border-brand-brown/30 hover:border-brand-brown/50 rounded text-xs uppercase tracking-wider font-semibold text-brand-brown transition-colors"
                                >
                                  Cancel
                                </button>
                              </div>
                            </form>
                          </div>
                        ) : (
                          <div className="h-full border border-dashed border-brand-brown/25 rounded-lg flex items-center justify-center p-8 text-center text-brand-muted text-sm md:text-base bg-brand-beige/30">
                            Please select a branch from the left list to edit details.
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                </div>
              )}

            </div>
          )}

        </div>

        <Footer />
      </div>
    </SmoothScroll>
  );
};

export default Admin;
