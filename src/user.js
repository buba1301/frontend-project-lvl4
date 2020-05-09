import faker from 'faker';
import Cookies from 'js-cookie';

export default () => {
  const userName = Cookies.get('userName');
  if (userName) {
    return userName;
  }
  const newUserName = faker.internet.userName();
  Cookies.set('userName', newUserName);
  return newUserName;
};
