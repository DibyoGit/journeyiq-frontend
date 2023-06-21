import { faker } from '@faker-js/faker';
import {HiOutlineLightBulb , HiOutlineTag} from 'react-icons/hi'
import {MdOutlineFeedback} from 'react-icons/md'
import {AiOutlineAntDesign} from 'react-icons/ai'
import { usState } from './usState';

export const products = [
    {
        name: 'PTDM2 Display ',
        subCategory:'Ceiling Mounts',
        category:'Display Mounts',
        

    } , 
    {   name: 'PTDM1 Display ',
        subCategory:'Ceiling Mounts',
        category:'Display Mounts'
    } ,
    { 
        name: 'ECM Single ',
        subCategory:'Tilt Mounts' , 
        category:'Display Mounts'
    },
    { 
        name: 'Flat Panel',
        subCategory:'Ceiling Mounts' , 
        category:'Display Mounts'
    },
    { 
        name: 'Tilting ',
        subCategory:'Ceiling Mounts' , 
        category:'Display Mounts'
    },
    { 
        name: ' OH55 Display',
        subCategory:'Outdoor Mounts' , 
        category:'Display Mounts'
    },
    { 
        name: 'Articulating ',
        subCategory:'Articulating Mounts' , 
        category:'Display Mounts'
    },
    { 
        name: 'Swingout ',
        subCategory:'Articulating Mounts' , 
        category:'Display Mounts'
    },
    { 
        name: 'Articulating Wall ',
        subCategory:'Articulating Mounts' , 
        category:'Display Mounts'
    },
    { 
        name: 'Dual Arm Swingout ',
        subCategory:'Articulating Mounts' , 
        category:'Display Mounts'
    },
    { 
        name: 'Black Replacement Poles',
        subCategory:'Mobile Cart' , 
        category:'Carts And Stand'
    },
    { 
        name: 'Chrome Replacement Poles',
        subCategory:'Mobile Cart' , 
        category:'Carts And Stand'
    },
    { 
        name: 'Low Profile Floor Stand',
        subCategory:'Mobile Cart' , 
        category:'Carts And Stand'
    },
    { 
        name: 'Rugged Extension Adapter',
        subCategory:'Mobile Cart' , 
        category:'Carts And Stand'
    },
    { 
        name: 'Mount to Cart',
        subCategory:'Floor Stand' , 
        category:'Carts And Stand'
    },
    { 
        name: 'Dual Pole Stand',
        subCategory:'Floor Stand' , 
        category:'Carts And Stand'
    },
    { 
        name: 'Magnet Assited ',
        subCategory:'Weight Capacity 45 lbs' , 
        category:'Projector Mounts'
    },
    { 
        name: 'Adjustable Height Projector ',
        subCategory:'Weight Capacity 45 lbs' , 
        category:'Projector Mounts'
    },
    { 
        name: 'PBC Series',
        subCategory:'Weight Capacity 65 lbs' , 
        category:'Projector Mounts'
    },
    { 
        name: 'Fine Tune Projector',
        subCategory:'Weight Capacity 65 lbs' , 
        category:'Projector Mounts'
    },
    


    
    ]

export const page = [
    '/projector-mounts/weight-capacity-65-lbs',
    '/carts-and-stands',
    '/where-to-buy','/contact','/display-mounts/rotating-mounts',
    '/rotating-mount-flat',
    '/display-mounts/ceiling-mounts'
]    

