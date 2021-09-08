const Store = ({ storeDate }) => {
  return (
    <div>
      <h1>{storeDate.name}</h1>
      <p>★{storeDate.rating}</p>
      <p>外送 {storeDate.deliveryTime} 分鐘</p>
    </div>
  );
};

export default Store;
