import React, { useEffect, useState } from 'react'
import jsonData from '../../data/data.json'
import { CompactTable } from "@table-library/react-table-library/compact";
import { useTheme } from "@table-library/react-table-library/theme";
import { getTheme } from "@table-library/react-table-library/baseline";

export default function CustomerTable() {

    const [data, setData] = useState("")
    const [dataDefault, setDataDefault] = useState("")

    const theme = useTheme(getTheme());

    const [searchName, setSearchName] = useState("");
    const [searchAmount, setSearchAmount] = useState("");

    const COLUMNS = [
        // { label: "id", renderCell: (item) => item.customer.id },
        { label: "name", renderCell: (item) => item.customer_name },
        { label: "amount", renderCell: (item) => item.amount },
        { label: "date", renderCell: (item) => item.date },
    ];

    const handleSearch = (event, setState) => {
        setState(event.target.value);
    };



    function customersWithTransaction() {
        let tableData = [...jsonData.transactions];
        tableData.forEach(ele => {
            const customer = jsonData.customers.find((c) => c.id === ele.customer_id);
            ele.customer_name = customer.name;
        });
        console.log(tableData);
        setData({nodes : tableData});
        setDataDefault(tableData)
    }

    useEffect(() => {
        if (dataDefault) {
            console.log(data);
            const newData = {
                nodes: dataDefault.filter((item) =>
                    item.customer_name.toLowerCase().includes(searchName.toLowerCase())
                ),
            };
            if (searchName) {
                setData(newData)
            } else {
                setData({nodes : dataDefault})
            }
        }
    }, [searchName])

    useEffect(() => {
        if (dataDefault) {
            const newData = {
                nodes: dataDefault.filter((item) =>
                    item.amount === parseInt(searchAmount)
                ),
            };
            if (searchAmount) {
                setData(newData)
            } else {
                setData({nodes : dataDefault})
            }
        }
    }, [searchAmount])
    

    useEffect(() => {
        customersWithTransaction()
    }, [])
    

  return (
    <>
    {data && <>
        <label htmlFor="search-name">
        Search by name:&nbsp;
            <input id="search-name" className='form-input' placeholder='name' type="text" value={searchName} onChange={(e) => handleSearch(e, setSearchName)} />
        </label>
        <br />
        <label htmlFor="search-amount">
            Search by amount:&nbsp;
            <input id="search-amount" className='form-input' placeholder='amount' type="text" value={searchAmount} onChange={(e) => handleSearch(e, setSearchAmount)} />
        </label>
        <br />

        <CompactTable columns={COLUMNS} data={data} theme={theme} />
        </>}

    </>
  )
}
