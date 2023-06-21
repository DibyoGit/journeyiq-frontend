import React, { useEffect, useState } from 'react'
import { faker } from '@faker-js/faker';
import Card from '../../../component/sharedComponent/Card/Card';
import { Line, Column, Bar } from '@ant-design/plots';
import CustomSelection from '../../../component/sharedComponent/Select/CustomSelection';
import { products } from '../../DashboardV3/components/fakeData';
import { NegativeBarChart } from '../../../component/Chart/NegativeBarChart';



function random_item(items) { return items[Math.floor(Math.random() * items.length)]; }
function random(items) { return Math.floor(Math.random() * items.length); }

const fakeDataGenerater = (Category) => {
    let fakeData = []
    const Product = [
        ['Phone', 'Laptop', 'Washing Machine', 'Air Conditioner', 'Monitor', 'LED'],
        ['The Braille edition of the book Exam Warriors',
            'Believe-What Life and Cricket Taught Me',
            'Whereabouts', 'The Christmas Pig'],
        ['Rice', 'Refine Oil', 'Butter', 'Coke', 'Thumbs UP'],
        ['Jeans', 'Jackets', 'Trouser', 'T-Shirt', 'Shirt']
    ]
    Category.forEach((list, index) => {
        Array.from({ length: 15 }).forEach((element, idx) => {
            const ran = random(products)
            const data = {
                "category": products[ran].category,
                "Product": products[ran].name,
                "sales": faker.datatype.number({ min: 10000, max: 100000 }),
                "date": `12/${idx + 1}/2022`,
                'margin': faker.datatype.number({ min: 10000, max: 10000 }),
                'abandoned': faker.datatype.number({ min: 0, max: 100 }),
                'profit': faker.datatype.number({ min: 1000, max: 10000 }),
                'sales_rate': faker.datatype.number({ min: 0, max: 100 })
            }
            fakeData.push(data)
        });
    })
    return fakeData
}

const HeadingInfo = [
    {
        title: "Volume",
        subTitle: "01, January 2022 - 31, January 2022",
    },
    {
        title: "Profit Margin",
        subTitle: "01, January 2022 - 31, January 2022",
    }, {
        title: "Most Profitable",
        subTitle: "01, January 2022 - 31, January 2022",
    },
    {
        title: "Most and Least Sold",
        subTitle: "01, January 2022 - 31, January 2022",
    },
    {
        title: "Most Abandoned",
        subTitle: "01, January 2022 - 31, January 2022",
    },
   
]
const CategoryOptions = [
    { id: 1, name: 'Display Mounts', value: 1 },
    { id: 2, name: 'Carts And Stand', value: 2 },
    { id: 3, name: 'Projector Mounts', value: 3 },
   
]

const ProductSegmentOption = [
    { id: 1, name: 'Most Profitable', value: 2 },
    { id: 2, name: 'Most Abandoned', value: 4 }
]



const ProductSegment = () => {
   return [
        {
            category: "Electronics",
            Product: "Washing Machine",
            abandoned: 69,
            profit: 43675,
        },
        {
            category: "Electronics",
            Product: "Phone",
            abandoned: 173,
            profit: 883675,
        }, {
            category: "Electronics",
            Product: "Laptop",
            abandoned: 56,
            profit: 564300,
        },
        {
            category: "Electronics",
            Product: "Monitor",
            abandoned: 44,
            profit: 123675,
        },
        {
            category: "Electronics",
            Product: "Led",
            abandoned: 77,
            profit: 82005
        },
        {
            category: "Books",
            Product: "The Braille edition of the book Exam Warriors",
            abandoned: 665,
            profit: 21675
        }, {
            category: "Books",
            Product: "Believe-What Life and Cricket Taught Me",
            abandoned: 69,
            profit: 43675
        }, {
            category: "Grocery",
            Product: "Rice",
            abandoned: 69,
            profit: 43675
        }, {
            category: "Grocery",
            Product: "Refinery Oil",
            abandoned: 43,
            profit: 663675,
        }, {
            category: "Grocery",
            Product: "Coke",
            abandoned: 23,
            profit: 4000,        }, {
            category: "Grocerys",
            Product: "Rice",
            abandoned: 20,
            profit: 500675,
        },
        {
            category: "Cloths",
            Product: "Shirt",
            abandoned: 220,
            profit: 50000
        },
        {
            category: "Cloths",
            Product: "T-Shirt",
            abandoned: 120,
            profit: 320675,
        },
        {
            category: "Cloths",
            Product: "Jackets",
            abandoned: 230,
            profit: 67594
        },
        {
            category: "Cloths",
            Product: "Jeans",
            abandoned: 265,
            profit: 500675,
        },
    ]

}
/* ['Jeans', 'Jackets', 'Trouser', 'T-Shirt', 'Shirt'] */

