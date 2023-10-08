import { useSearchParams } from "react-router-dom";

function useURLSearchParam(paramName, initialValue = "") {
  const [searchParams, setSearchParams] = useSearchParams();

  // Directly get the value from searchParams
  const paramValue = searchParams.get(paramName) || initialValue;

  const setParamValue = (value) => {
    if (value) {
      // Update only the specific parameter, and preserve the others.
      setSearchParams({
        ...Object.fromEntries(searchParams),
        [paramName]: value,
      });
    } else {
      // Remove the parameter if its value is falsy.
      searchParams.delete(paramName);
      setSearchParams(searchParams);
    }
  };

  return [paramValue, setParamValue];
}

export default useURLSearchParam;
