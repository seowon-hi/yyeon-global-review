import { Language } from "../types";

export interface HomeTilesText {
  meaningDesc: string;
  meaningLabel: string;
  letterLabel: string;
  letterEmpty: string;
  storyLabel: string;
  storyCountSuffix: string;
  instagramLabel: string;
  instagramSub: string;
  askSub: string;
  lettersTitle: string;
  meaningTitle: string;
}

// meaningDesc for JA/EN is the existing brand_story[0] copy (see translations.ts),
// derived at runtime in HomeScreen so the wording stays identical.
export const homeTilesText: Record<Language, HomeTilesText> = {
  KO: {
    meaningDesc: "Be my yeon의 'yeon'은 '인연'을 뜻하는 말이에요.",
    meaningLabel: "yyeon,의 의미",
    letterLabel: "브랜드 레터",
    letterEmpty: "준비 중이에요",
    storyLabel: "yyeon,의 이야기 보러가기",
    storyCountSuffix: "명이 함께해주셨어요",
    instagramLabel: "인스타그램",
    instagramSub: "더 많은 소식",
    askSub: "무엇이든 물어보세요",
    lettersTitle: "Brand Letter",
    meaningTitle: "Meaning of yeon",
  },
  JA: {
    meaningDesc: "",
    meaningLabel: "yyeon,の意味",
    letterLabel: "ブランドレター",
    letterEmpty: "準備中です",
    storyLabel: "yyeon,のストーリーを見る",
    storyCountSuffix: "名の方が一緒に歩んでくれました",
    instagramLabel: "インスタグラム",
    instagramSub: "もっと見る",
    askSub: "何でもご相談ください",
    lettersTitle: "Brand Letter",
    meaningTitle: "Meaning of yeon",
  },
  EN: {
    meaningDesc: "",
    meaningLabel: "Meaning of yyeon,",
    letterLabel: "Brand Letter",
    letterEmpty: "Coming soon",
    storyLabel: "Read the story of yyeon,",
    storyCountSuffix: "people have joined us",
    instagramLabel: "Instagram",
    instagramSub: "More updates",
    askSub: "Ask us anything",
    lettersTitle: "Brand Letter",
    meaningTitle: "Meaning of yeon",
  },
};
