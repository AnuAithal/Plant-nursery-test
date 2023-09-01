import React, { useEffect, useState } from "react";
import ScrollToTop from "../../ScrollToTop";

const StaffQueries = () => {
  const [queries, setQueries] = useState([]);

  useEffect(() => {
    async function fetchUserQueries() {
      try {
        const response = await fetch(
          `http://13.50.136.16:8080/staff/getAllQueries`
        );
        if (response.ok) {
          const queriesData = await response.json();
          setQueries(queriesData);
        } else {
          console.error("Failed to fetch queries");
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    }

    fetchUserQueries();
  }, []);

  console.log(queries);

  const handleAnswerSubmit = async (queryId, queryAnswer) => {
    try {
      const response = await fetch(`http://13.50.136.16:8080/staff/answer`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: queryId,
          queryAnswer: queryAnswer,
        }),
      });

      if (response.ok) {
        // Update the query with the new answer
        const updatedQueries = queries.map((query) =>
          query.id === queryId
            ? { ...query, queryAnswer, queryStatus: true }
            : query
        );
        setQueries(updatedQueries);
      } else {
        console.error("Failed to answer query");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div>
      <ScrollToTop/>
      <div className="staffPlant-container">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            marginLeft: "20px",
          }}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/128/2706/2706962.png"
            width={57}
          />
          <h2 className="admin-home-title">Queries</h2>
        </div>

        <div className="queries-list">
          {queries.map((query, index) => (
            <div key={query.id} className="query-card">
              {query.queryStatus ? (
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <p className="query-desc">{query.queryDesc}</p>
                  </div>
                  <div>
                    <img
                      src="https://cdn-icons-png.flaticon.com/128/1838/1838326.png"
                      width={40}
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <p className="query-desc">{query.queryDesc}</p>
                  <button
                    className="see-answer-button"
                    onClick={() => {
                      const updatedQueries = queries.map((q) =>
                        q.id === query.id
                          ? { ...q, answering: true }
                          : { ...q, answering: false }
                      );
                      setQueries(updatedQueries);
                    }}
                  >
                    Answer
                  </button>
                  {query.answering && (
                    <div>
                      <textarea
                        className="query-textarea"
                        rows="4"
                        cols="50"
                        placeholder="Enter query answer..."
                      />
                      <button
                        className="submit-button"
                        onClick={() => {
                          const textarea =
                            document.querySelector(`.query-textarea`);
                          if (textarea && textarea.value) {
                            handleAnswerSubmit(query.id, textarea.value);
                          }
                        }}
                      >
                        Submit
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StaffQueries;
