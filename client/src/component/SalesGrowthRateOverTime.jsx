import axios from 'axios';
import { useEffect, useState } from 'react';
import Graph from './Graph';


const SalesGrowthRateOverTime = () => {
    const [collection, setcollection] = useState([]);

    useEffect(() => {
        async function getCollection(){
            try{
                const response = await axios.get(process.env.REACT_APP_URL+"/sales-growth-rate-over-time");
                
                setcollection(response.data.data);
            }catch(error){
                console.log('Error : ', error);
            }
        }

        getCollection();
    }, [])

    return (
        <div>
            {collection ? <Graph data={collection} label={"Sales Growth Rate Over Time"}/>
                : "Loading"
            }
        </div>
    )
}

export default SalesGrowthRateOverTime;