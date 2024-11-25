import {
  DownloadOutlined,
  PlusOutlined,
  SearchOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import {
  Button,
  Col,
  Flex,
  Input,
  Layout,
  Row,
  Spin,
  Tag,
  Typography,
} from "antd";
import React, { useState } from "react";
import Categories from "../layouts/Categories/Categories";
import CustomButton from "../components/CustomButton/CustomButton";
import CustomModal from "../components/CustomModal/CustomModal";
import CustomTable from "../components/Table/CustomTable";
import { categories } from "../mockData/categories";

const { Content } = Layout;
const { Text } = Typography;

const Main = () => {
  const [data, setData] = useState(categories);
  const [filterStatus, setFilterStatus] = useState("All");
  const [modalOpen, setModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleStatusChange = (selectedCategory) => {
    setFilterStatus(selectedCategory);
  };

  const addTask = (newTask) => {
    setIsLoading(true);
    setData((prev) =>
      prev.map((category) =>
        category.status === newTask.status
          ? {
              ...category,
              items: [...category.items, newTask],
            }
          : category
      )
    );
    setIsLoading(false);
  };

  console.log("filterStauts", filterStatus);

  const filteredTasks =
    filterStatus === "All"
      ? data.flatMap((category) => category.items)
      : data
          .filter((category) => category.status === filterStatus.status)
          .flatMap((category) => category.items);

  return (
    <Content
      style={{
        backgroundColor: "#ffffff",
        margin: "20px",
        borderRadius: "10px",
        padding: "40px",
        minHeight: "80vh",
      }}
    >
      <Row justify="center" style={{ marginBottom: "30px" }}>
        <Col span={24}>
          <Categories categories={data} onChange={handleStatusChange} />
        </Col>
      </Row>

      <Row justify="center" style={{ marginBottom: "20px" }} gutter={16}>
        <Col span={12}>
          <Input
            size="large"
            placeholder="Search..."
            style={{ width: "100%" }}
            prefix={<SearchOutlined style={{ fontSize: "18px" }} />}
          />
        </Col>
        <Col span={12}>
          <Flex justify="end" gap="small">
            <Button
              type="primary"
              icon={<DownloadOutlined />}
              style={{
                width: "32px",
                height: "32px",
                backgroundColor: "#1264A3",
              }}
            />
            <CustomButton
              icon={<PlusOutlined />}
              backgroundColor="#71CF48"
              title="Create New"
              onChange={() => setModalOpen(true)}
            />
            <CustomButton
              icon={<ReloadOutlined />}
              backgroundColor="#B0B0B0"
              title="All Data"
              onChange={() => setFilterStatus("All")}
            />
          </Flex>
        </Col>
      </Row>
      {filterStatus && (
        <Row justify="center" style={{ marginBottom: "20px" }}>
          <Col span={24}>
            <Text
              style={{
                fontSize: "14px",
                fontWeight: "bold",
                marginRight: "5px",
              }}
            >
              Selected Status:
            </Text>
            <Tag
              style={{ padding: "4px 25px", color: "white" }}
              color={
                filterStatus === "All"
                  ? "#b0b0b0"
                  : filterStatus.backgroundColor
              }
            >
              {filterStatus === "All" ? "All" : filterStatus.status}
            </Tag>
          </Col>
        </Row>
      )}

      <Row style={{ marginBottom: "20px" }}>
        <Col span={24}>
          <Spin spinning={isLoading} tip="Loading...">
            <CustomTable data={filteredTasks} />
          </Spin>
        </Col>
      </Row>

      {modalOpen && (
        <CustomModal
          filterStatus={filterStatus}
          categories={data}
          onClose={() => setModalOpen(false)}
          onSubmit={addTask}
          open={() => setModalOpen(true)}
        />
      )}
    </Content>
  );
};

export default Main;
