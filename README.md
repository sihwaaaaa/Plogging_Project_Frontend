<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a name="readme-top"></a>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->


<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->

<!-- PROJECT LOGO -->
<br />
<div align="center">
 

<h3 align="center">SNS와 플로깅을 동시에! 줍깅</h3>
![logo](https://github.com/plogging-project/Plogging_Project_Frontend/assets/132035168/9f943cb5-5d5c-4884-8002-6c781abcfb91)
  <p align="center">

    <br>
    <p>작업기간 : 2023.03.24~2023.04.26</p>
    vcs worked on svn
    <br>
  </p>
  <a href="https://pl.flatjava.co.kr/" target="_blank">View Demo</a>
</div>

<!-- ABOUT THE PROJECT -->
## About The Project

<img src="src/image/finalIndex.png" >

<br>
React, React Template <br>
파이널 프로젝트 <br>
프론트엔드 -> React를 활용하여 줍깅 사이트 구현

### Built With
<img src="https://img.shields.io/badge/mariaDB-lightgray?style=flat&logo=mariadb&logoColor=white"/><br>
<img src="https://img.shields.io/badge/React-lightgray?style=flat&logo=React&logoColor=61DAFB"/><br>


<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

프로젝트를 복제하여 로컬에서 설정하는 방법에 대한 설명 입니다. <br>

### 사전준비

#### 저장소 복제
   ```sh
   git clone https://github.com/plogging-project/Plogging_Project_Frontend.git
   ```

#### 데이터베이스 구성

  <img alt="ERD" src="src/image/ERD.png" width="500">

#### 데이터베이스 테이블 생성 쿼리

  <details>
    <summary>query</summary>  

```
create table hibernate_sequence
(
    next_not_cached_value bigint(21)          not null,
    minimum_value         bigint(21)          not null,
    maximum_value         bigint(21)          not null,
    start_value           bigint(21)          not null comment 'start value when sequences is created or value if RESTART is used',
    increment             bigint(21)          not null comment 'increment value',
    cache_size            bigint(21) unsigned not null,
    cycle_option          tinyint(1) unsigned not null comment '0 if no cycles are allowed, 1 if the sequence should begin a new cycle when maximum_value is passed',
    cycle_count           bigint(21)          not null comment 'How many cycles have been done'
);

create table tbl_badge
(
    badgeNo  bigint auto_increment comment '뱃지 번호' primary key,
    name     varchar(100) null comment '뱃지 이름(등급 이름)',
    point    bigint       null comment '뱃지달성포인트 (회원 누적포인트에 따라 뱃지 아이콘 변경)',
    minPoint bigint       null
);

create table tbl_location
(
    locationNo bigint auto_increment comment '거점 번호' primary key,
    locationX  double        not null comment '거점 x좌표',
    locationY  double        not null comment '거점 y좌표',
    type       varchar(100)  not null comment '유형(거점/쓰레기통)',
    detail     varchar(1000) null comment '상세설명',
    addr       varchar(1000) null comment '위치주소'
);

create table tbl_map
(
    mapNo        bigint auto_increment comment '지도번호' primary key,
    startX       double       null comment '시작x좌표',
    startY       double       null comment '시작y좌표',
    endX         double       null comment '끝x좌표',
    endY         double       null comment '끝y좌표',
    courseName   varchar(200) null comment '코스명',
    courseDetail text         null comment '코스설명',
    addr         varchar(200) null comment '자치구(주소)',
    distance     double       null comment '총 거리',
    time         bigint       null comment '소요시간'
);

create table tbl_member
(
    memberNo      bigint auto_increment comment '회원 번호' primary key,
    userId        varchar(500)                           not null comment '아이디',
    password      varchar(800)                           null comment '비밀번호',
    userName      varchar(500)                           null comment '이름',
    email         varchar(500)                           null comment '이메일',
    regDate       datetime   default current_timestamp() null comment '등록일자',
    nickName      varchar(100)                           null comment '닉네임',
    birth         datetime                               null comment '생년월일',
    gender        varchar(50)                            null comment '성별',
    authProvider  varchar(500)                           null comment '공급자',
    address       varchar(1000)                          null comment '주소(시/군/구)',
    addressDetail varchar(1000)                          null comment '상세 주소',
    intro         varchar(1000)                          null comment '프로필 자기소개',
    enabled       tinyint(1) default 1                   null
);

create table tbl_auth
(
    authNo    bigint auto_increment primary key,
    memberNo  bigint       null,
    authority varchar(500) null,
    constraint tbl_auth_ibfk_1
        foreign key (memberNo) references plogging.tbl_member (memberNo)
);

create table plogging.tbl_challenge
(
    chNo      bigint auto_increment comment '챌린지 번호' primary key,
    blind     tinyint  default 0                   null comment '공개/비공개',
    memberNo  bigint                               null comment '챌린지 리더',
    title     varchar(600)                         not null comment '챌린지 제목',
    content   text                                 not null comment '챌린지 소개',
    personnel bigint                               not null comment '챌린지원 수',
    regDate   datetime default current_timestamp() null comment '만든날짜',
    startDate datetime default current_timestamp() null comment '시작날짜',
    endDate   datetime default current_timestamp() null comment '끝나는날짜',
    status    varchar(500)                         null,
    constraint tbl_challenge_ibfk_1
        foreign key (memberNo) references plogging.tbl_member (memberNo)
);

create table tbl_challengemember
(
    cmemberNo bigint auto_increment comment '챌린지맴버 번호' primary key,
    chNo      bigint                               null comment '챌린지 번호fk',
    memberNo  bigint                               null comment '챌린지원 번호',
    regDate   datetime default current_timestamp() null comment '가입날짜',
    constraint tbl_challengemember_ibfk_1
        foreign key (chNo) references plogging.tbl_challenge (chNo),
    constraint tbl_challengemember_ibfk_2
        foreign key (memberNo) references plogging.tbl_member (memberNo)
);

create table tbl_challengeschedule
(
    scheduleNo bigint auto_increment comment '챌린지스케쥴 번호' primary key,
    chNo       bigint                               null comment '챌린지번호fk',
    startDate  datetime                             null comment '플로깅시작시간',
    endDate    datetime                             null comment '플로깅끝나는시간',
    regDate    datetime default current_timestamp() not null comment '챌린지스케쥴 생성날짜',
    mapNo      bigint                               null comment '추천경로번호',
    constraint tbl_challengeschedule_ibfk_1
        foreign key (chNo) references plogging.tbl_challenge (chNo),
    constraint tbl_challengeschedule_ibfk_2
        foreign key (mapNo) references plogging.tbl_map (mapNo)
);

create table tbl_friend
(
    friendNo   bigint auto_increment primary key,
    fromMember bigint      null,
    toMember   bigint      null,
    status     varchar(50) null comment '1. PENDING : 플친 요청 대기 상태
2. FRIEND : 서로 플친 상태
3. BLOCK : 차단 상태',
    constraint tbl_friend_ibfk_1
        foreign key (fromMember) references plogging.tbl_member (memberNo),
    constraint tbl_friend_ibfk_2
        foreign key (toMember) references plogging.tbl_member (memberNo)
);

create table tbl_messageroom
(
    roomNo   bigint auto_increment comment '채팅방번호'
        primary key,
    roomName varchar(500) null comment '채팅방 이름'
);

create table tbl_message
(
    msgNo    bigint auto_increment comment '메세지번호'
        primary key,
    sendTime datetime default current_timestamp() not null comment '발송시간',
    chk      bigint   default 0                   not null comment '확인한 사람 수',
    content  varchar(1000)                        not null comment '내용',
    roomNo   bigint                               null comment '채팅방번호',
    sender   bigint                               null comment '발신자',
    constraint tbl_message_ibfk_1
        foreign key (roomNo) references plogging.tbl_messageroom (roomNo),
    constraint tbl_message_ibfk_2
        foreign key (sender) references plogging.tbl_member (memberNo)
);

create table tbl_plogging
(
    ploggingNo   bigint auto_increment comment '플로깅번호'
        primary key,
    type         varchar(100)                         not null comment '유형(제자리시작/목표지설정/추천경로/챌린지경로)',
    ploggingTime bigint   default 0                   null comment '이동시간',
    regDate      datetime default current_timestamp() null comment '플로깅 날짜',
    distance     double                               null comment '이동거리',
    status       tinyint  default 0                   null comment '성공여부',
    mapNo        bigint                               null,
    memberNo     bigint                               not null,
    constraint mapNo
        foreign key (mapNo) references plogging.tbl_map (mapNo),
    constraint memberNo
        foreign key (memberNo) references plogging.tbl_member (memberNo)
);

create table tbl_board
(
    bno        bigint auto_increment comment '게시글 번호' primary key,
    title      varchar(1000)                        not null comment '게시글 제목',
    content    text                                 null comment '게시글 내용',
    memberNo   bigint                               null comment '작성자',
    regDate    datetime default current_timestamp() null comment '작성일',
    updateDate datetime                             null comment '수정일',
    category   varchar(100)                         not null comment '카테고리
community
plogging',
    ploggingNo bigint                               null comment '플로깅번호',
    constraint tbl_board_FK
        foreign key (ploggingNo) references plogging.tbl_plogging (ploggingNo),
    constraint tbl_board_ibfk_1
        foreign key (memberNo) references plogging.tbl_member (memberNo)
);

create table tbl_attach
(
    attachNo bigint auto_increment comment '파일첨부 번호' primary key,
    uuid     varchar(1000) null comment '파일 고유이름',
    path     varchar(1000) null comment '경로',
    filename varchar(500)  null comment '파일명',
    bno      bigint        null comment '게시글 번호',
    chNo     bigint        null comment '챌린지 번호',
    badgeNo  bigint        null comment '뱃지 번호',
    fileSize bigint        null,
    constraint tbl_attach_ibfk_1
        foreign key (bno) references plogging.tbl_board (bno),
    constraint tbl_attach_ibfk_2
        foreign key (chNo) references plogging.tbl_challenge (chNo),
    constraint tbl_attach_ibfk_3
        foreign key (badgeNo) references plogging.tbl_badge (badgeNo)
);

create table tbl_notification
(
    notiNo      bigint auto_increment primary key,
    type        varchar(100)                         null,
    sender      bigint                               null,
    receiver    bigint                               null,
    sendDate    datetime default current_timestamp() null,
    receiveDate datetime                             null,
    ploggingNo  bigint                               null,
    messageNo   bigint                               null,
    friendNo    bigint                               null,
    challengeNo bigint                               null,
    constraint tbl_notification_ibfk_1
        foreign key (sender) references plogging.tbl_member (memberNo),
    constraint tbl_notification_ibfk_2
        foreign key (receiver) references plogging.tbl_member (memberNo),
    constraint tbl_notification_ibfk_3
        foreign key (ploggingNo) references plogging.tbl_plogging (ploggingNo),
    constraint tbl_notification_ibfk_4
        foreign key (messageNo) references plogging.tbl_message (msgNo),
    constraint tbl_notification_ibfk_5
        foreign key (friendNo) references plogging.tbl_friend (friendNo),
    constraint tbl_notification_ibfk_6
        foreign key (challengeNo) references plogging.tbl_challenge (chNo)
);

create table tbl_reply
(
    rno     bigint auto_increment comment '댓글 번호' primary key,
    reply   varchar(1000)                        not null comment '댓글 내용',
    replyer bigint                               null comment '작성자',
    regDate datetime default current_timestamp() null comment '작성일',
    bno     bigint                               null comment '게시글 번호',
    constraint tbl_reply_ibfk_1
        foreign key (replyer) references plogging.tbl_member (memberNo),
    constraint tbl_reply_ibfk_2
        foreign key (bno) references plogging.tbl_board (bno)
);

create table tbl_report
(
    reportNo bigint auto_increment comment '신고글 번호' primary key,
    writer   bigint                               null comment '신고자',
    regDate  datetime default current_timestamp() null comment '작성일',
    category varchar(100)                         not null comment '신고분류 0: 스팸, 1: 음란행위, 2: 성격에 맞지 않는 글, 3: 과도한 욕설, 4: 광고, 5: 중복글, 6:욕설/생명경시/혐오/차별적/불쾌한표현(회원대상)',
    content  text                                 not null comment '신고 내용',
    bno      bigint                               null comment '게시글 번호',
    rno      bigint                               null comment '댓글 번호',
    mno      bigint                               null comment '회원 번호',
    constraint tbl_report_ibfk_1
        foreign key (writer) references plogging.tbl_member (memberNo),
    constraint tbl_report_ibfk_2
        foreign key (bno) references plogging.tbl_board (bno),
    constraint tbl_report_ibfk_3
        foreign key (rno) references plogging.tbl_reply (rno),
    constraint tbl_report_ibfk_4
        foreign key (mno) references plogging.tbl_member (memberNo)
);

create table tbl_reward
(
    rewardNo bigint auto_increment primary key,
    type     varchar(300)  not null,
    name     varchar(1000) null,
    detail   varchar(1000) null
);

create table tbl_pointhistory
(
    pointNo  bigint auto_increment primary key,
    memberNo bigint                               null,
    type     varchar(300)                         not null,
    point    bigint                               null,
    rewardNo bigint                               null,
    regDate  datetime default current_timestamp() null,
    status   tinyint  default 0                   null,
    constraint tbl_pointhistory_ibfk_1
        foreign key (memberNo) references plogging.tbl_member (memberNo),
    constraint tbl_pointhistory_ibfk_2
        foreign key (rewardNo) references plogging.tbl_reward (rewardNo)
);

create table tbl_roommember
(
    rmemberNo bigint not null primary key,
    memberNo  bigint null,
    roomNo    bigint null,
    constraint FKe9vdr10crxou89u7gi6o1yt53
        foreign key (memberNo) references plogging.tbl_member (memberNo),
    constraint FKof0705gmpkw39s6xqpq0yyirw
        foreign key (roomNo) references plogging.tbl_messageroom (roomNo)
);

create table tbl_schedulemember
(
    smno       bigint auto_increment comment '스케쥴맴버 리스트 번호' primary key,
    scheduleNo bigint      null comment '챌린지스케쥴 번호',
    chNo       bigint(100) null comment '챌린지번호',
    memberNo   bigint(100) null comment '챌린지원번호',
    constraint tbl_schedulemember_ibfk_2
        foreign key (scheduleNo) references plogging.tbl_challengeschedule (scheduleNo),
    constraint tbl_schedulemember_ibfk_3
        foreign key (chNo) references plogging.tbl_challenge (chNo),
    constraint tbl_schedulemember_ibfk_4
        foreign key (memberNo) references plogging.tbl_member (memberNo)
);

create table tbl_stopover
(
    viaPointId  bigint auto_increment comment '경유지 번호' primary key,
    viaX        double           not null comment '경유지 x좌표',
    viaY        double           not null comment '경유지 y좌표',
    mapNo       bigint           null comment '지도번호',
    stopoverIdx bigint default 0 not null comment '경유지 순서',
    constraint tbl_stopover_ibfk_1
        foreign key (mapNo) references plogging.tbl_map (mapNo)
);

create table tbl_usermap
(
    userMapNo bigint auto_increment comment 'userMap번호' primary key,
    mapNo     bigint null comment '지도번호',
    memberNo  bigint null comment '회원번호',
    constraint tbl_usermap_ibfk_1
        foreign key (mapNo) references plogging.tbl_map (mapNo),
    constraint tbl_usermap_ibfk_2
        foreign key (memberNo) references plogging.tbl_member (memberNo)
);
```






  </details>

### 설치

1. yarn 1.22.19
2. HexaDash ReactTemplate : 0.1.0
3. node 16.15.0
4. npm install @craco/craco --save
5. MariaDB
6. Tomcat9

### Issue
<pre>

- 사용중이던 node 17.xx 버전과 리액트 템플릿 버전이 호환 불가.
  - nvm 설치하여 버전을 17.xx -> 16.xx 버전으로 다운그레이드 및 craco 설치
 
</pre>



<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## 사용방법 및 기능소개
#### 기능소개
<pre>
1. plogging
  - geolocation API 활용, 자신의 현재위치 확인
  - 산책로 api를 활용, 추천경로 표시 및 검색
  - 산책로의 위치 및 산책 시 소요시간 표시
  - 플로깅 시작하고 소요시간 표시
  - 플로깅 끝내기 시 글 작성 가능(사진 첨부)

2. board(함께하기, 챌린지)
  - 카데고리를 일상, 플로깅으로 구분
  - 글쓰기(글 작성 시 파일첨부, thumbnail)
  - 글수정
  - 글삭제

3. reply
  - 댓글 작성
  - 댓글 삭제

4. challenge
  - 챌린지 만들기
    - 제목, 소개 글, 참가인원, 챌린지 날짜 입력
    - 플로깅 일정추가, 챌린지 참가
  - 챌린지 삭제
  - 인원 마감된 챌린지 확인

5. 관리자
  - 회원 관리
  - 리워드 업체 관리
  - 포인트 히스토리 관리
  - 게시글 관리
  - 게시글 관리
  - 플로깅 히스토리 관리
  - 추천경로 관리
  - 챌린지 관리
  - 각 카데고리 별 페이징 처리

6. 리워드
  - 포인트 적립 안내
    - 회원의 누적 포인트, 등급과 등급에 따른 이미지
  - 랭킹
    - 전체 회원의 랭킹, ID, 누적 포인트, 등급 확인
  - 랜덤박스
    - 현재 포인트, 27종 구성품 슬라이더
    - 랜덤박스 신청
  - 기부하기
    - 현재포인트, 총 도네이션 포인트
    - 기부처 출력
    - 기부하기

7. 회원
  - 회원가입 : 아이디, 비밀번호, 비밀번호 확인, 이름, 닉네임, 성별, 생년월일, 주소, 이메일 인증
  - 로그인 : 회원가입한 아이디, 비밀번호 로그인 가능
  - 로그아웃
  - 소셜 로그인 : 카카오, 네이버, 구글 로그인
  - 아이디/비밀번호 확인 : 이름, 이메일 인증
  - 마이페이지
    - 챌린지
      참여중인 챌린지, 참여했던 챌린지 조회
    - 플로깅
      추천경로, 나만의 경로 조회
    - 나의 글
      플로깅, 커뮤니티 작성 조회
    - 포인트 내역
      플로깅, 챌린지, 랜덤박스 신청, 기부하기 조회 가능

8. 플친/채팅
  - 회원 검색
  - 플친 신청
  - 플친 거절, 차단, 끊기
  - 플친 받은 요청
  - 플친 된 유저간 채팅
  
</pre>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ROADMAP -->
## 요구사항

### 작업목록
- [x] 작업완료
- [ ] 작업예정

#### 회원
- [x] 회원가입
    - [x] 회원 가입(Email API를 이용한 메일 인증)
    - [x] 아이디 중복 체크
    - [x] BCrypt 사용하여 비밀번호 암호화
    - [x] 주소 API 활용
- [x] 로그인
    - [x] 자동 로그인
    - [x] 소셜 로그인
- [x] 회원 정보 찾기
    - [x] 아이디 찾기
    - [x] 비밀번호 찾기
- [x] 마이페이지
    - [x] 회원 정보 확인
    - [x] 나의 챌린지
    - [x] 플로깅 코스
    - [x] 나의 글
    - [ ] 신고 내역
    - [x] 포인트 사용 내역
    - [x] 회원 정보 수정
    - [x] 비밀번호 재설정
    - [x] 회원 탈퇴
- [x] 관리자
    - [ ] 신고관리
    - [x] 회원관리
    - [ ] 현황도표
- [x] 플로깅
    - [x] 플로깅 시작하기
    - [x] 플로깅 그만하기
    - [x] 플로깅 지도
    - [x] 추천 경로
    - [ ] 버리깅
    - [ ] 거점
- [x] 커뮤니티
    - [x] 게시글 조회
    - [x] 게시글 작성
    - [x] 게시글 수정
    - [x] 게시글 삭제
    - [ ] 게시글 신고
    - [x] 댓글 조회
    - [x] 댓글 작성
    - [x] 댓글 삭제
    - [ ] 댓글 신고
    - [x] 첨부파일
- [x] 챌린지
    - [x] 챌린지 만들기
    - [x] 챌린지 삭제하기
    - [ ] 챌린지 검색하기
    - [x] 챌린지 상세보기
    - [ ] 챌린지 추천하기
    - [x] 챌린지 가입하기
    - [ ] 챌린지 나가기
    - [x] 챌린지원 리스트 보기
    - [x] 챌린지 일정관리 생성
    - [x] 챌린지 일정관리 삭제
    - [x] 챌린지 일정 참여
    - [ ] 챌린지 일정 참여취소
    - [x] 챌린지 일정 리스트
    - [x] 챌린지 리스트
    - [x] 챌린지 상태
- [x] 리워드
    - [x] 포인트 적립
    - [x] 포인트 조회
    - [x] 포인트 사용
    - [x] 기부처 관리
    - [x] 랜덤박스 신청
    - [x] 회원등급 및 뱃지
- [x] 플친
    - [x] 플친 조회
    - [x] 플친 맺기
    - [x] 플친 끊기
- [x] 채팅
    - [x] 채팅 생성
    - [x] 채팅 조회
- [x] 플친 알림
    - [ ] 플친 알림
    - [ ] 채팅 알림
    - [ ] 챌린지 알림


        <br>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Collaborator
Team Project
 <pre>
공통 : DB설계, 디지털 프로토 타이핑, 서류작성 
(요구사항 정의서, 일정관리, 업무 분장, 테이블 명세서)

천은경 : <b>조장</b>, 커뮤니티, 플친/채팅, 관리자

김연재 : 회원

이시화 : 플로깅

김민수 : 챌린지

이재원(본인) : 리워드
	 
</pre>

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- LICENSE -->
## Etc
#### 작업 서류
<a href="https://onedrive.live.com/edit.aspx?resid=39026BE146DB1865!9909&ithint=file%2cxlsx&wdo=2&authkey=!AHkkaw2eZGgqXIE">
  요구사항 정의서, 일정관리, test case, 테이블 명세서, 인터페이스 명세서 등
</a>
<img src="src/image/요구사항정의서.png"> <br>
위 링크 이동시 하단 sheet를 클릭하여 서류 이동할 수 있음

<br>

#### PPT

<details>
<summary>PPT Images</summary>

![Slide9](https://github.com/plogging-project/Plogging_Project_Frontend/assets/132035168/d7de8076-a676-4c57-84e9-bc2be84e8808)
![Slide10](https://github.com/plogging-project/Plogging_Project_Frontend/assets/132035168/e2edc8dc-c504-43dc-9e33-91dea7dc9ad6)
![Slide11](https://github.com/plogging-project/Plogging_Project_Frontend/assets/132035168/9089f120-ae16-438b-831f-4b234a04de7a)
![Slide12](https://github.com/plogging-project/Plogging_Project_Frontend/assets/132035168/7c01f89e-68e7-4a25-9be9-e510dd61a64f)
![Slide13](https://github.com/plogging-project/Plogging_Project_Frontend/assets/132035168/a1e9b553-873a-425d-912e-64e35b1c3082)
![Slide14](https://github.com/plogging-project/Plogging_Project_Frontend/assets/132035168/b71607b7-6d52-4231-9fc2-daed3c733294)
![Slide15](https://github.com/plogging-project/Plogging_Project_Frontend/assets/132035168/75a0091d-8ba9-48c3-b3d7-240c65ea8d77)
![Slide16](https://github.com/plogging-project/Plogging_Project_Frontend/assets/132035168/6c80c348-9642-4260-9293-964484a9ed26)
![Slide17](https://github.com/plogging-project/Plogging_Project_Frontend/assets/132035168/059d3be4-904e-4ad0-9546-204e1f956717)
![Slide18](https://github.com/plogging-project/Plogging_Project_Frontend/assets/132035168/968807d3-4002-4f1c-b0d3-700605cd1586)
![Slide19](https://github.com/plogging-project/Plogging_Project_Frontend/assets/132035168/dc3597d6-4dd3-4e13-b672-69badfc2ef83)
![Slide20](https://github.com/plogging-project/Plogging_Project_Frontend/assets/132035168/ca0862d9-934e-468a-bf1b-f2ade6051e14)
![Slide21](https://github.com/plogging-project/Plogging_Project_Frontend/assets/132035168/e21f184e-1289-4928-ada7-0310bcff8813)
![Slide22](https://github.com/plogging-project/Plogging_Project_Frontend/assets/132035168/d8ca3609-5cbc-4d6b-93dd-c5c594924cb0)
![Slide23](https://github.com/plogging-project/Plogging_Project_Frontend/assets/132035168/1d3233aa-9c5d-4c55-8984-49e272dc6852)
![Slide24](https://github.com/plogging-project/Plogging_Project_Frontend/assets/132035168/accd2655-f166-4e4f-972f-2328a9311a3b)
![Slide25](https://github.com/plogging-project/Plogging_Project_Frontend/assets/132035168/5423c601-5c83-46ff-b1d3-10c99bc2bfd6)
![Slide26](https://github.com/plogging-project/Plogging_Project_Frontend/assets/132035168/efd06cb0-2b03-412f-b240-29e7ec4180f5)
![Slide27](https://github.com/plogging-project/Plogging_Project_Frontend/assets/132035168/8be3e841-3028-480a-b006-b736e4fdacbd)
![Slide28](https://github.com/plogging-project/Plogging_Project_Frontend/assets/132035168/fbeeeb0c-1ae9-435d-a7f2-2d8a0ae3e67c)
![Slide29](https://github.com/plogging-project/Plogging_Project_Frontend/assets/132035168/512fd70b-3d6a-4732-89e4-ce9a5b2e0110)
![Slide30](https://github.com/plogging-project/Plogging_Project_Frontend/assets/132035168/545730e5-7845-444a-b308-58dec986296f)
![Slide31](https://github.com/plogging-project/Plogging_Project_Frontend/assets/132035168/c8af5681-566d-4194-b8d5-08be00be29b4)
![Slide32](https://github.com/plogging-project/Plogging_Project_Frontend/assets/132035168/59d15bb6-bb9c-4e14-ba87-3609d9f8d07e)
![Slide33](https://github.com/plogging-project/Plogging_Project_Frontend/assets/132035168/c79bd34e-98f8-4dda-b37b-92c196539a9b)
![Slide34](https://github.com/plogging-project/Plogging_Project_Frontend/assets/132035168/ba543817-94aa-4262-b85b-166a869e7196)
![Slide35](https://github.com/plogging-project/Plogging_Project_Frontend/assets/132035168/88a2fc4a-78db-4fa2-87be-7012f3186f69)
![Slide1](https://github.com/plogging-project/Plogging_Project_Frontend/assets/132035168/cb11e02f-1259-4d6b-9b17-228c714ab17e)
![Slide2](https://github.com/plogging-project/Plogging_Project_Frontend/assets/132035168/31568e08-01f7-4080-812f-2a227c53f2e6)
![Slide3](https://github.com/plogging-project/Plogging_Project_Frontend/assets/132035168/ed6ab357-14be-4655-a786-9268c7ca2ff4)
![Slide4](https://github.com/plogging-project/Plogging_Project_Frontend/assets/132035168/1f5e2930-7d7b-4ef9-8cf3-6580ca10338e)
![Slide5](https://github.com/plogging-project/Plogging_Project_Frontend/assets/132035168/cbe6dc38-dc2c-4116-b5f5-89420d1e5b9c)
![Slide6](https://github.com/plogging-project/Plogging_Project_Frontend/assets/132035168/353c7a49-1965-4ce0-a949-05a7095dfff3)
![Slide7](https://github.com/plogging-project/Plogging_Project_Frontend/assets/132035168/af2e88c1-cb2b-44d3-91ec-b37ab63320ea)
![Slide8](https://github.com/plogging-project/Plogging_Project_Frontend/assets/132035168/8cfbbeee-17b6-4886-88c2-fc90ecf997b9)

</details>

<br>

#### Digital Prototyping
<a href="https://docs.google.com/presentation/d/1IbjVC4H1NNLV3bkpN1T8uRg6Sw3itWBEv_LJMcPvDXI/edit#slide=id.g2106b4b94ac_0_0"><a/>

### 프로젝트 후기
#### 천은경
<pre>
Backend SpringBoot와 Front React를 분리하여 기존과 다른 구현 방식을

경험할 수 있었습니다. 설계 과정에서 테이블과 Entity의 관계성을 익힐 수 있었고

작업과정에서 Spring JPA의 사용과 Security의 구조에 대한 이해도를

높일 수 있었습니다. 팀원의 갑ㅈ가스러운 공백, 구현 도구의 문제, 무료 api의 한계

및 미흡한 초기설계, 일정 지연 등 단순 구현의 예외 뿐만 아니라 

팀과 프로젝트 전반의 상황을 팀장으로 맞닥 뜨리면서, 초기 설계와

예외에 대한 대처 계획이 매우 중요함을 깨달았습니다.
</pre>

#### 김민수
<pre>
JPA를 사용하면서 더욱 간편하고 간경해졌지만 그만큼 사전지식을 요하는 작업이었습니다

또한 리액트와 연동하고 CRUD를 구현하면서 리액트에 대한 지식과 js에 대한 이해도가

올라가는 동시에 더욱 깊은 지식이 없다는 것이 아쉬웠습니다.

구현되어야할 부분이 같이 되었더라면 더욱 완성도 있는 챌린지를 만들 수

있었을 거라는 아쉬움이 남습니다.
</pre>
#### 박연재
<pre>
여러 징검다리 역할을 하고 있는 회원을 맡았는데

여러 역할 중에서도 우선적으로 중요한 역할이다보니 좀 더 긴장이 되었습니다.

시큐리티라는 보안 요소를 회원에 도입해서 구현을 한 것이 때로는 어렵기도 했지만

재미있었고 중요한 경험을 했다는 생각이 들었습니다.
</pre>
#### 이시화
<pre>
프로젝트에서 어렵고 중요한 핵심 기능을 맡았고 api를 적극활용해야 했기에 

어려움이 많았지만 오히려 그만큼 성장할 수 있는 시간 이었습니다.

또한 난이도가 높았던 것 만큼 재미도 있었기에 후순위였던 기능들도

구현해 보고 싶습니다.
</pre>
#### 이재원
<pre>
이번 프로젝트를 진행하면서 데이터를 어떻게 가굥시켜야 할지, 데이터간

관계를 설계하는 데 있어 기초지식의 필요성을 느끼게 되었습니다.

JPA나 리액트의 기초를 적용해가면서 좀 더 빨리 적응했더라면 완성도가

높아지지 않았을까 하는 아쉬움이 남습니다.
</pre>

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Lee JaeWon - wodnjsdl01@gmail.com

<a href="https://pl.flatjava.co.kr/" target="_blank">Demo Link</a>

<a href="https://portfolio.flatjava.co.kr/" target="_blank">Portfolio Link</a>

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

읽어주셔서 감사합니다 더욱더 노력하겠습니다!

### References
README Template : [README-Template](https://github.com/othneildrew/Best-README-Template)<br>
Reference : 
[헬로깅](https://www.helloging.co.kr/)<br>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

[![Hits](https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2Fyangchanyong%2FAWS_fullstack_semi_project&count_bg=%23A1EF67&title_bg=%2300FF57&icon=&icon_color=%23E7E7E7&title=hits&edge_flat=false)](https://hits.seeyoufarm.com)
