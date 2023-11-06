import React, { useEffect, useState } from "react";
import ReactEcharts from "echarts-for-react";
import api from "@/apis";

export default function HomePage() {
  const [cascader, setCascader] = useState([]);
  let categores = [];
  let arr = [];

  const getCascader = async () => {
    const res = await api.category.getCascader();
    console.log(res);
    if (res.code == 1) {
      categores = res.data;
      console.log(categores);
      categores.forEach((item) => {
        arr.push({ value: item.children.length, name: item.label });
      });
      setCascader(arr);
    }
    console.log(arr);
  };


  useEffect(() => {
    getCascader();
  }, []);

  return (
    <div>
      <ReactEcharts
        style={{ width: 1085, height: 475 }}
        option={{
          backgroundColor: "#2a779a",
          title: {
            text: "商品信息展示",
            left: "center",
            top: 20,
            textStyle: {
              color: "#ccc",
            },
          },
          tooltip: {
            trigger: "item",
          },
          visualMap: {
            show: true,
            min: 80,
            max: 600,
            inRange: {
              colorLightness: [0, 1],
            },
          },
          series: [
            {
              name: "商品一级分类下的二级分类数目",
              type: "pie",
              radius: "55%",
              center: ["50%", "50%"],
              data: cascader.sort(function (a, b) {
                return a.value - b.value;
              }),
              roseType: "radius",
              label: {
                color: "rgba(145, 655, 225, 0.7)",
              },
              labelLine: {
                lineStyle: {
                  color: "rgba(145, 655, 225, 0.7)",
                },
                smooth: 0.2,
                length: 10,
                length2: 20,
              },
              itemStyle: {
                color: "#c23531",
                shadowBlur: 400,
                shadowColor: "rgba(145, 655, 225, 0.7)",
              },
              animationType: "scale",
              animationEasing: "elasticOut",
              animationDelay: function (idx) {
                return Math.random() * 200;
              },
            },
          ],
        }}
      ></ReactEcharts>
    </div>
  );
}
