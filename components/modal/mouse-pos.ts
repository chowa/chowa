import { doms } from '../utils';

export interface MousePos {
    x: number;
    y: number;
}

export let globalMousePos: MousePos = {
    x: 0,
    y: 0
};

function registerGloablCallerMousePos() {
    doms.on(document.body, 'click', (e) => {
        globalMousePos = {
            x: e.pageX,
            y: e.pageY
        };
    });
}

registerGloablCallerMousePos();
