import jwtDecode from 'jwt-decode';
import LocalStorage from '../storage';

async function checkTokenValidity() {
  const token = await LocalStorage.authToken.getItem();
  return new Promise((resolve, reject) => {
    try {
      if (!token) {
        resolve({status: false, type: 'Logouting'});
      }
      const decodedToken = jwtDecode(token);
      if (decodedToken.exp * 1000 < Date.now()) {
        resolve({
          status: false,
          type: 'Your session was timed out, please login again',
        });
      }
      if (decodedToken.userType !== 'buyer') {
        resolve({
          status: false,
          type: 'You are not a buyer, Please login with a buyer account',
        });
      } else {
        resolve({status: true});
      }
    } catch (e) {
      resolve({
        status: false,
        type: 'Something went wrong with your session, Please login again',
      });
    }
  });
}
export default checkTokenValidity;
