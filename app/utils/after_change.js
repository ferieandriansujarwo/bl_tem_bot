global.afterChange = (object, callback) => {
  const handler = {
    get(target, property, receiver) {
      try {
        return new Proxy(target[property], handler);
      } catch (err) {
        return Reflect.get(target, property, receiver);
      }
    },
    defineProperty(target, property, descriptor) {
      const res = Reflect.defineProperty(target, property, descriptor);
      callback();
      return res;
    },
    deleteProperty(target, property) {
      const res = Reflect.deleteProperty(target, property);
      callback();
      return res;
    }
  };

  return new Proxy(object, handler);
};
