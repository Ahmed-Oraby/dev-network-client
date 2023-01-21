import { apiUrl, authToken } from '../../config.json';

const token = localStorage.getItem(authToken);

export async function httpPost(endPoint, body, method = 'POST') {
  try {
    const response = await fetch(apiUrl + endPoint, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token,
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

export async function httpGet(endPoint) {
  try {
    const response = await fetch(apiUrl + endPoint, {
      headers: {
        'x-auth-token': token,
      },
    });
    const responseJson = await response.json();
    if (response.ok) {
      return responseJson;
    } else {
      return Promise.reject(response);
    }
  } catch (error) {
    console.log(error);
  }
}

export async function httpDelete(endPoint) {
  try {
    const response = await fetch(apiUrl + endPoint, {
      method: 'DELETE',
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
