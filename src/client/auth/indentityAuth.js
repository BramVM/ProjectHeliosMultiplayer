import queryString from 'query-string';

export function isAuthenticated() {
  token = queryString.parse(window.location.hash);
  console.log(token)
  return !!token.access_token;
}

export function authenticate() {
  const authUrl =
    process.env.IDENTITY_URL +
    'authorize?client_id=' +
    process.env.CLIENT_ID +
    '&response_type=id_token token' +
    '&nonce=1234' +
    '&scope=openid' +
    '&redirect_uri=' +
    process.env.CALLBACK_URL;
  window.open(authUrl, '_self');
}

export function logOut() {
  const logoutUrl =
    process.env.IDENTITY_URL +
    'connect/endsession?id_token_hint='
    + encodeURI(token.id_token) +
    '&post_logout_redirect_uri=' +
    process.env.CALLBACK_URL;
  window.open(logoutUrl, '_self');
}

export let token;
