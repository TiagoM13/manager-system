export const getOnlyModifiedFields = <T>(dirtyFields: unknown, values: T): T =>
  Object.keys((dirtyFields || {}) as never).reduce<T>((current, key) => {
    current[key as keyof T] = values[key as keyof T];
    return current;
  }, {} as T);
