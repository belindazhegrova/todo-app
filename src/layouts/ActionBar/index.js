import React from "react";
import { Col, Input, Flex, Typography, Tag } from "antd";
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
  handleDownloadPdf,
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
          <CustomButton
            message="Download File"
            icon={<DownloadOutlined />}
            onChange={handleDownloadPdf}
            customStyle={{
              height: "32px",
              width: "32px",
              backgroundColor: "#1264A3",
            }}
          />
          <CustomButton
            icon={<PlusOutlined />}
            title="Create New"
            onChange={setModalOpen}
            customStyle={{
              width: "150px",
              backgroundColor: "#71CF48",
            }}
          />
          <CustomButton
            icon={<ReloadOutlined />}
            title="All Data"
            onChange={() => setFilterStatus("All")}
            customStyle={{
              width: "150px",
              backgroundColor: "#B0B0B0",
            }}
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
