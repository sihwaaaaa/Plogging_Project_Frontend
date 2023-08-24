# 🏃 줍깅-지구와 나를 위한 발걸음
![logo](https://github.com/plogging-project/Plogging_Project_Frontend/assets/132035168/42b5f42b-6c50-4b3b-9330-e35abd2b1865)

![jubging](https://sihwaaaaa.github.io/img/ploging.gif)  

### ✔️Language

  <img src="https://img.shields.io/badge/java-007396?style=for-the-badge&logo=java&logoColor=white"> <br>
  <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">
  <img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white">
  <img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white">

### ✔️Framework & Library

   <img src="https://img.shields.io/badge/Spring MVC-6DB33F?style=for-the-badge&logo=spring&logoColor=white">   
    <img src="https://img.shields.io/badge/Spring Boot-6DB33F?style=for-the-badge&logo=Spring Boot&logoColor=white">  
    <img src="https://img.shields.io/badge/Spring Security-6DB33F?style=for-the-badge&logo=Spring Security&logoColor=white"> <br>
    <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black">
    <img src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white"> 
    <img src="https://img.shields.io/badge/react router-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white">

### ✔️DataBase

   <img src="https://img.shields.io/badge/mariaDB-003545?style=for-the-badge&logo=mariaDB&logoColor=white">

### ✔️Infrastructure

   <img src="https://img.shields.io/badge/Amazon EC2-FF9900?style=for-the-badge&logo=Amazon EC2&logoColor=white">
    <img src="https://img.shields.io/badge/Nginx-009639?style=for-the-badge&logo=Nginx&logoColor=white">
    <img src="https://img.shields.io/badge/apache tomcat-F8DC75?style=for-the-badge&logo=apachetomcat&logoColor=white">

---
### [▶️Backend Github](https://github.com/sihwaaaaa/Plogging_Project_Backend)

### [▶️Frontend Github](https://github.com/sihwaaaaa/Plogging_Project_Frontend)

### [▶️View Demo](https://github.com/plogging-project/Plogging_Project_Frontend/assets/132035168/42b5f42b-6c50-4b3b-9330-e35abd2b1865)


<br>

## ✔️ 목차

1. [ 줍깅 프로젝트 ❓](#-줍깅-프로젝트)
    - [프로젝트 개요](#프로젝트-개요)   
    - [플로깅이란?](#플로깅이란)   
    - [줍깅 사용가이드](#줍깅-사용가이드)
2. [설계 🛠](#-설계)
    - [요구사항 정의서](#요구사항-정의서)   
    - [프로토 타이핑](#프로토-타이핑)   
    - [데이터 베이스 구조](#데이터-베이스-구조)\
3. [ 줍깅 주요 기능 ⭐️](#-줍깅-주요-기능)
4. [이슈사항 및 리뷰](#이슈사항-및-리뷰)
    - [발생 이슈](#발생-이슈)
    - [리뷰](#리뷰)
5. [팀 소개 👬](#-팀-소개)
6. [활용 API](#활용-API)

<br>

## ❓ 줍깅 프로젝트  
### 프로젝트 개요
- 개발기간 : 2022.05.24 ~ 2022.07.03
- 버전 정보 :
    - Java-1.8v
    - SpringBoot 2.7.14(SNAPSHOT)
    - Node.js-16.15.0v
- 줍깅 프로젝트?
     - 건강과 환경 두 마리 토끼를 잡을 수 있는 플로깅에 대한 접근성을 높이고, 함께하는 환경 운동을 고취시킬 수 있는 웹 어플리케이션
     - 다양한 외부 API의 사용과 공공데이터 활용
### 플로깅이란?
- 플로깅은 ‘이삭을 줍는다’는 뜻인 스웨덴어 plocka upp과 영어 단어 jogging(조깅)이 합쳐져 생긴 합성어로, 산책을 하며 쓰레기를 줍는 환경운동입니다. 국내에서는 이를 '줍다'와 '조깅'을 결합한 '줍깅'으로 부르고 있습니다.
### 줍깅 사용가이드
![jubging_guide1](https://sihwaaaaa.github.io/img/jubging_guide.png) 
![jubging_guide2](https://sihwaaaaa.github.io/img/jubging_guide2.png) 

<br>

## 🛠 설계   
### 요구사항 정의서

[요구사항 정의서 문서 엑셀 파일](https://onedrive.live.com/edit.aspx?resid=39026BE146DB1865!9909&ithint=file%2cxlsx&authkey=!AHkkaw2eZGgqXIE)
  - [x] 작업완료
  - [ ] 작업예정
---
회원
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
---
- [x] 관리자
    - [ ] 신고관리
    - [x] 회원관리
    - [ ] 현황도표
---
- [x] 플로깅
    - [x] 플로깅 시작하기
    - [x] 플로깅 그만하기
    - [x] 플로깅 지도
    - [x] 추천 경로
    - [ ] 버리깅
    - [ ] 거점
---
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
---
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
---
- [x] 리워드
    - [x] 포인트 적립
    - [x] 포인트 조회
    - [x] 포인트 사용
    - [x] 기부처 관리
    - [x] 랜덤박스 신청
    - [x] 회원등급 및 뱃지
---
- [x] 플친
    - [x] 플친 조회
    - [x] 플친 맺기
    - [x] 플친 끊기
---
- [x] 채팅
    - [x] 채팅 생성
    - [x] 채팅 조회
---
- [x] 플친 알림
    - [ ] 플친 알림
    - [ ] 채팅 알림
    - [ ] 챌린지 알림
---

### 프로토 타이핑

- 페이퍼 프로토 타이핑 형식으로 진행

![prototyping](https://sihwaaaaa.github.io/img/prototyping.jpg)  
![prototyping](https://sihwaaaaa.github.io/img/prototyping.gif)  

### 데이터 베이스 구조
![ERD](https://sihwaaaaa.github.io/img/ERD.png)  

<br>

## ⭐️줍깅 주요 기능

### 실시간 위치 추적 서비스

- 단말기의 실시간 위치를 감지하여 사용자의 현재 위치를 제공합니다. GeoLocation을 통해 받아온 좌표를 Tmap 지도에 마커로 나타냅니다.
- 사용자는 본인이 움직이는 위치를 지속적으로 확인하며 플로깅을 할 수 있습니다.

### 경유지를 포함한 위치 정보를 도보경로로 지도에 표시

- 공공데이터 서울 두드림길 코스 API를 활용하여 데이터를 추출하였습니다. 코스를 분류하고 각 코스의 경유지를 순서대로 설정하여 데이터를 가공하였습니다. 해당 데이터의 좌표계를 Tmap API에서 사용하는 좌표계로 변환하였습니다.
- 사용자는 추천 플로깅 경로를 지도에서 본인의 위치와 함께 확인할 수 있습니다.

### 시큐리티와 소셜로그인이 적용된 회원 서비스

- 현재 위치라는 민감한 정보가 담긴 애플리케이션의 특성을 고려하여, 시큐리티를 적용함으로써 안전한 회원 서비스를 마련하였습니다.
- 더불어 다양한 소셜로그인을 통해 편리한 회원 시스템을 구축하였습니다.

### SNS형 친구 시스템과 메시지 기능

- 함께하고 싶은 플로거를 찾을 수 있는 플친(플로깅 친구)시스템을 제공합니다. 사용자는 원하는 플로거에게 플친을 신청하고, 신청을 수락 및 거절할 수 있습니다. 또 원하지 않는 플로거를 차단하여 더 이상의 위험을 막을 수 있습니다.
- 사용자는 나의 플친에게 메시지를 보내며 플친과 커뮤니케이션할 수 있습니다.

### 모바일 웹 사용을 고려한 반응형 디자인

- 조깅을 하며 쓰레기를 줍는 플로깅의 특성을 고려하여, 웹 애플리케이션의 UI/UX를 다양한 이동 통신 단말기의 사이즈를 맞춘 반응형 디자인으로 제작하였습니다.
- 사용자는 언제 어디에서나 편리하게 줍깅 웹 애플리케이션을 이용할 수 있습니다. 향후 모바일 앱으로 제작 고려 중에 있습니다.

### 지속적인 참여 유도를 위한 리워드와 챌린지 프로그램

- 환경운동 참여를 고취할 수 있도록 지속적인 참여를 위한 동기를 다양하게 마련하였습니다.
- 사용자는 챌린지 서비스를 통하여 혼자가 아닌 여럿이서, 추천경로 및 기간을 설정하여 목표로 삼고 챌린지를 진행할 수 있습니다.
- 또한 사용자는 플로깅 종료 후 인증글을 커뮤니티에 남기면 포인트를 지급받습니다. 지급받은 포인트는 리워드를 구매하는 데 사용될 수 있습니다. 리워드 서비스는 기부하기와 램덤박스로 제공됩니다.

### 플로깅 인증글 커뮤니티

- REST API가 활용된 회원제 게시판 형태입니다.
- 사용자는 플로깅 이후 플로깅 인증샷 커뮤니티에 플로깅 게시글을 남길 수 있습니다. 플로깅이 아닌 일상글을 커뮤니티에 공유하는 것도 가능합니다. 다른 사용자의 글에 댓글을 남기며 소통하고, 다른 사용자의 글에서 작성자의 프로필을 확인할 수 있습니다.


<br>   

## 이슈사항 및 리뷰

### 발생 이슈

 ❗️ **공공데이터와 TMAP API 사용 좌표 사용 괴리**
  - 공공데이터의 좌표가 API에서 요청하는 위경도 값이 아닌 gs80tm 좌표 사용 -> 좌표마다 일일이 API에 변환 요청을 할 경우 과다한 호출 우려

✔️ **TMAP API의 좌표변환 기능을 사용하여 위경도 좌표로 변환된 값을 DB에 저장**

```
// 이 코드에서는 전에 db에 저장한 데이터를 불러와서 tmapAPI에 좌표변환을 요청합니다 
// (GRS80TM(기존 좌표계 - Transverse_Mercator 투영법과 GRS_1980 타원체를 사용) => WGS84GEO(변환될 좌표계- 경위도)) 
// 응답 값들을 기존 디비 값에 업데이트 시킵니다

  const location = useLocation();
  const route = location.state;
  const [result, setResult] = useState({ lon: null, lat: null });
  const [startX, setStartX] = useState(route.startX);
  const [startY, setStartY] = useState(route.startY);
  function coordConvert(lat, lon) {
    axios
      .get(
        `https://apis.openapi.sk.com/tmap/geo/coordconvert?version=1&format=json&callback=result&fromCoord=GRS80TM&lon=${lon}&lat=${lat}&appKey=앱키`,
      )
      .then(function (response) {
        const resultCoordinate = response.data.coordinate;
        const lon2 = resultCoordinate.lon;
        const lat2 = resultCoordinate.lat;
        const result = { lon: lon2, lat: lat2 };
        setResult(result);
        console.log(result);
      })
      .catch(function (error) {
        console.error('code:', error.response.status);
        console.error('message:', error.response.data);
        console.error('error:', error.message);
      });
  }

  useEffect(() => {
    axios
      .get(
        `https://apis.openapi.sk.com/tmap/geo/coordconvert?version=1&format=json&callback=result&fromCoord=GRS80TM&lon=${startY}&lat=${startY}&appKey=앱키`,
      )
      .then(function (response) {
        const resultCoordinate = response.data.coordinate;
        const lon2 = resultCoordinate.lon;
        const lat2 = resultCoordinate.lat;
        const result = { lon: lon2, lat: lat2 };
        console.log(result);
      })
      .catch(function (error) {
        console.error('code:', error.response.status);
        console.error('message:', error.response.data);
        console.error('error:', error.message);
      });
    console.log(result.lon);
    setStartX(result.lon);
    setStartY(result.lat);
    const map = new Tmapv2.Map('map_div', {
      center: new Tmapv2.LatLng(startX, startY),
      width: '100%',
      height: '700px',
      zoom: 15,
    });
    const marker = new Tmapv2.Marker({
      position: new Tmapv2.LatLng(startX, startY),
      icon: 'http://tmapapi.sktelecom.com/resources/images/common/pin_car.png',
      map,
    });
    // const content = '<div>' + '    <button>' + '        시작하기';
    // '    </button>' + '</div>';
    // const infoWindow = new Tmapv2.InfoWindow({
    //   position: new Tmapv2.LatLng(latitude, longitude), //Popup 이 표출될 맵 좌표
    //   content: content, //Popup 표시될 text
    //   type: 2, //Popup의 type 설정.
    //   map: map, //Popup이 표시될 맵 객체
    //   align: Tmapv2.InfoWindowOptions.ALIGN_LEFTBOTTOM,
    // });
  }, [route]);

```
---
 ❗️ **TMAP API 보행자 경로 경유지 수 제한**
  - 사용하고 있는 데이터의 경유지는 평균 10개이상이지만 TMPA API에서 지원하는 보행자 경로는 5개까지만 경유지 설정 가능

✔️ **API를 다수 호출하여 지도에 한번에 표시**
  - 출발지 ~ 6번째 경유지로 API호출 이어서 6번째 경유지 ~ n번째 경유지 호출 ~ 도착지 경유지까지 반복
```
 // 경유지 개수별 나누기
    const passResult = [];
    const numStops = stopovers.length;

    for (let i = 0; i < numStops; i += 5) {
      const passListSlice = passList.slice(i, i + 5);
      const passResultSlice = parsePassList(passListSlice);

      if (i + 5 < numStops) {
        const nextStop = stopovers[i + 5];
        const nextX = nextStop.viaX;
        const nextY = nextStop.viaY;
        tmapApi(passResultSlice, startX, startY, nextX, nextY);
      } else {
        tmapApi(passResultSlice, startX, startY, endX, endY);
      }
    }

    if (numStops > 5) {
      const lastStopIndex = Math.min(numStops, 5);
      const lastPassList = passList.slice(lastStopIndex);
      const lastPassResult = parsePassList(lastPassList);
      const lastStop = stopovers[lastStopIndex - 1];
      const lastX = lastStop.viaX;
      const lastY = lastStop.viaY;
      tmapApiNotPass(lastX, lastY, endX, endY);
    }

```
--- 
❗️ **Geolocation API의 HTTP 프로토콜 비호환**
  - localhost를 제외한 http 프로토콜에서는 geolocation 이용불가

✔️ **무료인증서 certbot를 이용해 HTTPS로 변환**

---

### 리뷰
> TMAP API의 사용가이드는 js 베이스였기 때문에 리액트에 대한 개념과 경험이 많이 부족한 상태에서 어려움이 있었지만 어이없는 경우의 많은 삽질 끝에 많이 배울 수 있었습니다. 😂 

> 플로깅 시작시 시간카운팅에 대한 오류와 useEffect 제어가 미숙해 새로고침을 안하면 지도가 로딩되지 않는 경우의 오류가 있습니다. 이러한 오류들과 직선거리로만 이동거리를 계산한다는 점이 큰 아쉬움으로 남습니다. 

>모바일 앱 환경이 아닌 웹기반으로 제작되었기 때문에 설계시 이게 가능할까 어떻게 구현해야할까 많은 고민이 있었습니다. 또한 제한된 환경에서 테스팅조차 어려움이 있었기에 걱정이 많았지만 실제로 모바일 웹에서 작동하는 걸 보며 굉장히 뿌듯함을 느꼈습니다.

> 프로젝트에서 어렵고 중요한 핵심 기능을 맡았고 api를 적극활용해야 했기에 어려움이 많았지만 오히려 그만큼 성장할 수 있는 시간이었습니다.   또한 난이도가 높았던 만큼 재미도 있었기에 후순위였던 기능들도 꼭 나중에 구현해보고 싶습니다. 

<br>

## 👬 팀 소개

<div align="center">

|                                                            천은경(팀장)                                                         |                                      김민수                                       |                                      박연재                                       |
| :--------------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------: |
| <img height="160px" src="https://user-images.githubusercontent.com/121186383/242636171-4e873ee3-bb3e-4961-806a-2f960c7210d1.jpg"/> | <img width="160px" src="https://avatars.githubusercontent.com/u/113892151?v=4" /> | <img width="160px" src="https://avatars.githubusercontent.com/u/132035172?v=4" /> |
|                                                 [@olo02](https://github.com/olo02)                                                 |              [@KimMinSoocoding](https://github.com/KimMinSoocoding)               |                    [@yeonjae97](https://github.com/yeonjae97)                     |
|                               - SNS 및 플친 기능 <br> - 커뮤니티/첨부파일 <br> - 회원 기능 : 관리자                                |         - 챌린지 기능 <br> - 챌린지원 및 일정 <br> - 로고 및 뱃지 디자인          |                     - 회원 기능 <br> - Security <br> - Oauth                      |

|                                     ⭐️이시화⭐️                                       |                                      이재원                                       |     |
| :-------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------: | :-: |
| <img height="160px" src="https://avatars.githubusercontent.com/u/132035158?v=4"/> | <img height="160px" src="https://avatars.githubusercontent.com/u/132035168?v=4"/> |     |
|                    [@sihwaaaaa](https://github.com/sihwaaaaa)                     |               [@flatspringjava](https://github.com/flatspringjava)                |     |
|                - 플로깅 기능 <br> - 데이터 마이닝 <br> - 추천경로                 |                        - 리워드 기능 <br> - 포인트 및 뱃지                        |     |

</div>

## 활용 API
![API](https://sihwaaaaa.github.io/img/api.png)  
