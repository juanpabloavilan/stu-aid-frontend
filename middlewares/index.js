export const logger = (store) => (next) => (action) => {
  console.log("Redux action", action);
  next(action);
};
