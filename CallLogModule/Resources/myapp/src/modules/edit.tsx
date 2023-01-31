import { Form, Input, Select, DatePicker, InputNumber, Button, notification, Spin } from "antd"
import { useEffect, useState } from "react";
import dayjs from 'dayjs';
import type { NotificationPlacement } from 'antd/es/notification/interface';
import { ArgsProps } from "antd/es/message";
import AForm from "./form";

const Edit = (props: { update?: CallableFunction, setVisible: CallableFunction }) => {
    const { update, setVisible } = props;
    const [loading, setLoading] = useState<boolean>(false);
    const [form] = Form.useForm();
    const [api, contextHolder] = notification.useNotification();

    const toast = () => {
        api.success({
            message: `Call edited logged`,
            description: 'Call id: 12345',
            placement: 'bottomLeft' as NotificationPlacement,
        });
    }

    const onFinish = (values: any) => {
        setLoading(true);

        fetch('/calllog/addCall', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': values._token,
            },
            body: JSON.stringify(values)
        }).then((res) => {
            if (res.ok) {
                // setLoading(false);
                // setVisible(false);
                // toast();
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

    const data = {
        dem: 'happy',
        dt: dayjs(),
        ct: 'in'
    }

    return (

        <AForm
            form={form}
            onFinish={onFinish}
            loading={loading}
            contextHolder={contextHolder}
            setVisible={setVisible}
            data={data}
            onfinish={onFinish} 
            readonly={true}
        />
    )


}

export default Edit;