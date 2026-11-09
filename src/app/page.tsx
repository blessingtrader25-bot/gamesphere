
"use client";

import { useState } from "react";
import {
  Home, Compass, Users, CalendarDays, Bell, Settings, Search,
  Plus, ChevronDown, Flame, Gamepad2, Trophy, MessageCircle,
  Heart, Share2, Bookmark, MoreHorizontal, Sparkles, TrendingUp,
  Hash, Radio, Zap, Menu, X, Send, ChevronRight
} from "lucide-react";

const initialPosts = [
  {
    id: 1,
    community: "VALORANT",
    category: "Competitive Gaming",
    author: "shadow.exe",
    avatar: "S",
    time: "12 min ago",
    title: "Finally reached Radiant after 600 hours. Never giving up pays off.",
    body: "The grind was absolutely worth it. Started from Bronze and finally made it. To everyone stuck in a rank right now, keep pushing!",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1000&q=85",
    likes: 1248,
    comments: 186,
    tag: "Achievement",
    liked: false
  },
  {
    id: 2,
    community: "GAMING",
    category: "Gaming Discussion",
    author: "pixelwanderer",
    avatar: "P",
    time: "38 min ago",
    title: "What game completely changed your perspective on gaming?",
    body: "For me, it was Red Dead Redemption 2. The world-building, characters and storytelling were on another level. What's yours?",
    image: "",
    likes: 892,
    comments: 243,
    tag: "Discussion",
    liked: false
  },
  {
    id: 3,
    community: "GAMEDEV",
    category: "Game Development",
    author: "indie_creator",
    avatar: "I",
    time: "1 hour ago",
    title: "After 8 months of development, our indie game finally has a playable demo!",
    body: "Built entirely by a team of three. It's a small sci-fi exploration game. Would love to hear your feedback!",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1000&q=85",
    likes: 567,
    comments: 91,
    tag: "Showcase",
    liked: false
  }
];

const communities = [
  { name: "VALORANT", members: "124K", color: "#ff5364", icon: "V" },
  { name: "Minecraft", members: "98K", color: "#55bd75", icon: "M" },
  { name: "GTA VI", members: "86K", color: "#a78bfa", icon: "G" },
  { name: "GameDev", members: "42K", color: "#43b8d8", icon: "D" }
];

