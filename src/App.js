import MaterialTable from "material-table";
import React, {useState, useEffect, forwardRef} from "react";
import app from "./firebaseStart";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };
  const firestore = app.firestore();
export default function App() {
  const [data,setData] = useState([])
  const theme = createMuiTheme({
    overrides: {
      MuiTableSortLabel: {
        root: {
          color: "#fff",
          "&:hover": {
            color: "#fff !important"
          }
        },
        active: {
          color: "#fff !important"
        }
      }
    }
  });

  async function getData(currentPageSize) {
    let aps = [];
    aps = (
      await firestore
        .collection('posts')
        .orderBy('title','asc')
        .limit(currentPageSize)
        .get()
    ).docs.map((doc) => doc.data());
    console.log('aps :', aps);
    setData(aps)
  }

  useEffect(() => {
    getData(10);
  },[]);

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <MaterialTable
          title="Remote Data Sort Demo"
          columns={[
            { 
              title: "Title", 
              field: "title",
              render: rowData => {
                return (<span>{rowData.title}</span>)
              }
            },
            { title: "Desc", field: "desc" }
          ]}
          options={{
            search: false,
            paging: true,
            sorting: true,
            pageSize: 10,
            headerStyle: {
              backgroundColor: "black",
              color: "white"
            }
          }}
          icons={tableIcons}
          data={data}
          
        />
      </ThemeProvider>
    </div>
  );
}
