global.encodeQueryParam = (param) => Object.entries(param).map((v,i) => {
  return v[0] + '=' + v[1];
}).join('&');
