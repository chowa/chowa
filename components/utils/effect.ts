export function easeIn(distance: number, cb: (retVal: number) => void): number {
    let animId = null;
    let retVal = 0;

    const animationFn = () => {
        let step = Math.ceil(distance / 6);

        if (step === 0) {
            step = distance;
        }

        distance -= step;
        retVal += step;

        if (typeof cb === 'function') {
            cb(retVal);
        }

        if (distance === 0) {
            window.cancelAnimationFrame(animId);
        }
        else {
            animId = window.requestAnimationFrame(animationFn);
        }
    };

    return animId = window.requestAnimationFrame(animationFn);
}
