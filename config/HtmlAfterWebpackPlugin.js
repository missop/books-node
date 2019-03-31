const pluginName = 'HtmlAfterWebpackPlugin';
const assetHelp = (data) => {
    let js = [];
    let css = [];
    const dir = {
        js: item => `<script class='layload-js' src='${item}'></script>`,
        css: item => `<link class='layload-css' href='${item}'>`
    }
    for (const jsitem of data.js) {
        js.push(dir.js(jsitem));
    }
    for (const cssitem of data.css) {
        css.push(dir.css(cssitem));
    }
    return {
        js,
        css
    }
}

class HtmlAfterWebpackPlugin {
    apply(compiler) {
        compiler.hooks.compilation.tap(pluginName, compilation => {
            compilation.hooks.htmlWebpackPluginAfterHtmlProcessing.tap(pluginName, htmlPluginData => {
                // console.log('The webpack build process is starting!!!');
                /* 得到html模板 */
                let _html = htmlPluginData.html;
                const result = assetHelp(htmlPluginData.assets);
                _html = _html.replace(/pages:/g, '../../');
                _html = _html.replace(/components:/g, '../../../components/');
                console.log(result.css);
                
                _html = _html.replace('<!-- injectcss -->', result.css.join(""));
                _html = _html.replace('<!-- injectscript -->', result.js.join(""));
                htmlPluginData.html = _html;
            });
        });
    }
}
module.exports = HtmlAfterWebpackPlugin;