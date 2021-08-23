
function NetworkRequest(method,url, path, body, mode = 'cors'){
  return fetch(url+path,{
    method,
    body,
    headers: {
      "Content-Type": "application/json"
    },
    mode
  })
}

export {
  NetworkRequest
}