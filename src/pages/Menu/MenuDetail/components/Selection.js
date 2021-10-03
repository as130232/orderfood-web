import { FormControlLabel, RadioGroup, FormGroup, Radio, Checkbox, Button } from '@material-ui/core';

const Content = ({ type, items }) => {
    if (type == 1) {
        return (
            <RadioGroup name="row-radio-buttons-group">
                {items.map(item => {
                    let id = `${item.id}`;
                    return <FormControlLabel value={id} control={<Radio />} key={item.id} label={item.name + ' +$' + item.price} />
                })}
            </RadioGroup>
        )
    } else if (type == 2) {
        return <div>
            <FormGroup>
                {items.map(item => {
                    return <FormControlLabel value={item.id} control={<Checkbox />} key={item.id} label={item.name + ' +$' + item.price} />
                })}
            </FormGroup>
        </div>
    }
}


const Selection = ({ selection }) => {
    let requiredSpan = null
    if (selection.required) {
        requiredSpan = <span>*</span>
    }

    return (
        <div>
            <h4>{selection.name}{requiredSpan}</h4>
            <Content type={selection.type} items={selection.items} />
        </div>
    );
};
export default Selection;
