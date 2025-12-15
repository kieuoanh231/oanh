import { useState } from "react";
import { Send } from "lucide-react";

interface Comment {
  id: number;
  author: {
    name: string;
    avatar: string;
  };
  text: string;
  timestamp: string;
}

const sampleComments: Comment[] = [
  {
    id: 1,
    author: {
      name: "山田花子",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    },
    text: "美しい句ですね。情景が目に浮かびます。",
    timestamp: "2時間前",
  },
  {
    id: 2,
    author: {
      name: "鈴木一郎",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    },
    text: "季語の使い方が素晴らしいです！",
    timestamp: "1時間前",
  },
];

const CommentSection = () => {
  const [comments, setComments] = useState(sampleComments);
  const [newComment, setNewComment] = useState("");

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
    };

    setComments([...comments, comment]);
    setNewComment("");
  };

  return (
    <div className="border-t border-border animate-slide-up">
      {/* Comments List */}
      <div className="px-4 py-3 space-y-4 max-h-64 overflow-y-auto">
        {comments.map((comment) => (
          <div key={comment.id} className="flex gap-3">
            <img
              src={comment.author.avatar}
              alt={comment.author.name}
              className="w-8 h-8 rounded-full object-cover flex-shrink-0"
            />
            <div className="flex-1">
              <div className="bg-secondary/50 rounded-2xl px-3 py-2">
                <p className="text-xs font-medium mb-0.5">{comment.author.name}</p>
                <p className="text-sm">{comment.text}</p>
              </div>
              <p className="text-xs text-muted-foreground mt-1 ml-2">{comment.timestamp}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Comment Input */}
      <form onSubmit={handleSubmit} className="px-4 pb-4 pt-2">
        <div className="flex items-center gap-2">
          <img
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
            alt="Your avatar"
            className="w-8 h-8 rounded-full object-cover"
          />
          <div className="flex-1 relative">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="コメントを書く..."
              className="input-comment pr-10"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-primary hover:opacity-70 transition-opacity disabled:opacity-30"
              disabled={!newComment.trim()}
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CommentSection;
