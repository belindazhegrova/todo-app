import React, { useCallback, useState } from "react";
import { Col, Layout, Row } from "antd";
import { jsPDF } from "jspdf";
import Categories from "../layouts/Categories";
import CustomAddModal from "../components/CustomAddModal";
import CustomTable from "../components/CustomTable";
import ActionBar from "../layouts/ActionBar";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addTask, deleteTask, editTask } from "../store/slices/toDoSlice";
import CustomDeleteModal from "../components/CustomDeleteModal";

const { Content } = Layout;

const Main = () => {
  const data = useSelector((state) => state.todoTask);
  const dispatch = useDispatch();

  const [filterStatus, setFilterStatus] = useState("All");
  const [modalState, setModalState] = useState({
    open: false,
    type: null,
    task: null,
  });

  const [searchTitle, setSearchTitle] = useState("");

  const handleStatusChange = (selectedCategory) => {
    setFilterStatus(selectedCategory);
  };

  const openModal = useCallback((type, task = null) => {
    setModalState({ open: true, type, task });
  }, []);

  const closeModal = useCallback(() => {
    setModalState({ open: false, type: null, task: null });
  }, []);

  const handleSubmitTask = useCallback(
    (task) => {
      if (modalState.type === "edit") {
        dispatch(editTask({ id: modalState.task.id, updatedTask: task }));
      } else if (modalState.type === "add") {
        dispatch(addTask({ status: task.status, task }));
      }

      closeModal();
    },
    [dispatch, modalState, closeModal]
  );

  const handleDelete = useCallback(() => {
    if (modalState.type === "delete") {
      dispatch(deleteTask({ id: modalState.task }));
      closeModal();
    }
  }, [dispatch, modalState, closeModal]);

  const handleSearchChange = (event) => {
    const { value } = event.target;
    setSearchTitle(value);
  };

  const filteredTasks = (data || [])
    .flatMap((category) =>
      filterStatus === "All" || category.status === filterStatus.status
        ? category.items
        : []
    )
    .filter((task) =>
      task.title.toLowerCase().includes(searchTitle.toLowerCase())
    );

  const handleDownloadPdf = () => {
    const doc = new jsPDF();

    doc.setFontSize(12);
    let yOffset = 10;

    filteredTasks.forEach((task, index) => {
      doc.setFontSize(14);
      doc.text(`Task ${index + 1}:`, 10, yOffset);
      yOffset += 8;

      doc.setFontSize(12);
      doc.text(`ID: ${task.id}`, 15, yOffset);
      yOffset += 6;
      doc.text(`Title: ${task.title}`, 15, yOffset);
      yOffset += 6;
      doc.text(`Notes: ${task.notes.replace(/<[^>]+>/g, "")}`, 15, yOffset); // Strip HTML tags
      yOffset += 6;
      doc.text(`Assigned To: ${task.asignTo}`, 15, yOffset);
      yOffset += 6;
      doc.text(`Status: ${task.status}`, 15, yOffset);
      yOffset += 6;
      doc.text(`Category: ${task.category}`, 15, yOffset);
      yOffset += 12;

      if (yOffset > 280) {
        doc.addPage();
        yOffset = 10;
      }
    });

    doc.save("tasks.pdf");
  };

  return (
    <Content
      className="main"
      style={{
        backgroundColor: "#ffffff",
        margin: "20px",
        borderRadius: "10px",
        padding: "40px",
        minHeight: "80vh",
      }}
    >
      <Row className="categories" justify="center">
        <Col span={24}>
          <Categories categories={data} onChange={handleStatusChange} />
        </Col>
      </Row>
      <Row
        className="container"
        gutter={[8, 16]}
        style={{ margin: "25px 0px" }}
      >
        <ActionBar
          setModalOpen={() => openModal("add")}
          setFilterStatus={setFilterStatus}
          handleDownloadPdf={handleDownloadPdf}
          filterStatus={filterStatus}
          handleSearchChange={handleSearchChange}
          searchTitle={searchTitle}
        />
      </Row>
      <Row className="table">
        <Col span={24}>
          <CustomTable
            data={filteredTasks}
            openEditModal={(task) => openModal("edit", task)}
            handleDelete={handleDelete}
            openDeleteModal={(task) => openModal("delete", task)}
          />
        </Col>
      </Row>

      {modalState.open &&
        (modalState.type === "add" || modalState.type === "edit") && (
          <CustomAddModal
            filterStatus={filterStatus}
            categories={data}
            editMode={modalState.task}
            onClose={closeModal}
            onSubmit={handleSubmitTask}
            open={modalState.open}
          />
        )}
      {modalState.open && modalState.type === "delete" && (
        <CustomDeleteModal
          open={modalState.open}
          onSubmit={handleDelete}
          onClose={closeModal}
        />
      )}
    </Content>
  );
};

export default Main;
