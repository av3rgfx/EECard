import type { ReactNode } from "react";
export function Materia({
  card,
  welcome,
  action,
  properties,
}: {
  card: ReactNode;
  welcome: ReactNode;
  action: ReactNode;
  properties: ReactNode;
}) {
  return (
    <>
      <div className="home-composition">
        <section className="card-stage">{card}</section>
        <div className="home-companion">
          {welcome}
          {action}
        </div>
      </div>
      {properties}
    </>
  );
}
