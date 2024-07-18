import React, { useEffect, useState } from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import jsonData from '../../data/data.json';
import Select from 'react-select';

export default function CustomerGraph(){

    const [data, setData] = useState({});
    const [customerId, setCustomerId] = useState(0);
    const [customerIdOptions, setCustomerIdOptions] = useState([]);

    function transactionData() {
        let transactionDataGraph = []
        jsonData.transactions.forEach((ele) => {
            if (ele.customer_id === customerId) {
                transactionDataGraph.push({
                    name : ele.date,
                    amount : ele.amount,
                })
            }
        })
        setData(transactionDataGraph);
    }

    function getOptions() {
        const customerIds = []
        jsonData.customers.forEach((ele) => {
            customerIds.push({
                value : ele.id,
                label : ele.name
            })
        })
        setCustomerIdOptions(customerIds)
    }

    function handleChange(e) {
        setCustomerId(e.value)
    }

    useEffect(() => {
        if (customerId) {
            transactionData();
        }
    }, [customerId])

    useEffect(() => {
        getOptions()
    }, [])
    
    
    return (
        <>
        <div className='select-customer'>
            <Select options={customerIdOptions} onChange={handleChange}/>
        </div>
        {customerId ? <div className='bar-chart'>
            <ResponsiveContainer width="100%">
                <BarChart
                    width={500}
                    height={300}
                    data={data}
                    margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="amount" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
                </BarChart>
            </ResponsiveContainer>
        </div> : <></>}
        </>
    );
};