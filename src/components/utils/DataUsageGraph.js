import React from "react";
import moment from "moment";
import {
  formatMBSize,
  navdarkToggleColor,
  navlightToggleColor,
} from "./HelperFunctions";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

export default function App(props) {
  const data = props.data.map((obj) => {
    const startTime = moment(obj.period.start_time).format("MM/DD/YYYY");
    obj.period.start_time = startTime;
    const totalData = formatMBSize(obj.data_total);
    obj.data_total = totalData;
    return obj;
  });

  return (
    <>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          width={"100%"}
          height={300}
          data={data}
          layout="horizontal"
          margin={{
            left: 40,
          }}
        >
          <Tooltip />
          <XAxis type="category" label dataKey="period.start_time" />
          <YAxis type="number" tickFormatter={(e) => `${e}MB`} />
          <Bar
            dataKey="data_total"
            fill={
              props.themeColor === "dark"
                ? navdarkToggleColor
                : navlightToggleColor
            }
          />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
}
