import React, { Component } from 'react';
import Affix from '../../components/affix';

let targetNode1 = null;
let targetNode2 = null;

class AffixDev extends Component {
    render() {
        return (
            <div className="dev-section">
                <h1 className="dev-title"> Affix </h1>
                <Affix>
                    <button> test </button>
                </Affix>

                <br />

                <div style={{height: 100, overflowY: 'scroll', background: '#f00'}} ref={ele => {
                    if (!ele) {
                        return;
                    }
                    targetNode1 = ele;
                }}>
                    <div style={{height: 800, position: 'relative'}}>
                        <Affix target={() => targetNode1}>
                            <div style={{zIndex: 100, background: '#7774e7', fontSize: 14, color: '#fff'}}>
                                Fix on top
                            </div>
                        </Affix>
                    </div>
                </div>

                <br />
                <br />

                <div style={{height: 100, overflowY: 'scroll', background: '#f00', position: 'relative'}} ref={ele => {
                        if (!ele) {
                            return;
                        }
                        targetNode2 = ele;
                    }}
                >
                    <div style={{ height: 800, position: 'relative'}}>
                        <div style={{height: 500}}/>
                        <Affix target={() => targetNode2} offsetBottom={20}>
                            <div style={{zIndex: 100, background: '#7774e7', fontSize: 14, color: '#fff'}}>
                                Fix on bottom
                            </div>
                        </Affix>
                    </div>
                </div>

                <br />

                <div style={{height: 2000}}/>
                <Affix offsetBottom={20} onChange={affixed => console.log(affixed)}>
                    <button> bottom </button>
                </Affix>
            </div>
        );
    }
}

export default AffixDev;
