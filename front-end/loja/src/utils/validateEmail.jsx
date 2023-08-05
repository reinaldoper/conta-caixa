const validateEmail = (email) => {
  const reg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (reg.test(email)) {
    return true;
  }
  else {
    return false;
  }
}

export default validateEmail;