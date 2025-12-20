import { Search, Bell, PenLine, User, LogIn, UserPlus, LogOut, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import CreatePostDialog from "./CreatePostDialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";

// Sample notifications
const notifications = [
  {
    id: 1,
    type: "like",
    user: "蕪村",
    avatar: "蕪",
    content: "があなたの俳句にいいねしました",
    haiku: "古池や蛙飛び込む水の音",
    time: "5分前",
    read: false,
  },
  {
    id: 2,
    type: "comment",
    user: "一茶",
    avatar: "一",
    content: "があなたの俳句にコメントしました",
    comment: "素晴らしい情景ですね！",
    time: "15分前",
    read: false,
  },
  {
    id: 3,
    type: "follow",
    user: "正岡子規",
    avatar: "正",
    content: "があなたをフォローしました",
    time: "1時間前",
    read: false,
  },
  {
    id: 4,
    type: "like",
    user: "与謝野晶子",
    avatar: "与",
    content: "があなたの俳句にいいねしました",
    haiku: "夏草や兵どもが夢の跡",
    time: "2時間前",
    read: true,
  },
  {
    id: 5,
    type: "feature",
    user: "運営",
    avatar: "✨",
    content: "あなたの俳句が注目の俳句に選ばれました！",
    haiku: "閑さや岩にしみ入る蝉の声",
    time: "1日前",
    read: true,
  },
];


const Header = () => {
  const navigate = useNavigate();
  const [notificationOpen, setNotificationOpen] = useState(false);
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-md border-b border-border">
      <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="hanko-stamp">俳</div>
          <h1 className="font-serif text-xl font-medium tracking-wide cursor-pointer" onClick={() => navigate("/")}>映え句</h1>
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
          
          {/* Notifications Popover */}
          <Popover open={notificationOpen} onOpenChange={setNotificationOpen}>
            <PopoverTrigger asChild>
              <button className="relative p-2.5 rounded-full hover:bg-secondary transition-colors">
                <Bell className="w-5 h-5 text-muted-foreground" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-primary text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>
            </PopoverTrigger>
            <PopoverContent 
              className="w-80 p-0 bg-card border-border shadow-xl" 
              align="end"
              sideOffset={8}
            >
              {/* Header */}
              <div className="px-4 py-3 border-b border-border flex items-center justify-between">
                <h3 className="font-serif font-medium text-sm">通知</h3>
                <button className="text-xs text-primary hover:underline">
                  すべて既読にする
                </button>
              </div>
              
              {/* Notifications List */}
              <ScrollArea className="h-[360px]">
                <div className="divide-y divide-border">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`px-4 py-3 hover:bg-secondary/50 transition-colors cursor-pointer ${
                        !notification.read ? "bg-primary/5" : ""
                      }`}
                    >
                      <div className="flex gap-3">
                        {/* Avatar */}
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-sm font-medium">
                          {notification.avatar}
                        </div>
                        
                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start gap-2">
                            <div className="flex-1">
                              <p className="text-sm">
                                <span className="font-medium">{notification.user}</span>
                                <span className="text-muted-foreground">{notification.content}</span>
                              </p>
                              
                              {/* Haiku or Comment preview */}
                              {notification.haiku && (
                                <p className="mt-1 text-xs text-muted-foreground bg-secondary/50 px-2 py-1 rounded-md truncate">
                                  「{notification.haiku}」
                                </p>
                              )}
                              {notification.comment && (
                                <p className="mt-1 text-xs text-muted-foreground bg-secondary/50 px-2 py-1 rounded-md truncate">
                                  "{notification.comment}"
                                </p>
                              )}
                            </div>
                            
                          </div>
                          
                          {/* Time */}
                          <p className="mt-1 text-[10px] text-muted-foreground">
                            {notification.time}
                          </p>
                        </div>
                        
                        {/* Unread indicator */}
                        {!notification.read && (
                          <div className="flex-shrink-0 w-2 h-2 rounded-full bg-primary mt-2" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
              
              {/* Footer */}
              <div className="px-4 py-3 border-t border-border">
                <button className="w-full text-center text-xs text-primary hover:underline">
                  すべての通知を見る
                </button>
              </div>
            </PopoverContent>
          </Popover>
          
          <CreatePostDialog
            trigger={
              <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-full text-sm font-medium hover:opacity-90 transition-opacity">
                <PenLine className="w-4 h-4" />
                <span className="hidden sm:inline">投稿</span>
              </button>
            }
          />
          
          {/* User Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors">
                <User className="w-5 h-5 text-muted-foreground" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 bg-card border-border">
              <DropdownMenuItem className="cursor-pointer">
                <LogIn className="w-4 h-4 mr-2" />
                ログイン
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <UserPlus className="w-4 h-4 mr-2" />
                新規登録
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer" onClick={() => navigate("/profile")}>
                <User className="w-4 h-4 mr-2" />
                マイページ
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <Settings className="w-4 h-4 mr-2" />
                設定
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer text-destructive">
                <LogOut className="w-4 h-4 mr-2" />
                ログアウト
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;