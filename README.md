<h1 align="center">
  JoshRouwhorst.com
</h1>

## Creating Content Types

1. Add the content type fields to the `static/admin/config.yml` file. [More info](https://www.netlifycms.org/docs/configuration-options/)
2. Add a 'gatsby-source-filesystem' object to the `gatsby-config.js` file. `path` should be the location of the folder where these documents will be saved.
3. You can create preview files and add them in `src/cms/cms.js`.
4. You can add styles for previews in `styles/cms.scss`.

## Run CMS
In one terminal run `npm run cms` and in another terminal run `npm run start`. Then go to [https://localhost:8000/admin](https://localhost:8000/admin).

## Find unused javascript
If your lighthouse score is taking a hit and it's saying you have unused javascript, uncomment the 'gatsby-plugin-webpack-bundle-analyser-v2' plugin in gatsby-config.js then run `npm run build`. It will open a browser window showing you which packages are taking up how much space in your project.

---

## Gatsby Info

### 🚀 Quick start

1.  **Create a Gatsby site.**

    Use the Gatsby CLI to create a new site, specifying the minimal starter.

    ```shell
    # create a new Gatsby site using the minimal starter
    npm init gatsby
    ```

2.  **Start developing.**

    Navigate into your new site’s directory and start it up.

    ```shell
    cd my-gatsby-site/
    npm run develop
    ```

3.  **Open the code and start customizing!**

    Your site is now running at http://localhost:8000!

    Edit `src/pages/index.js` to see your site update in real-time!

4.  **Learn more**

    - [Documentation](https://www.gatsbyjs.com/docs/?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter)

    - [Tutorials](https://www.gatsbyjs.com/tutorial/?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter)

    - [Guides](https://www.gatsbyjs.com/tutorial/?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter)

    - [API Reference](https://www.gatsbyjs.com/docs/api-reference/?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter)

    - [Plugin Library](https://www.gatsbyjs.com/plugins?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter)

    - [Cheat Sheet](https://www.gatsbyjs.com/docs/cheat-sheet/?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter)

### 🚀 Quick start (Gatsby Cloud)

Deploy this starter with one click on [Gatsby Cloud](https://www.gatsbyjs.com/cloud/):

[<img src="https://www.gatsbyjs.com/deploynow.svg" alt="Deploy to Gatsby Cloud">](https://www.gatsbyjs.com/dashboard/deploynow?url=https://github.com/gatsbyjs/gatsby-starter-minimal)