const mls = [
    {
      type: products[2].name,
      category:products[2].category,
      value:  56.7,
      date:"01/01/23"
    },
    {
      type: products[4].name,
      category:products[4].category,
      value:  46.5,
      date:"01/04/23"
    },
    {
      type: products[12].name,
      category:products[12].category,
      value: 12.1,
      date:"01/08/23"
    },
    {
      type: products[10].name,
      category:products[10].category,
      value: 9.4,
      date:"01/12/23"
    },
    {
      type: products[6].name,
      category:products[6].category,
      value: 32.4,
      date:"01/16/23"
    },
    {
        type: products[8].name,
        category:products[8].category,
        value: 3.4,
        date:"01/20/23"
      },
      {
        type: products[16].name,
        category:products[16].category,
        value: 32.4,
        date:"01/24/23"
      },
 
  ];

const profitData =   [
    {
      name: 'Profits Margin',
      data: [2.8, 3.5, -1.6, 1.1, -1.4, -2.2, 2.8, 3.7, 3.6, -4.2, 4.3, 4.4,
        4.1, 4, 4.1, 3.4, 3.1, 2.8
      ]
    }
    ]

const abandonedData =   [
        {
          name: 'Abandoned rate',
          data: [3.8, 1.5, 7.6, 1.1, 1.4, -2.2, 5.8, 3.7, 3.6, 6.2, 4.3, 4.4,
            8.1, 4, 4.1, 7.4, 10.1, 2.8
          ]
        }
        ]    

