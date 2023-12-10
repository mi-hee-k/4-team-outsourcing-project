# 📌 Let's Fix

좋아하는 장소나 뜻 깊었던 장소를 Fix하여 저장하는 프로젝트

# 사용 기술

<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white">
<img src="https://img.shields.io/badge/ReactRouter-CA4245?style=for-the-badge&logo=ReactRouter&logoColor=white">
<img src="https://img.shields.io/badge/redux-764ABC?style=for-the-badge&logo=redux&logoColor=white">
<img src="https://img.shields.io/badge/firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=white">
<img src="https://img.shields.io/badge/styled componets-DB7093?style=for-the-badge&logo=styledomponets&logoColor=white">
<img src="https://img.shields.io/badge/.env-ECD53F?style=for-the-badge&logo=.env&logoColor=white">

# 🔗 배포링크

[보러가기](https://sparta-fan-letter-auth.vercel.app/)

# ⌚ 개발기간

23.12.05 - 23.12.10

# 📌 주요기능

## 로그인 / 로그아웃 / 회원가입

- 유효성 검사
- 오류 발생 시 alert

## 인증처리

- 로그인 후 회원 정보 헤더에 표시
- 로그인 되어 있을 때만 마이페이지 접근 가능
- 로그인 되어 있을 때만 글쓰기 가능

## 새 글 쓰기

- 유효성 검사(필수 사항, 최대길이 적용)
- 사진 업로드 (미리보기 가능)
- 팝업 외부 영역 스크롤 방지 기능 적용
- 사진 추가시 등록된 사진 삭제 후 추가
- 다음 주소검색 API를 이용하여 주소 검색 후 해당 주소를 지도에 마커로 찍기

## 내가 Fix한 장소 모아보기

- 카카오 지도 API - Clusterer 사용
- 마커된 곳에 연결된 게시글 보여주기

## 프로필 수정

- 프로필 사진 수정(미리보기 가능)
- 닉네임 수정
- 수정 즉시 이전 게시글에 반영

# 어려웠던 점

<details><summary> 혜민
</summary>
지도 API의 JS코드를 참고하며 react로 사용하기
</details>
<details><summary> 미희
</summary>
인증처리, 지도화면에 대한 구체적인 기획 부족으로 적용하는 데 어려움, 지도 API 사용법 어려움
</details>
<details><summary> 지원
</summary>
리액트와 firebase의 데이터 동기화와 데이터 양식 문제
</details>
<details><summary> 지우
</summary>
리덕스 툴킷 상태변화 파이어베이스에 대한 이해
</details>
