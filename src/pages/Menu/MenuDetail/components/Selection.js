import Button from '@material-ui/core/Button';

const Selection = ({ selection }) => {
    let requiredSpan = null
    if (selection.required) {
        requiredSpan = <span>*</span>
    }
    return (
        <div>
            <h4>{selection.name}{requiredSpan}</h4>
            {selection.items.map((item) => {
                return (
                    <div key={item.id}>
                        <div>{item.name} <span>+${item.price}</span>
                        </div>
                    </div>
                )
            })}
        </div>
    );
};
export default Selection;
