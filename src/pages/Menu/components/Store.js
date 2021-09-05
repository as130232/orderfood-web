const Store = ({ storeDate }) => {
  return (
    <div>
      <h1>{storeDate.name}</h1>
      <p>★{storeDate.evaluation}</p>
      <p>外送 {storeDate.delivery} 分鐘</p>
    </div>
  );
};

export default Store;