export const DashobardFakeData = [
     {
        title:"Acquisition",
        subtitle: "Data collection period: Jan 01,2023 - Jan 31, 2023",
        Value : `${faker.finance.amount(20, 40 , 1)}K`,
        unit: "New Aquisitions",
        path:"/dashboard/acquisition",
        analytics:[
            {
                title:"Phone Calls",
                value: `+${faker.datatype.number({ min: 20, max: 100 })}%`,
                inc:true
            },
            {
                title:"Email",
                value: `+${faker.datatype.number({ min: 10, max: 60 })}%`
                , inc:true
            }, 
            
             {
                title:"Form Submits",
                value:`${faker.finance.amount(2, 6 ,1 )}K`
                , inc:true
            },
            {
                title:"Conversion",
                value:`-${faker.datatype.number({ min: 1, max: 10 })}%`
                , inc:false
            },
        ],
        summary:"Customer acquisition has been increased by approximately 60 percent between 2020 and 2022.",
        sa:`Acquisition increased by 51% over the previous six months.`,
        insight:[
           
            {
                id:2,
                title:"which page create most misleads?"
                ,
                des:faker.random.words(50)
            },
            {
                id:3,
                title:"Which days have Maximum Sales ?",
                des:faker.random.words(50)
            },
            {
                id:4,
                title:"Which category provide most profit to business?",
                des:faker.random.words(50)
            },
            {
                id:5,
                title:"What category we need to improve to increase sales?",
                des:faker.random.words(50)
            },
           
        ]
     },
     {
        title:"Behaviour",
        subtitle: "Data collection period: Jan 01,2023 - Jan 31, 2023",
        Value : `${faker.finance.amount(10, 50,1 )}K`,
        unit: "New Users",
        path:"/dashboard/behaviour",
        analytics:[
           
            {
                title:"Most Engaged",
                value: page[2]
                , inc:true
            }, 
            {
                title:"Drop-off",
                value: `+${faker.datatype.number({ min: 20, max: 100 })}%`
                , inc:true
            },
            {
                title:"Hesitation Rate ",
                value:`-${faker.datatype.number({ min: 1, max: 10 })}%`
                , inc:false
            }
        ],
        summary:"The purchasing behavior of final customer or individual or household who buys goods & services for personal and commercial use has also changed",
        sa:`Observed behavioural changes from the previous seven months: 34%`,
        insight: [
            {
                id:1,
                title:"Most Abandoned Product with high purchase rate",
                des:faker.random.words(50)
            },
            {
                id:2,
                title:"which page create most misleads?"
                ,
                des:faker.random.words(50)
            },
            {
                id:3,
                title:"Which days have Maximum Sales ?",
                des:faker.random.words(50)
            },
            {
                id:4,
                title:"Which category provide most profit to business?",
                des:faker.random.words(50)
            },
            {
                id:5,
                title:"What category we need to improve to increase sales?",
                des:faker.random.words(50)
            },
            {
                id:6,
                title:"Which product have high COGs ?",
                des:faker.random.words(50)
            }
        ]
     },
     {
        title:"Ecommerce",
        subtitle: "Data collection period: Jan 01,2023 - Jan 31, 2023",
        Value :`${faker.finance.amount(50, 99 ,1 ,'$')}K`,
        unit: "Sales",
        path:"/dashboard/ecommerce",
        analytics:[
            {
                title:"Most Sold ",
                value: products[2].name
                , inc:true
            },
            {
                title:"Most Abandoned ",
                
                value: products[5].name
                , inc:false
            }, 
            {
                title:"Most Profitable  ",
                value:products[6].name
                , inc:true
            }
        ],
        summary:"The buying and selling of goods and services has changed. New use percentage are drastically changed in last 3 quarters",
        sa:`10% greater sales during the past three months.`,
        insight: [
            {
                id:1,
                title:"Most Abandoned Product with high purchase rate",
                des:faker.random.words(50)
            },
           
            {
                id:3,
                title:"Which days have Maximum Sales ?",
                des:faker.random.words(50)
            },
            {
                id:4,
                title:"Which category provide most profit to business?",
                des:faker.random.words(50)
            },
            {
                id:5,
                title:"What category we need to improve to increase sales?",
                des:faker.random.words(50)
            },
            {
                id:6,
                title:"Which product have high COGs ?",
                des:faker.random.words(50)
            }
        ]
     },


    ]

