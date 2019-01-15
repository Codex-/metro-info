import { fetchPlatform } from './platformApi';

(async () => {
  // tslint:disable-next-line:no-console
  console.log(await fetchPlatform(1301));
})();
