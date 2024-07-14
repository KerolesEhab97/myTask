import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Chart as CHARTJS } from 'chart.js/auto';
import { Bar, Line } from 'react-chartjs-2';

export default function TransactionChat() {
  const [customers, setCustomers] = useState(null)
  async function getCustomers() {
    try {
      const { data } = await axios.get('http://localhost:8000/customers')
      console.log(data)
      setCustomers(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getCustomers()
  }, [])

  return (
    <>
      <div className="container mx-auto mt-10">
        <Bar data={{
          labels: customers?.map((ele) => ele?.id),
          datasets: [
            {
              label: "Amount",
              data: customers?.map((ele) => ele?.amount)
            }
          ]
        }} />
      </div>
    </>
  )
}
