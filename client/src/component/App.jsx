import NewCustomersAddedOverTime from "./NewCustomersAddedOverTime";
import SalesGrowthRateOverTime from "./SalesGrowthRateOverTime";
import TotalSalesOverTime from "./TotalSalesOverTime";

const App = () => {
    return (
        <>
            <TotalSalesOverTime />
            <SalesGrowthRateOverTime />
            <NewCustomersAddedOverTime />
        </>
    )
}

export default App;