function SalesAnalysis() {
    const Category = ['Display Mounts', 'Carts And Stand', 'Projector Mounts']
    const [CategorySelected, setCategorySelected] = useState(1)
    const [CategorySelectedSales, setCategorySelectedSales] = useState(1)
    const [sortedData, setSortedData] = useState([])
    const [segmentSelected , setSegmentSelected] = useState(1)
    const [segmentOption, setSegmentOption] = useState(1)
    const analysisData = fakeDataGenerater(Category)
    const [colData , setcolData] = useState(profitData)




    useEffect(() => {
        const data = analysisData
            .filter((data, idx) => CategorySelected === 1 ? data.category === "Display Mounts":CategorySelected === 2 ? data.category === "Carts And Stand":CategorySelected === 3 ? data.category === "Projector Mounts":"" )
            .sort((a, b) => (b.sales_rate - a.sales_rate))
        setSortedData(data)
    }, [])

    useEffect(() =>{
        if(segmentSelected === 1){
            setcolData(profitData)
        }
        else{
            setcolData(abandonedData)
        }
    },[segmentSelected])
    const paletteSemanticRed = '#F4664A';
    const brandColor = '#5B8FF9';


    let profitConfig = {
        data: fakeDataGenerater(Category).filter((data, idx) => idx < (15 * CategorySelected) && idx > (15 * (CategorySelected - 1))),
        height: 200,
        xField: 'date',
        yField: 'sales',
        seriesField: 'Product',
        
        xAxis: {
            type: 'time'
        }, yAxis: {
            label: {
               
                formatter: (v) => `${v}`
            },
        }
    }
    let productSellConfig = {
        data: mls,
        height: 400,
        padding: '',
        xField: 'type',
        yField: 'value',
        meta:'Product',
        toolbar:true,
        color: ({ type }) => {
         
        if (type === 'Low Profile Floor Stand' || type === 'Black Replacement Poles' || type==="Articulating Wall " ) {
          return paletteSemanticRed;
        }
  
        return brandColor;
      }, 

        xAxis: {
            
        }, yAxis: {
            label: {
                formatter: (v) => `${v}K`
            },
        }
    }

    const config = {
        data:fakeDataGenerater(Category).filter((data, idx) => idx < (15 * CategorySelected) && idx > (15 * (CategorySelected - 1))) ,
        isGroup: true,
        yField: 'Product',
        xField: `${segmentSelected=== 2 ?'profit' : 'abandoned'}`,
        seriesField: 'category',
       
        label: {
          
            position: 'middle',
            
            layout: [
              
              {
                type: 'interval-adjust-position',
              }, 
              {
                type: 'interval-hide-overlap',
              }, 
              {
                type: 'adjust-color',
              },
            ]
        }
    };

    return (
        <div className='col-span-full box-border' >
            <div className='grid gap-2'>
                <Card className=''>
                    <div className='flex flex-row justify-between items-center pl-4 pt-2 pb-1'>
                        <p className=' text-lg'>{HeadingInfo[0].title}</p>             
                        <CustomSelection option={CategoryOptions} setSelection={setCategorySelected} />  
                    </div>
                    <p className='pl-4 pb-0 text-xs opacity-40'>{HeadingInfo[0].subTitle}</p>
                    <div className='p-4'>
                        <Line {...profitConfig} />
                    </div>

                </Card>

                {/* <div className='grid grid-cols-2 gap-2 items-center'>
                    <Card>
                        <div className='flex flex-row justify-between items-center pl-4 pt-2 pb-1'>
                            <p className=' text-lg'>{HeadingInfo[3].title}</p>
                            <CustomSelection option={CategoryOptions} setSelection={setCategorySelectedSales} />
                        </div>
                        <p className='pl-4 pb-0 text-xs opacity-40'>{HeadingInfo[3].subTitle}</p>
                        <div className='p-4 pt-8'>
                            <Column {...productSellConfig} />
                        </div>
                    </Card>
                    <Card>
                        <div className='flex flex-row justify-between items-center pl-4 pt-2 pb-1'>
                            <p className=' text-lg'>{HeadingInfo[segmentSelected].title}</p>
                            <div className='flex flex-row gap-2'>
                            <CustomSelection option={ProductSegmentOption} setSelection={setSegmentSelected} /> 
                            </div>
                        </div>
                        <p className='pl-4 pb-0 text-xs opacity-40'>{HeadingInfo[segmentSelected].subTitle}</p>
                        <div className='p-4'>
                            <Bar {...config} />
                        </div>
                    </Card>

                </div> */}

                <div className='grid grid-cols-2 gap-2 items-center'>
                    <Card>
                        <div className='flex flex-row justify-between items-center pl-4 pt-2 pb-1'>
                            <p className=' text-lg'>{HeadingInfo[3].title}</p>
                            <CustomSelection option={CategoryOptions} setSelection={setCategorySelectedSales} />
                        </div>
                        <p className='pl-4 pb-0 text-xs opacity-40'>{HeadingInfo[3].subTitle}</p>
                        <div className='p-4 mt-8 pb-9'>
                            <Column {...productSellConfig}  />
                        </div>
                    </Card> 

                    <Card>
                        <div className='flex flex-row justify-between items-center pl-4 pt-2 pb-1'>
                            <p className=' text-lg'>{HeadingInfo[segmentSelected].title}</p>
                            {/* <div className='flex flex-row gap-2'>
                             <CustomSelection option={ProductSegmentOption} setSelection={setSegmentSelected} />  
                          
                            </div> */}
                        </div>
                        <p className='pl-4 pb-0 text-xs opacity-40'>{HeadingInfo[segmentSelected].subTitle}</p>
                        <div className='p-4'>
                            <NegativeBarChart data={colData}/>
                        </div>
                    </Card>

                </div>
            </div>


        </div>

    )
}

export default SalesAnalysis