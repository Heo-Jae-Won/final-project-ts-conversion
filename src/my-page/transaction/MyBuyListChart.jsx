import React, { useCallback, useEffect, useRef, useState } from "react";
import Chart from "react-google-charts";
import { useUserStore } from "../../model/user.store";
import { getTradeBuyChart } from "../../util/axios/my/trade";

/**
 * 구매 목록 시각화 차트 화면
 */
const MyBuyListChart = () => {
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

  const fetchTradeBuyChartData = useCallback(async () => {
    //구매 목록 차트
    let result = (await getTradeBuyChart(loginUserNickname)).data;
    let array = toArrayTradeBuyChartData(result.buyListChart);
    setData(array);
  }, [loginUserNickname]);

  //HACK: ts 적용 때 공통함수로 빼내기
  const toArrayTradeBuyChartData = (result) => {
    title.current = "2022 월별 구매 총액";
    chartType.current = "LineChart";

    let array = [];
    array.push(["월", "총액"]);
    result.forEach((item) => {
      array.push([item.month, item.payPrice]);
    });
    return array;
  };

  useEffect(() => {
    fetchTradeBuyChartData();
  }, [fetchTradeBuyChartData]);

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

export default MyBuyListChart;
