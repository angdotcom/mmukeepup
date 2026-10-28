import React, { useState } from 'react';
import { 
  Bell, Search, Plus, Calendar, MessageSquare, Heart, Bookmark, Share2, 
  ShieldCheck, User, Sparkles, MapPin, Building2, BookOpen, Send, CheckCircle, 
  Clock, AlertCircle, Filter, Trash2, ArrowUpRight, GraduationCap, Users, X, ArrowRight
} from 'lucide-react';

type UserRole = 'student' | 'lecturer' | 'club' | 'outsider';

interface UserProfile {
  id: string;
  name: string;
  handle: string;
  role: UserRole;
  avatar: string;
  verified: boolean;
}

interface Post {
  id: string;
  authorName: string;
  authorRole: UserRole;
  authorAvatar: string;
  campus: 'Cyberjaya' | 'Melaka' | 'Both';
  category: 'Clubs & Events' | 'Academic' | 'Campus Life' | 'Marketplace';
  content: string;
  mediaUrls: string[];
  isOfficialAnnouncement: boolean;
  isPinned?: boolean;
  likes: number;
  bookmarks: number;
  timestamp: string;
  comments: CommentItem[];
  eventDetails?: {
    eventTitle: string;
    eventDate: string;
    venue: string;
    time: string;
  };
}

interface CommentItem {
  id: string;
  authorName: string;
  authorRole: string;
  content: string;
  timestamp: string;
}

interface CampusEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  venue: string;
  campus: 'Cyberjaya' | 'Melaka';
  clubName: string;
}

const INITIAL_POSTS: Post[] = [
  {
    id: 'post-1',
    authorName: 'MMU Cyberjaya Student Council',
    authorRole: 'club',
    authorAvatar: '🏛️',
    campus: 'Cyberjaya',
    category: 'Clubs & Events',
    content: '🎉 Annual MMU Grand Club Carnival 2026 is officially happening next week! Join over 60+ societies at the grand atrium for food trucks, live band performances, tech showcases, and exclusive merchandise giveaways. Don\'t miss out!',
    mediaUrls: ['https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=1200&q=80'],
    isOfficialAnnouncement: true,
    isPinned: true,
    likes: 342,
    bookmarks: 89,
    timestamp: '2 hours ago',
    eventDetails: {
      eventTitle: 'MMU Grand Club Carnival 2026',
      eventDate: 'Nov 12, 2026',
      venue: 'Grand Atrium, Cyberjaya Campus',
      time: '10:00 AM - 6:00 PM'
    },
    comments: [
      { id: 'c1', authorName: 'Aiman Zikri', authorRole: 'student', content: 'Can\'t wait for the free bubble tea booth!', timestamp: '1 hour ago' },
      { id: 'c2', authorName: 'Dr. Sarah Lim', authorRole: 'lecturer', content: 'Great initiative by the student council. See you all there.', timestamp: '30 mins ago' }
    ]
  },
  {
    id: 'post-2',
    authorName: 'Dr. Ahmad Fauzi',
    authorRole: 'lecturer',
    authorAvatar: '👨‍🏫',
    campus: 'Both',
    category: 'Academic',
    content: '⚠️ Important Notice regarding Final Year Project (FYP2) milestone submissions. All teams must upload their interim progress reports to the portal by Friday 11:59 PM. Late submissions will incur a 5% penalty per day. Consult your supervisors if you face hardware blockers.',
    mediaUrls: [],
    isOfficialAnnouncement: true,
    likes: 128,
    bookmarks: 215,
    timestamp: '4 hours ago',
    comments: [
      { id: 'c3', authorName: 'Tan Wei Ming', authorRole: 'student', content: 'Thank you for the reminder Dr. Fauzi!', timestamp: '3 hours ago' }
    ]
  },
  {
    id: 'post-3',
    authorName: 'Google Developer Student Club (GDSC)',
    authorRole: 'club',
    authorAvatar: '💻',
    campus: 'Cyberjaya',
    category: 'Clubs & Events',
    content: '🚀 Level up your cloud & AI skills! Join our upcoming hands-on GenAI Hackathon 2026 workshop this Thursday at Lab 3.2. Free pizza and certificate of participation provided for all registered attendees.',
    mediaUrls: ['https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80'],
    isOfficialAnnouncement: false,
    likes: 195,
    bookmarks: 94,
    timestamp: 'Yesterday',
    eventDetails: {
      eventTitle: 'GenAI Hackathon 2026 Workshop',
      eventDate: 'Nov 6, 2026',
      venue: 'Computer Lab 3.2, FCI Building',
      time: '2:30 PM - 5:00 PM'
    },
    comments: []
  },
  {
    id: 'post-4',
    authorName: 'Jessica Wong',
    authorRole: 'student',
    authorAvatar: '👩‍🎓',
    campus: 'Melaka',
    category: 'Campus Life',
    content: 'Found a silver Apple iPad Pencil near the library 2nd floor study pods. Please DM me with proof of ownership (engraving or serial number) to claim it back!',
    mediaUrls: [],
    isOfficialAnnouncement: false,
    likes: 45,
    bookmarks: 12,
    timestamp: '2 days ago',
    comments: []
  }
];

