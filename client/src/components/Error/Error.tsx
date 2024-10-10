import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error: any = useRouteError();
  console.error(error);

  return (
    <div className="home">
      <div className="content-container">
				<h1>Oh no!</h1>
				<p className="subtext">Something has gone wrong, please try again later.</p>
				<p>{error.status} Error: {error.statusText || error.message}</p>
      </div>
    </div>
  );
}
