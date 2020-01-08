export interface Offset {
    width: number;
    height: number;
    top: number;
    left: number;
}

export default {

    rect(ele: HTMLElement): ClientRect | DOMRect {
        return ele.getBoundingClientRect();
    },

    pageOffset(): Offset {
        let top = 0;
        let left = 0;

        if (typeof window.pageYOffset !== 'undefined') {
            top = window.pageYOffset;
            left = window.pageXOffset;
        }
        else if (typeof document.compatMode !== 'undefined' && document.compatMode !== 'BackCompat') {
            top = document.documentElement.scrollTop;
            left = document.documentElement.scrollLeft;
        }
        else if (typeof document.body !== 'undefined') {
            top = document.body.scrollTop;
            left = document.body.scrollLeft;
        }

        return {
            top,
            left,
            width: window.innerWidth + left,
            height: window.innerHeight + top
        };
    },

    scrollTop(ele: Window | HTMLElement): number {
        if (ele === window) {
            return document.body.scrollTop || document.documentElement.scrollTop;
        }
        else {
            return (ele as HTMLElement).scrollTop;
        }
    },

    offset(ele: HTMLElement): Offset {
        const selfReact = this.rect(ele);
        const pageOffset = this.pageOffset();

        return {
            width: selfReact.width,
            height: selfReact.height,
            top: selfReact.top + pageOffset.top,
            left: selfReact.left + pageOffset.left
        };
    },

    attr(ele: HTMLElement, property: {[key: string]: string} | string, val?: string): string | null {
        if (typeof property === 'object') {
            for (const key in property) {
                if (typeof property[key] === 'string' || typeof property[key] === 'number') {
                    ele.setAttribute(key, property[key]);
                }
            }
        }
        else if (typeof property === 'string') {
            if (val) {
                ele.setAttribute(property, val);
            }
            else {
                return ele.getAttribute(property);
            }
        }

        return null;
    },

    removeAttr(ele: HTMLElement, property: string) {
        ele.removeAttribute(property);
    },

    addClass(ele: HTMLElement, classNames: string | string[]): void {
        const orginClasses = this.attr(ele, 'class');
        let splitClasses: string[] = [];

        if (orginClasses !== null) {
            splitClasses = orginClasses.split(/\s+/);
        }

        classNames = Array.isArray(classNames) ? classNames : [classNames];
        classNames = classNames.concat(splitClasses);
        ele.setAttribute('class', classNames.join(' '));
    },

    removeClass(ele: HTMLElement, classNames: string | string[]) {
        const orginClasses = this.attr(ele, 'class');

        if (orginClasses === null) {
            return;
        }

        const splitClasses: string[] = orginClasses.split(/\s+/);

        classNames = Array.isArray(classNames) ? classNames : [classNames];
        classNames.forEach((name) => {
            splitClasses.splice(splitClasses.indexOf(name), 1);
        });
        ele.setAttribute('class', splitClasses.join(' '));
    },

    css(ele: HTMLElement, property: {} | string, val?: React.ReactText): string | null {
        if (typeof property === 'object') {
            for (const key in property) {
                if (Object.prototype.hasOwnProperty.call(ele.style, key)) {
                    ele.style[key] = property[key];
                }
            }
        }
        else if (typeof property === 'string') {
            if (val || val === 0) {
                ele.style[property] = val;
            }
            else {
                return window.getComputedStyle(ele, null)[property];
            }
        }

        return null;
    },

    removeStyle(ele: HTMLElement, propertys: string[] | string) {
        if (!Array.isArray(propertys)) {
            propertys = [propertys];
        }
        if (!propertys.length) {
            return;
        }

        propertys.forEach((property) => {
            ele.style.removeProperty(property);
        });
    },

    on(ele: HTMLElement | Window | Document, ev: string, cb: (e: any) => void) {
        ele.addEventListener(ev, cb, {
            once: false,
            capture: false,
            passive: false
        });
    },

    off(ele: HTMLElement | Window | Document, ev: string, cb: (e: any) => void) {
        ele.removeEventListener(ev, cb, {
            capture: false
        });
    },

    hasClass(ele: HTMLElement, className: string) {
        return ele.getAttribute('class').split(/\s+/).includes(className);
    }
};
