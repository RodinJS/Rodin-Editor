function IframeEventsLink(scope, element, attrs) {
  'ngInject';

  if(!element[0].nodeName || element[0].nodeName.toLowerCase() !== 'iframe') {
    throw new Error('directive "iframe-events" can be added only on iframe elements');
  }

  try {
    const iframe = element[0];
    const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;

    iframeDocument.addEventListener('mousemove', (evt) => {
      console.log('mtav');
      document.dispatchEvent(new Event(evt));
    })
  } catch (ex) {
    console.warn(ex);
  }

  const iframe = element[0];
  const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;

  iframeDocument.addEventListener('mousemove', (evt) => {
    console.log('mtav');
    document.dispatchEvent(new Event(evt));
  })
}

export default IframeEventsLink;