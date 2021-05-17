export const updateObject = (
  obj: { [key: string]: any },
  newObj: { [key: string]: any },
) => {
  for (const key in newObj) {
    obj[key] = newObj[key];
  }
};
