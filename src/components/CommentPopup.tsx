import { useState } from "react";
import { Send, Heart, MessageCircle, Share2, Bookmark, X, ChevronDown, ChevronUp } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

interface Comment {
  id: number;
  author: {
    name: string;
    avatar: string;
  };
  text: string;
  timestamp: string;
  likes?: number;
  replies?: Comment[];
}

interface PostData {
  haiku: string[];
  image: string;
  author: {
    name: string;
    avatar: string;
    handle: string;
  };
  timestamp: string;
  explanation: string;
  likes: number;
  comments: number;
}

interface CommentPopupProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  post: PostData;
}

// More sample comments for scrolling demo
const sampleComments: Comment[] = [
  {
    id: 1,
    author: {
      name: "山田花子",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    },
    text: "美しい句ですね。情景が目に浮かびます。自然の美しさを見事に表現されていますね。",
    timestamp: "2時間前",
    likes: 5,
    replies: [
      {
        id: 11,
        author: {
          name: "田中太郎",
          avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
        },
        text: "同感です！本当に素晴らしい",
        timestamp: "1時間前",
        likes: 2,
      },
      {
        id: 12,
        author: {
          name: "高橋めぐみ",
          avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop",
        },
        text: "私もそう思います",
        timestamp: "45分前",
        likes: 1,
      },
    ],
  },
  {
    id: 2,
    author: {
      name: "鈴木一郎",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    },
    text: "季語の使い方が素晴らしいです！俳句の本質を理解されていますね。",
    timestamp: "1時間前",
    likes: 3,
  },
  {
    id: 3,
    author: {
      name: "佐藤美咲",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    },
    text: "とても心に響きました。何度も読み返しています。",
    timestamp: "30分前",
    likes: 1,
  },
  {
    id: 4,
    author: {
      name: "中村健太",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    },
    text: "この俳句を読んで、故郷を思い出しました。懐かしい気持ちになります。",
    timestamp: "25分前",
    likes: 4,
  },
  {
    id: 5,
    author: {
      name: "小林さくら",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
    },
    text: "写真との組み合わせが完璧ですね！",
    timestamp: "15分前",
    likes: 2,
  },
  {
    id: 6,
    author: {
      name: "伊藤大輔",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop",
    },
    text: "言葉の選び方が絶妙です。勉強になります。",
    timestamp: "10分前",
    likes: 1,
  },
];

