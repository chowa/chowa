import React, { Component } from 'react';
import Timeline from '../../components/timeline';
import Icon from '../../components/icon';

class TimelineDev extends Component {
    render() {
        return (
            <div className="dev-section">
                <h1 className="dev-title"> Timeline </h1>

                <Timeline>
                    <Timeline.Item>
                        The first test flight took place on January 7, 2011, but
                        due to the unsatisfactory weather on that day, the first
                        flight was accompanied by a J - 10 S fighter aircraft at
                        12: 50 on January 11, 2011. The J - 20 completed several
                        passes during the first flight.
                    </Timeline.Item>

                    <Timeline.Item>
                        On May 12, 2012, the J - 20 verification aircraft
                        numbered 2001 flew to Yanliang Test Flight Center for
                        test flight.
                    </Timeline.Item>

                    <Timeline.Item>
                        On July 6, 2013, the F - 20 verification aircraft
                        numbered 2002 was transferred to Yanliang Flight Test
                        Center again to begin the final test flight.The 2002
                        verification aircraft was the fourth in the first batch,
                        and it was replaced by 2004 at the test center.
                    </Timeline.Item>

                    <Timeline.Item>
                        At the end of 2013, photos of the first batch of the
                        first J - 20 prototypes numbered 2011 were exposed on
                        the Internet.Compared with the previous verification
                        aircraft, the first prototype of the F - 20 was used in
                        painting, cockpit, landing gear hatch, built - in weapon
                        hatch, intake duct, duck wing, side strip, main wing,
                        tail brace, vertical tail Significant improvements have
                        been made in the engine nacelle and other areas, and a
                        new electro - optical tracking system(EOTS) has been
                        newly installed under the nose.
                    </Timeline.Item>

                    <Timeline.Item>
                        On March 1, 2014, the 2011 J - 20 prototype successfully
                        flew for the first time.The first flight was accompanied
                        by a J - 10 S and passed through the field 4 times. [35]
                        On June 17, 2014, the F - 20 prototype of 2011 flew to
                        Yanliang Test Flight Center
                    </Timeline.Item>
                </Timeline>

                <br />

                <Timeline mode="right">
                    <Timeline.Item>
                        The first test flight took place on January 7, 2011, but
                        due to the unsatisfactory weather on that day, the first
                        flight was accompanied by a J - 10 S fighter aircraft at
                        12: 50 on January 11, 2011. The J - 20 completed several
                        passes during the first flight.
                    </Timeline.Item>

                    <Timeline.Item>
                        On May 12, 2012, the J - 20 verification aircraft
                        numbered 2001 flew to Yanliang Test Flight Center for
                        test flight.
                    </Timeline.Item>

                    <Timeline.Item>
                        On July 6, 2013, the F - 20 verification aircraft
                        numbered 2002 was transferred to Yanliang Flight Test
                        Center again to begin the final test flight.The 2002
                        verification aircraft was the fourth in the first batch,
                        and it was replaced by 2004 at the test center.
                    </Timeline.Item>

                    <Timeline.Item>
                        At the end of 2013, photos of the first batch of the
                        first J - 20 prototypes numbered 2011 were exposed on
                        the Internet.Compared with the previous verification
                        aircraft, the first prototype of the F - 20 was used in
                        painting, cockpit, landing gear hatch, built - in weapon
                        hatch, intake duct, duck wing, side strip, main wing,
                        tail brace, vertical tail Significant improvements have
                        been made in the engine nacelle and other areas, and a
                        new electro - optical tracking system(EOTS) has been
                        newly installed under the nose.
                    </Timeline.Item>

                    <Timeline.Item>
                        On March 1, 2014, the 2011 J - 20 prototype successfully
                        flew for the first time.The first flight was accompanied
                        by a J - 10 S and passed through the field 4 times. [35]
                        On June 17, 2014, the F - 20 prototype of 2011 flew to
                        Yanliang Test Flight Center
                    </Timeline.Item>
                </Timeline>

                <br />

                <Timeline mode="alternate">
                    <Timeline.Item>
                        The first test flight took place on January 7, 2011, but
                        due to the unsatisfactory weather on that day, the first
                        flight was accompanied by a J - 10 S fighter aircraft at
                        12: 50 on January 11, 2011. The J - 20 completed several
                        passes during the first flight.
                    </Timeline.Item>

                    <Timeline.Item>
                        On May 12, 2012, the J - 20 verification aircraft
                        numbered 2001 flew to Yanliang Test Flight Center for
                        test flight.
                    </Timeline.Item>

                    <Timeline.Item>
                        On July 6, 2013, the F - 20 verification aircraft
                        numbered 2002 was transferred to Yanliang Flight Test
                        Center again to begin the final test flight.The 2002
                        verification aircraft was the fourth in the first batch,
                        and it was replaced by 2004 at the test center.
                    </Timeline.Item>

                    <Timeline.Item>
                        At the end of 2013, photos of the first batch of the
                        first J - 20 prototypes numbered 2011 were exposed on
                        the Internet.Compared with the previous verification
                        aircraft, the first prototype of the F - 20 was used in
                        painting, cockpit, landing gear hatch, built - in weapon
                        hatch, intake duct, duck wing, side strip, main wing,
                        tail brace, vertical tail Significant improvements have
                        been made in the engine nacelle and other areas, and a
                        new electro - optical tracking system(EOTS) has been
                        newly installed under the nose.
                    </Timeline.Item>

                    <Timeline.Item>
                        On March 1, 2014, the 2011 J - 20 prototype successfully
                        flew for the first time.The first flight was accompanied
                        by a J - 10 S and passed through the field 4 times. [35]
                        On June 17, 2014, the F - 20 prototype of 2011 flew to
                        Yanliang Test Flight Center
                    </Timeline.Item>
                </Timeline>

                <br />

                <Timeline mode="alternate">
                    <Timeline.Item color="#1890ff" icon={<Icon type="info" />}>
                        The first test flight on January 7, 2011, but due to the
                        unsatisfactory weather on that day, it was changed to
                        12: 00 on January 11, 2011 Fifty points were accompanied
                        by the J - 10 S fighter for the first flight.The J - 20
                        completed several passes during the first flight.
                    </Timeline.Item>

                    <Timeline.Item color="#1890ff" icon={<Icon type="info" />}>
                        On May 12, 2012, the J - 20 verification aircraft
                        numbered 2001 flew to Yanliang Test Center for test
                        flight.
                    </Timeline.Item>

                    <Timeline.Item color="#1890ff" icon={<Icon type="info" />}>
                        On July 6, 2013, the J - 20 verification machine
                        numbered 2002 moved to the Yanliang test flight center
                        again and began to finalize Test flight.The 2002
                        verification aircraft was the fourth in the first batch,
                        and it was replaced by 2004 at the test center.
                    </Timeline.Item>

                    <Timeline.Item color="#1890ff" icon={<Icon type="info" />}>
                        At the end of 2013, photos of the first batch of the
                        first J - 20 prototypes numbered 2011 were exposed on
                        the Internet.Compared with the previous verification
                        aircraft, the first prototype of the F - 20 was used in
                        painting, cockpit, landing gear hatch, built - in weapon
                        hatch, intake duct, duck wing, side strip, main wing,
                        tail brace, vertical tail Significant improvements have
                        been made in the engine nacelle and other areas, and a
                        new electro - optical tracking system(EOTS) has been
                        newly installed under the nose.
                    </Timeline.Item>

                    <Timeline.Item color="#1890ff" icon={<Icon type="info" />}>
                        On March 1, 2014, the 2011 J - 20 prototype successfully
                        flew for the first time.The first flight was accompanied
                        by a J - 10 S and passed through the field 4 times. [35]
                        On June 17, 2014, the F - 20 prototype of 2011 flew to
                        Yanliang Test Flight Center
                    </Timeline.Item>
                </Timeline>

                <br />
            </div>
        );
    }
}

export default TimelineDev;
