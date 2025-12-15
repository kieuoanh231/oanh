import HaikuPost from "./HaikuPost";

const samplePosts = [
  {
    id: 1,
    author: {
      name: "松尾芭蕉",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
      handle: "@basho_haiku",
    },
    haiku: [
      "古池や",
      "蛙飛び込む",
      "水の音",
    ],
    image: "https://images.unsplash.com/photo-1545579133-99bb5ab189bd?w=800&h=600&fit=crop",
    explanation: "静寂な古い池に蛙が飛び込み、その一瞬の音が静けさをより深く感じさせる。日本俳句の代表作であり、わび・さびの精神を表現しています。",
    likes: 1284,
    comments: 89,
    timestamp: "3時間前",
  },
  {
    id: 2,
    author: {
      name: "与謝蕪村",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
      handle: "@buson_art",
    },
    haiku: [
      "菜の花や",
      "月は東に",
      "日は西に",
    ],
    image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=800&h=600&fit=crop",
    explanation: "菜の花畑が広がる春の夕暮れ。東には月が昇り、西には太陽が沈む。この一瞬の美しさを切り取った、蕪村らしい絵画的な句です。",
    likes: 967,
    comments: 45,
    timestamp: "5時間前",
  },
  {
    id: 3,
    author: {
      name: "小林一茶",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
      handle: "@issa_life",
    },
    haiku: [
      "雪とけて",
      "村いっぱいの",
      "子どもかな",
    ],
    image: "https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=800&h=600&fit=crop",
    explanation: "長い冬が終わり、雪が溶けると子どもたちが外に飛び出してくる。村中に子どもの声が響く、春の訪れの喜びを詠んだ一茶らしい温かい句。",
    likes: 752,
    comments: 34,
    timestamp: "8時間前",
  },
];

const HaikuFeed = () => {
  return (
    <div className="flex-1 max-w-xl mx-auto space-y-6">
      {samplePosts.map((post) => (
        <HaikuPost key={post.id} {...post} />
      ))}
    </div>
  );
};

export default HaikuFeed;
