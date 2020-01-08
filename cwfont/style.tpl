@import "../../styles/variables.scss";

@font-face {
    font-family: '{{fontName}}';
    src: url("#{$iconfont_dir}{{fontName}}.eot");
    src:
        url("#{$iconfont_dir}{{fontName}}.eot#iefix") format('embedded-opentype'),
        url("#{$iconfont_dir}{{fontName}}.ttf") format('truetype'),
        url("#{$iconfont_dir}{{fontName}}.woff") format('woff'),
        url("#{$iconfont_dir}{{fontName}}.woff2") format('woff2'),
        url("#{$iconfont_dir}{{fontName}}.svg") format('svg');
}

{{selector}} {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-style: normal;
    text-align: center;
    display: inline-block;
    vertical-align: middle;
    font-weight: 400;
    font-family: '{{fontName}}' !important;
}

@if ($iconfont_dir == $iconfont_dir_default) {
    {{glyphs}}
}
