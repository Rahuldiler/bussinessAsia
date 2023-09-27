import { chartsConfig } from "@/configs";



const activitiesChart = {
    type: "bar",
    height: 220,
    series: [
      {
        name: "Views",
        data: [50, 20, 10, 22, 50, 10, 40, 10, 50, 10, 40, 10],
      },
    ],
    options: {
      ...chartsConfig,
      colors: "#fff",
      plotOptions: {
        bar: {
          columnWidth: "20%",
          borderRadius: 5,
        },
      },
      xaxis: {
        ...chartsConfig.xaxis,
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      },
    },
  };

  export const activitiesChartData = [
    {
      color: "blue",
      title: "",
      description: "",
      footer: "campaign sent 2 days ago",
      chart: activitiesChart,
    },
  ];
  
export default activitiesChartData;