import randInt from "./randomInt.hepper";
export function generateRandomUsernames(count: number): string[] {
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const usernames: string[] = [];
  const usernameLengt = randInt(5, 15);
  for (let i = 0; i < count; i++) {
    let name = "";
    for (let j = 0; j < usernameLengt; j++) {
      name += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    usernames.push(name);
  }

  return usernames;
}
