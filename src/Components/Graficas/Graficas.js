import React, { useContext, useMemo, useRef, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { useTheme } from "@mui/material/styles";
import GraficasContext from "../../Context/Graficas/GraficasContext";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const Graficas = () => {
  const { total_tipoClientes } = useContext(GraficasContext);
  const theme = useTheme();
  const chartRef = useRef(null);

  const isDark = theme.palette.mode === "dark";

  const textColor = theme.palette.text.primary;
  const gridColor = theme.palette.divider;

  const getGradient = (ctx, chartArea) => {
    const gradient = ctx.createLinearGradient(
      0,
      chartArea.bottom,
      0,
      chartArea.top,
    );

    if (isDark) {
      gradient.addColorStop(0, "rgba(99,102,241,0.2)");
      gradient.addColorStop(1, "rgba(99,102,241,0.9)");
    } else {
      gradient.addColorStop(0, "rgba(79,70,229,0.2)");
      gradient.addColorStop(1, "rgba(79,70,229,0.9)");
    }

    return gradient;
  };

  const labels = total_tipoClientes.map((item) => item.name);
  const values = total_tipoClientes.map((item) => item.value);

  ChartJS.defaults.color = textColor;
  ChartJS.defaults.borderColor = gridColor;

  const data = useMemo(() => {
    return {
      labels,
      datasets: [
        {
          label: "Total",
          data: values,
          borderRadius: 8,
          borderSkipped: false,
          backgroundColor: (context) => {
            const { chart } = context;
            const { ctx, chartArea } = chart;

            if (!chartArea) return null;
            return getGradient(ctx, chartArea);
          },
        },
      ],
    };
  }, [labels, values, isDark]);

  const options = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,

      animation: {    
        duration: 1200,
        easing: "easeOutQuart",
      },

      plugins: {
        legend: {
          labels: {
            color: textColor,
            font: {
              size: 13,
              weight: "500",
            },
          },
        },
        title: {
          display: true,
          text: "📊 Tipos de Clientes",
          color: textColor,
          font: {
            size: 18,
            weight: "bold",
          },
          padding: {
            bottom: 20,
          },
        },
        tooltip: {
          backgroundColor: isDark ? "#1e1e1e" : "#ffffff",
          titleColor: textColor,
          bodyColor: textColor,
          borderColor: gridColor,
          borderWidth: 1,
        },
      },

      scales: {
        x: {
          ticks: {
            color: textColor,
          },
          grid: {
            color: gridColor,
            drawBorder: false,
          },
        },
        y: {
          ticks: {
            color: textColor,
          },
          grid: {
            color: gridColor,
            drawBorder: false,
          },
        },
      },
    }),
    [textColor, gridColor, isDark],
  );

  return (
    <div
      style={{
        marginTop: "60px",
        height: "400px",
        padding: "25px",
        borderRadius: "16px",
        background: isDark
          ? "linear-gradient(145deg, #1e1e1e, #2a2a2a)"
          : "linear-gradient(145deg, #ffffff, #f5f5f5)",
        boxShadow: isDark
          ? "0 10px 30px rgba(0,0,0,0.6)"
          : "0 10px 30px rgba(0,0,0,0.1)",
        transition: "all 0.3s ease",
      }}
    >
      <Bar
        ref={chartRef}
        key={isDark ? "dark" : "light"}
        data={data}
        options={options}
      />
    </div>
  );
};

export default Graficas;
