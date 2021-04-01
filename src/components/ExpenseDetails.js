import react, { useEffect, useState } from "react";

const ExpenseDetails = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [details, setDetails] = useState({});

  useEffect(() => {
    fetchItem();
  }, []);

  const fetchItem = () => {
    setIsLoading(true);
    const fetchedItem = fetch(
      `https://webhomebudget.azurewebsites.net/api/expenses/5`
    )
      .then((response) => response.json())
      .then((response) => {
        setDetails(response);
        setIsLoading(false);
      });
  };

  return (
    <div>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <button
          onClick={() => {
            console.log(details);
          }}
        >
          TEST
        </button>
      )}
    </div>
  );
};

export default ExpenseDetails;
