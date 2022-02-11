import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { COLUMNS } from '../helpers/Columns';
import { useHistory } from "react-router-dom";
import { IconButton } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/core/styles';
import { Lock, LockOpen, DeleteForever } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    buttonBar: {
        color: "black",
    },
    mainTable: {
        height: 630,
        width: "100%",
        maxWidth: 972,
        backgroundColor: "white",
        margin: "auto",
        textAlign: "center",
    }
}));


const Home = () => {
    const classes = useStyles();
    let history = useHistory();
    const [listOfUsers, setListOfUsers] = useState([]);
    const [listOfIds, setListOfIds] = useState([]);


    useEffect(() => {
        axios.get("https://task3-itransition.herokuapp.com/users").then((response) => {
            setListOfUsers(response.data);
        });
    }, []);

    const deleteData = () => {
        axios.get("https://task3-itransition.herokuapp.com/users/auth",
            { headers: { accessToken: localStorage.getItem("accessToken") } })
            .then((response) => {
                if(!response.data.error) {
                    const deleteIds = listOfIds;
                    axios.put("https://task3-itransition.herokuapp.com/users/deleteUsers", deleteIds).then(() => {
                        history.go(0);
                    })
                } else {
                    history.push("/login");
                }
            });
    };

    const blockUser = () => {
        axios.get("https://task3-itransition.herokuapp.com/users/auth", {
            headers: {
                accessToken: localStorage.getItem("accessToken")
            },
        }).then((response) => {
            if (!response.data.error) {
                console.log(response.data);
                const blockIds = listOfIds;
                axios.put("https://task3-itransition.herokuapp.com/users/blockUsers", blockIds).then(() => {
                    if (blockIds.includes(response.data.id)) {
                        history.push("/login");
                    } else {
                        history.go(0);
                    }
                })
            } else {
                history.push("/login");
            }
        })
    };

    const unblockUser = () => {
        axios.get("https://task3-itransition.herokuapp.com/users/auth", {
            headers: {
                accessToken: localStorage.getItem("accessToken")
            },
        }).then((response) => {
            if (!response.data.error) {
                const unblockIds = listOfIds;
                axios.put("https://task3-itransition.herokuapp.com/users/unblockUsers", unblockIds).then(() => {
                    history.go(0);
                })
            } else {
                history.push("/login")
            }
        })
    }




    return(
        <>
            <div>
                <IconButton onClick={blockUser} title="Block" className={classes.buttonBar}>
                    <Lock />
                </IconButton>
                <IconButton onClick={unblockUser} title="Unblock" className={classes.buttonBar}>
                    <LockOpen />
                </IconButton>
                <IconButton onClick={deleteData} title = "Delete" className={classes.buttonBar}>
                    <DeleteForever />
                </IconButton>
            </div>
            <div className={classes.mainTable} >
                <DataGrid
                    rows={listOfUsers}
                    columns={COLUMNS}
                    pageSize={10}
                    checkboxSelection
                    disableSelectionOnClick
                    disableColumnMenu
                    onSelectionModelChange={itm => setListOfIds(itm)}
                />
            </div>
        </>
    );
};

export default Home;