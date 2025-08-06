export interface Notice{
    noticeId: number,
    noticeTitle: string,
    noticeContent: string,
    viewCount: string,
    createdAt: string,
    updatedAt: string | null
 }
 
 export const notice_0: Notice = {
    noticeId: 1,
    noticeTitle: "테스트 공지 1",
    noticeContent: "이 공지사항은 테스트용으로 작성되었습니다. 실제 공지사항이 아니며 시스템 테스트를 위한 데이터입니다.",
    viewCount: "42",
    createdAt: "2025-01-30",
    updatedAt: null
 };
 
 export const notice_1: Notice = {
    noticeId: 2,
    noticeTitle: "테스트 공지 2",
    noticeContent: "이 공지사항은 테스트용으로 작성되었습니다. 개발 및 디자인 검토를 위한 샘플 데이터이므로 참고하지 마세요.",
    viewCount: "28",
    createdAt: "2025-02-10",
    updatedAt: null
 };
 
 export const notice_2: Notice = {
    noticeId: 3,
    noticeTitle: "테스트 공지 3",
    noticeContent: "이 공지사항은 테스트용으로 작성되었습니다. 실제 운영 환경에서는 삭제될 예정입니다.",
    viewCount: "56",
    createdAt: "2025-02-20",
    updatedAt: "2025-02-22"
 };
 
 export const noticeList: Notice[] = [notice_0, notice_1, notice_2];