export default ({ markup, css }) => {
    return `<!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link 
                rel="stylesheet"
                href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
            />
            <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/icon?family=Material+Icons"
            />
            <style>a{text-decoration: none}</style>
            <title>MERN Online MarketPlace</title>
        </head>
        <body style="margin:0">
            <div id="root">${markup}</div>
            <style id="jss-server-side">${css}</style>
            <script id="stripe-js" src="https://js.stripe.com/v3/" async></script>
            <script type="text/javascript" src="/dist/bundle.js"></script>
        </body>
    </html>`
}