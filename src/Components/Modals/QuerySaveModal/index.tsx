import { Form, Input, Modal, Select } from "antd";
import { FormInstance } from "antd/es/form/Form";
import { QUERY_CATEGORIES } from "../../../interface";
import React, { useEffect } from "react";

export interface QuerySaveModalProps {
    show: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onSubmit: (values: any) => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onFailure: (errorInfo: any) => void;
    onCancel: () => void;
    form: FormInstance;
    query: string;
}

const QuerySaveModal: React.FC<QuerySaveModalProps> = ({
    show,
    onSubmit,
    onFailure,
    onCancel,
    query,
    form,
}) => {
    const categoryOptions = Object.values(QUERY_CATEGORIES).map((value) => {
        return {
            value,
            label: value,
        };
    });

    useEffect(() => {
        form.resetFields();
    }, [show]);

    const handleSubmit = () => {
        form.submit();
    };
    return (
        <Modal
            title="Save Query"
            open={show}
            onOk={handleSubmit}
            onCancel={onCancel}
        >
            <Form
                name="querySave"
                form={form}
                initialValues={{ query }}
                onFinish={onSubmit}
                onFinishFailed={onFailure}
                autoComplete="off"
            >
                <Form.Item name="title" rules={[{ required: true }]}>
                    <Input placeholder="Title" />
                </Form.Item>
                <Form.Item name="query" rules={[{ required: true }]}>
                    <Input.TextArea
                        placeholder="Query"
                        autoSize={{ minRows: 3, maxRows: 3 }}
                    />
                </Form.Item>
                <Form.Item name="category" rules={[{ required: true }]}>
                    <Select
                        options={categoryOptions}
                        placeholder="Select Category"
                    ></Select>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default QuerySaveModal;
