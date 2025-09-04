import { useRouteError, Link } from "react-router-dom";
import "./ErrorPage.css";
import { useEffect } from "react";

export function ErrorPage({message}) {
  const error = useRouteError();

  useEffect({
    if(message){
        error.message = message;
    }
  }, [])

  return (
    <div className="error-container">
      <h1 className="error-title">Упс! Что-то пошло не так</h1>
      <p className="error-message">
        {error?.statusText || error?.message || "Неизвестная ошибка"}
      </p>

      <div className="error-actions">
        <Link to="/" className="error-button">
          На главную
        </Link>
        <button className="error-button" onClick={() => window.location.reload()}>
          Обновить
        </button>
      </div>
    </div>
  );
}
