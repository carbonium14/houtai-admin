export const validatePassword = () => {
  return (rules, value, callback) => {
    if (value.length < 6) {
      callback(new Error('密码不能小于6位'))
    } else {
      callback()
    }
  }
}
