export interface ValidationErrors {
  [key: string]: string
}

export const validateForm = (formData: any): ValidationErrors => {
  const errors: ValidationErrors = {
    userId: "",
    password: "",
    confirmPassword: "",
    name: "",
    phone: "",
    email: "",
    address: "",
    joinPath: "",
    gender: "",
    birthYear: "",
    birthMonth: "",
    birthDay: "",
    general: "",
  }

  // 사용자 ID 검증
  if (!formData.userId) {
    errors.userId = "사용자 ID는 필수입니다."
  } else if (formData.userId.length < 4) {
    errors.userId = "사용자 ID는 4자 이상이어야 합니다."
  } else if (formData.userId.length > 20) {
    errors.userId = "사용자 ID는 20자 이내여야 합니다."
  }

  // 비밀번호 검증
  if (!formData.password) {
    errors.password = "비밀번호는 필수입니다."
  } else if (formData.password.length < 8) {
    errors.password = "비밀번호는 8자 이상이어야 합니다."
  }

  // 비밀번호 확인 검증
  if (formData.password !== formData.confirmPassword) {
    errors.confirmPassword = "비밀번호가 일치하지 않습니다."
  }

  // 이름 검증
  if (!formData.name) {
    errors.name = "이름은 필수입니다."
  }

  // 이메일 검증
  if (!formData.email) {
    errors.email = "이메일은 필수입니다."
  }

  // 휴대폰번호 검증
  if (!formData.phone) {
    errors.phone = "휴대폰번호는 필수입니다."
  }

  // 주소 검증
  if (!formData.address) {
    errors.address = "주소를 입력해주세요"
  }

  // 가입 경로 검증
  if (formData.joinPath.length === 0) {
    errors.joinPath = "최소 하나의 가입 경로를 선택해야 합니다."
  }

  // 성별 검증
  if (!formData.gender) {
    errors.gender = "성별은 필수입니다."
  }

  // 생년월일 검증
  if (!formData.birthYear || !formData.birthMonth || !formData.birthDay) {
    errors.birthYear = "생년월일은 필수입니다."
    errors.birthMonth = "생년월일은 필수입니다."
    errors.birthDay = "생년월일은 필수입니다."
  }

  return errors
}
