export interface Alapha {
    a: number;
}

export interface HSL extends Alapha {
    h: number;
    s: number;
    l: number;
}

export interface HSB extends Alapha {
    h: number;
    s: number;
    b: number;
}

export interface RGB extends Alapha {
    r: number;
    g: number;
    b: number;
}

export function rgbToHsb(rgb: RGB): HSB {
    const { r, g, b, a } = rgb;
    const percentR = r / 255;
    const percentG = g / 255;
    const percentB = b / 255;
    const max = Math.max(percentR, percentG, percentB);
    const min = Math.min(percentR, percentG, percentB);
    const diff = max - min;
    let h: number;
    const s = max === 0 ? 0 : diff / max;
    const v = max;

    if (max === min) {
        h = 0;
    }
    else {
        switch (max) {
            case percentR:
                h = (percentG - percentB) / diff + (percentG < percentB ? 6 : 0);
                break;

            case percentG:
                h = (percentB - percentR) / diff + 2;
                break;

            case percentB:
                h = (percentR - percentG) / diff + 4;
                break;
        }
    }

    return {
        h: Math.round(h * 60),
        s: Math.round(s * 100),
        b: Math.round(v * 100),
        a
    };
}

export function hsbToRgb(hsb: HSB): RGB {
    const { h, s, b: hb, a } = hsb;
    const percentH = Math.floor(h / 60) % 6;
    const percentS = s / 100;
    const percentB = hb / 100;
    const diffH = h / 60 - percentH;
    const p = percentB * (1 - percentS);
    const q = percentB * (1 - diffH * percentS);
    const t = percentB * (1 - (1 - diffH) * percentS);
    let r: number;
    let g: number;
    let b: number;

    switch (percentH) {
        case 0:
            r = percentB;
            g = t;
            b = p;
            break;

        case 1:
            r = q;
            g = percentB;
            b = p;
            break;

        case 2:
            r = p;
            g = percentB;
            b = t;
            break;

        case 3:
            r = p;
            g = q;
            b = percentB;
            break;

        case 4:
            r = t;
            g = p;
            b = percentB;
            break;

        case 5:
            r = percentB;
            g = p;
            b = q;
            break;
    }

    return {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255),
        a
    };
}

export function rgbToHsl(rgb: RGB): HSL {
    const { r, g, b, a } = rgb;
    const percentR = r / 255;
    const percentG = g / 255;
    const percentB = b / 255;
    const max = Math.max(percentR, percentG, percentB);
    const min = Math.min(percentR, percentG, percentB);
    let h = (max + min) / 2;
    let s = h;
    const l = s;

    if (max === min) {
        h = 0;
        s = 0;
    }
    else {
        const diff = max - min;
        s = l > 0.5
            ? diff / (2 - max - min)
            : diff / (max + min);

        switch (max) {
            case percentR:
                h = (percentG - percentB) / diff + (percentG < percentB ? 6 : 0);
                break;

            case percentG:
                h = (percentB - percentR) / diff + 2;
                break;

            case percentB:
                h = (percentR - percentG) / diff + 4;
                break;
        }

        h /= 6;
    }

    return {
        h,
        s,
        l,
        a
    };
}

export function isHexColor(unknown: any): boolean {
    return typeof unknown === 'string' && /^#([0-9a-f]{6}|[0-9a-f]{3})$/i.test(unknown);
}

export function strHexToRgb(str: string): RGB {
    const hex = str.replace('#', '');
    const hexs = [];

    if (hex.length === 3) {
        for (let i = 0; i < 3; i++) {
            hexs.push(`${hex.slice(i, i + 1)}${hex.slice(i, i + 1)}`);
        }
    }
    else {
        for (let i = 0; i < 7; i += 2) {
            hexs.push(`${hex.slice(i, i + 2)}`);
        }
    }

    return {
        r: parseInt(hexs[0], 16),
        g: parseInt(hexs[1], 16),
        b: parseInt(hexs[2], 16),
        a: 1
    };
}

export function isRgbColor(unknown: any): boolean {
    return typeof unknown === 'string'
        && /^rgba?\((\s*\d{1,3}\s*,?){3}(\s*(0\.)?\d+)?\)$/.test(unknown);
}

export function strRgbToRgb(str: string): RGB {
    const match = str.match(/^rgba?\((\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*.?\s*(.*)?\s*\)$/);

    return {
        r: parseInt(match[1], 10),
        g: parseInt(match[2], 10),
        b: parseInt(match[3], 10),
        a: match[4] ? parseFloat(match[4]) : 1
    };
}

export function isHslColor(unknown: any): boolean {
    return typeof unknown === 'string'
        && /^hsla?\((\s*\d{1,3}\s*,)(\s*\d+%\s*,?){2}(\s*(0\.)?\d+)?\)$/.test(unknown);
}

export function strHslToHsl(str: string): HSL {
    const match = str.match(/^hsla?\((\d+)\s*,\s*(\d+)%\s*,\s*(\d+)%\s*.?\s*(.*)?\s*\)$/);

    return {
        h: parseInt(match[1], 10),
        s: parseInt(match[2], 10),
        l: parseInt(match[3], 10),
        a: match[4] ? parseFloat(match[4]) : 1
    };
}

export function hslToHsb(hsl: HSL): HSB {
    const { h, s, l, a } = hsl;
    const b = s / 100 * Math.min(l, 100 - l) + l;
    const newS = b ? (2 - 2 * l / b) * 100 : 0;

    return {
        h: Math.round(h),
        s: Math.round(newS),
        b: Math.round(b),
        a
    };
}

export function hsbToHsl(hsb: HSB): HSL {
    const { h, s, b, a } = hsb;
    const l = b - b * s / 200;
    const min = Math.min(l, 100 - l);
    const newS = min ? (b - l) / min * 100 : 0;

    return {
        h: Math.round(h),
        s: Math.round(newS),
        l: Math.round(l),
        a
    };
}

export function rgbToHex(rgb: RGB): string {
    const { r, g, b } = rgb;

    return `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`;
}

export function anyToHsb(unknown: any): HSB {
    const defaultHsb = {
        h: 242,
        s: 50,
        b: 91,
        a: 1
    };

    if (isHexColor(unknown)) {
        return rgbToHsb(strHexToRgb(unknown));
    }
    else if (isRgbColor(unknown)) {
        return rgbToHsb(strRgbToRgb(unknown));
    }
    else if (isHslColor(unknown)) {
        return hslToHsb(strHslToHsl(unknown));
    }

    return defaultHsb;
}

export function isStrColor(unknown: any): boolean {
    return isHexColor(unknown) || isRgbColor(unknown) || isHslColor(unknown);
}

export function toStrRgb(hsb: HSB, alpha = false): string {
    const rgb = hsbToRgb(hsb);
    const { r, g, b, a } = rgb;

    if (alpha) {
        return `rgba(${r}, ${g}, ${b}, ${a})`;
    }

    return `rgb(${r}, ${g}, ${b})`;
}

export function toStrHex(hsb: HSB): string {
    const rgb = hsbToRgb(hsb);
    return rgbToHex(rgb);
}

export function toStrHsl(hsb: HSB, alpha = false): string {
    const hsl = hsbToHsl(hsb);
    const { h, s, l, a } = hsl;

    if (alpha) {
        return `hsla(${h}, ${s}%, ${l}%, ${a})`;
    }

    return `hsl(${h}, ${s}%, ${l}%)`;
}
