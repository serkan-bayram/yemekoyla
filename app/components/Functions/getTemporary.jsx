import randomize from "randomatic";

export function getTemporaryUsername() {
  return randomize("aA0", 32);
}

export function getTemporaryPassword() {
  return randomize("aA0!", 32);
}
