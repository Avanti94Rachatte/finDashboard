import React from 'react'
import CustomPieChart from '../Charts/CustomPieChart'
import { useState, useEffect } from 'react'
import { addThousandsSeparator } from "../../utils/helper";

const COLORS = ["#875cf5", "#fa2c37", "#ff6900", "#4f39f6"]
const RecentIncomeWithChart = ({data=[], totalIncome=0}) => {

    const [chartData,setChartData]=useState([])
    const prepareChartData = ()=>{

      if (!Array.isArray(data)) {
        setChartData([]);
        return;
      }
        const dataArr = data?.map((item)=>({
            name:item?.source || "Unknown",
            amount: Number(item?.amount) || 0,
        }))
        setChartData(dataArr)
    }
      useEffect(()=>{
        prepareChartData()
       
      },[data])


  return (
    <div className="card">
        <div className="flex items-center justify-between">
            <h5 className="text-lg">Last 60 Days Income</h5>
        </div>
        <CustomPieChart
        data={chartData}
        label="Total Income"
        totalAmount={`$${addThousandsSeparator(totalIncome)}`}
        showTextAnchor
        colors={COLORS}
        />
    </div>
  )
}

export default RecentIncomeWithChart