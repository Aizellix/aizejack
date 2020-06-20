const isEmpty = obj => {
  if (!obj && obj !== 0) {
    return true;
  }

  if (typeof obj == 'object' && Object.keys(obj).length == 0 && !(obj instanceof Date)) {
    return true;
  }

  return false;
};

export { isEmpty };