export const productSummary = [
    {
       title: "Highest Selling Product",
       subtitle:"Data collection period: Jan 01,2023 - Jan 31, 2023",
       desc: products[faker.datatype.number({min:0 , max:19})].name,
       descTitle:"Product",
       value:`${faker.finance.amount(50, 100 ,1 )}K`,
       unit:"units",
       path:"/dashboard/productsales",
       nav:"Explore Highest Selling Product",
       insightDetail:[
         {
            value:`Sales of flat panel products climbed during the previous six weeks by 12%.` ,
            impact:true
         },
       ],
      insight: [
        {
            id:1,
            title:"Most Abandoned Product with high purchase rate",
            des:faker.random.words(50)
        },
       
        {
            id:3,
            title:"Which days have Maximum Sales ?",
            des:faker.random.words(50)
        },
        {
            id:4,
            title:"Which category provide most profit to business?",
            des:faker.random.words(50)
        },
        {
            id:5,
            title:"What category we need to improve to increase sales?",
            des:faker.random.words(50)
        },
        {
            id:6,
            title:"Which product have high COGs ?",
            des:faker.random.words(50)
        }
    ]
    },
    {
        title: "State With Most Order",
        subtitle:"Data collection period: Jan 01,2023 - Jan 31, 2023",
        desc:usState[faker.datatype.number({max:50})].name,
        descTitle:"State",
        value:`${faker.finance.amount(50, 100 ,1 )}K`,
        unit:"units",
        path:"/dashboard/countrysales",
        nav:"Explore State With Most Order",
        insightDetail:[
          {
             value:`18 new orders were placed with Massachusetts in the last week.` ,
             impact:true
          },
        ],
        insight: [
            {
                id:1,
                title:"Most Abandoned Product with high purchase rate",
                des:faker.random.words(50)
            },
           
            {
                id:3,
                title:"Which days have Maximum Sales ?",
                des:faker.random.words(50)
            },
            {
                id:4,
                title:"Which category provide most profit to business?",
                des:faker.random.words(50)
            },
            {
                id:5,
                title:"What category we need to improve to increase sales?",
                des:faker.random.words(50)
            },
            {
                id:6,
                title:"Which product have high COGs ?",
                des:faker.random.words(50)
            }
        ]
     },

]  

