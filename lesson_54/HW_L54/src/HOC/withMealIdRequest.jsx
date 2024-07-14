import {useParams} from "react-router-dom";
import {useData} from "../hooks";
import {API} from "../constants";

export const withMealIdRequest = (Component) => (props) => {
  let { mealId } = useParams();
  const data = useData(`${API.mealId}${mealId}`);

  if (!data || !data.meals || data.meals.length === 0) {
    return <div>Loading...</div>;
  }

  return (<Component data={data} />);
}