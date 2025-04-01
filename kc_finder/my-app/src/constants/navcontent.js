export const navContent = [
  {
    name: "회사소개",
    path: "/introduction",
    dropdownItems: [
      { name: "회사소개", path: "/introduction" },
      { name: "오시는 길", path: "/introduction/location" },
    ],
  },
  {
    name: "서비스 소개",
    path: "/services",
    dropdownItems: [
      { name: "KC인증", path: "/services" },
      { name: "동일 기자재 신고", path: "/services/same_equipment" },
      { name: "동일 기자재 찾기", path: "/services/finder" },
      { name: "이용방법", path: "/services/guide" },
    ],
  },
  {
    name: "공지사항",
    path: "/notice",
    dropdownItems: [{ name: "공지사항", path: "/notice" }],
  },
];

export default navContent;