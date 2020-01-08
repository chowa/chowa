import React, { Component } from 'react';
import Typography from '../../components/typography';

const { Title, Blockquote, Paragraph, InlineCode, Code, List } = Typography;

const codeDev = `import React, { Component } from 'react';
import Typography from '../../components/';

const { Title, Blockquote, Paragraph, InlineCode, Code, List } = Typography;
`;
class TypographyDev extends Component {

    render() {
        return (
            <div className='dev-section'>
                <h1 className='dev-title'>Typography</h1>

                <Typography>
                    <Title>永远的蝴蝶</Title>
                    <Title level={2}>永远的蝴蝶</Title>
                    <Title level={3}>永远的蝴蝶</Title>
                    <Title level={4}>永远的蝴蝶</Title>
                    <Title level={5}>永远的蝴蝶</Title>

                    <Paragraph>
                        那时候刚好下着雨，柏油路面湿冷冷的，还闪烁着青、黄、红颜色的灯火。我们就在骑楼下躲雨，看绿色的邮筒孤独地站在街的对面。我白色风衣的大口袋里有一封要寄给南部的母亲的信。樱子说她可以撑伞过去帮我寄信。我默默点头。
                    </Paragraph>
                    <Paragraph>
                        “谁叫我们只带来一把小伞哪。”她微笑着说，一面撑起伞，准备过马路帮我寄信。从她伞骨渗下来的小雨点，溅在我的眼镜玻璃上。
                    </Paragraph>
                    <Paragraph>
                        她只是过马路去帮我寄信。这简单的行动，却要叫我终身难忘了。我缓缓睁开眼，茫然站在骑楼下，眼里裹着滚烫的泪水。世上所有的车子都停了下来，人潮涌向马路中央。没有人知道那躺在街面的，就是我的，蝴蝶。这时她只离我五公尺，竟是那么遥远。更大的雨点溅在我的眼镜上，溅到我的生命里来。
                    </Paragraph>

                    <Blockquote>
                        然而我又看到樱子穿着白色的风衣，撑着伞，静静地过马路了。她是要帮我寄信的。那，那是一封写给南部母亲的信。我茫然站在骑楼下，我又看到永远的樱子走到街心。其实雨下得并不大，却是一生一世中最大的一场雨。而那封信是这样写的，年轻的樱子知不知道呢？
                    </Blockquote>

                    <Paragraph>
                        随着一阵拔尖的煞车声，<b>樱子</b>的一生轻轻<i>地飞了起来。</i><a>缓缓地</a>，飘落在湿冷的街面上，好像一只夜晚的蝴蝶。
                        <InlineCode>test@chowa.com</InlineCode>
                    </Paragraph>

                    <Code>{ codeDev }</Code>
                    <Code language='bash'>{ `npm install cw-ui` }</Code>
                    <List>
                        <span>1</span>
                        <span>2</span>
                        <span>3</span>
                        <List>
                            <span>5</span>
                            <span>6</span>
                            <span>7</span>
                            <span>8</span>
                        </List>
                    </List>
                </Typography>
            </div>
        );
    }
}

export default TypographyDev;
