import React, { Component } from 'react';
import Anchor from '../../components/anchor';

class AnchorDev extends Component {
    render() {
        return (
            <div className="dev-section">
                <h1 className="dev-title"> Anchor </h1>
                <div style={{display: 'flex'}}>
                    <div style={{flex: 'auto'}}>
                        <h2 id="title1"> 1 </h2>

                        <br />
                        <br />
                        <br />
                        <br />
                        <h2 id="title2"> 2 </h2>

                        <br />
                        <br />
                        <br />
                        <br />
                        <h2 id="title3"> 3 </h2>

                        <br />
                        <br />
                        <br />
                        <br />
                        <h2 id="title4"> 4 </h2>

                        <br />
                        <br />
                        <br />
                        <br />
                        <h2 id="title5"> 5 </h2>

                        <br />
                        <br />
                        <br />
                        <br />
                        <h2 id="title6"> 6 </h2>

                        <br />
                        <br />
                        <br />
                        <br />
                        <h2 id="title7"> 7 </h2>

                        <br />
                        <br />
                        <br />
                        <br />
                        <h2 id="title8"> 8 </h2>

                        <br />
                        <br />
                        <br />
                        <br />
                    </div>

                    <div style={{flex: '0 0 220px'}}>
                        <Anchor>
                            <Anchor.Link href="title1" title="title1" />
                            <Anchor.Link href="title2" title="title2" />
                            <Anchor.Link href="title3" title="title3" />
                            <Anchor.Link href="title4" title="title4" />
                            <Anchor.Link href="title5" title="title5" />
                            <Anchor.Link href="title6" title="title6" />
                            <Anchor.Link href="title7" title="title7" />
                            <Anchor.Link href="title8" title="title8" />
                            <Anchor.Link
                                href="http://www.github.com"
                                target="_blank"
                                title="github"
                            />
                        </Anchor>
                    </div>
                </div>
            </div>
        );
    }
}

export default AnchorDev;
