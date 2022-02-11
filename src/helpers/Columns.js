export const COLUMNS = [
    {
        field: "Id",
        headerName: 'ID',
        sortable: false,
        width: 60
    },
    {
        field: "username",
        headerName: 'Username',
        sortable: false,
        width: 140
    },
    {
        field: "email",
        headerName: 'E-Mail',
        sortable: false,
        width: 220
    },
    {
        field: 'createdAt',
        headerName: 'Reg. date',
        sortable: false,
        width: 220,
        valueFormatter: (props) => {
            return `${new Date(props.value).toLocaleString()}`
        }
    },
    {
        field: "lastLogin",
        headerName: "Last login",
        sortable: false,
        width: 220,
        valueFormatter: (props) => {
            if (props.value) {
                return `${new Date(props.value).toLocaleString()}`
            } else {
                return ''
            }

        }
    },
    {
        field: "status",
        headerName: "Status",
        sortable: false,
        width: 140
    },
    {
        field: "isBlocked",
        headerName: "Block status",
        sortable: false,
        width: 140,
        valueFormatter: (props) => {
            if (props.value === true) {
                return `Blocked`
            } else {
                return `Not blocked`
            }
        }
    }
]