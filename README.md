<a href="https://dasomi.vercel.app/" target="_blank">
<img src="https://github.com/user-attachments/assets/f388d990-11a9-4c7b-979f-71fc2a09b66f" alt="배너" width="100%"/>
</a>


<br/>
<br/>

# 0. 배포 사이트 
[서비스 링크](https://dasomi.vercel.app/)
<br/><br/>
(ctrl + 좌클릭시 새 창으로 이동이 됩니다.)


<br/>
<br/>

# 1. Project Overview (프로젝트 개요)
- 프로젝트 이름: 다솜이
- 프로젝트 설명: 대학교 기숙사 룸메이트 매칭 서비스 

<br/>
<br/>

# 2. Project Purpose (프로젝트 목적)
우리 학교에서는 기숙사 룸메이트를 학생들이 직접 정하여 함께 방을 사용할 수 있습니다. <br/>
이로 인해 학교 에브리타임에서 룸메이트를 구하는 게시글을 확인할 수 있지만, <br/>
어떤 방을 구하는지, 매칭 여부 등을 한눈에 보기 어려운 점이 있습니다. <br/>
<br/>
<img src="https://github.com/user-attachments/assets/1de3f72b-1ad2-481f-9980-2b3e4221f84d" alt="배너" width="50%"/>
<br/>
따라서 보다 성향이 잘 맞는 룸메이트를 쉽게 찾고 구할 순 없을까? 하는 생각을 시작으로 1인 서비스를 개발하였습니다. 

<br/>
<br/>


# 3. Key Features (주요 기능)
- **회원가입**:
  - 회원가입 시 DB에 학생 정보가 등록 됩니다. <br/>
  - 타대학교 학생 가입 방지를 위해 우리 학교 이메일(cu.ac.kr)로만 이메일 인증이 가능하도록 구현하였습니다. <br/><br/>
  <img width="784" alt="h1" src="https://github.com/user-attachments/assets/ac64c40b-a68b-4e07-b2a2-4b34ce28eb5c" />
<br/>
<br/>

- **로그인**:
  - 사용자 인증 정보를 통해 로그인합니다. JWT 토큰을 통해 로그인 유지를 진행합니다. <br/><br/>
  <img width="848" alt="image" src="https://github.com/user-attachments/assets/3902d9af-e841-40a8-95bf-79f779d5ae92" />
<br/>
<br/>
 
- **아이디 / 패스워드 찾기**:
  - 아이디 혹은 비밀번호 분실 시 이메일을 통해 찾을 수 있습니다. <br/><br/>
  <img width="841" alt="image" src="https://github.com/user-attachments/assets/8ccc5dc8-6706-438c-9459-52a0cae446db" />
  <img width="867" alt="image" src="https://github.com/user-attachments/assets/e221bf99-223f-4346-94fd-968400c525c5" />
<br/><br/>


- **메뉴 목록**:
  - 로그인 후 메뉴 리스트를 볼 수 있습니다. <br/><br/>
  <img width="554" alt="h2" src="https://github.com/user-attachments/assets/3b417c48-d24a-4153-b51b-db243e1f0b67" />
<br/><br/>
 
- **내 정보 관리**:
  - 비밀번호 변경, 닉네임 변경 등 내 정보를 수정하거나 탈퇴할 수 있습니다. <br/><br/>
 <img width="488" alt="h3" src="https://github.com/user-attachments/assets/cf68624b-c475-4f8f-85bf-8867740e7195" />
<br/><br/>

- **룸메이트 등록하기**:
  - 룸메이트를 구하기 위해 등록하기 버튼으로 나의 룸메이트 정보를 등록할 수 있습니다. <br/><br/>
  <img width="508" alt="h4" src="https://github.com/user-attachments/assets/2e991b63-0493-4190-a0bb-fff5dda71f0a" />
  <img width="559" alt="h5" src="https://github.com/user-attachments/assets/70086cbd-9734-46c3-9982-2aeda81b142f" />
  <img width="620" alt="h6" src="https://github.com/user-attachments/assets/ed38bd38-bd51-40af-b4ce-eaa6d34befeb" /> <br/><br/>
  - 룸메이트 매칭 상태를 변경할 수 있습니다. (매칭 중, 매칭 완료는 매칭 신청을 할 수 없게 구현하였습니다.) <br/><br/>
  <img width="619" alt="h7" src="https://github.com/user-attachments/assets/b4da3d26-37be-4b3b-8595-45218e6cac62" />
<br/><br/>

- **룸메이트 찾기**:
  - 각 관을 구분하여 등록된 룸메이트 정보들을 볼 수 있습니다.
  - 필터를 통해 원하는 정보만 볼 수 있습니다. <br/><br/>
  <img width="525" alt="h8" src="https://github.com/user-attachments/assets/b5d0f323-8858-438f-9f74-82b1336be6ed" />
  <img width="767" alt="h9" src="https://github.com/user-attachments/assets/71962221-a291-4016-93a8-dfbb2956d53f" />
<br/><br/>

- **문의하기**:
  - 실서비스를 운영하니 문의사항이 올 수 있습니다. 실시간으로 문의를 받기 위해 오픈채팅 링크로 이동하는 버튼을 만들었습니다. <br/><br/>
  <img width="593" alt="h10" src="https://github.com/user-attachments/assets/2cbc9738-acda-4430-abab-8451679e39cd" />
<br/><br/>

- **관리자 페이지**:
  - 가입자, 매칭 상태를 실시간으로 조회할 수 있습니다.
  - 유저 목록을 볼 수 있고 악성 유저 방지를 위해 정지하기(로그인 미활성화)를 구현하였습니다. <br/><br/>
  <img width="837" alt="image" src="https://github.com/user-attachments/assets/3b192b25-7e73-41d4-8053-82cb5e9e5041" />

<br/>
<br/>

# 4. Testing and Considerations (테스트 및 고려사항)
원활한 실서비스 운영을 위해 다음과 같은 테스트 리스트 목록을 확인하였습니다. <br/><br/>
![image](https://github.com/user-attachments/assets/28d5b2e5-0321-4122-b760-98a7a73e4174)
<br/>
<br/>

# 5. API Specification (API 명세서)
| **번호** | **API 설명**              | **URL**                             | **Method**  |
|----------|--------------------------|-------------------------------------|------------|
| 1.1      | 회원가입                 | `/api/users/register`              | `POST`     |
| 1.2      | 닉네임 중복 확인         | `/api/users/check-nickname`        | `GET`      |
| 1.3      | 비밀번호 확인            | `/api/users/check-password`        | `POST`     |
| 1.4      | 이메일 인증 발송         | `/api/users/email/send`            | `POST`     |
| 1.5      | 이메일 인증 확인         | `/api/users/email/verify`          | `POST`     |
| 1.6      | 로그인                   | `/api/users/login`                 | `POST`     |
| 1.7      | 액세스 토큰 갱신         | `/api/users/refresh`               | `POST`     |
| 1.8      | 회원 탈퇴                | `/api/users/withdraw`              | `POST`     |
| 2.1      | 나의 룸메이트 정보 생성  | `/api/roommate/me`                 | `POST`     |
| 2.2      | 나의 룸메이트 정보 조회  | `/api/roommate/me`                 | `GET`      |
| 2.3      | 나의 룸메이트 정보 삭제  | `/api/roommate/me`                 | `DELETE`   |
| 2.4      | 나의 룸메이트 정보 수정  | `/api/roommate/me`                 | `PUT`      |
| 2.5      | 예약 상태 수정           | `/api/roommate/reservation/edit`   | `PUT`      |
| 2.6      | 모든 룸메이트 정보 조회  | `/api/roommate/dormitory`          | `GET`      |
| 2.7      | 룸메이트 상세 조회       | `/api/roommate/detail/:room_id`    | `GET`      |
| 2.8      | 룸메이트 매칭 수 조회    | `/api/roommate/stats`              | `GET`      |
| 3.1      | 프로필 조회              | `/api/my/profile`                  | `GET`      |
| 3.2      | 비밀번호 수정            | `/api/my/edit/password`            | `POST`     |
| 3.3      | 닉네임 수정              | `/api/my/edit/nickname`            | `POST`     |
| 3.4      | MBTI 수정                | `/api/my/edit/mbti`                | `POST`     |
| 3.5      | 학과 수정                | `/api/my/edit/department`          | `POST`     |
| 4.1      | ID 찾기                  | `/api/forgot/id`                   | `POST`     |
| 4.2      | 비밀번호 찾기            | `/api/forgot/pw`                   | `POST`     |
| 5.1      | 전체 회원 리스트 조회     | `/api/admin/users`                 | `GET`      |
| 5.2      | 특정 회원 일시 정지      | `/api/admin/users/:userId/suspend` | `PATCH`    |
| 5.3      | 특정 회원 활성화         | `/api/admin/users/:userId/active`  | `PATCH`    |
| 5.4      | 특정 회원 삭제           | `/api/admin/users/:userId`         | `DELETE`   |



# 6. Technology Stack (기술 스택)
|  |  |
|-----------------|-----------------|
| HTML5    |<img src="https://github.com/user-attachments/assets/2e122e74-a28b-4ce7-aff6-382959216d31" alt="HTML5" width="100">| 
| CSS3    |   <img src="https://github.com/user-attachments/assets/c531b03d-55a3-40bf-9195-9ff8c4688f13" alt="CSS3" width="100">|
| TypeScript    |  <img src="https://github.com/user-attachments/assets/ccf7fc4d-c957-47f0-8f54-46a610e93087" alt="typescript" width="100"> |
| React    |  <img src="https://github.com/user-attachments/assets/e3b49dbb-981b-4804-acf9-012c854a2fd2" alt="React" width="100"> | 18.3.1    |
| Node.js    |  <img src="https://github.com/user-attachments/assets/8f58ed3b-acd3-419e-9963-bcc9bc6ed08a" alt="Node.js" width="100"> | 18.3.1    |
| Tailwind CSS    |  <img src="https://github.com/user-attachments/assets/650e9e6c-783d-474d-aadb-170ccbb57b3d" alt="React" width="100"> | 18.3.1    |



<br/>
