import React from "react";
import "../css/LogForm.css";
import Api from "../Api";

const LogForm = (props) => {
  const { date, onSubmit, toggle } = props;
  const searchFood = async (text) => {
    if (text && text.length > 0) {
      await Api.searchFood(text)
        .then((res) => (res = res.data))
        .then((res) => {
          setSearchData([...res.common]);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  const getNutritionDetails = async (item) => {
    await Api.getNutrition(item)
      .then((res) => {
        setNutritionDetails(res.data.foods[0]);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const logData = async (e) => {
    const d = date.split("-");
    const body = {
      date: new Date(d[2], parseInt(d[1]) - 1, parseInt(d[0]) + 1),
      item: {
        name: nutritionDetails.food_name,
        p: Math.round(parseFloat(quantity) * nutritionDetails.nf_protein),
        c: Math.round(
          parseFloat(quantity) * nutritionDetails.nf_total_carbohydrate
        ),
        f: Math.round(parseFloat(quantity) * nutritionDetails.nf_total_fat),
        calories: Math.round(
          parseFloat(quantity) * nutritionDetails.nf_calories
        ),
        weight: Math.round(
          parseFloat(quantity) * nutritionDetails.serving_weight_grams
        ),
        quantity: parseFloat(quantity),
      },
    };
    await onSubmit(body);
  };

  const [searchText, setSearchText] = React.useState("");
  const [searchData, setSearchData] = React.useState([]);
  const [selectedItem, setSelected] = React.useState(null);
  const [nutritionDetails, setNutritionDetails] = React.useState({});
  const [quantity, setQuantity] = React.useState(1.0);

  React.useEffect(() => {
    if (selectedItem !== null) {
      getNutritionDetails(selectedItem.food_name);
    }
  }, [selectedItem]);

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="form">
          <input
            type={"text"}
            placeholder="Search Food"
            onChange={(e) => {
              setSearchText(e.target.value);
              searchFood(e.target.value);
            }}
            value={searchText}
          />
          <div className="dropdown-container">
            {searchData.map((s) => {
              return (
                <div
                  key={s.food_name}
                  onClick={() => {
                    setSelected(s);
                    setSearchData([]);
                    setSearchText(s.food_name);
                  }}
                  className="dropdown-item"
                >
                  {s.food_name}
                </div>
              );
            })}
          </div>
          {selectedItem && nutritionDetails !== null ? (
            <>
              <label>Serving Size</label>
              <input
                type={"text"}
                value={nutritionDetails.serving_unit}
                placeholder="Serving Size"
                disabled
              />
              <label>Quantity</label>
              <input
                type={"text"}
                defaultValue={1.0}
                onKeyUp={(e) => {
                  setQuantity(e.target.value);
                }}
                placeholder="Quantity"
              />
              <label>Weight (in gm)</label>
              <input
                type="text"
                value={
                  quantity === ""
                    ? 0.0
                    : Math.round(
                        nutritionDetails.serving_weight_grams *
                          parseFloat(quantity)
                      )
                }
                disabled
              />
              <label>Macronutrients</label>
              <table>
                <tr>
                  <th>Carbohydrates</th>
                  <th>Protein</th>
                  <th>Fats</th>
                  <th>Calories</th>
                </tr>
                <tr>
                  <td>
                    {quantity === "" || !quantity
                      ? 0.0
                      : Math.round(
                          nutritionDetails.nf_total_carbohydrate *
                            parseFloat(quantity)
                        )}
                  </td>
                  <td>
                    {quantity === "" || !quantity
                      ? 0.0
                      : Math.round(
                          nutritionDetails.nf_protein * parseFloat(quantity)
                        )}
                  </td>
                  <td>
                    {quantity === "" || !quantity
                      ? 0.0
                      : Math.round(
                          nutritionDetails.nf_total_fat * parseFloat(quantity)
                        )}
                  </td>
                  <td>
                    {quantity === "" || !quantity
                      ? 0.0
                      : Math.round(
                          nutritionDetails.nf_calories * parseFloat(quantity)
                        )}
                  </td>
                </tr>
              </table>
            </>
          ) : (
            <></>
          )}
          <div className="btn-container">
            <button className="btn" onClick={toggle}>
              Cancel
            </button>
            {selectedItem && nutritionDetails !== null ? (
              <button className="btn" onClick={() => logData()}>
                Submit
              </button>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogForm;
