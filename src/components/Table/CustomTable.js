import {
  DeleteOutlined
} from '@ant-design/icons';
import { Button, Table, Tag } from 'antd';
import React from 'react';


 const CustomTable = ({handleEditMode,data,selectedCategory,handleDelete}) => {

  const columns = [
    {
      title: 'Task Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    
      render: status => (
        <span>
           <Tag color={status === 'New' ? '#EE8A35' : status ==='in Progress' ? '#F6CB52' : status ==='on Hold' ? '#E9C466' : status === 'Canceled' ? '#E75651' : status === 'Completed' ? '#7AC14D' : '#EE8A35'} 
            style={{width:'130px',height:'26px',display:'flex',justifyContent:"center",alignItems:'center'}}>
            {status}
            </Tag>
        </span>
      ),
    },
    {
      title: 'Asigned To',
      dataIndex: 'asignTo',
      key: 'asignTo',
    },
    {
      title: 'Notes',
      dataIndex: 'notes',
      key: 'notes',
    },

    {
      title: 'Action',
      key: 'action',
      render: (record) => (
        <div>
          <Button onClick={() => handleEditMode(record)} style={{width:'60px',height:'30px',backgroundColor:'#1264A3',color:'white'}}>Edit</Button>
          <Button onClick={() => handleDelete(record)} style={{backgroundColor:'#FE4C4A',width:'30px',height:'30px'}} icon={<DeleteOutlined style={{color:"white"}} />}></Button>
        </div>
      ),
    },
  ];


    const allItems = data.flatMap((entry) => {
    if (Array.isArray(entry.items)) {
      return entry.items.map((item) => ({
        ...item,
      }));
    }
     else if (typeof entry.items === "object" && entry.items !== null) {
      return Object.values(entry.items).map((item) => ({
        ...item,
      }));
    }
    return [];
  });

  const dd = allItems.filter((item) => item.parentStatus === selectedCategory.status)
  console.log('dd',dd)

console.log('allItems',allItems)
  const filteredItems = selectedCategory.status
  ? allItems.filter((item) => item.status === selectedCategory.status)
  : allItems;

  console.log('filteredItems',filteredItems)



  // const handleDragEnd = (result) => {
  //   const { source, destination } = result;

  //   if (!destination) return;

  //   const items = [...selectedCategory.items];
  //   const [reorderedItem] = items.splice(source.index, 1);
  //   items.splice(destination.index, 0, reorderedItem);

  //   const updatedData = data.map((cat) =>
  //     cat.id === selectedCategory.id ? { ...cat, items } : cat
  //   );
  //   setData(updatedData);
  // };

{/* <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId={category-${category.id}}>
              {(provided) => (
                <Table
                  dataSource={category.items}
                  columns={columns}
                  rowKey="id"
                  style={{ marginTop: "20px" }}
                  pagination={false}
                  components={{
                    body: {
                      row: ({ className, style, ...restProps }) => (
                        <Draggable
                          draggableId={item-${restProps["data-row-key"]}}
                          index={category.items.findIndex(
                            (item) => item.id === restProps["data-row-key"]
                          )}
                        >
                          {(provided) => (
                            <tr
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={className}
                              style={{
                                ...style,
                                ...provided.draggableProps.style,
                              }}
                            >
                              <td {...restProps} />
                            </tr>
                          )}
                        </Draggable>
                      ),
                    },
                  }}
                />
              )}
            </Droppable>
          </DragDropContext> */}

          console.log('dataaaa',data)

  return (
   <>
  
    {selectedCategory.status ? (
      <div>
         <h2>Items with Status: {selectedCategory.status}</h2>
            <Table
              dataSource={filteredItems}
              columns={columns}
              pagination={false}
            />
          </div>
        )
         :      
        <Table
        // dataSource={}
        columns={columns}
        pagination={false}
        rowKey="id"  
      />
    }
   </>
    
  )
}

export default CustomTable