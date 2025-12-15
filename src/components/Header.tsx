import { Search, Bell, PenLine, User } from "lucide-react";
const Header = () => {
  return <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-md border-b border-border">
      <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="hanko-stamp">俳</div>
          <h1 className="font-serif text-xl font-medium tracking-wide">映え句</h1>
        </div>

        {/* Search */}
        <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input type="text" placeholder="俳句を検索..." className="input-comment pl-10" />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button className="p-2.5 rounded-full hover:bg-secondary transition-colors md:hidden">
            <Search className="w-5 h-5 text-muted-foreground" />
          </button>
          <button className="p-2.5 rounded-full hover:bg-secondary transition-colors">
            <Bell className="w-5 h-5 text-muted-foreground" />
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-full text-sm font-medium hover:opacity-90 transition-opacity">
            <PenLine className="w-4 h-4" />
            <span className="hidden sm:inline">投稿</span>
          </button>
          <button className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center">
            <User className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>
      </div>
    </header>;
};
export default Header;