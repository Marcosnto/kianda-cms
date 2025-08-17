export default function generatePassword(
  length: number,
  options: {
    uppercase?: boolean;
    numbers?: boolean;
    symbols?: boolean;
  } = {},
): string {
  const lowercaseLetters = "abcdefghijklmnopqrstuvwxyz";
  const uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const digits = "0123456789";
  const specialChars = "!@#$%^&*()-_=+[]{}|;:,.<>?";

  let characters = lowercaseLetters;

  if (options.uppercase) characters += uppercaseLetters;
  if (options.numbers) characters += digits;
  if (options.symbols) characters += specialChars;

  if (characters.length === 0) {
    throw new Error("No character set selected.");
  }

  let password = "";
  for (let i = 0; i < length; i++) {
    const index = Math.floor(Math.random() * characters.length);
    password += characters[index];
  }

  return password;
}
