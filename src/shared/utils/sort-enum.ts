export const sortEnum = <T>(data: T): T[keyof T] => {
  const role = Object.values(data!);
  const index = Math.floor(Math.random() * role.length);
  return role[index] as T[keyof T];
};
