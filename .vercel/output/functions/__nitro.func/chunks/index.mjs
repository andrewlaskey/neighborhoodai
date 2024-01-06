import { e as eventHandler } from './nitro/vercel.mjs';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';

const index = eventHandler(() => {
  return { nitro: "Is Awesome!" };
});

export { index as default };
//# sourceMappingURL=index.mjs.map
