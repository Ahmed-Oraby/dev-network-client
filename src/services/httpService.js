import { apiUrl, authToken } from '../../config.json';

export async function post(endPoint, body) {
  try {
    const response = await fetch(apiUrl + endPoint, {
      method: 'POST',
      headers: {
        // Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    const responseJson = await response.json();
    if (response.ok) {
      return responseJson;
    } else {
      return Promise.reject(responseJson);
    }
  } catch (error) {
    console.log(error);
  }
}

export async function get(endPoint) {
  try {
    const token = localStorage.getItem(authToken);

    const response = await fetch(apiUrl + endPoint, {
      headers: {
        'x-auth-token': token,
      },
    });
    const responseJson = await response.json();
    if (response.ok) {
      return responseJson;
    } else {
      return Promise.reject(responseJson);
    }
  } catch (error) {
    console.log(error);
  }
}

// export {
//     post
// }
