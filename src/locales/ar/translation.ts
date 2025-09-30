
export const ar = {
  auth: {
    missingAuthHeader: "رأس التوثيق مفقود.",
    missingJWT: "رمز التوثيق مفقود.",
    expiredToken: "انتهت صلاحية الرمز.",
    invalidToken: "رمز غير صالح.",
    registered: "تم تسجيلك بنجاح.",
    loggedIn: "تم تسجيل الدخول بنجاح.",
    alreadyExist: "هذا المستخدم بالفعل موجود."
  },
  user: {
    notFoundByPhoneNumber: " لا يوجد مستخدم بهذا الرقم.",
    deleted: "تم حذف حسابك بنجاح.",
    imageUploaded: "تم رفع الصورة بنجاح.",
    noUserAnymore: "المستخمد لم يعد موجواً."
  },
  common: {
    wrongParams: "عنوان خطئ.",
    internalServerError: "خطأ في السرفر.",
    noFileImageUploaded: "لا يوجد ملف متوفر.",
    fileNotInServer: "الملف غير موجود."
  },
  validation: {
    wrongPassword: "كلمة السر خاطئه.",
    username: "اسم المستخدم يجب أن يكون من 4 إلى 20 حرفًا ويحتوي فقط على أحرف وأرقام وشرطات (-).",
    userRole: "المستخدم يجب أن يكون طالبًا أو مدرسًا.",
    name: "يجب أن يكون اسمك أقل من 50 حرفًا.",
    phone: "رقم الهاتف غير صحيح.",
    videoName: "يجب أن يكون الاسم أقل من 170 حرفًا.",
    courseName: "استخدم اسمًا أقصر للدورة، أقل من 150 حرفًا.",
    description: "يجب أن يكون الوصف أقل من 350 حرفًا.",
    passwordMin: "يجب أن تكون كلمة المرور أكثر من 12 حرفًا.",
    passwordMax: "يجب أن تكون كلمة المرور أقل من 24 حرفًا.",
    otp: "رمز التحقق OTP يجب أن يتكون من 6 أرقام فقط.",
  },
  errors: {
    username: {
      invalid: "Username must be 4 to 20 characters and contain only letters, numbers, or hyphens (-)."
    },
    userRole: {
      invalid: "Role must be either student or teacher."
    },
    name: {
      too_long: "Name must not exceed 50 characters."
    },
    phone: {
      invalid: "Phone number is invalid."
    },
    video: {
      invalid_url: "Video URL is invalid.",
      name_too_long: "Video name must not exceed 170 characters."
    },
    course: {
      name_too_long: "Use a shorter course name, less than 150 characters.",
      invalid_price: "Course price must be a non-negative integer.",
      invalid_offer: "Offer must be a non-negative integer.",
      invalid_thumbnail: "Thumbnail URL is invalid.",
      description_too_long: "Description must not exceed 350 characters."
    },
    password: {
      too_short: "Password must be longer than 12 characters.",
      too_long: "Password must not exceed 24 characters."
    },
    teacher: {
      invalid_image: "Teacher image must be a valid URL.",
      otp_invalid: "OTP must consist of exactly 6 digits."
    },
    student: {
      otp_invalid: "OTP must consist of exactly 6 digits."
    }
  }
};