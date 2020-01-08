export function stopReactPropagation(e: React.SyntheticEvent) {
    e.nativeEvent.stopImmediatePropagation();
    e.stopPropagation();
}
