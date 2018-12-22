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
    }
  };

  document.addEventListener('click', eventHandler);
};

export const awaitableGlobalInteractionLister = (fun: () => {}, options: IListenerOptions = {}) =>
  new Promise((resolve) => globalInteractionLister(fun, { ...options, resolve }));
