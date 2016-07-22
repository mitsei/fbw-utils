'use strict';

function initializer(credentials) {
  return function WrapMathjax (markup) {
    return `<!DOCTYPE html>
      <html>
        <head>
          <script src="${credentials.MathJaxURL}"></script>
        </head>
        <body style="font-size: 14px;">
          ${markup}
        </body>
        <script>
            window.location.hash = 1;
            document.title = document.getElementById("content").offsetHeight;
        </script>
      </html>`;
  };
}

module.exports = initializer;
