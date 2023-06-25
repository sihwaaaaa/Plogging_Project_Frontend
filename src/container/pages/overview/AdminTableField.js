export const memberTableColumns = [
  {
    title: 'no',
    dataIndex: 'memberNo',
    key: 'memberNo',
  },
  {
    title: '아이디',
    dataIndex: 'userId',
    key: 'userId',
  },
  {
    title: '이름',
    dataIndex: 'userName',
    key: 'userName',
  },
  {
    title: '생년월일',
    dataIndex: 'birth',
    key: 'birth',
  },
  {
    title: '성별',
    dataIndex: 'gender',
    key: 'gender',
  },
  {
    title: '가입일자',
    dataIndex: 'regDate',
    key: 'regDate',
  },
  {
    title: '가입경로',
    dataIndex: 'authProvider',
    key: 'authProvider',
  },
];

export const rewardTableColumns = [
  {
    title: '리워드번호',
    dataIndex: 'rewardNo',
    key: 'rewardNo',
  },
  {
    title: '유형',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: '명칭',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '상세',
    dataIndex: 'detail',
    key: 'detail',
  },
];
export const boardTableColumns = [
  {
    title: 'no',
    dataIndex: 'bno',
    key: 'bno',
  },
  {
    title: '유형',
    dataIndex: 'category',
    key: 'category',
  },
  {
    title: '작성자',
    dataIndex: 'userId',
    key: 'userId',
  },
  {
    title: '글제목',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: '작성일',
    dataIndex: 'regDate',
    key: 'regDate',
  },
];

export const pointTableColumns = [
  {
    title: 'no',
    dataIndex: 'pointNo',
    key: 'pointNo',
  },
  {
    title: '회원번호',
    dataIndex: 'memberNo',
    key: 'memberNo',
  },
  {
    title: '유형',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: '포인트',
    dataIndex: 'point',
    key: 'point',
  },
  {
    title: '리워드번호',
    dataIndex: 'rewardNo',
    key: 'rewardNo',
  },
  {
    title: '등록일',
    dataIndex: 'regDate',
    key: 'regDate',
  },
  {
    title: '상태',
    dataIndex: 'status',
    key: 'status',
  },
];

export const ploggingTableColumns = [
  {
    title: 'no',
    dataIndex: 'ploggingNo',
    key: 'ploggingNo',
  },
  {
    title: '유형',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: '플로거',
    dataIndex: 'member',
    key: 'member',
  },
  {
    title: '거리',
    dataIndex: 'distance',
    key: 'distance',
  },
  {
    title: '이동 시간',
    dataIndex: 'ploggingTime',
    key: 'ploggingTime',
  },
  {
    title: '플로깅날짜',
    dataIndex: 'regDate',
    key: 'regDate',
  },
];

export const mapTableColumns = [
  {
    title: 'no',
    dataIndex: 'mapNo',
    key: 'mapNo',
  },
  {
    title: '자치구(주소)',
    dataIndex: 'addr',
    key: 'addr',
  },
  {
    title: '코스명',
    dataIndex: 'courseName',
    key: 'courseName',
  },
  {
    title: '총 거리(km)',
    dataIndex: 'distance',
    key: 'distance',
  },
  {
    title: '소요시간(분)',
    dataIndex: 'time',
    key: 'time',
  },
  // {
  //   title: '경유지',
  //   dataIndex: 'stops',
  //   key: 'stops',
  // },
];

export const challengeTableColumns = [
  {
    title: 'no',
    dataIndex: 'chNo',
    key: 'chNo',
  },
  {
    title: '챌린지이름',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: '시작일',
    dataIndex: 'startDate',
    key: 'startDate',
  },
  {
    title: '종료일',
    dataIndex: 'endDate',
    key: 'endDate',
  },
  {
    title: '호스트',
    dataIndex: 'memberNo',
    key: 'memberNo',
  },
  {
    title: '인원',
    dataIndex: 'personnel',
    key: 'personnel',
  },
  {
    title: '비밀설정',
    dataIndex: 'blind',
    key: 'blind',
  },
];



