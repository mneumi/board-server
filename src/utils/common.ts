export const updateObject = (
  obj: { [key: string]: any },
  newObj: { [key: string]: any },
) => {
  const tempObj = obj;

  for (const key in newObj) {
    tempObj[key] = newObj[key];
  }

  return tempObj;
};
