export async function handle({ event, resolve }) {
  if (import.meta.env.PROD) {
    event.locals.base = "https://redh-map.netlify.app";
  } else {
    event.locals.base = '';
  }
  return resolve(event, {
    transformPageChunk: ({ html }) => {
      return html
        .replace('%baseURL%', event.locals.base)
    }
  });
}