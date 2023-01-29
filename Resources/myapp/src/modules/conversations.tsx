import { Tag } from "antd";
import { useEffect } from "react";
import moment from 'moment';

// other codes


const Conversations = (props: { calls: {}[] }) => {

    const { calls } = props;

    useEffect(() => {
        console.log(calls);
    }, [calls]);

    const date_as_time_ago = (date_as_gmt: string) => {
        return moment.utc(date_as_gmt).fromNow()
    };

    const time_as_duration = (duration_as_mins: string) => {
        const duration = moment.duration(duration_as_mins, 'minutes');
        var out = '';
        if (duration.hours() > 0) {
            out += `${duration.hours()}h `;
        }
        if (duration.minutes() > 0) {
            out += `${duration.minutes()}m `;
        }
        if (duration.seconds() > 0) {
            out += `${duration.seconds()}s `;
        }
        return out;
    };


    return (
        <div
            style={{
                width: '100%',
                height: '100%',
                maxHeight: '300px',
                overflowY: 'auto',
                overflowX: 'hidden',
            }}>
            {calls && (calls).map((call: any) => {
                return (
                    <div key={call.id} style={{
                        marginTop: 10,
                        width: '100%',
                        margin: 'auto',
                        fontSize: 12,
                        fontWeight: 'lighter',

                    }}>
                        <hr
                            style={{
                                width: '90%',
                                margin: 'auto',
                                height: 1,
                                backgroundColor: '#cccccb3d',
                                border: 'none',
                            }}
                        />
                        {/* create  2 columns, first avatar, second to contain 3 rows*/}
                        <div style={{ display: 'flex', flexDirection: 'row', padding: 10 }}>
                            <div>
                                <div style={{
                                    width: 40, height: 40, backgroundColor: '#ccc', borderRadius: 50, 
                                    marginRight: 10,
                                    backgroundImage: `url(${call.avatar ?? '/img/default-avatar.png'})`,
                                    backgroundSize: 'contain',
                                    margin: 'auto',
                                }}
                                title={call.user_name}
                                
                                ></div>
                                {/* <div style={{textAlign:'center'}}>
                               {call.user_name}
                               </div> */}
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', width: '100%', marginLeft:10 }}>
                                <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                                    <div style={{ color: '#0078d7', fontSize: 15, fontWeight: 'lighter', width: '100%' }}>
                                        <span style={{
                                            // clamp text to 2 lines
                                            display: '-webkit-box',
                                            WebkitLineClamp: 2,
                                            WebkitBoxOrient: 'vertical',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            // for ie and firefox
                                            maxHeight: 40,
                                            lineHeight: '20px',


                                        }}>
                                            {call.id + ' - ' + (call.call_notes ? call.call_notes : 'No notes...')}
                                        
                                            {call.call_type === 'in' ?
                                    <Tag style={{ float: 'right', transform: 'scale(.8)', margin:'auto'}} color="#f50">Inbound</Tag> :
                                    <Tag style={{ float: 'right', transform: 'scale(.8)', margin:'auto' }} color="#87d068">Outbound</Tag>

                                }
                                        </span>

                                    </div>
                                </div>
                                <div style={{ color: '#918c8c', fontSize: 10, fontWeight: 'bolder' }}>
                                    <i className="glyphicon glyphicon-earphone"/> {call.spoke_to ?? '__'}
                                    {' | '} <i className="glyphicon glyphicon-resize-horizontal"/> {time_as_duration(call.duration) ?? '__'}
                                    {/* time ago from call_date */}
                                    {' | '} <i className="glyphicon glyphicon-time"/> {date_as_time_ago(call.call_date) ?? '__'}

                                </div>
                            </div>
                        </div>

                    </div>
                )


            })}
        </div>
    )
}

export default Conversations;