/**
 * handle await error
 * @param promise
 * @return {Promise<T | *[]>}
 */
export default function to(promise) {
  return promise.then(data => {
    return [null, data];
  })
      .catch(err => [err]);
}
