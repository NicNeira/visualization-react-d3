import { useEffect, useState } from "react";
import "./styles.css";
import { arc, csv, pie } from "d3";

const csvUrl =
  "https://gist.githubusercontent.com/NicNeira/96037955f51d06ffb8b0fc5859841e66/raw/61484678be2d25098d6ce53ee001a7446652e469/coloresgcsv.csv";

const width = 960;
const height = 500;
const centerX = width / 2;
const centerY = height / 2;

const pieArc = arc().innerRadius(0).outerRadius(width);

export default function App() {
  // useState para setear la posicion
  const [data, setData] = useState(null);

  useEffect(() => {
    csv(csvUrl).then(setData);
  }, []);

  if (!data) {
    return <pre>Loading....</pre>;
  }

  const colorPie = pie().value(1);

  return (
    // svg y width y height asignamos el ancho y alto del "lienzo" svg
    <svg width={width} height={height}>
      {/* con g y transform centramos el path */}
      <g transform={`translate(${centerX},${centerY})`}>
        {/* pie() es una funcion y value tambien, revisar en docs d3 */}
        {colorPie(data).map((d) => (
          <path fill={d.data["Hex rgb"]} d={pieArc(d)} />
        ))}
      </g>
    </svg>

    // Primera forma sin utilizar funcion pie de d3
    /// Asignamos una funcion para cada elemnto del array de colores
    // {
    //   data.map((d, i) => (
    //   // asignamos una key con el nombre del color, fill para rellenar ese color y con d llamamos a la funcion y aplicamos los atributos de d3
    //   <path
    //     // key={d["Color name"]}
    //     fill={d["Hex rgb"]}
    //     d={pieArc({
    //       startAngle: (i / data.length) * 2 * Math.PI,
    //       endAngle: ((i + 1) / data.length) * 2 * Math.PI
    //     })}
    //   />
    // ))

    // }
  );

  return <div className="App"></div>;
}
