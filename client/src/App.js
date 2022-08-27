import React from "react";
import AddButton from "./components/AddButton";
import Header from "./components/Header";
import Stats from "./components/Stats";
import TableLog from "./components/TableLog";
import Api from "./Api";
import Navigation from "./components/Navigation";
import LogForm from "./components/LogForm";

function App() {
  const [date, setDate] = React.useState(null);
  const [log, setLog] = React.useState(null);
  const [showModal, setModal] = React.useState(false);
  const [existing, setExist] = React.useState(false);

  const getLogData = async () => {
    await Api.fetchDayDetails(date)
      .then((res) => res.data)
      .then((res) => {
        console.log(date, res);
        if (res.length > 0) {
          const obj = res[0];
          if (obj._id) {
            //Document exist, use PATCH
            setExist(true);
            setLog(res[0]);
          } else {
            setLog(null);
            setExist(false);
            //Document doesn't exist, use POST
          }
        } else {
          setExist(false);
          setLog(null);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const parseDate = (d) => {
    var dd = String(d.getDate()).padStart(2, "0");
    var mm = String(d.getMonth() + 1).padStart(2, "0");
    var yyyy = d.getFullYear();
    const currDate = `${dd}-${mm}-${yyyy}`;
    return currDate;
  };

  // Load current date
  React.useEffect(() => {
    const today = new Date();
    setDate(parseDate(today));
  }, []);

  // Load data for particular date
  React.useEffect(() => {
    if (date !== null) {
      getLogData();
    }
  }, [date]);

  const getNextDay = () => {
    const d = date.split("-");
    const curr = new Date(d[2], d[1] - 1, d[0]);
    const next = new Date(curr);
    next.setDate(curr.getDate() + 1);
    setDate(parseDate(next));
  };

  const getPrevDay = () => {
    const d = date.split("-");
    const curr = new Date(d[2], d[1] - 1, d[0]);
    const prev = new Date(curr);
    prev.setDate(curr.getDate() - 1);
    setDate(parseDate(prev));
  };

  const toggleModal = () => {
    setModal(!showModal);
  };

  const postData = async (body) => {
    await Api.addNewLog(body)
      .then((res) => {
        console.log(res);
        toggleModal();
        window.location.reload();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const patchData = async (body) => {
    await Api.updateLogById(log._id, body)
      .then((res) => {
        console.log(res);
        toggleModal();
        window.location.reload();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const deleteLog = async (id, ndx) => {
    await Api.deleteLogById(id, ndx)
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div>
      {date === null ? (
        <></>
      ) : (
        <div>
          <Header />
          <Navigation
            date={date}
            onNext={getNextDay}
            onPrev={getPrevDay}
            setData={setLog}
          />
          <Stats data={log} />
          <TableLog data={log} onDelete={deleteLog} />
          <AddButton onClick={toggleModal} />
          {showModal === true ? (
            <LogForm
              date={date}
              onSubmit={existing === true ? patchData : postData}
              toggle={toggleModal}
            />
          ) : (
            <></>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
