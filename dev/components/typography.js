import React, { Component } from 'react';
import Typography from '../../components/typography';

const { Title, Blockquote, Paragraph, InlineCode, Code, List } = Typography;

const codeDev = `import React, {Component} from 'react';
import Typography from '../../components/';

const {Title, Blockquote, Paragraph, InlineCode, Code, List} = Typography;
`;

class TypographyDev extends Component {
    render() {
        return (
            <div className="dev-section">
                <h1 className="dev-title"> Typography </h1>

                <Typography>
                    <Title> Forever Butterfly </Title>
                    <Title level={2}> Forever Butterfly </Title>
                    <Title level={3}> Forever Butterfly </Title>
                    <Title level={4}> Forever Butterfly </Title>
                    <Title level={5}> Forever Butterfly </Title>
                    <Paragraph>
                        At that time it was raining, the asphalt road was cold
                        and cold, and lights of blue, yellow, and red flashed.We
                        just hid downstairs and watched the green postbox stand
                        alone across the street.I have a letter in the large
                        pocket of my white trench coat to send to my mother in
                        the south.Sakurako said that she could hold an umbrella
                        and send me a letter in the past.I nodded silently.
                    </Paragraph>
                    <Paragraph>
                        "Who told us to bring only a small umbrella. " She said
                        with a smile, holding up the umbrella and preparing to
                        cross the road to send me a letter.The little raindrops
                        seeping from her umbrella bone splashed on my glasses.
                    </Paragraph>
                    <Paragraph>
                        She just crossed the street to send me a letter.This
                        simple action will make me unforgettable.I slowly opened
                        my eyes, standing blankly downstairs, with tears in my
                        eyes.All the cars in the world stopped and the crowd
                        rushed to the middle of the road.No one knows that the
                        one lying on the street is mine, the butterfly.At this
                        time she was only five meters away from me, which was so
                        far away.Heavier raindrops splashed onto my glasses and
                        splashed into my life.
                    </Paragraph>
                    <Blockquote>
                        However, I saw Sakurako wearing a white trench coat,
                        holding an umbrella, and quietly crossing the road.She
                        is going to help me send a letter.Well, that was a
                        letter to the mother in the south.I stood blankly
                        downstairs, and I saw the eternal Sakurako walk to the
                        center of the street again.In fact, it didn 't rain very
                        much, but it was the biggest rain of a lifetime.And that
                        letter was written like this, does the young Sakurako
                        know ?
                    </Blockquote>
                    <Paragraph>
                        With the sound of sharp brakes, <b> Sakurako </b> 's
                        life flew softly <i>. </i>
                        <a> Slowly </a>, floating on the cold street, like a
                        butterfly at night.
                        <InlineCode> test @chowa.com </InlineCode>
                    </Paragraph>
                    <Code> {codeDev} </Code>
                    <Code language="bash"> {`npm install cw-ui`} </Code>
                    <List>
                        <span> 1 </span> <span> 2 </span> <span> 3 </span>
                        <List>
                            <span> 5 </span> <span> 6 </span> <span> 7 </span>
                            <span> 8 </span>
                        </List>
                    </List>
                </Typography>
            </div>
        );
    }
}

export default TypographyDev;
