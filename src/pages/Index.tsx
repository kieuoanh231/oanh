import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import HaikuFeed from "@/components/HaikuFeed";
import avatarShiki from "@/assets/avatar-shiki.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex gap-6">
          <Sidebar />
          <HaikuFeed />
          
          {/* Right Sidebar - Suggested Users */}
          <aside className="hidden xl:block w-64 flex-shrink-0">
            <div className="sticky top-20">
              <div className="bg-card rounded-lg p-4 shadow-sm">
                <h3 className="font-medium text-sm mb-4">おすすめの俳人</h3>
                <div className="space-y-4">
                  {[
                    { name: "正岡子規", handle: "@shiki", avatar: avatarShiki },
                    { name: "高浜虚子", handle: "@kyoshi", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop" },
                    { name: "山口誓子", handle: "@seishi", avatar: "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?w=100&h=100&fit=crop" },
                  ].map((user) => (
                    <div key={user.handle} className="flex items-center gap-3">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{user.name}</p>
                        <p className="text-xs text-muted-foreground">{user.handle}</p>
                      </div>
                      <button className="px-3 py-1 text-xs font-medium border border-primary text-primary rounded-full hover:bg-primary hover:text-primary-foreground transition-colors">
                        フォロー
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tip of the day */}
              <div className="mt-4 bg-card rounded-lg p-4 shadow-sm">
                <p className="text-xs text-muted-foreground mb-2">💡 俳句のヒント</p>
                <p className="text-sm leading-relaxed">
                  俳句は「5・7・5」の17音で構成されます。季語を入れることで、季節の情景をより深く表現できます。
                </p>
              </div>

              {/* Footer links */}
              <div className="mt-4 text-xs text-muted-foreground space-x-3">
                <a href="#" className="hover:underline">利用規約</a>
                <a href="#" className="hover:underline">プライバシー</a>
                <a href="#" className="hover:underline">ヘルプ</a>
              </div>
              <p className="text-xs text-muted-foreground mt-2">© 2024 俳句の庭</p>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default Index;
