import { FormControlLabel, RadioGroup, FormGroup, Radio, Checkbox } from '@material-ui/core';

const Content = ({ type, items, mealForm, setMealForm }) => {
    const updateForm = (item) => {
        setMealForm(prevFrom => {
            const selected = new Set(prevFrom.selections)
            if (type === 1) {       // radio
                const radioSelected = items.filter(e => e !== item) // 其他選項 && 以選取的有包含 => 以選取的radio項
                if (radioSelected && radioSelected.length) { // radioSelected 如果沒有, 代表沒選過
                    radioSelected.forEach(e => { // 雖然陣列只有一個, 不用for loop, 也可以改成直接取第一個值
                        selected.delete(e)
                    });
                }
                selected.add(item)
            } else if (type === 2) { // check
                if (selected.has(item)) {
                    selected.delete(item)
                } else {
                    selected.add(item)
                }
            }
            return {
                ...prevFrom,
                selections: [...selected]
            }
        })
    }

    if (type === 1) {
        return (
            <RadioGroup name="row-radio-buttons-group">
                {items.map(item => {
                    return <FormControlLabel value={`${item.id}`} control={<Radio onChange={(e) => {
                        updateForm(item)
                    }} />} key={item.id} label={item.name + ' +$' + item.price} />
                })}
            </RadioGroup>
        )
    } else if (type === 2) {
        return <div>
            <FormGroup>
                {items.map(item => {
                    return <FormControlLabel value={item.id} control={<Checkbox onChange={(e) => {
                        updateForm(item)
                    }} />} key={item.id} label={item.name + ' +$' + item.price} />
                })}
            </FormGroup>
        </div>
    }
}

const Selection = ({ selection, mealForm, setMealForm }) => {
    let requiredSpan = null
    if (selection.required) {
        requiredSpan = <span>*</span>
    }

    return (
        <div>
            <h4>{selection.name}{requiredSpan}</h4>
            <Content type={selection.type} items={selection.items} mealForm={mealForm} setMealForm={setMealForm} />
        </div>
    );
};
export default Selection;
