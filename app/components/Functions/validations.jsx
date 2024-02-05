export function validateUsername(username) {
  // Define the regular expression pattern for a valid username.
  const usernameRegex = /^(?=.*[a-zA-Z])[a-zA-Z0-9]{3,16}$/;

  // Test the username against the pattern.
  if (usernameRegex.test(username)) {
    return true; // Valid username
  } else {
    return false; // Invalid username
  }
}

export function validatePassword(password) {
  // Define the password requirements.
  const minLength = 8; // Minimum password length

  // Check the length of the password.
  if (password.length < minLength) {
    return (
      "Şifreniz en az " + minLength + " karakter uzunluğunda olmalı." && false
    );
  }

  // If all requirements are met, the password is considered valid.
  return true;
}

export function validateEmail(email) {
  // Define the regular expression pattern for a valid email ending with @bilecik.edu.tr
  const emailRegex = /^[A-Za-z0-9._%+-]+@ogrenci.bilecik\.edu\.tr$/;
  const emailRegex2 = /^[A-Za-z0-9._%+-]+@bilecik\.edu\.tr$/;

  // Test the email against the pattern.
  if (emailRegex.test(email) || emailRegex2.test(email)) {
    return true; // Valid email
  } else {
    return false; // Invalid email
  }
}

export function validateVerifyCode(input) {
  // Define the regular expression pattern for exactly 6 numeric digits.
  const sixDigitRegex = /^\d{6}$/;

  // Test the input against the pattern.
  if (sixDigitRegex.test(input)) {
    return true; // Valid 6-digit number
  } else {
    return false; // Invalid input
  }
}

export function validateMessage(input) {
  if (input > 256) {
    return { ok: false, message: "Maksimum 256 karakter yazabilirsiniz." };
  }

  if (input < 1) {
    return { ok: false, message: "Lütfen mesajı boş bırakmayın." };
  }

  return { ok: true, message: "Doğrulandı." };
}

export function validateUserEmail(email) {
  // Define the regular expression pattern for a valid email ending with @bilecik.edu.tr
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // Test the email against the pattern.
  if (emailRegex.test(email)) {
    return { ok: true, message: "Doğrulandı." };
  } else {
    return { ok: false, message: "Geçersiz E-posta." };
  }
}
