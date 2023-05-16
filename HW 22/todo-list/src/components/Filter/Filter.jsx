import Button from "../Button/Button";
import "./Filter.css"

const Filter = ({ showAll, showPending, showCompleted }) => {
    return (
        <div>
            <Button title='All' className='filter filter-all' action={showAll} />
            <Button title='Pending' className='filter filter-pending' action={showPending} />
            <Button title='Completed' className='filter filter-completed' action={showCompleted} />
        </div>
    )
}

export default Filter;