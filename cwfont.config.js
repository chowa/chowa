module.exports = {
    compile: {
        syntax: 'scss',
        startPoint: 51666,
        fontName: 'chowa-iconfont',
        styleFileName: 'icon',
        selector: '.#{$prefix}icon-{{glyph}}'
    },
    module: false,
    stylelint: true,
    hash: {
        font: false,
        style: false,
        len: 8
    },
    preview: true,
    format: {
        tabWidth: 4,
        useTabs: false,
        semi: true
    },
    input: {
        svgsDir: './cwfont/svg-icons',
        styleTpl: './cwfont/style.tpl',
        previewTpl: null
    },
    output: {
        font: './iconfonts',
        style: './components/icon/style',
        preview: './cwfont'
    }
}
