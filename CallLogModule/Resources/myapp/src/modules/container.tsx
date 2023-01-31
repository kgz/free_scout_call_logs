import React, { useEffect, useState } from 'react';
import {
    Button,
    Cascader,
    DatePicker,
    Form,
    Input,
    InputNumber,
    Radio,
    Select,
    Switch,
    TreeSelect,
} from 'antd';
import Create from './create';
import Conversations from './conversations';

const Container = () => {
    const conv_id = document.body.dataset['conversation_id'];
    const [showAdd, setShowAdd] = useState<boolean>(false);
    const [update, setUpdate] = useState(0);
    const [calls, setCalls] = useState<{}[]>([]);

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        fetch(`/calllog/getCallByConvo?id=` + conv_id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            signal: signal,
        })
            .then((response) => response.json())
            .then((data) => {
                setCalls(data.calls);
            }
            )
            .catch((error) => {
                console.log(error);
            });


        return () => {
            controller.abort();
        };


    }, [update]);

    useEffect(() => {
        const int = setInterval(() => {
            setUpdate(old => old + 1);
        }, 60_000);

        return () => {
            clearInterval(int);
        }

    }, []);

    return (
        <div >
            <div style={{
                backgroundColor: '#f7f9fb',
                textIndent: 10,
            }}
            >
                <div style={{ color: '#918c8c', fontSize: 15, fontWeight: 'bolder' }}>
                    Call Log
                    <div
                        style={{
                            float: 'right',
                            color: '#918c8c',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            height: 24,
                            marginRight: 10,
                            cursor:'pointer'
                        }}
                    >
                        {/* add external */}
                        <i className="glyphicon glyphicon-resize-full" title='Open'
                            aria-hidden="true" onClick={() => {}}></i>
                        <i className="glyphicon glyphicon-refresh" title='Refresh'
                            aria-hidden="true" onClick={() => setUpdate(old => old + 1)}></i>
                    </div>
                </div>
            </div>
            {showAdd && <Create update={setUpdate} setVisible={setShowAdd} />}
            {!showAdd &&
                <>
                    <div style={{
                        width: '90%',
                        margin: 'auto',
                        height: 40,
                        fontSize: 20,
                        padding: 10,
                        borderRadius: 5,
                        marginBlock: 10,
                        border: '1px dashed #ccc',
                        textAlign: 'center',
                        lineHeight: '20px',
                        color: '#ccc',
                        cursor: 'pointer',

                    }}

                        onClick={() => setShowAdd(true)}
                    >Add Call</div>

                    <Conversations calls={calls}  />
                </>
            }
        </div>
    );


}

export default Container;