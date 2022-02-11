export const COLUMNS = [
    {
        field: "username",
        headerName: 'Username',
        sortable: false,
        width: 250
    },
    {
        field: "email",
        headerName: 'E-Mail',
        sortable: false,
        width: 250
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
        width: 120
    },
    {
        field: "isBlocked",
        headerName: "Block status",
        sortable: false,
        width: 120,
        valueFormatter: (props) => {
            if (props.value === true) {
                return `Blocked`
            } else {
                return `Not blocked`
            }
        }
    }
]