export const successResponse = (message: { [key: string]: any }) => {
  return {
    error: 0,
    message,
  };
};

export const errorResponse = (message: string) => {
  return {
    error: 1,
    message,
  };
};
