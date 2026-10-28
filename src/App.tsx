import React, { useState } from 'react';
import { 
  Bell, Search, Plus, Calendar, MessageSquare, Heart, Bookmark, Share2, 
  ShieldCheck, User, Sparkles, MapPin, Building2, BookOpen, Send, CheckCircle, 
  Clock, AlertCircle, Filter, Trash2, ArrowUpRight, GraduationCap, Users, X, ArrowRight, ArrowLeft, Link as LinkIcon, Eye, EyeOff, ChevronDown, RefreshCw
} from 'lucide-react';

type UserRole = 'student' | 'lecturer' | 'club' | 'outsider';

interface UserProfile {
  id: string;
  name: string;
  handle: string;
  email: string;
  password?: string;
  role: UserRole;
  avatar: string;
  verified: boolean;
}

interface ClubAccount {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  bio: string;
  campus: 'Cyberjaya' | 'Melaka' | 'Both';
  followersCount: number;
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
  referenceUrl?: string;
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

interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'follow' | 'new_post' | 'event';
}

const REGISTERED_CLUBS: ClubAccount[] = [
  {
    id: 'club-1',
    name: 'MMU Cyberjaya Student Council',
    handle: '@mmu_csc',
    avatar: '🏛️',
    bio: 'Official student government representing Multimedia University Cyberjaya campus.',
    campus: 'Cyberjaya',
    followersCount: 1420
  },
  {
    id: 'club-2',
    name: 'Google Developer Student Club (GDSC)',
    handle: '@mmu_gdsc',
    avatar: '💻',
    bio: 'Empowering student developers with Google cloud, machine learning, and web technologies.',
    campus: 'Cyberjaya',
    followersCount: 1890
  },
  {
    id: 'club-3',
    name: 'MMU Cyber Law Society',
    handle: '@mmu_cyberlaw',
    avatar: '⚖️',
    bio: 'Promoting digital legal literacy, seminars, and inter-varsity moot court competitions.',
    campus: 'Melaka',
    followersCount: 850
  },
  {
    id: 'club-4',
    name: 'MMU Esports Club',
    handle: '@mmu_esports',
    avatar: '🎮',
    bio: 'Official varsity esports team and competitive gaming tournaments across Malaysia.',
    campus: 'Both',
    followersCount: 2300
  }
];

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
    referenceUrl: 'https://mmu.edu.my/carnival2026',
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
    referenceUrl: 'https://gdsc.mmu.edu.my/hackathon',
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
    const saved = localStorage.getItem('mmu_keep_up_current_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [savedAccounts, setSavedAccounts] = useState<UserProfile[]>(() => {
    const saved = localStorage.getItem('mmu_keep_up_saved_accounts');
    if (saved) return JSON.parse(saved);
    const defaultAccounts: UserProfile[] = [
      {
        id: 'usr_default_1',
        name: 'Ahmad Zikri',
        handle: '@ahmad_zikri',
        email: 'ahmad@student.mmu.edu.my',
        password: 'password123',
        role: 'student',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmad',
        verified: true
      }
    ];
    localStorage.setItem('mmu_keep_up_saved_accounts', JSON.stringify(defaultAccounts));
    return defaultAccounts;
  });

  const [showAuthModal, setShowAuthModal] = useState<boolean>(!currentUser);
  const [authMode, setAuthMode] = useState<'signup' | 'login'>('signup');
  const [regName, setRegName] = useState('');
  const [regHandle, setRegHandle] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRoleForReg, setSelectedRoleForReg] = useState<UserRole>('student');
  const [authError, setAuthError] = useState('');
  const [showAccountSwitcherDropdown, setShowAccountSwitcherDropdown] = useState(false);

  const [activeTab, setActiveTab] = useState<'feed' | 'calendar' | 'clubs' | 'ai-assistant' | 'club-detail'>('feed');
  const [selectedClub, setSelectedClub] = useState<ClubAccount | null>(null);
  const [followedClubIds, setFollowedClubIds] = useState<string[]>(['club-1', 'club-2']);

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

  // Notifications state
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 'notif-1',
      title: 'New Announcement',
      message: 'MMU Cyberjaya Student Council posted: Annual MMU Grand Club Carnival 2026',
      timestamp: '2 hours ago',
      read: false,
      type: 'new_post'
    },
    {
      id: 'notif-2',
      title: 'Follow Update',
      message: 'You are now following Google Developer Student Club (GDSC)',
      timestamp: 'Yesterday',
      read: true,
      type: 'follow'
    }
  ]);
  const [showNotificationsDropdown, setShowNotificationsDropdown] = useState(false);

  // New post modal state
  const [isNewPostOpen, setIsNewPostOpen] = useState(false);
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostCategory, setNewPostCategory] = useState<'Clubs & Events' | 'Academic' | 'Campus Life' | 'Marketplace'>('Clubs & Events');
  const [newPostCampus, setNewPostCampus] = useState<'Cyberjaya' | 'Melaka' | 'Both'>('Cyberjaya');
  const [newPostMediaUrl, setNewPostMediaUrl] = useState('');
  const [newPostRefUrl, setNewPostRefUrl] = useState('');
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

  const followedClubs = REGISTERED_CLUBS.filter(c => followedClubIds.includes(c.id));
  const exploreClubs = REGISTERED_CLUBS.filter(c => !followedClubIds.includes(c.id));

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');

    if (!regEmail.trim() || !regPassword.trim()) {
      setAuthError('Please fill in all required fields.');
      return;
    }

    if (authMode === 'signup') {
      if (!regName.trim() || !regHandle.trim()) {
        setAuthError('Please provide a name and unique handle.');
        return;
      }
      const formattedHandle = regHandle.startsWith('@') ? regHandle : '@' + regHandle.replace(/[^a-z0-9_]/g, '_');
      const newUser: UserProfile = {
        id: 'usr_' + Date.now(),
        name: regName,
        handle: formattedHandle,
        email: regEmail,
        password: regPassword,
        role: selectedRoleForReg,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${regName}`,
        verified: selectedRoleForReg === 'club' || selectedRoleForReg === 'lecturer' || selectedRoleForReg === 'student',
      };

      const updatedAccounts = [newUser, ...savedAccounts.filter(acc => acc.email !== newUser.email)];
      setSavedAccounts(updatedAccounts);
      localStorage.setItem('mmu_keep_up_saved_accounts', JSON.stringify(updatedAccounts));

      setCurrentUser(newUser);
      localStorage.setItem('mmu_keep_up_current_user', JSON.stringify(newUser));
      setShowAuthModal(false);
    } else {
      // Login mode (match against saved accounts by email or handle)
      const query = regEmail.trim().toLowerCase();
      const matched = savedAccounts.find(acc => 
        acc.email.toLowerCase() === query || 
        acc.handle.toLowerCase() === query ||
        acc.handle.toLowerCase() === '@' + query
      );

      if (matched) {
        if (matched.password && matched.password !== regPassword) {
          setAuthError('Incorrect password. Please try again.');
          return;
        }
        setCurrentUser(matched);
        localStorage.setItem('mmu_keep_up_current_user', JSON.stringify(matched));
        setShowAuthModal(false);
      } else {
        // Fallback or quick account creation
        setAuthError('Account not found. Please register first.');
      }
    }
  };

  const switchToAccount = (account: UserProfile) => {
    setCurrentUser(account);
    localStorage.setItem('mmu_keep_up_current_user', JSON.stringify(account));
    setShowAuthModal(false);
    setShowAccountSwitcherDropdown(false);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('mmu_keep_up_current_user');
    setShowAuthModal(true);
  };

  const requireAuthAction = (action: () => void) => {
    if (!currentUser || currentUser.role === 'outsider') {
      setShowAuthModal(true);
      return;
    }
    action();
  };

  const toggleFollowClub = (club: ClubAccount) => {
    const isCurrentlyFollowing = followedClubIds.includes(club.id);
    if (isCurrentlyFollowing) {
      setFollowedClubIds(followedClubIds.filter(id => id !== club.id));
      const newNotif: NotificationItem = {
        id: 'notif-' + Date.now(),
        title: 'Unfollowed Club',
        message: `You stopped following ${club.name}`,
        timestamp: 'Just now',
        read: false,
        type: 'follow'
      };
      setNotifications([newNotif, ...notifications]);
    } else {
      setFollowedClubIds([...followedClubIds, club.id]);
      const newNotif: NotificationItem = {
        id: 'notif-' + Date.now(),
        title: 'New Following',
        message: `You successfully started following ${club.name}`,
        timestamp: 'Just now',
        read: false,
        type: 'follow'
      };
      setNotifications([newNotif, ...notifications]);
    }
  };

  const handleClubClick = (club: ClubAccount) => {
    setSelectedClub(club);
    setActiveTab('club-detail');
  };

  const markAllNotificationsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
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
        referenceUrl: newPostRefUrl ? newPostRefUrl : undefined,
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

      const matchedClub = REGISTERED_CLUBS.find(c => c.name === currentUser.name);
      if (matchedClub && followedClubIds.includes(matchedClub.id)) {
        const followNotif: NotificationItem = {
          id: 'notif-' + Date.now(),
          title: 'New Post by Following',
          message: `${currentUser.name} posted: "${newPostContent.slice(0, 60)}..."`,
          timestamp: 'Just now',
          read: false,
          type: 'new_post'
        };
        setNotifications(prev => [followNotif, ...prev]);
      }

      setNewPostContent('');
      setNewPostMediaUrl('');
      setNewPostRefUrl('');
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
        referenceUrl: newPostRefUrl ? newPostRefUrl : undefined,
        isOfficialAnnouncement: false,
        likes: 1,
        bookmarks: 0,
        timestamp: 'Just now',
        comments: []
      };
      setPosts([fallbackPost, ...posts]);
      setNewPostContent('');
      setNewPostMediaUrl('');
      setNewPostRefUrl('');
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

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-[#ebeaff] text-slate-900 flex flex-col font-sans">
      
      {/* MANDATORY AUTHENTICATION / REGISTRATION MODAL WITH ACCOUNT SWITCHER */}
      {showAuthModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl border border-[#9694ff]/30 animate-in fade-in zoom-in duration-200">
            <div className="text-center mb-6">
              <span className="bg-[#ebeaff] text-[#3d3bf3] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                MMU KEEP UP
              </span>
              <h2 className="text-2xl font-black text-gray-900 mt-2">
                {authMode === 'signup' ? 'Create Your Account' : 'Welcome Back'}
              </h2>
              <p className="text-xs text-gray-500 mt-1">
                {authMode === 'signup' ? 'Join the official Multimedia University campus network.' : 'Log in with your email/handle & password or select a saved account.'}
              </p>
            </div>

            {/* Quick Saved Accounts Switcher Inside Modal */}
            {savedAccounts.length > 0 && authMode === 'login' && (
              <div className="mb-6 p-4 bg-indigo-50/60 rounded-2xl border border-indigo-100 space-y-2">
                <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wide block">Saved Accounts on this Device</span>
                <div className="space-y-1.5 max-h-36 overflow-y-auto">
                  {savedAccounts.map(acc => (
                    <button
                      key={acc.id}
                      type="button"
                      onClick={() => switchToAccount(acc)}
                      className="w-full flex items-center justify-between p-2 rounded-xl bg-white hover:bg-indigo-50 border border-indigo-100 transition-colors text-left"
                    >
                      <div className="flex items-center gap-2.5">
                        <img src={acc.avatar} alt="" className="w-7 h-7 rounded-full bg-slate-100" />
                        <div>
                          <p className="text-xs font-bold text-slate-900">{acc.name}</p>
                          <p className="text-[10px] text-slate-500">{acc.handle}</p>
                        </div>
                      </div>
                      <span className="text-[10px] bg-[#3d3bf3] text-white px-2 py-0.5 rounded-lg font-bold uppercase">
                        {acc.role}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {authError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-xs font-semibold">
                {authError}
              </div>
            )}

            <form onSubmit={handleAuthSubmit} className="space-y-4">
              
              {authMode === 'signup' && (
                <>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Account Role</label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { role: 'student', label: '🎓 Student' },
                        { role: 'club', label: '🏆 Club' },
                        { role: 'lecturer', label: '📚 Lecturer' },
                        { role: 'outsider', label: '🌐 Guest' },
                      ].map((item) => (
                        <button
                          type="button"
                          key={item.role}
                          onClick={() => setSelectedRoleForReg(item.role as UserRole)}
                          className={`p-2.5 text-center rounded-xl border text-xs font-bold transition-all ${
                            selectedRoleForReg === item.role
                              ? 'border-[#3d3bf3] bg-[#ebeaff] text-[#3d3bf3] shadow-sm'
                              : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Full Name / Display Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Angeline Leong"
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#3d3bf3] focus:outline-none text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Unique Username / Handle</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. @angeline_l"
                      value={regHandle}
                      onChange={(e) => setRegHandle(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#3d3bf3] focus:outline-none text-xs font-mono"
                    />
                  </div>
                </>
              )}

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                  {authMode === 'signup' ? 'Email Address' : 'Email Address or Handle'}
                </label>
                <input
                  type="text"
                  required
                  placeholder={authMode === 'signup' ? 'username@student.mmu.edu.my' : 'Email or @handle'}
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#3d3bf3] focus:outline-none text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="Enter secure password"
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    className="w-full px-4 py-2.5 pr-10 rounded-xl border border-gray-200 focus:border-[#3d3bf3] focus:outline-none text-xs"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#3d3bf3] text-white font-bold rounded-xl shadow-lg hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 mt-2 text-xs uppercase tracking-wider"
              >
                {authMode === 'signup' ? 'Create & Save Account' : 'Log In'} <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <div className="text-center mt-5 pt-4 border-t border-slate-100">
              <button
                onClick={() => {
                  setAuthMode(authMode === 'signup' ? 'login' : 'signup');
                  setAuthError('');
                }}
                className="text-xs text-slate-600 hover:text-[#3d3bf3] font-semibold"
              >
                {authMode === 'signup' 
                  ? 'Already have an account? Log in' 
                  : "New to MMU Keep Up? Register"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TOP BAR CONTRACT */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-indigo-100 px-6 py-3.5 flex items-center justify-between gap-8">
        
        {/* Zone 1: Brand Wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-10 h-10 rounded-xl bg-[#3d3bf3] text-white flex items-center justify-center font-bold text-xl shadow-md shadow-indigo-500/25">
            M
          </div>
          <div>
            <a href="/" onClick={(e) => { e.preventDefault(); setActiveTab('feed'); }} className="text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap block">
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

        {/* Zone 3: User Profile, Account Switcher Dropdown & Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          
          {/* Notifications Bell Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setShowNotificationsDropdown(!showNotificationsDropdown)}
              className="relative p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#ff2929] text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-sm">
                  {unreadCount}
                </span>
              )}
            </button>

            {showNotificationsDropdown && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-indigo-100 py-3 z-50 animate-in fade-in zoom-in duration-150">
                <div className="px-4 pb-2 border-b border-slate-100 flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-900">Notifications</h4>
                  {unreadCount > 0 && (
                    <button onClick={markAllNotificationsRead} className="text-[11px] text-[#3d3bf3] font-semibold hover:underline">
                      Mark all read
                    </button>
                  )}
                </div>

                <div className="max-h-72 overflow-y-auto divide-y divide-slate-100">
                  {notifications.length === 0 ? (
                    <p className="text-xs text-slate-400 text-center py-6">No notifications yet</p>
                  ) : (
                    notifications.map(notif => (
                      <div key={notif.id} className={`p-3 text-xs space-y-1 hover:bg-slate-50 transition-colors ${!notif.read ? 'bg-indigo-50/40' : ''}`}>
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-800">{notif.title}</span>
                          <span className="text-[10px] text-slate-400">{notif.timestamp}</span>
                        </div>
                        <p className="text-slate-600 leading-snug">{notif.message}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {currentUser ? (
            <div className="relative">
              <button 
                onClick={() => setShowAccountSwitcherDropdown(!showAccountSwitcherDropdown)}
                className="flex items-center gap-2.5 bg-[#ebeaff]/80 px-3 py-1.5 rounded-xl border border-indigo-200 hover:bg-indigo-100/60 transition-colors"
              >
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
                <ChevronDown className="w-3.5 h-3.5 text-slate-500 ml-1" />
              </button>

              {/* Top Bar Account Switcher Dropdown */}
              {showAccountSwitcherDropdown && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-indigo-100 py-3 z-50 animate-in fade-in zoom-in duration-150">
                  <div className="px-4 pb-2 border-b border-slate-100">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Switch Account</span>
                  </div>

                  <div className="py-1 max-h-48 overflow-y-auto divide-y divide-slate-50">
                    {savedAccounts.map(acc => (
                      <button
                        key={acc.id}
                        onClick={() => switchToAccount(acc)}
                        className={`w-full px-4 py-2 text-left flex items-center justify-between hover:bg-indigo-50 transition-colors ${currentUser?.id === acc.id ? 'bg-indigo-50/60 font-bold' : ''}`}
                      >
                        <div className="flex items-center gap-2.5 truncate">
                          <img src={acc.avatar} alt="" className="w-6 h-6 rounded-full bg-slate-100 shrink-0" />
                          <div className="truncate">
                            <p className="text-xs text-slate-900 truncate">{acc.name}</p>
                            <p className="text-[10px] text-slate-400 truncate">{acc.handle}</p>
                          </div>
                        </div>
                        {currentUser?.id === acc.id && <CheckCircle className="w-3.5 h-3.5 text-[#3d3bf3] shrink-0" />}
                      </button>
                    ))}
                  </div>

                  <div className="pt-2 border-t border-slate-100 px-3 flex flex-col gap-1.5">
                    <button
                      onClick={() => {
                        setShowAccountSwitcherDropdown(false);
                        setAuthMode('login');
                        setShowAuthModal(true);
                      }}
                      className="w-full text-left px-3 py-1.5 rounded-xl text-xs font-semibold text-[#3d3bf3] hover:bg-indigo-50"
                    >
                      + Add another account
                    </button>
                    <button 
                      onClick={() => {
                        setShowAccountSwitcherDropdown(false);
                        handleLogout();
                      }}
                      className="w-full text-left px-3 py-1.5 rounded-xl text-xs font-semibold text-red-600 hover:bg-red-50"
                    >
                      Log Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => {
                setAuthMode('login');
                setShowAuthModal(true);
              }}
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
        
        {activeTab === 'club-detail' && selectedClub ? (
          /* DEDICATED CLUB PROFILE & FEED NAVIGATION */
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-8 border border-indigo-100 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-indigo-100/50 to-transparent rounded-full blur-3xl pointer-events-none"></div>
              
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
                <div className="flex items-center gap-5">
                  <div className="w-20 h-20 rounded-2xl bg-[#ebeaff] border-2 border-indigo-200 flex items-center justify-center text-4xl shadow-inner shrink-0">
                    {selectedClub.avatar}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">{selectedClub.name}</h1>
                      <CheckCircle className="w-5 h-5 text-[#3d3bf3]" />
                    </div>
                    <p className="text-xs text-indigo-600 font-semibold">{selectedClub.handle} · MMU {selectedClub.campus}</p>
                    <p className="text-xs text-slate-600 mt-2 max-w-xl leading-relaxed">{selectedClub.bio}</p>
                    <div className="flex items-center gap-4 mt-3 text-xs text-slate-500 font-mono">
                      <span><strong>{selectedClub.followersCount.toLocaleString()}</strong> Followers</span>
                      <span>·</span>
                      <span><strong>{posts.filter(p => p.authorName === selectedClub.name).length}</strong> Official Posts</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto">
                  <button 
                    onClick={() => toggleFollowClub(selectedClub)}
                    className={`flex-1 md:flex-initial px-6 py-2.5 rounded-xl text-xs font-bold shadow-sm transition-colors ${followedClubIds.includes(selectedClub.id) ? 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200' : 'bg-[#3d3bf3] text-white hover:bg-indigo-700'}`}
                  >
                    {followedClubIds.includes(selectedClub.id) ? 'Following' : 'Follow Club'}
                  </button>
                  <button 
                    onClick={() => setActiveTab('feed')}
                    className="px-4 py-2.5 bg-white border border-indigo-200 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-semibold shadow-sm transition-colors flex items-center gap-1.5"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Feed
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wide">Announcements & Feed by {selectedClub.name}</h3>
              
              {posts.filter(p => p.authorName === selectedClub.name).length === 0 ? (
                <div className="bg-white rounded-2xl p-12 text-center border border-indigo-100 space-y-3">
                  <AlertCircle className="w-10 h-10 text-slate-300 mx-auto" />
                  <h4 className="text-sm font-bold text-slate-700">No posts from this club yet</h4>
                  <p className="text-xs text-slate-500">Check back later for official announcements and events.</p>
                </div>
              ) : (
                posts.filter(p => p.authorName === selectedClub.name).map(post => (
                  <article key={post.id} className="bg-white rounded-2xl p-6 border border-indigo-100 shadow-sm space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#ebeaff] border border-indigo-200 flex items-center justify-center text-lg">
                          {post.authorAvatar}
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-slate-900">{post.authorName}</h4>
                          <span className="text-xs text-slate-400">{post.timestamp}</span>
                        </div>
                      </div>
                      <span className="bg-[#ff2929]/10 text-[#ff2929] px-3 py-1 rounded-full text-xs font-bold border border-[#ff2929]/20">
                        Official Club Post
                      </span>
                    </div>

                    <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">{post.content}</p>

                    {post.mediaUrls && post.mediaUrls.length > 0 && (
                      <div className={`mt-4 grid gap-2 ${post.mediaUrls.length > 1 ? 'grid-cols-2' : 'grid-cols-1'}`}>
                        {post.mediaUrls.map((url, idx) => (
                          <img 
                            key={idx} 
                            src={url} 
                            alt="post attachment" 
                            className="rounded-xl w-full h-64 object-cover border border-gray-100 shadow-sm" 
                            referrerPolicy="no-referrer"
                          />
                        ))}
                      </div>
                    )}

                    {post.referenceUrl && (
                      <a href={post.referenceUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 p-3 bg-indigo-50/60 border border-indigo-100 rounded-xl text-xs text-[#3d3bf3] font-semibold hover:bg-indigo-100/60 transition-colors">
                        <LinkIcon className="w-4 h-4 shrink-0" />
                        <span className="truncate">{post.referenceUrl}</span>
                        <ArrowUpRight className="w-3.5 h-3.5 ml-auto shrink-0" />
                      </a>
                    )}

                    {post.eventDetails && (
                      <div className="bg-[#ebeaff]/60 border border-indigo-200 rounded-xl p-4 flex items-center justify-between">
                        <div>
                          <div className="text-xs font-bold text-[#3d3bf3] uppercase">Event Alert</div>
                          <h5 className="text-sm font-bold text-slate-900">{post.eventDetails.eventTitle}</h5>
                          <p className="text-xs text-slate-600">{post.eventDetails.eventDate} · {post.eventDetails.venue}</p>
                        </div>
                        <button 
                          onClick={() => handleSyncEvent(post.eventDetails!, post.authorName, post.campus)}
                          className="px-3.5 py-2 bg-[#3d3bf3] text-white text-xs font-semibold rounded-xl hover:bg-indigo-700"
                        >
                          Sync to Calendar
                        </button>
                      </div>
                    )}
                  </article>
                ))
              )}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* LEFT SIDEBAR: Separated Following Clubs & Explore Clubs Sections */}
            <div className="lg:col-span-3 space-y-6">
              
              {/* Following Clubs Section */}
              <div className="bg-white rounded-2xl p-5 border border-indigo-100 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Following Clubs</h3>
                  <span className="text-[10px] bg-[#3d3bf3] text-white px-2 py-0.5 rounded-full font-bold">{followedClubs.length}</span>
                </div>
                {followedClubs.length === 0 ? (
                  <p className="text-xs text-slate-400 italic py-2">You aren't following any clubs yet.</p>
                ) : (
                  <div className="space-y-3">
                    {followedClubs.map(club => (
                      <div key={club.id} className="p-3 rounded-xl bg-slate-50 border border-slate-100 hover:border-indigo-200 transition-all space-y-2.5">
                        <div className="flex items-start justify-between gap-2">
                          <div 
                            onClick={() => handleClubClick(club)}
                            className="flex items-center gap-2.5 cursor-pointer group"
                          >
                            <div className="w-9 h-9 rounded-xl bg-white border border-indigo-200 flex items-center justify-center text-lg shrink-0 shadow-inner group-hover:scale-105 transition-transform">
                              {club.avatar}
                            </div>
                            <div>
                              <h4 className="text-xs font-bold text-slate-900 group-hover:text-[#3d3bf3] transition-colors flex items-center gap-1">
                                {club.name}
                                <CheckCircle className="w-3 h-3 text-[#3d3bf3] shrink-0" />
                              </h4>
                              <p className="text-[11px] text-slate-400">{club.handle}</p>
                            </div>
                          </div>
                        </div>

                        <p className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed">
                          {club.bio}
                        </p>

                        <div className="flex items-center justify-between pt-1 border-t border-slate-200/60">
                          <span className="text-[10px] text-slate-400 font-mono">
                            {club.followersCount.toLocaleString()} followers
                          </span>
                          <button 
                            onClick={() => toggleFollowClub(club)}
                            className="px-3 py-1 rounded-lg text-[11px] font-bold bg-indigo-50 text-[#3d3bf3] border border-indigo-200 hover:bg-indigo-100 transition-all"
                          >
                            Following
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Explore Clubs Section */}
              <div className="bg-white rounded-2xl p-5 border border-indigo-100 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Explore Clubs</h3>
                  <span className="text-[10px] bg-slate-200 text-slate-600 px-2 py-0.5 rounded-full font-bold">{exploreClubs.length}</span>
                </div>
                {exploreClubs.length === 0 ? (
                  <p className="text-xs text-slate-400 italic py-2">You are following all available clubs!</p>
                ) : (
                  <div className="space-y-3">
                    {exploreClubs.map(club => (
                      <div key={club.id} className="p-3 rounded-xl bg-slate-50 border border-slate-100 hover:border-indigo-200 transition-all space-y-2.5">
                        <div className="flex items-start justify-between gap-2">
                          <div 
                            onClick={() => handleClubClick(club)}
                            className="flex items-center gap-2.5 cursor-pointer group"
                          >
                            <div className="w-9 h-9 rounded-xl bg-white border border-indigo-200 flex items-center justify-center text-lg shrink-0 shadow-inner group-hover:scale-105 transition-transform">
                              {club.avatar}
                            </div>
                            <div>
                              <h4 className="text-xs font-bold text-slate-900 group-hover:text-[#3d3bf3] transition-colors flex items-center gap-1">
                                {club.name}
                                <CheckCircle className="w-3 h-3 text-[#3d3bf3] shrink-0" />
                              </h4>
                              <p className="text-[11px] text-slate-400">{club.handle}</p>
                            </div>
                          </div>
                        </div>

                        <p className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed">
                          {club.bio}
                        </p>

                        <div className="flex items-center justify-between pt-1 border-t border-slate-200/60">
                          <span className="text-[10px] text-slate-400 font-mono">
                            {club.followersCount.toLocaleString()} followers
                          </span>
                          <button 
                            onClick={() => toggleFollowClub(club)}
                            className="px-3 py-1 rounded-lg text-[11px] font-bold bg-[#3d3bf3] text-white hover:bg-indigo-700 shadow-sm transition-all"
                          >
                            Follow
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Campus Filter */}
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

                      {/* Media Attachment (if any) */}
                      {post.mediaUrls.length > 0 && (
                        <div className={`mt-4 grid gap-2 ${post.mediaUrls.length > 1 ? 'grid-cols-2' : 'grid-cols-1'}`}>
                          {post.mediaUrls.map((url, idx) => (
                            <img 
                              key={idx} 
                              src={url} 
                              alt="post attachment" 
                              className="rounded-xl w-full h-64 object-cover border border-gray-100 shadow-sm" 
                              referrerPolicy="no-referrer"
                            />
                          ))}
                        </div>
                      )}

                      {/* Reference URL (if any) */}
                      {post.referenceUrl && (
                        <a href={post.referenceUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 p-3 bg-indigo-50/60 border border-indigo-100 rounded-xl text-xs text-[#3d3bf3] font-semibold hover:bg-indigo-100/60 transition-colors">
                          <LinkIcon className="w-4 h-4 shrink-0" />
                          <span className="truncate">{post.referenceUrl}</span>
                          <ArrowUpRight className="w-3.5 h-3.5 ml-auto shrink-0" />
                        </a>
                      )}

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

            {/* Following Clubs Section in Directory */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wide">Following Clubs</h3>
                <span className="text-xs bg-[#3d3bf3] text-white px-2 py-0.5 rounded-full font-bold">{followedClubs.length}</span>
              </div>
              {followedClubs.length === 0 ? (
                <div className="bg-white rounded-2xl p-6 text-center border border-indigo-100 text-xs text-slate-400 italic">
                  You aren't following any clubs yet. Explore and follow clubs below!
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {followedClubs.map((club) => (
                    <div key={club.id} className="bg-white rounded-2xl p-6 border border-indigo-100 shadow-sm space-y-4 hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between">
                        <span className="text-xs bg-indigo-50 text-[#3d3bf3] font-semibold px-2.5 py-1 rounded-lg">
                          MMU {club.campus}
                        </span>
                        <span className="text-xs text-slate-500 flex items-center gap-1 font-mono">
                          <Users className="w-3.5 h-3.5" />
                          {club.followersCount.toLocaleString()} followers
                        </span>
                      </div>
                      <div 
                        onClick={() => handleClubClick(club)}
                        className="cursor-pointer group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-2xl bg-[#ebeaff] flex items-center justify-center text-2xl group-hover:scale-105 transition-transform">
                            {club.avatar}
                          </div>
                          <div>
                            <h3 className="text-base font-bold text-slate-900 group-hover:text-[#3d3bf3] transition-colors flex items-center gap-1.5">
                              {club.name}
                              <CheckCircle className="w-4 h-4 text-[#3d3bf3]" />
                            </h3>
                            <p className="text-xs text-slate-400">{club.handle}</p>
                          </div>
                        </div>
                        <p className="text-xs text-slate-600 mt-3 leading-relaxed">{club.bio}</p>
                      </div>
                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                        <button 
                          onClick={() => handleClubClick(club)}
                          className="text-xs font-semibold text-[#3d3bf3] hover:underline"
                        >
                          View Profile & Feed
                        </button>
                        <button 
                          onClick={() => toggleFollowClub(club)}
                          className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-indigo-50 text-[#3d3bf3] border border-indigo-200 hover:bg-indigo-100 transition-colors"
                        >
                          Following
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Explore Clubs Section in Directory */}
            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wide">Explore Clubs</h3>
                <span className="text-xs bg-slate-200 text-slate-700 px-2 py-0.5 rounded-full font-bold">{exploreClubs.length}</span>
              </div>
              {exploreClubs.length === 0 ? (
                <div className="bg-white rounded-2xl p-6 text-center border border-indigo-100 text-xs text-slate-400 italic">
                  You are following all available clubs!
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {exploreClubs.map((club) => (
                    <div key={club.id} className="bg-white rounded-2xl p-6 border border-indigo-100 shadow-sm space-y-4 hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between">
                        <span className="text-xs bg-indigo-50 text-[#3d3bf3] font-semibold px-2.5 py-1 rounded-lg">
                          MMU {club.campus}
                        </span>
                        <span className="text-xs text-slate-500 flex items-center gap-1 font-mono">
                          <Users className="w-3.5 h-3.5" />
                          {club.followersCount.toLocaleString()} followers
                        </span>
                      </div>
                      <div 
                        onClick={() => handleClubClick(club)}
                        className="cursor-pointer group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-2xl bg-[#ebeaff] flex items-center justify-center text-2xl group-hover:scale-105 transition-transform">
                            {club.avatar}
                          </div>
                          <div>
                            <h3 className="text-base font-bold text-slate-900 group-hover:text-[#3d3bf3] transition-colors flex items-center gap-1.5">
                              {club.name}
                              <CheckCircle className="w-4 h-4 text-[#3d3bf3]" />
                            </h3>
                            <p className="text-xs text-slate-400">{club.handle}</p>
                          </div>
                        </div>
                        <p className="text-xs text-slate-600 mt-3 leading-relaxed">{club.bio}</p>
                      </div>
                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                        <button 
                          onClick={() => handleClubClick(club)}
                          className="text-xs font-semibold text-[#3d3bf3] hover:underline"
                        >
                          View Profile & Feed
                        </button>
                        <button 
                          onClick={() => toggleFollowClub(club)}
                          className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-[#3d3bf3] text-white hover:bg-indigo-700 transition-colors"
                        >
                          Follow Club
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
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
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-5 shadow-2xl border border-indigo-100 animate-in fade-in zoom-in duration-200">
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
              <div className="grid grid-cols-2 gap-3">
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
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Media Image / Photo (Optional)</label>
                <input 
                  type="text" 
                  placeholder="https://images.unsplash.com/..."
                  value={newPostMediaUrl}
                  onChange={(e) => setNewPostMediaUrl(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#3d3bf3]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Post Content / Description</label>
                <textarea 
                  rows={4}
                  placeholder="Share announcements, club events (include date & venue for auto-sync), or campus questions..."
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#3d3bf3]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">External Reference URL (Optional)</label>
                <input 
                  type="text" 
                  placeholder="https://mmu.edu.my/..."
                  value={newPostRefUrl}
                  onChange={(e) => setNewPostRefUrl(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#3d3bf3]"
                />
              </div>

              {currentUser && currentUser.role !== 'student' && currentUser.role !== 'outsider' && (
                <div className="flex items-center gap-2 pt-1">
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
