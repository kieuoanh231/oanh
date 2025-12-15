import { useState } from "react";
import { Heart, MessageCircle, Share2, Bookmark } from "lucide-react";
import CommentSection from "./CommentSection";

interface HaikuPostProps {
  id: number;
  author: {
    name: string;
    avatar: string;
    handle: string;
  };
  haiku: string[];
  image: string;
  explanation: string;
  likes: number;
  comments: number;
  timestamp: string;
}

const HaikuPost = ({
  author,
  haiku,
  image,
  explanation,
  likes: initialLikes,
  comments,
  timestamp,
}: HaikuPostProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(initialLikes);
  const [isSaved, setIsSaved] = useState(false);
  const [showComments, setShowComments] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  return (
    <article className="card-haiku animate-fade-in">
      {/* Author Header */}
      <div className="px-4 py-3 flex items-center gap-3">
        <img
          src={author.avatar}
          alt={author.name}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="flex-1">
          <p className="font-medium text-sm">{author.name}</p>
          <p className="text-xs text-muted-foreground">{author.handle} · {timestamp}</p>
        </div>
      </div>

      {/* Image */}
      <div className="aspect-[4/3] bg-muted overflow-hidden">
        <img
          src={image}
          alt="Haiku illustration"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Haiku Text - Vertical Japanese Style */}
      <div className="px-6 py-6 flex justify-center">
        <div className="haiku-text flex flex-row-reverse gap-6 h-48">
          {haiku.map((line, index) => (
            <p 
              key={index} 
              className="text-foreground writing-vertical-rl text-2xl tracking-widest leading-loose"
              style={{ writingMode: 'vertical-rl' }}
            >
              {line}
            </p>
          ))}
        </div>
      </div>

      {/* Explanation */}
      <div className="px-4 pb-4">
        <p className="text-sm text-muted-foreground leading-relaxed">
          {explanation}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="divider-subtle mx-4" />
      <div className="px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-1">
          <button
            onClick={handleLike}
            className={`btn-action ${isLiked ? 'btn-action-active' : ''}`}
          >
            <Heart
              className={`w-5 h-5 transition-all ${isLiked ? 'fill-primary animate-heart' : ''}`}
            />
            <span>{likeCount}</span>
          </button>

          <button
            onClick={() => setShowComments(!showComments)}
            className="btn-action"
          >
            <MessageCircle className="w-5 h-5" />
            <span>{comments}</span>
          </button>

          <button className="btn-action">
            <Share2 className="w-5 h-5" />
          </button>
        </div>

        <button
          onClick={() => setIsSaved(!isSaved)}
          className={`btn-action ${isSaved ? 'btn-action-active' : ''}`}
        >
          <Bookmark className={`w-5 h-5 ${isSaved ? 'fill-primary' : ''}`} />
        </button>
      </div>

      {/* Comments Section */}
      {showComments && <CommentSection />}
    </article>
  );
};

export default HaikuPost;
