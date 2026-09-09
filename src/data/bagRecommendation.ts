export interface RecommendationProduct {
  bagName: string;
  colorName: string;
  hex: string;
}

export const CATEGORIES = [
  "포인트",
  "부드러움·따뜻함",
  "고급·시크",
  "빈티지",
  "클래식",
] as const;

export type CategoryType = (typeof CATEGORIES)[number];

export const RECOMMENDATIONS: Record<CategoryType, RecommendationProduct[]> = {
  포인트: [
    { bagName: "블루밍 백", colorName: "버터 옐로우", hex: "#F5D97E" },
    { bagName: "블루밍 백", colorName: "메탈 실버", hex: "#C0C0C0" },
    { bagName: "블루밍 백", colorName: "베이비 블루", hex: "#A8D8EA" },
    { bagName: "멜로 백", colorName: "레드", hex: "#C0392B" },
    { bagName: "헨느 백", colorName: "올리브", hex: "#6B7C45" },
  ],
  "부드러움·따뜻함": [
    { bagName: "블루밍 백", colorName: "아이보리", hex: "#FFFFF0" },
    { bagName: "멜로 백", colorName: "버터베이지", hex: "#F0E6C8" },
    { bagName: "헨느 백", colorName: "바닐라", hex: "#F3E5AB" },
    { bagName: "헨느 백", colorName: "더스티 블루", hex: "#B0C4D8" },
    { bagName: "헨느 백", colorName: "소프트 블랙", hex: "#2C2C2C" },
    { bagName: "아로 백", colorName: "바닐라", hex: "#F3E5AB" },
    { bagName: "오브 백 미디움", colorName: "바닐라", hex: "#F3E5AB" },
    { bagName: "오브 백 라지", colorName: "바닐라", hex: "#F3E5AB" },
  ],
  "고급·시크": [
    { bagName: "블루밍 백", colorName: "빈티지 브라운", hex: "#6B4226" },
    { bagName: "블루밍 백", colorName: "블랙", hex: "#1A1A1A" },
    { bagName: "멜로 백", colorName: "블랙", hex: "#1A1A1A" },
    { bagName: "헨느 백", colorName: "소프트 블랙", hex: "#2C2C2C" },
    { bagName: "아로 백", colorName: "소프트 블랙", hex: "#2C2C2C" },
    { bagName: "오브 백 미디움", colorName: "소프트 블랙", hex: "#2C2C2C" },
    { bagName: "오브 백 라지", colorName: "딥브라운", hex: "#4A2C17" },
    { bagName: "오브 백 라지", colorName: "소프트 블랙", hex: "#2C2C2C" },
  ],
  빈티지: [
    { bagName: "블루밍 백", colorName: "뮤트 핑크", hex: "#D4A5A5" },
    { bagName: "헨느 백", colorName: "올리브", hex: "#6B7C45" },
    { bagName: "멜로 백", colorName: "버터베이지", hex: "#F0E6C8" },
    { bagName: "멜로 백", colorName: "레드", hex: "#C0392B" },
    { bagName: "멜로 백", colorName: "블랙", hex: "#1A1A1A" },
    { bagName: "멜로 백", colorName: "월넛 브라운", hex: "#5C3317" },
  ],
  클래식: [
    { bagName: "블루밍 백", colorName: "빈티지 브라운", hex: "#6B4226" },
    { bagName: "멜로 백", colorName: "월넛 브라운", hex: "#5C3317" },
    { bagName: "헨느 백", colorName: "카라멜 브라운", hex: "#C68642" },
    { bagName: "아로 백", colorName: "카라멜 브라운", hex: "#C68642" },
    { bagName: "오브 백 미디움", colorName: "카라멜 브라운", hex: "#C68642" },
  ],
};
