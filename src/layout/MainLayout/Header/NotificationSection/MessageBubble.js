import { useState } from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Link } from '@mui/material';
import { RobotApi } from '../../../../api/restful';

// eslint-disable-next-line react/prop-types
export default function MessageBubble({ text, setMessages, scrollToBottom, CallBack, sid }) {
    const [isMouseOver, setIsMouseOver] = useState(false);
    const handleMouseEnter = () => {
        setIsMouseOver(true);
    };

    const handleMouseLeave = () => {
        setIsMouseOver(false);
    };

    function CallBackMsg(value) {
        setMessages((messages) => [...messages, { text: [[value, 0]], flag: true }]);
        const data = {
            version: '3.0',
            service_id: 'S67137',
            session_id: `${sid}`,
            log_id: '4444421',
            request: { terminal_id: '837286', query: `${value}` }
        };
        const robotApi = new RobotApi();
        robotApi.sendMsg(data).then((res) => {
            // console.log(res);
            if (res.data.result.responses[0].actions[0].type === 'failure') CallBack([[res.data.result.responses[0].actions[0].say, 0]]);
            // else CallBackMsg(res.data.result.responses[0].qu_res.qu_res_chosen.intents[0].slots[0].slot_values[0].normalized_word);
            else if (res.data.result.responses[0].actions[0].type === 'guide') {
                // eslint-disable-next-line no-useless-concat
                const list = [
                    [res.data.result.responses[0].actions[0].say, 0],
                    ['1个月', 1],
                    ['2个月', 1],
                    ['3个月', 1],
                    ['6个月', 1],
                    ['12个月', 1],
                    ['24个月', 1],
                    ['36个月', 1]
                ];
                CallBack(list);
            } else CallBack([[res.data.result.responses[0].actions[0].say, 0]]);
            scrollToBottom();
        });
    }
    return (
        <Paper
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            elevation={isMouseOver ? 3 : 1}
            sx={{
                p: 1,
                borderRadius: 2,
                backgroundColor: 'background.paper',
                color: 'text.primary'
            }}
        >
            {/* eslint-disable-next-line no-undef,react/prop-types */}
            {text.map((item, index) => {
                if (item[1]) {
                    return (
                        <Typography maxWidth="500px" key={index}>
                            <Link maxWidth="500px" key={index} onClick={() => CallBackMsg(item[0])}>
                                {item[0]}
                            </Link>
                        </Typography>
                    );
                }
                return (
                    <Typography maxWidth="500px" key={index}>
                        {item[0]}
                    </Typography>
                );
            })}
            {/* <Typography fontSize={8} align="right" sx={{ opacity: '70%', userSelect: 'none' }}> */}
            {/*    {formatTime(props.msgTime)} */}
            {/* </Typography> */}
        </Paper>
    );
}
