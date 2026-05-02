import { useState, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { PenLine, X, LayoutTemplate, ImagePlus, Upload, Sparkles } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import templateSakura from "@/assets/template-sakura.jpg";
import templateMountain from "@/assets/template-mountain.jpg";
import templateBamboo from "@/assets/template-bamboo.jpg";
import templateMoon from "@/assets/template-moon.jpg";
import templateWashi from "@/assets/template-washi.jpg";

const FONT_OPTIONS = [
  { name: "Yuji Syuku", value: "'Yuji Syuku', serif", preview: "遊字書" },
  { name: "Yuji Mai", value: "'Yuji Mai', serif", preview: "遊字舞" },
  { name: "Yuji Boku", value: "'Yuji Boku', serif", preview: "遊字墨" },
  { name: "Zen Antique", value: "'Zen Antique', serif", preview: "禅古典" },
  { name: "Zen Kurenaido", value: "'Zen Kurenaido', serif", preview: "禅紅" },
  { name: "Hina Mincho", value: "'Hina Mincho', serif", preview: "雛明朝" },
  { name: "Kaisei Decol", value: "'Kaisei Decol', serif", preview: "解星" },
  { name: "Shippori Mincho", value: "'Shippori Mincho', serif", preview: "しっぽり" },
  { name: "Sawarabi Mincho", value: "'Sawarabi Mincho', serif", preview: "さわらび" },
  { name: "Noto Serif JP", value: "'Noto Serif JP', serif", preview: "明朝体" },
];

const LAYOUT_OPTIONS = [
  { id: "top-left", name: "左上", icon: "↖️", position: "top-4 left-4" },
  { id: "top-right", name: "右上", icon: "↗️", position: "top-4 right-4" },
  { id: "center", name: "中央", icon: "⊕", position: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" },
  { id: "bottom-left", name: "左下", icon: "↙️", position: "bottom-4 left-4" },
  { id: "bottom-right", name: "右下", icon: "↘️", position: "bottom-4 right-4" },
];

const COLOR_OPTIONS = [
  { name: "白", value: "#FFFFFF" },
  { name: "墨", value: "#1a1a1a" },
  { name: "朱", value: "#C41E3A" },
  { name: "金", value: "#D4AF37" },
  { name: "藍", value: "#264653" },
  { name: "桜", value: "#FFB7C5" },
  { name: "抹茶", value: "#88A47C" },
  { name: "紫", value: "#6B4C8A" },
];

interface CreatePostDialogProps {
  trigger: React.ReactNode;
}

// Preset templates: background + font + color + layout — perfect for beginners
const TEMPLATE_OPTIONS = [
  {
    id: "sakura",
    name: "桜",
    description: "春・優美",
    image: templateSakura,
    fontIndex: 0, // Yuji Syuku
    colorIndex: 1, // 墨
    layoutIndex: 0, // top-left
  },
  {
    id: "mountain",
    name: "山霧",
    description: "静寂・荘厳",
    image: templateMountain,
    fontIndex: 5, // Hina Mincho
    colorIndex: 1, // 墨
    layoutIndex: 1, // top-right
  },
  {
    id: "bamboo",
    name: "竹",
    description: "清涼・若々",
    image: templateBamboo,
    fontIndex: 8, // Sawarabi Mincho
    colorIndex: 6, // 抹茶
    layoutIndex: 0, // top-left
  },
  {
    id: "moon",
    name: "月夜",
    description: "夜・幻想",
    image: templateMoon,
    fontIndex: 1, // Yuji Mai
    colorIndex: 0, // 白
    layoutIndex: 1, // top-right
  },
  {
    id: "washi",
    name: "和紙",
    description: "シンプル",
    image: templateWashi,
    fontIndex: 9, // Noto Serif JP
    colorIndex: 1, // 墨
    layoutIndex: 2, // center
  },
];

const CreatePostDialog = ({ trigger }: CreatePostDialogProps) => {
  const [open, setOpen] = useState(false);
  const [selectedFont, setSelectedFont] = useState(FONT_OPTIONS[0]);
  const [selectedLayout, setSelectedLayout] = useState(LAYOUT_OPTIONS[1]); // Default: top-right
  const [selectedColor, setSelectedColor] = useState(COLOR_OPTIONS[0]);
  const [haikuLines, setHaikuLines] = useState(["", "", ""]);
  const [explanation, setExplanation] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleLineChange = (index: number, value: string) => {
    const newLines = [...haikuLines];
    newLines[index] = value;
    setHaikuLines(newLines);
  };

  const handleImageSelect = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleImageSelect(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleImageSelect(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const applyTemplate = (template: typeof TEMPLATE_OPTIONS[0]) => {
    setSelectedFont(FONT_OPTIONS[template.fontIndex]);
    setSelectedColor(COLOR_OPTIONS[template.colorIndex]);
    setSelectedLayout(LAYOUT_OPTIONS[template.layoutIndex]);
    setImagePreview(template.image);
    setImageFile(null);
  };

  const handleSubmit = () => {
    console.log({ haikuLines, explanation, imageFile, font: selectedFont, layout: selectedLayout, color: selectedColor });
    setOpen(false);
    // Reset form
    setHaikuLines(["", "", ""]);
    setExplanation("");
    setImageFile(null);
    setImagePreview("");
    setSelectedFont(FONT_OPTIONS[0]);
    setSelectedLayout(LAYOUT_OPTIONS[1]);
    setSelectedColor(COLOR_OPTIONS[0]);
  };

  const isValid = haikuLines.every(line => line.trim()) && explanation.trim();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <DialogHeader>
          <DialogTitle className="font-serif text-xl">俳句を投稿</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Templates - Quick start for beginners */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-foreground flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" />
                テンプレート
                <span className="text-xs text-muted-foreground font-normal">（初心者におすすめ）</span>
              </label>
            </div>
            <Carousel
              opts={{ align: "start", dragFree: true }}
              className="w-full"
            >
              <CarouselContent className="-ml-2">
                {TEMPLATE_OPTIONS.map((template) => {
                  const tplFont = FONT_OPTIONS[template.fontIndex];
                  const tplColor = COLOR_OPTIONS[template.colorIndex];
                  const tplLayout = LAYOUT_OPTIONS[template.layoutIndex];
                  const isActive = imagePreview === template.image;
                  return (
                    <CarouselItem key={template.id} className="pl-2 basis-1/3">
                      <button
                        onClick={() => applyTemplate(template)}
                        className={`group relative w-full aspect-[3/4] rounded-xl overflow-hidden border-2 transition-all ${
                          isActive
                            ? "border-primary shadow-lg scale-[1.02]"
                            : "border-border hover:border-primary/50 hover:shadow-md"
                        }`}
                      >
                        <img
                          src={template.image}
                          alt={template.name}
                          loading="lazy"
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                        {/* Sample haiku preview */}
                        <div className={`absolute ${tplLayout.position} flex flex-row-reverse gap-1`}>
                          {["古池や", "蛙飛び込む", "水の音"].map((line, i) => (
                            <span
                              key={i}
                              className="text-[10px] drop-shadow"
                              style={{
                                writingMode: "vertical-rl",
                                fontFamily: tplFont.value,
                                color: tplColor.value,
                                textShadow: tplColor.value === "#FFFFFF" ? "1px 1px 2px rgba(0,0,0,0.5)" : "none",
                              }}
                            >
                              {line}
                            </span>
                          ))}
                        </div>
                        {/* Label */}
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-2 py-1.5">
                          <p className="text-xs font-medium text-white text-left">{template.name}</p>
                          <p className="text-[10px] text-white/80 text-left">{template.description}</p>
                        </div>
                        {isActive && (
                          <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                            <span className="text-[10px] text-primary-foreground">✓</span>
                          </div>
                        )}
                      </button>
                    </CarouselItem>
                  );
                })}
              </CarouselContent>
            </Carousel>
          </div>

          {/* Font Selection - Carousel Slider */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-foreground">フォントを選択</label>
            <Carousel
              opts={{
                align: "start",
                loop: true,
                dragFree: true,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-1">
                {FONT_OPTIONS.map((font) => (
                  <CarouselItem key={font.name} className="pl-1 basis-1/4">
                    <div className="p-1">
                      <button
                        onClick={() => setSelectedFont(font)}
                        className={`w-full px-3 py-3 rounded-xl border-2 transition-all ${
                          selectedFont.name === font.name
                            ? "border-primary bg-primary/10 shadow-lg scale-105"
                            : "border-border hover:border-primary/50 hover:shadow-md"
                        }`}
                      >
                        <span 
                          className="text-lg block"
                          style={{ fontFamily: font.value }}
                        >
                          {font.preview}
                        </span>
                      </button>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>

          {/* Color Selection */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-foreground">文字色を選択</label>
            <div className="flex gap-2 flex-wrap">
              {COLOR_OPTIONS.map((color) => (
                <button
                  key={color.name}
                  onClick={() => setSelectedColor(color)}
                  className={`w-10 h-10 rounded-full border-2 transition-all flex items-center justify-center ${
                    selectedColor.name === color.name
                      ? "border-primary/50 scale-105"
                      : "border-border hover:border-primary/50 hover:scale-105"
                  }`}
                  style={{ backgroundColor: color.value }}
                  title={color.name}
                >
                  {selectedColor.name === color.name && (
                    <span className={`text-xs ${color.value === '#FFFFFF' || color.value === '#FFB7C5' || color.value === '#D4AF37' ? 'text-black' : 'text-white'}`}>✓</span>
                  )}
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
                  style={{ fontFamily: selectedFont.value, color: selectedColor.value === '#FFFFFF' ? '#1a1a1a' : selectedColor.value }}
                  className="text-lg py-3 bg-secondary/30"
                />
              ))}
            </div>
          </div>

          {/* Explanation */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">解説・背景</label>
            <Textarea
              placeholder="この俳句についての説明や背景を書いてください..."
              value={explanation}
              onChange={(e) => setExplanation(e.target.value)}
              rows={3}
              className="bg-secondary/30"
            />
          </div>

          {/* Image Upload - Facebook Style */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground flex items-center gap-2">
              <ImagePlus className="w-4 h-4" />
              画像を追加
            </label>
            
            {!imagePreview ? (
              <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onClick={() => fileInputRef.current?.click()}
                className={`relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
                  isDragging 
                    ? "border-primary bg-primary/10 scale-[1.02]" 
                    : "border-border hover:border-primary/50 hover:bg-secondary/30"
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileInput}
                  className="hidden"
                />
                <div className="flex flex-col items-center gap-3">
                  <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center">
                    <Upload className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">画像をドラッグ＆ドロップ</p>
                    <p className="text-sm text-muted-foreground">または クリックして選択</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="relative rounded-xl overflow-hidden group">
                <img 
                  src={imagePreview} 
                  alt="Preview" 
                  className="w-full h-64 object-cover"
                />
                {/* Overlay with haiku preview */}
                <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-transparent to-black/40" />
                
                {/* Haiku position preview */}
                {haikuLines.some(line => line.trim()) && (
                  <div className={`absolute ${selectedLayout.position} flex flex-row-reverse gap-2`}>
                    {haikuLines.map((line, index) => (
                      <span 
                        key={index} 
                        className="text-lg drop-shadow-lg"
                        style={{ 
                          writingMode: 'vertical-rl',
                          fontFamily: selectedFont.value,
                          color: selectedColor.value,
                          textShadow: '2px 2px 4px rgba(0,0,0,0.8)'
                        }}
                      >
                        {line || "..."}
                      </span>
                    ))}
                  </div>
                )}
                
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={removeImage}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>

          {/* Layout Selection */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-foreground flex items-center gap-2">
              <LayoutTemplate className="w-4 h-4" />
              俳句の位置
            </label>
            <div className="grid grid-cols-5 gap-2">
              {LAYOUT_OPTIONS.map((layout) => (
                <button
                  key={layout.id}
                  onClick={() => setSelectedLayout(layout)}
                  className={`relative aspect-square rounded-lg border-2 transition-all overflow-hidden ${
                    selectedLayout.id === layout.id
                      ? "border-primary bg-primary/10 shadow-lg"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  {/* Mini preview grid */}
                  <div className="absolute inset-1 bg-secondary/50 rounded">
                    <div className={`absolute ${layout.position} w-2 h-4 bg-primary/70 rounded-sm`} 
                      style={{ transform: layout.id === 'center' ? 'translate(-50%, -50%)' : 'none' }}
                    />
                  </div>
                  <span className="absolute bottom-0 left-0 right-0 text-[10px] text-center py-0.5 bg-background/80">
                    {layout.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <Button 
            onClick={handleSubmit}
            disabled={!isValid}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
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