
export const en = {
  auth: {
    missingAuthHeader: "Auth header is missing.",
    missingJWT: "Missing JWT.",
    expiredToken: "The token has expired.",
    invalidToken: "Invalid token.",
    registered: "You have registered successfully.",
    loggedIn: "You have logged in successfully.",
    alreadyExist: "This user already exists.",
    wrongCredentials: "Wrong Credentials."
  },
  user: {
    notFoundByPhoneNumber: "No such user with phone number.",
    deleted: "Your account has been deleted successfully.",
    imageUploaded: "Image uploaded successfully.",
    noUserAnymore: "The user Doesn't exist anymore."
  },
  common: {
    wrongParams: "Wrong Params.",
    internalServerError: "Internal server error.",
    noFileImageUploaded: "No file image uploaded.",
    fileNotInServer: "The file doesn't exists.",
    noContent: "Empty content."
  },
    validation: {
    wrongPassword: "Wrong Password",
    username: "Username must be 4–20 chars and contain only letters, numbers, and hyphens (-).",
    userRole: "User must be either student or teacher.",
    name: "Your name must be less than 50 chars.",
    phone: "Wrong phone number.",
    videoName: "The name must be less than 170 chars.",
    courseName: "Use a shorter name for that course, less than 150 chars.",
    description: "The description must be less than 350 chars.",
    passwordMin: "Your password must be more than 12 chars.",
    passwordMax: "Your password must be less than 24 chars.",
    otp: "OTP must be exactly 6 digits.",
  },
  errors: {
    username: {
      invalid: "Username must be 4–20 characters and contain only letters, numbers, and hyphens (-)."
    },
    userRole: {
      invalid: "User role must be either student or teacher."
    },
    name: {
      too_long: "Your name must be less than 50 characters."
    },
    phone: {
      invalid: "Wrong phone number."
    },
    video: {
      invalid_url: "Invalid video URL.",
      name_too_long: "The video name must be less than 170 characters."
    },
    course: {
      name_too_long: "Use a shorter name for that course, less than 150 characters.",
      invalid_price: "Course price must be a valid non-negative number.",
      invalid_offer: "Course offer must be a valid non-negative number.",
      invalid_thumbnail: "Invalid thumbnail URL.",
      description_too_long: "The description must be less than 350 characters."
    },
    password: {
      too_short: "Your password must be more than 12 characters.",
      too_long: "Your password must be less than 24 characters."
    },
    teacher: {
      invalid_image: "Teacher image must be a valid URL.",
      otp_invalid: "OTP must be exactly 6 digits."
    },
    student: {
      otp_invalid: "OTP must be exactly 6 digits."
    }
  },
  dashboard: {
    noCloudsExist: `There's no such a cloud on your system.\nIt seems that you didn't charge one.`
  }
};