import React from "react";
import { Col, Input, Button, Flex, Typography, Row, Tag } from "antd";
import {
  DownloadOutlined,
  PlusOutlined,
  SearchOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import CustomButton from "../../components/CustomButton";

const { Text } = Typography;

const ActionBar = ({
  setModalOpen,
  setFilterStatus,
  filterStatus,
  handleSearchChange,
  searchTitle,
}) => {
  return (
    <>
      <Col span={12}>
        <Input
          value={searchTitle}
          onChange={handleSearchChange}
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
      <Col span={24}>
        {filterStatus && (
          <>
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
          </>
        )}
      </Col>
    </>
  );
};

export default ActionBar;
