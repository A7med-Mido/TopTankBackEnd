export const de = {
  auth: {
    missingAuthHeader: "Authentifizierungs-Header fehlt.",
    missingJWT: "JWT fehlt.",
    expiredToken: "Das Token ist abgelaufen.",
    invalidToken: "Ungültiges Token.",
    registered: "Du hast dich erfolgreich registriert.",
    loggedIn: "Du hast dich erfolgreich eingeloggt.",
    alreadyExist: "Dieser Benutzer existiert bereits.",
    wrongCredentials: "Falsche Anmeldedaten."
  },
  user: {
    notFoundByPhoneNumber: "Kein Benutzer mit dieser Telefonnummer gefunden.",
    deleted: "Dein Konto wurde erfolgreich gelöscht.",
    imageUploaded: "Bild erfolgreich hochgeladen.",
    noUserAnymore: "Der Benutzer existiert nicht mehr."
  },
  common: {
    wrongParams: "Falsche Parameter.",
    internalServerError: "Interner Serverfehler.",
    noFileImageUploaded: "Keine Bilddatei hochgeladen.",
    fileNotInServer: "Die Datei existiert nicht."
  },
  validation: {
    wrongPassword: "Falsches Passwort.",
    username: "Der Benutzername muss 4–20 Zeichen lang sein und darf nur Buchstaben, Zahlen und Bindestriche (-) enthalten.",
    userRole: "Der Benutzer muss entweder Student oder Lehrer sein.",
    name: "Dein Name muss weniger als 50 Zeichen haben.",
    phone: "Falsche Telefonnummer.",
    videoName: "Der Name muss weniger als 170 Zeichen haben.",
    courseName: "Verwende einen kürzeren Kursnamen mit weniger als 150 Zeichen.",
    description: "Die Beschreibung muss weniger als 350 Zeichen haben.",
    passwordMin: "Dein Passwort muss mehr als 12 Zeichen lang sein.",
    passwordMax: "Dein Passwort muss weniger als 24 Zeichen lang sein.",
    otp: "Der OTP muss genau 6 Ziffern haben."
  },
  errors: {
    username: {
      invalid: "Der Benutzername muss 4–20 Zeichen lang sein und darf nur Buchstaben, Zahlen und Bindestriche (-) enthalten."
    },
    userRole: {
      invalid: "Die Benutzerrolle muss entweder Student oder Lehrer sein."
    },
    name: {
      too_long: "Dein Name muss weniger als 50 Zeichen haben."
    },
    phone: {
      invalid: "Falsche Telefonnummer."
    },
    video: {
      invalid_url: "Ungültige Video-URL.",
      name_too_long: "Der Videoname muss weniger als 170 Zeichen haben."
    },
    course: {
      name_too_long: "Verwende einen kürzeren Kursnamen mit weniger als 150 Zeichen.",
      invalid_price: "Der Kurspreis muss eine gültige, nicht negative Zahl sein.",
      invalid_offer: "Das Kursangebot muss eine gültige, nicht negative Zahl sein.",
      invalid_thumbnail: "Ungültige Thumbnail-URL.",
      description_too_long: "Die Beschreibung muss weniger als 350 Zeichen haben."
    },
    password: {
      too_short: "Dein Passwort muss mehr als 12 Zeichen haben.",
      too_long: "Dein Passwort muss weniger als 24 Zeichen haben."
    },
    teacher: {
      invalid_image: "Das Lehrerbild muss eine gültige URL sein.",
      otp_invalid: "Der OTP muss genau 6 Ziffern haben."
    },
    student: {
      otp_invalid: "Der OTP muss genau 6 Ziffern haben."
    }
  },
  dashboard: {
    noCloudsExist: `Es gibt keine solche Cloud in deinem System.\nEs scheint, dass du keine geladen hast.`
  }
};
