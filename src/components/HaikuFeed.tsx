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
    imageOrientation: 'horizontal' as const,
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
      "春の海",
      "ひねもすのたり",
      "のたりかな",
    ],
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&h=800&fit=crop",
    imageOrientation: 'vertical' as const,
    explanation: "穏やかな春の海がゆったりと波を立てている様子。「ひねもす」は一日中、「のたりのたり」は波がゆっくり寄せては返す様を表す。",
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
    imageOrientation: 'horizontal' as const,
    explanation: "長い冬が終わり、雪が溶けると子どもたちが外に飛び出してくる。村中に子どもの声が響く、春の訪れの喜びを詠んだ一茶らしい温かい句。",
    likes: 752,
    comments: 34,
    timestamp: "8時間前",
  },
  {
    id: 4,
    author: {
      name: "正岡子規",
      avatar: "https://images.unsplash.com/photo-1599566150163-29194dcabd36?w=100&h=100&fit=crop",
      handle: "@shiki_modern",
    },
    haiku: [
      "柿くへば",
      "鐘が鳴るなり",
      "法隆寺",
    ],
    image: "https://images.unsplash.com/photo-1528164344705-47542687000d?w=600&h=800&fit=crop",
    imageOrientation: 'vertical' as const,
    explanation: "秋の法隆寺で柿を食べていると、寺の鐘が鳴り響く。日本の秋の情緒と古都の静寂を見事に表現した子規の代表作。",
    likes: 1156,
    comments: 67,
    timestamp: "12時間前",
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
