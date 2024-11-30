export const delayPromise = async (timeout: number): Promise<boolean> => {
  return await new Promise((resolver) => setTimeout(resolver, timeout));
};
