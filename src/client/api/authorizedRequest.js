import queryString from 'query-string';
import { token } from '../auth/indentityAuth';

const apiUrl = process.env.API_URL;

function AuthorizedHeaders() {
  const headers = new Headers();
  headers.append('Authorization', `${token.token_type} ${token.id_token}`);
  headers.append('Content-Type', 'application/json');
  return headers;
}

function Parameters(query) {
  let parameters = '';
  if (query) {
    parameters = queryString.stringify(query);
  }
  return parameters && '?' + parameters;
}

export function Get(resource, query) {
  return new Request(apiUrl + resource + Parameters(query), {
    method: 'GET',
    headers: AuthorizedHeaders(),
  });
}

export function Post(resource, body) {
  return new Request(apiUrl + resource, {
    method: 'POST',
    headers: AuthorizedHeaders(),
    body,
  });
}

export function Put(resource, body) {
  return new Request(apiUrl + resource, {
    method: 'PUT',
    headers: AuthorizedHeaders(),
    body,
  });
}

export function Patch(resource, body) {
  return new Request(apiUrl + resource, {
    method: 'PATCH',
    headers: AuthorizedHeaders(),
    body,
  });
}

export function Delete(resource, body) {
  return new Request(apiUrl + resource, {
    method: 'DELETE',
    headers: AuthorizedHeaders(),
    body,
  });
}
