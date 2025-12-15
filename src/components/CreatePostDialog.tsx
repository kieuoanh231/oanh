import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { PenLine, Image, X } from "lucide-react";

const FONT_OPTIONS = [
  { name: "Noto Serif JP", value: "'Noto Serif JP', serif", preview: "明朝体" },
  { name: "Noto Sans JP", value: "'Noto Sans JP', sans-serif", preview: "ゴシック" },
  { name: "Sawarabi Mincho", value: "'Sawarabi Mincho', serif", preview: "さわらび" },
  { name: "Kosugi Maru", value: "'Kosugi Maru', sans-serif", preview: "小杉丸" },
  { name: "M PLUS Rounded 1c", value: "'M PLUS Rounded 1c', sans-serif", preview: "丸ゴシック" },
  { name: "Shippori Mincho", value: "'Shippori Mincho', serif", preview: "しっぽり" },
];

interface CreatePostDialogProps {
  trigger: React.ReactNode;
}

const CreatePostDialog = ({ trigger }: CreatePostDialogProps) => {
  const [open, setOpen] = useState(false);
  const [selectedFont, setSelectedFont] = useState(FONT_OPTIONS[0]);
  const [haikuLines, setHaikuLines] = useState(["", "", ""]);
  const [explanation, setExplanation] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleLineChange = (index: number, value: string) => {
    const newLines = [...haikuLines];
    newLines[index] = value;
    setHaikuLines(newLines);
  };

  const handleSubmit = () => {
    // TODO: Submit logic
    console.log({ haikuLines, explanation, imageUrl, font: selectedFont });
    setOpen(false);
    // Reset form
    setHaikuLines(["", "", ""]);
    setExplanation("");
    setImageUrl("");
    setSelectedFont(FONT_OPTIONS[0]);
  };

  const isValid = haikuLines.every(line => line.trim()) && explanation.trim();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-serif text-xl">俳句を投稿</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Font Selection */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-foreground">フォントを選択</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {FONT_OPTIONS.map((font) => (
                <button
                  key={font.name}
                  onClick={() => setSelectedFont(font)}
                  className={`p-3 rounded-lg border-2 transition-all text-center ${
                    selectedFont.name === font.name
                      ? "border-primary bg-primary/10"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <span 
                    className="text-lg block"
                    style={{ fontFamily: font.value }}
                  >
                    {font.preview}
                  </span>
                  <span className="text-xs text-muted-foreground mt-1 block">
                    {font.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Haiku Input */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-foreground">俳句 (五・七・五)</label>
            <div className="space-y-2">
              {["上の句 (5音)", "中の句 (7音)", "下の句 (5音)"].map((placeholder, index) => (
                <Input
                  key={index}
                  placeholder={placeholder}
                  value={haikuLines[index]}
                  onChange={(e) => handleLineChange(index, e.target.value)}
                  style={{ fontFamily: selectedFont.value }}
                  className="text-lg py-3"
                />
              ))}
            </div>
            
            {/* Preview */}
            {haikuLines.some(line => line.trim()) && (
              <div className="p-4 bg-secondary/30 rounded-lg">
                <p className="text-sm text-muted-foreground mb-2">プレビュー:</p>
                <div 
                  className="flex flex-row-reverse gap-4 justify-center writing-vertical-rl"
                  style={{ fontFamily: selectedFont.value }}
                >
                  {haikuLines.map((line, index) => (
                    <span key={index} className="text-xl">
                      {line || "..."}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Explanation */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">解説・背景</label>
            <Textarea
              placeholder="この俳句についての説明や背景を書いてください..."
              value={explanation}
              onChange={(e) => setExplanation(e.target.value)}
              rows={3}
            />
          </div>

          {/* Image URL */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">画像URL (任意)</label>
            <div className="flex gap-2">
              <Input
                placeholder="https://example.com/image.jpg"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="flex-1"
              />
              {imageUrl && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setImageUrl("")}
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
            {imageUrl && (
              <div className="relative aspect-video rounded-lg overflow-hidden bg-secondary">
                <img 
                  src={imageUrl} 
                  alt="Preview" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              </div>
            )}
          </div>

          {/* Submit Button */}
          <Button 
            onClick={handleSubmit}
            disabled={!isValid}
            className="w-full"
          >
            <PenLine className="w-4 h-4 mr-2" />
            投稿する
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePostDialog;
