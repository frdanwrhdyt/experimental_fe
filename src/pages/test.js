import useRefreshToken from "../hooks/useRefreshToken";

export default function Test() {
  const refresh = useRefreshToken();
  return (
    <>
      <button onClick={() => refresh()}>refresh</button>
    </>
  );
}
