import { useState } from "react";
import { Search, TrendingUp, Users, Sparkles, Hash, ChevronRight, Heart, MessageCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import avatarShiki from "@/assets/avatar-shiki.jpg";

// Featured poets data
const featuredPoets = [
  {
    id: 1,
    name: "松尾芭蕉",
    username: "@basho",
    avatar: avatarShiki,
    followers: "12.5K",
    haikus: 342,
    bio: "古池や蛙飛び込む水の音",
    isFollowing: false,
  },
  {
    id: 2,
    name: "与謝蕪村",
    username: "@buson",
    avatar: avatarShiki,
    followers: "8.2K",
    haikus: 256,
    bio: "菜の花や月は東に日は西に",
    isFollowing: true,
  },
  {
    id: 3,
    name: "小林一茶",
    username: "@issa",
    avatar: avatarShiki,
    followers: "9.8K",
    haikus: 189,
    bio: "雀の子そこのけそこのけお馬が通る",
    isFollowing: false,
  },
  {
    id: 4,
    name: "正岡子規",
    username: "@shiki",
    avatar: avatarShiki,
    followers: "7.1K",
    haikus: 421,
    bio: "柿くへば鐘が鳴るなり法隆寺",
    isFollowing: false,
  },
];

// Trending haikus
const trendingHaikus = [
  {
    id: 1,
    haiku: ["古池や", "蛙飛び込む", "水の音"],
    author: "松尾芭蕉",
    likes: 2453,
    comments: 128,
    image: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=400",
  },
  {
    id: 2,
    haiku: ["菜の花や", "月は東に", "日は西に"],
    author: "与謝蕪村",
    likes: 1876,
    comments: 94,
    image: "https://images.unsplash.com/photo-1462275646964-a0e3571f4f4f?w=400",
  },
  {
    id: 3,
    haiku: ["春の海", "終日のたり", "のたりかな"],
    author: "与謝蕪村",
    likes: 1654,
    comments: 76,
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400",
  },
  {
    id: 4,
    haiku: ["閑さや", "岩にしみ入る", "蝉の声"],
    author: "松尾芭蕉",
    likes: 1432,
    comments: 89,
    image: "https://images.unsplash.com/photo-1528164344705-47542687000d?w=400",
  },
];

// Categories/Topics
const categories = [
  { name: "春", icon: "🌸", count: "3.2K", color: "from-pink-400/20 to-rose-300/20" },
  { name: "夏", icon: "☀️", count: "2.8K", color: "from-yellow-400/20 to-orange-300/20" },
  { name: "秋", icon: "🍂", count: "2.5K", color: "from-orange-400/20 to-amber-300/20" },
  { name: "冬", icon: "❄️", count: "2.1K", color: "from-blue-400/20 to-cyan-300/20" },
  { name: "月", icon: "🌙", count: "1.9K", color: "from-indigo-400/20 to-purple-300/20" },
  { name: "花", icon: "🌺", count: "1.7K", color: "from-pink-400/20 to-fuchsia-300/20" },
  { name: "風", icon: "🍃", count: "1.4K", color: "from-green-400/20 to-emerald-300/20" },
  { name: "雨", icon: "🌧️", count: "1.2K", color: "from-slate-400/20 to-gray-300/20" },
];

// Trending tags
const trendingTags = [
  { tag: "#春の句", posts: "2,456" },
  { tag: "#桜", posts: "1,823" },
  { tag: "#朝露", posts: "956" },
  { tag: "#月夜", posts: "847" },
  { tag: "#新緑", posts: "723" },
  { tag: "#蝉時雨", posts: "612" },
];

const Discover = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [followingState, setFollowingState] = useState<Record<number, boolean>>(
    featuredPoets.reduce((acc, poet) => ({ ...acc, [poet.id]: poet.isFollowing }), {})
  );

  const toggleFollow = (poetId: number) => {
    setFollowingState(prev => ({ ...prev, [poetId]: !prev[poetId] }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 pt-20 pb-8">
        <div className="flex gap-6">
          <Sidebar />
          
          <main className="flex-1 max-w-4xl">
            {/* Hero Section */}
            <div className="bg-gradient-to-br from-primary/10 via-sakura/20 to-accent/10 rounded-2xl p-8 mb-8">
              <h1 
                className="text-3xl md:text-4xl font-bold mb-3"
                style={{ fontFamily: '"Yuji Syuku", serif' }}
              >
                発見
              </h1>
              <p className="text-muted-foreground mb-6">
                新しい俳句と俳人を見つけましょう
              </p>
              
              {/* Search Bar */}
              <div className="relative max-w-xl">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="俳句、俳人、タグを検索..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-12 text-base bg-background/80 backdrop-blur-sm border-primary/20 focus:border-primary"
                />
              </div>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="trending" className="space-y-6">
              <TabsList className="bg-card p-1 h-auto">
                <TabsTrigger value="trending" className="gap-2 data-[state=active]:bg-primary/10">
                  <TrendingUp className="w-4 h-4" />
                  トレンド
                </TabsTrigger>
                <TabsTrigger value="poets" className="gap-2 data-[state=active]:bg-primary/10">
                  <Users className="w-4 h-4" />
                  俳人
                </TabsTrigger>
                <TabsTrigger value="categories" className="gap-2 data-[state=active]:bg-primary/10">
                  <Sparkles className="w-4 h-4" />
                  カテゴリ
                </TabsTrigger>
                <TabsTrigger value="tags" className="gap-2 data-[state=active]:bg-primary/10">
                  <Hash className="w-4 h-4" />
                  タグ
                </TabsTrigger>
              </TabsList>

              {/* Trending Tab */}
              <TabsContent value="trending" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {trendingHaikus.map((item, index) => (
                    <div
                      key={item.id}
                      className="group bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer"
                    >
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <img
                          src={item.image}
                          alt=""
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                        
                        {/* Rank Badge */}
                        <div className="absolute top-3 left-3 bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                          {index + 1}
                        </div>
                        
                        {/* Haiku Text */}
                        <div className="absolute bottom-4 right-4 flex gap-1">
                          {item.haiku.map((line, i) => (
                            <p
                              key={i}
                              className="text-white text-sm tracking-widest"
                              style={{
                                writingMode: 'vertical-rl',
                                fontFamily: '"Yuji Syuku", serif',
                                textShadow: '1px 1px 4px rgba(0,0,0,0.8)',
                              }}
                            >
                              {line}
                            </p>
                          ))}
                        </div>
                      </div>
                      
                      <div className="p-4">
                        <p className="text-sm text-muted-foreground mb-2">{item.author}</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Heart className="w-4 h-4" />
                            {item.likes.toLocaleString()}
                          </span>
                          <span className="flex items-center gap-1">
                            <MessageCircle className="w-4 h-4" />
                            {item.comments}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              {/* Poets Tab */}
              <TabsContent value="poets" className="space-y-4">
                {featuredPoets.map((poet) => (
                  <div
                    key={poet.id}
                    className="bg-card rounded-xl p-4 flex items-center gap-4 hover:shadow-md transition-shadow"
                  >
                    <img
                      src={poet.avatar}
                      alt={poet.name}
                      className="w-16 h-16 rounded-full object-cover ring-2 ring-primary/20"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 
                          className="font-medium text-lg"
                          style={{ fontFamily: '"Yuji Syuku", serif' }}
                        >
                          {poet.name}
                        </h3>
                        <span className="text-sm text-muted-foreground">{poet.username}</span>
                      </div>
                      <p 
                        className="text-sm text-muted-foreground mb-2 truncate"
                        style={{ fontFamily: '"Yuji Syuku", serif' }}
                      >
                        {poet.bio}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span><strong className="text-foreground">{poet.followers}</strong> フォロワー</span>
                        <span><strong className="text-foreground">{poet.haikus}</strong> 句</span>
                      </div>
                    </div>
                    <button
                      onClick={() => toggleFollow(poet.id)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        followingState[poet.id]
                          ? "bg-secondary text-foreground hover:bg-secondary/80"
                          : "bg-primary text-primary-foreground hover:bg-primary/90"
                      }`}
                    >
                      {followingState[poet.id] ? "フォロー中" : "フォロー"}
                    </button>
                  </div>
                ))}
                
                <button className="w-full py-3 text-sm text-primary hover:text-primary/80 flex items-center justify-center gap-1 transition-colors">
                  もっと見る
                  <ChevronRight className="w-4 h-4" />
                </button>
              </TabsContent>

              {/* Categories Tab */}
              <TabsContent value="categories">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {categories.map((category) => (
                    <div
                      key={category.name}
                      className={`bg-gradient-to-br ${category.color} rounded-xl p-6 text-center cursor-pointer hover:scale-105 transition-transform`}
                    >
                      <span className="text-4xl mb-3 block">{category.icon}</span>
                      <h3 
                        className="text-xl font-medium mb-1"
                        style={{ fontFamily: '"Yuji Syuku", serif' }}
                      >
                        {category.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">{category.count} 句</p>
                    </div>
                  ))}
                </div>
              </TabsContent>

              {/* Tags Tab */}
              <TabsContent value="tags" className="space-y-3">
                {trendingTags.map((item, index) => (
                  <div
                    key={item.tag}
                    className="bg-card rounded-xl p-4 flex items-center gap-4 hover:bg-secondary/50 transition-colors cursor-pointer"
                  >
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-primary">{item.tag}</h3>
                      <p className="text-sm text-muted-foreground">{item.posts} 投稿</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </div>
                ))}
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Discover;
