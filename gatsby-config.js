const config = {
    flags: {
        PARALLEL_QUERY_RUNNING: true
    },
    siteMetadata: {
        title: `Josh's Github Garage`,
        siteUrl: `https://joshrouwhorst.github.io`
    },
    plugins: [
        //"gatsby-plugin-webpack-bundle-analyser-v2", // For diagnosing unused javascript. See README.
        "gatsby-plugin-sass",
        "gatsby-plugin-image",
        "gatsby-plugin-react-helmet",
        "gatsby-plugin-sitemap",
        {
            resolve: 'gatsby-plugin-manifest',
            options: {
                "icon": "src/images/icon.png",
                'name': `Josh's Github Garage`,
                'background_color': '#FFFFFF',
                'theme_color': '#000000',
                'display': 'fullscreen',
                'start_url': '/'
            }
        },
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                name: 'project',
                path: './src/projects'
            }
        },
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                name: 'page',
                path: './src/pages/markdown'
            }
        },
        "gatsby-transformer-remark",
        "gatsby-plugin-sharp",
        "gatsby-transformer-sharp",
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                "name": "images",
                "path": "./src/images/"
            },
            __key: "images"
        }, {
            resolve: 'gatsby-source-filesystem',
            options: {
                "name": "pages",
                "path": "./src/pages/"
            },
            __key: "pages"
        }
    ]
};

// This adds unneeded code to frontend and it's only needed running locally.
if (process.env.NODE_ENV !== 'production') {
    config.plugins.push({
        resolve: "gatsby-plugin-netlify-cms",
        options: {
            modulePath: `${__dirname}/src/cms/cms.js`
        }
    })
}

module.exports = config