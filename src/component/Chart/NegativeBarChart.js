import ReactApexChart from 'react-apexcharts'
import { products } from '../../pages/DashboardV3/components/fakeData';

export const NegativeBarChart = ({data}) =>{

    const graphData = {
          
     

        options: {
            toolbar:{show:true},
           chart: {
            type: 'bar',
            height: 440,
            stacked: true
          },
          colors: ['#008FFB', '#FF4560'],
          fill: {
            colors: [function({ value, seriesIndex, w }) {
               if(value >0) {
                 return '#008FFB'
             } else {
                 return '#FF4560'
             }
           }]
        },
          plotOptions: {
            bar: {
              horizontal: true,
              barHeight: '80%',
            },
          },
          dataLabels: {
            enabled: true
          },
          stroke: {
            width: 1,
            colors: ["#fff"]
          },
          
          grid: {
            xaxis: {
              lines: {
                show: false
              }
            }
          },
          yaxis: {
            min: -5,
            max: 5,
            title: {
              // text: 'Age',
            },
          },
          tooltip: {
            shared: false,
            x: {
              formatter: function (val) {
                return val
              }
            },
            y: {
              formatter: function (val) {
                return val + "%"
              }
            }
          },
          
          xaxis: {
            categories: [products[0].name, products[1].name, products[2].name, products[3].name, products[4].name, products[5].name, products[6].name, products[7].name,
            products[8].name, products[9].name, products[10].name, products[11].name, products[12].name, products[13].name, products[14].name, products[15].name, products[16].name,
            products[17].name
            ],
            title: {
              text: 'Profit Percentage Over Products'
            },
            legend: { show: false },
            labels: {
              formatter: function (val) {
                return val + "%"
              }
            }
          },
        },
      
      
      };
    
    return(
        <div id="chart">
  <ReactApexChart options={graphData.options} series={data} type="bar" height={440} />
</div>
    
    )
     
}