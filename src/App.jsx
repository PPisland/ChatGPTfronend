import { useState } from "react";
import axios from "axios";

function App() {
  const [content, setContent] = useState("");
  const [result, setResult] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmitChat = async (e) => {
    try {
      e.preventDefault();

      if (!content) {
        return;
      }

      setIsLoading(true);
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/chat`,
        {
          content,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.REACT_APP_SECRET_KEY}`,
          },
        }
      );
      setResult(response.data.result);
      setIsLoading(false);
      setContent("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-screen-md bg-lime-100 mx-auto min-h-screen flex flex-col justify-start items-center pt-16 px-4">
      <form className="flex w-full " onSubmit={onSubmitChat}>
        <input
          className={`grow border-2 px-2 py-1 border-gray-300 rounded-lg focus:outline-main ${
            isLoading && "bg-gray-200 text-gray-400"
          }`}
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <input
          className={`w-24 ml-4 px-2 py-1 border-2 hover:border-cyan-200 border-main text-main rounded-lg shadow-lg ${
            isLoading && "bg-main text-white"
          }`}
          type="submit"
          value={isLoading ? "Searching..." : "Search"}
          disabled={isLoading}
        />
      </form>
      {result && (
        <div className="max-w-screen-md mt-16 bg-main p-4 text-gray-50">
          {result}
        </div>
      )}
    </div>
  );
}

export default App;
