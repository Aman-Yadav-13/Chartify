import axios from 'axios';
import { useEffect, useState } from 'react';
import Graph from './Graph';


const NewCustomersAddedOverTime = () => {
    const [collection, setcollection] = useState([]);

    useEffect(() => {
        async function getCollection(){
            try{
                const response = await axios.get(process.env.REACT_APP_URL+"/new-customers-added-over-time");
                
                setcollection(response.data.data);
            }catch(error){
                console.log('Error : ', error);
            }
        }

        getCollection();
    }, [])

    return (
        <div>
            {collection ? <Graph data={collection} label={"New Customers Added Over Time"}/>
                : "Loading"
            }
        </div>
    )
}

export default NewCustomersAddedOverTime;