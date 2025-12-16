import { useState } from "react";
import { Grid, List, Users, UserCheck, Calendar, Edit3 } from "lucide-react";
import Header from "@/components/Header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Sample user data
const userData = {
  name: "芭蕉",
  username: "@basho",
  avatar: "/placeholder.svg",
  bio: "俳句の道を歩む旅人。自然と四季の美しさを詠む。",
  location: "江戸",
  website: "haiku-no-michi.jp",
  joinedDate: "2024年1月",
  postsCount: 42,
  followersCount: 1234,
  followingCount: 567,
};

// Sample friends
const friends = [
  { id: 1, name: "蕪村", avatar: "/placeholder.svg" },
  { id: 2, name: "一茶", avatar: "/placeholder.svg" },
  { id: 3, name: "正岡子規", avatar: "/placeholder.svg" },
  { id: 4, name: "与謝野晶子", avatar: "/placeholder.svg" },
  { id: 5, name: "種田山頭火", avatar: "/placeholder.svg" },
];

// Sample followers
const followers = [
  { id: 1, name: "夏目漱石", avatar: "/placeholder.svg" },
  { id: 2, name: "川端康成", avatar: "/placeholder.svg" },
  { id: 3, name: "太宰治", avatar: "/placeholder.svg" },
  { id: 4, name: "芥川龍之介", avatar: "/placeholder.svg" },
];

// Sample posts with dates
const userPosts = [
  {
    id: 1,
    lines: ["古池や", "蛙飛び込む", "水の音"],
    image: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=400",
    createdAt: "2024年3月15日",
    editedAt: null,
    likes: 156,
    comments: 23,
  },
  {
    id: 2,
    lines: ["夏草や", "兵どもが", "夢の跡"],
    image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=400",
    createdAt: "2024年3月10日",
    editedAt: "2024年3月12日",
    likes: 89,
    comments: 12,
  },
  {
    id: 3,
    lines: ["閑さや", "岩にしみ入る", "蝉の声"],
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400",
    createdAt: "2024年3月5日",
    editedAt: null,
    likes: 234,
    comments: 45,
  },
  {
    id: 4,
    lines: ["荒海や", "佐渡によこたふ", "天の河"],
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    createdAt: "2024年2月28日",
    editedAt: null,
    likes: 178,
    comments: 31,
  },
];

const Profile = () => {
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Sidebar - Friends & Followers */}
          <aside className="lg:w-64 space-y-6">
            {/* Friends */}
            <div className="haiku-card p-4">
              <div className="flex items-center gap-2 mb-4">
                <Users className="w-5 h-5 text-primary" />
                <h3 className="font-serif font-medium">友達</h3>
                <span className="text-sm text-muted-foreground">({friends.length})</span>
              </div>
              <div className="space-y-3">
                {friends.map((friend) => (
                  <div key={friend.id} className="flex items-center gap-3">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={friend.avatar} />
                      <AvatarFallback className="bg-secondary text-xs">
                        {friend.name[0]}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm">{friend.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Followers */}
            <div className="haiku-card p-4">
              <div className="flex items-center gap-2 mb-4">
                <UserCheck className="w-5 h-5 text-primary" />
                <h3 className="font-serif font-medium">フォロワー</h3>
                <span className="text-sm text-muted-foreground">({followers.length})</span>
              </div>
              <div className="space-y-3">
                {followers.map((follower) => (
                  <div key={follower.id} className="flex items-center gap-3">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={follower.avatar} />
                      <AvatarFallback className="bg-secondary text-xs">
                        {follower.name[0]}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm">{follower.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </aside>

          {/* Main Content - Posts */}
          <div className="flex-1">
            {/* View Mode Toggle */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-xl font-medium">投稿一覧</h2>
              <div className="flex items-center gap-2 bg-secondary rounded-lg p-1">
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="px-3"
                >
                  <List className="w-4 h-4 mr-1" />
                  リスト
                </Button>
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="px-3"
                >
                  <Grid className="w-4 h-4 mr-1" />
                  グリッド
                </Button>
              </div>
            </div>

            {/* Posts */}
            <div className={viewMode === "grid" 
              ? "grid grid-cols-1 sm:grid-cols-2 gap-4" 
              : "space-y-4"
            }>
              {userPosts.map((post) => (
                <div key={post.id} className="haiku-card overflow-hidden">
                  {viewMode === "grid" ? (
                    // Grid View
                    <div>
                      <div className="aspect-square relative">
                        <img
                          src={post.image}
                          alt="Haiku"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-4 right-4 haiku-vertical text-white text-shadow">
                          {post.lines.map((line, i) => (
                            <p key={i} className="text-lg">{line}</p>
                          ))}
                        </div>
                      </div>
                      <div className="p-3 flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {post.createdAt}
                        </div>
                        {post.editedAt && (
                          <div className="flex items-center gap-1">
                            <Edit3 className="w-3 h-3" />
                            編集済
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    // List View
                    <div className="flex">
                      <div className="w-32 h-32 flex-shrink-0">
                        <img
                          src={post.image}
                          alt="Haiku"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 p-4 flex flex-col justify-between">
                        <div className="haiku-vertical h-20">
                          {post.lines.map((line, i) => (
                            <p key={i} className="text-base">{line}</p>
                          ))}
                        </div>
                        <div className="flex items-center justify-between text-sm text-muted-foreground mt-2">
                          <div className="flex items-center gap-4">
                            <span>♥ {post.likes}</span>
                            <span>💬 {post.comments}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-3 h-3" />
                            <span>{post.createdAt}</span>
                            {post.editedAt && (
                              <span className="flex items-center gap-1">
                                <Edit3 className="w-3 h-3" />
                                {post.editedAt}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right Sidebar - Personal Info */}
          <aside className="lg:w-72">
            <div className="haiku-card p-6 sticky top-24">
              <div className="text-center mb-6">
                <Avatar className="w-24 h-24 mx-auto mb-4 border-4 border-primary/20">
                  <AvatarImage src={userData.avatar} />
                  <AvatarFallback className="bg-secondary text-2xl">
                    {userData.name[0]}
                  </AvatarFallback>
                </Avatar>
                <h2 className="font-serif text-xl font-medium">{userData.name}</h2>
                <p className="text-muted-foreground text-sm">{userData.username}</p>
              </div>

              <p className="text-sm text-center mb-6 leading-relaxed">
                {userData.bio}
              </p>

              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <span>📍</span>
                  <span>{userData.location}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <span>🔗</span>
                  <a href="#" className="text-primary hover:underline">
                    {userData.website}
                  </a>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span>{userData.joinedDate}から利用</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-border text-center">
                <div>
                  <p className="font-serif font-bold text-lg">{userData.postsCount}</p>
                  <p className="text-xs text-muted-foreground">投稿</p>
                </div>
                <div>
                  <p className="font-serif font-bold text-lg">{userData.followersCount}</p>
                  <p className="text-xs text-muted-foreground">フォロワー</p>
                </div>
                <div>
                  <p className="font-serif font-bold text-lg">{userData.followingCount}</p>
                  <p className="text-xs text-muted-foreground">フォロー中</p>
                </div>
              </div>

              <Button className="w-full mt-6" variant="outline">
                プロフィールを編集
              </Button>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default Profile;
