import { Component } from "react";
import {
  adminSvg,
  chatbotSvg,
  couponSvg,
  cubeezSvg,
  dashboardSvg,
  eventSvg,
  homeSvg,
  librarySvg,
  noticeSvg,
  pageSvg,
  partnerSvg,
  productSvg,
  reservationSvg,
  reviewSvg,
  settingSvg,
  statSvg,
  templateSvg,
  termsSvg,
  userSvg,
} from "./navIcon";
import { loginType } from "./useLogin";

const tmpSvg = (
  <svg
    width="20"
    height="28"
    viewBox="0 0 20 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M15.6827 14.8642C15.2291 14.6971 14.7437 14.6016 14.2264 14.6016H5.23372C2.89403 14.6016 1 16.4956 1 18.8353V27.0003H18.4601V18.8353C18.4601 17.0129 17.2982 15.4531 15.6827 14.8642V14.8642Z"
      stroke="#494949"
      strokeWidth="1.79"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M14.6244 5.89425C14.6244 8.60001 12.4359 10.7885 9.73019 10.7885C7.02442 10.7885 4.83594 8.60001 4.83594 5.89425C4.83594 3.18848 7.02442 1 9.73019 1C12.4359 1 14.6244 3.18848 14.6244 5.89425Z"
      stroke="#494949"
      strokeWidth="1.79"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

interface navInfoEachI {
  name: string;
  code: string;
  icon: JSX.Element;
  permission?: string | null;
  sub?: {
    name: string;
    code: string;
  }[];
}

export const getNavInfo = (type: loginType) => {
  if (type === "admin") return adminNavInfo;
  else if (type === "cubeez") return cubeezNavInfo;
  return [];
};

const adminNavInfo: navInfoEachI[] = [
  {
    name: "대시보드",
    code: "dashboard",
    permission: null,
    icon: dashboardSvg,
    sub: [{ code: "", name: "대시보드" }],
  },
  {
    name: "일반 회원 관리",
    code: "user",
    permission: "회원",
    icon: userSvg,
    sub: [
      { code: "/list", name: "회원 목록" },
      { code: "/group", name: "그룹 설정" },
    ],
  },
  {
    name: "큐비즈 관리",
    code: "cubeez",
    permission: "회원",
    icon: cubeezSvg,
    sub: [
      { code: "/list", name: "회원 목록" },
      { code: "/group", name: "그룹 설정" },
      { code: "/inquiry", name: "큐비즈 문의" },
      { code: "/settlement", name: "정산 관리" },
    ],
  },
  {
    name: "부서 및 관리자 계정 관리",
    code: "admin",
    permission: "부서관리자계정",
    icon: adminSvg,
    sub: [
      { code: "/account", name: "관리자 계정 관리" },
      { code: "/department", name: "조직관리" },
      { code: "/group", name: "그룹 설정" },
      { code: "/permission", name: "권한 관리" },
    ],
  },
  {
    name: "제휴 파트너 관리",
    code: "partner",
    permission: "거래처",
    icon: partnerSvg,
    sub: [
      { code: "/list", name: "회원 목록" },
      { code: "/group", name: "그룹 설정" },
      { code: "/settlement", name: "정산 관리" },
    ],
  },
  {
    name: "여행상품 관리",
    code: "product",
    permission: "여행상품",
    icon: productSvg,
    sub: [
      { code: "/package", name: "(패키지) 여행상품 관리" },
      { code: "/single", name: "(단품) 여행상품 관리" },
      { code: "/badge", name: "뱃지 관리" },
      { code: "/inquiry", name: "인센티브 여행상담" },
      { code: "/region", name: "지역 분류 및 관리" },
    ],
  },
  {
    name: "예약 관리",
    code: "reservation",
    permission: "예약",
    icon: reservationSvg,
    sub: [
      { code: "/", name: "예약 관리" },
      // { code: "/cancel", name: "취소 요청된 예약" },
    ],
  },
  {
    name: "라이브러리 관리",
    code: "library",
    permission: "여행상품",
    icon: librarySvg,
    sub: [
      { code: "", name: "라이브러리" },
      // { code: "/event", name: "" },
      // { code: "/", name: "" },
      // { code: "/", name: "" },
    ],
  },
  {
    name: "후기 관리",
    code: "review",
    icon: reviewSvg,
    sub: [
      { code: "/", name: "" },
      { code: "/", name: "" },
      { code: "/", name: "" },
      { code: "/", name: "" },
    ],
  },
  {
    name: "기획전/이벤트/기타할인",
    code: "event",
    permission: "기획전",
    icon: eventSvg,
    sub: [
      { code: "/exhibition", name: "기획전 관리" },
      { code: "/event", name: "이벤트 관리" },
      { code: "/discount", name: "기타 할인 관리" },
    ],
  },
  {
    name: "쿠폰 관리",
    code: "coupon",
    permission: "쿠폰",
    icon: couponSvg,
    sub: [
      { code: "/", name: "" },
      { code: "/", name: "" },
      { code: "/", name: "" },
      { code: "/", name: "" },
    ],
  },
  {
    name: "메시지 템플릿 관리",
    code: "template",
    permission: "메시지",
    icon: templateSvg,
    sub: [
      { code: "/user", name: "일반회원 대상" },
      { code: "/cubeez", name: "큐비즈 대상" },
      { code: "/admin", name: "권한 관리자 대상" },
    ],
  },
  {
    name: "공지사항",
    code: "notice",
    permission: "공지사항",
    icon: noticeSvg,
    sub: [{ code: "/", name: "공지사항" }],
  },
  {
    name: "약관 관리",
    code: "terms",
    icon: termsSvg,
    sub: [{ code: "/", name: "약관 관리" }],
  },
  {
    name: "홈 관리",
    code: "home",
    permission: "홈전시",
    icon: homeSvg,
    sub: [
      { code: "/category", name: "메뉴 카테고리 관리" },
      { code: "/home", name: "홈 전시 관리" },
      { code: "/popup", name: "팝업 관리" },
    ],
  },
  {
    name: "통계",
    code: "stat",
    permission: "통계",
    icon: statSvg,
    sub: [
      { code: "/sales", name: "매출" },
      { code: "/user", name: "회원" },
      { code: "/reservation", name: "예약" },
    ],
  },
  {
    name: "환경설정",
    code: "setting",
    icon: settingSvg,
    sub: [
      { code: "/setting", name: "기본설정" },
      { code: "/point", name: "포인트 관리" },
      { code: "/language", name: "다국어 설정" },
    ],
  },
  {
    name: "기타 페이지 관리",
    code: "page",
    icon: pageSvg,
    sub: [
      { code: "/cubeez", name: "큐비즈 소개" },
      { code: "/incentive", name: "인센티브여행 소개" },
      { code: "/point", name: "포인트 사용 안내" },
    ],
  },
  {
    name: "챗봇 관리 시스템",
    code: "chatbot",
    icon: chatbotSvg,
    sub: [
      { code: "/", name: "" },
      { code: "/", name: "" },
      { code: "/", name: "" },
      { code: "/", name: "" },
    ],
  },
];

const cubeezNavInfo: navInfoEachI[] = [
  { name: "대시보드", code: "dashboard", icon: tmpSvg },
  {
    name: "상담",
    code: "inquiry",
    icon: tmpSvg,
    sub: [{ code: "/admin", name: "관리자에 문의" }],
  },
  {
    name: "여행상품 관리",
    code: "product",
    icon: tmpSvg,
    sub: [{ code: "/package", name: "패키지 여행상품 관리" }],
  },
  {
    name: "라이브러리 관리",
    code: "library",
    icon: tmpSvg,
    sub: [{ code: "", name: "라이브러리" }],
  },
  { name: "후기 관리", code: "review", icon: tmpSvg },
  { name: "정산 신청 및 내역 보기", code: "settlement", icon: tmpSvg },
  { name: "통계", code: "stat", icon: tmpSvg },
  { name: "정보 관리", code: "info", icon: tmpSvg },
  { name: "도움말", code: "help", icon: tmpSvg },
];
