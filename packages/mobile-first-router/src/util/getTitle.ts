import { curry, path } from 'ramda';

export const getTitleFromCache = curry((props: any, currentRoute: any) => {
  const cacheKey = JSON.stringify(currentRoute);

  const dynamicTitle = path(['route', 'navigationTitle'], props);

  if (dynamicTitle) {
    return dynamicTitle;
  }

  if (props.titleCache[cacheKey]) {
    return props.titleCache[cacheKey];
  }

  const currentRouteConfig = props.routes[currentRoute.route];

  if (currentRouteConfig.getTitle) {
    const titleResponse = currentRouteConfig.getTitle({
      ...props,
      route: currentRoute
    });

    // Set the title syncronously
    if (typeof titleResponse === 'string') {
      props.setTitleCache({
        ...props.titleCache,
        [cacheKey]: titleResponse
      });
      // Set the title asyncronously
    } else {
      props.setTitleCache({
        ...props.titleCache,
        [cacheKey]: true
      });

      titleResponse.then((title) => {
        props.setTitleCache({
          ...props.titleCache,
          [cacheKey]: title
        });
      });
    }
  }

  return '';
});

export const getTitle = (props) => {
  if (!props.history.length) {
    return;
  }

  const history = props.history.filter(
    (route) =>
      props.routes[route.route] && props.routes[route.route].mode !== 'modal'
  );

  const currentRoute =
    history[
      history.length -
        (history.length === props.history.length && props.isNavigatingBack
          ? 2
          : 1)
    ];

  return getTitleFromCache(props, currentRoute);
};
