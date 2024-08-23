import Chart from 'chart.js/auto';
import { useRef, useEffect, useState } from 'react';

const Graph = (props) => {
    const canvasRef = useRef(null);
    const chartRef = useRef(null);

    // State to store the processed data
    const [chartData, setChartData] = useState({
        labels: [],
        values: []
    });

    // Update chartData whenever props.data changes
    useEffect(() => {
        const collection = new Map();
        props.data.forEach((data) => {
            const key = `${data[0]}-${data[1]}`;
            collection.set(key, (collection.get(key) || 0) + 1);
        });
        
        if(props.label == "Sales Growth Rate Over Time"){
            const keylist = Array.from(collection.keys());
            let sum = collection.get(keylist[0]);

            for(let i=1 ; i<keylist.length ; i++){
                sum += collection.get(keylist[i]);
                collection.set(keylist[i], (collection.get(keylist[i]) - collection.get(keylist[i-1]))/sum*100);
            }

            collection.set(keylist[0], 100);
        }
        

        setChartData({
            labels: Array.from(collection.keys()),
            values: Array.from(collection.values())
        });

        
    }, [props.data]);

    useEffect(() => {
        if (chartRef.current) {
            chartRef.current.destroy();
        }

        const ctx = canvasRef.current.getContext('2d');
        chartRef.current = new Chart(ctx, {
            type: 'line',
            data: {
                labels: chartData.labels,  // Use the processed labels
                datasets: [
                    {
                        label: props.label,
                        data: chartData.values,  // Use the processed data
                        borderColor: 'rgba(75, 192, 192, 1)',
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderWidth: 1
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });

        return () => {
            if (chartRef.current) {
                chartRef.current.destroy();
            }
        };
    }, [chartData, props.label]);  // React to changes in chartData and label

    return (
        <canvas ref={canvasRef} id={props.label} style={{ width: '100%', height: '400px' }} />
    );
};

export default Graph;
