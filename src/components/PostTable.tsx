import React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import useFetch from "../hooks/useFetch";
import Post from "../models/Post";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "title", headerName: "Title", width: 300 },
  { field: "body", headerName: "Body", width: 500 },
];

const PostTable: React.FC = () => {
  const {
    data: posts,
    loading,
    error,
  } = useFetch<Post[]>({
    url: "https://jsonplaceholder.typicode.com/posts",
    initialData: [],
  });

  return (
    <>
      <h1>Post Table</h1>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={posts}
            columns={columns}
            autoPageSize
            rowHeight={50}
          />
        </div>
      )}
    </>
  );
};

export default PostTable;
