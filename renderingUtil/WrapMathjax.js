'use strict';

function initializer(credentials) {
  return function WrapMathjax (markup) {
    return `<!DOCTYPE html>
      <html>
        <head>
          <script src="${credentials.MathJaxURL}"></script>
        </head>
        <body>
          ${markup}
        </body>
        <script>window.location.hash = 1;document.title = document.height;</script>
      </html>`;
  };
}

module.exports = WrapMathjax;
