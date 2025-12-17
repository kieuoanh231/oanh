import { useState } from "react";
import { Heart, MessageCircle, Share2, Bookmark, ChevronDown, ChevronUp } from "lucide-react";
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
  imageOrientation?: 'horizontal' | 'vertical';
  explanation: string;
  likes: number;
  comments: number;
  timestamp: string;
}

// Convert number to kanji
const toKanjiNumber = (num: number): string => {
  const kanjiDigits = ['〇', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
  const kanjiUnits = ['', '十', '百', '千'];
  
  if (num === 0) return kanjiDigits[0];
  if (num < 10) return kanjiDigits[num];
  if (num < 100) {
    const tens = Math.floor(num / 10);
    const ones = num % 10;
    const tensStr = tens === 1 ? '十' : kanjiDigits[tens] + '十';
    return tensStr + (ones > 0 ? kanjiDigits[ones] : '');
  }
  return String(num);
};

// Convert to Japanese era date (Reiwa format) with kanji numbers
const toJapaneseEraDate = (dateStr: string): string => {
  const now = new Date();
  const reiwaStart = new Date(2019, 4, 1); // May 1, 2019
  
  if (now >= reiwaStart) {
    const reiwaYear = now.getFullYear() - 2018;
    const month = now.getMonth() + 1;
    const day = now.getDate();
    return `令和${toKanjiNumber(reiwaYear)}年${toKanjiNumber(month)}月${toKanjiNumber(day)}日`;
  }
  return dateStr;
};

const HaikuPost = ({
  author,
  haiku,
  image,
  imageOrientation = 'horizontal',
  explanation,
  likes: initialLikes,
  comments,
  timestamp,
}: HaikuPostProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(initialLikes);
  const [isSaved, setIsSaved] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [showExplanation, setShowExplanation] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  const japaneseDate = toJapaneseEraDate(timestamp);

  return (
    <article className="card-haiku animate-fade-in">
      {/* Author Header */}
      <div className="px-4 py-3 flex items-center gap-3">
        <img
          src={author.avatar}
          alt={author.name}
          className="w-10 h-10 rounded-full object-cover ring-2 ring-primary/20"
        />
        <div className="flex-1">
          <p className="font-medium text-sm">{author.name}</p>
          <p className="text-xs text-muted-foreground">{author.handle} · {timestamp}</p>
        </div>
      </div>

      {/* Image with Haiku Overlay */}
      <div 
        className="relative mx-4 rounded-2xl overflow-hidden shadow-lg group cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Background gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-bl from-black/50 via-transparent to-black/40 z-10 pointer-events-none" />
        
        {/* Main Image with zoom animation */}
        <div className={`overflow-hidden ${imageOrientation === 'vertical' ? 'aspect-[3/4]' : 'aspect-[4/3]'}`}>
          <img
            src={image}
            alt="Haiku illustration"
            className={`w-full h-full object-cover transition-transform duration-700 ease-out ${
              isHovered ? 'scale-110' : 'scale-100'
            }`}
          />
        </div>

        {/* Haiku Text - Top Right */}
        <div className="absolute top-4 right-4 z-20">
          <div className="flex flex-row-reverse gap-3">
            {haiku.map((line, index) => (
              <p 
                key={index} 
                className="text-white text-2xl md:text-4xl tracking-widest leading-relaxed drop-shadow-lg"
                style={{ 
                  writingMode: 'vertical-rl',
                  fontFamily: '"Yuji Syuku", serif',
                  textShadow: '2px 2px 8px rgba(0,0,0,0.7), 0 0 20px rgba(0,0,0,0.5)'
                }}
              >
                {line}
              </p>
            ))}
          </div>
        </div>

        {/* Japanese Era Date - Bottom Left */}
        <div className="absolute bottom-4 left-4 z-20">
          <p 
            className="text-white/90 text-sm tracking-wider drop-shadow-lg"
            style={{ 
              writingMode: 'vertical-rl',
              fontFamily: '"Yuji Syuku", serif',
              textShadow: '1px 1px 4px rgba(0,0,0,0.8)'
            }}
          >
            {japaneseDate}
          </p>
        </div>

        {/* Subtle decorative corner accent */}
        <div className="absolute bottom-0 right-0 w-16 h-16 z-10 pointer-events-none">
          <div className="absolute bottom-2 right-2 w-8 h-8 border-r-2 border-b-2 border-white/30 rounded-br-lg" />
        </div>
      </div>

      {/* Explanation Toggle */}
      <div className="px-4 py-4">
        <button
          onClick={() => setShowExplanation(!showExplanation)}
          className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors mb-2"
        >
          {showExplanation ? (
            <>
              <ChevronUp className="w-3 h-3" />
              <span>解説を隠す</span>
            </>
          ) : (
            <>
              <ChevronDown className="w-3 h-3" />
              <span>解説を表示</span>
            </>
          )}
        </button>
        {showExplanation && (
          <p className="text-sm text-muted-foreground leading-relaxed animate-fade-in pl-1 border-l-2 border-primary/30">
            {explanation}
          </p>
        )}
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
             <Bookmark className="w-5 h-5" />
          </button>
        </div>

        <button
          onClick={() => setIsSaved(!isSaved)}
          className={`btn-action ${isSaved ? 'btn-action-active' : ''}`}
        >
         <Share2 className="w-5 h-5" />
        </button>
      </div>

      {/* Comments Section */}
      {showComments && <CommentSection />}
    </article>
  );
};

export default HaikuPost;
