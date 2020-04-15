import * as React from 'react';
import * as PropTypes from 'prop-types';

export interface AnchorLinkProps {
    className?: string;
    style?: React.CSSProperties;
    href: string;
    title: string;
    target?: string;
}

class AnchorLink extends React.PureComponent<AnchorLinkProps> {

    public static propTypes = {
        className: PropTypes.string,
        style: PropTypes.object,
        href: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        target: PropTypes.string
    };
}

export default AnchorLink;