export const feedback = [
    {
        title: "Ideas",
        icons: <HiOutlineLightBulb/>,
        result:[
            {
                title:faker.random.words(7),
                id:faker.datatype.uuid(),
                date:'21 January, 2023',
                Author:faker.name.fullName(),
                active:true ,
                view:faker.random.numeric(5),
                comment:faker.random.numeric(5)
            },
            {
                title:faker.random.words(7),
                id:faker.datatype.uuid(),
                date:'21 January, 2023',
                Author:faker.name.fullName(),
                active:true ,
                view:faker.random.numeric(5),
                comment:faker.random.numeric(5)
            },
            {
                title:faker.random.words(7),
                id:faker.datatype.uuid(),
                date:'21 January, 2023',
                Author:faker.name.fullName(),
                active:true ,
                view:faker.random.numeric(5),
                comment:faker.random.numeric(5)
            },
            {
                title:faker.random.words(7),
                id:faker.datatype.uuid(),
                date:'21 January, 2023',
                Author:faker.name.fullName(),
                active:true ,
                view:faker.random.numeric(5),
                comment:faker.random.numeric(5)
            },      {
                title:faker.random.words(7),
                id:faker.datatype.uuid(),
                date:'21 January, 2023',
                Author:faker.name.fullName(),
                active:true ,
                view:faker.random.numeric(5),
                comment:faker.random.numeric(5)
            },      {
                title:faker.random.words(7),
                id:faker.datatype.uuid(),
                date:'21 January, 2023',
                Author:faker.name.fullName(),
                active:true ,
                view:faker.random.numeric(5),
                comment:faker.random.numeric(5)
            },      {
                title:faker.random.words(7),
                id:faker.datatype.uuid(),
                date:'21 January, 2023',
                Author:faker.name.fullName(),
                active:true ,
                view:faker.random.numeric(5),
                comment:faker.random.numeric(5)
            },      {
                title:faker.random.words(7),
                id:faker.datatype.uuid(),
                date:'21 January, 2023',
                Author:faker.name.fullName(),
                active:true ,
                view:faker.random.numeric(5),
                comment:faker.random.numeric(5)
            },
        ]
    },
    {
        title: "Ui/Ux Changes",
        icons:<AiOutlineAntDesign/>,
        result:[
            {
                title:faker.random.words(7),
                id:faker.datatype.uuid(),
                date:'21 January, 2023',
                Author:faker.name.fullName(),
                active:true ,
                view:faker.random.numeric(5),
                comment:faker.random.numeric(5)
            },
            {
                title:faker.random.words(7),
                date:'21 January, 2023',
                Author:faker.name.fullName(),
                active:true ,
                view:faker.random.numeric(5),
                comment:faker.random.numeric(5)
            },
            {
                title:faker.random.words(7),
                date:'21 January, 2023',
                Author:faker.name.fullName(),
                active:true ,
                view:faker.random.numeric(5),
                comment:faker.random.numeric(5)
            },
            {
                title:faker.random.words(7),
                date:'21 January, 2023',
                Author:faker.name.fullName(),
                active:true ,
                view:faker.random.numeric(5),
                comment:faker.random.numeric(5)
            },      {
                title:faker.random.words(7),
                date:'21 January, 2023',
                Author:faker.name.fullName(),
                active:true ,
                view:faker.random.numeric(5),
                comment:faker.random.numeric(5)
            },      {
                title:faker.random.words(7),
                date:'21 January, 2023',
                Author:faker.name.fullName(),
                active:true ,
                view:faker.random.numeric(5),
                comment:faker.random.numeric(5)
            },      {
                title:faker.random.words(7),
                date:'21 January, 2023',
                Author:faker.name.fullName(),
                active:true ,
                view:faker.random.numeric(5),
                comment:faker.random.numeric(5)
            },      {
                title:faker.random.words(7),
                date:'21 January, 2023',
                Author:faker.name.fullName(),
                active:true ,
                view:faker.random.numeric(5),
                comment:faker.random.numeric(5)
            },
        ]
    },
    {
        title: "Suggestion",
        icons:<HiOutlineTag/>,
        
        result:[
            {
                title:faker.random.words(7),
                id:faker.datatype.uuid(),
                date:'21 January, 2023',
                Author:faker.name.fullName(),
                active:true ,
                view:faker.random.numeric(5),
                comment:faker.random.numeric(5)
            },
            {
                title:faker.random.words(7),
                date:'21 January, 2023',
                Author:faker.name.fullName(),
                active:true ,
                view:faker.random.numeric(5),
                comment:faker.random.numeric(5)
            },
            {
                title:faker.random.words(7),
                date:'21 January, 2023',
                Author:faker.name.fullName(),
                active:true ,
                view:faker.random.numeric(5),
                comment:faker.random.numeric(5)
            },
            {
                title:faker.random.words(7),
                date:'21 January, 2023',
                Author:faker.name.fullName(),
                active:true ,
                view:faker.random.numeric(5),
                comment:faker.random.numeric(5)
            },      {
                title:faker.random.words(7),
                date:'21 January, 2023',
                Author:faker.name.fullName(),
                active:true ,
                view:faker.random.numeric(5),
                comment:faker.random.numeric(5)
            },      {
                title:faker.random.words(7),
                date:'21 January, 2023',
                Author:faker.name.fullName(),
                active:true ,
                view:faker.random.numeric(5),
                comment:faker.random.numeric(5)
            },      {
                title:faker.random.words(7),
                date:'21 January, 2023',
                Author:faker.name.fullName(),
                active:true ,
                view:faker.random.numeric(5),
                comment:faker.random.numeric(5)
            },        {
                title:faker.random.words(7),
                date:'21 January, 2023',
                Author:faker.name.fullName(),
                active:true ,
                view:faker.random.numeric(5),
                comment:faker.random.numeric(5)
            },      {
                title:faker.random.words(7),
                date:'21 January, 2023',
                Author:faker.name.fullName(),
                active:true ,
                view:faker.random.numeric(5),
                comment:faker.random.numeric(5)
            },      {
                title:faker.random.words(7),
                date:'21 January, 2023',
                Author:faker.name.fullName(),
                active:true ,
                view:faker.random.numeric(5),
                comment:faker.random.numeric(5)
            },      {
                title:faker.random.words(7),
                date:'21 January, 2023',
                Author:faker.name.fullName(),
                active:true ,
                view:faker.random.numeric(5),
                comment:faker.random.numeric(5)
            },  {
                title:faker.random.words(7),
                date:'21 January, 2023',
                Author:faker.name.fullName(),
                active:true ,
                view:faker.random.numeric(5),
                comment:faker.random.numeric(5)
            },
        ]

    },
    {
        title: "Positive Feedback",
       
        icons:<MdOutlineFeedback/>,
        result:[
            {
                title:faker.random.words(7),
                id:faker.datatype.uuid(),
                date:'21 January, 2023',
                Author:faker.name.fullName(),
                active:true ,
                view:faker.random.numeric(5),
                comment:faker.random.numeric(5)
            },
            {
                title:faker.random.words(7),
                date:'21 January, 2023',
                Author:faker.name.fullName(),
                active:true ,
                view:faker.random.numeric(5),
                comment:faker.random.numeric(5)
            },
            {
                title:faker.random.words(7),
                date:'21 January, 2023',
                Author:faker.name.fullName(),
                active:true ,
                view:faker.random.numeric(5),
                comment:faker.random.numeric(5)
            },
            {
                title:faker.random.words(7),
                date:'21 January, 2023',
                Author:faker.name.fullName(),
                active:true ,
                view:faker.random.numeric(5),
                comment:faker.random.numeric(5)
            },      {
                title:faker.random.words(7),
                date:'21 January, 2023',
                Author:faker.name.fullName(),
                active:true ,
                view:faker.random.numeric(5),
                comment:faker.random.numeric(5)
            },      {
                title:faker.random.words(7),
                date:'21 January, 2023',
                Author:faker.name.fullName(),
                active:true ,
                view:faker.random.numeric(5),
                comment:faker.random.numeric(5)
            },      {
                title:faker.random.words(7),
                date:'21 January, 2023',
                Author:faker.name.fullName(),
                active:true ,
                view:faker.random.numeric(5),
                comment:faker.random.numeric(5)
            },      {
                title:faker.random.words(7),
                date:'21 January, 2023',
                Author:faker.name.fullName(),
                active:true ,
                view:faker.random.numeric(5),
                comment:faker.random.numeric(5)
            },
            {
                title:faker.random.words(7),
                date:'21 January, 2023',
                Author:faker.name.fullName(),
                active:true ,
                view:faker.random.numeric(5),
                comment:faker.random.numeric(5)
            },      {
                title:faker.random.words(7),
                date:'21 January, 2023',
                Author:faker.name.fullName(),
                active:true ,
                view:faker.random.numeric(5),
                comment:faker.random.numeric(5)
            },      {
                title:faker.random.words(7),
                date:'21 January, 2023',
                Author:faker.name.fullName(),
                active:true ,
                view:faker.random.numeric(5),
                comment:faker.random.numeric(5)
            },      {
                title:faker.random.words(7),
                date:'21 January, 2023',
                Author:faker.name.fullName(),
                active:true ,
                view:faker.random.numeric(5),
                comment:faker.random.numeric(5)
            },
        ]

    }
]

