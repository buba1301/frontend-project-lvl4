import Cookies from 'js-cookie';

export const useCookies = {
  get: () => Cookies.get('userName'),
  set: (newUserName) => Cookies.set('userName', newUserName),
};

export default (newUserName) => useCookies.set(newUserName);
