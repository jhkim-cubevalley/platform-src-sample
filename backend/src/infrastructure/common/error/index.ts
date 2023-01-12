export const Error = {
  MUST_LOGIN_BEFORE: {
    error: 'MUST_LOGIN_BEFORE',
    message: '로그인이 필요합니다.'
  },
  PERMISSION_DENIED: {
    error: 'PERMISSION_DENIED',
    message: '권한이 없습니다.'
  },
  NOT_FOUND_USER: {
    error: 'NOT_FOUND_USER',
    message: '고객을 찾을 수 없습니다.'
  },
  USER_ALREADY_EXISTS: {
    error: 'USER_ALREADY_EXISTS',
    message: '이미 존재하는 고객입니다.'
  },
  CUBEEZ_ALREADY_EXISTS: {
    error: 'CUBEEZ_ALREADY_EXISTS',
    message: '이미 존재하는 큐비즈입니다.'
  },
  NOT_FOUND_CUBEEZ: {
    error: 'NOT_FOUND_CUBEEZ',
    message: '큐비즈를 찾을 수 없습니다.'
  },
  NICKNAME_ALREADY_EXISTS: {
    error: 'NICKNAME_ALREADY_EXISTS',
    message: '이미 존재하는 닉네임입니다.'
  },
  PHONE_ALREADY_EXISTS: {
    error: 'PHONE_ALREADY_EXISTS',
    message: '이미 같은 전화번호로 가입된 유저가 있습니다.'
  },
  NOT_MATCH_PHONE_CODE: {
    error: 'NOT_MATCH_PHONE_CODE',
    message: '핸드폰 인증코드가 올바르지 않습니다.'
  },
  NOT_MATCH_EMAIL_CODE: {
    error: 'NOT_MATCH_EMAIL_CODE',
    message: '이메일 인증코드가 올바르지 않습니다.'
  },
  NOT_MATCH_ACCOUNT: {
    error: 'NOT_MATCH_ACCOUNT',
    message: '존재하지 않는 이메일입니다.'
  },
  NO_MATCH_PASSWORD: {
    error: 'NO_MATCH_PASSWORD',
    message: '비밀번호가 올바르지 않습니다.'
  },
  FAIL_SOCIAL_LOGIN: {
    error: 'FAIL_SOCIAL_LOGIN',
    message: '소셜 로그인에 실패했습니다.'
  },
  FAIL_RESET_PASSWORD: {
    error: 'FAIL_RESET_PASSWORD',
    message: '비밀번호 초기화에 실패했습니다.'
  },
  NOT_USE_SOCIAL: {
    error: 'NOT_USE_SOCIAL',
    message: '소셜 로그인 고객은 사용할 수 없는 기능입니다.'
  },
  NOT_ENOUGH_DOCUMENT: {
    error: 'NOT_ENOUGH_DOCUMENT',
    message: '큐비즈 서류가 충분하지 않습니다.'
  },
  CAN_NOT_UPLOAD_DOCUMENT_ANYMORE: {
    error: 'CAN_NOT_UPLOAD_DOCUMENT_ANYMORE',
    message: '더 이상 서류를 업로드할 수 없습니다. (자격증만 3개까지 가능합니다.)'
  },
  NOT_ALLOW_FILE: {
    error: 'NOT_ALLOW_FILE',
    message: '파일 형식이 올바르지 않습니다. .jpg, .jpeg, .png, .pdf만 가능합니다.'
  },
  NOT_ALLOW_FILE_ONLY_IMAGE: {
    error: 'NOT_ALLOW_FILE_ONLY_IMAGE',
    message: '파일 형식이 올바르지 않습니다. .jpg, .jpeg, .png만 가능합니다.'
  },
  DENY_CUBEEZ: {
    error: 'DENY_CUBEEZ',
    message: '큐비즈 가입신청이 반려된 계정입니다.'
  },
  NOT_FOUND_GROUP: {
    error: 'NOT_FOUND_GROUP',
    message: '그룹을 찾을 수 없습니다.'
  },
  GROUP_ALREADY_EXISTS: {
    error: 'GROUP_ALREADY_EXISTS',
    message: '이미 존재하는 그룹입니다.'
  },
  MUST_DELETE_RELATION_OF_GROUP_BEFORE: {
    error: 'MUST_DELETE_RELATION_OF_GROUP_BEFORE',
    message: '그룹과 관련된 데이터를 먼저 삭제해야합니다.'
  },
  NOT_FOUND_ROLE: {
    error: 'NOT_FOUND_ROLE',
    message: '권한을 찾을 수 없습니다.'
  },
  ROLE_ALREADY_EXISTS: {
    error: 'ROLE_ALREADY_EXISTS',
    message: '이미 존재하는 권한입니다.'
  },
  MUST_UNLINK_GROUP_BEFORE: {
    error: 'MUST_UNLINK_GROUP_BEFORE',
    message: '삭제하기 전 연결된 그룹을 없애야합니다.'
  },
  NOT_FOUND_ADMIN: {
    error: 'NOT_FOUND_ADMIN',
    message: '관리자를 찾을 수 없습니다.'
  },
  ADMIN_ALREADY_EXISTS: {
    error: 'ADMIN_ALREADY_EXISTS',
    message: '이미 존재하는 관리자입니다.'
  },
  ADMIN_EMAIL_ALREADY_EXISTS: {
    error: 'ADMIN_EMAIL_ALREADY_EXISTS',
    message: '이미 존재하는 관리자 이메일입니다.'
  },
  ADMIN_PHONE_ALREADY_EXISTS: {
    error: 'ADMIN_PHONE_ALREADY_EXISTS',
    message: '이미 존재하는 관리자 연락처입니다.'
  },
  NOT_FOUND_DEPARTMENT: {
    error: 'NOT_FOUND_DEPARTMENT',
    message: '부서를 찾을 수 없습니다.'
  },
  DEPARTMENT_ALREADY_EXISTS: {
    error: 'DEPARTMENT_ALREADY_EXISTS',
    message: '이미 존재하는 부서 이름입니다.'
  },
  MUST_UNLINK_DEPARTMENT_BEFORE: {
    error: 'MUST_UNLINK_DEPARTMENT_BEFORE',
    message: '관리자 계정 또는 팀에 삭제하려는 부서가 연결되어있습니다.'
  },
  NOT_FOUND_JOB_POSITION: {
    error: 'NOT_FOUND_JOB_POSITION',
    message: '직책을 찾을 수 없습니다.'
  },
  JOB_POSITION_ALREADY_EXISTS: {
    error: 'JOB_POSITION_ALREADY_EXISTS',
    message: '이미 존재하는 직책 이름입니다.'
  },
  MUST_UNLINK_JOB_POSITION_BEFORE: {
    error: 'MUST_UNLINK_JOB_POSITION_BEFORE',
    message: '관리자 계정에 삭제하려는 직책이 연결되어있습니다.'
  },
  NOT_FOUND_TEAM: {
    error: 'NOT_FOUND_TEAM',
    message: '팀을 찾을 수 없습니다.'
  },
  TEAM_ALREADY_EXISTS: {
    error: 'TEAM_ALREADY_EXISTS',
    message: '이미 존재하는 팀 이름입니다.'
  },
  MUST_UNLINK_TEAM_BEFORE: {
    error: 'MUST_UNLINK_TEAM_BEFORE',
    message: '관리자 계정에 삭제하려는 팀이 연결되어있습니다.'
  },
  NOT_FOUND_INQUIRY: {
    error: 'NOT_FOUND_INQUIRY',
    message: '상담 데이터를 찾을 수 없습니다.'
  },
  CAN_NOT_ANSWER: {
    error: 'CAN_NOT_ANSWER',
    message: '답변을 등록할 수 없습니다.'
  },
  CAN_END_INQUIRY_AFTER_7D: {
    error: 'CAN_END_INQUIRY_AFTER_7D',
    message: '마지막 상담 후 7일이 지나면 상담을 종료할 수 있습니다.'
  },
  CAN_NOT_END_INQUIRY: {
    error: 'CAN_NOT_END_INQUIRY',
    message: '추가 상담만 종료할 수 없습니다. 최초 상담을 종료해주세요.'
  },
  INQUIRY_ALREADY_END: {
    error: 'INQUIRY_ALREADY_END',
    message: '이미 종료된 상담입니다.'
  },
  NOT_FOUND_NOTICE: {
    error: 'NOT_FOUND_NOTICE',
    message: '공지사항을 찾을 수 없습니다.'
  },
  NOT_FOUND_LIBRARY: {
    error: 'NOT_FOUND_LIBRARY',
    message: '라이브러리를 찾을 수 없습니다.'
  },
  CAN_DELETE_LIBRARY_ONLY_ME: {
    error: 'CAN_DELETE_LIBRARY_ONLY_ME',
    message: '라이브러리 주인만 삭제할 수 있습니다.'
  },
  CAN_NOT_UPLOAD_IMAGE: {
    error: 'CAN_NOT_UPLOAD_IMAGE',
    message: '파일을 더 이상 업로드할 수 없습니다.'
  },
  NOT_FOUND_REGION: {
    error: 'NOT_FOUND_REGION',
    message: '지역을 찾을 수 없습니다.'
  },
  REGION_ALREADY_EXISTS: {
    error: 'REGION_ALREADY_EXISTS',
    message: '이미 존재하는 지역입니다.'
  },
  MUST_DELETE_CHILDREN_REGION_BEFORE: {
    error: 'MUST_DELETE_PARENT_REGION_BEFORE',
    message: '하위 지역을 먼저 삭제해야합니다.'
  },
  NOT_FOUND_MENU: {
    error: 'NOT_FOUND_MENU',
    message: '메뉴 카테고리를 찾을 수 없습니다.'
  },
  MENU_ALREADY_EXISTS: {
    error: 'MENU_ALREADY_EXISTS',
    message: '이미 존재하는 메뉴 카테고리입니다.'
  },
  MUST_DELETE_CHILDREN_MENU_BEFORE: {
    error: 'MUST_DELETE_CHILDREN_MENU_BEFORE',
    message: '하위 메뉴 카테고리를 먼저 삭제해야합니다.'
  },
  NOT_FOUND_PRODUCT: {
    error: 'NOT_FOUND_PRODUCT',
    message: '여행 상품을 찾을 수 없습니다.'
  },
  CAN_NOT_UPDATE_PRODUCT: {
    error: 'CAN_NOT_UPDATE_PRODUCT',
    message: '여행상품을 수정할 수 없는 상태입니다.'
  },
  CAN_NOT_DELETE_PRODUCT: {
    error: 'CAN_NOT_DELETE_PRODUCT',
    message: '여행상품을 삭제할 수 없는 상태입니다.'
  },
  NOT_FOUND_HOME_CONTENT: {
    error: 'NOT_FOUND_HOME_CONTENT',
    message: '해당 종류의 기타 페이지를 찾을 수 없습니다. 먼저 내용 작성 후 저장해주세요.'
  },
  NOT_FOUND_TOS: {
    error: 'NOT_FOUND_TOS',
    message: '약관을 찾을 수 없습니다.'
  },
  TOS_ALREADY_EXISTS: {
    error: 'TOS_ALREADY_EXISTS',
    message: '이미 존재하는 약관입니다.'
  },
  MUST_DELETE_PRODUCT_BEFORE: {
    error: 'MUST_DELETE_PRODUCT_BEFORE',
    message: '연결된 상품을 먼저 삭제해야합니다.'
  },
  NOT_FOUND_INCENTIVE: {
    error: 'NOT_FOUND_INCENTIVE',
    message: '인센티브 여행을 찾을 수 없습니다.'
  },
  NOT_FOUND_BADGE: {
    error: 'NOT_FOUND_BADGE',
    message: '뱃지를 찾을 수 없습니다.'
  },
  CAN_NOT_PRODUCT_APPROVE_OR_DENY: {
    error: 'CAN_NOT_PRODUCT_APPROVE_OR_DENY',
    message:
      '여행상품 승인 또는 반려가 불가능합니다. (담당그룹이 없는 경우, 승인요청 상태가 아닌 경우, 이미 반려한 관리자가 있는 경우)'
  },
  YOUR_NOT_PRODUCT_MANAGE_GROUP: {
    error: 'YOUR_NOT_PRODUCT_MANAGE_GROUP',
    message: '여행상품 담당그룹의 관리자만 승인 또는 반려가 가능합니다.'
  },
  INVALILD_PRODUCT_STATUS: {
    error: 'INVALILD_PRODUCT_STATUS',
    message: '여행상품 상태가 올바르지 않습니다. 승인요청은 별도 API를 사용해주세요.'
  },
  NOT_FOUND_EVENT: {
    error: 'NOT_FOUND_EVENT',
    message: '행사를 찾을 수 없습니다.'
  },
  /*
    MUST_DELETE_CHILDREN_REGION_BEFORE, MUST_DELETE_PRODUCT_BEFORE 등의 에러를 대체하는 코드입니다.
    신규 기능들은 아래 에러코드를 사용합니다.
   */
  CAN_NOT_DELETE_BECAUSE_OF_RELATION: {
    error: 'CAN_NOT_DELETE_BECAUSE_OF_RELATION',
    message: '연결된 데이터가 존재하여 삭제할 수 없습니다.'
  },
  NOT_FOUND_EVENT_MEMO: {
    error: 'NOT_FOUND_EVENT_MEMO',
    message: '행사 메모를 찾을 수 없습니다.'
  },
  CAN_NOT_CREATE_EVENT_TYPE: {
    error: 'CAN_NOT_CREATE_EVENT_TYPE',
    message: '행사 타입을 생성할 수 없습니다. 수정요청 후 다시 시도해주세요.'
  },
  NOT_FOUND_EVENT_TYPE: {
    error: 'NOT_FOUND_EVENT_TYPE',
    message: '행사 타입을 찾을 수 없습니다.'
  },
  NOT_FOUND_PROMOTION: {
    error: 'NOT_FOUND_PROMOTION',
    message: '프로모션을 찾을 수 없습니다.'
  },
  NOT_FOUND_RESERVATION: {
    error: 'NOT_FOUND_RESERVATION',
    message: '예약 정보를 찾을 수 없습니다.'
  },
  INVAILD_PRICE: {
    error: 'INVAILD_PRICE',
    message: '예약 가격이 올바르지 않습니다. 가격이 변조되지 않았는지 확인해주세요.'
  },
  NOT_FOUND_SOICAL_INFO: {
    error: 'NOT_FOUND_SOICAL_INFO',
    message: '가입 정보가 부족합니다.'
  },
  NOT_FOUND_DOCUMENT: {
    error: 'NOT_FOUND_DOCUMENT',
    message: '서류 정보를 찾을 수 없습니다.'
  },
  NOT_FOUND_CONTRACT: {
    error: 'NOT_FOUND_CONTRACT',
    message: '계약서를 찾을 수 없습니다.'
  },
  CONTRACT_NAME_ALREADY_EXISTS: {
    error: 'CONTRACT_NAME_ALREADY_EXISTS',
    message: '이미 같은 이름의 계약서가 존재합니다.'
  },
  NOT_FOUND_AGREE_INFO: {
    error: 'NOT_FOUND_AGREE_INFO',
    message: '계약서 동의 정보를 찾을 수 없습니다.'
  },
  CAN_NOT_RESERVATION: {
    error: 'CAN_NOT_RESERVATION',
    message: '예약할 수 없습니다.'
  },
  NOT_FOUND_REVIEW: {
    error: 'NOT_FOUND_REVIEW',
    message: '후기를 찾을 수 없습니다.'
  },
  CAN_NOT_CREATE_REVIEW: {
    error: 'CAN_NOT_CREATE_REVIEW',
    message: '후기를 작성할 수 없습니다. 예약 및 여행 종료된 상품에만 후기를 작성할 수 있습니다.'
  },
  CAN_NOT_ADD_OR_DELETE_REVIEW_ANSWER: {
    error: 'CAN_NOT_ADD_OR_DELETE_REVIEW_ANSWER',
    message: '후기에 답변 등록, 삭제할 수 없습니다. 자신이 만든 여행상품에만 가능합니다.'
  },
  CAN_NOT_LINK_PRODUCT_TO_INQUIRY: {
    error: 'CAN_NOT_LINK_PRODUCT_TO_INQUIRY',
    message: '여행상품을 연결할 수 없습니다. 자신이 만들고 매니지먼트를 선택한 여행상품만 가능합니다.'
  },
  CAN_NOT_UPDATE_MASTER_GROUP: {
    error: 'CAN_NOT_UPDATE_MASTER_GROUP',
    message: '마스터 관리자의 그룹 및 권한은 수정할 수 없습니다.'
  },
  REQUEST_CUBEEZ: {
    error: 'REQUEST_CUBEEZ',
    message: '큐비즈 가입승인 후 로그인이 가능합니다.'
  },
  NOT_FOUND_PARTNER: {
    error: 'NOT_FOUND_PARTNER',
    message: '제휴파트너를 찾을 수 없습니다.'
  },
  NOT_FOUND_PARTNER_GROUP: {
    error: 'NOT_FOUND_PARTNER_GROUP',
    message: '제휴파트너 그룹을 찾을 수 없습니다.'
  },
  REQUIRED_REGION: {
    error: 'REQUIRED_REGION',
    message: '상품코드 생성을 위해 지역 정보가 필요합니다.'
  },
  DISABLE_DATAS: {
    error: 'DISABLE_DATAS',
    message: '비활성화된 데이터가 포함되있습니다.'
  },
  NOT_FOUND_POPUP: {
    error: 'NOT_FOUND_POPUP',
    message: '팝업을 찾을 수 없습니다.'
  },
  NOT_FOUND_PARTNER_SETTLEMENT: {
    error: 'NOT_FOUND_PARTNER_SETTLEMENT',
    message: '제휴파트너 정산 정보를 찾을 수 없습니다.'
  },
  INVALID_PRODUCT_INPUT: {
    error: 'INVALID_PRODUCT_INPUT',
    message: '상품 정보가 부족합니다.'
  },
  NOT_ENOUGH_POINT: {
    error: 'NOT_ENOUGH_POINT',
    message: '포인트가 부족합니다.'
  },
  NOT_FOUND_FREE_BOARD: {
    error: 'NOT_FOUND_FREE_BOARD',
    message: '자유게시판 게시글을 찾을 수 없습니다.'
  },
  NOT_FOUND_FREE_BOARD_REPLY: {
    error: 'NOT_FOUND_FREE_BOARD_REPLY',
    message: '자유게시판 댓글을 찾을 수 없습니다.'
  },
  NOT_FOUND_COUPON: {
    error: 'NOT_FOUND_COUPON',
    message: '쿠폰을 찾을 수 없습니다.'
  },
  COUPON_ALREADY_EXISTS: {
    error: 'COUPON_ALREADY_EXISTS',
    message: '이미 존재하는 쿠폰입니다.'
  },
  CAN_NOT_USED_COUPON: {
    error: 'CAN_NOT_USED_COUPON',
    message: '사용할 수 없는 쿠폰입니다.'
  },
  RESERVATION_ALREADY_EXISTS: {
    error: 'RESERVATION_ALREADY_EXISTS',
    message: '이미 예약한 행사입니다.'
  },
  NOT_FOUND_SERVER_CONFIG_KEY: {
    error: 'NOT_FOUND_SERVER_CONFIG_KEY',
    message: '서버 설정 키를 찾을 수 없습니다.'
  },
  CAN_NOT_UPDATE_LIBRARY: {
    error: 'CAN_NOT_UPDATE_LIBRARY',
    message: '여행상품에서 사용 중인 라이브러리는 수정할 수 없습니다.'
  },
  INVALID_BODY: {
    error: 'INVALID_BODY',
    message: '잘못된 요청입니다. API 요청 방식이 잘못되지 않았는지 확인해주세요.'
  }
} as const;
