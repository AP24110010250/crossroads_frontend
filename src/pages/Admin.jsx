import React, { useState, useEffect } from 'react';
import Navbar from '../components/sections/Navbar';
import Footer from '../components/sections/Footer';
import SmoothScroll from '../components/animations/SmoothScroll';
import { getImageUrl } from '../utils/imageHelper';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { 
  Lock, Calendar, Utensils, Star, Image as ImageIcon, MapPin, 
  Check, X, Trash2, Plus, Edit, RefreshCw, AlertCircle, Sparkles, CheckCircle2,
  Tag, FileImage, LogOut
} from 'lucide-react';

const Admin = () => {
  const { isAuthenticated, login, logout, user, token, API_URL } = useAuth();
  
  // Mobile check
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
    category: '',
    isVeg: false,
    isChefSpecial: false,
    isStarred: false,
    imageFile: null
  });
  const [editingMenuId, setEditingMenuId] = useState(null);

  // Category Form State
  const [categoryInput, setCategoryInput] = useState('');

  // Testimonial Form State
  const [testimonialForm, setTestimonialForm] = useState({
    name: '',
    rating: 5,
    comment: '',
    designation: 'Happy Diner',
    approved: true
  });
  const [editingTestimonialId, setEditingTestimonialId] = useState(null);

  // Gallery Creation Form State
  const [galleryForm, setGalleryForm] = useState({
    title: '',
    category: 'Food',
    isStarred: false,
    imageFile: null
  });

  // Page Image customization state
  const [pageFilter, setPageFilter] = useState('home');
  const [selectedPageImageKey, setSelectedPageImageKey] = useState('');
  const [pageImageFile, setPageImageFile] = useState(null);

  // Customizer image mappings (Cards and items only, no background images)
  const homePageOptions = [
    { key: 'home_hero_biryani', label: 'Home Hero Biryani Item' },
    { key: 'home_hero_thali', label: 'Home Hero Thali Item' },
    { key: 'home_hero_idly', label: 'Home Hero Idly Item' },
    { key: 'home_thali', label: 'Home Thali Experience Section' },
    { key: 'home_sweets', label: 'Home Sweets Experience Section' },
    { key: 'home_banquet', label: 'Home Banquet Section Image' },
    { key: 'home_timeline_1999', label: 'Timeline 1999 Image (25 Yrs Journey)' },
    { key: 'home_timeline_2008', label: 'Timeline 2008 Image (25 Yrs Journey)' },
    { key: 'home_timeline_2017', label: 'Timeline 2017 Image (25 Yrs Journey)' },
    { key: 'home_timeline_2023', label: 'Timeline 2023 Image (25 Yrs Journey)' },
    { key: 'home_branch_governorpet', label: 'Governorpet Branch Image' },
    { key: 'home_branch_moghalrajapuram', label: 'Moghalrajapuram Branch Image' },
    { key: 'home_branch_gollapudi', label: 'Gollapudi Branch Image' },
    { key: 'home_branch_gannavaram', label: 'Gannavaram Branch Image' }
  ];

  const aboutPageOptions = [
    { key: 'about_founding', label: 'About Founding Legacy Section' },
    { key: 'about_philosophy', label: 'About Culinary Philosophy Section' },
    { key: 'about_banquet', label: 'About Banquet Hall Section Details' }
  ];

  // Branch Editing Form State
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [branchForm, setBranchForm] = useState({
    address: '',
    phone: '',
    timings: '',
    googleMapsLink: '',
    description: ''
  });
  const [branchImageFile, setBranchImageFile] = useState(null);

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
        
        const catRes = await axios.get(`${API_URL}/categories`);
        if (catRes.data.success) {
          setCategories(catRes.data.data);
          if (catRes.data.data.length > 0 && !menuForm.category) {
            setMenuForm(prev => ({ ...prev, category: catRes.data.data[0].name }));
          }
        }
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

  // Testimonial CRUD actions
  const handleTestimonialInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTestimonialForm({
      ...testimonialForm,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleTestimonialSubmit = async (e) => {
    e.preventDefault();
    setActionLoading(true);
    try {
      if (editingTestimonialId) {
        const res = await axios.put(`${API_URL}/testimonials/${editingTestimonialId}`, testimonialForm);
        if (res.data.success) {
          alert('Testimonial updated successfully!');
          resetTestimonialForm();
          fetchTabResources();
        }
      } else {
        const res = await axios.post(`${API_URL}/testimonials`, testimonialForm);
        if (res.data.success) {
          alert('Testimonial created successfully!');
          resetTestimonialForm();
          fetchTabResources();
        }
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Testimonial operation failed.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleEditTestimonialSelect = (item) => {
    setEditingTestimonialId(item._id);
    setTestimonialForm({
      name: item.name,
      rating: item.rating,
      comment: item.comment,
      designation: item.designation || 'Happy Diner',
      approved: item.approved
    });
  };

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

  const resetTestimonialForm = () => {
    setEditingTestimonialId(null);
    setTestimonialForm({
      name: '',
      rating: 5,
      comment: '',
      designation: 'Happy Diner',
      approved: true
    });
  };

  // Menu Form Handlers
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

  // Category CRUD actions inside Menu Tab
  const handleCategoryCreate = async (e) => {
    e.preventDefault();
    if (!categoryInput.trim()) return;
    setActionLoading(true);
    try {
      const res = await axios.post(`${API_URL}/categories`, { name: categoryInput.trim() });
      if (res.data.success) {
        alert('Category added successfully!');
        setCategoryInput('');
        // Reload categories for dropdown
        const catRes = await axios.get(`${API_URL}/categories`);
        if (catRes.data.success) setCategories(catRes.data.data);
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to add category.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleCategoryDelete = async (id) => {
    if (!window.confirm('Delete this category permanently? This may affect items tied to this category.')) return;
    setActionLoading(true);
    try {
      const res = await axios.delete(`${API_URL}/categories/${id}`);
      if (res.data.success) {
        alert('Category deleted successfully!');
        // Reload categories
        const catRes = await axios.get(`${API_URL}/categories`);
        if (catRes.data.success) setCategories(catRes.data.data);
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete category.');
    } finally {
      setActionLoading(false);
    }
  };

  // Gallery actions
  const handleGallerySubmit = async (e) => {
    e.preventDefault();
    if (!galleryForm.imageFile || !galleryForm.title) {
      alert('Please provide a title and image file!');
      return;
    }
    setActionLoading(true);
    
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

  // Page Image upload actions (restructured)
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
    const mapping = [...homePageOptions, ...aboutPageOptions].find(opt => opt.key === selectedPageImageKey);
    
    fd.append('label', existing?.label || mapping?.label || selectedPageImageKey);
    fd.append('page', pageFilter);

    try {
      const res = await axios.put(`${API_URL}/page-images/${selectedPageImageKey}`, fd, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      if (res.data.success) {
        alert('Website image updated successfully!');
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
    setBranchImageFile(null);
  };

  const handleBranchSubmit = async (e) => {
    e.preventDefault();
    setActionLoading(true);

    const syncFooter = window.confirm("Would you like to synchronize these address and phone number details to the footer as well?");

    const fd = new FormData();
    fd.append('address', branchForm.address);
    fd.append('phone', branchForm.phone);
    fd.append('timings', branchForm.timings);
    fd.append('googleMapsLink', branchForm.googleMapsLink);
    fd.append('description', branchForm.description);
    fd.append('updateFooter', syncFooter);
    if (branchImageFile) {
      fd.append('image', branchImageFile);
    }

    try {
      const res = await axios.put(`${API_URL}/branches/${selectedBranch._id}`, fd, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      if (res.data.success) {
        alert('Branch details updated successfully!');
        setSelectedBranch(null);
        setBranchImageFile(null);
        fetchTabResources();
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Failed updating branch.');
    } finally {
      setActionLoading(false);
    }
  };

  // Desktop block screen for mobile
  if (isMobile) {
    return (
      <div className="min-h-screen bg-brand-lightBg text-brand-brown flex flex-col justify-center items-center p-6 text-center">
        <div className="max-w-md p-8 bg-white border border-brand-brown/10 rounded-xl shadow-lg flex flex-col items-center space-y-4">
          <AlertCircle size={48} className="text-brand-red animate-pulse" />
          <h2 className="font-playfair text-2xl font-bold">Desktop Access Only</h2>
          <p className="text-sm text-brand-muted leading-relaxed">
            The Admin Portal is optimized for desktop screens to ensure secure and efficient management. Please log in from a desktop browser.
          </p>
          <Link to="/" className="px-6 py-2.5 bg-brand-red text-white font-bold rounded uppercase tracking-wider text-xs">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <SmoothScroll>
      <div className="relative min-h-screen bg-[#FAF6EE] text-brand-brown flex flex-col pt-[72px]">
        <Navbar />

        {/* Simplified Dashboard Frame */}
        <div className="flex-grow max-w-7xl mx-auto w-full py-8 px-6 md:px-12 z-10 text-brand-brown">
          
          {/* 1. Login Gate Screen */}
          {!isAuthenticated ? (
            <div className="max-w-md mx-auto my-12 p-8 bg-white border border-brand-brown/10 rounded-xl shadow-md flex flex-col space-y-6">
              <div className="text-center flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-brand-gold/10 flex items-center justify-center text-brand-gold mb-2">
                  <Lock size={20} />
                </div>
                <h2 className="font-playfair text-2xl font-bold text-brand-brown">Admin Portal</h2>
                <span className="text-xs text-brand-muted mt-1 uppercase tracking-widest font-semibold">Sign in to manage Crossroads</span>
              </div>

              <form onSubmit={handleLoginSubmit} className="flex flex-col space-y-4 text-xs">
                {loginError && (
                  <div className="p-3 rounded bg-red-50 border border-red-200 text-red-700 font-medium flex items-center gap-1.5">
                    <AlertCircle size={14} className="shrink-0 text-red-500" />
                    <span>{loginError}</span>
                  </div>
                )}
                <div className="flex flex-col space-y-1">
                  <label className="uppercase tracking-wider text-brand-gold font-bold">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@crossroads.com"
                    className="w-full bg-white border border-brand-brown/20 rounded px-3 py-2 text-sm text-brand-brown focus:outline-none focus:border-brand-gold transition-colors"
                  />
                </div>
                <div className="flex flex-col space-y-1">
                  <label className="uppercase tracking-wider text-brand-gold font-bold">Password</label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-white border border-brand-brown/20 rounded px-3 py-2 text-sm text-brand-brown focus:outline-none focus:border-brand-gold transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loginLoading}
                  className="w-full py-3 bg-brand-red text-brand-lightBg uppercase text-xs font-bold rounded tracking-wider disabled:opacity-50 mt-2 hover:bg-brand-red/90 transition-colors"
                >
                  {loginLoading ? 'Authenticating...' : 'Sign In'}
                </button>
              </form>
            </div>
          ) : (
            // 2. Logged-in Dashboard Area
            <div className="flex flex-col space-y-6">
              
              {/* Sleek dashboard header */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-brand-brown/10 pb-4">
                <div>
                  <span className="text-[10px] text-brand-gold uppercase tracking-[0.25em] font-bold">
                    MERN Portal &bull; Role: {user?.role || 'Owner'}
                  </span>
                  <h1 className="font-playfair text-3xl font-bold text-brand-brown">
                    Dashboard: <span className="text-brand-gold italic">{user?.username || 'Admin'}</span>
                  </h1>
                </div>
                
                {/* Tab selector menu */}
                <div className="flex flex-wrap items-center gap-1.5">
                  {[
                    { id: 'reservations', label: 'Reservations', icon: <Calendar size={15} /> },
                    { id: 'menu', label: 'Menu & Categories', icon: <Utensils size={15} /> },
                    { id: 'testimonials', label: 'Testimonials', icon: <Star size={15} /> },
                    { id: 'gallery', label: 'Gallery', icon: <ImageIcon size={15} /> },
                    { id: 'pageImages', label: 'Pages Settings', icon: <FileImage size={15} /> },
                    { id: 'branches', label: 'Branches', icon: <MapPin size={15} /> }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => { setActiveTab(tab.id); resetMenuForm(); resetTestimonialForm(); setSelectedBranch(null); }}
                      className={`px-3.5 py-2 rounded text-xs uppercase font-extrabold tracking-wider flex items-center gap-1.5 transition-all ${
                        activeTab === tab.id 
                          ? 'bg-brand-gold text-brand-lightBg shadow-sm' 
                          : 'bg-white border border-brand-brown/10 hover:border-brand-gold text-brand-brown'
                      }`}
                    >
                      {tab.icon}
                      <span>{tab.label}</span>
                    </button>
                  ))}
                  <button 
                    onClick={logout}
                    className="px-3.5 py-2 rounded text-xs uppercase font-extrabold tracking-wider flex items-center gap-1.5 bg-red-50 hover:bg-red-100 border border-red-200 text-red-750 ml-2"
                  >
                    <LogOut size={15} />
                    <span>Log Out</span>
                  </button>
                </div>
              </div>

              {/* Loader */}
              {loading && (
                <div className="flex flex-col items-center justify-center py-16 space-y-2">
                  <RefreshCw className="animate-spin text-brand-gold" size={24} />
                  <span className="text-xs text-brand-muted uppercase tracking-widest font-semibold">Loading...</span>
                </div>
              )}

              {/* Error banner */}
              {error && (
                <div className="p-3.5 rounded bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2 font-medium">
                  <AlertCircle size={14} className="text-red-500 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Main Content Sections based on Active Tab */}
              {!loading && (
                <div className="w-full text-brand-brown">
                  
                  {/* TAB 1: RESERVATIONS */}
                  {activeTab === 'reservations' && (
                    <div className="flex flex-col space-y-4">
                      <div className="flex items-center justify-between">
                        <h2 className="font-playfair text-xl font-bold text-brand-brown">Guest Reservation Requests</h2>
                        <span className="text-xs text-brand-brown/70 font-semibold uppercase bg-white border border-brand-brown/10 px-2.5 py-1 rounded">{reservations.length} records</span>
                      </div>
                      <div className="overflow-x-auto border border-brand-brown/10 rounded-lg bg-white shadow-xs">
                        <table className="w-full text-left border-collapse text-xs">
                          <thead>
                            <tr className="border-b border-brand-brown/10 bg-brand-beige text-brand-brown uppercase tracking-wider font-bold">
                              <th className="p-3">Guest</th>
                              <th className="p-3">Contact</th>
                              <th className="p-3">Branch</th>
                              <th className="p-3">Schedule</th>
                              <th className="p-3">Covers</th>
                              <th className="p-3">Status</th>
                              <th className="p-3 text-center">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-brand-brown/10 text-brand-brown">
                            {reservations.length === 0 ? (
                              <tr>
                                <td colSpan="7" className="p-6 text-center text-brand-muted">No reservations booked yet.</td>
                              </tr>
                            ) : (
                              reservations.map((r) => (
                                <tr key={r._id} className="hover:bg-brand-beige/20">
                                  <td className="p-3 font-bold">{r.name}</td>
                                  <td className="p-3">
                                    <span className="font-semibold block">{r.phone}</span>
                                    <span className="text-[10px] text-brand-brown/70">{r.email || 'No Email'}</span>
                                  </td>
                                  <td className="p-3 text-brand-red font-bold">{r.branch}</td>
                                  <td className="p-3">
                                    <span>{r.date}</span>
                                    <span className="text-[10px] text-brand-brown/70 block">{r.time}</span>
                                  </td>
                                  <td className="p-3">
                                    <span className="bg-brand-beige px-2 py-0.5 rounded font-semibold">{r.guests} Guests</span>
                                    {r.notes && <p className="text-[10px] text-brand-brown/70 italic mt-0.5 max-w-[150px] truncate" title={r.notes}>{r.notes}</p>}
                                  </td>
                                  <td className="p-3">
                                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${
                                      r.status === 'Confirmed' ? 'bg-green-50 text-green-700 border-green-200' :
                                      r.status === 'Cancelled' ? 'bg-red-50 text-red-700 border-red-200' :
                                      'bg-yellow-50 text-yellow-850 border-yellow-200'
                                    }`}>
                                      {r.status}
                                    </span>
                                  </td>
                                  <td className="p-3">
                                    <div className="flex items-center justify-center space-x-1">
                                      {r.status === 'Pending' && (
                                        <>
                                          <button 
                                            onClick={() => handleUpdateReservationStatus(r._id, 'Confirmed')}
                                            disabled={actionLoading}
                                            className="p-1.5 rounded bg-green-50 hover:bg-green-100 text-green-700 border border-green-200"
                                            title="Confirm"
                                          >
                                            <Check size={13} />
                                          </button>
                                          <button 
                                            onClick={() => handleUpdateReservationStatus(r._id, 'Cancelled')}
                                            disabled={actionLoading}
                                            className="p-1.5 rounded bg-yellow-50 hover:bg-yellow-100 text-yellow-700 border border-yellow-250"
                                            title="Cancel"
                                          >
                                            <X size={13} />
                                          </button>
                                        </>
                                      )}
                                      <button 
                                        onClick={() => handleDeleteReservation(r._id)}
                                        disabled={actionLoading}
                                        className="p-1.5 rounded bg-red-50 hover:bg-red-100 text-red-700 border border-red-200"
                                        title="Delete"
                                      >
                                        <Trash2 size={13} />
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
 
                  {/* TAB 2: MENU & CATEGORIES (Category CRUD integrated here) */}
                  {activeTab === 'menu' && (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-brand-brown">
                      
                      {/* Left: Forms */}
                      <div className="lg:col-span-4 flex flex-col space-y-6">
                        
                        {/* Menu Item Form */}
                        <div className="bg-white border border-brand-brown/10 p-5 rounded-lg shadow-xs h-fit">
                          <h2 className="font-playfair text-lg font-bold text-brand-brown mb-3 border-b border-brand-brown/10 pb-1.5">
                            {editingMenuId ? 'Edit Dish' : 'Add Dish'}
                          </h2>
                          
                          <form onSubmit={handleMenuSubmit} className="flex flex-col space-y-3.5 text-xs">
                            <div className="flex flex-col space-y-1">
                              <label className="font-bold text-brand-gold">Dish Name *</label>
                              <input
                                type="text"
                                required
                                name="name"
                                value={menuForm.name}
                                onChange={handleMenuInputChange}
                                placeholder="Ulavacharu Chicken Biryani"
                                className="w-full bg-white border border-brand-brown/20 rounded px-3 py-2 text-sm text-brand-brown focus:outline-none focus:border-brand-gold"
                              />
                            </div>

                            <div className="flex flex-col space-y-1">
                              <label className="font-bold text-brand-gold">Description</label>
                              <textarea
                                name="description"
                                value={menuForm.description}
                                onChange={handleMenuInputChange}
                                rows="2"
                                placeholder="Horsegram slow-cooked with spices..."
                                className="w-full bg-white border border-brand-brown/20 rounded px-3 py-2 text-sm text-brand-brown focus:outline-none focus:border-brand-gold"
                              />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                              <div className="flex flex-col space-y-1">
                                <label className="font-bold text-brand-gold">Price (₹) *</label>
                                <input
                                  type="number"
                                  required
                                  name="price"
                                  value={menuForm.price}
                                  onChange={handleMenuInputChange}
                                  placeholder="380"
                                  className="w-full bg-white border border-brand-brown/20 rounded px-3 py-2 text-sm focus:outline-none focus:border-brand-gold"
                                />
                              </div>
                              <div className="flex flex-col space-y-1">
                                <label className="font-bold text-brand-gold">Half Price (Optional)</label>
                                <input
                                  type="number"
                                  name="priceHalf"
                                  value={menuForm.priceHalf}
                                  onChange={handleMenuInputChange}
                                  placeholder="210"
                                  className="w-full bg-white border border-brand-brown/20 rounded px-3 py-2 text-sm focus:outline-none focus:border-brand-gold"
                                />
                              </div>
                            </div>

                            <div className="flex flex-col space-y-1">
                              <label className="font-bold text-brand-gold">Category *</label>
                              <select
                                name="category"
                                value={menuForm.category}
                                onChange={handleMenuInputChange}
                                className="w-full bg-white border border-brand-brown/20 rounded px-3 py-2 text-sm focus:outline-none focus:border-brand-gold"
                              >
                                {categories.map(cat => (
                                  <option key={cat._id || cat.name} value={cat.name}>{cat.name}</option>
                                ))}
                              </select>
                            </div>

                            <div className="flex flex-col space-y-1">
                              <label className="font-bold text-brand-gold">
                                {editingMenuId ? 'New Image (Optional)' : 'Dish Image *'}
                              </label>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={handleMenuFileChange}
                                className="w-full bg-white border border-brand-brown/20 rounded px-3 py-1.5"
                              />
                            </div>

                            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 pt-1.5">
                              <label className="flex items-center space-x-1.5 cursor-pointer text-brand-brown font-semibold">
                                <input
                                  type="checkbox"
                                  name="isVeg"
                                  checked={menuForm.isVeg}
                                  onChange={handleMenuInputChange}
                                  className="w-4 h-4 accent-brand-gold rounded"
                                />
                                <span>Veg</span>
                              </label>
                              <label className="flex items-center space-x-1.5 cursor-pointer text-brand-gold font-bold">
                                <input
                                  type="checkbox"
                                  name="isChefSpecial"
                                  checked={menuForm.isChefSpecial}
                                  onChange={handleMenuInputChange}
                                  className="w-4 h-4 accent-brand-gold rounded"
                                />
                                <span className="flex items-center gap-0.5"><Sparkles size={11} /> Chef's Choice</span>
                              </label>
                              <label className="flex items-center space-x-1.5 cursor-pointer text-brand-red font-bold">
                                <input
                                  type="checkbox"
                                  name="isStarred"
                                  checked={menuForm.isStarred}
                                  onChange={handleMenuInputChange}
                                  className="w-4 h-4 accent-brand-red rounded"
                                />
                                <span className="flex items-center gap-0.5"><Star size={11} className="fill-brand-red" /> Starred</span>
                              </label>
                            </div>

                            <div className="flex space-x-2 pt-2">
                              <button
                                type="submit"
                                disabled={actionLoading}
                                className="flex-grow py-2.5 bg-brand-gold text-brand-lightBg font-extrabold rounded uppercase tracking-wider hover:bg-brand-gold/90"
                              >
                                {actionLoading ? 'Saving...' : editingMenuId ? 'Save Edit' : 'Add Dish'}
                              </button>
                              {editingMenuId && (
                                <button
                                  type="button"
                                  onClick={resetMenuForm}
                                  className="py-2.5 px-3 border border-brand-brown/30 rounded font-semibold text-brand-brown"
                                >
                                  Cancel
                                </button>
                              )}
                            </div>
                          </form>
                        </div>

                        {/* Integrated Category CRUD Form & List */}
                        <div className="bg-white border border-brand-brown/10 p-5 rounded-lg shadow-xs">
                          <h2 className="font-playfair text-lg font-bold text-brand-brown mb-3 border-b border-brand-brown/10 pb-1.5">
                            Manage Categories
                          </h2>
                          <form onSubmit={handleCategoryCreate} className="flex gap-2 mb-4 text-xs">
                            <input
                              type="text"
                              required
                              value={categoryInput}
                              onChange={(e) => setCategoryInput(e.target.value)}
                              placeholder="New category name"
                              className="flex-grow bg-white border border-brand-brown/20 rounded px-3 py-2 focus:outline-none"
                            />
                            <button
                              type="submit"
                              disabled={actionLoading}
                              className="px-4 py-2 bg-brand-gold text-white font-bold rounded uppercase tracking-wider"
                            >
                              Add
                            </button>
                          </form>
                          
                          <div className="max-h-52 overflow-y-auto border border-brand-brown/10 rounded divide-y divide-brand-brown/10 text-xs">
                            {categories.length === 0 ? (
                              <div className="p-3 text-center text-brand-muted">No categories created yet.</div>
                            ) : (
                              categories.map((cat) => (
                                <div key={cat._id} className="flex items-center justify-between p-2.5 hover:bg-brand-beige/20">
                                  <span className="font-bold text-brand-brown">{cat.name}</span>
                                  <button
                                    onClick={() => handleCategoryDelete(cat._id)}
                                    disabled={actionLoading}
                                    className="p-1 rounded bg-red-50 text-red-600 border border-red-100 hover:bg-red-100"
                                    title="Delete Category"
                                  >
                                    <Trash2 size={12} />
                                  </button>
                                </div>
                              ))
                            )}
                          </div>
                        </div>
                        
                      </div>

                      {/* Right: Menu Items List */}
                      <div className="lg:col-span-8 flex flex-col space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <h2 className="font-playfair text-xl font-bold text-brand-brown">Current Dishes</h2>
                            <span className="text-[10px] text-brand-brown/60 uppercase font-bold bg-brand-beige/50 px-2 py-0.5 rounded border border-brand-brown/10">Starred: {menuItems.filter(m=>m.isStarred).length} (Min 3, Max 6)</span>
                          </div>
                          <span className="text-xs text-brand-brown/70 font-semibold uppercase bg-white border border-brand-brown/10 px-2.5 py-1 rounded">{menuItems.length} items</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                          {menuItems.map(item => (
                            <div key={item._id} className="flex gap-3.5 p-4 rounded-lg bg-white border border-brand-brown/10 relative hover:border-brand-gold/30 transition-colors shadow-xs">
                              <div className="w-16 h-16 rounded overflow-hidden shrink-0 border border-brand-brown/10">
                                <img src={getImageUrl(item.image)} alt={item.name} className="w-full h-full object-cover" />
                              </div>
                              <div className="flex flex-col space-y-0.5 flex-grow pr-20 text-xs">
                                <div className="flex items-center gap-1 flex-wrap">
                                  <span className="font-bold text-brand-brown text-sm leading-tight">{item.name}</span>
                                  {item.isStarred && <Star size={11} className="text-brand-red fill-brand-red shrink-0" />}
                                  {item.isChefSpecial && <Sparkles size={11} className="text-brand-gold shrink-0" />}
                                  <span className={`w-2 h-2 rounded-full shrink-0 border border-white ${item.isVeg ? 'bg-green-600' : 'bg-red-600'}`} />
                                </div>
                                <span className="text-brand-red font-bold text-sm">₹{item.price} {item.priceHalf && <span className="text-[10px] text-brand-brown/50 font-normal">(Half: ₹{item.priceHalf})</span>}</span>
                                <span className="text-[10px] text-brand-brown/60 font-semibold uppercase tracking-wider">Category: {item.category}</span>
                                <p className="text-[10px] text-brand-brown/70 italic line-clamp-1 mt-0.5">{item.description}</p>
                              </div>

                              {/* Action buttons */}
                              <div className="absolute top-3.5 right-3.5 flex items-center space-x-1">
                                <button 
                                  onClick={() => handleToggleMenuStar(item)}
                                  className={`p-1.5 rounded border transition-colors ${
                                    item.isStarred 
                                      ? 'bg-brand-gold border-brand-gold text-brand-lightBg' 
                                      : 'bg-white border-brand-brown/15 hover:border-brand-gold text-brand-brown'
                                  }`}
                                  title="Toggle Star"
                                >
                                  <Star size={12} className={item.isStarred ? "fill-current" : ""} />
                                </button>
                                <button 
                                  onClick={() => handleEditMenuSelect(item)}
                                  className="p-1.5 rounded bg-white border border-brand-brown/15 hover:border-brand-gold text-brand-brown"
                                  title="Edit"
                                >
                                  <Edit size={12} />
                                </button>
                                <button 
                                  onClick={() => handleDeleteMenuItem(item._id)}
                                  className="p-1.5 rounded bg-white border border-brand-brown/15 hover:border-brand-red text-red-650"
                                  title="Delete"
                                >
                                  <Trash2 size={12} />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                    </div>
                  )}

                  {/* TAB 3: TESTIMONIALS (Full CRUD added) */}
                  {activeTab === 'testimonials' && (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-brand-brown">
                      
                      {/* Left: Testimonial Edit/Add Form */}
                      <div className="lg:col-span-4 bg-white border border-brand-brown/10 p-5 rounded-lg shadow-xs h-fit">
                        <h2 className="font-playfair text-lg font-bold text-brand-brown mb-3 border-b border-brand-brown/10 pb-1.5">
                          {editingTestimonialId ? 'Edit Review' : 'Add Guest Review'}
                        </h2>
                        
                        <form onSubmit={handleTestimonialSubmit} className="flex flex-col space-y-3.5 text-xs">
                          <div className="flex flex-col space-y-1">
                            <label className="font-bold text-brand-gold">Guest Name *</label>
                            <input
                              type="text"
                              required
                              name="name"
                              value={testimonialForm.name}
                              onChange={handleTestimonialInputChange}
                              placeholder="e.g. K. Viswanath"
                              className="w-full bg-white border border-brand-brown/20 rounded px-3 py-2 text-sm text-brand-brown focus:outline-none"
                            />
                          </div>

                          <div className="flex flex-col space-y-1">
                            <label className="font-bold text-brand-gold">Designation / Role *</label>
                            <input
                              type="text"
                              required
                              name="designation"
                              value={testimonialForm.designation}
                              onChange={handleTestimonialInputChange}
                              placeholder="e.g. Local Food Critic"
                              className="w-full bg-white border border-brand-brown/20 rounded px-3 py-2 text-sm text-brand-brown focus:outline-none"
                            />
                          </div>

                          <div className="flex flex-col space-y-1">
                            <label className="font-bold text-brand-gold">Rating (1 to 5) *</label>
                            <select
                              name="rating"
                              value={testimonialForm.rating}
                              onChange={handleTestimonialInputChange}
                              className="w-full bg-white border border-brand-brown/20 rounded px-3 py-2 text-sm focus:outline-none"
                            >
                              {[5, 4, 3, 2, 1].map(num => (
                                <option key={num} value={num}>{num} Star{num > 1 ? 's' : ''}</option>
                              ))}
                            </select>
                          </div>

                          <div className="flex flex-col space-y-1">
                            <label className="font-bold text-brand-gold">Review Comment *</label>
                            <textarea
                              required
                              name="comment"
                              value={testimonialForm.comment}
                              onChange={handleTestimonialInputChange}
                              rows="3"
                              placeholder="Write the diner's quote..."
                              className="w-full bg-white border border-brand-brown/20 rounded px-3 py-2 text-sm focus:outline-none"
                            />
                          </div>

                          <label className="flex items-center space-x-2 cursor-pointer font-semibold text-brand-brown">
                            <input
                              type="checkbox"
                              name="approved"
                              checked={testimonialForm.approved}
                              onChange={handleTestimonialInputChange}
                              className="w-4 h-4 accent-brand-gold rounded"
                            />
                            <span>Approved (Display on Homepage)</span>
                          </label>

                          <div className="flex space-x-2 pt-2">
                            <button
                              type="submit"
                              disabled={actionLoading}
                              className="flex-grow py-2.5 bg-brand-gold text-brand-lightBg font-extrabold rounded uppercase tracking-wider hover:bg-brand-gold/90"
                            >
                              {actionLoading ? 'Saving...' : editingTestimonialId ? 'Save Changes' : 'Create Testimonial'}
                            </button>
                            {editingTestimonialId && (
                              <button
                                type="button"
                                onClick={resetTestimonialForm}
                                className="py-2.5 px-3 border border-brand-brown/30 rounded font-semibold text-brand-brown"
                              >
                                Cancel
                              </button>
                            )}
                          </div>
                        </form>
                      </div>

                      {/* Right: Testimonials Review List */}
                      <div className="lg:col-span-8 flex flex-col space-y-4">
                        <div className="flex items-center justify-between">
                          <h2 className="font-playfair text-xl font-bold text-brand-brown">Diners Review List</h2>
                          <span className="text-xs text-brand-brown/70 font-semibold uppercase bg-white border border-brand-brown/10 px-2.5 py-1 rounded">{testimonials.length} reviews</span>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {testimonials.map(t => (
                            <div key={t._id} className="p-4 rounded-lg bg-white border border-brand-brown/10 flex flex-col justify-between space-y-3 hover:border-brand-gold/30 transition-colors shadow-xs">
                              <div className="flex flex-col space-y-1.5 text-xs">
                                <div className="flex items-center justify-between gap-2">
                                  <span className="font-bold text-brand-brown text-sm">{t.name}</span>
                                  <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider border ${
                                    t.approved ? 'bg-green-50 text-green-700 border-green-200' : 'bg-yellow-50 text-yellow-800 border-yellow-250'
                                  }`}>
                                    {t.approved ? 'Approved' : 'Pending'}
                                  </span>
                                </div>
                                <span className="text-[10px] text-brand-brown/60 uppercase font-semibold tracking-wider leading-none">{t.designation || 'Happy Diner'}</span>
                                <div className="flex text-brand-gold space-x-0.5">
                                  {Array.from({ length: t.rating || 5 }).map((_, i) => <Star key={i} size={11} fill="currentColor" />)}
                                </div>
                                <p className="text-brand-brown/90 italic font-light pt-1 leading-relaxed">"{t.comment}"</p>
                              </div>

                              <div className="pt-2 border-t border-brand-brown/10 flex items-center justify-end space-x-1 text-xs">
                                {!t.approved && (
                                  <button 
                                    onClick={() => handleApproveTestimonial(t._id)}
                                    disabled={actionLoading}
                                    className="p-1.5 rounded bg-green-50 hover:bg-green-100 text-green-700 border border-green-200 font-bold"
                                    title="Approve"
                                  >
                                    <Check size={12} />
                                  </button>
                                )}
                                <button 
                                  onClick={() => handleEditTestimonialSelect(t)}
                                  className="p-1.5 rounded bg-white hover:bg-brand-beige/40 text-brand-brown border border-brand-brown/15 font-bold"
                                  title="Edit"
                                >
                                  <Edit size={12} />
                                </button>
                                <button 
                                  onClick={() => handleDeleteTestimonial(t._id)}
                                  disabled={actionLoading}
                                  className="p-1.5 rounded bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 font-bold"
                                  title="Delete"
                                >
                                  <Trash2 size={12} />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                    </div>
                  )}

                  {/* TAB 4: GALLERY */}
                  {activeTab === 'gallery' && (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-brand-brown">
                      
                      {/* Left: Upload Form */}
                      <div className="lg:col-span-4 bg-white border border-brand-brown/10 p-5 rounded-lg shadow-xs h-fit">
                        <h2 className="font-playfair text-lg font-bold text-brand-brown mb-3 border-b border-brand-brown/10 pb-1.5">Upload Gallery</h2>
                        
                        <form onSubmit={handleGallerySubmit} className="flex flex-col space-y-3.5 text-xs">
                          <div className="flex flex-col space-y-1">
                            <label className="font-bold text-brand-gold">Image Title *</label>
                            <input
                              type="text"
                              required
                              value={galleryForm.title}
                              onChange={(e) => setGalleryForm({ ...galleryForm, title: e.target.value })}
                              placeholder="Classic NTR poster framed"
                              className="w-full bg-white border border-brand-brown/20 rounded px-3 py-2 text-sm text-brand-brown focus:outline-none"
                            />
                          </div>

                          <div className="flex flex-col space-y-1">
                            <label className="font-bold text-brand-gold">Category *</label>
                            <select
                              value={galleryForm.category}
                              onChange={(e) => setGalleryForm({ ...galleryForm, category: e.target.value })}
                              className="w-full bg-white border border-brand-brown/20 rounded px-3 py-2 text-sm focus:outline-none"
                            >
                              {['Food', 'Interiors', 'Events', 'Tollywood Wall'].map(cat => (
                                  <option key={cat} value={cat}>{cat}</option>
                              ))}
                            </select>
                          </div>

                          <div className="flex flex-col space-y-1">
                            <label className="font-bold text-brand-gold">Image File *</label>
                            <input
                              type="file"
                              required
                              accept="image/*"
                              onChange={(e) => setGalleryForm({ ...galleryForm, imageFile: e.target.files[0] })}
                              className="w-full bg-white border border-brand-brown/20 rounded px-3 py-1.5"
                            />
                          </div>

                          <label className="flex items-center space-x-2 cursor-pointer font-semibold text-brand-brown">
                            <input
                              type="checkbox"
                              checked={galleryForm.isStarred}
                              onChange={(e) => setGalleryForm({ ...galleryForm, isStarred: e.target.checked })}
                              className="w-4 h-4 accent-brand-gold rounded"
                            />
                            <span>Star/Highlight in Section</span>
                          </label>

                          <button 
                            type="submit"
                            disabled={actionLoading}
                            className="w-full py-2.5 bg-brand-gold text-brand-lightBg font-extrabold rounded uppercase tracking-wider"
                          >
                            {actionLoading ? 'Uploading...' : 'Upload Media'}
                          </button>
                        </form>
                      </div>

                      {/* Right: Gallery Media Grid */}
                      <div className="lg:col-span-8 flex flex-col space-y-4">
                        <div className="flex items-center gap-2 justify-between">
                          <h2 className="font-playfair text-xl font-bold text-brand-brown">Gallery Media</h2>
                          {(() => {
                            const starredWallCount = galleryItems.filter(g => g.isStarred && g.category === 'Tollywood Wall').length;
                            return (
                              <span className={`text-[10px] uppercase font-bold border px-2.5 py-1 rounded ${
                                starredWallCount === 5 ? 'bg-green-50 text-green-700 border-green-200' : 'bg-yellow-50 text-yellow-800 border-yellow-250'
                              }`}>
                                Tollywood Starred: {starredWallCount} / 5
                              </span>
                            );
                          })()}
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5">
                          {galleryItems.map(g => (
                            <div key={g._id} className="relative aspect-video rounded-lg overflow-hidden group border border-brand-brown/10 bg-white shadow-xs">
                              <img src={getImageUrl(g.image)} alt={g.title} className="w-full h-full object-cover" />
                              
                              {g.isStarred && (
                                <div className="absolute top-2 left-2 z-20 bg-brand-gold text-white px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider flex items-center gap-0.5 shadow">
                                  <Star size={9} className="fill-current" />
                                  <span>Starred</span>
                                </div>
                              )}

                              <div className="absolute inset-0 bg-black/75 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-between p-3 z-10 text-brand-lightBg text-[10px]">
                                <span className="uppercase tracking-wider text-brand-gold font-bold">{g.category}</span>
                                <div className="flex items-center justify-between gap-1">
                                  <span className="truncate max-w-[80px]" title={g.title}>{g.title}</span>
                                  <div className="flex items-center space-x-1 shrink-0">
                                    <button 
                                      onClick={() => handleToggleGalleryStar(g)}
                                      disabled={actionLoading}
                                      className={`p-1 rounded ${
                                        g.isStarred ? 'bg-brand-gold text-brand-lightBg' : 'bg-white/20 text-white hover:bg-white/40'
                                      }`}
                                    >
                                      <Star size={10} className={g.isStarred ? "fill-current" : ""} />
                                    </button>
                                    <button 
                                      onClick={() => handleDeleteGalleryItem(g._id)}
                                      disabled={actionLoading}
                                      className="p-1 rounded bg-red-950 hover:bg-red-900 text-brand-lightBg"
                                    >
                                      <Trash2 size={10} />
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

                  {/* TAB 5: PAGES SETTINGS (Restructured with dropdown and keys exclusion) */}
                  {activeTab === 'pageImages' && (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-brand-brown">
                      
                      {/* Left: Customizer Form */}
                      <div className="lg:col-span-4 bg-white border border-brand-brown/10 p-5 rounded-lg shadow-xs h-fit">
                        <h2 className="font-playfair text-lg font-bold text-brand-brown mb-3 border-b border-brand-brown/10 pb-1.5">
                          Customize Images
                        </h2>
                        
                        <form onSubmit={handlePageImageSubmit} className="flex flex-col space-y-3.5 text-xs">
                          {/* Choose Page */}
                          <div className="flex flex-col space-y-1">
                            <label className="font-bold text-brand-gold">Select Page Context</label>
                            <select
                              value={pageFilter}
                              onChange={(e) => {
                                setPageFilter(e.target.value);
                                setSelectedPageImageKey('');
                              }}
                              className="w-full bg-white border border-brand-brown/20 rounded px-3 py-2 text-sm text-brand-brown focus:outline-none focus:border-brand-gold"
                            >
                              <option value="home">Home Page</option>
                              <option value="about">About Page</option>
                            </select>
                          </div>

                          {/* Choose key mapping */}
                          <div className="flex flex-col space-y-1">
                            <label className="font-bold text-brand-gold">Select Image Location *</label>
                            <select
                              required
                              value={selectedPageImageKey}
                              onChange={(e) => setSelectedPageImageKey(e.target.value)}
                              className="w-full bg-white border border-brand-brown/20 rounded px-3 py-2 text-sm text-brand-brown focus:outline-none focus:border-brand-gold"
                            >
                              <option value="">-- Choose Key to Customize --</option>
                              {(pageFilter === 'home' ? homePageOptions : aboutPageOptions).map(opt => (
                                <option key={opt.key} value={opt.key}>{opt.label}</option>
                              ))}
                            </select>
                          </div>

                          <div className="flex flex-col space-y-1">
                            <label className="font-bold text-brand-gold">Upload Custom Image *</label>
                            <input
                              type="file"
                              required
                              accept="image/*"
                              onChange={(e) => setPageImageFile(e.target.files[0])}
                              className="w-full bg-white border border-brand-brown/20 rounded px-3 py-1.5"
                            />
                          </div>

                          <button
                            type="submit"
                            disabled={actionLoading}
                            className="w-full py-2.5 bg-brand-gold text-brand-lightBg font-extrabold rounded uppercase tracking-wider"
                          >
                            {actionLoading ? 'Uploading...' : 'Save Custom Image'}
                          </button>
                        </form>
                      </div>

                      {/* Right: Customized Grid */}
                      <div className="lg:col-span-8 flex flex-col space-y-4">
                        <div className="flex items-center justify-between">
                          <h2 className="font-playfair text-xl font-bold text-brand-brown">Custom Page Image list</h2>
                          <span className="text-xs text-brand-brown/70 font-semibold uppercase bg-white border border-brand-brown/10 px-2.5 py-1 rounded">{pageImages.filter(img => img.page === pageFilter).length} active settings</span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {pageImages.filter(img => img.page === pageFilter).length === 0 ? (
                            <div className="col-span-2 border border-dashed border-brand-brown/25 rounded-lg flex items-center justify-center p-6 text-center text-brand-muted text-xs bg-white">
                              No image settings customized for this page. Defaults will be loaded.
                            </div>
                          ) : (
                            pageImages.filter(img => img.page === pageFilter).map((img) => (
                              <div key={img._id} className="p-3.5 rounded-lg bg-white border border-brand-brown/10 flex flex-col space-y-2.5 shadow-xs">
                                <div className="flex justify-between items-start text-xs">
                                  <div>
                                    <h4 className="font-bold text-brand-brown">{img.label}</h4>
                                    <code className="text-[10px] text-brand-gold font-mono block mt-0.5">{img.key}</code>
                                  </div>
                                </div>
                                <div className="aspect-video w-full rounded overflow-hidden border border-brand-brown/5">
                                  <img src={getImageUrl(img.imageUrl)} alt={img.label} className="w-full h-full object-cover" />
                                </div>
                                <div className="text-[9px] text-brand-brown/50 text-right">
                                  Updated: {new Date(img.updatedAt || Date.now()).toLocaleString()}
                                </div>
                              </div>
                            ))
                          )}
                        </div>
                      </div>

                    </div>
                  )}

                  {/* TAB 6: BRANCHES */}
                  {activeTab === 'branches' && (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-brand-brown">
                      
                      {/* Left: Select List */}
                      <div className="lg:col-span-4 flex flex-col space-y-3">
                        <h2 className="font-playfair text-xl font-bold text-brand-brown mb-1">Select Branch to Edit</h2>
                        {branches.map(b => (
                          <div 
                            key={b._id} 
                            onClick={() => handleEditBranchSelect(b)}
                            className={`p-4 rounded-lg border cursor-pointer transition-all shadow-xs ${
                              selectedBranch?._id === b._id 
                                ? 'bg-white border-brand-gold border-2 shadow-sm' 
                                : 'bg-white border-brand-brown/10 hover:border-brand-gold/30'
                            }`}
                          >
                            <div className="flex justify-between items-center text-xs">
                              <span className="font-bold text-sm">{b.name}</span>
                              <Edit size={13} className="text-brand-gold" />
                            </div>
                            <span className="text-[10px] text-brand-brown/70 block mt-0.5">Phone: {b.phone}</span>
                          </div>
                        ))}
                      </div>

                      {/* Right: Edit Form */}
                      <div className="lg:col-span-8">
                        {selectedBranch ? (
                          <div className="bg-white border border-brand-brown/10 p-5 rounded-lg shadow-xs text-brand-brown">
                            <h2 className="font-playfair text-lg font-bold text-brand-brown mb-3 border-b border-brand-brown/10 pb-1.5">
                              Branch Details: <span className="text-brand-gold italic">{selectedBranch.name}</span>
                            </h2>
                            <form onSubmit={handleBranchSubmit} className="flex flex-col space-y-3.5 text-xs">
                              <div className="flex flex-col space-y-1">
                                <label className="font-bold text-brand-gold">Address *</label>
                                <textarea
                                  required
                                  value={branchForm.address}
                                  onChange={(e) => setBranchForm({ ...branchForm, address: e.target.value })}
                                  rows="2"
                                  className="w-full bg-white border border-brand-brown/20 rounded px-3 py-2 text-sm focus:outline-none"
                                />
                              </div>

                              <div className="grid grid-cols-2 gap-3.5">
                                <div className="flex flex-col space-y-1">
                                  <label className="font-bold text-brand-gold">Phone Number(s) *</label>
                                  <input
                                    type="text"
                                    required
                                    value={branchForm.phone}
                                    onChange={(e) => setBranchForm({ ...branchForm, phone: e.target.value })}
                                    className="w-full bg-white border border-brand-brown/20 rounded px-3 py-2 text-sm focus:outline-none"
                                  />
                                </div>
                                <div className="flex flex-col space-y-1">
                                  <label className="font-bold text-brand-gold">Opening Hours *</label>
                                  <input
                                    type="text"
                                    required
                                    value={branchForm.timings}
                                    onChange={(e) => setBranchForm({ ...branchForm, timings: e.target.value })}
                                    className="w-full bg-white border border-brand-brown/20 rounded px-3 py-2 text-sm focus:outline-none"
                                  />
                                </div>
                              </div>

                              <div className="flex flex-col space-y-1">
                                <label className="font-bold text-brand-gold">Google Maps Link *</label>
                                <input
                                  type="url"
                                  required
                                  value={branchForm.googleMapsLink}
                                  onChange={(e) => setBranchForm({ ...branchForm, googleMapsLink: e.target.value })}
                                  className="w-full bg-white border border-brand-brown/20 rounded px-3 py-2 text-sm focus:outline-none"
                                />
                              </div>

                              <div className="flex flex-col space-y-1">
                                <label className="font-bold text-brand-gold">Branch Description</label>
                                <textarea
                                  value={branchForm.description}
                                  onChange={(e) => setBranchForm({ ...branchForm, description: e.target.value })}
                                  rows="2"
                                  className="w-full bg-white border border-brand-brown/20 rounded px-3 py-2 text-sm focus:outline-none"
                                />
                              </div>

                              {/* Branch image upload */}
                              <div className="flex flex-col space-y-1">
                                <label className="font-bold text-brand-gold">Upload New Branch Card Image (Optional)</label>
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={(e) => setBranchImageFile(e.target.files[0])}
                                  className="w-full bg-white border border-brand-brown/20 rounded px-3 py-1.5 text-xs"
                                />
                                {selectedBranch.image && (
                                  <div className="w-20 h-12 rounded overflow-hidden border border-brand-brown/10 mt-1">
                                    <img src={getImageUrl(selectedBranch.image)} alt="Current" className="w-full h-full object-cover" />
                                  </div>
                                )}
                              </div>

                              <div className="pt-2 flex space-x-2">
                                <button
                                  type="submit"
                                  disabled={actionLoading}
                                  className="flex-grow py-2.5 bg-brand-gold text-brand-lightBg font-extrabold rounded uppercase tracking-wider"
                                >
                                  {actionLoading ? 'Saving...' : 'Save Branch Details'}
                                </button>
                                <button
                                  type="button"
                                  onClick={() => { setSelectedBranch(null); setBranchImageFile(null); }}
                                  className="py-2.5 px-3 border border-brand-brown/30 rounded font-semibold text-brand-brown"
                                >
                                  Cancel
                                </button>
                              </div>
                            </form>
                          </div>
                        ) : (
                          <div className="h-full border border-dashed border-brand-brown/25 rounded-lg flex items-center justify-center p-6 text-center text-brand-muted text-xs bg-white">
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
