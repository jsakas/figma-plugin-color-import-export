import * as Sentry from '@sentry/react';

Sentry.init({
  dsn: 'https://d9d5ce38f7404249a449339bc4bda34f@o203774.ingest.sentry.io/6701082',
  release: PACKAGE_VERSION,
  beforeSend(event) {
    if (SENTRY_ENABLED === true) {
      event.request.url = undefined;

      return event;
    }

    return null;
  },
});

export { Sentry };