const CommentPopup = ({ open, onOpenChange, post }: CommentPopupProps) => {
  const [comments, setComments] = useState(sampleComments);
  const [newComment, setNewComment] = useState("");
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [replyText, setReplyText] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: Date.now(),
      author: {
        name: "ゲスト",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
      },
      text: newComment,
      timestamp: "たった今",
      likes: 0,
    };

    setComments([comment, ...comments]);
    setNewComment("");
  };

  const handleReply = (commentId: number) => {
    if (!replyText.trim()) return;

    const reply: Comment = {
      id: Date.now(),
      author: {
        name: "ゲスト",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
      },
      text: replyText,
      timestamp: "たった今",
      likes: 0,
    };

    setComments(comments.map(c => 
      c.id === commentId 
        ? { ...c, replies: [...(c.replies || []), reply] }
        : c
    ));
    setReplyingTo(null);
    setReplyText("");
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg p-0 gap-0 bg-card border-border/50 max-h-[80vh] flex flex-col overflow-hidden rounded-2xl shadow-2xl">
        <VisuallyHidden>
          <DialogTitle>{post.author.name}の投稿</DialogTitle>
        </VisuallyHidden>
        
        {/* Custom Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border/50 bg-secondary/30 backdrop-blur-sm sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="w-9 h-9 rounded-full object-cover ring-2 ring-primary/20"
            />
            <div>
              <p className="font-medium text-sm">{post.author.name}</p>
              <p className="text-xs text-muted-foreground">{post.timestamp}</p>
            </div>
          </div>
          <button 
            onClick={() => onOpenChange(false)}
            className="p-2 rounded-full hover:bg-secondary transition-colors"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto overscroll-contain">
          {/* Post Image with Haiku - Compact */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 z-10 pointer-events-none" />
            <img
              src={post.image}
              alt="Haiku illustration"
              className="w-full aspect-[16/10] object-cover"
            />
            {/* Haiku Text Overlay */}
            <div className="absolute top-3 right-3 z-20">
              <div className="flex flex-row-reverse gap-2">
                {post.haiku.map((line, index) => (
                  <p 
                    key={index} 
                    className="text-white text-lg tracking-widest leading-relaxed"
                    style={{ 
                      writingMode: 'vertical-rl',
                      fontFamily: '"Yuji Syuku", serif',
                      textShadow: '2px 2px 6px rgba(0,0,0,0.8)'
                    }}
                  >
                    {line}
                  </p>
                ))}
              </div>
            </div>
            
            {/* Bottom gradient info */}
            <div className="absolute bottom-0 left-0 right-0 z-20 p-3">
              <button
                onClick={() => setShowExplanation(!showExplanation)}
                className="flex items-center gap-1 text-white/80 text-xs hover:text-white transition-colors"
              >
                {showExplanation ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                <span>解説を{showExplanation ? '隠す' : '見る'}</span>
              </button>
            </div>
          </div>

          {/* Explanation - Collapsible */}
          {showExplanation && (
            <div className="px-4 py-3 bg-secondary/20 border-b border-border/30 animate-fade-in">
              <p className="text-sm text-muted-foreground leading-relaxed">
                {post.explanation}
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="px-4 py-2 flex items-center justify-between border-b border-border/30">
            <div className="flex items-center gap-0.5">
              <button
                onClick={handleLike}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm transition-all ${
                  isLiked ? 'text-primary bg-primary/10' : 'text-muted-foreground hover:bg-secondary'
                }`}
              >
                <Heart className={`w-4 h-4 transition-transform ${isLiked ? 'fill-primary scale-110' : ''}`} />
                <span className="text-xs font-medium">{likeCount}</span>
              </button>

              <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm text-primary bg-primary/5">
                <MessageCircle className="w-4 h-4" />
                <span className="text-xs font-medium">{comments.length}</span>
              </button>

              <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:bg-secondary">
                <Bookmark className="w-4 h-4" />
              </button>
            </div>

            <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:bg-secondary">
              <Share2 className="w-4 h-4" />
            </button>
          </div>

          {/* Comments Section */}
          <div className="px-4 py-3">
            <p className="text-xs font-medium text-muted-foreground mb-3 uppercase tracking-wider">
              コメント {comments.length}件
            </p>
            
            <div className="space-y-4">
              {comments.map((comment) => (
                <div key={comment.id} className="space-y-2 animate-fade-in">
                  {/* Main Comment */}
                  <div className="flex gap-2.5">
                    <img
                      src={comment.author.avatar}
                      alt={comment.author.name}
                      className="w-8 h-8 rounded-full object-cover flex-shrink-0 ring-1 ring-border/50"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="bg-secondary/60 rounded-2xl px-3 py-2 inline-block max-w-full">
                        <p className="text-xs font-semibold text-foreground/90">{comment.author.name}</p>
                        <p className="text-sm break-words text-foreground/80 leading-relaxed">{comment.text}</p>
                      </div>
                      <div className="flex items-center gap-3 mt-1 ml-1 text-[11px] text-muted-foreground">
                        <span>{comment.timestamp}</span>
                        <button className="hover:text-primary font-medium transition-colors">いいね！</button>
                        <button 
                          className="hover:text-primary font-medium transition-colors"
                          onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                        >
                          返信
                        </button>
                        {comment.likes && comment.likes > 0 && (
                          <span className="text-primary/80 flex items-center gap-0.5">
                            <Heart className="w-3 h-3 fill-primary/80" />
                            {comment.likes}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Replies */}
                  {comment.replies && comment.replies.length > 0 && (
                    <div className="ml-10 space-y-2 border-l-2 border-border/30 pl-3">
                      {comment.replies.map((reply) => (
                        <div key={reply.id} className="flex gap-2">
                          <img
                            src={reply.author.avatar}
                            alt={reply.author.name}
                            className="w-6 h-6 rounded-full object-cover flex-shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="bg-secondary/40 rounded-xl px-2.5 py-1.5 inline-block max-w-full">
                              <p className="text-[11px] font-semibold text-foreground/80">{reply.author.name}</p>
                              <p className="text-xs break-words text-foreground/70">{reply.text}</p>
                            </div>
                            <div className="flex items-center gap-2 mt-0.5 ml-1 text-[10px] text-muted-foreground">
                              <span>{reply.timestamp}</span>
                              <button className="hover:text-primary font-medium">いいね！</button>
                              {reply.likes && reply.likes > 0 && (
                                <span className="text-primary/70">{reply.likes}</span>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Reply Input */}
                  {replyingTo === comment.id && (
                    <div className="ml-10 flex gap-2 items-center animate-fade-in">
                      <img
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
                        alt="Your avatar"
                        className="w-6 h-6 rounded-full object-cover flex-shrink-0"
                      />
                      <div className="flex-1 relative">
                        <input
                          type="text"
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          placeholder={`${comment.author.name}に返信...`}
                          className="w-full bg-secondary/50 rounded-full px-3 py-1.5 text-xs outline-none focus:ring-2 focus:ring-primary/30 pr-8"
                          autoFocus
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                              e.preventDefault();
                              handleReply(comment.id);
                            }
                            if (e.key === 'Escape') {
                              setReplyingTo(null);
                            }
                          }}
                        />
                        <button
                          onClick={() => handleReply(comment.id)}
                          className="absolute right-2 top-1/2 -translate-y-1/2 p-0.5 text-primary hover:opacity-70 transition-opacity disabled:opacity-30"
                          disabled={!replyText.trim()}
                        >
                          <Send className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Fixed Comment Input at Bottom */}
        <form onSubmit={handleSubmit} className="px-4 py-3 border-t border-border/50 bg-card/95 backdrop-blur-sm flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
              alt="Your avatar"
              className="w-8 h-8 rounded-full object-cover flex-shrink-0 ring-1 ring-border/50"
            />
            <div className="flex-1 relative">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="コメントを書く..."
                className="w-full bg-secondary/60 rounded-full px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30 pr-10 placeholder:text-muted-foreground/60"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-primary hover:scale-110 transition-all disabled:opacity-30 disabled:hover:scale-100"
                disabled={!newComment.trim()}
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CommentPopup;