export const Insights = [
    {
        id:1,
        title:"Most Abandoned Product with high purchase rate",
        des:faker.random.words(50)
    },
    {
        id:2,
        title:"which page create most misleads?"
        ,
        des:faker.random.words(50)
    },
    {
        id:3,
        title:"Which days have Maximum Sales ?",
        des:faker.random.words(50)
    },
    {
        id:4,
        title:"Which category provide most profit to business?",
        des:faker.random.words(50)
    },
    {
        id:5,
        title:"What category we need to improve to increase sales?",
        des:faker.random.words(50)
    },
    {
        id:6,
        title:"Which product have high COGs ?",
        des:faker.random.words(50)
    }
]
const random = ['+' , '-']

export const CardData = [
    {
       title:"Most Conversion ",
       value:`+${faker.datatype.number({ min: 2, max: 20 })}%`,

    },
    {
        title:'Most Drop-off',
        value:`${faker.datatype.number({ min: 2, max: 20 })}%`,
    },
     {
        title: 'With Less Conversions',
        value:"Facebook"
     },
     {
        title:'Gross incomes from channels',
        value: `${faker.finance.amount(40,80,1,'$')}K`,
     }
]

export const tableData = [
    {
        channel:"Google",
        conversions: `+${faker.datatype.number({ min: 2, max: 20 })}%`,
        users:`${faker.finance.amount(2, 9 ,1 )}K`,
        
    },
    {
        channel:"Youtube",
        conversions:  `+${faker.datatype.number({ min: 2, max: 10 })}%`,
        users:`${faker.finance.amount(2, 9 ,1 )}K`,
        
    },
    {
        channel:"Fackbook",
        conversions:  `+${faker.datatype.number({ min: 2, max: 30})}%`,
        users:`${faker.finance.amount(2, 9 ,1 )}K`,
        
    },
    {
        channel:"Instagram",
        conversions:  `+${faker.datatype.number({ min: 2, max: 14 })}%`,
        users:`${faker.finance.amount(2, 9 ,1 )}K`,
        
    },
    {
        channel:"Amazon",
        conversions:  `+${faker.datatype.number({ min: 2, max: 14 })}%`,
        users:`${faker.finance.amount(2, 9 ,1 )}K`,
        
    },

    {
        channel:"Quora",
        conversions:  `+${faker.datatype.number({ min: 2, max: 14 })}%`,
        users:`${faker.finance.amount(2, 9 ,1 )}K`,
        
    },
    
]

