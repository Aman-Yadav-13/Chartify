import axios from 'axios';
import { useEffect, useState } from 'react';
import Graph from './Graph';


const TotalSalesOverTime = () => {
    const [collection, setcollection] = useState([]);

    useEffect(() => {
        async function getCollection(){
            try{
                const response = await axios.get(process.env.REACT_APP_URL+"/total-sales-over-time");
                
                setcollection(response.data.data);
            }catch(error){
                console.log('Error : ', error);
            }
        }

        getCollection();
    }, [])

    return (
        <div>
            {collection ? <Graph data={collection} label={"Total Sales Over Time"}/>
                : "Loading"
            }
        </div>
    )
}

export default TotalSalesOverTime;