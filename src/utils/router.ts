import { compile } from 'path-to-regexp';

export const pathToUrl = (path: string, params: object = {}) =>
  compile(path)(params);