export const CountrytableData = [
    {
        country:usState[3].name,
        profit: `+${faker.datatype.number({ min: 2, max: 20 })}%`,
        sells:`${faker.finance.amount(2, 9 ,1 )}K`,
        
    },
    {
        country:usState[10].name,
        profit:  `+${faker.datatype.number({ min: 2, max: 10 })}%`,
        sells:`${faker.finance.amount(2, 9 ,1 )}K`,
        
    },
    {
        country:usState[12].name,
        profit:  `+${faker.datatype.number({ min: 2, max: 30})} `,
        sells:`${faker.finance.amount(2, 9 ,1 )}K`,
        
    },
    {
        country:usState[19].name,
        profit:  `+${faker.datatype.number({ min: 2, max: 30})} `,
        sells:`${faker.finance.amount(2, 9 ,1 )}K`,
        
    },

    {
        country:usState[26].name,
        profit:  `+${faker.datatype.number({ min: 2, max: 30})} `,
        sells:`${faker.finance.amount(2, 9 ,1 )}K`,
        
    },
    {
        country:usState[16].name,
        profit:  `+${faker.datatype.number({ min: 2, max: 30})} `,
        sells:`${faker.finance.amount(2, 9 ,1 )}K`,
        
    },
   
    {
        country:usState[36].name,
        profit:  `+${faker.datatype.number({ min: 2, max: 30})} `,
        sells:`${faker.finance.amount(2, 9 ,1 )}K`,
        
    },
   
    {
        country:usState[46].name,
        profit:  `+${faker.datatype.number({ min: 2, max: 30})} `,
        sells:`${faker.finance.amount(2, 9 ,1 )}K`,
        
    },
   
   
    
]

export const BehaviourtableData = [
    {
        page:page[1],
        dropoff:`+${faker.datatype.number({ min: 2, max: 20 })}%`,
        visit:`${faker.finance.amount(2, 9 ,1 )}K`,
        impact:true
        
    },
    {
        page:page[5],
        dropoff:`+${faker.datatype.number({ min: 20, max: 45 })}%`,
        visit:`${faker.finance.amount(2, 9 ,1 )}K`,
        impact:false
        
    },
   

    {
        page:page[6],
        dropoff:`+${faker.datatype.number({ min: 2, max: 20 })}%`,
        visit:`${faker.finance.amount(2, 9 ,1 )}K`,
        impact:true
        
    },
   
    {
        page:page[3],
        dropoff:`+${faker.datatype.number({ min: 10, max: 50 })}%`,
        visit:`${faker.finance.amount(2, 9 ,1 )}K`,
        impact:false
        
    },
   

   

   
    
]

export const EcommercetableData = [
    {
        name:products[10].name,
        subCategory:products[10].subCategory,
        category:products[10].category,

        profit: `+${faker.datatype.number({ min: 2, max: 20 })}%`,
        sells:`${faker.finance.amount(5, 10,1)}K`,
        
    },
    {
        name: 'PTDM1 Display ',
        subCategory:'Ceiling Mounts',
        category:'Display Mounts',
        profit: `+${faker.datatype.number({ min: 2, max: 20 })}%`,
        sells:`${faker.finance.amount(2, 9 ,1 )}K`,
        
    },
    {
    
            name: 'Dual Pole Stand',
            subCategory:'Floor Stand' , 
            category:'Carts And Stand',
       
      
        profit: `+${faker.datatype.number({ min: 2, max: 20 })}%`,
        sells:`${faker.finance.amount(2, 9 ,1 )}K`,
    },
    {
        name: 'Magnet Assited ',
        subCategory:'Weight Capacity 45 lbs' , 
        category:'Projector Mounts',
        profit: `+${faker.datatype.number({ min: 2, max: 20 })}%`,
        sells:`${faker.finance.amount(2, 9 ,1 )}K`,
    },
    {
        name: 'Dual Arm Swingout ',
        subCategory:'Articulating Mounts' , 
        category:'Display Mounts',
        profit: `+${faker.datatype.number({ min: 2, max: 20 })}%`,
        sells:`${faker.finance.amount(2, 9 ,1 )}K`,
    },
    {
        name: 'Adjustable Height Projector ',
        subCategory:'Weight Capacity 45 lbs' , 
        category:'Projector Mounts',
        profit: `+${faker.datatype.number({ min: 2, max: 20 })}%`,
        sells:`${faker.finance.amount(2, 9 ,1 )}K`,
    },
    {
        name: 'Chrome Replacement Poles',
        subCategory:'Mobile Cart' , 
        category:'Carts And Stand',
        profit: `+${faker.datatype.number({ min: 2, max: 20 })}%`,
        sells:`${faker.finance.amount(2, 9 ,1 )}K`,
    },

   
    
]

