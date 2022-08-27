import React from "react";
import { PieChart } from "react-minimal-pie-chart";
import "../css/Stats.css";

const Stats = (props) => {
  const { data } = props;
  const [totalCals, setTotalCals] = React.useState(0);
  const [macros, setMacros] = React.useState({
    p: 0,
    c: 0,
    f: 0,
  });

  const calc = () => {
    let t = 0;
    let p = 0;
    let c = 0;
    let f = 0;
    data.foodLog.forEach((item) => {
      t += item.calories;
      p += item.p;
      c += item.c;
      f += item.f;
    });
    setTotalCals(t);
    setMacros({ p: p, c: c, f: f });
  };

  React.useEffect(() => {
    if (data && data !== null) {
      calc();
    } else {
      setTotalCals(0);
      setMacros({ p: 0, c: 0, f: 0 });
    }
  }, [data]);

  return (
    <div className="card">
      <h3>Daily Report</h3>
      <table>
        <tbody>
          <tr>
            <td>Total Calories</td>
            <td>{Math.round(totalCals)}</td>
          </tr>
          <tr>
            <td>Macros</td>
            <td className="flex-col">
              <p>Protein: {Math.round(macros.p)}gm</p>
              <p>Carbohydrates: {Math.round(macros.c)}gm</p>
              <p>Fats: {Math.round(macros.f)}gm</p>
            </td>
          </tr>
        </tbody>
      </table>
      {macros.p > 0 && macros.c > 0 && macros.f > 0 ? (
        <PieChart 
          animate={true}
          animationDuration={1000}
          animationEasing="ease-out"
          center={[50, 50]}
          lengthAngle={360}
          lineWidth={80}
          paddingAngle={2}
          startAngle={0}
          viewBoxSize={[100, 100]}
          label={(l) => l.dataEntry.title}
          labelPosition={70}
          labelStyle={{
            fontSize: "50%",
            fontColor: "#ffffff",
            fontWeight: "800",
          }}
          data={[
            { title: "Protein", value: macros.p, color: "#ff6600" },
            { title: "Carbs", value: macros.c, color: "#C13C37" },
            { title: "Fats", value: macros.f, color: "#997a00" },
          ]}
          className="chart"
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default Stats;
