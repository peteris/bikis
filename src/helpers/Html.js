import React, {Component, PropTypes} from 'react'
import ReactDOM from 'react-dom/server'
import serialize from 'serialize-javascript'
import Helmet from 'react-helmet'

/**
 * Wrapper component containing HTML metadata and boilerplate tags.
 * Used in server-side code only to wrap the string output of the
 * rendered route component.
 *
 * The only thing this component doesn't (and can't) include is the
 * HTML doctype declaration, which is added to the rendered output
 * by the server.js file.
 */
class Html extends Component {
  render () {
    const {assets, component, store} = this.props
    const content = component ? ReactDOM.renderToString(component) : ''
    const head = Helmet.rewind()

    return (
      <html lang='en-us'>
        <head>
          {head.base.toComponent()}
          {head.title.toComponent()}
          {head.meta.toComponent()}
          {head.link.toComponent()}
          {head.script.toComponent()}

          <link rel='shortcut icon' href='/favicon.ico' />
          <meta name='viewport' content='width=device-width, initial-scale=1' />
          {Object.keys(assets.styles).map((style, key) =>
            <link
              href={assets.styles[style]} key={key} media='screen, projection'
              rel='stylesheet' type='text/css' charSet='UTF-8'/>
          )}

          {Object.keys(assets.styles).length === 0 ? <style dangerouslySetInnerHTML={{ __html: require('./../components/App/styles.css') }} /> : null}

          <link href='https://fonts.googleapis.com/css?family=Source+Code+Pro:400,500|Karla:400,700|Roboto+Mono|Vollkorn:400,700' rel='stylesheet' type='text/css' />
        </head>
        <body>
          <div id='app' dangerouslySetInnerHTML={{__html: content}}/>
          <script dangerouslySetInnerHTML={{__html: `window.__data=${serialize(store.getState())};`}} charSet='UTF-8'/>
          <script src={assets.javascript.main} charSet='UTF-8'/>
        </body>
      </html>
    )
  }
}

Html.propTypes = {
  assets: PropTypes.object,
  component: PropTypes.node,
  store: PropTypes.object
}

export default Html