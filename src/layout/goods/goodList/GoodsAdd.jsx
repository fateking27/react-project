import React, { useEffect, useState } from 'react'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Form, Input, Button, Cascader, Row, Col, Upload } from 'antd';
import api from '@/apis/index';
const { TextArea } = Input;

const GoodsAdd = () => {
    const [cascader, setCascader] = useState();
    const [loading, setLoading] = useState(false);
    // const [imageUrl, setImageUrl] = useState();
    const [addItem, setAddItem] = useState({});

    const handleChange = (info) => {
        console.log('info', info);
        // 当前图片的状态是 uploading（上传中）
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        // 当前图片的状态是 done（上传完成）
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            setAddItem({
                ...addItem,
                imgSrc: 'http://nocat.life:8002/images/goods/' + info.file.response.data
            })
            setLoading(false);

        }
    };

    useEffect(() => {
        getCascader();
    }, [])

    const getCascader = async () => {
        const res = await api.category.getCascader();
        if (res.code == 1) {
            setCascader(res.data);
            console.log(res)
        }
    }
    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Upload
            </div>
        </div>
    );

    return (
        <div>
            <Form>
                <Row gutter={20}>
                    <Col span={10}>
                        <Form.Item label="商品名称">
                            <Input />
                        </Form.Item>
                        <Form.Item label="商品分类">
                            <Cascader placeholder="选择分类" options={cascader} fieldNames={{ value: '_id',label:"value" }} />
                        </Form.Item>
                        <Form.Item label="商品价格">
                            <Input />
                        </Form.Item>
                        <Form.Item label="商品简介">
                            <TextArea rows={4} />
                        </Form.Item>
                        <Form.Item label="商品详情">
                            <TextArea rows={4} />
                        </Form.Item>
                    </Col>
                    <Col>
                        <Form.Item label="商品图片">
                            <Upload
                                name="imgSrc"
                                listType="picture-card"
                                showUploadList={false}
                                action="http://nocat.life:8002/goods/fileUpload"
                                onChange={handleChange}
                            >
                                {addItem.imgSrc ? (
                                    <img
                                        src={addItem.imgSrc}
                                        alt="avatar"
                                        style={{
                                            width: '100%',
                                        }}
                                    />
                                ) : (
                                    uploadButton
                                )}
                            </Upload>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </div>
    )
}

export default GoodsAdd