export default function App() {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('mmu_keep_up_user');
    return saved ? JSON.parse(saved) : {
      id: 'usr_default',
      name: 'Ahmad Zikri',
      handle: '@ahmad_zikri',
      role: 'student',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmad',
      verified: true
    };
  });

  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);
  const [selectedRoleForReg, setSelectedRoleForReg] = useState<UserRole>('student');
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');

  const [activeTab, setActiveTab] = useState<'feed' | 'calendar' | 'clubs' | 'ai-assistant'>('feed');
  const [selectedCampus, setSelectedCampus] = useState<'All' | 'Cyberjaya' | 'Melaka'>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);
  const [savedEvents, setSavedEvents] = useState<CampusEvent[]>([
    {
      id: 'e-1',
      title: 'MMU Grand Club Carnival 2026',
      date: 'Nov 12, 2026',
      time: '10:00 AM - 6:00 PM',
      venue: 'Grand Atrium, Cyberjaya Campus',
      campus: 'Cyberjaya',
      clubName: 'MMU Cyberjaya Student Council'
    }
  ]);

  // New post modal state
  const [isNewPostOpen, setIsNewPostOpen] = useState(false);
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostCategory, setNewPostCategory] = useState<'Clubs & Events' | 'Academic' | 'Campus Life' | 'Marketplace'>('Clubs & Events');
  const [newPostCampus, setNewPostCampus] = useState<'Cyberjaya' | 'Melaka' | 'Both'>('Cyberjaya');
  const [newPostMediaUrl, setNewPostMediaUrl] = useState('');
  const [newPostIsOfficial, setNewPostIsOfficial] = useState(false);
  const [isAnalyzingAI, setIsAnalyzingAI] = useState(false);

  // AI Assistant chat state
  const [aiChatMessages, setAiChatMessages] = useState<{ sender: 'user' | 'ai'; text: string }[]>([
    { sender: 'ai', text: 'Hello! I am KeepUp AI, your MMU campus assistant. Ask me anything about club events, library hours, lecture halls, or exam schedules!' }
  ]);
  const [aiInput, setAiInput] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);

  // Comment input state per post
  const [commentInputs, setCommentInputs] = useState<{ [postId: string]: string }>({});

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName.trim()) return;

    const newUser: UserProfile = {
      id: 'usr_' + Date.now(),
      name: regName,
      handle: '@' + regName.toLowerCase().replace(/[^a-z0-9]/g, '_'),
      role: selectedRoleForReg,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${regName}`,
      verified: selectedRoleForReg === 'club' || selectedRoleForReg === 'lecturer' || selectedRoleForReg === 'student',
    };

    setCurrentUser(newUser);
    localStorage.setItem('mmu_keep_up_user', JSON.stringify(newUser));
    setShowAuthModal(false);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('mmu_keep_up_user');
    setShowAuthModal(true);
  };

  const requireAuthAction = (action: () => void) => {
    if (!currentUser || currentUser.role === 'outsider') {
      setShowAuthModal(true);
      return;
    }
    action();
  };

  const handleLike = (postId: string) => {
    setPosts(posts.map(p => p.id === postId ? { ...p, likes: p.likes + 1 } : p));
  };

  const handleBookmark = (postId: string) => {
    setPosts(posts.map(p => p.id === postId ? { ...p, bookmarks: p.bookmarks + 1 } : p));
  };

  const handleAddComment = (postId: string) => {
    if (!currentUser || currentUser.role === 'outsider') {
      setShowAuthModal(true);
      return;
    }
    const text = commentInputs[postId];
    if (!text || !text.trim()) return;

    setPosts(posts.map(p => {
      if (p.id === postId) {
        return {
          ...p,
          comments: [
            ...p.comments,
            {
              id: 'c-' + Date.now(),
              authorName: currentUser.name,
              authorRole: currentUser.role,
              content: text.trim(),
              timestamp: 'Just now'
            }
          ]
        };
      }
      return p;
    }));

    setCommentInputs({ ...commentInputs, [postId]: '' });
  };

  const handleSyncEvent = (eventDetails: NonNullable<Post['eventDetails']>, clubName: string, campus: 'Cyberjaya' | 'Melaka' | 'Both') => {
    if (!currentUser || currentUser.role === 'outsider') {
      setShowAuthModal(true);
      return;
    }
    const newEvt: CampusEvent = {
      id: 'e-' + Date.now(),
      title: eventDetails.eventTitle,
      date: eventDetails.eventDate,
      time: eventDetails.time,
      venue: eventDetails.venue,
      campus: campus === 'Both' ? 'Cyberjaya' : campus,
      clubName: clubName
    };

    if (!savedEvents.some(e => e.title === newEvt.title)) {
      setSavedEvents([...savedEvents, newEvt]);
      alert(`Success! "${newEvt.title}" has been synced to your personal campus calendar.`);
    } else {
      alert('This event is already in your calendar.');
    }
  };

  const handleAiAnalyzeAndPost = async () => {
    if (!currentUser || currentUser.role === 'outsider') {
      setShowAuthModal(true);
      return;
    }
    if (!newPostContent.trim()) return;

    // Role verification
    if (currentUser.role === 'student' && newPostIsOfficial) {
      alert('Notice: Students cannot publish Official Announcements. Your post will be published as standard.');
      setNewPostIsOfficial(false);
    }

    setIsAnalyzingAI(true);
    try {
      const res = await fetch('/api/gemini/analyze-post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rawPostText: newPostContent, authorRole: currentUser.role })
      });
      const data = await res.json();

      const newPostObj: Post = {
        id: 'post-' + Date.now(),
        authorName: currentUser.name,
        authorRole: currentUser.role,
        authorAvatar: currentUser.role === 'club' ? '💻' : currentUser.role === 'lecturer' ? '👨‍🏫' : '🎓',
        campus: newPostCampus,
        category: newPostCategory,
        content: data.cleanContent || newPostContent,
        mediaUrls: newPostMediaUrl ? [newPostMediaUrl] : [],
        isOfficialAnnouncement: currentUser.role !== 'student' ? (data.isOfficialAnnouncement ?? newPostIsOfficial) : false,
        likes: 1,
        bookmarks: 0,
        timestamp: 'Just now',
        comments: [],
        eventDetails: data.eventDetails ? {
          eventTitle: data.eventDetails.eventTitle || 'Campus Event',
          eventDate: data.eventDetails.eventDate || 'TBA',
          venue: data.eventDetails.venue || 'MMU Campus',
          time: data.eventDetails.time || 'All Day'
        } : undefined
      };

      setPosts([newPostObj, ...posts]);
      setNewPostContent('');
      setNewPostMediaUrl('');
      setIsNewPostOpen(false);
    } catch (err) {
      console.error(err);
      alert('Failed to publish post via AI moderator. Publishing standard post...');
      const fallbackPost: Post = {
        id: 'post-' + Date.now(),
        authorName: currentUser.name,
        authorRole: currentUser.role,
        authorAvatar: '🎓',
        campus: newPostCampus,
        category: newPostCategory,
        content: newPostContent,
        mediaUrls: newPostMediaUrl ? [newPostMediaUrl] : [],
        isOfficialAnnouncement: false,
        likes: 1,
        bookmarks: 0,
        timestamp: 'Just now',
        comments: []
      };
      setPosts([fallbackPost, ...posts]);
      setIsNewPostOpen(false);
    } finally {
      setIsAnalyzingAI(false);
    }
  };

  const handleSendAiChat = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiInput.trim() || isAiLoading) return;

    const userMsg = aiInput.trim();
    setAiChatMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setAiInput('');
    setIsAiLoading(true);

    try {
      const res = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg })
      });
      const data = await res.json();
      setAiChatMessages(prev => [...prev, { sender: 'ai', text: data.reply || 'I am here to help with all MMU campus queries!' }]);
    } catch (err) {
      console.error(err);
      setAiChatMessages(prev => [...prev, { sender: 'ai', text: 'Sorry, I encountered a temporary connection issue. Please try again.' }]);
    } finally {
      setIsAiLoading(false);
    }
  };

  const filteredPosts = posts.filter(post => {
    const matchesCampus = selectedCampus === 'All' || post.campus === selectedCampus || post.campus === 'Both';
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) || 
      post.authorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (post.eventDetails && post.eventDetails.eventTitle.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCampus && matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#ebeaff] text-slate-900 flex flex-col font-sans">
      
      {/* STREAMLINED AUTHENTICATION MODAL */}
      {showAuthModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-8 shadow-2xl border border-[#9694ff]/30 animate-in fade-in zoom-in duration-200">
            <div className="text-center mb-6">
              <span className="bg-[#ebeaff] text-[#3d3bf3] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                MMU KEEP UP SIGN IN
              </span>
              <h2 className="text-2xl font-black text-gray-900 mt-2">Get Started in Seconds</h2>
              <p className="text-sm text-gray-600 mt-1">
                Choose your account type and join the campus feed instantly.
              </p>
            </div>

            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Select Account Type</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { role: 'student', label: '🎓 MMU Student', desc: 'Standard feed & threads' },
                    { role: 'club', label: '🏆 Club / Society', desc: 'Announcements & 10 images' },
                    { role: 'lecturer', label: '📚 Lecturer', desc: 'Verified faculty broadcast' },
                    { role: 'outsider', label: '🌐 Guest / Outsider', desc: 'Read-only view' },
                  ].map((item) => (
                    <button
                      type="button"
                      key={item.role}
                      onClick={() => setSelectedRoleForReg(item.role as UserRole)}
                      className={`p-3 text-left rounded-xl border transition-all ${
                        selectedRoleForReg === item.role
                          ? 'border-[#3d3bf3] bg-[#ebeaff]/60 shadow-sm ring-1 ring-[#3d3bf3]'
                          : 'border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      <p className="text-sm font-bold text-gray-900">{item.label}</p>
                      <p className="text-[10px] text-gray-500 mt-0.5">{item.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                  {selectedRoleForReg === 'club' ? 'Club / Society Name' : 'Full Name'}
                </label>
                <input
                  type="text"
                  required
                  placeholder={selectedRoleForReg === 'club' ? 'e.g., Cyberjaya IT Society' : 'e.g., Ahmad Zikri'}
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#3d3bf3] focus:outline-none text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder={selectedRoleForReg === 'club' ? 'club.it@mmu.edu.my' : 'username@student.mmu.edu.my'}
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#3d3bf3] focus:outline-none text-sm"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#3d3bf3] text-white font-bold rounded-xl shadow-lg hover:bg-[#3d3bf3]/90 transition-all flex items-center justify-center gap-2 mt-2"
              >
                Continue to Feed <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {currentUser && (
              <button
                onClick={() => setShowAuthModal(false)}
                className="mt-3 w-full py-2 text-gray-500 hover:text-gray-800 text-xs font-semibold"
              >
                Cancel & Close
              </button>
            )}
          </div>
        </div>
      )}

      {/* TOP BAR CONTRACT: 3 Zones */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-indigo-100 px-6 py-3.5 flex items-center justify-between gap-8">
        
        {/* Zone 1: Brand Wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-10 h-10 rounded-xl bg-[#3d3bf3] text-white flex items-center justify-center font-bold text-xl shadow-md shadow-indigo-500/20">
            M
          </div>
          <div>
            <a href="/" className="text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap block">
              MMU KEEP UP
            </a>
            <span className="text-[11px] text-[#3d3bf3] font-semibold tracking-wide uppercase block -mt-1">
              Cyberjaya & Melaka
            </span>
          </div>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600">
          <button 
            onClick={() => setActiveTab('feed')}
            className={`transition-colors whitespace-nowrap shrink-0 pb-1 border-b-2 ${activeTab === 'feed' ? 'border-[#3d3bf3] text-[#3d3bf3] font-semibold' : 'border-transparent hover:text-slate-900'}`}
          >
            Campus Feed
          </button>
          <button 
            onClick={() => setActiveTab('calendar')}
            className={`transition-colors whitespace-nowrap shrink-0 pb-1 border-b-2 ${activeTab === 'calendar' ? 'border-[#3d3bf3] text-[#3d3bf3] font-semibold' : 'border-transparent hover:text-slate-900'}`}
          >
            Event Calendar
          </button>
          <button 
            onClick={() => setActiveTab('clubs')}
            className={`transition-colors whitespace-nowrap shrink-0 pb-1 border-b-2 ${activeTab === 'clubs' ? 'border-[#3d3bf3] text-[#3d3bf3] font-semibold' : 'border-transparent hover:text-slate-900'}`}
          >
            Clubs Directory
          </button>
          <button 
            onClick={() => setActiveTab('ai-assistant')}
            className={`transition-colors whitespace-nowrap shrink-0 pb-1 border-b-2 flex items-center gap-1.5 ${activeTab === 'ai-assistant' ? 'border-[#3d3bf3] text-[#3d3bf3] font-semibold' : 'border-transparent hover:text-slate-900'}`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#ff2929]" />
            KeepUp AI
          </button>
        </nav>

        {/* Zone 3: User Profile & Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          {currentUser ? (
            <div className="flex items-center gap-3 bg-[#ebeaff]/80 px-3.5 py-1.5 rounded-xl border border-indigo-200">
              <img src={currentUser.avatar} alt="avatar" className="w-7 h-7 rounded-full bg-white border border-indigo-300" />
              <div className="text-left hidden sm:block">
                <p className="text-xs font-bold text-slate-900 flex items-center gap-1">
                  {currentUser.name}
                  {currentUser.verified && <CheckCircle className="w-3 h-3 text-[#3d3bf3]" />}
                </p>
                <span className="text-[10px] uppercase bg-[#3d3bf3] text-white px-1.5 py-0.2 rounded font-bold">
                  {currentUser.role}
                </span>
              </div>
              <button 
                onClick={handleLogout}
                className="ml-2 text-xs text-red-600 font-bold hover:underline"
              >
                Switch
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowAuthModal(true)}
              className="px-4 py-2 bg-[#3d3bf3] text-white text-xs font-bold rounded-xl shadow-md hover:bg-indigo-700"
            >
              Register / Login
            </button>
          )}

          <button 
            onClick={() => requireAuthAction(() => setIsNewPostOpen(true))}
            className="px-4 py-2 text-xs font-semibold text-white bg-[#3d3bf3] rounded-xl hover:bg-indigo-700 transition-colors shadow-sm shadow-indigo-600/30 whitespace-nowrap flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            New Post
          </button>
        </div>
      </header>

      {/* SUB-HEADER MOBILE NAV */}
      <div className="lg:hidden flex items-center justify-around bg-white border-b border-indigo-100 py-2.5 px-4 text-xs font-medium text-slate-600">
        <button onClick={() => setActiveTab('feed')} className={activeTab === 'feed' ? 'text-[#3d3bf3] font-bold' : ''}>Feed</button>
        <button onClick={() => setActiveTab('calendar')} className={activeTab === 'calendar' ? 'text-[#3d3bf3] font-bold' : ''}>Calendar</button>
        <button onClick={() => setActiveTab('clubs')} className={activeTab === 'clubs' ? 'text-[#3d3bf3] font-bold' : ''}>Clubs</button>
        <button onClick={() => setActiveTab('ai-assistant')} className={activeTab === 'ai-assistant' ? 'text-[#3d3bf3] font-bold flex items-center gap-1' : 'flex items-center gap-1'}><Sparkles className="w-3 h-3 text-[#ff2929]" />AI</button>
      </div>

      {/* MAIN CONTENT AREA */}
      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 py-8 flex-1">
        
        {activeTab === 'feed' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* LEFT SIDEBAR: Campus filter, category filter, saved events widget */}
            <div className="lg:col-span-3 space-y-6">
              
              {/* Campus Selector Card */}
              <div className="bg-white rounded-2xl p-5 border border-indigo-100 shadow-sm space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Campus Filter</h3>
                <div className="space-y-1">
                  {(['All', 'Cyberjaya', 'Melaka'] as const).map(camp => (
                    <button
                      key={camp}
                      onClick={() => setSelectedCampus(camp)}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-colors flex items-center justify-between ${selectedCampus === camp ? 'bg-[#3d3bf3] text-white shadow-sm' : 'text-slate-600 hover:bg-slate-50'}`}
                    >
                      <span className="flex items-center gap-2">
                        <Building2 className="w-4 h-4" />
                        MMU {camp}
                      </span>
                      {selectedCampus === camp && <CheckCircle className="w-3.5 h-3.5" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Category Filter */}
              <div className="bg-white rounded-2xl p-5 border border-indigo-100 shadow-sm space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Categories</h3>
                <div className="flex flex-wrap gap-1.5">
                  {['All', 'Clubs & Events', 'Academic', 'Campus Life', 'Marketplace'].map(cat => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-colors ${selectedCategory === cat ? 'bg-[#9694ff] text-indigo-950 font-semibold shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* My Synced Events Widget */}
              <div className="bg-gradient-to-br from-[#3d3bf3] to-indigo-800 text-white rounded-2xl p-5 shadow-lg shadow-indigo-600/20 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-[#9694ff]" />
                    <h3 className="text-sm font-bold">My Synced Calendar</h3>
                  </div>
                  <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full font-mono">{savedEvents.length}</span>
                </div>
                <div className="space-y-3 pt-2">
                  {savedEvents.length === 0 ? (
                    <p className="text-xs text-indigo-200">No events synced yet. Click "Sync to Calendar" on club announcements in the feed!</p>
                  ) : (
                    savedEvents.map(evt => (
                      <div key={evt.id} className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/10 space-y-1">
                        <div className="text-xs font-bold text-white line-clamp-1">{evt.title}</div>
                        <div className="text-[11px] text-indigo-200 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {evt.date} · {evt.time}
                        </div>
                        <div className="text-[11px] text-indigo-200 flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {evt.venue}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

            </div>

            {/* MAIN FEED COLUMN */}
            <div className="lg:col-span-9 space-y-6">
              
              {/* Search & Header banner */}
              <div className="bg-white rounded-2xl p-6 border border-indigo-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                  <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">MMU Campus Feed</h1>
                  <p className="text-xs text-slate-500 mt-0.5">Real-time announcements, club updates & student discussions across Cyberjaya & Melaka.</p>
                </div>
                <div className="relative w-full md:w-72">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input 
                    type="text" 
                    placeholder="Search posts, events, clubs..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#3d3bf3] transition-colors"
                  />
                </div>
              </div>

              {/* POSTS LIST */}
              <div className="space-y-6">
                {filteredPosts.length === 0 ? (
                  <div className="bg-white rounded-2xl p-12 text-center border border-indigo-100 space-y-3">
                    <AlertCircle className="w-10 h-10 text-slate-300 mx-auto" />
                    <h3 className="text-sm font-bold text-slate-700">No posts found</h3>
                    <p className="text-xs text-slate-500">Try adjusting your campus or category filters.</p>
                  </div>
                ) : (
                  filteredPosts.map(post => (
                    <article key={post.id} className="bg-white rounded-2xl p-6 border border-indigo-100 shadow-sm space-y-4 transition-all hover:shadow-md">
                      
                      {/* Post Header */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-11 h-11 rounded-2xl bg-[#ebeaff] border border-indigo-200 flex items-center justify-center text-xl shadow-inner">
                            {post.authorAvatar}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="text-sm font-bold text-slate-900">{post.authorName}</h3>
                              {post.authorRole === 'club' && (
                                <span className="text-[10px] bg-indigo-50 text-[#3d3bf3] px-2 py-0.5 rounded-md font-semibold border border-indigo-100">Club</span>
                              )}
                              {post.authorRole === 'lecturer' && (
                                <span className="text-[10px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-md font-semibold border border-emerald-100">Lecturer</span>
                              )}
                              {post.authorRole === 'student' && (
                                <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-medium">Student</span>
                              )}
                            </div>
                            <div className="text-xs text-slate-400 flex items-center gap-2 mt-0.5">
                              <span>MMU {post.campus}</span>
                              <span aria-hidden="true">·</span>
                              <span>{post.timestamp}</span>
                              <span aria-hidden="true">·</span>
                              <span className="text-[#3d3bf3] font-medium">{post.category}</span>
                            </div>
                          </div>
                        </div>

                        {post.isOfficialAnnouncement && (
                          <div className="flex items-center gap-1.5 bg-[#ff2929]/10 text-[#ff2929] px-3 py-1 rounded-full text-xs font-bold border border-[#ff2929]/20">
                            <ShieldCheck className="w-3.5 h-3.5" />
                            Official Announcement
                          </div>
                        )}
                      </div>

                      {/* Post Content */}
                      <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                        {post.content}
                      </p>

                      {/* Event Details Card (if applicable) */}
                      {post.eventDetails && (
                        <div className="bg-[#ebeaff]/60 border border-indigo-200 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                          <div className="space-y-1">
                            <div className="text-xs font-bold text-[#3d3bf3] uppercase tracking-wide">Campus Event Alert</div>
                            <h4 className="text-sm font-extrabold text-slate-900">{post.eventDetails.eventTitle}</h4>
                            <div className="text-xs text-slate-600 flex flex-wrap gap-3">
                              <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-indigo-600" />{post.eventDetails.eventDate}</span>
                              <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-indigo-600" />{post.eventDetails.time}</span>
                              <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-indigo-600" />{post.eventDetails.venue}</span>
                            </div>
                          </div>
                          <button 
                            onClick={() => handleSyncEvent(post.eventDetails!, post.authorName, post.campus)}
                            className="px-4 py-2 bg-[#3d3bf3] hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold shadow-sm transition-colors whitespace-nowrap flex items-center gap-1.5 shrink-0"
                          >
                            <Calendar className="w-3.5 h-3.5" />
                            Sync to Calendar
                          </button>
                        </div>
                      )}

                      {/* Media Attachment (if any) */}
                      {post.mediaUrls.length > 0 && (
                        <div className="rounded-xl overflow-hidden border border-slate-200 max-h-96 bg-slate-50">
                          <img 
                            src={post.mediaUrls[0]} 
                            alt="Post attachment" 
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                      )}

                      {/* Post Footer Actions */}
                      <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs text-slate-500">
                        <div className="flex items-center gap-6">
                          <button 
                            onClick={() => handleLike(post.id)}
                            className="flex items-center gap-1.5 hover:text-[#ff2929] transition-colors"
                          >
                            <Heart className="w-4 h-4" />
                            <span>{post.likes}</span>
                          </button>
                          <button className="flex items-center gap-1.5 hover:text-[#3d3bf3] transition-colors">
                            <MessageSquare className="w-4 h-4" />
                            <span>{post.comments.length} Comments</span>
                          </button>
                          <button 
                            onClick={() => handleBookmark(post.id)}
                            className="flex items-center gap-1.5 hover:text-[#3d3bf3] transition-colors"
                          >
                            <Bookmark className="w-4 h-4" />
                            <span>{post.bookmarks}</span>
                          </button>
                        </div>
                        <button className="flex items-center gap-1 hover:text-slate-900">
                          <Share2 className="w-4 h-4" />
                          <span>Share</span>
                        </button>
                      </div>

                      {/* Comments Section */}
                      {post.comments.length > 0 && (
                        <div className="space-y-3 pt-3 border-t border-slate-100 bg-slate-50/50 p-4 rounded-xl">
                          {post.comments.map(comment => (
                            <div key={comment.id} className="text-xs space-y-1">
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-slate-800">{comment.authorName}</span>
                                <span className="text-[10px] bg-slate-200 text-slate-600 px-1.5 py-0.2 rounded">{comment.authorRole}</span>
                                <span className="text-slate-400 text-[10px]">{comment.timestamp}</span>
                              </div>
                              <p className="text-slate-600 pl-2 border-l-2 border-indigo-200">{comment.content}</p>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Add Comment Input */}
                      <div className="flex items-center gap-2 pt-2">
                        <input 
                          type="text" 
                          placeholder={currentUser && currentUser.role !== 'outsider' ? "Write a supportive comment..." : "Sign in to comment..."}
                          value={commentInputs[post.id] || ''}
                          onChange={(e) => setCommentInputs({ ...commentInputs, [post.id]: e.target.value })}
                          onKeyDown={(e) => { if (e.key === 'Enter') handleAddComment(post.id); }}
                          className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#3d3bf3]"
                        />
                        <button 
                          onClick={() => handleAddComment(post.id)}
                          className="p-2 bg-[#3d3bf3] text-white rounded-xl hover:bg-indigo-700 transition-colors"
                        >
                          <Send className="w-3.5 h-3.5" />
                        </button>
                      </div>

                    </article>
                  ))
                )}
              </div>

            </div>

          </div>
        )}

        {activeTab === 'calendar' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-indigo-100 shadow-sm flex items-center justify-between">
              <div>
                <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Campus Event Calendar</h1>
                <p className="text-xs text-slate-500 mt-0.5">All official club activities, hackathons, exams, and workshops synced across MMU.</p>
              </div>
              <div className="text-xs font-semibold bg-indigo-50 text-[#3d3bf3] px-3 py-1.5 rounded-xl border border-indigo-200">
                {savedEvents.length} Synced Events
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedEvents.map(evt => (
                <div key={evt.id} className="bg-white rounded-2xl p-6 border border-indigo-100 shadow-sm space-y-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <span className="text-xs bg-[#ebeaff] text-[#3d3bf3] font-semibold px-2.5 py-1 rounded-lg">
                      MMU {evt.campus}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">Verified Event</span>
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">{evt.title}</h3>
                    <p className="text-xs text-indigo-600 font-medium mt-1">{evt.clubName}</p>
                  </div>
                  <div className="space-y-2 text-xs text-slate-600 pt-2 border-t border-slate-100">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-[#3d3bf3]" />
                      <span>{evt.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[#3d3bf3]" />
                      <span>{evt.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[#3d3bf3]" />
                      <span>{evt.venue}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'clubs' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-indigo-100 shadow-sm">
              <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">MMU Clubs & Societies Directory</h1>
              <p className="text-xs text-slate-500 mt-0.5">Explore official student organizations, leadership contacts, and membership portals.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: 'Google Developer Student Club (GDSC)', campus: 'Cyberjaya', members: '1,420', category: 'Technology', desc: 'Empowering student developers with Google cloud and AI technologies.' },
                { name: 'MMU Cyber Law Society', campus: 'Melaka', members: '850', category: 'Academic', desc: 'Promoting legal literacy and moot court competitions.' },
                { name: 'MMU Esports Club', campus: 'Both', members: '2,300', category: 'Sports & Gaming', desc: 'Official Valorant, Mobile Legends, and Dota 2 varsity teams.' },
                { name: 'Cultural & Arts Society', campus: 'Cyberjaya', members: '1,100', category: 'Culture', desc: 'Showcasing traditional and modern dance, music, and theatre.' },
                { name: 'IEEE Student Branch', campus: 'Both', members: '980', category: 'Engineering', desc: 'Global technical professional association for engineering students.' },
                { name: 'Rotaract Club of MMU', campus: 'Melaka', members: '650', category: 'Community', desc: 'Community service, charity drives, and leadership development.' }
              ].map((club, idx) => (
                <div key={idx} className="bg-white rounded-2xl p-6 border border-indigo-100 shadow-sm space-y-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <span className="text-xs bg-indigo-50 text-[#3d3bf3] font-semibold px-2.5 py-1 rounded-lg">
                      MMU {club.campus}
                    </span>
                    <span className="text-xs text-slate-500 flex items-center gap-1 font-mono">
                      <Users className="w-3.5 h-3.5" />
                      {club.members} members
                    </span>
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">{club.name}</h3>
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">{club.desc}</p>
                  </div>
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-medium text-[#3d3bf3]">{club.category}</span>
                    <button onClick={() => alert(`Successfully joined ${club.name}! You will receive notifications.`)} className="px-3 py-1.5 bg-[#3d3bf3] text-white text-xs font-semibold rounded-xl hover:bg-indigo-700 transition-colors">
                      Join Club
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'ai-assistant' && (
          <div className="bg-white rounded-2xl border border-indigo-100 shadow-sm flex flex-col h-[70vh]">
            <div className="p-5 border-b border-indigo-100 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#3d3bf3] to-[#ff2929] text-white flex items-center justify-center shadow-md">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-900">KeepUp AI Campus Assistant</h2>
                <p className="text-xs text-slate-500">Powered by Gemini 3.8 Flash · Ask about schedules, venues, and student life.</p>
              </div>
            </div>

            <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-slate-50/50">
              {aiChatMessages.map((msg, index) => (
                <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-lg rounded-2xl px-4 py-3 text-xs leading-relaxed ${msg.sender === 'user' ? 'bg-[#3d3bf3] text-white rounded-br-none shadow-sm' : 'bg-white text-slate-800 border border-indigo-100 rounded-bl-none shadow-sm'}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isAiLoading && (
                <div className="flex justify-start">
                  <div className="bg-white text-slate-400 border border-indigo-100 rounded-2xl px-4 py-3 text-xs flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#3d3bf3] animate-pulse"></span>
                    <span className="w-2 h-2 rounded-full bg-[#3d3bf3] animate-pulse delay-150"></span>
                    <span className="w-2 h-2 rounded-full bg-[#3d3bf3] animate-pulse delay-300"></span>
                    KeepUp AI is thinking...
                  </div>
                </div>
              )}
            </div>

            <form onSubmit={handleSendAiChat} className="p-4 border-t border-indigo-100 bg-white flex items-center gap-3 rounded-b-2xl">
              <input 
                type="text" 
                placeholder="Ask e.g. Where is lecture hall CR2001? Or what time does the campus shuttle leave?"
                value={aiInput}
                onChange={(e) => setAiInput(e.target.value)}
                className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#3d3bf3]"
              />
              <button 
                type="submit"
                disabled={isAiLoading}
                className="px-5 py-2.5 bg-[#3d3bf3] text-white text-xs font-semibold rounded-xl hover:bg-indigo-700 transition-colors flex items-center gap-1.5 shadow-sm"
              >
                <Send className="w-3.5 h-3.5" />
                Send
              </button>
            </form>
          </div>
        )}

      </main>

      {/* NEW POST MODAL */}
      {isNewPostOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-6 shadow-2xl border border-indigo-100 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Create Campus Post</h3>
                <p className="text-xs text-slate-500">Posting as <span className="font-semibold text-[#3d3bf3]">{currentUser?.name}</span> ({currentUser?.role})</p>
              </div>
              <button onClick={() => setIsNewPostOpen(false)} className="p-2 text-slate-400 hover:text-slate-600 rounded-xl">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
                <select 
                  value={newPostCategory}
                  onChange={(e) => setNewPostCategory(e.target.value as any)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-[#3d3bf3]"
                >
                  <option value="Clubs & Events">Clubs & Events</option>
                  <option value="Academic">Academic</option>
                  <option value="Campus Life">Campus Life</option>
                  <option value="Marketplace">Marketplace & Lost/Found</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Campus</label>
                <select 
                  value={newPostCampus}
                  onChange={(e) => setNewPostCampus(e.target.value as any)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-[#3d3bf3]"
                >
                  <option value="Cyberjaya">Cyberjaya Campus</option>
                  <option value="Melaka">Melaka Campus</option>
                  <option value="Both">Both Campuses</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Post Content (AI will parse event details automatically)</label>
                <textarea 
                  rows={4}
                  placeholder="Share announcements, club events (include date & venue for auto-sync), or campus questions..."
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#3d3bf3]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Media Image URL (Optional)</label>
                <input 
                  type="text" 
                  placeholder="https://images.unsplash.com/..."
                  value={newPostMediaUrl}
                  onChange={(e) => setNewPostMediaUrl(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#3d3bf3]"
                />
              </div>

              {currentUser && currentUser.role !== 'student' && currentUser.role !== 'outsider' && (
                <div className="flex items-center gap-2 pt-2">
                  <input 
                    type="checkbox" 
                    id="officialToggle"
                    checked={newPostIsOfficial}
                    onChange={(e) => setNewPostIsOfficial(e.target.checked)}
                    className="w-4 h-4 text-[#3d3bf3] rounded border-slate-300 focus:ring-[#3d3bf3]"
                  />
                  <label htmlFor="officialToggle" className="text-xs font-bold text-slate-700 cursor-pointer">
                    Mark as Official Club / Faculty Announcement
                  </label>
                </div>
              )}
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
              <button 
                onClick={() => setIsNewPostOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleAiAnalyzeAndPost}
                disabled={isAnalyzingAI || !newPostContent.trim()}
                className="px-5 py-2.5 bg-[#3d3bf3] hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl shadow-sm transition-colors flex items-center gap-2 disabled:opacity-50"
              >
                {isAnalyzingAI ? (
                  <>
                    <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    AI Analyzing & Publishing...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-[#ff2929]" />
                    Publish with AI Moderator
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="bg-white border-t border-indigo-100 py-6 px-6 text-center text-xs text-slate-500 space-y-1">
        <p>© 2026 MMU KEEP UP · Multimedia University Cyberjaya & Melaka. All rights reserved.</p>
        <p className="text-[11px] text-slate-400">Powered by Gemini 2.5 Flash backend moderation & event calendar extraction.</p>
      </footer>

    </div>
  );
}
