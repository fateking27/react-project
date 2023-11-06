import React, { useEffect, useState } from "react";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Form,
  Input,
  Button,
  Cascader,
  Row,
  Col,
  Upload,
  Space,
  message,
} from "antd";
import api from "@/apis/index";
import { useNavigate } from "react-router-dom";
const { TextArea } = Input;

const GoodsAdd = () => {
  const navigate = useNavigate();
  const [cascader, setCascader] = useState();
  const [cate, setCate] = useState();
  const [loading, setLoading] = useState(false);
  const [addItem, setAddItem] = useState({});

  const handleChange = (info) => {
    console.log("info", info);
    // 当前图片的状态是 uploading（上传中）
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    // 当前图片的状态是 done（上传完成）
    if (info.file.status === "done") {
      // Get this url from response in real world.
      setAddItem({
        ...addItem,
        imgSrc: "http://127.0.0.1:8002/images/goods/" + info.file.response.data,
      });
      setLoading(false);
    }
  };

  useEffect(() => {
    getCascader();
    getCate();
  }, []);

  const getCascader = async () => {
    const res = await api.category.getCascader({ parentId: 0 });
    if (res.code == 1) {
      setCascader(res.data);
      console.log(res);
    }
  };
  const getCate = async () => {
    const res = await api.category.get({ parentId: 0 });
    if (res.code == 1) {
      console.log(res);
      setCate(res.data.data);
    }
  };
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const addGoods = async (FormData) => {
    console.log(FormData.type);
    // const res = await api.goods.addGoods({
    //   ...FormData,
    //   type: FormData.type.pop(),
    //   ...addItem,
    // });
    // if (res.code == 1) {
    //   message.success("商品新增成功");
    //   navigate("/goods/goodlist");
    // } else {
    //   message.error(res.msg);
    // }
  };

  return (
    <div>
      <Form onFinish={addGoods}>
        <Row gutter={20}>
          <Col span={10}>
            <Form.Item label="商品名称" name="name">
              <Input />
            </Form.Item>
            <Form.Item label="商品分类" name="type">
              <Cascader
                allowClear={false}
                placeholder="选择分类"
                options={cascader}
                fieldNames={{
                  value: "id",
                  label: "label",
                }}
              />
            </Form.Item>
            <Form.Item label="商品价格" name="price">
              <Input />
            </Form.Item>
            <Form.Item label="商品简介" name="title">
              <TextArea rows={4} />
            </Form.Item>
            <Form.Item label="商品详情" name="msg">
              <TextArea rows={4} />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item label="商品图片">
              <Upload
                name="imgSrc"
                listType="picture-card"
                showUploadList={false}
                action="http://127.0.0.1:8002/goods/fileUpload"
                onChange={handleChange}
              >
                {addItem.imgSrc ? (
                  <img
                    src={addItem.imgSrc}
                    alt="avatar"
                    style={{
                      width: "100%",
                    }}
                  />
                ) : (
                  uploadButton
                )}
              </Upload>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={9}></Col>
          <Col>
            <Form.Item>
              <Space>
                <Button htmlType="submit" type="primary">
                  确认新增
                </Button>
              </Space>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default GoodsAdd;
