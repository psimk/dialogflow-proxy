interface IListenerOptions {
  resolve?: any;
}

export const globalInteractionLister = (fun: () => {}, options: IListenerOptions = {}) => {
  const eventHandler = () => {
    fun();
    console.log('Called: globalInteractionLister');
    if (options.resolve) {
      options.resolve();
      document.removeEventListener('click', eventHandler);
      document.removeEventListener('touchend', eventHandler);
    }
  };

  document.addEventListener('click', eventHandler);
  document.addEventListener('touchend', eventHandler);
};

export const awaitableGlobalInteractionLister = (fun: () => {}, options: IListenerOptions = {}) =>
  new Promise((resolve) => globalInteractionLister(fun, { ...options, resolve }));