export const ProducttableData = [
    {
        Product:products[10].name,
        category:products[10].category,
        profit: `+${faker.datatype.number({ min: 2, max: 20 })}%`,
        sells:`${faker.finance.amount(2, 9 ,1 )}K`,
        channel:"Google",
        conversions: `+${faker.datatype.number({ min: 2, max: 20 })}%`,
        
    },
    {
        Product:products[12].name,
        category:products[12].category,
        profit: `+${faker.datatype.number({ min: 2, max: 20 })}%`,
        sells:`${faker.finance.amount(2, 9 ,1 )}K`,
        channel:"Google",
        conversions: `+${faker.datatype.number({ min: 2, max: 20 })}%`,
        
    },
    {
        Product:products[6].name,
        category:products[6].category,
        profit: `+${faker.datatype.number({ min: 2, max: 20 })}%`,
        sells:`${faker.finance.amount(2, 9 ,1 )}K`,
        channel:"Facebook",
        conversions: `+${faker.datatype.number({ min: 2, max: 20 })}%`,
    },
    {
        Product:products[4].name,
        category:products[4].category,
        profit: `+${faker.datatype.number({ min: 2, max: 20 })}%`,
        sells:`${faker.finance.amount(2, 9 ,1 )}K`,
        channel:"Google",
        conversions: `+${faker.datatype.number({ min: 2, max: 20 })}%`,
    },
    {
        Product:products[19].name,
        category:products[19].category,
        profit: `+${faker.datatype.number({ min: 2, max: 20 })}%`,
        sells:`${faker.finance.amount(2, 9 ,1 )}K`,
        channel:"Buy Best",
        conversions: `+${faker.datatype.number({ min: 2, max: 20 })}%`,
    },

   
    
]

/* export const ProducttableData = [
    {
        Product:"Product 1",
        category:"Electronics",
        profit: `+${faker.datatype.number({ min: 2, max: 20 })}%`,
        sells:`${faker.finance.amount(2, 9 ,1 )}K`,
        channel:"Google",
        conversions: `+${faker.datatype.number({ min: 2, max: 20 })}%`,
        
    },
    {
        Product:"Product 2",
        category:"Grocery",
        profit: `+${faker.datatype.number({ min: 2, max: 20 })}%`,
        sells:`${faker.finance.amount(2, 9 ,1 )}K`,
        channel:"Google",
        conversions: `+${faker.datatype.number({ min: 2, max: 20 })}%`,
        
    },
    {
        Product:"Product 3",
        category:"Cloths",
        profit: `+${faker.datatype.number({ min: 2, max: 20 })}%`,
        sells:`${faker.finance.amount(2, 9 ,1 )}K`,
        channel:"Facebook",
        conversions: `+${faker.datatype.number({ min: 2, max: 20 })}%`,
    },
    {
        Product:"Product 4",
        category:"Good Buy",
        profit: `+${faker.datatype.number({ min: 2, max: 20 })}%`,
        sells:`${faker.finance.amount(2, 9 ,1 )}K`,
        channel:"Google",
        conversions: `+${faker.datatype.number({ min: 2, max: 20 })}%`,
    },
    {
        Product:"Product 5",
        category:"Books",
        profit: `+${faker.datatype.number({ min: 2, max: 20 })}%`,
        sells:`${faker.finance.amount(2, 9 ,1 )}K`,
        channel:"Buy Best",
        conversions: `+${faker.datatype.number({ min: 2, max: 20 })}%`,
    },

   
    
] */