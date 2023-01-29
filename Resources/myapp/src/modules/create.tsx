import { Form, Input, Select, DatePicker, InputNumber, Button, notification, Spin } from "antd"
import { useEffect, useState } from "react";
import dayjs from 'dayjs';
import type { NotificationPlacement } from 'antd/es/notification/interface';
import { ArgsProps } from "antd/es/message";

const Create = (props: { update: CallableFunction, setVisible: CallableFunction }) => {
    const { update, setVisible } = props;
    const [duration, setDuration] = useState<any>();
    const [dt, setDt] = useState<any>();
    const [loading, setLoading] = useState<boolean>(false);
    const [form] = Form.useForm();
    const conv_id = document.body.dataset['conversation_id'];
    const [api, contextHolder] = notification.useNotification();
    const[has_manually_set_duration, setHasManuallySetDuration] = useState<boolean>(false);

    const handleDurationInput = (e: any) => {
        if(has_manually_set_duration) return;
        const val = parseFloat(e.target.value);
        if (e.target.value.endsWith('h')) {
            setDuration(val * 60);
            form.setFieldValue('duration_mins', val * 60);
        } else if (e.target.value.endsWith('m')) {
            setDuration(val);
            form.setFieldValue('duration_mins', val);
        } else if (e.target.value.endsWith('s')) {
            setDuration(val / 60);
            form.setFieldValue('duration_mins', val / 60);
        }
    }




    useEffect(() => {
        if (duration > 0) {
            const now = dayjs();
            const then = now.subtract(duration, 'minutes');
            setDt(then);
            form.setFieldValue('dt', then);
            console.log(then)
        }
    }, [duration]);

    const toast = () => {
        api.success({
            message: `Call successfully logged`,
            description: 'Call id: 12345',
            placement: 'bottomLeft' as NotificationPlacement,
        });
    }

    const onFinish = (values: any) => {
        setLoading(true);
        // post

        fetch('/calllog/addCall', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': values._token,
            },
            body: JSON.stringify(values)
        }).then((res) => {
            if (res.ok) {
                setLoading(false);
                setVisible(false);
                update((old: any) => old + 1);
                toast();
            }
        }
        )

    };


    useEffect(() => {
        const id = document.body.dataset['conversation_id'];
        form.setFieldValue('c_id', id);
        const csrf = document.getElementsByClassName('csrf-token')[0].getAttribute('value');
        form.setFieldValue('_token', csrf);
    }, []);

    useEffect(() => {
        console.log(form.getFieldValue('dt'))
    }, [form])


    return (

        <Form
            initialValues={{
                dem: 'happy',
                dt: dayjs(),
                ct: 'in'
            }}
            form={form}
            onFinish={onFinish}

            layout="horizontal"
            style={{
                maxWidth: 600,
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                margin: 20,
                rowGap: 10,
            }}
            labelWrap

            size="small"

        >
            {contextHolder}
            {loading && <Spin /> || <>
                <Form.Item name="spokento" style={{ margin: 0, width: "100%" }}>
                    <Input placeholder="Spoke to" autoFocus />
                </Form.Item>


                <Form.Item name="c_reason" style={{ margin: 0, width: "100%" }}>
                    <Select placeholder="Call Reason">
                        <Select.Option value="sales">Sales</Select.Option>
                        <Select.Option value="support">Support</Select.Option>
                        <Select.Option value="bug">Bug</Select.Option>
                        <Select.Option value="customdev">Custom Development</Select.Option>
                        <Select.Option value="happycheck">Happyness Check</Select.Option>
                        <Select.Option value="followup">Follow up</Select.Option>
                        <Select.Option value="other">Other</Select.Option>
                    </Select>

                </Form.Item>
                <Form.Item name="dem" style={{ margin: 0, width: "45%" }}>
                    <Select placeholder="Demeaner">
                        <Select.Option value="happy">Happy</Select.Option>
                        <Select.Option value="sad">Sad</Select.Option>
                        <Select.Option value="angry">Angry</Select.Option>
                        <Select.Option value="confused">Confused</Select.Option>
                        <Select.Option value="other">Other</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item name="ct" style={{ margin: 0, width: "45%" }}>
                    <Select placeholder="Call Type">
                        <Select.Option value="in">Inbound</Select.Option>
                        <Select.Option value="out">Outbound</Select.Option>
                        <Select.Option value="other">Other</Select.Option>
                    </Select>


                </Form.Item>

                {/* duration */}
                <Form.Item name="duration_mins" style={{ margin: 0, width: "100%" }}>
                    <InputNumber
                        addonAfter={
                            <i 
                            style={{
                                color:'#ccc',
                            }}
                            className="glyphicon glyphicon-time" />
                        }
                        key={dt} 
                        style={{ margin: 0, width: "100%" }} 
                        placeholder='duration' 
                        value={duration} 
                        onKeyUp={handleDurationInput} onBlur={(e) => {
                            console.log(e.target.value);
                            setDuration(e.target.value);
                        }}

                    />
                </Form.Item>


                {/* date / time */}

                <Form.Item name="dt" style={{ margin: 0, width: "100%" }}
                    
                >
                    <DatePicker
                        // format as 12h
                        format="DD/MM/YYYY hh:mm A"
                        name='dt' 
                        showTime 
                        showSecond={false} 
                        minuteStep={5} 
                        placeholder="Time of call"
                        style={{ margin: 0, width: "100%" }} 
                        value={dt} 
                        onChange={(e) => setDt(e)}
                        onSelect={(e) => {
                            setDt(e);
                            console.log(e)
                            if(e){
                                setHasManuallySetDuration(true);
                            }

                            form.setFieldValue('dt', e);
                        }}
                        

                        
                    />
                </Form.Item>

                {/* notes */}
                <Form.Item name="notes" style={{ margin: 0, width: 450 }}>
                    <Input.TextArea placeholder='Notes' />
                </Form.Item>

                <Form.Item style={{ margin: 0, width: 450 }}>
                    <Button onClick={() => {
                        form.submit();

                    }}>Submit</Button>
                    <Button style={{ marginLeft: 10 }}
                        onClick={() => {
                            setVisible(false);

                        }}>Cancel</Button>
                </Form.Item>

                <Form.Item name="c_id" style={{ float: 'right' }}>
                    <input type="hidden" name="conversation_id" value={conv_id} />
                </Form.Item>

                <Form.Item name="_token" style={{ float: 'right' }}>
                    <input type="hidden" name="_token" />
                </Form.Item>
            </>}
        </Form>
    )


}

export default Create;