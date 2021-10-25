import { FormControlLabel, RadioGroup, FormGroup, Radio, Checkbox, Typography, Stack, Chip } from '@mui/material'

const Content = ({ type, items, mealForm, setMealForm }) => {
    const updateForm = (item) => {
        setMealForm(prevFrom => {
            let selected = [...prevFrom.selections]
            if (type === 1) {       // radio
                const radioSelected = items.filter(e => e !== item) // 其他選項 && 以選取的有包含 => 以選取的radio項
                if (radioSelected && radioSelected.length) { // radioSelected 如果沒有, 代表沒選過
                    selected = selected.filter(e => radioSelected.findIndex(s => s.id === e.id) < 0)
                }
                selected.push(item)
            } else if (type === 2) { // check
                const selectedIdx = selected.findIndex(s => s.id === item.id)
                if (selectedIdx >= 0) {
                    selected.splice(selectedIdx, 1)
                } else {
                    selected.push(item)
                }
            }
            return {
                ...prevFrom,
                selections: [...selected]
            }
        })
    }

    if (type === 1) {
        const selectedItem = items.find(e => mealForm.selections.some(e2 => e.id === e2.id))
        return (
            <RadioGroup name="row-radio-buttons-group" value={selectedItem ? `${selectedItem.id}` : ''}>
                {items.map(item => {
                    return <FormControlLabel
                        key={item.id}
                        value={`${item.id}`}
                        label={item.name + ' + $' + item.price}
                        control={<Radio onChange={(e) => {
                            updateForm(item)
                        }} />} />
                })}
            </RadioGroup>
        )
    } else if (type === 2) {
        return (
            <FormGroup>
                {items.map(item => {
                    return <FormControlLabel
                        key={item.id}
                        value={item.id}
                        label={item.name + ' + $' + item.price}
                        control={<Checkbox
                            defaultChecked={mealForm.selections.some(e => e.id === item.id)}
                            onChange={(e) => { updateForm(item) }} />}
                    />
                })}
            </FormGroup>
        )
    }
}

const Selection = ({ selection, mealForm, setMealForm }) => {
    let requiredSpan = null
    if (selection.required) {
        requiredSpan = <Chip label="必填" color="primary" variant="outlined" size="small" />
    }

    return (
        <div>
            <Stack direction="row" spacing={1} alignItems="center">
                <Typography variant="h6">
                    {selection.name}
                </Typography>
                {requiredSpan}
            </Stack>
            <Content type={selection.type} items={selection.items} mealForm={mealForm} setMealForm={setMealForm} />
            <p></p>
        </div>
    );
};
export default Selection;
