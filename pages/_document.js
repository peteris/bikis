import { Html, Head, Main, NextScript } from 'next/document';
import { Helmet } from 'react-helmet';

export default function Document() {
  const helmet = Helmet.renderStatic();

  return (
    <Html lang="en-us">
      <Head />
      <head>
        {helmet.base.toComponent()}
        {helmet.title.toComponent()}
        {helmet.meta.toComponent()}
        {helmet.link.toComponent()}
        {helmet.script.toComponent()}

        <link rel="shortcut icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          href="https://fonts.googleapis.com/css?family=Karla:400|Roboto+Mono|Vollkorn:400,700&display=swap"
          rel="stylesheet"
          type="text/css"
        />
      </head>
      <body>
        <Main />
        <NextScript />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
          (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
          m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
          })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

          ga('create', 'UA-73883136-1', 'auto');
          ga('send', 'pageview');`,
          }}
        />
      </body>
    </Html>
  );
}
