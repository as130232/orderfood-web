const Item = ({ id, name, note, price }) => {
  return (
    <div>
      <h4>{name}</h4>
      <div>{note}</div>
      <div>${price}</div>
    </div>
  );
};

export default Item;
