import { useReducer, useState } from "react";

interface IState {
  department: string;
  error: string | null;
}

interface IAction {
  type: "CHANGE_DEPARTMENT" | "RESET";
  payload: string;
}

function reducer(state: IState, action: IAction) {
  const { type, payload } = action;
  switch (type) {
    case "CHANGE_DEPARTMENT":
      const newDepartment = payload;
      const hasError = newDepartment !== "카드메이커";
      return {
        ...state,
        department: hasError ? "" : newDepartment,
        error: hasError ? "올바른 부서를 입력하세요" : null,
      };
    case "RESET":
      return { ...state, department: "", error: null };
    default:
      return state;
  }
}
function UseReducerCompanyPage() {
  const [state, dispatch] = useReducer(reducer, {
    department: "Software Development",
    error: null,
  });

  const [department, setDepartment] = useState(state.department);

  const handleChangeDepartment = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDepartment(e.target.value);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold">{state.department}</h1>
      {state.error && <p className="text-red-500">{state.error}</p>}
      <input
        className="w-full border border-gray-300 px-3 py-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="변경하고 싶은 부서를 입력하세요"
        type="text"
        value={department}
        onChange={handleChangeDepartment}
      />
      <button
        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        onClick={() =>
          dispatch({ type: "CHANGE_DEPARTMENT", payload: department })
        }
      >
        직무 변경하기
      </button>
    </div>
  );
}

export default UseReducerCompanyPage;
