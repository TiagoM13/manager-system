export const sortEnum = <T>(data: T): T[keyof T] => {
  const type_user = Object.values(data!);
  const index = Math.floor(Math.random() * type_user.length);
  return type_user[index] as T[keyof T];
};
