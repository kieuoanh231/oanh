import { useState } from "react";
import { TrendingUp, Heart, MessageCircle, Eye, Trophy, Medal, Award, Flame, ArrowUp, ArrowDown, Minus } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import avatarShiki from "@/assets/avatar-shiki.jpg";

type Period = "day" | "week" | "month";

interface RankedHaiku {
  id: number;
  rank: number;
  prevRank: number;
  haiku: [string, string, string];
  author: string;
  username: string;
  avatar: string;
  likes: number;
  comments: number;
  views: number;
  image: string;
  hashtag: string;
}

const dataByPeriod: Record<Period, RankedHaiku[]> = {
  day: [
    { id: 1, rank: 1, prevRank: 3, haiku: ["古池や", "蛙飛び込む", "水の音"], author: "松尾芭蕉", username: "@basho", avatar: avatarShiki, likes: 4823, comments: 312, views: 24500, image: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=600", hashtag: "#古池" },
    { id: 2, rank: 2, prevRank: 1, haiku: ["菜の花や", "月は東に", "日は西に"], author: "与謝蕪村", username: "@buson", avatar: avatarShiki, likes: 3912, comments: 245, views: 19800, image: "https://images.unsplash.com/photo-1462275646964-a0e3571f4f4f?w=600", hashtag: "#菜の花" },
    { id: 3, rank: 3, prevRank: 5, haiku: ["閑さや", "岩にしみ入る", "蝉の声"], author: "松尾芭蕉", username: "@basho", avatar: avatarShiki, likes: 3456, comments: 198, views: 17200, image: "https://images.unsplash.com/photo-1528164344705-47542687000d?w=600", hashtag: "#蝉時雨" },
    { id: 4, rank: 4, prevRank: 4, haiku: ["春の海", "終日のたり", "のたりかな"], author: "与謝蕪村", username: "@buson", avatar: avatarShiki, likes: 2987, comments: 167, views: 14500, image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600", hashtag: "#春の海" },
    { id: 5, rank: 5, prevRank: 2, haiku: ["柿くへば", "鐘が鳴るなり", "法隆寺"], author: "正岡子規", username: "@shiki", avatar: avatarShiki, likes: 2654, comments: 145, views: 13200, image: "https://images.unsplash.com/photo-1507783548227-544c3b8fc065?w=600", hashtag: "#秋" },
    { id: 6, rank: 6, prevRank: 8, haiku: ["雀の子", "そこのけそこのけ", "お馬が通る"], author: "小林一茶", username: "@issa", avatar: avatarShiki, likes: 2341, comments: 132, views: 11800, image: "https://images.unsplash.com/photo-1444464666168-49d633b86797?w=600", hashtag: "#雀" },
    { id: 7, rank: 7, prevRank: 6, haiku: ["五月雨を", "あつめて早し", "最上川"], author: "松尾芭蕉", username: "@basho", avatar: avatarShiki, likes: 2156, comments: 121, views: 10500, image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600", hashtag: "#五月雨" },
    { id: 8, rank: 8, prevRank: 7, haiku: ["朝顔に", "つるべ取られて", "もらひ水"], author: "加賀千代女", username: "@chiyojo", avatar: avatarShiki, likes: 1987, comments: 108, views: 9800, image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=600", hashtag: "#朝顔" },
  ],
  week: [
    { id: 1, rank: 1, prevRank: 1, haiku: ["菜の花や", "月は東に", "日は西に"], author: "与謝蕪村", username: "@buson", avatar: avatarShiki, likes: 28456, comments: 1823, views: 142000, image: "https://images.unsplash.com/photo-1462275646964-a0e3571f4f4f?w=600", hashtag: "#菜の花" },
    { id: 2, rank: 2, prevRank: 4, haiku: ["古池や", "蛙飛び込む", "水の音"], author: "松尾芭蕉", username: "@basho", avatar: avatarShiki, likes: 25123, comments: 1654, views: 128000, image: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=600", hashtag: "#古池" },
    { id: 3, rank: 3, prevRank: 2, haiku: ["柿くへば", "鐘が鳴るなり", "法隆寺"], author: "正岡子規", username: "@shiki", avatar: avatarShiki, likes: 21345, comments: 1432, views: 108000, image: "https://images.unsplash.com/photo-1507783548227-544c3b8fc065?w=600", hashtag: "#秋" },
    { id: 4, rank: 4, prevRank: 3, haiku: ["春の海", "終日のたり", "のたりかな"], author: "与謝蕪村", username: "@buson", avatar: avatarShiki, likes: 19876, comments: 1234, views: 98000, image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600", hashtag: "#春の海" },
    { id: 5, rank: 5, prevRank: 6, haiku: ["閑さや", "岩にしみ入る", "蝉の声"], author: "松尾芭蕉", username: "@basho", avatar: avatarShiki, likes: 17654, comments: 1098, views: 87000, image: "https://images.unsplash.com/photo-1528164344705-47542687000d?w=600", hashtag: "#蝉時雨" },
    { id: 6, rank: 6, prevRank: 5, haiku: ["朝顔に", "つるべ取られて", "もらひ水"], author: "加賀千代女", username: "@chiyojo", avatar: avatarShiki, likes: 15432, comments: 945, views: 76000, image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=600", hashtag: "#朝顔" },
    { id: 7, rank: 7, prevRank: 7, haiku: ["雀の子", "そこのけそこのけ", "お馬が通る"], author: "小林一茶", username: "@issa", avatar: avatarShiki, likes: 13876, comments: 823, views: 67000, image: "https://images.unsplash.com/photo-1444464666168-49d633b86797?w=600", hashtag: "#雀" },
    { id: 8, rank: 8, prevRank: 9, haiku: ["五月雨を", "あつめて早し", "最上川"], author: "松尾芭蕉", username: "@basho", avatar: avatarShiki, likes: 12345, comments: 712, views: 58000, image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600", hashtag: "#五月雨" },
  ],
  month: [
    { id: 1, rank: 1, prevRank: 2, haiku: ["古池や", "蛙飛び込む", "水の音"], author: "松尾芭蕉", username: "@basho", avatar: avatarShiki, likes: 124500, comments: 8234, views: 612000, image: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=600", hashtag: "#古池" },
    { id: 2, rank: 2, prevRank: 1, haiku: ["柿くへば", "鐘が鳴るなり", "法隆寺"], author: "正岡子規", username: "@shiki", avatar: avatarShiki, likes: 112345, comments: 7654, views: 567000, image: "https://images.unsplash.com/photo-1507783548227-544c3b8fc065?w=600", hashtag: "#秋" },
    { id: 3, rank: 3, prevRank: 3, haiku: ["菜の花や", "月は東に", "日は西に"], author: "与謝蕪村", username: "@buson", avatar: avatarShiki, likes: 98765, comments: 6543, views: 489000, image: "https://images.unsplash.com/photo-1462275646964-a0e3571f4f4f?w=600", hashtag: "#菜の花" },
    { id: 4, rank: 4, prevRank: 7, haiku: ["閑さや", "岩にしみ入る", "蝉の声"], author: "松尾芭蕉", username: "@basho", avatar: avatarShiki, likes: 87654, comments: 5432, views: 432000, image: "https://images.unsplash.com/photo-1528164344705-47542687000d?w=600", hashtag: "#蝉時雨" },
    { id: 5, rank: 5, prevRank: 4, haiku: ["春の海", "終日のたり", "のたりかな"], author: "与謝蕪村", username: "@buson", avatar: avatarShiki, likes: 76543, comments: 4567, views: 378000, image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600", hashtag: "#春の海" },
    { id: 6, rank: 6, prevRank: 5, haiku: ["朝顔に", "つるべ取られて", "もらひ水"], author: "加賀千代女", username: "@chiyojo", avatar: avatarShiki, likes: 67890, comments: 3987, views: 332000, image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=600", hashtag: "#朝顔" },
    { id: 7, rank: 7, prevRank: 6, haiku: ["雀の子", "そこのけそこのけ", "お馬が通る"], author: "小林一茶", username: "@issa", avatar: avatarShiki, likes: 58765, comments: 3456, views: 287000, image: "https://images.unsplash.com/photo-1444464666168-49d633b86797?w=600", hashtag: "#雀" },
    { id: 8, rank: 8, prevRank: 8, haiku: ["五月雨を", "あつめて早し", "最上川"], author: "松尾芭蕉", username: "@basho", avatar: avatarShiki, likes: 49876, comments: 2876, views: 245000, image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600", hashtag: "#五月雨" },
  ],
};

const periodLabels: Record<Period, { jp: string; sub: string }> = {
  day: { jp: "今日", sub: "過去24時間" },
  week: { jp: "今週", sub: "過去7日間" },
  month: { jp: "今月", sub: "過去30日間" },
};

const RankBadge = ({ rank }: { rank: number }) => {
  if (rank === 1) {
    return (
      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center shadow-lg shadow-yellow-500/30">
        <Trophy className="w-6 h-6 text-white" />
      </div>
    );
  }
  if (rank === 2) {
    return (
      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-slate-300 to-slate-500 flex items-center justify-center shadow-lg shadow-slate-400/30">
        <Medal className="w-6 h-6 text-white" />
      </div>
    );
  }
  if (rank === 3) {
    return (
      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-orange-700 flex items-center justify-center shadow-lg shadow-orange-500/30">
        <Award className="w-6 h-6 text-white" />
      </div>
    );
  }
  return (
    <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
      <span className="text-lg font-bold text-muted-foreground">{rank}</span>
    </div>
  );
};

const RankChange = ({ current, previous }: { current: number; previous: number }) => {
  const diff = previous - current;
  if (diff > 0) {
    return (
      <span className="inline-flex items-center gap-0.5 text-xs text-green-600 font-medium">
        <ArrowUp className="w-3 h-3" />
        {diff}
      </span>
    );
  }
  if (diff < 0) {
    return (
      <span className="inline-flex items-center gap-0.5 text-xs text-primary font-medium">
        <ArrowDown className="w-3 h-3" />
        {Math.abs(diff)}
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-0.5 text-xs text-muted-foreground">
      <Minus className="w-3 h-3" />
    </span>
  );
};

const Trending = () => {
  const [period, setPeriod] = useState<Period>("day");
  const data = dataByPeriod[period];
  const top3 = data.slice(0, 3);
  const rest = data.slice(3);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="max-w-7xl mx-auto px-4 pt-20 pb-8">
        <div className="flex gap-6">
          <Sidebar />

          <main className="flex-1 max-w-4xl">
            {/* Hero */}
            <div className="relative bg-gradient-to-br from-primary/15 via-gold/10 to-sakura/20 rounded-2xl p-8 mb-8 overflow-hidden">
              <div className="absolute -top-8 -right-8 opacity-10">
                <Flame className="w-48 h-48 text-primary" />
              </div>
              <div className="relative">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  <span className="text-sm font-medium text-primary uppercase tracking-wider">Ranking</span>
                </div>
                <h1
                  className="text-4xl md:text-5xl font-bold mb-3"
                  style={{ fontFamily: '"Yuji Syuku", "Noto Serif JP", serif' }}
                >
                  トレンド
                </h1>
                <p className="text-muted-foreground">
                  人気の俳句ランキング・最も読まれた句を見つけよう
                </p>
              </div>
            </div>

            {/* Period selector */}
            <Tabs value={period} onValueChange={(v) => setPeriod(v as Period)} className="space-y-6">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <TabsList className="bg-card p-1 h-auto shadow-sm">
                  <TabsTrigger value="day" className="gap-2 px-5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                    日間
                  </TabsTrigger>
                  <TabsTrigger value="week" className="gap-2 px-5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                    週間
                  </TabsTrigger>
                  <TabsTrigger value="month" className="gap-2 px-5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                    月間
                  </TabsTrigger>
                </TabsList>
                <div className="text-sm text-muted-foreground">
                  <span style={{ fontFamily: '"Yuji Syuku", serif' }}>{periodLabels[period].jp}</span>
                  <span className="mx-2">·</span>
                  <span>{periodLabels[period].sub}</span>
                </div>
              </div>

              <TabsContent value={period} className="space-y-8 mt-6">
                {/* Top 3 podium */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {top3.map((item) => (
                    <div
                      key={item.id}
                      className={`group relative bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-lg transition-all ${
                        item.rank === 1 ? "md:order-2 md:-translate-y-4 ring-2 ring-yellow-400/50" : item.rank === 2 ? "md:order-1" : "md:order-3"
                      }`}
                    >
                      <div className="relative aspect-square overflow-hidden">
                        <img
                          src={item.image}
                          alt=""
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                        <div className="absolute top-4 left-4">
                          <RankBadge rank={item.rank} />
                        </div>

                        <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm px-2 py-1 rounded-full">
                          <RankChange current={item.rank} previous={item.prevRank} />
                        </div>

                        <div className="absolute bottom-4 right-4 flex gap-1.5">
                          {item.haiku.map((line, i) => (
                            <p
                              key={i}
                              className="text-white text-base tracking-widest"
                              style={{
                                writingMode: "vertical-rl",
                                fontFamily: '"Yuji Syuku", serif',
                                textShadow: "1px 1px 6px rgba(0,0,0,0.9)",
                              }}
                            >
                              {line}
                            </p>
                          ))}
                        </div>
                      </div>

                      <div className="p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <img src={item.avatar} alt={item.author} className="w-8 h-8 rounded-full object-cover ring-1 ring-primary/20" />
                          <div className="min-w-0">
                            <p className="text-sm font-medium truncate" style={{ fontFamily: '"Yuji Syuku", serif' }}>{item.author}</p>
                            <p className="text-xs text-muted-foreground truncate">{item.username}</p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span className="flex items-center gap-1"><Heart className="w-3.5 h-3.5" />{(item.likes / 1000).toFixed(1)}K</span>
                          <span className="flex items-center gap-1"><MessageCircle className="w-3.5 h-3.5" />{item.comments}</span>
                          <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" />{(item.views / 1000).toFixed(1)}K</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Ranking list */}
                <div className="bg-card rounded-2xl shadow-sm overflow-hidden">
                  <div className="px-6 py-4 border-b border-border flex items-center justify-between">
                    <h2 className="font-medium flex items-center gap-2" style={{ fontFamily: '"Yuji Syuku", serif' }}>
                      <Flame className="w-4 h-4 text-primary" />
                      ランキング 4位 - {data.length}位
                    </h2>
                    <span className="text-xs text-muted-foreground">変動 / 24h</span>
                  </div>

                  <div className="divide-y divide-border">
                    {rest.map((item) => (
                      <div
                        key={item.id}
                        className="group px-6 py-4 flex items-center gap-4 hover:bg-secondary/40 transition-colors cursor-pointer"
                      >
                        {/* Rank */}
                        <div className="flex flex-col items-center gap-1 w-10">
                          <span className="text-xl font-bold text-muted-foreground tabular-nums">
                            {item.rank}
                          </span>
                          <RankChange current={item.rank} previous={item.prevRank} />
                        </div>

                        {/* Image */}
                        <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                          <img src={item.image} alt="" className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-black/30" />
                          <div className="absolute inset-0 flex items-center justify-center gap-0.5">
                            {item.haiku.map((line, i) => (
                              <p
                                key={i}
                                className="text-white text-[8px] tracking-wider"
                                style={{ writingMode: "vertical-rl", fontFamily: '"Yuji Syuku", serif' }}
                              >
                                {line}
                              </p>
                            ))}
                          </div>
                        </div>

                        {/* Haiku */}
                        <div className="flex-1 min-w-0">
                          <p
                            className="text-base mb-1 truncate group-hover:text-primary transition-colors"
                            style={{ fontFamily: '"Yuji Syuku", serif' }}
                          >
                            {item.haiku.join(" / ")}
                          </p>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <img src={item.avatar} alt="" className="w-4 h-4 rounded-full object-cover" />
                            <span>{item.author}</span>
                            <span>·</span>
                            <span className="text-primary">{item.hashtag}</span>
                          </div>
                        </div>

                        {/* Stats */}
                        <div className="hidden sm:flex items-center gap-5 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Heart className="w-3.5 h-3.5" />
                            {item.likes.toLocaleString()}
                          </span>
                          <span className="flex items-center gap-1">
                            <MessageCircle className="w-3.5 h-3.5" />
                            {item.comments}
                          </span>
                          <span className="flex items-center gap-1">
                            <Eye className="w-3.5 h-3.5" />
                            {(item.views / 1000).toFixed(1)}K
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button className="w-full py-4 text-sm text-primary hover:bg-secondary/40 transition-colors border-t border-border">
                    もっと見る →
                  </button>
                </div>

                {/* Stats summary */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-gradient-to-br from-primary/10 to-transparent rounded-xl p-4 text-center">
                    <p className="text-2xl font-bold text-primary">{data.reduce((s, i) => s + i.likes, 0).toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground mt-1">総いいね</p>
                  </div>
                  <div className="bg-gradient-to-br from-accent/30 to-transparent rounded-xl p-4 text-center">
                    <p className="text-2xl font-bold text-accent-foreground">{data.reduce((s, i) => s + i.comments, 0).toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground mt-1">総コメント</p>
                  </div>
                  <div className="bg-gradient-to-br from-sakura/40 to-transparent rounded-xl p-4 text-center">
                    <p className="text-2xl font-bold text-foreground">{(data.reduce((s, i) => s + i.views, 0) / 1000).toFixed(1)}K</p>
                    <p className="text-xs text-muted-foreground mt-1">総閲覧</p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Trending;
