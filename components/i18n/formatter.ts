interface Replacer {
    [ key: string ]: React.ReactText;
}

function formatter(tpl: string, replacer: Replacer): string {
    for (const key in replacer) {
        tpl = tpl.replace(`{{${key}}}`, replacer[key].toString());
    }

    return tpl;
}

export default formatter;
