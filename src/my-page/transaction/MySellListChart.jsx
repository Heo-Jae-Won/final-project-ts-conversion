import React, { useCallback, useEffect, useRef, useState } from "react";
import Chart from "react-google-charts";
import { useUserStore } from "../../model/user.store";
import { getTradeSellChart } from "../../util/axios/my/trade";

/**
 * 판매 화면 시각화 차트 목록
 */
const MySellListChart = () => {
  const loginUserNickname = useUserStore((state) => state.loginUserNickname);
  const [data, setData] = useState([]);
  const chartType = useRef("Bar");
  const title = useRef("직업별인원수");

  const options = {
    title: title.current,
    lineWidth: 4,
    curveType: "function",
    animation: {
      startup: true,
      duration: 1000,
      easing: "linear",
    },
    legend: {
      position: "right",
      alignment: "center",
      textStyle: { color: "black", fontSize: 20, bold: true },
    },
  };

  //fetch data from db + put it in state variable
  const fetchTradeSellChartData = useCallback(async () => {
    //판매 목록 차트
    let result = (await getTradeSellChart(loginUserNickname)).data;
    let array = toArrayTradeBuyChartData(result.sellListChart);
    setData(array);
  }, [loginUserNickname]);

  //HACK: ts 적용 때 공통함수로 빼내기
  const toArrayTradeBuyChartData = (result) => {
    title.current = "2022 월별 판매 총액";
    chartType.current = "LineChart";

    let array = [];
    array.push(["월", "총액"]);
    result.forEach((item) => {
      array.push([item.month, item.payPrice]);
    });
    console.log(array);
    return array;
  };

  useEffect(() => {
    fetchTradeSellChartData();
  }, [fetchTradeSellChartData]);

  return (
    <div style={{ marginTop: 100 }}>
      <Chart
        chartType={chartType.current}
        width="100%"
        height="400px"
        data={data}
        options={options}
      />
    </div>
  );
};

export default MySellListChart;