export default function HomePage() {
  const [posts, setPosts] = useState(initialPosts);
  const [activeTab, setActiveTab] = useState("For You");
  const [activeNav, setActiveNav] = useState("Home");
  const [joined, setJoined] = useState<string[]>(["VALORANT", "Minecraft"]);
  const [search, setSearch] = useState("");
  const [newPost, setNewPost] = useState("");
  const [showComposer, setShowComposer] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [saved, setSaved] = useState<number[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

 const toggleLike = (id: number) => {
  setPosts(current =>
    current.map(post =>
      post.id === id
        ? {
            ...post,
            liked: !post.liked,
            likes: post.likes + (post.liked ? -1 : 1)
          }
        : post
    )
  );
 };

  const toggleJoin = (name: string) => {
    setJoined(current => current.includes(name)
      ? current.filter(item => item !== name)
      : [...current, name]
    );
  };

  const publishPost = () => {
    if (!newPost.trim()) return;
    setPosts(current => [{
      id: Date.now(),
      community: "GAMING",
      category: "Gaming Discussion",
      author: "you",
      avatar: "Y",
      time: "Just now",
      title: newPost.trim(),
      body: "Shared with the GameSphere community.",
      image: "",
      likes: 0,
      comments: 0,
      tag: "New Post",
      liked: false
    }, ...current]);
    setNewPost("");
    setShowComposer(false);
    setActiveTab("For You");
  };

  const filteredPosts = posts
  .filter(post =>
    `${post.title} ${post.body} ${post.community} ${post.author}`
      .toLowerCase()
      .includes(search.toLowerCase())
  )
  .filter(post => {
    if (activeTab === "Following") {
      return joined.includes(post.community);
    }
    return true;
  })
  .sort((a, b) => {
    if (activeTab === "Trending") {
      return b.likes + b.comments - (a.likes + a.comments);
    }

    if (activeTab === "Latest") {
      return b.id - a.id;
    }

    return 0;
  });

  const navItems = [
    { name: "Home", icon: Home },
    { name: "Discover", icon: Compass },
    { name: "Communities", icon: Users },
    { name: "Events", icon: CalendarDays },
    { name: "Notifications", icon: Bell }
  ];

  return (
    <main className="app-shell">
    
<header className="topbar">
  <div className="brand">
    <div className="brand-icon"><Gamepad2 size={22}/></div>
    <span>game<span className="brand-accent">sphere</span></span>
  </div>

  <div className="search-box">
    <Search size={18}/>
    <input
      placeholder="Search games, communities, players..."
      value={search}
      onChange={e => setSearch(e.target.value)}
    />
    <kbd>⌘ K</kbd>
    {search && (
      <button className="tiny-icon" onClick={() => setSearch("")}>
        <X size={16}/>
      </button>
    )}
  </div>

  <div className="top-actions">
    <div className="header-dropdown-wrap">
      <button
        className="icon-button notification-button"
        aria-label="Notifications"
        onClick={() => {
          setShowNotifications(!showNotifications);
          setShowProfile(false);
        }}
      >
        <Bell size={19}/>
        <span className="notification-dot"/>
      </button>

      {showNotifications && (
        <div className="header-dropdown notification-dropdown">
          <div className="dropdown-heading">
            <strong>Notifications</strong>
            <span>3 new</span>
          </div>
          <div className="notification-item">
            <span className="notification-icon"><Heart size={15}/></span>
            <div><strong>New appreciation!</strong><p>Someone liked your gaming activity.</p><small>5 minutes ago</small></div>
          </div>
          <div className="notification-item">
            <span className="notification-icon"><MessageCircle size={15}/></span>
            <div><strong>New discussion</strong><p>Your community is having a conversation.</p><small>20 minutes ago</small></div>
          </div>
          <div className="notification-item">
            <span className="notification-icon"><Users size={15}/></span>
            <div><strong>Community update</strong><p>Discover what&apos;s happening in GameSphere.</p><small>1 hour ago</small></div>
          </div>
          <button className="dropdown-footer" onClick={() => setShowNotifications(false)}>
            Close notifications
          </button>
        </div>
      )}
    </div>

    <div className="top-divider"/>

    <div className="header-dropdown-wrap">
      <button
        className="profile-button"
        onClick={() => {
          setShowProfile(!showProfile);
          setShowNotifications(false);
        }}
      >
        <div className="user-avatar">Y</div>
        <span>Player One</span>
        <ChevronDown size={15}/>
      </button>

      {showProfile && (
        <div className="header-dropdown profile-dropdown">
          <div className="profile-dropdown-heading">
            <div className="user-avatar">Y</div>
            <div><strong>Player One</strong><small>Level 08 · Gamer</small></div>
          </div>
          <button onClick={() => {setActiveNav("Profile");setShowProfile(false);}}>
            <Users size={16}/> My Profile
          </button>
          <button onClick={() => {setActiveNav("Settings");setShowProfile(false);}}>
            <Settings size={16}/> Settings
          </button>
          <button onClick={() => {setActiveNav("Communities");setShowProfile(false);}}>
            <Gamepad2 size={16}/> My Communities
          </button>
        </div>
      )}
    </div>

    <button
      className="icon-button mobile-toggle"
      onClick={() => setMobileMenu(!mobileMenu)}
      aria-label="Toggle navigation"
    >
      {mobileMenu ? <X/> : <Menu/>}
    </button>
  </div>
</header>


      <div className="layout">
        <aside className={`sidebar ${mobileMenu ? "sidebar-open" : ""}`}>

<div className="sidebar-section">
  <p className="section-label">MAIN MENU</p>

  {navItems.map(item => {
    const Icon = item.icon;

    return (
      <button
        key={item.name}
        onClick={() => {
          setActiveNav(item.name);
          setMobileMenu(false);
          setSearch("");
        }}
        className={`nav-item ${
          activeNav === item.name ? "nav-active" : ""
        }`}
      >
        <Icon size={18}/>
        <span>{item.name}</span>

        {item.name === "Notifications" && (
          <span className="nav-count">3</span>
        )}

        {item.name === "Home" && activeNav === "Home" && (
          <span className="nav-active-dot"/>
        )}
      </button>
    );
  })}
</div>

<div className="sidebar-section community-section">
  <div className="section-heading">
    <p className="section-label">YOUR GAMING SPACES</p>

    <button
      className="tiny-icon sidebar-add"
      aria-label="Explore communities"
      onClick={() => {
        setActiveNav("Discover");
        setMobileMenu(false);
      }}
    >
      <Plus size={17}/>
    </button>
  </div>

  {communities.filter(c => joined.includes(c.name)).map(c => (
    <button
      key={c.name}
      className={`community-nav ${
        search === c.name ? "community-nav-active" : ""
      }`}
      onClick={() => {
        setActiveNav("Communities");
        setSearch(c.name);
        setMobileMenu(false);
      }}
    >
      <span
        className="community-mini"
        style={{ background: c.color }}
      >
        {c.icon}
      </span>

      <span className="community-name">{c.name}</span>
      <span className="online-indicator"/>
    </button>
  ))}

  {joined.length === 0 && (
    <p className="sidebar-empty">
      You haven&apos;t joined any communities yet.
    </p>
  )}

  <button
    className="see-all"
    onClick={() => {
      setActiveNav("Discover");
      setSearch("");
      setMobileMenu(false);
    }}
  >
    <Plus size={15}/>
    Discover communities
    <ChevronRight size={14}/>
  </button>
</div>

<div className="sidebar-bottom">
  <div className="upgrade-card">
    <div className="upgrade-icon">
      <Sparkles size={19}/>
    </div>

    <span className="upgrade-eyebrow">LEVEL UP YOUR EXPERIENCE</span>

    <strong>Find your gaming tribe.</strong>

    <p>
      Meet players, exchange strategies and discover your next favourite game.
    </p>

    <button
      onClick={() => {
        setActiveNav("Discover");
        setSearch("");
        setMobileMenu(false);
      }}
    >
      Explore GameSphere
      <ChevronRight size={14}/>
    </button>
  </div>

  <button
    className={`nav-item settings-item ${
      activeNav === "Settings" ? "nav-active" : ""
    }`}
    onClick={() => {
      setActiveNav("Settings");
      setMobileMenu(false);
    }}
  >
    <Settings size={18}/>
    <span>Settings</span>
  </button>

  <div className="sidebar-footer">
    <span>GAMESPHERE</span>
    <span>© 2026 · BUILT FOR GAMERS</span>
  </div>
</div>
</aside>


        <section className="feed-area">
          <div className="welcome-row">
            <div>
              <div className="eyebrow"><span className="live-dot"/> YOUR GAMING UNIVERSE</div>
              <h1>Welcome back, Player <span>✦</span></h1>
              <p>Your people. Your games. Your universe.</p>
            </div>
            <button className="create-button" onClick={() => setShowComposer(true)}>
              <Plus size={18}/> Create post
            </button>
          </div>

          <div className="hero-banner">
            <div className="hero-content">
              <div className="hero-tag"><Flame size={13}/> THIS WEEK&apos;S SPOTLIGHT</div>
              <h2>Every game has<br/>a <span>story.</span></h2>
              <p>Every player has a place here.</p>
              <button onClick={() => setActiveNav("Discover")}>Explore communities <ChevronRight size={16}/></button>
            </div>
            <div className="hero-art">
              <div className="hero-orbit orbit-one"/>
              <div className="hero-orbit orbit-two"/>
              <div className="hero-controller"><Gamepad2 size={100}/></div>
              <div className="floating-chip chip-one"><Trophy size={17}/></div>
              <div className="floating-chip chip-two"><Zap size={17}/></div>
            </div>
            <div className="hero-number">01 / 04</div>
          </div>

          <div className="feed-heading">
            <div>
              <div className="section-kicker"><Radio size={14}/> COMMUNITY PULSE</div>
              <h2>The Feed</h2>
            </div>
            <button className="sort-button"><TrendingUp size={15}/> Trending <ChevronDown size={14}/></button>
          </div>

          <div className="feed-tabs">
            {["For You", "Following", "Trending", "Latest"].map(tab => (
              <button
                key={tab}
                className={activeTab === tab ? "feed-tab active-tab" : "feed-tab"}
                onClick={() => setActiveTab(tab)}
              >{tab}</button>
            ))}
          </div>

          {showComposer && (
            <div className="composer-card">
              <div className="composer-top">
                <div className="user-avatar">Y</div>
                <div><strong>Create a discussion</strong><p>Share something with your community</p></div>
                <button className="tiny-icon" onClick={() => setShowComposer(false)}><X size={19}/></button>
              </div>
              <textarea
                value={newPost}
                onChange={e => setNewPost(e.target.value)}
                placeholder="What's happening in your gaming world?"
              />
              <div className="composer-footer">
                <span><Hash size={14}/> GAMING COMMUNITY</span>
                <button className="create-button" disabled={!newPost.trim()} onClick={publishPost}>
                  <Send size={15}/> Publish
                </button>
              </div>
            </div>
          )}

          <div className="posts-list">
            {filteredPosts.map(post => (
              <article className="post-card" key={post.id}>
                <div className="post-community-row">
                  <div className="post-community-icon">{post.community.slice(0,1)}</div>
                  <div className="post-meta">
                    <strong>g/{post.community.toLowerCase()}</strong>
                    <span>{post.author} · {post.time}</span>
                  </div>
                  <span className="post-tag">{post.tag}</span>
                  <button className="tiny-icon more-button" aria-label="More options"><MoreHorizontal size={20}/></button>
                </div>
                <h3>{post.title}</h3>
                <p className="post-body">{post.body}</p>
                {post.image && <div className="post-image-wrap"><img src={post.image} alt="Gaming community post artwork"/></div>}
                <div className="post-actions">
                  <button className={`post-action ${post.liked ? "liked" : ""}`} onClick={() => toggleLike(post.id)}>
                    <Heart size={17} fill={post.liked ? "currentColor" : "none"}/> {post.likes.toLocaleString()}
                  </button>
                  <button className="post-action"><MessageCircle size={17}/> {post.comments} comments</button>
                  <button className="post-action share-action"><Share2 size={16}/> Share</button>
                  <button
                    className={`post-action bookmark-action ${saved.includes(post.id) ? "saved" : ""}`}
                    onClick={() => setSaved(current => current.includes(post.id) ? current.filter(id => id !== post.id) : [...current, post.id])}
                    aria-label="Save post"
                  ><Bookmark size={17} fill={saved.includes(post.id) ? "currentColor" : "none"}/></button>
                </div>
              </article>
            ))}
            {filteredPosts.length === 0 && <div className="empty-state"><Search size={30}/><h3>No discussions found</h3><p>Try another search term.</p></div>}
          </div>
          <div className="feed-end"><span/> YOU&apos;RE ALL CAUGHT UP <span/></div>
        </section>

        <aside className="right-panel">
          <div className="panel-card stats-card">
            <div className="panel-title"><span>YOUR SNAPSHOT</span><Sparkles size={16}/></div>
            <div className="stats-grid">
              <div><strong>2.4K</strong><span>XP EARNED</span></div>
              <div><strong>{joined.length}</strong><span>COMMUNITIES</span></div>
            </div>
            <div className="level-row"><span>LEVEL 08</span><span>2,400 / 3,000 XP</span></div>
            <div className="progress-track"><div/></div>
          </div>

          <div className="panel-card">
            <div className="panel-title"><span><Flame size={15}/> TRENDING GAMES</span><button onClick={() => setActiveNav("Discover")}>View all</button></div>
            <div className="trending-game">
              <img src="https://images.unsplash.com/photo-1542751371-adc38448a05e?w=120&q=80" alt="Valorant"/>
              <div><strong>VALORANT</strong><span>Competitive · 12.4K online</span></div>
              <span className="trend-up">↗ 12%</span>
            </div>
            <div className="trending-game">
              <img src="https://images.unsplash.com/photo-1511512578047-dfb367046420?w=120&q=80" alt="Minecraft"/>
              <div><strong>Minecraft</strong><span>Sandbox · 8.2K online</span></div>
              <span className="trend-up">↗ 8%</span>
            </div>
            <div className="trending-game">
              <img src="https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=120&q=80" alt="Gaming"/>
              <div><strong>GTA VI</strong><span>Adventure · 6.8K online</span></div>
              <span className="trend-up">↗ 24%</span>
            </div>
          </div>

          <div className="panel-card">
            <div className="panel-title"><span><Users size={15}/> POPULAR COMMUNITIES</span></div>
            {communities.map(c => (
              <div className="popular-community" key={c.name}>
                <div className="popular-icon" style={{background: c.color}}>{c.icon}</div>
                <div className="popular-info"><strong>{c.name}</strong><span>{c.members} members</span></div>
                <button className={joined.includes(c.name) ? "joined-button" : "join-button"} onClick={() => toggleJoin(c.name)}>
                  {joined.includes(c.name) ? "Joined" : "Join"}
                </button>
              </div>
            ))}
          </div>

          <div className="panel-card event-card">
            <div className="panel-title"><span><Trophy size={15}/> UPCOMING EVENT</span><span className="event-live">SOON</span></div>
            <div className="event-art">
              <img src="https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&q=80" alt="Gaming tournament"/>
              <div className="event-overlay"><Trophy size={25}/><span>COMMUNITY TOURNAMENT</span></div>
            </div>
            <h3>GameSphere Showdown</h3>
            <p>Compete. Connect. Conquer.</p>
            <div className="event-info"><CalendarDays size={14}/> Nov 15, 2026 <span>·</span> Online</div>
            <button className="event-button" onClick={() => setActiveNav("Events")}>Explore event <ChevronRight size={15}/></button>
          </div>

          <div className="right-footer">ABOUT · GUIDELINES · PRIVACY · TERMS<br/><br/>MADE FOR PLAYERS, BY PLAYERS. <span>✦</span></div>
        </aside>
      </div>
    </main>
  );
}
