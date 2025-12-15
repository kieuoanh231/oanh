import { Home, Compass, Bookmark, Clock, TrendingUp, Hash } from "lucide-react";

const navItems = [
  { icon: Home, label: "ホーム", active: true },
  { icon: Compass, label: "発見" },
  { icon: TrendingUp, label: "トレンド" },
  { icon: Bookmark, label: "保存済み" },
  { icon: Clock, label: "履歴" },
];

const trendingTopics = [
  { tag: "#春の句", count: "2.4K" },
  { tag: "#桜", count: "1.8K" },
  { tag: "#朝露", count: "956" },
  { tag: "#月夜", count: "723" },
];

const Sidebar = () => {
  return (
    <aside className="hidden lg:block w-64 flex-shrink-0">
      <div className="sticky top-20 space-y-6">
        {/* Navigation */}
        <nav className="bg-card rounded-lg p-3 shadow-sm">
          {navItems.map((item) => (
            <button
              key={item.label}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-colors ${
                item.active
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Trending Topics */}
        <div className="bg-card rounded-lg p-4 shadow-sm">
          <h3 className="font-medium text-sm mb-3 flex items-center gap-2">
            <Hash className="w-4 h-4 text-primary" />
            トレンド
          </h3>
          <div className="space-y-2">
            {trendingTopics.map((topic) => (
              <button
                key={topic.tag}
                className="w-full flex items-center justify-between py-2 px-2 rounded-md text-sm hover:bg-secondary transition-colors"
              >
                <span className="text-foreground">{topic.tag}</span>
                <span className="text-xs text-muted-foreground">{topic.count}件</span>
              </button>
            ))}
          </div>
        </div>

        {/* Seasonal Note */}
        <div className="bg-gradient-to-br from-sakura/30 to-accent/30 rounded-lg p-4">
          <p className="text-xs text-muted-foreground mb-1">今の季語</p>
          <p className="font-serif text-lg">桜・春風・霞</p>
          <p className="text-xs text-muted-foreground mt-2">
            春の季語を使って俳句を詠んでみましょう
          </p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
