import faker from 'faker';
import Cookies from 'js-cookie';

const useCookies = {
  get: () => Cookies.get('userName'),
  set: (newUserName) => Cookies.set('userName', newUserName),
};

export default () => {
  const userName = useCookies.get();
  if (userName) {
    return userName;
  }
  const newUserName = faker.internet.userName();
  useCookies.set(newUserName);
  return newUserName;
};
